/* =====================================================================
   v0.53 POLISH — the cleaner, cartoony look.
   • Textures are 32x32 now (textures/blocks/*.png — edit them any time;
     the old 16x16 ones are kept in textures/blocks_16/). Re-make them with
     tools/make_v53_hd.py.
   • Concrete, drywall and the hospital wall are SEAMLESS: no soft bevel
     round each block, so a wall reads as one smooth wall (no block grid).
   • Bushy trees: leaves that touch the air get round clumps of leaves that
     stick out past the block (textures/blocks/*_leaves_fluff.png).
     Switch off with DC.config.fancyLeaves = false.
   • Every block in the inventory / creative menu is a clean 3D picture with a
     soft outline (beds, chairs, buckets, stairs, fences… too).
   EDIT: SEAMLESS, FLUFF below.
   ===================================================================== */
'use strict';
(function () {
  const SEAMLESS = ['concrete', 'concrete_dark', 'drywall', 'hospital_wall', 'stone'];   // v1.13c stone: its new picture tiles, so no dark lines between blocks
  const FLUFF = { oak_leaves: 'oak_leaves_fluff', birch_leaves: 'birch_leaves_fluff' };

  for (const n of SEAMLESS) { const d = DC.block(n); if (d) d.seamless = true; }
  for (const [n, t] of Object.entries(FLUFF)) { const d = DC.block(n); if (d) { d._fluff = t; d.moreTex = (d.moreTex || []).concat(t); } }

  // 3D pictures for the things that are 2 blocks long
  DC.iconParts = DC.iconParts || {};
  DC.iconParts.bed = [['bed_foot_south', 0, 0, 0], ['bed_head_south', 0, 0, 1]];
  DC.iconParts.sleeping_bag = [['sleeping_bag_foot_south', 0, 0, 0], ['sleeping_bag_head_south', 0, 0, 1]];
  for (const [n, b] of [['bed', 'bed_foot_south'], ['sleeping_bag', 'sleeping_bag_foot_south']]) { const it = DC.item(n); if (it && DC.block(b)) it.icon3d = b; }
  DC.HOSPITAL_ICONS = DC.HOSPITAL_ICONS || []; DC.HOSPITAL_ICONS.push('bed', 'sleeping_bag');
  DC.iconRot = Object.assign(DC.iconRot || {}, { bed: 0.35, sleeping_bag: 0.35 });   // a 3/4 view: the blanket and the pillow show
})();
