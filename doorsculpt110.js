/* =====================================================================
   v1.10 SCULPTED DOORS IN THE WORLD
   The door you sculpted in the Studio (Items → Oak Door / Metal Door → Sculpt) is the door you PLACE, not only the
   one in your hand: every placed door (shut or open, any way it faces, both halves) is drawn from your model's cubes,
   stretched to the door's size (1 wide, 2 high, 3/16 thick). Save it in the Studio and doors in the world update.
   ===================================================================== */
'use strict';
(function () {
  const KINDS = { oak: 'oak_door', metal: 'metal_door' };   // block kind -> the item you sculpt
  const T = 3 / 16;
  const models = {};   // kind -> { vox: Map 'i,j,k' -> [r,g,b], n:[nx,ny,nz] } | null
  const cache = new Map();   // def.name -> [{ box, fi, col }]

  /* ---------- read the sculpt: its quads + picture → coloured cubes ---------- */
  async function readModel(rec) {
    if (!rec || !rec.sculpt || !rec.parts || !rec.vox || !rec.tex) return null;
    const im = await new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = rec.tex; }); if (!im) return null;
    const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); const px = x.getImageData(0, 0, c.width, c.height).data;
    const vs = rec.vox.vs, out = new Map(); let lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
    const faces = [];
    for (const part of rec.parts) for (const q of part.quads) {
      const o = q.o, a = q.a, b = q.b, A = [a[0] - o[0], a[1] - o[1], a[2] - o[2]], B = [b[0] - o[0], b[1] - o[1], b[2] - o[2]];
      const nA = Math.round(Math.hypot(...A) / vs), nB = Math.round(Math.hypot(...B) / vs); if (!nA || !nB) continue;
      let n = [A[1] * B[2] - A[2] * B[1], A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0]]; const L = Math.hypot(...n) || 1; n = n.map(v => v / L); if (q.f) n = n.map(v => -v);
      for (let i = 0; i < nA; i++) for (let j = 0; j < nB; j++) {
        const p = [0, 1, 2].map(k => o[k] + A[k] * (i + 0.5) / nA + B[k] * (j + 0.5) / nB);
        const u = Math.floor(q.r[0] + (q.r[2] - q.r[0]) * (i + 0.5) / nA), v = Math.floor(q.r[1] + (q.r[3] - q.r[1]) * (j + 0.5) / nB);
        const k4 = (Math.max(0, Math.min(c.height - 1, v)) * c.width + Math.max(0, Math.min(c.width - 1, u))) * 4; if (px[k4 + 3] < 20) continue;
        faces.push([p, n, [px[k4] / 255, px[k4 + 1] / 255, px[k4 + 2] / 255]]);
      }
    }
    if (!faces.length) return null;
    // which side of the faces the cubes are on: whichever puts more of them inside the model's box
    const O = rec.vox.o, N = rec.vox.n, inBox = c => c.every((v, k) => v > O[k] && v < O[k] + N[k] * vs);
    let s = 0; for (const [p, n] of faces) { if (inBox(p.map((v, k) => v - n[k] * vs / 2))) s++; else s--; }
    const sg = s >= 0 ? 1 : -1;
    for (const [p, n, col] of faces) {
      const cc = p.map((v, k) => v - sg * n[k] * vs / 2), ix = cc.map((v, k) => Math.floor((v - O[k]) / vs)); const key = ix.join(',');
      if (!out.has(key)) out.set(key, col); for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], ix[k]); hi[k] = Math.max(hi[k], ix[k]); }
    }
    return { vox: out, lo, hi };
  }

  /* ---------- one door block: its cubes, placed and turned like the door ---------- */
  const DIRS = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];
  const fiOf = v => v[0] < -0.5 ? 0 : v[0] > 0.5 ? 1 : v[1] < -0.5 ? 2 : v[1] > 0.5 ? 3 : v[2] < -0.5 ? 4 : 5;
  function build(def) {
    const kind = def.metal ? 'metal' : 'oak', m = models[kind]; if (!m) return null;
    const f = def.facing, open = !!def.open;
    const bx = !open ? (f[0] === 1 ? [1 - T, 0, 0, 1, 1, 1] : f[0] === -1 ? [0, 0, 0, T, 1, 1] : f[1] === 1 ? [0, 0, 1 - T, 1, 1, 1] : [0, 0, 0, 1, 1, T])
      : (f[0] === 1 ? [0, 0, 0, 1, 1, T] : f[0] === -1 ? [0, 0, 1 - T, 1, 1, 1] : f[1] === 1 ? [1 - T, 0, 0, 1, 1, 1] : [0, 0, 0, T, 1, 1]);
    const thinX = bx[3] - bx[0] < 0.5, inN = open ? [-f[1], f[0]] : f;
    // (s across the door 0..1, t up 0..2, d through it 0..1, 0 = the outside face) -> block coordinates
    const map = (s, t, d) => {
      const y = t - (def.top ? 1 : 0);
      if (thinX) { const out = inN[0] > 0 ? bx[0] : bx[3], X = out + inN[0] * d * T, Z = inN[0] > 0 ? s : 1 - s; return [X, y, Z]; }
      const out = inN[1] > 0 ? bx[2] : bx[5], Z = out + inN[1] * d * T, X = -inN[1] > 0 ? s : 1 - s; return [X, y, Z];
    };
    const { vox, lo, hi } = m, sx = hi[0] - lo[0] + 1, sy = hi[1] - lo[1] + 1, sz = hi[2] - lo[2] + 1, list = [];
    /* v1.13c faces of the same colour side by side are joined into one rectangle (a sculpted door was ~1,000+ little faces
       a block = ~10 ms to draw each time its chunk was built: flying past houses stuttered) */
    const half = def.top ? 1 : 0, inHalf = j => { const t0 = 2 * (j - lo[1]) / sy, t1 = 2 * (j - lo[1] + 1) / sy; return !(t1 <= half + 1e-6 || t0 >= half + 1 - 1e-6); };
    const boxOf = (i0, i1, j0, j1, k0, k1) => {   // voxel ranges (inclusive) -> the box in the block
      const s0 = (i0 - lo[0]) / sx, s1 = (i1 - lo[0] + 1) / sx, t0 = 2 * (j0 - lo[1]) / sy, t1 = 2 * (j1 - lo[1] + 1) / sy, d0 = (k0 - lo[2]) / sz, d1 = (k1 - lo[2] + 1) / sz;
      const pA = map(s0, Math.max(t0, half), d0), pB = map(s1, Math.min(t1, half + 1), d1);
      return [Math.min(pA[0], pB[0]), Math.min(pA[1], pB[1]), Math.min(pA[2], pB[2]), Math.max(pA[0], pB[0]), Math.max(pA[1], pB[1]), Math.max(pA[2], pB[2])];
    };
    const cells = []; for (const [key, col] of vox) { const v = key.split(',').map(Number); if (inHalf(v[1])) cells.push([v, col]); }
    for (let di = 0; di < 6; di++) {
      const D = DIRS[di], ax = D[0] ? 0 : D[1] ? 1 : 2, u = (ax + 1) % 3, w = (ax + 2) % 3;
      // which way this side faces in the block (the same for every voxel)
      const a = map(0.5 / sx, 1, 0.5 / sz), b = map(0.5 / sx + D[0] / sx, 1 + 2 * D[1] / sy, 0.5 / sz + D[2] / sz), fi = fiOf([b[0] - a[0], b[1] - a[1], b[2] - a[2]].map(v => Math.sign(Math.round(v * 1e4))));
      const planes = new Map();
      for (const [v, col] of cells) {
        if (vox.has((v[0] + D[0]) + ',' + (v[1] + D[1]) + ',' + (v[2] + D[2]))) continue;
        const pk = v[ax] + '|' + col.join(','); let P = planes.get(pk); if (!P) planes.set(pk, P = { col, at: v[ax], set: new Set() });
        P.set.add(v[u] + ',' + v[w]);
      }
      for (const P of planes.values()) {
        const todo = [...P.set].map(k => k.split(',').map(Number)).sort((p, q) => p[1] - q[1] || p[0] - q[0]);
        for (const [cu, cw] of todo) {
          if (!P.set.has(cu + ',' + cw)) continue;
          let u1 = cu; while (P.set.has((u1 + 1) + ',' + cw)) u1++;
          let w1 = cw; for (;;) { let ok = true; for (let q = cu; q <= u1; q++) if (!P.set.has(q + ',' + (w1 + 1))) { ok = false; break; } if (!ok) break; w1++; }
          for (let q = cu; q <= u1; q++) for (let r = cw; r <= w1; r++) P.set.delete(q + ',' + r);
          const R0 = [0, 0, 0], R1 = [0, 0, 0]; R0[ax] = R1[ax] = P.at; R0[u] = cu; R1[u] = u1; R0[w] = cw; R1[w] = w1;
          list.push({ box: boxOf(R0[0], R1[0], R0[1], R1[1], R0[2], R1[2]), ex: [fi], col: P.col });
        }
      }
    }
    return list;
  }
  DC.shapes.sculptdoor = function (buf, def, x, y, z, sky, meta, tint) {
    let L = cache.get(def.name); if (L === undefined) { L = build(def); cache.set(def.name, L); }
    if (!L) return; const t = DC.tex.tiles.get('sculpt_white') || DC.tex.uv(def, 'side'), F = DC.meshKit.FACES;
    // v1.13c the corners, shades, colours and picture of every face are worked out once per door kind, not every time
    if (!L.uvKey || L.uvKey !== t) { L.uvKey = t; const uv0 = F.map(f => f.uv.map(u => [t[0] + (t[2] - t[0]) * u[0], t[1] + (t[3] - t[1]) * u[1]]));
      L.q = []; for (const c of L) for (const fi of c.ex) { const f = F[fi], b = c.box; L.q.push([f.c.map(q => [q[0] ? b[3] : b[0], q[1] ? b[4] : b[1], q[2] ? b[5] : b[2]]), uv0[fi], [f.shade, f.shade, f.shade, f.shade], fi, [c.col[0], c.col[1], c.col[2], 1]]); } }
    for (const [c, uv, sh, fi, col] of L.q) buf.quad([[x + c[0][0], y + c[0][1], z + c[0][2]], [x + c[1][0], y + c[1][1], z + c[1][2]], [x + c[2][0], y + c[2][1], z + c[2][2]], [x + c[3][0], y + c[3][1], z + c[3][2]]], uv, sh, sky, false, fi, 0, col);
  };
  // a pure white square in the atlas to tint
  const late0 = DC.registerLateBlocks;
  DC.registerLateBlocks = function () {
    const r = late0.apply(this, arguments);
    if (DC.blockByName.sculpt_white == null) DC.registerBlock({ name: 'sculpt_white', item: false, hardness: -1, textures: { all: 'sculpt_white' }, moreTex: ['sculpt_white'] });
    return r;
  };

  /* ---------- switch the doors over (and back) ---------- */
  function apply() {
    let changed = false;
    for (const d of DC.blocks) {
      if (!d || !d.door || !d.facing) continue; const kind = d.metal ? 'metal' : 'oak', on = !!models[kind];
      if (d._sd0 === undefined) d._sd0 = d.shape;
      const want = on ? 'sculptdoor' : d._sd0; if (d.shape !== want) { d.shape = want; changed = true; }
    }
    cache.clear();
    if (DC.meshPool && DC.meshPool.refresh) DC.meshPool.refresh();
    const W = DC.game && DC.game.world; if (!W || !W.chunks) return;
    const ids = new Set(DC.blocks.filter(d => d && d.door).map(d => d.id));
    for (const ch of W.chunks.values()) { if (!ch.data) continue; const secs = new Set(); for (let i = 0; i < ch.data.length; i++) if (ids.has(ch.data[i])) secs.add(i >> 12); for (const s of secs) W.dirty(ch, s); }
  }
  async function load() {
    const K = DC.studioKV; if (!K) return; if (K.open) await K.open();
    for (const [kind, item] of Object.entries(KINDS)) { try { models[kind] = await readModel(K.get('m3d:item:' + item)); } catch (e) { console.warn('[door sculpt]', e); models[kind] = null; } }
    apply();
  }
  DC.doorSculpt = { load, models };
  DC.on('init', () => { load(); const K = DC.studioKV; if (K && !K._door110) { K._door110 = true; const p0 = K.put; K.put = async function (k, v) { const r = await p0.apply(this, arguments); if (/^m3d:item:(oak|metal)_door$/.test(k)) load(); return r; }; } });
  DC.on('worldStart', () => load());
})();
