import {
  Color,
  Mesh,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

/**
 * 히어로의 큰 구.
 * 화면 오른쪽 밖으로 잘린 어두운 구에 초록 빛이 가장자리를 비춘다.
 * 빛은 커서를 천천히 따라가고, 분야(필터·행 호버)에 따라 각도와 테두리 세기가 바뀐다.
 */
export type OrbPreset = 'all' | 'strategy' | 'investment' | 'data' | 'design' | 'development';

export interface OrbHandle {
  setPreset(p: OrbPreset): void;
  destroy(): void;
}

interface Light {
  /** 빛 방향 (화면 기준, x 오른쪽 / y 위) */
  x: number;
  y: number;
  rim: number; // 테두리 빛 세기
  fill: number; // 정면 빛 세기
}

// 분야마다 빛이 들어오는 방향이 다르다 (왼쪽 위에서 시작해 시계 방향으로)
const PRESETS: Record<OrbPreset, Light> = {
  all: { x: -0.55, y: 0.55, rim: 1.0, fill: 0.55 },
  strategy: { x: -0.85, y: 0.2, rim: 1.1, fill: 0.5 },
  investment: { x: -0.45, y: 0.85, rim: 0.9, fill: 0.45 },
  data: { x: 0.1, y: 0.95, rim: 1.25, fill: 0.5 },
  design: { x: -0.7, y: -0.5, rim: 1.15, fill: 0.6 },
  development: { x: -0.2, y: -0.9, rim: 1.3, fill: 0.45 },
};

const vertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uLight;
  uniform vec3 uBase;
  uniform vec3 uRim;
  uniform float uRimStrength;
  uniform float uFill;
  uniform float uTime;
  varying vec3 vNormal;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 l = normalize(uLight);
    // 부드럽게 감싸는 확산광
    float diff = clamp((dot(n, l) + 0.25) / 1.25, 0.0, 1.0);
    diff = diff * diff;
    // 정면에서 볼수록 0, 가장자리일수록 1
    float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.4);
    // 빛 쪽 가장자리에만 초록 테두리
    float rimSide = clamp(dot(normalize(vec2(n.x, n.y) + 1e-4), normalize(l.xy)) * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = uBase * (0.45 + uFill * 1.6 * diff);
    col += uRim * fres * uRimStrength * pow(rimSide, 2.2);
    col += uRim * diff * 0.1;
    // 그레인: 계단 현상을 없애고 질감을 준다
    float g = hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5;
    col += g * 0.035;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function mountOrb(host: HTMLElement, canvas: HTMLCanvasElement, opts: { reducedMotion: boolean }): OrbHandle | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uLight: { value: new Vector3(-0.55, 0.55, 0.7) },
      uBase: { value: new Color('#2a312d') },
      uRim: { value: new Color('#2ee59d') },
      uRimStrength: { value: 1.0 },
      uFill: { value: 0.55 },
      uTime: { value: 0 },
    },
  });
  const sphere = new Mesh(new SphereGeometry(1, 128, 96), material);
  scene.add(sphere);

  let W = 1;
  let H = 1;
  function layout() {
    W = host.clientWidth;
    H = host.clientHeight;
    if (!W || !H) return;
    renderer.setSize(W, H, false);
    camera.left = -W / 2;
    camera.right = W / 2;
    camera.top = H / 2;
    camera.bottom = -H / 2;
    camera.updateProjectionMatrix();
    const mobile = W < 760;
    // 데스크톱: 오른쪽에 크게, 화면 밖으로 잘리게 / 모바일: 아래쪽에 반쯤 보이게
    const R = mobile ? W * 0.95 : Math.max(H * 0.62, W * 0.34);
    const cx = mobile ? W * 0.62 : W * 0.86;
    const cy = mobile ? H * 0.98 : H * 0.52;
    sphere.scale.setScalar(R);
    sphere.position.set(cx - W / 2, H / 2 - cy, 0);
  }

  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  function onPointer(e: PointerEvent) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }
  if (!opts.reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true });

  const cur: Light = { ...PRESETS.all };
  let target: Light = { ...PRESETS.all };
  const u = material.uniforms;

  function apply() {
    u.uLight.value.set(cur.x + eased.x * 0.35, cur.y - eased.y * 0.3, 0.75);
    u.uRimStrength.value = cur.rim;
    u.uFill.value = cur.fill;
  }

  let raf = 0;
  let visible = true;
  let last = performance.now();
  const keys = Object.keys(cur) as (keyof Light)[];
  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const k = 1 - Math.exp(-dt * 3);
    for (const key of keys) cur[key] += (target[key] - cur[key]) * k;
    eased.x += (pointer.x - eased.x) * 0.03;
    eased.y += (pointer.y - eased.y) * 0.03;
    u.uTime.value = now / 1000;
    apply();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function still() {
    Object.assign(cur, target);
    apply();
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
    layout();
    if (!raf) still();
  });
  ro.observe(host);
  layout();

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
    setPreset(p) {
      target = { ...(PRESETS[p] ?? PRESETS.all) };
      if (opts.reducedMotion) still();
    },
    destroy() {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
      sphere.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
