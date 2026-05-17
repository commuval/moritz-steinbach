function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} = React;

// ─── UI-FARBEN (hell / dunkel) ────────────────────────────────────────────────
const FG_DARK = {
  termMain: 'rgba(224,216,202,0.96)',
  termSub: 'rgba(178,170,156,0.82)',
  vLabelMain: 'rgba(228,222,210,0.92)',
  vLabelSub: 'rgba(180,175,165,0.65)',
  satzKicker: 'rgba(160,155,145,0.6)',
  satzLine: 'rgba(210,205,195,0.9)',
  satzFallback: 'rgba(138,143,162,0.22)',
  satzShadow: '0 2px 28px rgba(0,0,0,1)',
  h2: 'rgba(210,205,195,0.9)',
  h2Shadow: '0 2px 28px rgba(0,0,0,1)',
  cardTitle: 'rgba(232,226,216,0.94)',
  cardMeta: 'rgba(170,165,155,0.74)',
  cardMuted: 'rgba(150,145,135,0.70)',
  cardHoverMeta: 'rgba(165,160,148,0.58)',
  sectionBorder: 'rgba(255,255,255,0.04)',
  chipBorderInactive: 'rgba(255,255,255,0.12)',
  chipBg: 'rgba(20,22,28,0.82)',
  chipFg: 'rgba(210,208,218,0.9)',
  resetBg: 'rgba(20,22,28,0.88)',
  resetBorder: 'rgba(255,255,255,0.07)',
  resetFg: 'rgba(148,153,172,0.62)',
  resetHoverFg: 'rgba(200,202,218,0.9)',
  scrollHint: 'rgba(180,175,162,0.42)',
  scrollArrow: 'rgba(180,175,162,0.30)',
  termTextShadow: '0 0 16px rgba(0,0,0,0.95), 0 0 4px rgba(13,14,16,1)'
};
const FG_LIGHT = {
  termMain: 'rgba(32,34,40,0.94)',
  termSub: 'rgba(88,86,80,0.85)',
  vLabelMain: 'rgba(26,28,34,0.93)',
  vLabelSub: 'rgba(100,98,92,0.72)',
  satzKicker: 'rgba(95,92,86,0.78)',
  satzLine: 'rgba(28,28,32,0.92)',
  satzFallback: 'rgba(120,118,112,0.45)',
  satzShadow: 'none',
  h2: 'rgba(28,28,32,0.92)',
  h2Shadow: 'none',
  cardTitle: 'rgba(24,24,30,0.94)',
  cardMeta: 'rgba(92,90,86,0.78)',
  cardMuted: 'rgba(110,108,102,0.72)',
  cardHoverMeta: 'rgba(100,98,92,0.58)',
  sectionBorder: 'rgba(0,0,0,0.07)',
  chipBorderInactive: 'rgba(0,0,0,0.12)',
  chipBg: 'rgba(255,255,255,0.94)',
  chipFg: 'rgba(36,38,44,0.92)',
  resetBg: 'rgba(255,255,255,0.94)',
  resetBorder: 'rgba(0,0,0,0.10)',
  resetFg: 'rgba(80,82,88,0.75)',
  resetHoverFg: 'rgba(28,30,36,0.95)',
  scrollHint: 'rgba(90,88,82,0.55)',
  scrollArrow: 'rgba(90,88,82,0.40)',
  termTextShadow: '0 1px 2px rgba(255,255,255,0.9)'
};

// Warme helle Themes — dunkle warme Tinte
const FG_WARM = {
  termMain: 'rgba(22,20,18,0.97)',
  termSub: 'rgba(68,62,56,0.92)',
  vLabelMain: 'rgba(18,16,14,0.96)',
  vLabelSub: 'rgba(86,78,70,0.90)',
  satzKicker: 'rgba(76,70,62,0.90)',
  satzLine: 'rgba(18,16,14,0.95)',
  satzFallback: 'rgba(105,98,90,0.58)',
  satzShadow: '0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(0,0,0,0.07)',
  h2: 'rgba(18,16,14,0.95)',
  h2Shadow: '0 1px 0 rgba(255,255,255,0.8)',
  cardTitle: 'rgba(16,14,12,0.96)',
  cardMeta: 'rgba(68,62,56,0.90)',
  cardMuted: 'rgba(85,78,70,0.85)',
  cardHoverMeta: 'rgba(72,66,58,0.75)',
  sectionBorder: 'rgba(0,0,0,0.10)',
  chipBorderInactive: 'rgba(0,0,0,0.16)',
  chipBg: 'rgba(255,253,250,0.97)',
  chipFg: 'rgba(22,18,14,0.95)',
  resetBg: 'rgba(255,253,250,0.97)',
  resetBorder: 'rgba(0,0,0,0.14)',
  resetFg: 'rgba(52,46,40,0.90)',
  resetHoverFg: 'rgba(14,12,10,1)',
  scrollHint: 'rgba(68,62,56,0.72)',
  scrollArrow: 'rgba(68,62,56,0.55)',
  termTextShadow: '0 1px 0 rgba(255,255,255,0.90)'
};
// Kühle helle Themes — blauschiefrige Tinte
const FG_COOL = {
  termMain: 'rgba(18,22,34,0.97)',
  termSub: 'rgba(58,65,88,0.90)',
  vLabelMain: 'rgba(14,18,30,0.96)',
  vLabelSub: 'rgba(70,78,102,0.88)',
  satzKicker: 'rgba(62,68,90,0.88)',
  satzLine: 'rgba(14,18,30,0.95)',
  satzFallback: 'rgba(95,102,128,0.55)',
  satzShadow: '0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(0,0,0,0.07)',
  h2: 'rgba(14,18,30,0.95)',
  h2Shadow: '0 1px 0 rgba(255,255,255,0.8)',
  cardTitle: 'rgba(12,16,28,0.96)',
  cardMeta: 'rgba(58,65,90,0.88)',
  cardMuted: 'rgba(75,82,108,0.82)',
  cardHoverMeta: 'rgba(62,70,98,0.72)',
  sectionBorder: 'rgba(0,0,0,0.09)',
  chipBorderInactive: 'rgba(0,0,0,0.14)',
  chipBg: 'rgba(252,254,255,0.97)',
  chipFg: 'rgba(14,18,34,0.95)',
  resetBg: 'rgba(252,254,255,0.97)',
  resetBorder: 'rgba(0,0,0,0.12)',
  resetFg: 'rgba(42,48,72,0.88)',
  resetHoverFg: 'rgba(8,12,28,1)',
  scrollHint: 'rgba(58,65,92,0.70)',
  scrollArrow: 'rgba(58,65,92,0.52)',
  termTextShadow: '0 1px 0 rgba(255,255,255,0.90)'
};
// Grüne helle Themes — olivgrüne Tinte
const FG_GREEN = {
  termMain: 'rgba(14,22,16,0.97)',
  termSub: 'rgba(52,72,56,0.92)',
  vLabelMain: 'rgba(12,20,14,0.96)',
  vLabelSub: 'rgba(68,90,70,0.90)',
  satzKicker: 'rgba(55,74,58,0.90)',
  satzLine: 'rgba(12,20,14,0.95)',
  satzFallback: 'rgba(90,110,92,0.55)',
  satzShadow: '0 1px 0 rgba(255,255,255,0.8)',
  h2: 'rgba(12,20,14,0.95)',
  h2Shadow: '0 1px 0 rgba(255,255,255,0.8)',
  cardTitle: 'rgba(10,18,12,0.96)',
  cardMeta: 'rgba(52,72,56,0.90)',
  cardMuted: 'rgba(68,90,70,0.82)',
  cardHoverMeta: 'rgba(55,74,58,0.72)',
  sectionBorder: 'rgba(0,0,0,0.09)',
  chipBorderInactive: 'rgba(0,0,0,0.14)',
  chipBg: 'rgba(250,255,250,0.97)',
  chipFg: 'rgba(12,22,14,0.95)',
  resetBg: 'rgba(250,255,250,0.97)',
  resetBorder: 'rgba(0,0,0,0.12)',
  resetFg: 'rgba(38,58,40,0.88)',
  resetHoverFg: 'rgba(6,18,8,1)',
  scrollHint: 'rgba(52,72,56,0.70)',
  scrollArrow: 'rgba(52,72,56,0.52)',
  termTextShadow: '0 1px 0 rgba(255,255,255,0.90)'
};
const FG_KREIDE = FG_WARM;

// ─── THEMES ─────────────────────────────────────────────────────────────────────────────
const THEMES = [
// ── DUNKEL ────────────────────────────────────────────────────────────────────────────
{
  id: 'amber',
  label: 'Bernstein',
  light: false,
  fg: FG_DARK,
  vizMuted: 'rgba(140,140,150,0.55)',
  bg: '#0d0e10',
  accent: [212, 165, 116],
  accentHx: '#d4a574',
  baseLine: [82, 90, 112],
  bgFade: [13, 14, 16],
  particles: [185, 190, 215],
  hubHi: [232, 195, 150]
}, {
  id: 'ocean',
  label: 'Ozean',
  light: false,
  fg: FG_DARK,
  vizMuted: 'rgba(140,140,150,0.55)',
  bg: '#04101e',
  accent: [242, 118, 44],
  accentHx: '#f2762c',
  baseLine: [32, 60, 100],
  bgFade: [4, 16, 30],
  particles: [70, 138, 210],
  hubHi: [255, 185, 120]
}, {
  id: 'polar',
  label: 'Polar',
  light: false,
  fg: FG_DARK,
  vizMuted: 'rgba(140,140,150,0.55)',
  bg: '#030b12',
  accent: [62, 204, 255],
  accentHx: '#3eccff',
  baseLine: [24, 58, 82],
  bgFade: [3, 11, 18],
  particles: [48, 118, 172],
  hubHi: [170, 238, 255]
}, {
  id: 'vulkan',
  label: 'Vulkan',
  light: false,
  fg: FG_DARK,
  vizMuted: 'rgba(140,140,150,0.55)',
  bg: '#100608',
  accent: [58, 162, 255],
  accentHx: '#3aa2ff',
  baseLine: [92, 38, 34],
  bgFade: [16, 6, 8],
  particles: [165, 85, 75],
  hubHi: [155, 210, 255]
},
// ── HELL — warm ───────────────────────────────────────────────────────────────────────────────────
{
  id: 'kreide',
  label: 'Kreide',
  light: true,
  fg: FG_WARM,
  vizMuted: 'rgba(62,56,50,0.58)',
  bg: '#ffffff',
  accent: [158, 72, 38],
  accentHx: '#9e4826',
  baseLine: [108, 100, 90],
  bgFade: [255, 255, 255],
  particles: [148, 138, 124],
  hubHi: [255, 220, 195]
}, {
  id: 'sand',
  label: 'Sand',
  light: true,
  fg: FG_WARM,
  vizMuted: 'rgba(75,65,50,0.55)',
  bg: '#ffffff',
  accent: [140, 96, 24],
  accentHx: '#8c6018',
  baseLine: [118, 108, 82],
  bgFade: [255, 255, 255],
  particles: [162, 148, 118],
  hubHi: [255, 230, 170]
}, {
  id: 'terra',
  label: 'Terra',
  light: true,
  fg: FG_WARM,
  vizMuted: 'rgba(80,52,44,0.55)',
  bg: '#ffffff',
  accent: [162, 60, 52],
  accentHx: '#a23c34',
  baseLine: [118, 88, 80],
  bgFade: [255, 255, 255],
  particles: [158, 128, 118],
  hubHi: [255, 210, 200]
},
// ── HELL — kühl ─────────────────────────────────────────────────────────────────────────────────
{
  id: 'himmel',
  label: 'Himmel',
  light: true,
  fg: FG_COOL,
  vizMuted: 'rgba(88,95,108,0.48)',
  bg: '#ffffff',
  accent: [28, 78, 168],
  accentHx: '#1c4ea8',
  baseLine: [140, 150, 172],
  bgFade: [255, 255, 255],
  particles: [168, 178, 200],
  hubHi: [215, 230, 255]
}, {
  id: 'minze',
  label: 'Minze',
  light: true,
  fg: FG_COOL,
  vizMuted: 'rgba(58,85,82,0.50)',
  bg: '#ffffff',
  accent: [18, 122, 108],
  accentHx: '#127a6c',
  baseLine: [105, 142, 136],
  bgFade: [255, 255, 255],
  particles: [148, 188, 182],
  hubHi: [195, 245, 235]
}, {
  id: 'lavendel',
  label: 'Lavendel',
  light: true,
  fg: FG_COOL,
  vizMuted: 'rgba(80,72,110,0.50)',
  bg: '#ffffff',
  accent: [88, 52, 175],
  accentHx: '#5834af',
  baseLine: [135, 125, 175],
  bgFade: [255, 255, 255],
  particles: [175, 168, 210],
  hubHi: [220, 212, 255]
}, {
  id: 'perle',
  label: 'Perle',
  light: true,
  fg: FG_COOL,
  vizMuted: 'rgba(70,68,90,0.48)',
  bg: '#ffffff',
  accent: [52, 48, 140],
  accentHx: '#34308c',
  baseLine: [148, 148, 168],
  bgFade: [255, 255, 255],
  particles: [178, 178, 198],
  hubHi: [210, 208, 245]
},
// ── HELL — grün ─────────────────────────────────────────────────────────────────────────────────
{
  id: 'farn',
  label: 'Farn',
  light: true,
  fg: FG_GREEN,
  vizMuted: 'rgba(42,68,44,0.52)',
  bg: '#ffffff',
  accent: [34, 102, 52],
  accentHx: '#226634',
  baseLine: [98, 132, 100],
  bgFade: [255, 255, 255],
  particles: [140, 178, 142],
  hubHi: [200, 240, 205]
}, {
  id: 'wald',
  label: 'Wald',
  light: true,
  fg: FG_GREEN,
  vizMuted: 'rgba(38,58,40,0.54)',
  bg: '#ffffff',
  accent: [22, 85, 62],
  accentHx: '#16553e',
  baseLine: [88, 122, 92],
  bgFade: [255, 255, 255],
  particles: [128, 168, 132],
  hubHi: [185, 230, 200]
}];
const DEFAULT_THEME_ID = 'ocean';
const getTheme = id => THEMES.find(t => t.id === id) || THEMES.find(t => t.id === DEFAULT_THEME_ID) || THEMES[0];
const OCEAN_THEME = getTheme(DEFAULT_THEME_ID);
const SITE_TITLE_DEFAULT = 'Moritz Steinbach \u2014 K\xF6nnen \xb7 D\xFCrfen \xb7 Wollen';

// Persönliche Links: ?firma=… oder ?f=… oder ?unternehmen=… (URL-encodiert, max. 120 Zeichen)
function getFirmaFromUrl() {
  try {
    const q = new URLSearchParams(window.location.search);
    // URLSearchParams.get() decodes %xx and + automatically
    const raw = (q.get('firma') || q.get('f') || q.get('unternehmen') || '').trim();
    if (!raw) return '';
    return raw.replace(/[\u0000-\u001F<>"]/g, '').slice(0, 120);
  } catch {
    return '';
  }
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const N_TESS = 10;
const ORB_R = 14;
const N_PART = 52;

// ─── CONTENT ─────────────────────────────────────────────────────────────────
// One category per vertex (v0 = Können, v1 = Dürfen, v2 = Wollen).
// Each category has 1 main and 3 sub-examples.
const KATEGORIEN = [{
  main: 'Fehlende Technologiebasis',
  subs: ['Veraltete IT-Systeme', 'Lückenhafte Datenqualität', 'Fehlendes KI-Know-how']
}, {
  main: 'Fehlende Governance',
  subs: ['DSGVO-Unsicherheit', 'Keine KI-Richtlinien', 'Ungeklärte Haftung']
}, {
  main: 'Zu wenig kulturelle Offenheit',
  subs: ['Angst vor Veränderung', 'Fehlende Vision', 'Widerstand im Management']
}];

// ─── MATH ─────────────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;
const lerpPt = (a, b, t) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t)
});
const lerpC = ([r1, g1, b1], [r2, g2, b2], t) => [r1 + (r2 - r1) * t | 0, g1 + (g2 - g1) * t | 0, b1 + (b2 - b1) * t | 0];
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a.toFixed(3)})`;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
function baryToCart(u, v, w, v0, v1, v2) {
  return {
    x: u * v0.x + v * v1.x + w * v2.x,
    y: u * v0.y + v * v1.y + w * v2.y
  };
}
function cartToBary(px, py, v0, v1, v2) {
  const d = (v1.y - v2.y) * (v0.x - v2.x) + (v2.x - v1.x) * (v0.y - v2.y);
  if (Math.abs(d) < 1e-10) return {
    u: 1 / 3,
    v: 1 / 3,
    w: 1 / 3
  };
  const u = ((v1.y - v2.y) * (px - v2.x) + (v2.x - v1.x) * (py - v2.y)) / d;
  const v_ = ((v2.y - v0.y) * (px - v2.x) + (v0.x - v2.x) * (py - v2.y)) / d;
  return {
    u,
    v: v_,
    w: 1 - u - v_
  };
}
function clampTri(px, py, v0, v1, v2) {
  let {
    u,
    v,
    w
  } = cartToBary(px, py, v0, v1, v2);
  u = Math.max(0, u);
  v = Math.max(0, v);
  w = Math.max(0, w);
  const s = u + v + w;
  u /= s;
  v /= s;
  w /= s;
  return {
    pos: baryToCart(u, v, w, v0, v1, v2),
    bary: {
      u,
      v,
      w
    }
  };
}
function insideTri(px, py, v0, v1, v2) {
  const {
    u,
    v,
    w
  } = cartToBary(px, py, v0, v1, v2);
  return u >= -0.02 && v >= -0.02 && w >= -0.02;
}

// ─── CANVAS DRAWING ───────────────────────────────────────────────────────────
function drawParticles(ctx, particles, t, dpr, pal) {
  const [pr, pg, pb] = pal.particles;
  for (const p of particles) {
    const x = ((p.x0 + p.vx * t * 0.00028) % p.W + p.W) % p.W;
    const y = ((p.y0 + p.vy * t * 0.00028) % p.H + p.H) % p.H;
    const a = p.a * (0.65 + 0.35 * Math.sin(t * p.freq + p.ph));
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, p.r * dpr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${pr},${pg},${pb},${a.toFixed(3)})`;
    ctx.fill();
  }
}
function drawFill(ctx, v0, v1, v2, orb, dpr, pal) {
  const A = pal.accent,
    F = pal.bgFade;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(v0.x * dpr, v0.y * dpr);
  ctx.lineTo(v1.x * dpr, v1.y * dpr);
  ctx.lineTo(v2.x * dpr, v2.y * dpr);
  ctx.closePath();
  ctx.clip();
  const side = Math.hypot(v1.x - v0.x, v1.y - v0.y);
  const g = ctx.createRadialGradient(orb.x * dpr, orb.y * dpr, 0, orb.x * dpr, orb.y * dpr, side * dpr * 0.95);
  g.addColorStop(0, `rgba(${A[0]},${A[1]},${A[2]},0.055)`);
  g.addColorStop(0.45, `rgba(${A[0]},${A[1]},${A[2]},0.018)`);
  g.addColorStop(1, `rgba(${F[0]},${F[1]},${F[2]},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
function drawTessellation(ctx, v0, v1, v2, b, dpr, pal) {
  const n = N_TESS;
  const fams = [{
    fa: v1,
    fb: v2,
    apex: v0,
    glow: b.u
  }, {
    fa: v0,
    fb: v2,
    apex: v1,
    glow: b.v
  }, {
    fa: v0,
    fb: v1,
    apex: v2,
    glow: b.w
  }];
  for (const {
    fa,
    fb,
    apex,
    glow
  } of fams) {
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const p1 = lerpPt(fa, apex, t);
      const p2 = lerpPt(fb, apex, t);
      const intensity = clamp(glow * (0.35 + t * 0.65), 0, 1);
      const col = lerpC(pal.baseLine, pal.accent, intensity);
      ctx.beginPath();
      ctx.moveTo(p1.x * dpr, p1.y * dpr);
      ctx.lineTo(p2.x * dpr, p2.y * dpr);
      ctx.strokeStyle = rgba(col, 0.09 + intensity * 0.38);
      ctx.lineWidth = 0.55;
      ctx.stroke();
    }
  }
}
function drawEdges(ctx, v0, v1, v2, b, dpr, pal) {
  const A = pal.accent;
  const edges = [{
    a: v0,
    c: v1,
    bright: 1 - b.w
  }, {
    a: v1,
    c: v2,
    bright: 1 - b.u
  }, {
    a: v0,
    c: v2,
    bright: 1 - b.v
  }];
  for (const {
    a,
    c,
    bright: br
  } of edges) {
    const brc = clamp(br, 0, 1);
    const col = lerpC(pal.baseLine, A, brc * 0.88);
    ctx.beginPath();
    ctx.moveTo(a.x * dpr, a.y * dpr);
    ctx.lineTo(c.x * dpr, c.y * dpr);
    ctx.strokeStyle = rgba(col, 0.18 + brc * 0.72);
    ctx.lineWidth = 0.85;
    ctx.stroke();
    if (brc > 0.42) {
      ctx.beginPath();
      ctx.moveTo(a.x * dpr, a.y * dpr);
      ctx.lineTo(c.x * dpr, c.y * dpr);
      ctx.strokeStyle = rgba(A, (brc - 0.42) * 0.3);
      ctx.lineWidth = 4 * dpr;
      ctx.stroke();
    }
  }
}
function drawTrail(ctx, trail, dpr, pal) {
  const A = pal.accent;
  for (let i = 1; i < trail.length; i++) {
    const t = i / trail.length;
    const r = ORB_R * 0.45 * t * dpr;
    if (r < 0.5) continue;
    ctx.beginPath();
    ctx.arc(trail[i].x * dpr, trail[i].y * dpr, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(A, t * 0.2);
    ctx.fill();
  }
}
function drawOrb(ctx, pos, t, drag, dpr, pal) {
  const A = pal.accent;
  const [r0, g0, b0] = A;
  const pulse = drag ? 1.12 : 1 + Math.sin(t * 0.0022) * 0.13;
  const r = ORB_R * pulse * dpr;
  const x = pos.x * dpr,
    y = pos.y * dpr;
  const g1 = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
  g1.addColorStop(0, rgba(A, 0.075));
  g1.addColorStop(1, rgba(A, 0));
  ctx.beginPath();
  ctx.arc(x, y, r * 5, 0, Math.PI * 2);
  ctx.fillStyle = g1;
  ctx.fill();
  const g2 = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
  g2.addColorStop(0, rgba(A, 0.24));
  g2.addColorStop(1, rgba(A, 0));
  ctx.beginPath();
  ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
  ctx.fillStyle = g2;
  ctx.fill();
  const hiR = Math.min(255, r0 + 55 | 0),
    hiG = Math.min(255, g0 + 50 | 0),
    hiB = Math.min(255, b0 + 45 | 0);
  const g3 = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.04, x, y, r);
  g3.addColorStop(0, `rgba(${hiR},${hiG},${hiB},0.97)`);
  g3.addColorStop(0.38, rgba(A, 0.93));
  g3.addColorStop(0.78, `rgba(${r0 * 2 / 3 | 0},${g0 * 2 / 3 | 0},${b0 * 2 / 3 | 0},0.72)`);
  g3.addColorStop(1, `rgba(${r0 * 4 / 10 | 0},${g0 * 4 / 10 | 0},${b0 * 4 / 10 | 0},0.12)`);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = g3;
  ctx.fill();
}

// ─── INIT PARTICLES ───────────────────────────────────────────────────────────
function initParticles(W, H, count = N_PART) {
  return Array.from({
    length: count
  }, () => ({
    x0: Math.random() * W,
    y0: Math.random() * H,
    vx: (Math.random() - 0.5) * 18,
    vy: (Math.random() - 0.5) * 18,
    r: Math.random() * 1.3 + 0.4,
    a: Math.random() * 0.042 + 0.012,
    freq: Math.random() * 0.0009 + 0.0004,
    ph: Math.random() * Math.PI * 2,
    W,
    H
  }));
}

// ─── TERM ─────────────────────────────────────────────────────────────────────
// A labeled node in the knowledge graph. The node circle itself is drawn in SVG
// at `pos`; this component renders only the text label, offset to one side of
// the node so it never overlaps the dot or its incoming line.
const TEXT_OFFSET_PX = 14;
const TEXT_TF = {
  bottom: `translate(-50%, ${TEXT_OFFSET_PX}px)`,
  top: `translate(-50%, calc(-100% - ${TEXT_OFFSET_PX}px))`,
  right: `translate(${TEXT_OFFSET_PX}px, -50%)`,
  left: `translate(calc(-100% - ${TEXT_OFFSET_PX}px), -50%)`
};
const TEXT_TF_MOBILE = {
  bottom: 'translate(-50%, 9px)',
  top: 'translate(-50%, calc(-100% - 9px))',
  right: 'translate(9px, -50%)',
  left: 'translate(calc(-100% - 9px), -50%)'
};
const TEXT_ORIGIN = {
  bottom: '50% 0%',
  top: '50% 100%',
  right: '0% 50%',
  left: '100% 50%'
};
function Term({
  text,
  isMain,
  visible,
  proximity,
  pos,
  side = 'bottom',
  fg = FG_DARK,
  isMobile = false
}) {
  const tfMap = isMobile ? TEXT_TF_MOBILE : TEXT_TF;
  const sc = isMain ? isMobile ? 0.88 + proximity * 0.18 : 0.90 + proximity * 0.30 : isMobile ? 0.92 + proximity * 0.08 : 0.96 + proximity * 0.12;
  const baseOp = isMain ? 1 : 0.78;
  const op = visible ? baseOp : 0;
  const fs = isMain ? isMobile ? 10.5 : 14 : isMobile ? 8.2 : 11.5;
  const fw = isMain ? 600 : 400;
  const color = isMain ? fg.termMain : fg.termSub;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: pos.x,
      top: pos.y,
      pointerEvents: 'none',
      zIndex: 7,
      transition: 'opacity 420ms ease, transform 320ms ease-out',
      opacity: op,
      transform: `${tfMap[side]} scale(${sc.toFixed(3)})`,
      transformOrigin: TEXT_ORIGIN[side],
      maxWidth: isMobile ? 96 : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: fs,
      fontWeight: fw,
      color,
      whiteSpace: isMobile ? 'normal' : 'nowrap',
      lineHeight: isMobile ? 1.2 : 1.3,
      letterSpacing: isMain ? '-0.005em' : '0.01em',
      textShadow: fg.termTextShadow
    }
  }, text));
}

// ─── VERTEX LABEL ─────────────────────────────────────────────────────────────
// ─── VERTEX LABEL ─────────────────────────────────────────────────────────────
function VLabel({
  label,
  sub,
  pos,
  align,
  proximity = 1 / 3,
  fg = FG_DARK,
  isMobile = false
}) {
  const tfDesktop = {
    top: 'translate(-50%,-120%)',
    right: 'translate(20px,-50%)',
    left: 'translate(calc(-100% - 20px),-50%)'
  };
  const tfMobile = {
    top: 'translate(-50%,-114%)',
    right: 'translate(10px,-50%)',
    left: 'translate(calc(-100% - 10px),-50%)'
  };
  const tf = (isMobile ? tfMobile : tfDesktop)[align];
  const ta = {
    top: 'center',
    right: 'left',
    left: 'right'
  }[align];
  const to = {
    top: 'center bottom',
    right: 'left center',
    left: 'right center'
  }[align];
  const sc = isMobile ? (0.90 + proximity * 0.22).toFixed(3) : (0.82 + proximity * 0.72).toFixed(3);
  const op = isMobile ? Math.max(0.55, Math.min(1, 0.55 + proximity * 0.55)) : Math.max(0.22, Math.min(1, 0.28 + proximity * 1.1));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: pos.x,
      top: pos.y,
      transform: `${tf} scale(${sc})`,
      transformOrigin: to,
      textAlign: ta,
      pointerEvents: 'none',
      transition: 'transform 180ms ease-out, opacity 180ms ease-out',
      opacity: op
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 13 : 18,
      fontWeight: 600,
      color: fg.vLabelMain,
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 9 : 10,
      fontWeight: 400,
      color: fg.vLabelSub,
      letterSpacing: '0.01em',
      lineHeight: 1.3,
      marginTop: 2,
      whiteSpace: isMobile && align !== 'top' ? 'normal' : 'nowrap',
      maxWidth: isMobile && align !== 'top' ? '62px' : undefined
    }
  }, sub));
}

// ─── SATZ ────────────────────────────────────────────────────────────────────
function getSatzParts({
  u,
  v,
  w
}, accentHx) {
  const HIGH = 0.35,
    LOW = 0.29;
  const dims = [{
    key: 'können',
    val: u,
    name: 'Technologie & Skills',
    short: 'Tech-Skills'
  }, {
    key: 'dürfen',
    val: v,
    name: 'Compliance-Themen',
    short: 'Compliance'
  }, {
    key: 'wollen',
    val: w,
    name: 'Unternehmenskultur',
    short: 'Kultur'
  }];
  const lacking = dims.filter(d => d.val >= HIGH);
  const present = dims.filter(d => d.val <= LOW);
  if (!lacking.length || !present.length) return null;
  const t = text => ({
    text
  });
  const c = text => ({
    text,
    color: accentHx
  });

  // 1 present, 2 lacking
  if (present.length === 1 && lacking.length >= 2) {
    const p = present[0];
    const [l0, l1] = lacking;
    if (p.key === 'wollen') return {
      line1: [t('Die '), c(p.short), t(' ist da,')],
      line2: [t('aber fehlende '), c(l0.short), t(' und '), c(l1.short), t(' halten uns auf.')]
    };
    if (p.key === 'dürfen') return {
      line1: [c(p.short), t('-Probleme gibt es keine,')],
      line2: [t('aber '), c(l0.short), t(' und '), c(l1.short), t(' fehlen.')]
    };
    // p.key === 'können'
    return {
      line1: [t('Wir haben die '), c(p.short), t(',')],
      line2: [t('aber '), c(l0.short), t(' und '), c(l1.short), t(' halten uns zurück.')]
    };
  }

  // 2 present, 1 lacking
  if (present.length >= 2 && lacking.length === 1) {
    const l = lacking[0];
    const [p0, p1] = present;
    if (l.key === 'können') return {
      line1: [c(p0.short), t(' & '), c(p1.short), t(' sind kein Problem,')],
      line2: [t('uns fehlen aber '), c(l.name), t('.')]
    };
    if (l.key === 'dürfen') return {
      line1: [t('Wir '), c('können'), t(' und '), c('wollen'), t(' KI einsetzen,')],
      line2: [t('aber '), c(l.name), t(' halten uns auf.')]
    };
    // l.key === 'wollen'
    return {
      line1: [t('Wir '), c('können'), t(' und '), c('dürfen'), t(' KI einsetzen,')],
      line2: [t('aber die '), c(l.name), t(' steht im Weg.')]
    };
  }
  return null;
}

// ─── SECTION 2: GLYPHS ────────────────────────────────────────────────────────
function Glyph({
  type,
  accent = OCEAN_THEME.accent
}) {
  const [r, g, b] = accent;
  const col = `rgba(${r},${g},${b},0.78)`;
  const st = {
    display: 'block'
  };
  if (type === 'tech') return /*#__PURE__*/React.createElement("svg", {
    style: st,
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "6",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "6",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "16",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "2",
    fill: col,
    fillOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "16",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "26",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "26",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "26",
    r: "2",
    fill: col
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 6 H16 V16 H26 V26",
    stroke: col,
    strokeWidth: "0.8",
    strokeOpacity: "0.35",
    fill: "none",
    strokeLinecap: "round"
  }));
  if (type === 'ops') return /*#__PURE__*/React.createElement("svg", {
    style: st,
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "16",
    x2: "10",
    y2: "16",
    stroke: col,
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "16",
    x2: "30",
    y2: "16",
    stroke: col,
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "9",
    width: "12",
    height: "14",
    rx: "2",
    stroke: col,
    strokeWidth: "0.85",
    strokeDasharray: "2.5 2",
    fill: "none"
  }));
  if (type === 'ind') return /*#__PURE__*/React.createElement("svg", {
    style: st,
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "2.5",
    fill: col
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "7",
    stroke: col,
    strokeWidth: "0.9",
    fill: "none",
    strokeOpacity: "0.55"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "13",
    stroke: col,
    strokeWidth: "0.65",
    fill: "none",
    strokeOpacity: "0.22",
    strokeDasharray: "3 2.5"
  }));
  return /*#__PURE__*/React.createElement("svg", {
    style: st,
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "16",
    r: "5.5",
    stroke: col,
    strokeWidth: "0.9",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "22",
    cy: "16",
    r: "5.5",
    stroke: col,
    strokeWidth: "0.9",
    fill: "none"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "16",
    cy: "16",
    rx: "2.2",
    ry: "3.8",
    fill: col,
    fillOpacity: "0.55"
  }));
}

// ─── SECTION 2: VISUALIZATIONS ────────────────────────────────────────────────
// Abstrakte Geometrie-Glyphen — keine konkreten Zahlen, keine behaupteten Statistiken.
// Jede Karte zeigt ein einzelnes ruhiges Element, das semantisch andeutet, ohne zu konkretisieren.

// 01 — Marker auf einer Linie: "ein Punkt, an dem wir wirklich wissen, was hängengeblieben ist"
function VizTools({
  accentHx,
  vizMuted
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 110",
    style: {
      width: '100%',
      height: 110,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "55",
    x2: "200",
    y2: "55",
    stroke: accentHx,
    strokeOpacity: "0.30",
    strokeWidth: "0.85",
    strokeDasharray: "2 4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "120",
    y1: "38",
    x2: "120",
    y2: "72",
    stroke: accentHx,
    strokeOpacity: "0.92",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "55",
    r: "11",
    fill: accentHx,
    fillOpacity: "0.14"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "55",
    r: "3.4",
    fill: accentHx,
    fillOpacity: "0.96"
  }));
}

// 02 — Mehrachsige Andeutung: drei feine Achsen durch ein Zentrum, ein dezenter Außenring.
//      Suggeriert "mehrere Dimensionen", ohne irgendeine Zahl zu behaupten.
function VizDonut({
  theme
}) {
  const {
    accentHx
  } = theme;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 110",
    style: {
      width: '100%',
      height: 110,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(120,55)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "26",
    stroke: accentHx,
    strokeOpacity: "0.18",
    strokeWidth: "0.7",
    fill: "none"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "-26",
    x2: "0",
    y2: "26",
    stroke: accentHx,
    strokeOpacity: "0.50",
    strokeWidth: "0.95",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "-22",
    y1: "-13",
    x2: "22",
    y2: "13",
    stroke: accentHx,
    strokeOpacity: "0.50",
    strokeWidth: "0.95",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "-22",
    y1: "13",
    x2: "22",
    y2: "-13",
    stroke: accentHx,
    strokeOpacity: "0.50",
    strokeWidth: "0.95",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "3.2",
    fill: accentHx,
    fillOpacity: "0.96"
  })));
}

// 03 — Sequenz mit gerichteter Spitze: leise Bewegung nach vorn, terminaler Punkt akzentuiert.
//      Suggeriert "was als Nächstes kommt", ohne eine Roadmap zu behaupten.
function VizSkills({
  accentHx,
  accent,
  fg
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 110",
    style: {
      width: '100%',
      height: 110,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(120,55)"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "-58",
    y1: "0",
    x2: "32",
    y2: "0",
    stroke: accentHx,
    strokeOpacity: "0.28",
    strokeWidth: "0.75",
    strokeDasharray: "2 3",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "-58",
    cy: "0",
    r: "2.2",
    fill: accentHx,
    fillOpacity: "0.32"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "-32",
    cy: "0",
    r: "2.6",
    fill: accentHx,
    fillOpacity: "0.50"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "-6",
    cy: "0",
    r: "3",
    fill: accentHx,
    fillOpacity: "0.72"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "0",
    r: "11",
    fill: accentHx,
    fillOpacity: "0.14"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "0",
    r: "5",
    fill: accentHx,
    fillOpacity: "0.96"
  })));
}

// ─── SECTION 2: DIAGNOSIS CARD ────────────────────────────────────────────────
function SentenceCard({
  num,
  viz,
  headline,
  sub,
  accentHx,
  accent,
  fg,
  isMobile = false
}) {
  const [hov, setHov] = useState(false);
  const [ar, ag, ab] = accent;
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      flex: '1 1 0',
      minWidth: isMobile ? '100%' : 240,
      padding: isMobile ? '14px 14px 18px' : '24px 22px 30px',
      borderTop: `1px solid rgba(${ar},${ag},${ab},${hov ? 0.55 : 0.20})`,
      transition: 'border-color 340ms ease, transform 340ms ease',
      transform: hov ? 'translateY(-3px)' : 'translateY(0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: isMobile ? 10 : 22,
      height: isMobile ? 68 : 110,
      display: 'flex',
      alignItems: 'center'
    }
  }, viz), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 11,
      fontWeight: 600,
      color: accentHx,
      letterSpacing: '0.14em',
      marginBottom: isMobile ? 8 : 14
    }
  }, num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 15 : 20,
      fontWeight: 600,
      lineHeight: 1.32,
      color: fg.cardTitle,
      letterSpacing: '-0.014em',
      marginBottom: sub ? 12 : 0
    }
  }, headline), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 13.5,
      fontWeight: 400,
      lineHeight: 1.58,
      color: fg.cardMeta,
      letterSpacing: '-0.003em'
    }
  }, sub));
}

// ─── SECTION 2: LEVEL ITEM ────────────────────────────────────────────────────
function LevelItem({
  type,
  label,
  desc,
  exp
}) {
  const [hov, setHov] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      flex: '1 1 0',
      minWidth: 180,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '36px 24px 40px',
      cursor: 'default'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Glyph, {
    type: type
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 11,
      fontWeight: 600,
      color: 'rgba(228,222,212,0.88)',
      letterSpacing: '0.10em',
      textTransform: 'uppercase',
      marginBottom: 10
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 12.5,
      fontWeight: 400,
      color: 'rgba(150,145,135,0.70)',
      lineHeight: 1.52
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 12,
      fontWeight: 400,
      color: 'rgba(165,160,148,0.58)',
      lineHeight: 1.55,
      marginTop: 12,
      opacity: hov ? 1 : 0,
      maxHeight: hov ? '70px' : 0,
      overflow: 'hidden',
      transition: 'opacity 300ms ease, max-height 320ms ease'
    }
  }, exp));
}

// ─── SECTION 2 ────────────────────────────────────────────────────────────────
// Headline-Wörter mit data-s2-wi — Scroll-Assemble in App (invers zu Section-1-Disassemble)
function Section2({
  headlineRef,
  contentRef,
  theme,
  isMobile,
  firma = ''
}) {
  const h2Font = "'Inter',sans-serif";
  const {
    fg
  } = theme;
  const h2Base = fg.h2;
  const dot = w => /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.accentHx
    }
  }, w);
  const headParts = [{
    t: 'Wenn'
  }, {
    t: 'Sie'
  }, {
    t: 'diese'
  }, {
    t: 'drei'
  }, {
    t: 'Sätze'
  }, {
    t: 'mit'
  }, {
    t: 'Überzeugung',
    amber: true
  }, {
    t: 'sagen'
  }, {
    t: 'können,'
  }, {
    t: 'brauchen'
  }, {
    t: 'Sie'
  }, {
    t: 'keine',
    amber: true
  }, {
    t: 'externe'
  }, {
    t: 'Unterstützung.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      width: '100%',
      background: theme.bg,
      padding: isMobile ? '40px 20px 40px' : '172px 32px 168px',
      borderTop: `1px solid ${fg.sectionBorder}`,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: contentRef,
    style: {
      maxWidth: 940,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    ref: headlineRef,
    style: {
      fontFamily: h2Font,
      fontSize: isMobile ? 'clamp(18px, 5.5vw, 24px)' : 'clamp(23px, 3.1vw, 40px)',
      fontWeight: 700,
      lineHeight: isMobile ? 1.3 : 1.4,
      color: h2Base,
      letterSpacing: '-0.022em',
      marginBottom: isMobile ? 24 : 76,
      maxWidth: 800,
      textShadow: fg.h2Shadow
    }
  }, headParts.map((p, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    "data-s2-wi": i,
    style: {
      color: p.ink ? theme.light ? '#0d0d0d' : h2Base : p.amber ? theme.accentHx : h2Base,
      display: 'inline-block',
      whiteSpace: 'pre'
    }
  }, p.t), i < headParts.length - 1 ? ' ' : ''))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: isMobile ? 32 : 52,
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement(SentenceCard, {
    num: "01",
    viz: /*#__PURE__*/React.createElement(VizTools, {
      accentHx: theme.accentHx,
      vizMuted: theme.vizMuted
    }),
    accentHx: theme.accentHx,
    accent: theme.accent,
    fg: fg,
    isMobile: isMobile,
    headline: firma ? /*#__PURE__*/React.createElement(React.Fragment, null, "\u201EWir wissen, welche KI-Investitionen f\xFCr ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: theme.accentHx,
        fontWeight: 600
      }
    }, firma), " sinnvoll sind \u2014 ", dot('und welche nicht'), ".\"") : /*#__PURE__*/React.createElement(React.Fragment, null, "\u201EWir wissen, welche KI-Investitionen f\xFCr unser Unternehmen sinnvoll sind \u2014 ", dot('und welche nicht'), ".\"")
  }), /*#__PURE__*/React.createElement(SentenceCard, {
    num: "02",
    viz: /*#__PURE__*/React.createElement(VizDonut, {
      theme: theme
    }),
    accentHx: theme.accentHx,
    accent: theme.accent,
    fg: fg,
    isMobile: isMobile,
    headline: /*#__PURE__*/React.createElement(React.Fragment, null, "\u201EWir wissen, woran wir Erfolg messen \u2014 ", dot('bevor investiert wird'), ", nicht erst danach.\"")
  }), /*#__PURE__*/React.createElement(SentenceCard, {
    num: "03",
    viz: /*#__PURE__*/React.createElement(VizSkills, {
      accentHx: theme.accentHx,
      accent: theme.accent,
      fg: fg
    }),
    accentHx: theme.accentHx,
    accent: theme.accent,
    fg: fg,
    isMobile: isMobile,
    headline: /*#__PURE__*/React.createElement(React.Fragment, null, "\u201EWir wissen, womit wir konkret anfangen \u2014 und ", dot('warum gerade damit'), ".\"")
  }))));
}

// ─── SECTION 3: CTA ──────────────────────────────────────────────────────────
// Custom thin-line SVG icons in der gleichen Bildsprache wie Section-2-Visualisierungen.
function CtaIcon({
  kind,
  accentHx
}) {
  const s = {
    width: 22,
    height: 22,
    display: 'block'
  };
  const stroke = {
    stroke: accentHx,
    strokeWidth: 1.4,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  if (kind === 'clock') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 22 22",
    style: s
  }, /*#__PURE__*/React.createElement("circle", _extends({
    cx: "11",
    cy: "11",
    r: "8"
  }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
    d: "M11 6.5 V11 L14.4 13"
  }, stroke)));
  if (kind === 'eye') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 22 22",
    style: s
  }, /*#__PURE__*/React.createElement("path", _extends({
    d: "M2.2 11 C 4.7 6.3, 8 4.4, 11 4.4 C 14 4.4, 17.3 6.3, 19.8 11 C 17.3 15.7, 14 17.6, 11 17.6 C 8 17.6, 4.7 15.7, 2.2 11 Z"
  }, stroke)), /*#__PURE__*/React.createElement("circle", _extends({
    cx: "11",
    cy: "11",
    r: "2.6"
  }, stroke)));
  if (kind === 'reticle') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 22 22",
    style: s
  }, /*#__PURE__*/React.createElement("circle", _extends({
    cx: "11",
    cy: "11",
    r: "7.4"
  }, stroke)), /*#__PURE__*/React.createElement("circle", _extends({
    cx: "11",
    cy: "11",
    r: "2.6"
  }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
    d: "M11 1.6 V4 M11 18 V20.4 M1.6 11 H4 M18 11 H20.4"
  }, stroke)));
  if (kind === 'compass') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 22 22",
    style: s
  }, /*#__PURE__*/React.createElement("circle", _extends({
    cx: "11",
    cy: "11",
    r: "8"
  }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
    d: "M7.4 14.6 L10 8.6 L14.6 7.4 L12 13.4 Z"
  }, stroke)), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "0.9",
    fill: accentHx,
    stroke: "none"
  }));
  return null;
}
function Section3({
  theme,
  sectionRef,
  isMobile,
  isSmallH,
  firma = ''
}) {
  const {
    fg,
    accent,
    accentHx
  } = theme;
  const [ar, ag, ab] = accent;
  const [hovBtn, setHovBtn] = useState(false);
  const [hovLi, setHovLi] = useState(false);
  const [hovMail, setHovMail] = useState(false);
  const items = useMemo(() => [{
    kind: 'clock',
    text: '40 Minuten'
  }, {
    kind: 'eye',
    text: firma ? `Au\xdfenansicht auf laufende KI-Initiativen bei ${firma}` : 'Au\xdfenansicht auf laufende KI-Initiativen'
  }, {
    kind: 'reticle',
    text: 'Kritischer Blick auf Annahmen hinter der bisherigen Strategie'
  }, {
    kind: 'compass',
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Eine ehrliche Empfehlung zum n\xE4chsten Schritt \u2014 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: fg.cardMeta
      }
    }, "mit oder ohne mich"))
  }], [firma, fg.cardMeta]);
  return /*#__PURE__*/React.createElement("section", {
    ref: sectionRef,
    style: {
      width: '100%',
      background: theme.bg,
      borderTop: `1px solid ${fg.sectionBorder}`,
      padding: isMobile ? isSmallH ? '20px 20px 40px' : '32px 20px 64px' : '148px 32px 160px',
      position: 'relative',
      overflow: 'hidden',
      ...(isMobile ? {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      } : {})
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 940,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.14em',
      color: accentHx,
      marginBottom: isMobile ? 8 : 28
    }
  }, "04 \u2014 Gespr\xE4ch"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: isMobile ? 6 : 18,
      width: isMobile ? 42 : 54,
      height: isMobile ? 42 : 54
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 54 54",
    fill: "none",
    style: {
      width: isMobile ? 42 : 54,
      height: isMobile ? 42 : 54,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "46",
    height: "38",
    rx: "11",
    fill: `rgba(${ar},${ag},${ab},${theme.light ? 0.10 : 0.15})`,
    stroke: accentHx,
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "20",
    r: "2.8",
    fill: accentHx,
    fillOpacity: "0.85"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "20",
    r: "2.8",
    fill: accentHx,
    fillOpacity: "0.85"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "20",
    r: "2.8",
    fill: accentHx,
    fillOpacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 38 L6 48 L20 40",
    fill: `rgba(${ar},${ag},${ab},${theme.light ? 0.10 : 0.15})`,
    stroke: accentHx,
    strokeWidth: "1.6",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 'clamp(20px, 5.5vw, 26px)' : 'clamp(28px, 3.6vw, 46px)',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.025em',
      color: fg.h2,
      textShadow: fg.h2Shadow,
      margin: isMobile ? '0 0 8px' : '0 0 20px',
      maxWidth: 520
    }
  }, "Ein Gespr\xE4ch bringt", ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: accentHx
    }
  }, "Klarheit")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 14 : 16,
      fontWeight: 400,
      lineHeight: 1.58,
      color: fg.cardMeta,
      margin: '0 0 0',
      maxWidth: 460
    }
  }, "Kein Pitch, sondern ein ehrlicher Blick auf ", firma ? /*#__PURE__*/React.createElement(React.Fragment, null, "die KI-Initiativen bei ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: accentHx,
      fontWeight: 600
    }
  }, firma), ".") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: accentHx
    }
  }, "Ihre Situation"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: `linear-gradient(to right, rgba(${ar},${ag},${ab},0.32), rgba(${ar},${ag},${ab},0.04) 60%, transparent)`,
      marginBottom: isMobile ? 14 : 36,
      marginTop: isMobile ? 14 : 48
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: isMobile ? '0 0 16px' : '0 0 56px',
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? 10 : 18
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: isMobile ? 12 : 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? 32 : 38,
      height: isMobile ? 32 : 38,
      flexShrink: 0,
      borderRadius: 10,
      background: `rgba(${ar},${ag},${ab},${theme.light ? 0.06 : 0.10})`,
      border: `1px solid rgba(${ar},${ag},${ab},0.22)`,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(CtaIcon, {
    kind: it.kind,
    accentHx: accentHx
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 13.5 : 15.5,
      fontWeight: 400,
      lineHeight: 1.48,
      color: fg.cardTitle,
      paddingTop: isMobile ? 5 : 8
    }
  }, it.text)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: isMobile ? 16 : 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHovBtn(true),
    onMouseLeave: () => setHovBtn(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 12 : 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/moritz.png",
    alt: "Moritz Steinbach",
    width: isMobile ? 46 : 54,
    height: isMobile ? 46 : 54,
    style: {
      width: isMobile ? 46 : 54,
      height: isMobile ? 46 : 54,
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: 0,
      border: `2px solid rgba(${ar},${ag},${ab},0.4)`,
      boxShadow: '0 2px 14px rgba(0,0,0,0.12)'
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "https://calendly.com/hallo-moritz-steinbach/30min",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 14 : 15.5,
      fontWeight: 600,
      letterSpacing: '-0.012em',
      padding: isMobile ? '14px 24px 14px 28px' : '17px 30px 17px 34px',
      borderRadius: 10,
      background: `rgba(${ar},${ag},${ab},${hovBtn ? 1 : 0.94})`,
      color: theme.light ? '#ffffff' : '#0d0d0d',
      textDecoration: 'none',
      boxShadow: hovBtn ? `0 14px 44px rgba(${ar},${ag},${ab},0.42), inset 0 0 0 1px rgba(255,255,255,${theme.light ? 0.12 : 0.06})` : `0 6px 22px rgba(${ar},${ag},${ab},0.24), inset 0 0 0 1px rgba(255,255,255,${theme.light ? 0.10 : 0.05})`,
      transition: 'background 220ms ease, box-shadow 220ms ease, transform 220ms ease',
      transform: hovBtn ? 'translateY(-1px)' : 'translateY(0)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Termin vereinbaren"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      transform: hovBtn ? 'translateX(5px)' : 'translateX(0)',
      transition: 'transform 240ms cubic-bezier(0.2,0.7,0.3,1)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "14",
    viewBox: "0 0 18 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 7 H16 M11 2 L16 7 L11 12",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '8px 22px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://de.linkedin.com/in/moritz-steinbach/de",
    target: "_blank",
    rel: "noopener noreferrer",
    onMouseEnter: () => setHovLi(true),
    onMouseLeave: () => setHovLi(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: "'Inter',sans-serif",
      fontSize: 13.5,
      fontWeight: 500,
      color: hovLi ? fg.h2 : fg.cardMeta,
      textDecoration: 'none',
      borderBottom: `1px solid ${hovLi ? fg.h2 : 'transparent'}`,
      paddingBottom: 1,
      transition: 'color 160ms ease, border-color 160ms ease'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      display: 'block',
      opacity: 0.92
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  })), "Mehr \xFCber mich"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: fg.cardMuted,
      opacity: 0.6,
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:hallo@moritz-steinbach.de",
    onMouseEnter: () => setHovMail(true),
    onMouseLeave: () => setHovMail(false),
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 13.5,
      fontWeight: 500,
      color: hovMail ? fg.h2 : fg.cardMeta,
      textDecoration: 'none',
      borderBottom: `1px solid ${hovMail ? fg.h2 : 'transparent'}`,
      paddingBottom: 1,
      transition: 'color 160ms ease, border-color 160ms ease'
    }
  }, "Oder schreiben Sie mir direkt"))))));
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const canvasRef = useRef(null);
  const vertsRef = useRef(null);
  const orbPosRef = useRef(null);
  const baryRef = useRef({
    u: 1 / 3,
    v: 1 / 3,
    w: 1 / 3
  });
  const draggingRef = useRef(false);
  const trailRef = useRef([]);
  const particlesRef = useRef([]);
  const [verts, setVerts] = useState(null);
  const [bary, setBary] = useState({
    u: 1 / 3,
    v: 1 / 3,
    w: 1 / 3
  });
  const [orbPos, setOrbPos] = useState(null);
  const [drag, setDrag] = useState(false);
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  const [revealKey, setRevealKey] = useState(0);
  const [hasMovedOrb, setHasMovedOrb] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const satzSigRef = useRef(null);
  const overlayRef = useRef(null);
  const satzWrapRef = useRef(null);
  const satzHeadingRef = useRef(null);
  const satzFallbackRef = useRef(null);
  const heroFadeRef = useRef(null);
  const section2Ref = useRef(null);
  const section2OuterRef = useRef(null);
  const section2ContentRef = useRef(null);
  const section2HeadlineRef = useRef(null);
  const section3Ref = useRef(null);
  const scrollHintRef = useRef(null);
  const scrollHintS2Ref = useRef(null);
  const scrollHintCanShowRef = useRef(false);
  const wheelLockUntilRef = useRef(0);
  const themeRef = useRef(OCEAN_THEME);
  // Page-flip state
  const pageRef = useRef(0);
  const isFlippingRef = useRef(false);
  const touchStartRef = useRef({
    x: 0,
    y: 0
  });
  const theme = OCEAN_THEME;

  // Debug: ?mobile=1 erzwingt Mobile-Layout im Browser-Tool (kein Effekt auf echten Geräten nötig)
  const forceMobile = (() => {
    try {
      return new URLSearchParams(window.location.search).get('mobile') === '1';
    } catch {
      return false;
    }
  })();
  const isMobile = forceMobile || size.w < 640;
  const isSmallH = size.h < 720; // z.B. iPhone SE (667px) oder kleine Androids
  const firma = useMemo(() => getFirmaFromUrl(), []);

  // ─── PAGE-FLIP CONTROLLER ────────────────────────────────────────────────────
  // Drei fixed-Sections; currentPage steuert Sichtbarkeit per opacity/pointer-events.
  // Kein scroll-basiertes Layout mehr — kein Scrollbar, keine Alignment-Probleme.
  const gotoPage = useCallback(target => {
    if (isFlippingRef.current) return;
    const clamped = Math.max(0, Math.min(2, target));
    if (clamped === pageRef.current) return;
    isFlippingRef.current = true;
    pageRef.current = clamped;
    setCurrentPage(clamped);
    scrollHintCanShowRef.current = false;
    setTimeout(() => {
      isFlippingRef.current = false;
      scrollHintCanShowRef.current = true;
    }, 600);
  }, []);
  const flipPage = useCallback(dir => {
    gotoPage(pageRef.current + dir);
  }, [gotoPage]);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);
  useEffect(() => {
    document.body.style.background = theme.bg;
    const [r, g, b] = theme.accent;
    document.documentElement.style.setProperty('--sel', `rgba(${r},${g},${b},0.25)`);
  }, [theme]);
  useEffect(() => {
    document.title = firma ? `${firma} \xb7 Moritz Steinbach` : SITE_TITLE_DEFAULT;
  }, [firma]);

  // Compute triangle vertices from viewport size
  const mkVerts = (w, h) => {
    const mob = w < 640;
    const r = Math.min(w, h) * (mob ? 0.34 : 0.27);
    const cx = w * 0.5;
    const cy = h * (mob ? 0.40 : 0.452);
    return {
      v0: {
        x: cx + r * Math.cos(-Math.PI / 2),
        y: cy + r * Math.sin(-Math.PI / 2)
      },
      // top → Können
      v1: {
        x: cx + r * Math.cos(Math.PI / 6),
        y: cy + r * Math.sin(Math.PI / 6)
      },
      // bottom-right → Dürfen
      v2: {
        x: cx + r * Math.cos(5 * Math.PI / 6),
        y: cy + r * Math.sin(5 * Math.PI / 6)
      },
      // bottom-left → Wollen
      r,
      cx,
      cy
    };
  };

  // Init / resize
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth,
        h = window.innerHeight;
      setSize({
        w,
        h
      });
      const v = mkVerts(w, h);
      setVerts(v);
      vertsRef.current = v;
      particlesRef.current = initParticles(w, h, w < 640 ? 22 : N_PART);
      if (!orbPosRef.current) {
        const c = baryToCart(1 / 3, 1 / 3, 1 / 3, v.v0, v.v1, v.v2);
        orbPosRef.current = c;
        setOrbPos({
          ...c
        });
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Canvas sizing
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = size.w * dpr;
    c.height = size.h * dpr;
    c.style.width = size.w + 'px';
    c.style.height = size.h + 'px';
  }, [size]);

  // Animation loop (runs once, reads refs)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const t0 = performance.now();
    let raf;
    const frame = ts => {
      const t = ts - t0;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const v = vertsRef.current,
        orb = orbPosRef.current,
        b = baryRef.current;
      if (v && orb) {
        const pal = themeRef.current;
        drawParticles(ctx, particlesRef.current, t, dpr, pal);
        drawFill(ctx, v.v0, v.v1, v.v2, orb, dpr, pal);
        drawTessellation(ctx, v.v0, v.v1, v.v2, b, dpr, pal);
        drawEdges(ctx, v.v0, v.v1, v.v2, b, dpr, pal);
        drawTrail(ctx, trailRef.current, dpr, pal);
        drawOrb(ctx, orb, t, draggingRef.current, dpr, pal);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Update orb state + refs
  const updOrb = useCallback((pos, b) => {
    orbPosRef.current = pos;
    baryRef.current = b;
    setOrbPos({
      ...pos
    });
    setBary({
      ...b
    });
    const eps = 0.012;
    if (Math.abs(b.u - 1 / 3) > eps || Math.abs(b.v - 1 / 3) > eps || Math.abs(b.w - 1 / 3) > eps) {
      setHasMovedOrb(true);
    }
  }, []);

  // Pointer events
  const onDown = useCallback((x, y) => {
    const v = vertsRef.current;
    if (!v) return;
    if (insideTri(x, y, v.v0, v.v1, v.v2)) {
      draggingRef.current = true;
      setDrag(true);
      const {
        pos,
        bary: b
      } = clampTri(x, y, v.v0, v.v1, v.v2);
      updOrb(pos, b);
    }
  }, [updOrb]);
  const onMove = useCallback((x, y) => {
    if (!draggingRef.current || !vertsRef.current) return;
    const {
      pos,
      bary: b
    } = clampTri(x, y, vertsRef.current.v0, vertsRef.current.v1, vertsRef.current.v2);
    trailRef.current = [...trailRef.current.slice(-20), pos];
    updOrb(pos, b);
  }, [updOrb]);
  const onUp = useCallback(() => {
    draggingRef.current = false;
    setDrag(false);
    setTimeout(() => {
      trailRef.current = [];
    }, 350);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = e => {
      // Space / PageDown / PageUp → Page-Flip
      if (e.key === 'PageDown' || e.key === ' ' && !e.shiftKey) {
        e.preventDefault();
        flipPage(1);
        return;
      }
      if (e.key === 'PageUp' || e.key === ' ' && e.shiftKey) {
        e.preventDefault();
        flipPage(-1);
        return;
      }
      if (!vertsRef.current || !orbPosRef.current) return;
      const step = 4;
      const map = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step]
      };
      if (!map[e.key]) return;
      e.preventDefault();
      const [dx, dy] = map[e.key];
      const nx = orbPosRef.current.x + dx,
        ny = orbPosRef.current.y + dy;
      const {
        pos,
        bary: b
      } = clampTri(nx, ny, vertsRef.current.v0, vertsRef.current.v1, vertsRef.current.v2);
      updOrb(pos, b);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [updOrb, flipPage]);

  // Reset
  const reset = () => {
    const v = vertsRef.current;
    if (!v) return;
    const c = baryToCart(1 / 3, 1 / 3, 1 / 3, v.v0, v.v1, v.v2);
    setHasMovedOrb(false);
    updOrb(c, {
      u: 1 / 3,
      v: 1 / 3,
      w: 1 / 3
    });
    trailRef.current = [];
  };

  // ─── WHEEL → Page-Flip ───────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = e => {
      e.preventDefault();
      if (isFlippingRef.current) return;
      const now = performance.now();
      if (now < wheelLockUntilRef.current) return;
      const dy = e.deltaY;
      if (!Number.isFinite(dy) || Math.abs(dy) < 14) return;
      const dir = dy > 0 ? 1 : -1;
      // Harte Cooldown-Sperre verhindert Doppel-Flips durch Trackpad-Inertia.
      wheelLockUntilRef.current = now + (isMobile ? 520 : 460);
      flipPage(dir);
    };
    window.addEventListener('wheel', onWheel, {
      passive: false
    });
    return () => window.removeEventListener('wheel', onWheel);
  }, [flipPage, isMobile]);

  // ─── DOCUMENT-TOUCH → Page-Flip (Section 2 & 3, nicht Hero) ─────────────────
  useEffect(() => {
    let sy = 0,
      sx = 0;
    const onTS = e => {
      sy = e.touches[0].clientY;
      sx = e.touches[0].clientX;
    };
    const onTE = e => {
      const dy = sy - e.changedTouches[0].clientY;
      const dx = sx - e.changedTouches[0].clientX;
      if (Math.abs(dy) > 44 && Math.abs(dy) > Math.abs(dx) * 1.1) {
        flipPage(dy > 0 ? 1 : -1);
      } else if (pageRef.current !== 0 && Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.1) {
        flipPage(dx > 0 ? 1 : -1);
      }
    };
    document.addEventListener('touchstart', onTS, {
      passive: true
    });
    document.addEventListener('touchend', onTE, {
      passive: true
    });
    return () => {
      document.removeEventListener('touchstart', onTS);
      document.removeEventListener('touchend', onTE);
    };
  }, [flipPage]);

  // Scroll-Hinweis erst nach 3 s freigeben (nach jedem Seitenwechsel zurücksetzen)
  useEffect(() => {
    scrollHintCanShowRef.current = false;
    if (scrollHintRef.current) scrollHintRef.current.style.opacity = '0';
    if (scrollHintS2Ref.current) scrollHintS2Ref.current.style.opacity = '0';
    const t = setTimeout(() => {
      scrollHintCanShowRef.current = true;
      if (currentPage === 0 && scrollHintRef.current) scrollHintRef.current.style.opacity = '1';
      if (currentPage === 1 && scrollHintS2Ref.current) scrollHintS2Ref.current.style.opacity = '1';
    }, 3000);
    return () => clearTimeout(t);
  }, [currentPage]);

  // Trigger reveal animation when sentence content changes
  const satzSig = (() => {
    const s = getSatzParts(bary, theme.accentHx);
    if (!s) return 'null';
    return s.line1.map(p => p.text || '').join('') + '|' + s.line2.map(p => p.text || '').join('');
  })();
  useEffect(() => {
    if (satzSig !== satzSigRef.current) {
      satzSigRef.current = satzSig;
      setRevealKey(k => k + 1);
    }
  }, [satzSig]);

  // Per-category visibility — main fades in first, subs gradually, one sub always shown
  const NEAR_MAIN = isMobile ? 0.30 : 0.36;
  const NEAR_FIRST_SUB = isMobile ? 0.32 : 0.48;
  const NEAR_SUB = isMobile ? 0.40 : 0.60;
  const baryArr = [bary.u, bary.v, bary.w];
  const mainVis = baryArr.map(v => v > NEAR_MAIN);
  // Helper to get visibility for a node: nodeIdx in [0,1,2,3] where 0=main, 1/2/3=subs
  const getNodeVis = (catIdx, nodeIdx) => {
    if (isMobile) return true;
    const v = baryArr[catIdx];
    if (nodeIdx === 0) return v > NEAR_MAIN; // main
    if (nodeIdx === 1) return v > NEAR_FIRST_SUB; // first sub (always visible soon)
    return v > NEAR_SUB; // other subs (visible only when close)
  };

  // Build network layout: each category = 1 hub (vertex) + 4 satellite nodes
  // arranged in an arc around it. All satellites sit at the same arc radius;
  // the main label is the slot nearest the outward direction, subs flank it.
  const layout = useMemo(() => {
    if (!verts) return [];
    const {
      v0,
      v1,
      v2
    } = verts;
    // Per-vertex outward direction + which side the text label sits on, so it
    // never overlaps neighbouring nodes or the orb path.
    // hubOffset: Anker der Kanten — näher an der Ecke als am Label, damit Linien
    // nicht aus der Wortmitte zu starten scheinen (Abstand zu Können/Dürfen/Wollen).
    const cfg = [{
      v: v0,
      outAng: -Math.PI / 2,
      side: 'top',
      hubOffset: isMobile ? {
        x: 0,
        y: -30
      } : {
        x: 0,
        y: -44
      }
    }, {
      v: v1,
      outAng: -Math.PI / 6,
      side: 'right',
      hubOffset: isMobile ? {
        x: 40,
        y: -2
      } : {
        x: 58,
        y: -2
      }
    }, {
      v: v2,
      outAng: Math.PI + Math.PI / 6,
      side: 'left',
      hubOffset: isMobile ? {
        x: -40,
        y: -2
      } : {
        x: -58,
        y: -2
      }
    }];
    // 4 Slots auf einem Bogen um outAng; Können (oben) weiter nach links/rechts
    const SLOTS_DEFAULT = (isMobile ? [-0.24, -0.08, 0.08, 0.24] : [-0.30, -0.10, 0.10, 0.30]).map(t => t * Math.PI);
    const SLOTS_KOENNEN = (isMobile ? [-0.30, -0.10, 0.10, 0.30] : [-0.42, -0.14, 0.14, 0.42]).map(t => t * Math.PI);
    // Arc radius — bounded so v0's top arc never escapes the viewport
    const cyTop = v0.y;
    const arcR = isMobile ? Math.max(58, Math.min(96, cyTop - 24)) : Math.max(80, Math.min(150, cyTop - 28));
    return cfg.map(({
      v,
      outAng,
      side,
      hubOffset
    }, ci) => {
      const cat = KATEGORIEN[ci];
      const slotAngles = ci === 0 ? SLOTS_KOENNEN : SLOTS_DEFAULT;
      const slots = slotAngles.map(rel => {
        const a = outAng + rel;
        const raw = {
          x: v.x + Math.cos(a) * arcR,
          y: v.y + Math.sin(a) * arcR
        };
        if (!isMobile) return raw;
        // Mobile: keep labels inside viewport to prevent clipping/overlap at edges.
        const padX = 16;
        const padTop = 18;
        const padBottom = 110;
        return {
          x: clamp(raw.x, padX, size.w - padX),
          y: clamp(raw.y, padTop, size.h - padBottom)
        };
      });
      return {
        vertex: v,
        ci,
        side,
        arcR,
        hub: {
          x: v.x + hubOffset.x,
          y: v.y + hubOffset.y
        },
        nodes: (() => {
          const n = [{
            text: cat.main,
            pos: {
              ...slots[1]
            },
            isMain: true
          }, {
            text: cat.subs[0],
            pos: {
              ...slots[0]
            },
            isMain: false
          }, {
            text: cat.subs[1],
            pos: {
              ...slots[2]
            },
            isMain: false
          }, {
            text: cat.subs[2],
            pos: {
              ...slots[3]
            },
            isMain: false
          }];
          // Können (ci=0): „Lückenhafte Datenqualität“ etwas tiefer, weniger Überlapp mit dem Hauptpunkt
          if (ci === 0) {
            const dy = isMobile ? 16 : 22;
            n[2].pos = {
              ...n[2].pos,
              y: n[2].pos.y + dy
            };
          }
          return n;
        })()
      };
    });
  }, [verts, isMobile, size.w, size.h]);
  const mobileSubLabels = null; // ersetzt durch MobileVertexBlock-Komponente

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      opacity: currentPage === 0 ? 1 : 0,
      pointerEvents: currentPage === 0 ? 'auto' : 'none',
      transition: 'opacity 350ms ease',
      zIndex: currentPage === 0 ? 10 : 5,
      overflow: 'hidden',
      background: theme.bg,
      cursor: drag ? 'grabbing' : 'crosshair'
    },
    onMouseDown: e => onDown(e.clientX, e.clientY),
    onMouseMove: e => onMove(e.clientX, e.clientY),
    onMouseUp: onUp,
    onMouseLeave: onUp,
    onTouchStart: e => {
      e.preventDefault();
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      onDown(e.touches[0].clientX, e.touches[0].clientY);
    },
    onTouchMove: e => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    onTouchEnd: e => {
      const dy = touchStartRef.current.y - e.changedTouches[0].clientY;
      const dx = touchStartRef.current.x - e.changedTouches[0].clientX;
      if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx) * 1.2) flipPage(dy > 0 ? 1 : -1);
      onUp();
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: heroFadeRef,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0
    }
  }), verts && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VLabel, {
    label: "K\xF6nnen",
    sub: "Technologie & Skills",
    pos: verts.v0,
    align: "top",
    proximity: bary.u,
    fg: theme.fg,
    isMobile: isMobile
  }), /*#__PURE__*/React.createElement(VLabel, {
    label: "D\xFCrfen",
    sub: "Compliance & Sicherheit",
    pos: verts.v1,
    align: "right",
    proximity: bary.v,
    fg: theme.fg,
    isMobile: isMobile
  }), /*#__PURE__*/React.createElement(VLabel, {
    label: "Wollen",
    sub: "Kultur & Innovation",
    pos: verts.v2,
    align: "left",
    proximity: bary.w,
    fg: theme.fg,
    isMobile: isMobile
  })), !isMobile && verts && /*#__PURE__*/React.createElement("svg", {
    key: `net-${theme.id}`,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 5,
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "hub-glow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: `rgba(${theme.hubHi[0]},${theme.hubHi[1]},${theme.hubHi[2]},0.55)`
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "55%",
    stopColor: `rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},0.12)`
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: `rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},0)`
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "node-glow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: `rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},0.32)`
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: `rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},0)`
  }))), layout.map(cat => {
    const hub = cat.hub;
    const prox = baryArr[cat.ci];
    return /*#__PURE__*/React.createElement("g", {
      key: `cl-${cat.ci}`
    }, cat.nodes.map((it, i) => {
      const a = hub,
        b = it.pos;
      const dx = b.x - a.x,
        dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len,
        uy = dy / len;
      const hubGap = it.isMain ? 22 : 26;
      const nodeGap = it.isMain ? 5.5 : 4;
      const sa = {
        x: a.x + ux * hubGap,
        y: a.y + uy * hubGap
      };
      const sb = {
        x: b.x - ux * nodeGap,
        y: b.y - uy * nodeGap
      };
      const px = -uy,
        py = ux;
      const curve = i === 1 ? 6 : i === 2 ? -6 : i === 0 ? 14 : -14;
      const mid = {
        x: (sa.x + sb.x) / 2 + px * curve,
        y: (sa.y + sb.y) / 2 + py * curve
      };
      const d = `M ${sa.x} ${sa.y} Q ${mid.x} ${mid.y} ${sb.x} ${sb.y}`;
      const strokeOp = (it.isMain ? 0.42 : 0.28) + prox * 0.18;
      const nodeVis = getNodeVis(cat.ci, i);
      const op = nodeVis ? 1 : 0;
      return /*#__PURE__*/React.createElement("path", {
        key: i,
        d: d,
        fill: "none",
        stroke: `rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},${strokeOp.toFixed(3)})`,
        strokeWidth: it.isMain ? 0.8 : 0.5,
        strokeLinecap: "round",
        style: {
          opacity: op,
          transition: 'opacity 500ms ease'
        }
      });
    }), cat.nodes.map((it, i) => {
      const nodeVis = getNodeVis(cat.ci, i);
      const op = nodeVis ? 1 : 0;
      return /*#__PURE__*/React.createElement("g", {
        key: `n-${i}`,
        style: {
          opacity: op,
          transition: 'opacity 500ms ease'
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: it.pos.x,
        cy: it.pos.y,
        r: it.isMain ? 14 : 9,
        fill: "url(#node-glow)"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: it.pos.x,
        cy: it.pos.y,
        r: it.isMain ? 3.6 : 2.4,
        fill: `rgba(${theme.hubHi[0]},${theme.hubHi[1]},${theme.hubHi[2]},0.95)`
      }));
    }));
  })), !isMobile && layout.map(cat => /*#__PURE__*/React.createElement(React.Fragment, {
    key: `labels-${cat.ci}`
  }, cat.nodes.map((it, i) => /*#__PURE__*/React.createElement(Term, {
    key: i,
    text: it.text,
    isMain: it.isMain,
    visible: getNodeVis(cat.ci, i),
    proximity: baryArr[cat.ci],
    pos: it.pos,
    side: cat.side,
    fg: theme.fg,
    isMobile: isMobile
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    style: {
      position: 'absolute',
      bottom: 22,
      right: 22,
      background: theme.fg.resetBg,
      backdropFilter: 'blur(12px)',
      border: `1px solid ${theme.fg.resetBorder}`,
      borderRadius: 6,
      color: theme.fg.resetFg,
      fontSize: 11,
      fontFamily: "'Inter',sans-serif",
      fontWeight: 400,
      letterSpacing: '0.07em',
      padding: '8px 14px',
      cursor: 'pointer',
      pointerEvents: 'auto',
      transition: 'opacity 200ms, color 200ms',
      opacity: 0.65
    },
    onMouseEnter: e => {
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.color = theme.fg.resetHoverFg;
    },
    onMouseLeave: e => {
      e.currentTarget.style.opacity = '0.65';
      e.currentTarget.style.color = theme.fg.resetFg;
    }
  }, "Zur\xFCcksetzen")), verts && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: verts.v1.y + (isMobile ? isSmallH ? 36 : 46 : 95),
      textAlign: 'center',
      pointerEvents: 'none',
      zIndex: 10,
      width: isMobile ? 'min(92vw, 360px)' : 'auto'
    }
  }, hasMovedOrb && /*#__PURE__*/React.createElement("div", {
    ref: satzHeadingRef,
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? 12 : 15,
      fontWeight: 500,
      color: theme.fg.satzKicker,
      letterSpacing: '0.02em',
      marginBottom: isMobile ? 7 : 10,
      whiteSpace: isMobile ? 'normal' : 'nowrap',
      maxWidth: isMobile ? 'min(92vw, 340px)' : 'none',
      lineHeight: 1.35,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, "Was h\xE4lt ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.accentHx
    }
  }, "Sie"), " noch zur\xFCck?"), /*#__PURE__*/React.createElement("div", {
    ref: satzWrapRef
  }, (() => {
    const s = getSatzParts(bary, theme.accentHx);
    const fg = theme.fg;
    const lineStyle = {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? isSmallH ? 21 : 24 : 40,
      fontWeight: 700,
      lineHeight: isMobile ? 1.28 : 1.4,
      color: fg.satzLine,
      letterSpacing: '-0.022em',
      whiteSpace: isMobile ? 'normal' : 'nowrap',
      maxWidth: isMobile ? 'min(88vw, 310px)' : 'none',
      margin: isMobile ? '0 auto' : undefined,
      textShadow: fg.satzShadow,
      display: 'block'
    };
    const fallbackStyle = {
      fontFamily: "'Inter',sans-serif",
      fontSize: isMobile ? isSmallH ? 21 : 24 : 34,
      fontWeight: 500,
      lineHeight: 1.42,
      color: fg.satzLine,
      letterSpacing: '-0.02em',
      textShadow: fg.satzShadow,
      display: 'block',
      maxWidth: isMobile ? 'min(92vw, 360px)' : 540,
      margin: '0 auto',
      whiteSpace: 'normal'
    };
    if (!s) {
      if (hasMovedOrb) return null;
      return /*#__PURE__*/React.createElement("div", {
        ref: satzFallbackRef,
        style: fallbackStyle
      }, "Bewege den Punkt im Dreieck \u2026");
    }
    let wi = 0;
    const renderWords = line => line.flatMap((p, pi) => p.text.split(/(\s+)/).filter(Boolean).map((tok, ti) => {
      const isSpace = /^\s+$/.test(tok);
      let wordIdx = -1;
      let delay = 0;
      if (!isSpace) {
        wordIdx = wi;
        wi++;
        delay = wordIdx * 0.055;
      }
      return /*#__PURE__*/React.createElement("span", _extends({
        key: `${pi}-${ti}`
      }, !isSpace ? {
        'data-wi': wordIdx
      } : {}, {
        style: {
          color: p.color || 'inherit',
          display: 'inline-block',
          whiteSpace: 'pre',
          ...(isSpace ? {} : {
            animation: 'satz-word-reveal 0.18s ease-out both',
            animationDelay: `${delay}s`
          })
        }
      }), tok);
    }));
    if (s.mitte) {
      const mitteStyle = {
        ...fallbackStyle,
        fontWeight: 500,
        fontSize: isMobile ? isSmallH ? 19 : 22 : 30
      };
      return /*#__PURE__*/React.createElement("div", {
        key: revealKey
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          ...mitteStyle,
          marginBottom: '0.3em'
        }
      }, renderWords(s.line1)), /*#__PURE__*/React.createElement("div", {
        style: mitteStyle
      }, renderWords(s.line2)));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: revealKey
    }, /*#__PURE__*/React.createElement("div", {
      style: lineStyle
    }, renderWords(s.line1)), /*#__PURE__*/React.createElement("div", {
      style: lineStyle
    }, renderWords(s.line2)));
  })())), /*#__PURE__*/React.createElement("div", {
    ref: scrollHintRef,
    style: {
      position: 'absolute',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      pointerEvents: 'none',
      zIndex: 12,
      opacity: 0,
      transition: 'opacity 400ms ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: theme.fg.scrollHint
    }
  }, "Scroll herunter"), /*#__PURE__*/React.createElement("svg", {
    width: "38",
    height: "22",
    viewBox: "0 0 38 22",
    fill: "none",
    style: {
      display: 'block',
      animation: 'scroll-hint-bob 1.8s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3,3 19,18 35,3",
    stroke: theme.fg.scrollArrow,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("div", {
    ref: overlayRef,
    style: {
      position: 'absolute',
      inset: 0,
      background: theme.bg,
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 15
    }
  })), /*#__PURE__*/React.createElement("div", {
    ref: section2OuterRef,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      opacity: currentPage === 1 ? 1 : 0,
      pointerEvents: currentPage === 1 ? 'auto' : 'none',
      transition: 'opacity 350ms ease',
      zIndex: currentPage === 1 ? 10 : 5,
      overflowY: isMobile ? 'auto' : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: section2Ref
  }, /*#__PURE__*/React.createElement(Section2, {
    headlineRef: section2HeadlineRef,
    contentRef: section2ContentRef,
    theme: theme,
    isMobile: isMobile,
    firma: firma
  }), /*#__PURE__*/React.createElement("div", {
    ref: scrollHintS2Ref,
    style: {
      position: 'absolute',
      bottom: 36,
      left: '50%',
      transform: 'translateX(-50%)',
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      pointerEvents: 'none',
      zIndex: 4,
      opacity: 0,
      transition: 'opacity 400ms ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Inter',sans-serif",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: theme.fg.scrollHint
    }
  }, "Weiter"), /*#__PURE__*/React.createElement("svg", {
    width: "38",
    height: "22",
    viewBox: "0 0 38 22",
    fill: "none",
    style: {
      display: 'block',
      animation: 'scroll-hint-bob 1.8s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3,3 19,18 35,3",
    stroke: theme.fg.scrollArrow,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      overflowY: 'auto',
      opacity: currentPage === 2 ? 1 : 0,
      pointerEvents: currentPage === 2 ? 'auto' : 'none',
      transition: 'opacity 350ms ease',
      zIndex: currentPage === 2 ? 10 : 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: section3Ref
  }, /*#__PURE__*/React.createElement(Section3, {
    theme: theme,
    sectionRef: section3Ref,
    isMobile: isMobile,
    isSmallH: isSmallH,
    firma: firma
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 22,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: isMobile ? 14 : 10,
      zIndex: 500,
      pointerEvents: 'auto'
    }
  }, [0, 1, 2].map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => gotoPage(p),
    "aria-label": `Zu Abschnitt ${p + 1}`,
    style: {
      width: isMobile ? 12 : 10,
      height: isMobile ? 12 : 10,
      borderRadius: '50%',
      cursor: 'pointer',
      border: `1px solid rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},0.55)`,
      background: currentPage === p ? theme.accentHx : `rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},0.38)`,
      boxShadow: currentPage === p ? `0 0 0 1px rgba(${theme.accent[0]},${theme.accent[1]},${theme.accent[2]},0.48), 0 4px 14px rgba(0,0,0,0.25)` : '0 2px 10px rgba(0,0,0,0.18)',
      transition: 'background 300ms ease, transform 280ms ease',
      transform: currentPage === p ? 'scale(1.45)' : 'scale(1)'
    }
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));

