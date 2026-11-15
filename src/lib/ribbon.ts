import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

/**
 * 히어로의 3D 리본.
 * 선 수십 가닥이 한 장의 리본을 이루고 길이 방향으로 꼬이며 흐른다.
 * 커서에 따라 기울고, 보고 있는 분야(필터·행 호버)에 따라 형태가 바뀐다.
 */
export type RibbonPreset = 'all' | 'strategy' | 'investment' | 'data' | 'design' | 'development';

export interface RibbonHandle {
  setPreset(p: RibbonPreset): void;
  destroy(): void;
}

interface Shape {
  amp: number; // 중심선 진폭
  freq: number; // 중심선 굽이 수
  twist: number; // 길이 방향 꼬임 (반 바퀴 단위)
  width: number; // 리본 폭
  speed: number; // 흐름 속도
}

// 분야마다 다른 형태. 경영전략은 넓고 완만하게, 투자·실사는 촘촘하게 조이고,
// 데이터는 굽이가 많고, 디자인은 크게 흐르고, 개발은 빠르게 두 번 꼬인다.
const PRESETS: Record<RibbonPreset, Shape> = {
  all: { amp: 0.9, freq: 1.35, twist: 1.15, width: 3.4, speed: 1 },
  strategy: { amp: 0.55, freq: 0.9, twist: 0.55, width: 4.0, speed: 0.6 },
  investment: { amp: 0.45, freq: 1.1, twist: 2.4, width: 2.6, speed: 0.75 },
  data: { amp: 1.0, freq: 2.4, twist: 0.9, width: 3.8, speed: 1.15 },
  design: { amp: 1.35, freq: 0.75, twist: 1.5, width: 3.6, speed: 0.85 },
  development: { amp: 0.7, freq: 1.7, twist: 3.2, width: 2.3, speed: 1.6 },
};

interface Options {
  reducedMotion: boolean;
}

const STRANDS = 46;
const SEGMENTS = 200;

export function mountRibbon(host: HTMLElement, canvas: HTMLCanvasElement, opts: Options): RibbonHandle | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const pointCount = STRANDS * SEGMENTS;
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);
  const index: number[] = [];
  for (let s = 0; s < STRANDS; s++) {
    for (let k = 0; k < SEGMENTS - 1; k++) {
      const a = s * SEGMENTS + k;
      index.push(a, a + 1);
    }
  }

  const deep = new Color('#0c6b48');
  const green = new Color('#2ee59d');
  const mint = new Color('#d9ffef');
  const tmp = new Color();
  for (let s = 0; s < STRANDS; s++) {
    const v = s / (STRANDS - 1);
    const edge = 0.35 + 0.65 * Math.pow(Math.sin(v * Math.PI), 0.8);
    for (let k = 0; k < SEGMENTS; k++) {
      const u = k / (SEGMENTS - 1);
      const hl = Math.exp(-Math.pow((u - 0.62) / 0.12, 2));
      tmp.copy(deep).lerp(green, Math.min(1, u * 1.6)).lerp(mint, hl * 0.7);
      const fade = Math.min(1, u * 5, (1 - u) * 5);
      const i = (s * SEGMENTS + k) * 3;
      colors[i] = tmp.r * edge * fade;
      colors[i + 1] = tmp.g * edge * fade;
      colors[i + 2] = tmp.b * edge * fade;
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.setIndex(index);

  const material = new LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const group = new Group();
  group.add(new LineSegments(geometry, material));
  scene.add(group);

  const pos = geometry.getAttribute('position') as BufferAttribute;
  let span = 14;

  // 현재 형태는 목표 형태를 향해 매 프레임 조금씩 다가간다
  const cur: Shape = { ...PRESETS.all };
  let target: Shape = { ...PRESETS.all };

  function shape(phase: number, twistBias: number) {
    for (let s = 0; s < STRANDS; s++) {
      const v = s / (STRANDS - 1) - 0.5;
      for (let k = 0; k < SEGMENTS; k++) {
        const u = k / (SEGMENTS - 1);
        const x = (u - 0.5) * span;
        const cy = Math.sin(u * Math.PI * cur.freq + phase * 0.45) * cur.amp + (u - 0.5) * 0.8;
        const cz = Math.cos(u * Math.PI * 0.9 + phase * 0.3) * 0.8;
        const theta = u * Math.PI * (cur.twist + twistBias * 0.35) + phase * 0.25 + Math.sin(phase * 0.2) * 0.3;
        const w = cur.width * (0.55 + 0.45 * Math.sin(u * Math.PI));
        const off = v * w;
        const i = (s * SEGMENTS + k) * 3;
        positions[i] = x;
        positions[i + 1] = cy + Math.cos(theta) * off;
        positions[i + 2] = cz + Math.sin(theta) * off;
      }
    }
    pos.needsUpdate = true;
  }

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    span = visibleH * camera.aspect * 1.15;
  }
  const ro = new ResizeObserver(() => {
    resize();
    if (opts.reducedMotion) renderStill();
  });
  ro.observe(host);
  resize();

  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
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
  const keys = Object.keys(cur) as (keyof Shape)[];

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    // 목표 형태로 지수 감쇠 (약 0.6초에 거의 도착)
    const k = 1 - Math.exp(-dt * 5);
    for (const key of keys) cur[key] += (target[key] - cur[key]) * k;
    phase += dt * cur.speed;
    eased.x += (pointer.x - eased.x) * 0.05;
    eased.y += (pointer.y - eased.y) * 0.05;
    group.rotation.y = eased.x * 0.28;
    group.rotation.x = -0.18 + eased.y * 0.18;
    shape(phase, eased.x);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function renderStill() {
    Object.assign(cur, target);
    group.rotation.x = -0.18;
    shape(2.4, 0);
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

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else pause();
  });
  io.observe(host);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);

  if (opts.reducedMotion) renderStill();
  else play();

  return {
    setPreset(p) {
      target = { ...(PRESETS[p] ?? PRESETS.all) };
      if (opts.reducedMotion) renderStill();
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
