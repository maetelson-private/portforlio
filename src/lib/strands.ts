import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

/**
 * 히어로의 "다섯 갈래" 리본.
 * 분야 라벨마다 한 갈래(선 다발)가 시작해, 이름 근처의 한 점에서 모여
 * 하나의 리본으로 꼬이며 오른쪽 끝까지 흐른다.
 * 시작점과 합류점은 DOM 요소 위치를 읽어 정하므로 레이아웃이 바뀌어도 맞는다.
 */
export interface StrandsHandle {
  highlight(index: number | null): void;
  destroy(): void;
}

interface Options {
  /** 각 갈래의 시작점이 될 라벨 요소들 (위에서 아래 순서) */
  labels: HTMLElement[];
  /** 다섯 갈래가 모이는 지점 표시 요소 */
  converge: HTMLElement;
  reducedMotion: boolean;
}

const LINES = 12; // 한 갈래의 선 수
const SEG = 220; // 선 하나의 점 수
const U_C = 0.46; // 경로 중 합류 지점의 위치 (0~1)

type V2 = { x: number; y: number };

function bez(a: number, b: number, c: number, d: number, t: number) {
  const m = 1 - t;
  return m * m * m * a + 3 * m * m * t * b + 3 * m * t * t * c + t * t * t * d;
}

export function mountStrands(host: HTMLElement, canvas: HTMLCanvasElement, opts: Options): StrandsHandle | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const N = opts.labels.length;
  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 1, 5000);
  const DIST = 1200; // 카메라 거리 (픽셀 좌표계에서)

  const count = N * LINES * SEG;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const index: number[] = [];
  for (let s = 0; s < N * LINES; s++) {
    for (let k = 0; k < SEG - 1; k++) {
      const a = s * SEG + k;
      index.push(a, a + 1);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.setIndex(index);
  const material = new LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new LineSegments(geometry, material));
  const posAttr = geometry.getAttribute('position') as BufferAttribute;
  const colAttr = geometry.getAttribute('color') as BufferAttribute;

  // ── 화면(px) 좌표 ──
  let W = 1;
  let H = 1;
  const starts: V2[] = [];
  let C: V2 = { x: 0, y: 0 };

  function measure() {
    const hr = host.getBoundingClientRect();
    W = hr.width;
    H = hr.height;
    starts.length = 0;
    for (const el of opts.labels) {
      const r = el.getBoundingClientRect();
      starts.push({ x: r.right - hr.left + 14, y: r.top + r.height / 2 - hr.top });
    }
    const c = opts.converge.getBoundingClientRect();
    C = { x: c.left - hr.left, y: c.top + c.height / 2 - hr.top };
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    // z=0 평면에서 화면 1px = 월드 1단위가 되도록 카메라를 둔다
    camera.fov = (2 * Math.atan(H / 2 / DIST) * 180) / Math.PI;
    camera.position.set(0, 0, DIST);
    camera.updateProjectionMatrix();
  }

  // ── 색: 갈래별 밝기를 목표값으로 서서히 바꾼다 ──
  const deep = new Color('#0c6b48');
  const green = new Color('#2ee59d');
  const mint = new Color('#d9ffef');
  const tmp = new Color();
  const level = new Array(N).fill(0.8);
  let target = new Array(N).fill(0.8);
  let hi: number | null = null;

  function paint() {
    for (let s = 0; s < N; s++) {
      for (let l = 0; l < LINES; l++) {
        const edge = 0.45 + 0.55 * Math.sin(((l + 0.5) / LINES) * Math.PI);
        for (let k = 0; k < SEG; k++) {
          const u = k / (SEG - 1);
          const fadeIn = Math.min(1, u * 14);
          const fadeOut = Math.min(1, (1 - u) * 6);
          // 합류 뒤로 갈수록 갈래 구분 없이 같은 밝기로 섞인다
          const merged = u < U_C ? 0 : Math.min(1, (u - U_C) / 0.25);
          const lv = level[s] * (1 - merged) + 0.8 * merged;
          const hl = Math.exp(-Math.pow((u - 0.64) / 0.1, 2));
          tmp.copy(deep).lerp(green, Math.min(1, 0.35 + u)).lerp(mint, hl * 0.55 + (lv > 1 ? (lv - 1) * 0.8 : 0) * (1 - merged));
          const a = lv * edge * fadeIn * fadeOut;
          const i = ((s * LINES + l) * SEG + k) * 3;
          colors[i] = tmp.r * a;
          colors[i + 1] = tmp.g * a;
          colors[i + 2] = tmp.b * a;
        }
      }
    }
    colAttr.needsUpdate = true;
  }

  // ── 위치 ──
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };

  function shape(phase: number) {
    const bandGap = Math.max(5, Math.min(9, H / 120)); // 합류 후 갈래 사이 간격(px)
    const lineGap = Math.max(1.3, Math.min(1.9, H / 480)); // 갈래 안 선 간격(px)
    const E: V2 = { x: W + 60, y: C.y + 24 + eased.y * 40 };
    const tailLen = E.x - C.x;
    for (let s = 0; s < N; s++) {
      const S = starts[s];
      const band = (s - (N - 1) / 2) * bandGap; // 합류 후 리본 안에서의 자리
      const dx = C.x - S.x;
      for (let l = 0; l < LINES; l++) {
        const lo = (l - (LINES - 1) / 2) * lineGap;
        for (let k = 0; k < SEG; k++) {
          const u = k / (SEG - 1);
          let x: number;
          let y: number;
          let z: number;
          if (u <= U_C) {
            // 라벨에서 합류점까지: 퍼져 있던 갈래가 좁아지며 모인다
            const t = u / U_C;
            x = bez(S.x, S.x + dx * 0.55, C.x - dx * 0.35, C.x, t);
            const cy = bez(S.y, S.y, C.y + band, C.y + band, t);
            const spread = 1 + (1 - t) * 0.7;
            const wob = Math.sin(t * Math.PI * 2 + phase * 0.8 + s * 1.3) * 6 * Math.sin(t * Math.PI);
            y = cy + lo * spread + wob;
            z = Math.sin(t * Math.PI) * (s - (N - 1) / 2) * 18;
          } else {
            // 합류 뒤: 한 리본으로 꼬이며 오른쪽 끝까지
            const t = (u - U_C) / (1 - U_C);
            x = C.x + tailLen * t;
            const cy = bez(C.y, C.y + 10, E.y - 30, E.y, t) + Math.sin(t * Math.PI * 1.6 + phase * 0.5) * 18;
            const off = band + lo;
            const theta = t * Math.PI * (1.25 + eased.x * 0.35) + phase * 0.3;
            const grow = 1 + t * 1.8; // 오른쪽으로 갈수록 리본이 넓어진다
            y = cy + Math.cos(theta) * off * grow;
            z = Math.sin(theta) * off * grow;
          }
          const i = ((s * LINES + l) * SEG + k) * 3;
          // 화면 px → 월드 좌표 (원점 = 화면 중앙, y 위가 +)
          positions[i] = x - W / 2;
          positions[i + 1] = H / 2 - y;
          positions[i + 2] = z;
        }
      }
    }
    posAttr.needsUpdate = true;
  }

  function onPointer(e: PointerEvent) {
    const r = host.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    pointer.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
  }
  if (!opts.reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true });

  let raf = 0;
  let visible = true;
  let phase = 0;
  let last = performance.now();

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    phase += dt;
    eased.x += (pointer.x - eased.x) * 0.05;
    eased.y += (pointer.y - eased.y) * 0.05;
    let changed = false;
    const k = 1 - Math.exp(-dt * 8);
    for (let s = 0; s < N; s++) {
      const d = target[s] - level[s];
      if (Math.abs(d) > 0.002) {
        level[s] += d * k;
        changed = true;
      }
    }
    if (changed) paint();
    shape(phase);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function still() {
    for (let s = 0; s < N; s++) level[s] = target[s];
    paint();
    shape(1.2);
    renderer.render(scene, camera);
  }
  function play() {
    if (opts.reducedMotion || raf || !visible || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  const ro = new ResizeObserver(() => {
    measure();
    if (opts.reducedMotion || !raf) still();
  });
  ro.observe(host);
  measure();
  paint();

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) play();
    else pause();
  });
  io.observe(host);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);

  if (opts.reducedMotion) still();
  else play();

  return {
    highlight(i) {
      hi = i;
      target = level.map((_, s) => (hi === null ? 0.8 : s === hi ? 1.35 : 0.28));
      if (opts.reducedMotion) still();
    },
    destroy() {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
