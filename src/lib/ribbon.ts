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
 * 선 수십 가닥이 한 장의 리본을 이루고, 길이 방향으로 꼬이며 흐른다.
 * 커서 위치에 따라 리본 전체가 기울고 꼬임이 조금 더 감긴다.
 */
export interface RibbonHandle {
  destroy(): void;
}

interface Options {
  reducedMotion: boolean;
}

const STRANDS = 46; // 리본 폭 방향 선 개수
const SEGMENTS = 200; // 선 하나의 점 개수

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

  // ── geometry: 선분 쌍으로 펼친 한 장의 LineSegments ──
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
    const edge = 0.35 + 0.65 * Math.pow(Math.sin(v * Math.PI), 0.8); // 가장자리는 어둡게
    for (let k = 0; k < SEGMENTS; k++) {
      const u = k / (SEGMENTS - 1);
      // 길이 방향: 짙은 초록 → 초록 → 민트 하이라이트 → 초록
      const hl = Math.exp(-Math.pow((u - 0.62) / 0.12, 2));
      tmp.copy(deep).lerp(green, Math.min(1, u * 1.6)).lerp(mint, hl * 0.7);
      const fade = Math.min(1, u * 5, (1 - u) * 5); // 양 끝 페이드
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
  const lines = new LineSegments(geometry, material);
  const group = new Group();
  group.add(lines);
  scene.add(group);

  // ── 리본 형태 계산 ──
  const pos = geometry.getAttribute('position') as BufferAttribute;
  let span = 14; // 화면 폭에 맞춰 resize에서 갱신
  const ribbonWidth = 3.4;

  function shape(t: number, twistBias: number) {
    for (let s = 0; s < STRANDS; s++) {
      const v = s / (STRANDS - 1) - 0.5;
      for (let k = 0; k < SEGMENTS; k++) {
        const u = k / (SEGMENTS - 1);
        const x = (u - 0.5) * span;
        // 중심선: 완만한 S자 흐름
        const cy = Math.sin(u * Math.PI * 1.35 + t * 0.45) * 0.9 + (u - 0.5) * 0.8;
        const cz = Math.cos(u * Math.PI * 0.9 + t * 0.3) * 0.8;
        // 꼬임: 길이 방향으로 반 바퀴 남짓 + 커서
        const theta = u * Math.PI * (1.15 + twistBias * 0.35) + t * 0.25 + Math.sin(t * 0.2) * 0.3;
        const w = ribbonWidth * (0.55 + 0.45 * Math.sin(u * Math.PI)); // 가운데가 넓다
        const off = v * w;
        const i = (s * SEGMENTS + k) * 3;
        positions[i] = x;
        positions[i + 1] = cy + Math.cos(theta) * off;
        positions[i + 2] = cz + Math.sin(theta) * off;
      }
    }
    pos.needsUpdate = true;
  }

  // ── 크기 ──
  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // 화면에 보이는 가로 폭만큼 리본을 펼친다 (양 끝이 화면 밖으로 살짝 나가게)
    const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    span = visibleH * camera.aspect * 1.15;
  }
  const ro = new ResizeObserver(() => {
    resize();
    if (opts.reducedMotion) renderOnce();
  });
  ro.observe(host);
  resize();

  // ── 커서 ──
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  function onPointer(e: PointerEvent) {
    const r = host.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    pointer.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
  }
  if (!opts.reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true });

  // ── 루프: 화면 밖이거나 탭이 숨으면 멈춘다 ──
  let raf = 0;
  let visible = true;
  let start = performance.now();

  function frame(now: number) {
    const t = (now - start) / 1000;
    eased.x += (pointer.x - eased.x) * 0.05;
    eased.y += (pointer.y - eased.y) * 0.05;
    group.rotation.y = eased.x * 0.28;
    group.rotation.x = -0.18 + eased.y * 0.18;
    shape(t, eased.x);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function renderOnce() {
    group.rotation.x = -0.18;
    shape(2.4, 0);
    renderer.render(scene, camera);
  }
  function play() {
    if (opts.reducedMotion || raf || !visible || document.hidden) return;
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    },
    { threshold: 0 },
  );
  io.observe(host);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);

  if (opts.reducedMotion) renderOnce();
  else {
    start = performance.now();
    play();
  }

  return {
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
