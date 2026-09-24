import * as THREE from 'three';
import { gsap } from './motion';

/**
 * The WebGL half of the intro: an avenue of towers that rises out of the
 * ground, the brand mark assembling above it, and a camera that flies through
 * the mark and down the avenue on exit.
 *
 * Two rules keep it smooth:
 *
 * 1. The scene is built once. Nothing about the exit is a re-render — the exit
 *    is just another timeline over the same objects. (The previous version keyed
 *    its effect on `isExiting`, so the whole scene was torn down and rebuilt at
 *    the exact moment the camera was meant to accelerate.)
 * 2. Every movement is a GSAP tween or a function of elapsed time, never a
 *    per-frame increment, so it plays at the same speed on a 60Hz laptop and a
 *    120Hz phone, and a dropped frame costs a frame rather than slowing the shot.
 *
 * The towers are generated from a fixed seed, so every visit gets the same city.
 */

const INK = 0x070707;
const LINE = 0xf2e9dc;
const EMBER = 0xc8231a; // the red of the stair in the logo mark

/* Small deterministic PRNG — mulberry32 */
function seeded(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function radialTexture(stops) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([at, color]) => g.addColorStop(at, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* The city: two rows of towers either side of an avenue that runs away from
   the camera into fog. Near rows are lower so the mark reads against them. */
function planCity(rand) {
  const towers = [];
  for (let row = 0; row < 9; row++) {
    const z = 1 - row * 4.4;
    for (const side of [-1, 1]) {
      let edge = 2.7 + rand() * 0.5;
      const columns = row < 2 ? 3 : 2;
      for (let c = 0; c < columns; c++) {
        const w = 1.5 + rand() * 1.3;
        const d = 1.6 + rand() * 1.6;
        const h = 2.6 + rand() * 4.2 + row * 0.75 + c * 1.6;
        towers.push({
          x: side * (edge + w / 2),
          z: z - rand() * 1.2,
          w,
          d,
          h,
          // The rise travels down the avenue, away from the viewer
          delay: row * 0.085 + c * 0.05 + rand() * 0.05,
        });
        edge += w + 0.45 + rand() * 0.5;
      }
    }
  }
  return towers;
}

export function createIntroScene(container) {
  const width = () => container.clientWidth || window.innerWidth;
  const height = () => container.clientHeight || window.innerHeight;
  const portrait = () => width() / height() < 0.85;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(width(), height());
  renderer.setClearColor(INK, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(INK, 0.034);

  const camera = new THREE.PerspectiveCamera(45, width() / height(), 0.05, 140);

  const disposables = [];
  const keep = (x) => {
    disposables.push(x);
    return x;
  };

  /* ---- Light ---------------------------------------------------------- */
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x050505, 0.55));
  const key = new THREE.DirectionalLight(0xffe2bf, 2.2);
  key.position.set(5, 9, 14);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffb070, 1.4);
  rim.position.set(0, 5, -30);
  scene.add(rim);

  /* ---- Ground: a fine grid and a scan ring that sweeps outward ---------- */
  const grid = new THREE.GridHelper(120, 120, LINE, LINE);
  grid.material.transparent = true;
  grid.material.opacity = 0;
  grid.material.depthWrite = false;
  keep(grid.geometry);
  keep(grid.material);
  scene.add(grid);

  const scanMat = keep(
    new THREE.MeshBasicMaterial({
      color: LINE,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  const scan = new THREE.Mesh(keep(new THREE.RingGeometry(0.985, 1, 160)), scanMat);
  scan.rotation.x = -Math.PI / 2;
  scan.position.set(0, 0.01, 2);
  scan.scale.setScalar(0.01);
  scene.add(scan);

  /* ---- Horizon: warm light at the far end of the avenue ----------------- */
  const glowMat = keep(
    new THREE.MeshBasicMaterial({
      map: keep(
        radialTexture([
          [0, 'rgba(255, 214, 160, 0.9)'],
          [0.25, 'rgba(236, 150, 80, 0.35)'],
          [0.6, 'rgba(120, 60, 30, 0.08)'],
          [1, 'rgba(0, 0, 0, 0)'],
        ])
      ),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    })
  );
  const glow = new THREE.Mesh(keep(new THREE.PlaneGeometry(70, 34)), glowMat);
  glow.position.set(0, 3, -48);
  scene.add(glow);

  /* ---- Towers ---------------------------------------------------------- */
  const glassMat = keep(
    new THREE.MeshStandardMaterial({ color: 0x0c0c0d, roughness: 0.42, metalness: 0.55 })
  );
  const edgeMat = keep(
    new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.6 })
  );
  const floorMat = keep(
    new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.13 })
  );

  const city = new THREE.Group();
  scene.add(city);

  const towers = planCity(seeded(11)).map((t) => {
    const g = new THREE.Group();
    g.position.set(t.x, 0, t.z);
    g.scale.y = 0.001;

    const box = keep(new THREE.BoxGeometry(t.w, t.h, t.d));
    box.translate(0, t.h / 2, 0); // pivot at the base, so it grows out of the ground
    g.add(new THREE.Mesh(box, glassMat));
    g.add(new THREE.LineSegments(keep(new THREE.EdgesGeometry(box)), edgeMat));

    const pts = [];
    const hw = t.w / 2 + 0.002;
    const hd = t.d / 2 + 0.002;
    for (let y = 0.42; y < t.h - 0.1; y += 0.42) {
      pts.push(-hw, y, hd, hw, y, hd, hw, y, hd, hw, y, -hd, hw, y, -hd, -hw, y, -hd, -hw, y, -hd, -hw, y, hd);
    }
    if (pts.length) {
      const fg = keep(new THREE.BufferGeometry());
      fg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      g.add(new THREE.LineSegments(fg, floorMat));
    }

    city.add(g);
    return { group: g, delay: t.delay };
  });

  /* ---- The mark: three frames and a stair, as in the logo -------------- */
  const markMat = keep(
    new THREE.MeshStandardMaterial({
      color: 0xf4efe6,
      emissive: 0x3a332a,
      roughness: 0.3,
      metalness: 0.35,
      transparent: true,
      opacity: 0,
    })
  );
  const stairMat = keep(
    new THREE.MeshStandardMaterial({
      color: EMBER,
      emissive: 0x6a0e08,
      roughness: 0.35,
      metalness: 0.2,
    })
  );

  const T = 0.06; // stroke
  const D = 0.06; // depth
  const bar = (w, h, mat, parent, x = 0, y = 0) => {
    const m = new THREE.Mesh(keep(new THREE.BoxGeometry(w, h, D)), mat);
    m.position.set(x, y, 0);
    parent.add(m);
    return m;
  };
  const frame = (w, h, parent) => {
    bar(w, T, markMat, parent, 0, h / 2 - T / 2);
    bar(w, T, markMat, parent, 0, -h / 2 + T / 2);
    bar(T, h, markMat, parent, -w / 2 + T / 2, 0);
    bar(T, h, markMat, parent, w / 2 - T / 2, 0);
  };

  const mark = new THREE.Group();
  scene.add(mark);

  // The side panels in the logo are sheared, not rotated: their vertical
  // edges stay vertical while the top and bottom rise to the right.
  const panels = [-1, 0, 1].map((side) => {
    const flyer = new THREE.Group(); // animated
    const shape = new THREE.Group(); // static, carries the shear
    flyer.add(shape);
    mark.add(flyer);

    if (side === 0) {
      frame(1.24, 1.0, shape);
    } else {
      frame(1.1, 1.0, shape);
      bar(0.42, T, markMat, shape, 0, 0.05);
      bar(0.27, T, markMat, shape, 0.03, -0.08);
      shape.matrixAutoUpdate = false;
      shape.matrix.makeShear(0, 0, 0.42, 0, 0, 0);
    }

    const rest = { x: side * 1.32, y: side * 0.23, z: side === 0 ? 0.04 : 0 };
    flyer.position.set(rest.x, rest.y, rest.z);
    return { flyer, rest, side };
  });

  // The stair, drawn segment by segment
  const stairPts = [
    [-0.42, -0.26],
    [-0.07, -0.24],
    [0.05, 0.34],
    [0.43, 0.3],
  ];
  const stair = [];
  for (let i = 0; i < stairPts.length - 1; i++) {
    const [x1, y1] = stairPts[i];
    const [x2, y2] = stairPts[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1) + T * 0.9;
    const geo = keep(new THREE.BoxGeometry(len, T * 1.05, D));
    geo.translate(len / 2 - (T * 0.45), 0, 0);
    const seg = new THREE.Mesh(geo, stairMat);
    seg.position.set(x1, y1, 0.05);
    seg.rotation.z = Math.atan2(y2 - y1, x2 - x1);
    seg.scale.x = 0.0001;
    seg.visible = false;
    panels[1].flyer.add(seg);
    stair.push(seg);
  }

  // A halo that pulses once when the mark locks together
  const haloMat = keep(
    new THREE.MeshBasicMaterial({
      color: LINE,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  const halo = new THREE.Mesh(keep(new THREE.RingGeometry(0.99, 1, 128)), haloMat);
  halo.scale.setScalar(1.6);
  mark.add(halo);

  /* ---- Dust ------------------------------------------------------------ */
  const DUST = window.innerWidth < 768 ? 160 : 320;
  const rand = seeded(3);
  const dustPos = new Float32Array(DUST * 3);
  const dustSeed = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = (rand() - 0.5) * 26;
    dustPos[i * 3 + 1] = rand() * 9;
    dustPos[i * 3 + 2] = 12 - rand() * 44;
    dustSeed[i] = rand();
  }
  const dustBase = dustPos.slice();
  const dustGeo = keep(new THREE.BufferGeometry());
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = keep(
    new THREE.PointsMaterial({
      size: 0.07,
      map: keep(
        radialTexture([
          [0, 'rgba(255,255,255,1)'],
          [0.35, 'rgba(255,236,210,0.5)'],
          [1, 'rgba(255,236,210,0)'],
        ])
      ),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(new THREE.Points(dustGeo, dustMat));

  /* ---- Camera rig ----------------------------------------------------- */
  // Everything the timelines move lives in plain objects; the frame loop
  // only reads them.
  const rig = {
    x: 0,
    y: 0.35,
    z: 19,
    lx: 0,
    ly: 3.4,
    lz: 0,
    fovBoost: 0,
    parallax: 1,
  };
  const REST = { x: 0, y: 1.35, z: 12.5, lx: 0, ly: 1.75, lz: 0 };

  const layout = () => {
    const p = portrait();
    camera.aspect = width() / height();
    camera.userData.baseFov = p ? 64 : 45;
    // Sit the mark above the wordmark, and shrink it on narrow screens
    mark.userData.baseY = p ? 2.75 : 2.55;
    mark.position.set(0, mark.userData.baseY, 4);
    mark.scale.setScalar(p ? 0.62 : 0.78);
    renderer.setSize(width(), height());
  };
  layout();

  /* ---- Pointer parallax ------------------------------------------------ */
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('resize', layout);

  /* ---- Frame loop ------------------------------------------------------ */
  const look = new THREE.Vector3();
  let elapsed = 0;

  const tick = (_time, deltaMs) => {
    const dt = Math.min(deltaMs, 50) / 1000;
    elapsed += dt;

    // Frame-rate independent damping
    const k = 1 - Math.exp(-dt * 2.6);
    pointer.sx += (pointer.x - pointer.sx) * k;
    pointer.sy += (pointer.y - pointer.sy) * k;

    const px = pointer.sx * rig.parallax;
    const py = pointer.sy * rig.parallax;
    camera.position.set(rig.x + px * 0.9, rig.y - py * 0.45, rig.z);
    look.set(rig.lx + px * 0.25, rig.ly - py * 0.15, rig.lz);
    camera.lookAt(look);

    camera.fov = camera.userData.baseFov + rig.fovBoost;
    camera.updateProjectionMatrix();

    // The mark breathes once assembled, and turns slightly toward the pointer
    mark.rotation.y = Math.sin(elapsed * 0.55) * 0.07 + px * 0.12;
    mark.rotation.x = Math.sin(elapsed * 0.4) * 0.03 + py * 0.06;
    mark.position.y = mark.userData.baseY + Math.sin(elapsed * 0.9) * 0.04 * rig.parallax;

    // Dust drifts upward and loops
    for (let i = 0; i < DUST; i++) {
      const s = dustSeed[i];
      dustPos[i * 3] = dustBase[i * 3] + Math.sin(elapsed * 0.3 + s * 40) * 0.25;
      dustPos[i * 3 + 1] = (dustBase[i * 3 + 1] + elapsed * (0.08 + s * 0.12)) % 9;
    }
    dustGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  };
  gsap.ticker.add(tick);

  /* ---- Choreography ---------------------------------------------------- */
  const tweens = [];
  const track = (tl) => {
    tweens.push(tl);
    return tl;
  };

  /** The build: about 3.2s from black to a finished frame. */
  const enter = () => {
    const tl = gsap.timeline();

    tl.to(grid.material, { opacity: 0.1, duration: 1.6, ease: 'power2.out' }, 0)
      .fromTo(
        scanMat,
        { opacity: 0.7 },
        { opacity: 0, duration: 2.6, ease: 'power2.in', immediateRender: false },
        0.05
      )
      .to(scan.scale, { x: 34, y: 34, z: 34, duration: 2.6, ease: 'power2.out' }, 0.05)
      .to(glowMat, { opacity: 1, duration: 2.8, ease: 'power1.inOut' }, 0.1)
      // The crane: from street level looking up, rising to eye level
      .to(rig, { ...REST, duration: 3.4, ease: 'power3.inOut' }, 0);

    towers.forEach((t) => {
      tl.to(t.group.scale, { y: 1, duration: 1.6, ease: 'expo.out' }, 0.2 + t.delay);
    });

    tl.to(dustMat, { opacity: 0.55, duration: 1.8, ease: 'power1.out' }, 0.8);

    // The three frames fly in from depth and lock together
    tl.to(markMat, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 1.05);
    panels.forEach((p, i) => {
      const order = p.side === 0 ? 0 : 1;
      tl.fromTo(
        p.flyer.position,
        { x: p.rest.x * 3.2, y: p.rest.y + 1.4 - order * 0.4, z: -7 },
        { ...p.rest, duration: 1.7, ease: 'expo.out' },
        1.05 + order * 0.12 + i * 0.03
      ).fromTo(
        p.flyer.rotation,
        { x: 0.6, y: p.side === 0 ? -1.2 : p.side * 1.4, z: p.side * -0.5 },
        { x: 0, y: 0, z: 0, duration: 1.7, ease: 'expo.out' },
        '<'
      );
    });

    // The stair draws itself: the one colour on the screen
    stair.forEach((seg, i) => {
      tl.set(seg, { visible: true }, 2.05 + i * 0.16).to(
        seg.scale,
        { x: 1, duration: 0.28, ease: i === stair.length - 1 ? 'power3.out' : 'power2.in' },
        2.05 + i * 0.16
      );
    });

    tl.fromTo(
      haloMat,
      { opacity: 0.45 },
      { opacity: 0, duration: 1.4, ease: 'power2.out', immediateRender: false },
      2.55
    )
      .fromTo(
        halo.scale,
        { x: 1.4, y: 1.4, z: 1.4 },
        { x: 5, y: 5, z: 5, duration: 1.4, ease: 'expo.out', immediateRender: false },
        2.55
      );

    return track(tl);
  };

  /**
   * The exit: the mark parts like a pair of doors and the camera accelerates
   * down the avenue into the light. About 1.6s; the curtain iris opens during
   * the second half, onto the hero's own sunset.
   */
  const exit = () => {
    tweens.forEach((t) => t.kill());
    const tl = gsap.timeline();

    // Anything the build had not finished snaps home quickly rather than
    // being frozen half-way
    tl.to(markMat, { opacity: 1, duration: 0.3 }, 0);
    towers.forEach((t) => tl.to(t.group.scale, { y: 1, duration: 0.5, ease: 'power2.out' }, 0));
    stair.forEach((seg) => tl.set(seg, { visible: true }, 0).to(seg.scale, { x: 1, duration: 0.3 }, 0));

    // The doors: the sides swing out, the centre lifts clear
    panels.forEach((p) => {
      const to =
        p.side === 0
          ? { x: 0, y: 3.2, z: 1.5 }
          : { x: p.side * 5.5, y: p.rest.y + 0.4, z: 2.5 };
      const turn = p.side === 0 ? { x: -1.1, y: 0, z: 0 } : { x: 0, y: p.side * -1.35, z: 0 };
      tl.to(p.flyer.position, { ...to, duration: 1.3, ease: 'power3.in' }, 0.12).to(
        p.flyer.rotation,
        { ...turn, duration: 1.3, ease: 'power3.in' },
        0.12
      );
    });

    tl.to(rig, { parallax: 0, duration: 0.5, ease: 'power2.out' }, 0)
      .to(mark.rotation, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
      // Settle on the avenue's axis, looking straight down it...
      .to(rig, { x: 0, y: 1.2, lx: 0, ly: 1.2, lz: -60, duration: 0.7, ease: 'power2.inOut' }, 0)
      // ...then dive
      .to(rig, { z: -32, duration: 1.65, ease: 'power3.in' }, 0.1)
      .to(rig, { fovBoost: 20, duration: 1.65, ease: 'power2.in' }, 0.1)
      .to(glowMat, { opacity: 1.8, duration: 1.4, ease: 'power2.in' }, 0.1);

    return track(tl);
  };

  const dispose = () => {
    tweens.forEach((t) => t.kill());
    gsap.ticker.remove(tick);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('resize', layout);
    disposables.forEach((d) => d.dispose?.());
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };

  return { enter, exit, dispose };
}
