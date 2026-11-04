/* =====================================================================
   v1.13c TWO SPEED-UPS LIKE THE MINECRAFT MODS (Options → Graphics, both ON by default)
   • DYNAMIC FPS: the game only draws ~15 frames a second while its window isn't the one you're using (alt-tabbed, a
     second screen), and 30 on the pause menu — your PC stays cool and the other programs stay fast. Full speed the
     moment you're back.
   • ENTITY CULLING: zombies, animals, people and sea mobs completely behind solid blocks (walls, hills) aren't drawn —
     checked a few times a second with a line from your eye to the mob's head and chest. They still move and hunt as normal.
   EDIT HERE ↓ CFG
   ===================================================================== */
'use strict';
(function () {
  const CFG = { unfocused: 15, paused: 30, cullEvery: 0.15, cullFar: 96, cullNear: 6 };
  const KEY = 'novacraft_perf113'; let S = { dyn: true, cull: true };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };
  DC.perf113 = S;

  /* ---------------- Dynamic FPS ---------------- */
  let focused = true;
  window.addEventListener('focus', () => { focused = true; }); window.addEventListener('blur', () => { focused = false; });
  const hook = () => {
    const GP = DC.Game && DC.Game.prototype; if (!GP || GP._dyn113) return; GP._dyn113 = true; const loop0 = GP.loop;
    GP.loop = function (t) {
      if (S.dyn && this.running) {
        const cap = !focused ? CFG.unfocused : (DC.ui && DC.ui.open === 'pause' && !(DC.net && DC.net.active)) ? CFG.paused : 0;
        if (cap && this._dynT != null && t - this._dynT < 1000 / cap - 0.5) { requestAnimationFrame(tt => this.loop(tt)); return; }
        this._dynT = t;
      }
      return loop0.call(this, t);
    };
  };
  hook(); DC.on('init', hook);

  /* ---------------- Entity culling ---------------- */
  const see = id => { const d = DC.blocks[id]; return !d || !d.opaque; };   // (light passes: glass, leaves' gaps, plants, water…)
  let acc = 0;
  function visibleFrom(W, e, x, y, z) {
    const dx = x - e.x, dy = y - e.y, dz = z - e.z, L = Math.hypot(dx, dy, dz) || 1;
    return !W.raycast(e.x, e.y, e.z, dx / L, dy / L, dz / L, Math.max(0, L - 0.6), see);
  }
  function cullList(G, list, h) {
    const W = G.world, P = G.player, cam = G.render && G.render.camera, e = DC.thirdPerson && DC.thirdPerson.on && cam ? cam.position : P.eyePos();
    for (const m of list || []) {
      const mesh = m && m.mesh; if (!mesh || !m.pos) continue;
      const d = Math.hypot(m.pos.x - e.x, m.pos.z - e.z);
      let hide = false;
      if (S.cull && d > CFG.cullNear && d < CFG.cullFar && !m.dead) {
        const hh = (m.h || h || 1.8);
        hide = !visibleFrom(W, e, m.pos.x, m.pos.y + hh * 0.92, m.pos.z) && !visibleFrom(W, e, m.pos.x, m.pos.y + hh * 0.5, m.pos.z);
      }
      if (hide && mesh.visible) { mesh.visible = false; mesh.userData._culled = true; }
      else if (!hide && mesh.userData._culled) { mesh.userData._culled = false; mesh.visible = true; }
    }
  }
  const tick = (dt, G) => {
    if (!G || !G.world || !G.player || !G.render || (acc += dt) < CFG.cullEvery) return; acc = 0;
    if (DC.thirdPerson && DC.thirdPerson.on && !S.cull) return;
    try {
      cullList(G, G.zombies && G.zombies.list, 1.8);
      cullList(G, DC.mobs && DC.mobs.list, 1.2);
      cullList(G, DC.people && DC.people.list, 1.8);
      cullList(G, DC.sharks && DC.sharks.list, 1);
      cullList(G, DC.catfish && DC.catfish.list, 0.4);
    } catch (e) { console.warn('[culling]', e); S.cull = false; }
  };
  tick._perfName = 'Entity culling'; DC.on('tick', tick);
  // switched off: everything shows again
  function uncull() { const G = DC.game; if (!G) return; for (const L of [G.zombies && G.zombies.list, DC.mobs && DC.mobs.list, DC.people && DC.people.list, DC.sharks && DC.sharks.list, DC.catfish && DC.catfish.list]) for (const m of L || []) if (m && m.mesh && m.mesh.userData._culled) { m.mesh.userData._culled = false; m.mesh.visible = true; } }

  /* ---------------- Remembered furniture shapes (v1.13c) ----------------
     Some furniture is drawn from dozens of little boxes and wheels (a wheelchair is ~1,500 faces) and got worked out
     again every time its chunk was built. These only depend on the block and which way it's turned, so the faces are
     worked out once and then just moved into place. (Checked: if a shape changes the light itself it isn't remembered.) */
  const MEMO = ['wchair', 'clight', 'wlight'], SKY = -7777;
  let memo = new Map();
  function memoShape(name) {
    const f = DC.shapes && DC.shapes[name]; if (!f || f._memo) return;
    const g = function (buf, def, x, y, z, sky, meta) {
      if (arguments.length > 7 && arguments[7] != null) return f.apply(this, arguments);   // (tinted: draw it normally)
      const key = def.id * 65536 + (meta | 0); let Q = memo.get(key);
      if (Q === undefined) {
        Q = []; const rec = { quad(p, uv, sh, sk, fl, fi, wave, tint) { if (sk !== SKY) Q = null; if (Q) Q.push([p.map(q => [q[0], q[1], q[2]]), uv, sh, fl, fi, wave, tint]); } };
        try { f.call(this, rec, def, 0, 0, 0, SKY, meta); } catch (e) { Q = null; }
        memo.set(key, Q);
      }
      if (!Q) return f.apply(this, arguments);
      for (const [p, uv, sh, fl, fi, wave, tint] of Q) buf.quad([[x + p[0][0], y + p[0][1], z + p[0][2]], [x + p[1][0], y + p[1][1], z + p[1][2]], [x + p[2][0], y + p[2][1], z + p[2][2]], [x + p[3][0], y + p[3][1], z + p[3][2]]], uv, sh, sky, fl, fi, wave, tint);
    };
    g._memo = true; DC.shapes[name] = g;
  }
  const memoAll = () => { MEMO.forEach(memoShape); const MP = DC.meshPool; if (MP && MP.refresh && !MP._memo113) { MP._memo113 = true; const r0 = MP.refresh; MP.refresh = function () { memo = new Map(); return r0.apply(this, arguments); }; } };
  memoAll(); DC.on('init', memoAll); DC.on('worldStart', () => { memo = new Map(); memoAll(); });
  DC.memoShape = memoShape;

  /* ---------------- Options → Graphics ---------------- */
  function addButtons() {
    const host = document.querySelector('#optGraphics .opt-btns'); if (!host || host._perf113) return; host._perf113 = true;
    const a = document.createElement('button'), b = document.createElement('button'); a.className = b.className = 'btn'; host.appendChild(a); host.appendChild(b);
    a.title = 'Only ~15 frames a second while the game isn\'t the window you\'re using, 30 on the pause menu.'; b.title = 'Mobs hidden behind solid blocks aren\'t drawn.';
    const sync = () => { a.textContent = 'Dynamic FPS: ' + (S.dyn ? 'ON' : 'OFF'); b.textContent = 'Entity culling: ' + (S.cull ? 'ON' : 'OFF'); };
    a.onclick = () => { S.dyn = !S.dyn; save(); sync(); }; b.onclick = () => { S.cull = !S.cull; if (!S.cull) uncull(); save(); sync(); };
    sync();
  }
  DC.on('init', () => setTimeout(addButtons, 0));
  document.addEventListener('click', e => { if (e.target && (e.target.id === 'bOptions' || e.target.closest && e.target.closest('[data-opt],[data-optpage]'))) setTimeout(addButtons, 0); }, true);
})();
