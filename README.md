# DEADCRAFT
Open-world block survival set in 2010, after the outbreak. Infinite seeded worlds with cities, towns and farms, freeways, forests, deserts, beaches, and about 300 blocks of underground to mine.

During the day you scavenge. At night the horde comes out, and if zombies **see light** they rush you and tear through anything in their way.

## Two HTML files
- **`index.html`** is the whole game packed into ONE file (code, textures, models, sounds, mods). This is what GitHub Pages opens, and it works even if the folders never upload. Double-click it to play offline too.
- **`dev.html`** is the editing version. It reads straight from the folders, so your texture/code changes show up instantly. Open it with **`Play NovaCraftZ.bat`**.
- **After you edit textures or code:** double-click **`Rebuild index.bat`** (or run `python tools/build_single.py`, or ask Claude) to rebuild `index.html`. Then upload the new `index.html`.

## Play
- **iPhone / iPad (and Android):** open your GitHub Pages link in Safari. For full screen, tap **Share → Add to Home Screen** and launch NovaCraftZ from the home screen. It plays in landscape with touch controls:
  - Left thumb is the joystick. Push it all the way forward to sprint.
  - Drag the right side to look. **Tap** to place or use, **hold** to mine or attack.
  - Buttons: JUMP, HIT/FIRE, USE/AIM/EAT, SNEAK (EXIT in a car), BAG (inventory), TORCH, DROP and pause.
- **Windows:** double-click **`Play NovaCraftZ.bat`**. It starts a tiny local server and opens your browser. Keep the black window open while you play.
- **Online:** upload this whole folder to a GitHub repo, then go to Settings → Pages → `main` / root. Open `https://<you>.github.io/<repo>/`.
- Use Chrome or Edge with a mouse and keyboard. Double-clicking `dev.html` won't work (browsers block textures from local files), but `index.html` does.

**Controls:**

| Key | Action |
|---|---|
| WASD | Move |
| Space | Jump / climb ladders |
| R or double-tap W | Sprint (keeps sprinting until you let go of W). Holding a gun: R also reloads |
| Shift | Sneak |
| Left click | Mine / attack |
| Right click | Place / use / open crafting table |
| E | Inventory |
| 1–9 or mouse wheel | Hotbar |
| Q / Shift+Q | Drop item / drop whole stack |
| F | Move a torch to your left hand (and back) |
| Hold right click | Eat food / aim a gun |
| F3 | Debug info |
| F1 | Hide HUD |
| T | Show/hide the clock |
| Right click a car | Get in (with a Gas Can: refuel) |
| W/S · A/D · Space · Shift (in a car) | Drive · steer · brake · get out |
| Esc | Pause |

## v0.71 notes: 4-way stops, streets that stop before the beach, living torches
- **Crossings are 4-way stops (new worlds):** a stop sign on every corner facing the cars coming in, a solid **stop line**
  across the incoming lanes, then the **crosswalk** (wide white bars: the new **Crosswalk Bar** block, 4x as wide as a road
  line, in Creative → Traffic). Lane lines, the yellow lines and the edge lines stop **2 blocks** before the stop line, so
  nothing overlaps any more.
- **Streets stop before the sea:** a city block within **80 blocks** of the water isn't built. The streets heading that way end
  in a dead end (a sidewalk cap) and the ground slopes down to the beach from there. Crossings with 2+ streets left stay
  crossings. It's one number: `SHORE` in `js/worldgen.js` (`nearShore`): 80 keeps the beach wide open but takes a good chunk
  of coastal cities with it — 40 keeps more city.
- **The gang truck stays out of the sea:** it looks 16 blocks ahead, turns to the clearer side when 10+ blocks of water are
  coming up, and picks a dry direction when it drives off.
- **The guy on the back of the truck doesn't flip round any more:** his body faces the way the truck points and his head
  turns to look at you (up to 90° each way).
- **Curbs aren't black any more:** the grass / sidewalk edge next to a 6/8-high road was lit from inside the road block.
- **Hit boxes:** torches, wall torches, flowers, tall grass, doors, wire fences, picket fences, handrails, chairs, toilets,
  bathtubs, lamps, shower heads, wheel stops, traffic lights and wheelchairs are picked by their real shape, not a whole block.
- **Torches:** wall torches sit in the wall and lean out less. Every torch near you has a little animated flame (4 frames:
  yellow in the middle, orange, red at the edges, flowing up). All of them are one mesh, so it costs nothing;
  `DC.config.torchFlames = false` turns it off.
- New worlds are **genVersion 20**; old worlds keep their streets exactly as they were.

## v0.70 notes: Model Editor, play together from the lobby, menu tidy-up
- **Model Editor (title screen → Editor):** a little Blender / skin-editor right inside the game.
  - **Load model:** *Your Player Model* (wearing the skin you have on), any mob, person or car from the game, your own saved
    models, or **Import file…** (a Blockbench "Bedrock geometry" `.json` + its `.png`, or just a skin `.png`).
  - **3D view:** drag the background to look around, mouse wheel = zoom, right/middle-drag = move. **Pose (V):** click a part
    and drag it. Top half of an arm / leg = shoulder / hip, bottom half = elbow / knee (Shift-drag twists). Sliders on the right
    do it exactly. **Reset pose** puts it back.
  - **Paint:** Brush (B), Eraser (E), Colour picker (I, or Alt+click), Fill (G), brush size 1–6 (`[` `]`), pixel grid (X),
    Undo / Redo (Ctrl+Z / Ctrl+Y). Paint right on the model, or switch to **2D texture** (Tab) to paint the flat picture
    like Photoshop: wheel zooms at the mouse, right-drag (or Space+drag) moves around, the selected part's faces are outlined.
    "Paint the outer layer" lets you paint the see-through hat / jacket layer.
  - **Mob behaviour:** Not a mob · Calm animal · Neutral (hits back) · Civilian · Enemy (attacks you) · Boss (a health bar
    preview shows at the top middle). It's saved in the model file (`deadcraft:behavior`, `deadcraft:health`).
  - **Bottom buttons:** **Save model** (your player model = your skin; a game model = the game uses your version on this
    device, ↺ in Load model puts the original back), **Save as new model** (Load model → My models), **Export** = `name.json` +
    `name.png` (spaces become `_`). To put an export in the game for everyone: copy them to `models/<name>.geo.json` and
    `textures/entity/<name>.png`, then Rebuild index.bat.
- **Play with friends from the lobby:** Play → **Add friend** opens your lobby online and shows an invite code + link. Friends
  type the code (Add friend → "Have a code?") or open the link, and wait in your lobby: you see their gamertag and avatar
  picture under PLAYERS. Press **START GAME** and everyone loads in with you. In a world: Esc → **Invite friends** (same code).
  Joining / leaving pops up with the player's avatar, the pause list shows avatars, and name tags over heads show them too.
  (Zombies mode is still single player.)
- **Menus:** "Join a Friend" is gone from the title screen (it's in the lobby now). **Mods** moved into **Library → Mods**,
  **How to Play** moved into **Options**, and there's an **Editor** button next to Options.
- **Fix:** toggling Shaders, Shadows, Anti-aliasing, Sharpen, Item glow and the other buttons on a settings page no longer
  throws you back to the main Options page. The Shaders setting is saved straight away too.
- Also in this update: planks are called **Oak Planks**, the campfire flames are animated, `/give <name> SkillPoint <amount>`
  (also `XP <amount>` and `<item> [amount]`), store banners are Creative-only for now, and banners, mobs, people and cars all
  fade into the fog like the world.

## v0.69 notes: Survival settings, difficulty, crafting skills, campfire, zombie piles
- **Survival settings (lobby → Mode settings):** **World Name** (leave it empty = "New World"; if that name is taken it becomes
  "New World 1", "New World 2"…), **Seed** (type anything, empty = random), **Difficulty**, and two pages:
  **🧟 Mobs** (which mobs spawn) and **📜 World rules** (Keep inventory, Mob block destroying). Your saved worlds are under **My worlds**
  (pick one to carry on, or delete it).
- **Difficulty:**
  - **Baby Mode** — craft anything for free, anywhere (no materials, no table, no skills). Build and learn the game.
  - **Easy** — every recipe is unlocked. Without a crafting table you only see the basics: planks, sticks, crafting table,
    wheat seeds, barn wood, ladder, Med-Kit, bandage, campfire. Use a **Crafting Table** to see everything else.
  - **Hard** — like Easy, but recipes need their **skill** first (you don't even see them until you learn it).
- **Skills (My Character → Skills), the 3 bottom branches are open:**
  - **Survival:** **Stone Tools** (1 point) → **Iron Specialist** (2 points: iron + diamond tools and weapons, wire fence, iron gate,
    large iron gate, metal door, handrail, fence post, bucket).
  - **Engineering** (needs Iron Specialist): **Gun Smith I** (pistol + small bullets) → **Gun Smith II** (shotgun, shells, Tactical Mask =
    5 iron + black spray can) and **Electrician I** (stove, fridge, TV, every light incl. table lamps, sliding glass door, garage door)
    → tier 3, 2 points each: **Gun Smith III** (every other gun + ammo), **Mechanic I** (tires), **Painter** (paint buckets, spray cans, roller).
  - **Combat:** **Machete Dash** — hold right-click with a machete to charge, let go to dash and cut through zombies.
    Rank 1: 10 s charge + 10 s cooldown, every rank 2 s less (5 ranks).
  - Tier 3 "coming soon" slots on every branch. Skills are bought with **LEARN**.
- **Campfire** (4 cobblestone + 8 sticks, no table needed): right-click with raw meat to put it on one of the 4 corners; when it's
  cooked it pops off for you to grab. Don't stand in it.
- **Med-Kit** = 5 cloth + 1 **Rubbing Alcohol** (new plastic bottle). Alcohol, cloth and bandages turn up in med-kits, clinic /
  hospital cabinets, bathroom cabinets, drawers and supply crates.
- **Zombie piles:** stuck on a roof, a pillar or the floor above them with no way up, the horde climbs each other into a mountain of
  bodies. The higher you are, the more it takes — and more claw up out of the dirt to help. The 2-3 that reach the top tear out
  the block under your feet (or climb off onto your roof). Kill one in the pile and it all comes down.
- **Ores by height** (new worlds; the streets are at y 298): y 279-293 coal / iron / copper are uncommon but findable,
  y 240-278 all 3 are common, below 240 they get rarer and rarer but below y 150 they come in big veins of 20-25 blocks.
  Diamonds from y 110 down. Gold from y 160 down — the deeper, the more. (Numbers: `placeOre19()` in `js/worldgen.js`.)
- Removed: the Medicine tab, the elevator door and the Buyable Door from the Survival crafting book (still in Creative).
- New textures you can paint over: `textures/blocks/campfire_fire.png`, `textures/items/campfire_icon.png`,
  `textures/items/alcohol_bottle.png`, `textures/gui/skills/<skill>.png` (made by `tools/make_v69_progression.py`).

## v0.68 notes: build your own Zombies maps, Map Builder tools, Library
- **Creative → Map Builder:** Building Wand, **Block Terrain Wand** (right-click = brush, left-click = the opposite, Shift + left-click =
  settings: block, size 1-32, strength, Inflate / Deflate / Raise / Lower / Smooth / Flatten / Paint, natural grass-dirt-stone layers),
  **Copy Wand** (left / right-click = corners, Shift + right-click = copy, Shift + left-click = paste, again and again, turned the way
  you face). **Ctrl + Z** undoes a brush stroke or a paste.
- **Creative → Arcade Zombies:** Player Start, Zombie Spawner (zombies claw out of the ground and head for the nearest window),
  Zombie Window (2 x 2, 3D boards), Barrier (invisible — you see it while you hold one), Buyable Door, Mystery Box Platform
  (2 x 2/8 x 1), Power Lever, Nova Punch (after the Pack-a-Punch machine), 4 perk machines, Chalk ? + chalk guns.
  Shift + right-click a door / machine / chalk = price (and the door's name). **Arcade Zombie Wand**: right-click = Save map as…,
  left-click = check, Shift + right-click = load a saved map to edit. A map needs a Player Start + 2 zombie blocks.
- **Zombies:** your maps are in Mode settings → Map (cards with pictures; built-in thumbnails: `textures/zm_maps/<id>.png`, 320 x 180).
  Perks: **Buff Cola** (red shields over your hearts, they grow back), **ZapRevive** (get back up, once every 10 rounds),
  **Swift Cola** (fast reload), **Triple Dew** (3 guns) — the machine drops a glass bottle and you drink it.
  The **Mystery Box** sometimes gives up: it flies off in red / purple lightning and appears on another platform (points back).
  Westvale has 4 box spots + Triple Dew in the hallway.
- **Main menu → Library:** Mobs, Survival Buildings (picture taken when you press B to save one; export / import / delete),
  Zombie Maps (export / import / rename / delete).
- **Stairs + shingle roofs turn corners** (inner valley / outer hip), like Minecraft.
- **Shadows:** your and the mobs' shadows are redrawn every frame (no lag) — Options → Graphics → Player & mob shadows.
- **Multiplayer:** you see what friends hold, and their arm swings when they punch / shoot.

## v0.67 notes: ZOMBIES — map 1: WESTVALE HIGH
- **Zombies mode is playable** (lobby → GAMEMODE → Zombies). Round-based survival like Black Ops Zombies on the Westvale High
  school from Westvale Zombies 3D, built out of blocks (1 map tile = 2 blocks) with its own wall / floor / sign pictures,
  the NovaCraftZ zombies and our guns.
- **Rounds:** 6, 8, 13, 18, 24 zombies, then +5.5 a round (up to 160); tougher and faster every round (runners, then sprinters).
  They tear the boards off the windows one by one and climb in, or burst out of the lockers.
- **Points:** +10 a hit, +60 a kill, +100 headshot kill, +130 melee kill, +10 a board you put back. Spend them on doors
  (Main Hallway 750, Gym & Cafeteria 1250, Science Wing & Roof 1500), chalk wall guns (buy again = ammo, half price),
  the Mystery Box (950), perks (ZapRevive 1500, Tuff Nut 2500, FlashSlush 3000 — the power has to be on) and
  Nova Punch (5000: 2x damage, then 3x). Power-ups: Max Ammo, Insta-Kill, Double Points, Kaboom (nuke), Carpenter.
- New Zombies guns: AURA Revolver .44, Neon Vector-9, Ronin DMR and the Nova Ray (Mystery Box only).
- **F** = buy / use (hold at a window to rebuild, hold at the lever for power), **V** = quick knife. No building, mining or
  breaking blocks in Zombies, no hunger, health comes back by itself. Game Over shows rounds, kills, headshots, points.
- **Mode settings:** Zombies has a Map dropdown (Westvale High; more maps coming) + starting round. Survival's seed is now a
  dropdown of preset seeds (or Random) instead of a text box.

## v0.66 notes: NOVA CRAFT Z
- The game is now **NovaCraftZ** (title + splash text in front).
- **Play** opens the lobby: an animated voxel globe, START GAME (5-second countdown — click again to cancel), the GAMEMODE
  picker (Survival · Creative Realm · Zombies *coming soon* · Block Hunt *coming soon*), MODE SETTINGS (which world, name,
  seed, which mobs spawn, keep inventory — saved with each world) and your player card.
- **Options → Profile:** your gamertag and avatar picture (PNG).
- Fix: the Back buttons on the Options pages work from the title screen.

## v0.65 notes: generators, settings pages, sunlight on characters
- **Generators:** a paintable portable generator (yellow until painted, placed empty). Right-click with a Gas Can to fill it
  (1 gallon = 8-12 in-game hours depending on how much it powers); right-click = on/off; left-click = the menu (fuel gauge,
  what it powers, move/resize the area it powers). F4 shows the area as a red line. Hospitals and police HQs have a big
  standby generator behind them (yellow bollards keep cars off) — shoot it and it sparks, blows up and the building goes dark.
  Gas pumps and portable generators blow up when shot.
- **Options** is now two columns of pages: Graphics, Controls (+ look sensitivity), Sounds (master / music / mobs / vehicles /
  AIPD voice / blocks volume + robot voice), Colours (+ shield icons, XP bar), Interface & HUD, Buildings.
- **Stamina** lives in the XP bar now (it turns into the stamina bar while you run). Skill tree: the bottom branch names sit
  above their hexagons. Sitting (wheelchairs, injured survivors) faces the right way.
- You, the animals and zombies are lit by the sun (warm light, sunset orange, darker in shade) and cast **shadows**.
- Fixes: blood sits on the lowered roads; the tactical helmet's visor faces forward.

## v0.64 notes: curbs, gangs, custody, shields, chat, squirrels, Nova-9 animals
- **Roads** are 6/8 tall so sidewalks form a real curb (you step up without jumping); 2x2 **curb ramps** at corners; wild grass
  **creeps over road edges** (cracked asphalt, weeds). Roof ridges are shingle slabs. Sectional **garage doors** glide up and tip flat
  under the ceiling. Pickup door gap fixed.
- **Custody:** every arrest takes you to the nearest AIPD HQ's basement cells and your belongings are taken (handed back on release,
  minus evidence).
- **Tactical Mask** (black closed-face helmet, paintable): no warrants or red bars while masked — a robot tracker instead; lose them,
  take it off out of sight, and your record stays clean.
- **Shields:** the Police Vest gives 6 blue shields above your hearts that take hits first, then break (shield_break sound).
- **Gangs:** 4 bandit looks in gang colours; gang trucks follow you, question you and want a "toll" (20 s to hand something over).
- **World chat** (Enter): /creative /survival /spectator /daytime set day|morning|night|midnight /help.
- **Squirrels** and **Nova-9 infected** cows, bulls, chickens and squirrels (black goo, glowing purple — they hunt you).

## v0.62 - v0.63 notes: real vehicles, AIPD headquarters, the ski mask
- **Vehicles** are real textured models (panel lines, glass, lamps that glow at night, liveries); high-res streets and buildings;
  smooth gable walls; anti-aliasing / sharpen / resolution options; dark iron manhole covers.
- **AIPD Headquarters:** the police station is bigger (74 x 74) inside a 3-high iron fence, lit and staffed: officers at desks,
  patrols, gate guards, a warden in the basement cell block. Arrested nearby? You serve your time in its cells; the warden opens
  the door when you're done. Attack anyone inside and the whole building comes for you (20+ officers, 5-8 Enforcers).
- **Ski Mask** (helmet slot; craft 5 cloth at a table, or find one): crimes done masked aren't logged to your name. Officers
  stop you and ask you to take it off — then they check your record and remember what you did.
- Hit AIPD units short out with electric arcs; cars shove robots (it's assault if you drive into one); AIPD bullets break glass;
  the AIPD never kills you — you're arrested.

## v0.59 - v0.61 notes: better graphics, farm animals, Mobs tab
- **Graphics:** real sun shadows (Options -> Shadows), soft bloom, HDR colour grade, smooth far-away textures (mipmaps + FXAA),
  no more shader "fuzz", bushier leaves, grey asphalt roads, lusher grass.
- **Seamless high-res grass** (textures/hq/grass.png, laid across the world - no block grid) in the oak-leaf green,
  **smooth sloped shingle roofs** with high-res shingles (textures/hq/shingles.png).
- **Fix:** the screen no longer flickers black while a world loads.
- **Cows** in 3 coats, **bulls** that guard their herd (and charge zombies, bandits, survivors and you).
  Bull + cow + Wheat = a calf or a bull calf.
- **Chickens:** hens, roosters, chicks in white / brown / black. Hen + rooster + Wheat Seeds = an egg that hatches in 2-3 days
  (the chick's colour is a die roll between the parents). Raw / cooked chicken, eggs, fried eggs.
- Animals have proper eyes (white with a black pupil).
- Ripe wheat drops wheat + 2-3 seeds.
- **Creative -> Mobs tab:** every creature as a little 3D model - click to spawn it.
- Remake the animal / texture art with tools/make_v59_animals.py and tools/make_v61_textures.py.

## v0.56 notes: zombies don't hear you, quieter NPCs, classified AIPD, robot voice
- **Zombies no longer hear you.** They only react to what they *see*:
  - no hearing your footsteps;
  - a growling zombie doesn't bring the others after you;
  - no stragglers who "heard the commotion" and know where you are;
  - gunshots, car engines and other noises don't draw them in.
- **Zombie hearing toggle:** Options → Zombie hearing turns all of that back on (it's OFF by default).
- **"THEY SEE YOUR LIGHT"** now only shows when you're actually carrying a light (a torch in your hand or left hand, or car headlights).
- **Standing next to a lamp or torch:** you get "YOU'RE STANDING IN THE LIGHT" instead, and lights on the other side of a wall don't count any more.
- **Less brawling:**
  - Zombies only go for a survivor or robot they can actually see within 7 blocks.
  - Survivors run first and only shoot when cornered, and fewer of them carry guns.
  - Fewer survivors are out and about, and none at night.
  - Robots only fight bandits who are going after you (or after that robot).
- **Classified:** ask an AIPD unit what happened and it won't tell you. That information is classified (and pushing too hard gets your questions logged).
- **The robot voice is more robotic.** It speaks in short clipped bursts at the lowest pitch with an electronic buzz underneath. On iPhone / Mac it uses a built-in robot voice (Zarvox, Trinoids or Fred) if the device has one. Options → Robot voice turns it off.

## v0.55 notes: My Character, the AIPD robot police, Karma, survivors
**My Character** (inventory → My Character, or press **C**). It's a binder with divider tabs down the side:
- **Skills**: the skill tree.
- **My Stats**: days survived, deaths, your top 5 most-killed mobs, and **Show more** for the full **Mob Index** (every creature, "discovered x / 15"; ones you haven't seen are ??? until you do). Also buildings discovered (x / y).
- **Reputation**: level and XP, your Karma score and rank, the AIPD wanted level, warrants, fines, warnings, detentions, your firearm permit, the 5 factions and how they see you, your recent good and bad deeds, and your criminal record.
- **Medicine**: coming soon (a medicine learning tree).

**The AIPD (Artificial Intelligence Police Department).** NOVERA's NOVA-9 caused the outbreak. Most human police are gone, but the government's robot peacekeepers still patrol the cities. They're neutral: they protect civilians, fight the infected and react to what *you* do.
- **Units.** Patrol Units (about 2.8 blocks tall) walk the city streets (towns get fewer), and guards stand outside police stations and Novera buildings. **Enforcers** (heavy, with a shoulder cannon) and **surveillance drones** only show up when you're a High Threat or worse.
- **Their eyes tell you their mood:**

| Eyes | Meaning |
|---|---|
| Blue | Patrolling |
| Green | You're cleared / friendly |
| Yellow | Suspicious, scanning you |
| Orange | Investigating or talking to you |
| Red | Hostile target identified |
| Flashing red | Emergency (a High Threat, or overrun by the infected) |

- **They fight the infected** and protect survivors, and you too if bandits attack you. Zombies go after robots and survivors as well as you. A big horde (or a brute) can destroy a unit. Units call each other for backup.
- **Help them** (kill infected they're fighting) for +10 Karma. **Hit them by accident** while shooting zombies and they just warn you. On purpose, it's a crime.
- **Destroyed units leave a wreck.** Right-click it and hold still to salvage Scrap Metal, Servo Motors, Circuit Boards, Power Cells, and rarely an AIPD Processor Core (that one's contraband). Salvaging inside a police station or Novera zone, or in front of other units, is a crime; out in the open it's legal. Destroyed units are replaced after 2 days.
- Some units have **lost their network link** ("offline"). They only know what they saw themselves plus old records, so they can be wrong, and you can argue. A rare unit is **malfunctioning** (glitching eyes) and attacks anyone. Destroying that one is ruled self-defence.
- **Robot voice:** units speak their lines (subtitles too). Options → Robot voice turns the voice off.

**Talking (Telltale-style).** Right-click a unit or a survivor to talk. Pick an answer with 1–4 or tap it. Some moments are timed, and saying nothing is an answer too. People remember what you said.

**Police stops.** A unit may stop you for: a visible firearm with no permit, a security checkpoint at a police station, being in a restricted zone (Novera quarantine), matching a suspect description, being flagged as suspicious, or unpaid fines.
- **Your answers:**
  - **Cooperate**: they scan your inventory.
  - **Ask why**: they explain the directive and the law.
  - **Refuse the search**: you can walk away (refusing isn't a crime) unless they have real grounds, like a warrant.
  - **Threaten**: you get a final warning, and a second time it's a crime.
  - **Bribe**: they log it as interference.
- **Inspection** checks what you carry:
  - **Legal:** almost everything.
  - **Regulated:** guns without a permit, the DSR-50 (military), police vests, more than 120 rounds of ammo, or more than 3 power cells or circuit boards.
  - **Contraband:** NOVA-9 Research Samples and NOVERA Lab Keycards (in Novera buildings), and AIPD Processor Cores.
- **Repeat offences escalate:**
  - **1st offence:** a formal warning; hand the item over or keep it.
  - **2nd offence:** a fine in iron ingots.
  - **3rd offence:** detention.
- **Firearm Permit:** at Good Citizen Karma or better with no warrants or fines, ask a unit to register your gun. It covers the pistol, shotgun and rifle. Online units check the network; offline units want to see the card.
- **Fines** are paid in iron ingots to any unit. Fines more than 2 days overdue get you detained.

**Karma** goes from −1000 to +1000 and starts at 0. Its ranks are Public Enemy, Outlaw, Troublemaker, Neutral, Good Citizen, Protector and Hero. Karma is what you *do*, seen or not. Killing zombies never changes it. Self-defence against someone hostile doesn't cost any, and the same NPC or deed can't be farmed (good deeds are capped per day).

| Good | Karma | Bad | Karma |
|---|---|---|---|
| Save a survivor from the infected | +25 | Steal from a survivor | −15 |
| Help an injured civilian (bandage) | +20 | Threaten a civilian (aim a gun at them) | −20 |
| Feed a starving survivor | +10 | Attack an innocent | −50 |
| Defend a settlement | +30 | Kill an innocent | −150 |
| Rescue a trapped survivor | +40 | Attack an AIPD unit | −75 |
| Assist the AIPD | +10 | Destroy a security camera | −25 |
| Humanitarian mission | +50 | Rob a settlement | −100 |
| Surrender peacefully | +5 | Kill someone who surrendered | −200 |

All the numbers are in `DC.lawCfg` (js/law.js).

**The criminal record is separate from Karma.** The AIPD only knows about a crime if one of these saw it:
- a robot or drone;
- a **security camera** (new: on the ceilings of police stations, Novera buildings and the bigger stores; breaking one is a crime too);
- a civilian who survived to **report** it (they run off and report about 20–30 s later, unless they don't make it).

A crime nobody saw changes your Karma but never reaches your record. If a witness couldn't see your face, the AIPD only gets a suspect description, and units will question people near the scene. Sometimes that's for someone else's crime (mistaken identity: say "There must be a mistake").

**Wanted level (0–5).** This is the active response, worked out from the evidence (never from Karma):

| Level | Name | What happens |
|---|---|---|
| 0 | Clear | Nothing |
| 1 | Suspicious | Units question you |
| 2 | Detain | Units try to detain you |
| 3 | Pursuit | Several units chase you |
| 4 | High Threat | Enforcers and drones join in |
| 5 | Public Enemy | Lethal force |

- **The HUD** shows it under the clock, with a bar that drains while no unit can see you. Stay out of sight and it steps down level by level.
- **Escaping doesn't clear serious warrants.** The next online unit that recognises you will try to detain you.
- **Surrender** (G, or the SURRENDER button on iPhone) when a unit is close. You get processed: warrants served, contraband confiscated, fines paid if you have the iron, and a few in-game hours pass. Surrendering peacefully is +5 Karma. Running from a detention is a new crime ("Evading detention").
- Units won't chase you forever: they search your last known spot, then give up and return to their patrol area.

**Survivors.**
- **Kinds you'll meet:** wanderers, injured people (sitting; patch them up with a bandage), starving people (give them food), and **trapped** survivors (cornered by the infected; kill the zombies around them).
- **Pickpocketing:** sneak + right-click with an empty hand to pick a pocket.
- **Threatening:** aiming a gun at someone for a second makes them put their hands up. That's threatening them.
- **They fight back:** about a third carry a pistol, fight the infected, and fight *you* if you attack them or you're a known Public Enemy.
- **Karma changes how they treat you:** Heroes get a warm welcome, Outlaws get "stay away from me!"

**Settlements.** These are fenced survivor camps out in the countryside, with a camp fire, sleeping bags and a **Settlement Stash**.
- **The night attack:** the infected attack once a night while you're nearby. Help hold them off for +30.
- **Humanitarian missions:** settlers ask for bandages, food, water or cloth for +50 and a reward.
- **The stash:** taking from it is robbery unless they trust you (Settlements reputation Trusted, or Protector Karma).

**Bandits.** A badly hurt bandit may **surrender** (hands up). Let him go for +5; kill him and it's −200. If you're an Outlaw, bandits treat you as one of their own and don't attack on sight.

**Factions.** AIPD, Independent Survivors, Settlements, Bandits and NOVERA Security each have their own reputation (−100 to +100). For example, you can be trusted by a settlement and wanted by the AIPD at the same time.

**Notes**
- The robots and survivors only exist on the host in multiplayer. Friends who join don't see them yet.
- New art comes from `tools/make_v55_aipd.py`:
  - the robot models: `models/aipd_robot.geo.json` and `models/aipd_enforcer.geo.json`; open them in Blockbench to repaint;
  - the survivor skins;
  - the item and camera icons;
  - the tab icons.

## v0.54 notes: backpacks, armour, stamina, tree climbing, headshots
**Backpacks.** You now start with just your 9 hotbar slots.
- **Backpack** (school-bag style, common): +9 slots, one row. It's in wardrobes, garages and supply crates, or craft it from 8 cloth + 1 iron. Paintable.
- **Military Backpack** (camo, rare): unlocks your whole inventory (+27). It's in supply crates and police lockers.
- Wear one in the new **Backpack** slot (in your inventory, next to Left hand). You can also shift-click it, or right-click the air while holding it. What's in a backpack stays in it: take it off and its items go with it.
- Holding a backpack, right-click the ground to set it down, like a paint bucket, with everything inside. Open it like a chest. Break it to pick it up again; it keeps its contents and its colour.
- Paint a placed backpack with a roller or spray can. That's the colour it shows in your HUD (next to the hotbar), on your back in 3rd person, and in the world.
- Old worlds: if you had things in your inventory, you get a Military Backpack, so nothing is lost.

**Armour.** There are 4 new slots: helmet, chest, pants and boots.
- The **Police Vest** (chest) is only found in the new lockers in police stations. It takes 45% of every hit and wears out as it does; at 0 it breaks.
- About 40% of zombie cops wear one. Body shots barely hurt them until it breaks off, but headshots go straight through.
- Shift-click armour to wear it, or right-click the air while holding it.

**Stamina.** Sprinting uses stamina, shown as a thin red line over your hearts that fades away when you stop running. Run out and you can only jog (a bit faster than walking) and you get hungry faster until you catch your breath. Change the colour in Options → Colours → Stamina bar.

**Food poisoning.** Zombies sometimes drop **Rotten Zombie Meat**. It fills you up, but it usually gives you food poisoning for 3 minutes: your hunger icons turn into rotten meat and you get hungry much faster.

**Skills.**
- Physicality: **Demolitionist**, your guns do +20% damage to breakable blocks per rank. (Iron Grip is still +4% mining speed per rank.)
- Agility:
  - **Mr Monkey**: walk up against a tree trunk and hold Jump to climb it like a ladder, up through the leaves to the top. Leaves hold you up when you stand on them; sneak to sink back down through them.
  - **Endurance Runner**: −6% sprint stamina use per rank.
- Health:
  - **Rapid Recovery**: +6% healing from bandages and other healing items per rank.
  - **Iron Stomach**: −10% food poisoning time per rank.
- Three new branches under the level circle (Survival, Combat, Engineering) are marked coming soon. Scroll the tree to see them.

**Headshots.** Zombies now have a small head hitbox. A bullet in the head kills any zombie outright; the brute just takes a huge hit. Also fixed: a shotgun blast no longer makes a zombie burst into ten bodies.

**Menus and settings**
- **Crafting Book:** bigger items and big ▲ ▼ scroll buttons. On phones it fills the screen. It remembers where you scrolled to, and there's a CRAFT ALL button.
- **Options → HUD size:** makes the hotbar, hearts, ammo counter and clock bigger or smaller.
- **Options → Blood: ON / OFF.** Off means no blood, stains or flying body parts; zombies vanish in a puff of dust instead.
- **Options → Colours:** every colour opens a colour orb picker. New colours: Stamina bar and Menu colour (the purple used across the menus).

## v0.53 notes: guns and ammo, DSR-50, HD textures, scarier zombies
**Ammo.** Guns don't have infinite ammo any more. Each gun has a magazine, and the HUD in the bottom right shows **8 / 24** (rounds in the gun / rounds in your bag).
- There are 4 ammo types. You craft them in the Crafting Book under Weapons, and each recipe makes one clip:

| Ammo | For | Recipe | Makes |
|---|---|---|---|
| Small Ammo (9mm) | Pistol | 1 gold ingot + 1 iron ingot | 8 |
| Medium Ammo (7.62) | Rifle | 1 gold + 3 iron | 30 |
| Heavy Ammo (.50) | DSR-50 | 2 gold + 2 iron | 5 |
| Shotgun Shells | Pump shotgun | 1 gold + 2 iron | 6 |

- **Gold:** gold ore spawns 30+ blocks under the streets. You need a stone pickaxe or better. Smelt raw gold with coal to get a gold ingot. Supply crates sometimes have ammo and gold.
- **Reload:** press **R** (the sprint key) while holding a gun that isn't full. If you keep running you still sprint. An empty gun reloads by itself when you pull the trigger. On a phone, the DROP button turns into RELOAD while you hold a gun.
- Every gun has a reload animation. The pistol, rifle and DSR drop the old magazine and your left hand slaps in a new one. The shotgun loads one shell at a time and pumps at the end; shoot to stop loading early.
- In Creative, magazines never run out.
- **Bandits have limited ammo.** When a bandit runs out he pulls his machete and charges you. Dead bandits drop the rounds they didn't fire.

**DSR-50** (works like the one in Call of Duty):
- A bullpup, bolt-action sniper with 5 rounds of Heavy Ammo. It's in Creative and rare supply crates, or craft it (12 iron, 3 gold, 2 glass, 1 diamond).
- Right-click to scope in (about 10x zoom, black scope with a red dot). Hip-fire is wild, so scope in.
- After every shot you work the bolt, which drops you out of the scope. Keep holding right-click and you go back in.
- The scope sways. Hold **Shift** to hold your breath and steady it for about 4 seconds.
- One body shot kills any normal zombie, and a round goes through up to 3 zombies in a line.

**Look**
- Every block texture is now **32x32** in a cleaner, cartoony style. The big natural blocks (grass, dirt, stone, cobblestone, logs, planks, leaves, sand, gravel, bricks, ores) were painted from scratch; the rest were upscaled and smoothed. Edit any `textures/blocks/*.png` yourself. The old 16x16 ones are kept in `textures/blocks_16/`, and `tools/make_v53_hd.py` remakes the 32x32 set from them.
- **Concrete, drywall and the hospital wall are seamless:** no soft edge around each block, so a wall reads as one smooth wall. Leaves lost the grid too.
- **Bushier trees:** leaves that touch the air get round clumps of leaves sticking out past the block. Turn this off with `DC.config.fancyLeaves = false`.
- **Clean 3D inventory pictures:** every block, including beds, chairs, buckets, stairs and fences, is a real 3D picture with a soft outline in the inventory and the Creative menu.

**Zombies:** the purple is much brighter. Faces are scarier, with sunken glowing eyes and a hanging jaw full of teeth and blood. The models have far more 3D detail: brow ridges, noses, ears, clawed fingers, symbiote spikes, torn shirt flaps, exposed ribs, a cop's vest and radio, the monkey's fangs and claws, and the brute's tusks and shoulder spikes. Run `tools/make_v49_mobs.py` to remake them.

**Wooden Desk:** the old one-block office desk is gone. Everywhere it was (police station, houses, ranch, Novera offices) there is now the 2-block oak desk with drawers, matching the nightstands and cabinets. Old desks already placed in your worlds now have the same oak look.

## v0.50 notes: hiding in wardrobes
- Inside a wardrobe (sneak + left-click it) you can shuffle around with WASD in its 2 wide x 1 deep x 2 tall space and look around.
- It's pitch dark except for the real crack between the two doors. Lean in close and it gets wider; move to the side and it shifts across your view, so you can peek out at the zombies.
- Change the room and the crack size in `DC.wardrobeBox` in `js/town.js`.

## v0.49 notes: the infected roster
Every zombie is now one of 6 infected: purple skin, red glowing eyes, black symbiote with glowing purple veins (they glow at night). The skins are twice as detailed as Minecraft's, still pixel art.
- **Pedestrian A / B / C:** a torn white shirt, an olive hoodie with sneakers, and a bigger guy in a maroon vest and jeans. They limp, and some are crawlers.
- **Zombie Cop:** navy uniform, police cap, badge, belt. Tougher and hits harder.
- **Monkey Zombie:** runs on all fours, faster than you can sprint. From up to 7 blocks away it pounces at you and scratches. Low health.
- **Brute:** 2.6 blocks tall, armoured in symbiote, 150 health.
  - Hits from the front barely hurt it. Hit the **3 glowing weak points on its back** for triple damage.
  - It grabs zombies near it and throws them at you.
  - It picks up cars and throws them. They explode where they land, blowing up blocks nearby.
  - Its punch knocks you flying. At most 1 brute at a time by day, 2 at night.
- Tweak how common each one is, their health, speed and damage in `DC.zombieKinds` in `js/entities.js`.
- The models and skins are in `models/<name>.geo.json` + `textures/entity/<name>.png`. Open them in Blockbench to reshape or repaint, or run `tools/make_v49_mobs.py` to make them again.

## v0.48 notes: Novera Corp, walk animation
- **Novera Corp** ("Better Medicine, Better Health") — the Oscorp of this world. New city worlds get about one of each per city:
  - **Novera Tower:** a slim white glass tower, 7 floors. The lobby has a reception desk, the floors above are labs, the CEO's office is on top, and the big logo is on the roof.
  - **Basement:** storage racks. A metal door in the corner hides a ladder shaft that drops about 100 blocks.
  - **Secret lab** at the bottom: white concrete, 6-high rooms, lights everywhere, a control room and test rooms with observation windows off a long corridor. Ready for mutated zombies later.
  - **Novera Warehouse:** two 6 x 3 roll-up gates and racks of crates.
  - **Novera delivery van:** a white box truck with the logo on both sides, parked around the city.
  - The logos are in `textures/stores/novera*.png` (transparent). Edit the buildings in `js/data/novera_buildings.js`.
- **Banners and signs** stick out twice as far (thicker).
- **Walking in 3rd person:** your legs swing with how far you walk (no more gliding), and the body bobs, twists and rolls a little with each step. It's a bit stronger when you run. Settings are in `WALK` in `js/avatar.js`.
- **Sneaking:** the body leans forward from the hips, the head stays level, and the camera drops a little (in 1st person too).
- **Shotgun:** aiming brings it closer, and in 3rd person your left hand holds the barrel.

## v0.45 notes: street fix, 3rd person guns
- **Streets (new worlds):** a city avenue no longer runs right alongside the main road through the city. If it would be closer than a building lot, it's a strip of park (grass + sidewalk) instead, with no sewer under it and no parked cars. Change the gap in `tooClose()` in `js/worldgen.js`.
- **3rd person guns:**
  - Rifles and shotguns are held across your chest (low ready). Right-click to aim and the stock comes up to your shoulder, pointing where you look.
  - Your right hand is on the grip and your left is under the barrel.
  - The pistol is 20% smaller and sits in your fist.
  - Shots and tracers come out of the gun's barrel, not your face.
- **No shooting while sprinting.**

## v0.44 notes: gun hands, light strips, neon stores
- **Gun hands fixed:**
  - On the AK your right hand is on the grip and trigger, and your left hand is under the barrel. The arms no longer cross.
  - In 3rd person, looking down doesn't drop your arms, and the gun's grip sits in your fist.
- **Light Strip (new block):** a ceiling light that joins with the ones next to it. One on its own is a square panel, and 3 in a row make a 1 x 3 strip light.
  - Click it to turn it off and on.
  - It runs on batteries, so it works with the grid down, and it doesn't give you away to zombies.
  - Craft it from 1 iron + 1 glass + 1 torch (makes 3).
- **Stores:**
  - Gas stations have 1 x 3 strip lights under the canopy and in the shop.
  - 11 11s has neon orange / green / red stripes and strip lights inside.
  - The Diner has a pink and cyan neon trim and strip lights over the booths.

## v0.43 notes: new guns, round sewers, neon, house fix
- **Guns:**
  - The pistol is a 1911-style handgun with wood grips, held one-handed off to the right so you see its side.
  - The rifle is an AK with a wood stock and a curved mag. Your hands sit on its grip and handguard.
  - Aiming lines the sights up on the crosshair.
  - In 3rd person the guns are bigger, and you hold rifles with both hands.
- **Sewers (new worlds):** a round brick tunnel, 2 blocks bigger all round, with a 3-wide channel of green-brown **sewage water** one block below the walkways. Ladders go all the way down. Edit the size in `SEWER` in `js/sewers.js`. Old worlds keep their old tunnels so they still join up.
- **Neon block:** glows in the dark like an LED strip. It's highlighter yellow to start. Craft it from 1 glass + 1 torch (makes 4).
- **Spray paint:** right-click any paintable block (neon, concrete, siding, wood…) to paint it. One can paints 10 blocks, or 1 car.
- **Neon on buildings:**
  - Gas stations have neon red and purple bands round the canopy and the shop.
  - **1 in 20 cities is a neon city:** coloured bands turn to neon, and building corners and roof edges are lined with purple, pink and cyan neon. Settings are in `NEON` in `js/neon.js`.
- **Houses:** the missing row of siding under the roof (gable ends) is fixed. Old worlds pick up the fixed houses in places you haven't explored yet.

## v0.42 notes: spectator mode, a smaller Options screen
- **Spectator mode:** Options → Mode now cycles **Survival → Creative → Spectator**.
  - Fly anywhere, straight through walls and the ground. Jump goes up, Sneak goes down, Sprint goes faster.
  - Zombies can't see, hear or hurt you, and you can't break, place or pick up anything.
  - The hotbar, hearts and XP bar are hidden.
  - Switching back to Survival puts you on the ground at the first open spot, with no fall damage.
- **Options screen:** smaller and laid out in two columns, so the top and bottom buttons don't fall off the screen. On small screens it shrinks to fit.

## v0.41 notes: smarter zombies, real 3D items in your hand
- **Zombies find their way to you:**
  - Run upstairs and they head for the stairs and come up.
  - They also climb ladders, jump up 1 block, drop down up to 3 blocks, and go through wooden doors (opening them).
  - They only claw through a wall when there's no other way (or they've been stuck for a while).
  - Tweak it in `PATH` at the top of `js/zpath.js` (search size, searches per frame, costs).
- **Held items in 3rd person and mirrors:** tools and guns are the same 3D models as in 1st person, held properly (handle in the fist, pointing forward) instead of the flat pixel icon.

## v0.40 notes: XP & skills, crawlers, night darkness, sewer fog
- **XP and levels:** kill zombies and mine ores and they drop purple XP orbs that fly to you. You also get XP for fixing a flat tire (+10), cooking (+10), painting a block (+5), crafting something for the first time (+10) and discovering a new place (+50, with a "DISCOVERED" banner). The purple bar above the hotbar shows your level. Levels 1–5 take 500 XP each, 5–10 take 1,000, 10–15 take 2,000, and after that each level takes 500 more. Every level up gives you 1 skill point.
- **Skills:** press E, then click **Skills** (under the Crafting Book). There are three branches:
  - **Physicality:** Heavy Hands (+5% melee damage per rank, 5 ranks), then Iron Grip (+4% mining speed per rank, 5 ranks).
  - **Agility:** Quick Feet (+3% movement speed per rank, 5 ranks).
  - **Health:** Tough Skin (+1 heart, which is +10% health, per rank, 5 ranks).
  - Unlocking a tier 1 skill opens the two after it. The "?" slots are ready for the skills you draw next.
  - Edit the numbers and the tree in `js/skills.js`. The icons are white PNGs in `textures/gui/skills/`, so you can paint over them (keep the file names).
- **Crafting Book:** things you've never crafted are grey. They get their colour the first time you craft them.
- **Zombies:**
  - Walkers now limp: one stiff leg, swaying and lurching.
  - New **crawler** zombie: it drags itself along the ground and is easy to miss in tall grass. It has less health and is slower.
  - Zombies no longer pop out of thin air. On dirt, grass or sand they claw their way up out of the ground with dirt flying. Tweak `crawlers`, `riseTime` and `limp` in `DC.zombieAI` (`js/entities.js`).
- **Night:** black fog from about 30 blocks out, with a dark band between the street and the sky that fades up into the stars. Change `nightFogDist` in `js/core.js`, or set `nightFog: false` to turn it off.
- **Sewers:** a thick Silent Hill-style fog (about 20 blocks) and dim, even light, so the far tunnels and the black lighting glitches fade into murk.
- **Moving:**
  - Sneaking stops you walking off edges, like Minecraft.
  - Sprinting widens your view, and your head and hand bob harder.
  - F5 now cycles 1st person → 3rd person behind → 3rd person front. In "behind", the mouse looks around freely and WASD turns your character.
  - Your head turns first and your body follows, so you don't glide around.

## v0.39 notes: 3D diamond tools
- Diamond pickaxe, axe, machete, shovel and hoe now use the same 3D models as the iron tools instead of the flat pixel look: purple heads/blades and black handles. Tweak the colours in `MAT.diamond` / `HANDLE_BY` in `js/tools3d.js`.

## v0.38 notes: new roads + sewers (new worlds)
- **City avenues, 25 wide:** sidewalk 2 · white line · lane · dashes · lane · yellow line · **middle turn lane (3)** · yellow line · lane · dashes · lane · white line · sidewalk 2. Zebra crossings + signal masts at the corners.
- **Main avenues / freeways, 21 wide:** the same without the middle lane (double yellow in the centre, white edge lines, 2-block sidewalks).
- **Residential streets, 13 wide:** sidewalk 2 · white line · lane 3 · yellow centre line · lane 3 · white line · sidewalk 2.
- **Sewers** under every town and city street, starting 5 blocks under the road (houses are never on streets, so they never hit a basement; none under the hospital grounds, malls or police stations). Stone-brick tunnel with mossy / grimy bricks, a water channel down the middle, walkways on both sides, 3 blocks of headroom; where streets cross, the tunnels meet.
- **Manholes** in the road every 40 blocks: left-click the cover to open / shut it, ladder down. Sewer bricks + manhole covers are in the Crafting Book.
- **Grimy sewer zombies** spawn in the dark tunnels while you're down there (greenish, a bit tougher). Torches keep them away like everywhere else.
- All of this is for **new worlds** (old worlds keep their roads so nothing you built moves). Tweak sizes in `SEWER` at the top of `js/sewers.js`.

## v0.37 notes: wooden desk, diamond tools look
- **Wooden Desk** (Crafting Book → Furniture, 6 planks): 2 blocks wide, 1 tall — 3 drawers with metal handles on the left, legs, a back panel and a pencil drawer on the right, one long top. It runs to your right when you place it. **Paintable** with the roller (paint one half and the other matches). Break either half and the whole desk comes up.
- **Diamond tools** are the iron tool models with a **purple** head and a **black** handle.

## v0.36 notes: switch mode & time from Options
- **Options → Mode: Survival / Creative ⇄** (only shows while you're in a world): flip any world between Survival and Creative (fly, Creative menu on E, no zombies, no damage) and back. Old Creative Realms stay flat — it's the rules that change, not the land.
- **Options → Day → turn Night / Night → turn Day**: jumps straight to nightfall or to the next morning. In Creative it stays that time of day until you switch it back. (In multiplayer only the host can do these.)

## v0.35 notes: furniture faces the right way, roofs overhang
- **Fixed for good:** furniture in turned buildings (TVs, couches, chairs, tubs, toilets, sinks, mirrors, cabinets, beds…) faced the wrong way whenever its built-in direction was "0" — the turn skipped it. Every building that gets turned now turns all of its furniture with it. This also fixes houses in your existing worlds (anywhere you haven't changed the blocks yourself).
- **Roofs stick out:** house roofs now run 1 block past the gable walls on both sides, so they don't look sliced off flush with the wall. New worlds only (old worlds keep their houses exactly where they are, so nothing you built gets moved).

## v0.34 notes: chunkier look, lights out, copper & diamonds
- **Slightly 3D blocks:** every block face has a soft bevel (lit top edge, darker sides / bottom) so blocks look like chunky raised cubes, plus a brighter, more saturated cartoon colour grade.
- **The grid is down:** street lamps, traffic signals, house lights, lamps and TVs don't work any more — only the **hospital** has power (its lights stay on 24/7). Switching something on elsewhere says "No power". Generators will plug into `DC.powered()` in `js/power.js`.
- **Light keeps zombies away:** none spawn within about half a light's reach (a torch protects ~7 blocks around it). **F4** = dev overlay: red squares where a zombie could spawn, purple where light makes it safe.
- **Copper ore** (orange / green specks, stone pickaxe+): raw copper → copper ingot (+ coal) in the Crafting Book — for electricity later. Coal, iron and copper are everywhere underground, a bit more common 20+ blocks down.
- **Diamond ore**: only 150+ blocks under the streets, rare small pockets. Stone with **purple crystals sticking out** of it. Needs an iron pickaxe. Diamonds make **diamond tools** (pickaxe, axe, shovel, machete, hoe — fastest and toughest).
- Engine: block ids are 16-bit now, so the game can have up to **1024 kinds of block** (was 256). Old saves still load.

## v0.33 notes: real elevators
- **Elevator** (Crafting Book → Building: 20 iron + 2 glass): a 4 wide x 3 deep x 4 tall stainless steel cab that really moves. Place it on the bottom floor of a shaft (right-click the floor; the 2 sliding steel doors face you). Walk in: steel walls, handrail, diamond-plate floor, ceiling lights, and a keypad on the right-hand wall by the door.
  - Right-click **▲** / **▼** on the keypad: the doors shut, it rides **one floor = 4 blocks** (our buildings are 4 blocks per floor, so it stops level with the floor above), *ding*, doors open. You (and zombies, and dropped items) ride with it — you can't fall out of it or walk through its walls.
  - An arrow is **lit red** when it can go that way and **off** when something blocks it (a block above the cab = only down). Cut a 4 x 3 hole in each floor for the shaft.
  - **Calling it:** put an **Elevator Panel** (now also the call button, 2 iron) on a wall within 3 blocks of the shaft on each floor. Right-click it and the elevator comes up / down to your floor and opens its doors.
  - Sneak + right-click the keypad inside to pick the elevator back up. Saved with the world (not shared in multiplayer yet).
  - Tweak speed / door time in `js/lift.js`; textures are `textures/blocks/elevator_*.png` (`tools/make_v33_textures.py` makes them).
- The Crafting Book button is centered in the inventory now (the extra "Crafting" title and hint are gone).

## v0.32 notes: crafting book, falling trees, stove cooking
- **Crafting Book.** Press E: the crafting grid is gone, there's a **book** instead. Click it and the inventory panel (same size) turns into the crafting page: categories on the left (Tools, Weapons, Food, Medical, Building, Furniture, Lights, Doors & Fences, Paint, Vehicles, Materials), everything in that category in the middle (green = you can make it now), and on the right the **materials required** with how many you have (e.g. Iron Machete: 2 Iron Ingot, 1 Stick). Click **CRAFT** (shift-click = as many as you can). Click *Inventory* to go back. Everything can be crafted anywhere in survival — no table needed (a crafting table just opens the book).
  - New prices: Pistol 5 iron · Pump Shotgun 1 oak log + 10 iron · Rifle 8 iron + 2 planks · Store Shelf 10 iron · lights 3 iron · appliances 8 iron… Things that never had a recipe got a simple one.
  - **Change any recipe** in `RECIPES` at the top of `js/craftbook.js` (`needs: { iron_ingot: 30, tire: 4 }`, `count:` = how many you get). Natural stuff (logs, ores, meat, flowers…) is in `RAW` and stays out of the book.
- **Falling trees.** Chop the bottom of a tree (by hand too): it **drops** onto the stump with gravity, then **tips over**, shedding leaf pixels on the way down. When it hits the ground there's a heavy crash, the **screen shakes** (more when you're close / the tree is big) and it bursts into leaf and bark pixels, leaving its logs, sticks (always at least 2) and sometimes apples.
- **Stove cooking (like a campfire).** Hold raw beef or raw venison and right-click a stove: it goes on the burner you're pointing at (4 burners). The burner glows red, the meat steams and sizzles, and after 12 seconds it turns into steak / cooked venison right on the burner. Right-click a burner to take it. Electric, so no fuel. Break the stove and the food falls off. Change foods / time in `js/stove.js`.

## v0.31 notes: heavy-duty pickup, pump shotgun
- **New pickup truck**: a lifted heavy-duty crew-cab "dually": tall square hood, big grille in a grey surround, wide bumper, tilted windshield, tow mirrors, amber roof lights, wide rear fenders and **2 tires on each side at the back** (the pair shares one tire slot, so tire swapping works the same). Mostly black, sometimes red, blue, tan, green or white. Old pickups in your worlds change to the new look. Edit it in `js/data/vehicles.js` (new box options: `rx` tilts a part, `tire` makes a wheel share a tire, `hub` / `hubColor` / `cap` for the wheel centres).
- **Pump Shotgun** (crafting table: `I I I` / `P I P`, I = iron ingot, P = planks): 8 pellets a shot, huge up close, weak far away, a pump (you see the forend slide) between shots, deep boom, zombies hear it from far. Each pellet hits blocks at half a bullet's strength. Tweak it in `js/data/items.js`; drop a real `sounds/pump.wav` in for the pump sound, or change `gunshot_shotgun` in `sounds/sounds.js`.

## v0.30 notes: blocks chip, crack and stay damaged
- **No more black shading or red ring when mining.** Hold left click and pixels chip out of the block **right where your crosshair is**, flying off in the block's own colours. When it breaks, the whole block bursts into its pixels.
- **Damage stays.** Stop halfway and walk away: the block keeps its damage (and its holes) — come back and finish it. It's saved with the world and shows for friends in multiplayer.
- **Bullet holes.** Every shot leaves a hole where it hits. Some blocks break after enough hits:

  | Block | Bullets to break |
  |---|---|
  | Glass | 1 |
  | Leaves | 5 |
  | Drywall, wallpaper, hospital walls | 8 |
  | Wood (planks, logs, siding, fences, doors…) | 10 |
  | Brick | 30 |
  | Concrete (and sidewalk, barriers) | 40 |
  | Stone, dirt, metal… | holes only |

  Change the numbers in `DC.config.bulletHP` at the top of `js/damage.js`, or give one block its own: `bulletHP: 25` in its block definition (0 = bulletproof).
- **Screens pop.** Computer monitors and flatscreen TVs flicker (white / blue static) every time they're shot and crack where the bullet hit, then **pop** in a flash of sparks, glass and smoke: monitors on the 3rd shot, TVs on the 4th (`SCREENS` in `js/damage.js`).
- **Cars dent what they bump.** Tap a wall slowly and it gets a dent and cracks; hit it again and it gets worse. ~25 mph knocks out wood, brick and concrete take a few hits (`DC.config.carDentPower`). Full speed still smashes straight through like before.
- **Zombies leave claw marks** on the walls they tear at, and if they give up, the next one carries on from the damage that's there.
- Mining progress works the same as before (same tools, same times) — it's just shown on the block now.

## v0.29f notes: fences, spaced-out neighborhoods, more homes, parks, piers
- **Stealth is stealth**: while you sneak out of their sight, a hunter's growl doesn't call anyone new or remind the others where you are, and no stragglers join. Once one of them sees you again, the old rules are back.
- **Zombies use doors**: a hunter that walks into a wall looks for a door nearby, walks round the house to it (following the wall) and opens it. They only claw through walls when there's no door.
- **No more stacking**: zombies push each other apart, so they can't stand inside each other.
- **Picket fence** (2 sticks + 2 planks, 4 of them): oak, 1 block high, paint it any colour. **Wire fence** is now 1 block high too. Both join up with the fences and walls next to them; stack one on another for a 2-high fence (the top one gets the posts' caps / pointy pickets).
- **New worlds** (old worlds keep their old land):
  - Homes have **3 blocks of yard each side** and a fence between neighbours and along the back (white or wooden picket, or chain-link, 1 or 2 high).
  - 4 kinds of home: the 2-story suburban house, a 1-story **ranch house** (2 bedrooms, 1 bathroom), a **bungalow** (1 bedroom, 1 bathroom) and an **apartment complex** (12 studio flats over 2 floors, outside stairs, a balcony walkway and its own parking lot).
  - **Big parks**: paths, a pond, a fountain, benches, lamps and trees.
  - **Amusement piers** off some sandy beaches: a boardwalk on piles, an arch, lamps, food booths and a ferris wheel.
  - In cities, stores, gas stations (and 11 11s) are **spread out** — no two within 2 blocks of each other — and parking lots never sit side by side.
  - **City parking lots**: a hedge round the edge, driveways in, a planted island down the middle with light poles, planters at the ends of each row.

## v0.29e notes: zombies that feel real
- **Fewer around, a pack that grows**: at night about 60 zombies wander around you (not 200). When one spots you, its growls pull in a few more at a time, and stragglers who heard the commotion join now and then — up to a pack of **20** chasing you (+2 each night, max 40; 8 in the day).
- **They notice you over time**: zombies only see what's in front of them (unless you're right next to them). A glimpse fills an awareness meter: first they turn and shamble over to look; only when it fills do they come running. Far away, sneaking, standing still or behind glass = much slower to notice. Out of sight they forget you and wander off.
- **No more instant spins**: they turn toward things gradually and walk the way they face. Lose them and they go and search where they last saw you.
- **Noise** (guns, engines): the closest come running (up to the pack size), the rest come over to see what it was.
- Each zombie shambles at its own pace; a few are fast. Tweak it all in `DC.zombieAI` at the top of `js/entities.js`.

## v0.29d notes: smoother at night with the horde
- Walls the horde smashes are cleared in batches (one relight + re-draw per area a few times a second, instead of per block). Only changes close to you are re-drawn right away; far ones wait their turn, so a frame never spends more than ~10 ms re-drawing.
- Faster block lookups (the world remembers the last chunk it looked in), zombie bodies are 1 mesh per body part shared by every zombie, far-away zombies look around less often, and the shader handles 16 nearby lights instead of 24 (whole streets of lamps at night).
- Still laggy? Options → lower Render distance, or lower `zombiesNight` in `js/core.js`.

## v0.29c notes: hide in wardrobes, 3D bookcase, coffee table, paint that sticks, flat drywall
- **Wardrobe** is 2 wide x **3 tall** now. **Sneak + left-click** it to climb in and **hide** (they can't see or hear you) — you look out through the crack between the doors. Sneak or jump to step out.
- **Paint sticks**: break a painted block in Survival (concrete, a couch, a bed, a chair, a sleeping bag…) and it drops **still painted** (painted concrete / siding come back as themselves). Painted items **show their colour** in the inventory and hotbar, stack with the same colour, and place painted. Pick block in Creative copies the colour too.
- **Drywall** is a smooth, flat white block now — paint it for clean coloured walls. Breaking it gives it back.
- **Bookcase**: a real 3D oak bookcase, books only on the front, faces you when you place it. Paint changes the wood, not the books.
- **Coffee Table**: a low table (`PPP` / `S S` = 2). Put them side by side for a longer / wider one (inside legs disappear). Paintable.
- **Store shelves** show their products a bit bigger and at the front edge.
- **Houses** (new worlds): the upstairs hallway is 2 wide, the upstairs bathroom matches the downstairs one (shower head always over the tub), a coffee table in the living room, bookcases face the room.
- **1st / 3rd person**: Options → Controls → "1st / 3rd person view" (F5 by default).

## v0.29b notes: avenues, street lights, signal masts, bridges, no dead ends, 2 x 2 wardrobe
- **New worlds only (roads / towns / cities):**
  - **Avenues**: city streets, town main roads and freeways are 2 lanes each way (3 wide, white dashes), a **double yellow line** in the middle and **3-block sidewalks** with **street lights** that light the road at night.
  - **Residential streets**: 1 lane each way with 2-block sidewalks and street lights; stop signs where they meet the avenue.
  - **Signal masts** (European style) on every corner of a crossing: the heads hang from the arm on short rods, with a street light in the middle. Zebra crossings and rounded corners.
  - **No more dead-end roads**: a road that would stop in the middle of nowhere carries straight on until it meets another road. Freeways run straight through cities.
  - **Bridges**: where a road crosses water it's a **suspension bridge** — deck on pillars, railings, tall towers with cables and hangers.
- **Houses**: the garage door no longer replaces a bathroom wall (the door's direction now turns with the house, so driving up opens the right door). The ground-floor bathroom is laid out properly: tub along the wall with the curtain in front, toilet, sink with the mirror over it, room to walk in. Bedrooms get the new wardrobe.
- **Wardrobe**: 2 wide x 2 tall oak, two doors over a drawer, **paintable**, right-click for 3 rows of 6. (Old 1-block wardrobes in your worlds show as a small wardrobe.)
- **Filing cabinet**: drawers only on the front, and it faces you when you place it.
- **Street lights don't give you away** to zombies at night (torches, lamps and room lights still do).
- New in the Traffic tab: **Street Lamp** (right-click the ground; the arm reaches out the way you look) and the **Double Yellow Line**.

## v0.29 notes: neighborhoods, garage doors, farming, flowing water, cows + deer, bandits, 3rd person
- **Neighborhoods** (new worlds): every town is a suburb now — the main roads get 2-block sidewalks, 2 more streets run across each town (sidewalks both sides, stop signs where they meet the main road), and rows of **suburban houses** face the streets. Some plots are little farms (with water channels) or a patch of trees.
- **Suburban house** (25 x 25, 2 versions: garage left / right): living room (couch, flatscreen TV, coffee table, bookshelves), **dining table with 4 chairs**, kitchen (2-tall fridge, stove, sink, cabinets, upper cabinets), **2 full bathrooms** (tub + curtain + shower head, toilet, sink + mirror), **3 bedrooms** upstairs, a **basement** (rec room with a couch + TV, workbench, storage, a fridge), stairs up and down, and an **inside door into the 2-car garage**. Every house is painted its own siding colour (white, light blue, yellow, beige, sage, gray, navy…). Concrete driveway → 2-block sidewalk → street.
- **Garage Door** (6 wide x 3 tall): **drive up to it in a car and press W** — it rolls up into the ceiling. It shuts by itself once the doorway is clear. On foot: right-click it to open / shut. Placeable (iron ingots, craft `III` / `I I` / `I I`) and paintable.
- **Flatscreen TV**: the old TV block is a 1 x 1 flatscreen on a stand now. **Left-click to turn it on**: a blue screen with **NO SIGNAL** bouncing around.
- **Traffic signal masts** in cities (new worlds): a tall pole on every corner with an arm over the lanes and signal heads hanging from it (they change like the old traffic lights). Item **Traffic Signal Mast** in the Traffic tab: right-click the ground (the arm points the way you look; sneak = heads face the other way; right-click a mast with another one = longer arm).
- **No brick**: the diner, apartment block, 11 11s, city apartments / stores and gas station shops use painted siding / concrete now. New paint colours (for the world): gray, beige, sage, navy.
- **Signs**: the hospital has a real **HOSPITAL** sign (and **EMERGENCY** on the back), the police station a **POLICE** sign — no more block letters. (They're on the Stores tab too.)
- **Streets connect**: freeways run straight through cities now (no more roads that stop at a city block), and streets carry on across the gap where two towns or two cities meet.
- **Farming**: **Wooden / Stone / Iron Hoe** (`MM` / ` S` / ` S`): right-click dirt or grass → farmland. Plant **Wheat Seeds** (from tall grass, ripe wheat, or 1 wheat → 2 seeds) or **Carrots**. Farmland needs **water within 4 blocks** (it turns darker) or it dries back into dirt (and the crop pops off). Crops grow in 8 steps (~4 minutes on wet farmland).
- **Flowing water**: water you pour falls straight down and spreads up to **7 blocks** where it lands, getting shallower; take the source away and it dries up. 2 sources next to each other make a new one. Only the source can be scooped with a bucket.
- **Cows and deer** wander in groups of 1-3, sometimes with a baby. When zombies get close they run — **cows 1.5x, deer 2.5x as fast as you walk**. **Tame** them by feeding (cows: wheat, deer: carrots), then feed 2 tamed ones to make a **baby** (5 minute rest after). Babies grow up in 10 minutes. Tamed animals follow you when you hold their food and are saved with your world. Raw beef / raw venison (cook with coal at a crafting table → steak / cooked venison). Settings: `CFG` in `js/animals.js`.
- **Bandits**: rare (about 1 group per 60 zombies), 1-4 survivors with machetes. If they see you they come running at you. They only pull their guns once **you shoot** one of them. They can drop machetes, a pistol, bandages, food.
- **3rd person**: press **F5** (Options → Controls) to switch to a camera behind you and back. You see your player with whatever you're holding.
- **Light fix**: big buildings (the hospital) had a hard edge where one part of a room was lit and the rest pitch black — every chunk now keeps light at street level. **Ceiling and wall lights give white light** now (torches and lamps stay warm), and the **hospital has ceiling lights** on every floor (lobby, hallways, rooms). Like torches, lit lights let zombies see you at night — click one to switch it off.
- **Fixes**: breaking one half of a mirror / stop sign / fridge takes the whole thing down; stop signs stand on a **thin pole** and their back is a grey octagon; the fridge shows its **4 rows of 6** properly; in the mirror your arm swings **forward** when you hit.
- Code: `js/town.js` (garage doors, TV, masts, sign pole), `js/farming.js`, `js/water.js`, `js/animals.js`, `js/avatar.js` (3rd person + mirror model), `js/data/town_blocks.js`; neighborhoods in `js/worldgen.js` (`suburbColumn`), the house in `js/data/buildings.js`. Textures + cow / deer models + bandit skin: `tools/make_v29_textures.py`.

## v0.28 notes: tool swings, 2-tall fridge, stair rails, elevator breakdowns, Paint + Traffic tabs
- **Axe and machete** face the right way in your hand now (the blade points forward), and the **machete is longer**.
- **Real swings:** the machete does a fast diagonal slash, axes / pickaxes / shovels chop down. Swings are quicker (machete fastest) and the machete attacks faster too.
- **Tool icons** are pictures of the 3D tools now (no more broken-looking pickaxe).
- **Gas pump:** the full 2-block pump shows in your hand and the inventory, and it **faces you** when you place it.
- **Cash register and stop sign** have proper 3D item pictures. A **stop sign put on the ground comes with its pole** (on top of a fence post it's just the sign, like before).
- **Fridge** is 2 blocks tall now (freezer on top), faces you, both doors swing open, and it holds **4 rows of 6** (you might find food inside). The old 1-block fridges in your worlds get their top drawn too. Paintable.
- **Handrails on stairs:** click the **side of a stair** with a Handrail: the rail stands on the very edge of that step, joins the rails next to it up the stairs and **round corners**, and only blocks that thin edge (you can still walk up the stairs, but not fall off the side). Placing a handrail on the ground works like before.
- **Elevators can be out of order** (a new chance every day): the panel says OUT OF ORDER and the doors stay shut — take the stairs. Never in the Creative Realm. Chance: `DC.elevatorBrokenChance` in `js/home.js`.
- **Creative menu:** new **Paint** tab (buckets, roller, spray cans, dyes, buckets) and **Traffic** tab (asphalt, sidewalk, road lines, arrows, wheel stops, stop signs, traffic lights, fence posts, barriers, gas pump, gates…).

## v0.27 notes: kitchen, bathroom, a real mirror, lights
- **Tables are 3D** now. Put tables next to each other (2 long, 2 x 2, any shape) and they join into one big table: the legs in the middle disappear, only the outside corners keep legs. Paintable.
- **Chairs face you** when you put them down.
- **Kitchen:** **Kitchen Sink** (oak cabinet, stainless steel double sink + faucet), **Kitchen Cabinet** (1 door) and **Kitchen Cabinet (2 doors)** with a stone counter top, **Upper Cabinet** (1 or 2 doors, hang it on a wall). Right-click to look inside — the doors swing open. They hold your stuff, and the ones you find in buildings can have food in them. All paintable.
- **Toilet:** right-click to sit, **sneak + right-click to flush**.
- **Bathroom Sink Cabinet:** oak (paintable) with a white basin and a tap, 2 doors, storage inside.
- **Bathtub:** 2 blocks long, runs away from you. Break either half and it all comes back as 1 bathtub.
- **Shower Curtain:** click a ceiling and it hangs down to the tub (or the floor). Curtains next to each other join up and go round corners (L shapes, U shapes…). You can walk through it. Paintable.
- **Shower Head:** put it on a wall about 2 blocks up. Click it (left or right) to turn the water on and off.
- **Mirror** (1 wide x 2 tall): a **real mirror** — it reflects the room and **you** (your skin, walking, sitting). The nearest mirror you're looking at is live; others look silvery. On phones it turns off when Shaders are OFF.
- **Lights:** **Ceiling Light** (a square panel hanging from the ceiling) and **Wall Light**. Left-click (or right-click) switches them off and on. Like torches, zombies see them at night.
- Everything is in Creative → Furniture. Recipes are in `js/data/home_blocks.js`. Code: `js/home.js`, `js/mirror.js`. Textures: `tools/make_v27_textures.py`.

## v0.26 notes: furniture + zombies inside buildings
- **Couch** (the old couch is now 3D): seat, back cushions and arms. Put couches side by side and they join into one long couch (arms only on the ends). It faces you when you place it. **Paint it** with the roller. **Right-click to sit** (Sneak to stand). Craft: cloth + planks (`C..` / `CCC` / `PPP`) = 2.
- **Table Lamp:** **left-click** (or right-click) switches it on and off. **Sneak + left-click** breaks it. The shade takes paint. A lit lamp lights the room — and at night zombies can see that light, just like a torch. Craft: glass / torch / iron ingot in a column.
- **End Table** (1 x 1): oak legs, an inset square on top and a drawer with a gold knob (5 slots). Paintable. Craft: `PPP` / `S.S`.
- **Nightstand:** oak, 2 drawers with gold knobs (5 slots each). Paintable. Craft: `PPP` / `PCP` / `S.S` (C = cobblestone).
- Small houses get a nightstand with a lamp by the bed and an end table with a lamp next to the couch (new worlds).
- **Zombies spawn inside buildings now** — stores, the shopping center, the hospital, police stations, houses — mostly in **dark rooms with no torch or lamp nearby**. Light a room (torch or lamp) to keep them from showing up there. Never right next to you. Numbers: `INDOOR` at the top of `js/furniture.js`.
- Code: `js/furniture.js`, `js/data/furniture_blocks.js`. Textures: `tools/make_v26_textures.py`.

## v0.25 notes: taller hospital, elevators, handrails, road arrows, 3-wide lanes
- **Hospital floors are 5 blocks high** inside now (was 3). Curtains are 4 high and hang from rods up to the ceiling.
- **2 elevators** at the back of the lobby replace the 2 staircases. They go to every floor and wheelchairs fit. Walk up and the steel doors slide open; right-click the **panel** inside and pick a floor (G, 1, 2, 3). You can press it from a wheelchair too.
- **Stairwell** in the north-east corner (in case the elevators are out): one straight flight per floor with **handrails** on both sides. Door from the hallway at the east end.
- **Handrail** (new, Creative → Furniture, or 5 iron in a ∩ = 4): a grey metal tube rail, 2 blocks tall. Put it beside stairs: rails next to each other join up, climb diagonally with the steps and turn corners. It's solid, so nobody falls off the side.
- **Elevator Door** (2 wide x 2 tall, slides open by itself) and **Elevator Panel**: build your own elevator. Put a panel in the **same spot** on every floor (same x and z), right-click it, pick a floor.
- **Hospital beds only heal with an IV drip stand within 2 blocks** of the bed. Without one you can still lie down, but health and hunger don't fill up.
- **Monitors** at the reception face you as you walk in now (and the ER ones face the waiting room).
- **Front of the hospital:** an asphalt drop-off lane under the canopy with white road arrows.
- **Road Arrow** (new item, 3 white dye = 2): aim at the asphalt in the middle of a lane — that block is the **tip** and the arrow (3 wide x 3 long) points away from you, painted on the asphalt. Break any one of its 9 blocks and the whole arrow is gone (the other 8 go back to plain asphalt).
- **Every car lane is 3 blocks wide** in new worlds: freeways (3 + 3 each way, wider sidewalks) and town main roads. City streets already were. So a road arrow centred on a lane fits exactly.
- All of this is in worlds you create from now on. If you edited the hospital in Creative, use Restore defaults.
- Arrow pictures are drawn on your `asphalt.png` by `tools/make_v25_textures.py` (run it again if you repaint the asphalt). Elevator / handrail / arrow code: `js/hospital.js`.

## v0.24 notes: the new hospital, sitting, hiding, 3D tools
- **New hospital** (in worlds you create from now on): hallways **4 wide x 3 tall** on every floor, patient rooms on both sides, a lobby with a reception desk (2 computer monitors) and waiting chairs, **2 main staircases (2 wide)** up to every floor, side fire exits, and an **EMERGENCY entrance** at the back: waiting chairs facing a small office behind **2 glass windows**. (If you edited the hospital in Creative, use Restore defaults.)
- **Patient rooms:** 2 **hospital beds**, a **light-blue curtain** between them (and half-drawn in front), an **IV drip stand** by each bed, a glossy **wall cabinet** 3 blocks up over each bed (2 rows x 4 inside, the door swings open), a bedside table with a **Med-Kit**, and a **3-drawer cabinet** (3 drawers of 5). **Wheelchairs** are parked in rooms, hallways and the lobby.
- **Hospital bed:** right-click to lie down and rest: health and hunger fill back up (at night it also sleeps you through, like a bed). Sneak to get up.
- **Hide under a bed:** **Sneak + right-click** a hospital bed or a normal bed (not a sleeping bag). You slide under it, your body is hidden, and zombies can't see or hear you, so they lose track. Look around freely. Sneak again (or Jump) to crawl out.
- **Sit:** right-click a chair (lobby, ER, anywhere). Sneak to stand up. Sneak + right-click still places a block against it.
- **Wheelchairs:** right-click to sit in one. **W** rolls forward where you look, **S** rolls back, Sneak gets you up (the wheelchair stays where you stopped). You can still fight from it.
- **Med-Kit** (replaces the medical cabinet): a small white first-aid box. Right-click to open it (4 slots). Ones in hospitals and pharmacies start with bandages and cloth. **Break it and everything stays inside**: it drops as one Med-Kit item (the red number shows how many things are in it), and when you place it again it's all still there.
- **Pharmacies** have drawer cabinets with wall cabinets above them, and Med-Kits on the counter.
- **Paint:** one roller dip now paints **20 blocks** in survival. In **Creative paint is unlimited** (the bucket and the roller never run out).
- **Pick block copies paint (Creative):** middle-click a painted block and you get that block **with its paint** (a coloured dot shows on the slot). Place it and it comes out painted. No rainbow of coloured blocks in the Creative menu needed.
- **3D tools:** pickaxes, axes, machetes and shovels (wooden, stone, iron) are real 3D models in your hand and on the ground. Colours and shapes: `js/tools3d.js`.
- New blocks in Creative → Furniture: Hospital Bed, Privacy Curtain, IV Drip Stand, Wall Cabinet, Drawer Cabinet, Wheelchair, Computer Monitor. Recipes (crafting table): curtain x4 = 6 cloth; hospital bed = 3 cloth over 3 iron; wheelchair = iron frame + cloth; Med-Kit = cloth + red dye; IV stand = 3 iron + a water bottle; wall cabinet = 5 planks; drawer cabinet = 8 planks (ring); monitor = iron + glass.
- Multiplayer: friends see you sitting / in a wheelchair, and you vanish when you hide under a bed.
- Code: `js/hospital.js` (shapes, sitting, wheelchairs, resting, hiding — numbers at the top), `js/data/hospital_blocks.js` (blocks, items, recipes), hospital layout in `js/data/buildings.js`. Textures: `tools/make_v24_textures.py`.

## v0.23 notes: wheel stops & freeway sidewalks
- **Wheel stops are centred now:** aim at the ground in the middle block of a parking space and the 2-block bar is centred there (half a block sticks into the blocks on each side), on the far side. It's one block now. (Wheel stops you placed with the old 2-block version: break and re-place them.)
- **Cars can't drive over wheel stops** — they stop right at the bar. People still walk over them.
- **Every parking lot has wheel stops** in every space (city lots and the hospital lot in all worlds; the Shopping Center and Burger Shack in new worlds).
- **Freeways:** the concrete wall along the sides is gone; there's a 2-block sidewalk on each side instead (in every world, wherever the freeway is generated).

## v0.22 notes: road & parking lines
- **Lines turn toward you** when you place them now (like logs): look north/south and the line runs north/south, look east/west and it runs east/west. Buildings you rotate turn their lines too.
- **New line pieces** (Creative → Blocks, white and yellow): **Line T** (a line across with a branch going away from you — for joining parking-space lines to the main line), **Line End** (runs away from you and stops in the middle of the block), **Line Corner** and **Line Cross**.
- **Parking lots redone** like your hand-made one: solid stall lines, a centre line through each double row, crossings, Ts at the outside ends and Line Ends at every tip. City parking lots and the hospital lot change in every world (your own edits stay); the Shopping Center and Burger Shack lots are in new worlds (or Restore defaults if you edited them).
- **Wheel Stop** (Creative → Items & Tools): a 2-block concrete parking bumper, 0.3 × 0.3 with sloped sides. Paint it with the roller.
- All line textures are redrawn on your new black asphalt. If you change `asphalt.png` again, run `python tools/make_v22_lines.py` (and `tools/make_v25_textures.py` for the road arrows) and then **Rebuild index.bat** so the lines match.

## v0.21 notes:
- **Options → Buildings…** lists every building that will spawn in the **next world you create**. Tap **Edit** to change its name, type (where it spawns), front door side, how often it spawns (1–10), or switch it **off** for new worlds. Also Import, Export all, Restore defaults. Old worlds don't change.
- **Export building file**: in Options → Buildings → Edit (and in Creative → Buildings → Edit) you can save a building as a `.building.json` file. Send it to a friend, or attach it in a chat with Claude so Claude can read your build. Import puts it back in.
- **Creative → Stores** tab with the **11 11 Store Banner**. Right-click a wall to hang it: it covers 4 blocks wide × 2 tall, sits flat on the wall like it's painted on, and pops out a little like the items in your hand. Transparent parts of the picture are see-through. Break any part to take it down (in survival you get it back). Banners you save inside a building keep their picture and turn with the building.
- **Your own banner picture:** make a PNG in Photoshop with a transparent background, 2 wide : 1 tall (the same shape as the banner: 4×2 → 512×256, 6×3 → 768×384, 12×6 → 1024×512), and save it over its file in `textures/stores/` (e.g. `11_11.png`). `dev.html` shows it right away; for `index.html` run `python tools/build_single.py` again.
- **Breaking banners works now:** aim at any part of a banner and mine it; the whole banner comes down.
- **12 more store banners** (Creative → Stores): Corner Store, Pharmacy, Diner, Gas & Go, Burger Shack (6 × 3) and the Shopping Center stores Dollar, Fiver, Barber, Nails, Wok, Busway (12 × 6) and MegaMart (18 × 6). The 11 11 stays 4 × 2.
- **The stores wear their banners** in new worlds: the Corner Store, Pharmacy and Diner are a bit taller with a sign on the roof, the Gas Station has one on the front of the canopy, the Burger Shack over its windows, and the Shopping Center stores use banners instead of block letters. If you edited one of these in Creative, use Restore defaults to get the new version.
- Banner pictures are drawn by `tools/make_v21_banners.py` (it never overwrites a picture you replaced).
- **More stores:** put another PNG in `textures/stores/` and add a line to `js/data/stores.js` (add to the end of the list).

## v0.20 notes:
- New **Chair** block (Furniture tab, or craft 2 from planks + sticks on a crafting table: `P..` / `PPP` / `S.S`). Black metal legs, a seat and a tall back; it faces you when you place it.
- Paint chairs with the roller: the seat and back change colour, the legs stay black. Unpainted chairs are black.
- Hospitals: the blue couches are gone. The lobby has 2 waiting areas, each a row of 5 black chairs with 5 more behind, facing the reception desk.
- Burger Shack, Wok and Busway: red chairs round the tables instead of couches. The nail salon gets pink ones.
- Only new worlds get the new buildings. If you edited a copy of these buildings in Creative, use Restore defaults.

## v0.19 notes: new hospital, police stations, shopping centers, traffic lights
- **Hospital (rebuilt):** a big blue and white hospital, 4 floors. It has white pillars, blue panels, lots of glass, sliding glass doors under a drop-off canopy, red crosses and a HOSPITAL sign tower. Inside: a lobby with reception, patient rooms on every floor, and stairs. It sits between **two parks** (paths, trees, flowers) with the big parking lot in front.
- **Hospital beds are gone.** Hospitals use normal beds painted **light blue**. (Old hospital beds disappear from old worlds too.)
- **Police Station** (big, takes a 2 x 2 city block): blue pillars, a tall glass entrance and a POLICE sign. Inside: a lobby and front desk, the main office with **2 cells behind it**, a squad room, offices upstairs, and a **basement with 6 cells**. A **metal emergency door** at the back opens onto a **fenced parking lot (42 spaces)** with a large sliding gate.
- **Metal Door** (new): 6 iron ingots in 2 columns at a crafting table. **Zombies can't open or break it.**
- **Shopping Centers** (huge, a 6 x 3 city block, about 230 x 105 blocks): a big parking lot with trees, then **MegaMart** (supermarket: checkouts, 13 aisles, a wall of drinks fridges) plus **Dollar, Fiver, Barber, Nails, Wok (Chinese food) and Busway** (sandwiches). Each store has its own colour and a block-letter sign. Mostly concrete.
- **Traffic lights** on every city street corner (north-south and east-west take turns: green, yellow, red). **Stop signs** at the town crossings. You can place both yourself (traffic light / stop sign on top of a fence post).
- Shop signs use a block-letter font: `b.text(...)` in `js/structures.js`. Tweak how often shopping centers / police stations appear in `siteOfCell` in `js/worldgen.js`, and the light timings in `js/traffic.js`.
- All of this is in worlds you create from now on.

## v0.18 notes: city makeover, gas station, Burger Shack, shiny cars
- **City streets are 4 lanes** (2 each way): white lane dashes, a yellow centre line and zebra crossings at every intersection.
- **The hospital has a real parking lot**: 2 rows of marked spaces, a wide aisle, and a driveway out to the town's main road. The ambulances / cop cars park in the spaces.
- **New gas station** (24 x 24): one long pump island with a 4-wide lane on each side and 4 blocks of headroom, so you can drive through. The shop has 5 aisles of shelves, drinks fridges along the back wall, and a counter you can walk behind.
- **Cash registers are 3D** and sit on top of the counters (11 11s, corner store, pharmacy, diner, gas station).
- **Burger Shack** (new): fast food with a **drive-thru**. The lane comes in on the right, runs past the pick-up window and the menu board, and goes out on the left. Inside are booths, an order counter, the kitchen and drinks fridges.
- **Cars** have glossy paint (a sun highlight + a sheen, gone at night) and round wheels.
- **Spray paint:** craft a paint bucket + an iron ingot = a **Spray Paint** can of that colour. Right-click a car with it to paint the whole car (1 can = 1 car).
- **Your hand** sits like Minecraft's now (up from the bottom-right corner, leaning toward the crosshair). Held items are a bit lower / further right, and every item is **2 pixels thick** so it looks properly 3D.
- The street / parking / building changes are in worlds you create from now on (old worlds keep their layout).

## v0.17 notes: store shelves, drinks fridges, sodas
- **Store shelves open like a chest.** Right-click one to get 3 rows of 5 slots. Take things, or stock it yourself. Whatever's in a shelf stands on its boards, on both sides of the aisle.
- **Drinks Fridge** (new, 2 blocks tall, glass door): right-click it and the door swings open, with 6 rows of 8 slots. You can see the drinks through the glass. 11 11s have a row of them along the back wall.
- **New items:** Cookies, Water Bottle, and three sodas: **Loca Soda**, **Orange Soda** and **Limon Skirt**. A soda gives a **sugar rush: 2x speed for 3 minutes**, and your field of view goes up by 10 while it lasts. A timer shows at the top of the screen. You can drink a soda even when you're full.
- **Store loot is rare.** A whole 11 11s usually has 2-3 things, sometimes up to 8, and about 1 in 5 has been picked clean. Break a shelf or fridge and whatever's inside falls out. Tweak `LOOT` / `STORE_LUCK` in `js/containers.js`.
- **11 11s are at least a mile apart** now (in worlds you create from now on).
- **Creative → Buildings → Edit** opens the building's info first (name, type, front door, how often it spawns). **Edit blocks…** spawns it so you can change the blocks.
- Textures: `textures/blocks/store_shelf_back.png`, `store_fridge_*.png` and `textures/items/loca_soda.png` etc. (made by `tools/make_v17_textures.py`; you can paint over them).

## v0.15 notes: slabs, fence posts, connected glass, pick block
- **Renamed:** Asphalt Shingle Block is now **Shingle Block** and Asphalt Shingles (the stairs) are now **Shingle Stairs**. Shingle Blocks drop themselves when you break them.
- **Shingle Slab:** half a shingle block. Click the top half of a wall (or a ceiling) to get an upside-down slab. Put a slab on the open side of another slab and they become a full Shingle Block.
  Craft: coal + cobblestone diagonally in a 2x2 = 2 Shingle Blocks. 3 Shingle Blocks in a row = 6 slabs.
- **Fence Post:** a 2-block-tall metal pole, 0.3 wide. Put one where two wire fences meet to make a clean corner. Craft: 3 iron ingots in a column (crafting table) = 2 posts.
- **Ladders are thin now.** Your crosshair only hits the ladder itself, so you can mine the block above you while you're climbing. Slabs and posts only highlight the part that's really there.
- **Connected glass:** glass blocks next to each other lose the frame between them, like the Connected Textures mod, so long windows look like one big pane.
- **Pick block (middle click):** if the block is already on your hotbar, it selects it. In Creative it puts the block in your current slot. In Survival it swaps it into your current slot from your inventory.
  On iPhone there's a small **PICK** button at the top left. Turn it off in **Options → Pick block button**.
- **Options → Colours…** has every colour setting on its own page: hunger, hearts, and the new **hotbar selector** colour.
- Stairs, slabs and posts now look like their real 3D shape in your hand and on the ground (they used to show as a big flat square).

## Multiplayer (v0.14): play with friends
Works on your GitHub Pages link, on PC and iPhone, no server needed. The host's browser *is* the server.

**Host (you):**
1. **Play**, then open or create a world.
2. Pause (Esc, or the pause button on iPhone) and tap **Host Game**.
3. You get a 5-letter **invite code** like `K7M2Q`. Tap **Copy invite link** (or **Share…** on iPhone) and send it to your friend.
4. Keep playing. Friends who join show up in the pause menu. **Stop hosting** turns it back into singleplayer.

**Friend:**
- Open the invite link, or go to **Join a Friend** on the title screen and type the code. You spawn next to the host.

**What's shared:** every block anyone places or breaks (doors, paint, gates and falling trees too), player positions with name tags and skins, the zombies (the host runs them and they hunt whoever is closest), the time of day, damage, and zombie kills.
**What isn't shared yet:** dropped items and loot (whoever breaks it gets it), cars (each player has their own), and sleeping. Only the host can skip the night.

- Each friend's inventory is saved on their own device, so they keep their stuff when they rejoin your world.
- The world only runs while the host is in it. If the host quits, everyone goes back to the title screen.
- Pausing doesn't freeze the game while friends are playing.
- Both players need the same version, so re-upload `index.html` and have friends refresh.
- On iPhone, keep NovaCraftZ open on screen while you host. If you switch apps, Safari pauses it and friends get disconnected.
- Players find each other through the free PeerJS service (`js/lib/peerjs.min.js`), which needs internet. After that, game data goes straight between your devices. Settings and code are in `js/net.js`.

## Folder map: what to edit

| I want to change… | Edit this |
|---|---|
| **Block textures** | `textures/blocks/*.png` (16×16, or 32×32 for HD, as long as they're all the same size) |
| **Item / tool icons** | `textures/items/*.png` |
| **Your player skin** | `textures/entity/playerskin.png`: any normal Minecraft skin works (64×64, or old 64×32). Just name it `playerskin.png` |
| **Zombie skin** | `textures/entity/zombie.png` (64×64 Minecraft-style skin layout). Any **bright pure-red pixel** (like #FF0000) glows in the dark, and red pixels on the face get a glowing halo |
| **Player model** | `models/player.geo.json` (Blockbench, Bedrock format) |
| **Sound effects** | Replace any file in `sounds/` (.wav/.mp3/.ogg). The list and volumes are in `sounds/sounds.js` |
| **Guns** (damage, fire rate, auto, recoil, noise) | `js/data/items.js` (bottom) |
| **Gun models & arm positions** | `js/viewmodel.js` (`makePistol`, `makeRifle`, POSES) |
| **Food values** | `js/data/items.js` (`food:` points, 20 = full) |
| **Zombie model** | `models/zombie.geo.json` (open in **Blockbench** as a Bedrock model) |
| **UI colours / font / slot size / roundness** | `css/theme.css` |
| **Zombies-hunting-you icon** (top left) | `textures/gui/zombie_icon.png` (any size, square looks best) |
| **UI layout** | `css/ui.css`, `dev.html` |
| **Blocks** (hardness, drops, which tool…) | `js/data/blocks.js` |
| **Items & tools** (damage, durability) | `js/data/items.js` |
| **Crafting recipes** (the Crafting Book) | `RECIPES` in `js/craftbook.js` (old grid recipes in `js/data/recipes.js` are used when an item isn't listed there) |
| **Supply crate / furniture loot** | `js/data/loot.js` |
| **The 10 default buildings** | `js/data/buildings.js` (or edit them in the Creative Realm) |
| **Building library / spawning rules** | `js/structures.js` |
| **Store banners (pictures + list of stores)** | `textures/stores/` and `js/data/stores.js` |
| **Creative Realm & Creative menu** | `js/creative.js` |
| **Default key bindings** | `js/keys.js` (players can change them in Options → Controls) |
| **Day length, zombie counts & speed, sea level, building on/off** | `DC.config` at the top of `js/core.js` |
| **World generation** (cities, roads, biomes, caves, ores) | `js/worldgen.js` |
| **Zombie behaviour** | `js/entities.js` |
| **Multiplayer** (max players, send rates) | `js/net.js` |
| **Cars** (speed, fuel, HP, and the box models) | `js/data/vehicles.js`. Add your own with `DC.registerVehicle` |
| **How many abandoned cars spawn** | `carChance` in `DC.config` at the top of `js/core.js` |
| **Doors, wall torches, paint rules** | `js/interact.js` |
| **Falling trees** (apple / stick chances) | `js/trees.js` |
| **Garages, driveways, house roofs** | `js/worldgen.js` (`housePlan`, `garageColumn`, `house7`) |
| **Your empty-hand arm angle** | `js/viewmodel.js` (`ARM`) |
| **Driving / refuel / car breaking** | `js/vehicles.js` |
| **Block damage** (bullets per block, car dents, chip / hole / claw-mark looks) | `js/damage.js` |

A missing texture shows as a purple/black checkerboard, so you can see what still needs painting.
If you add new blocks, add them at the **end** of `blocks.js` so old saves stay correct.

### Editing the zombie in Blockbench
1. Open Blockbench, go to File → Open Model, and pick `models/zombie.geo.json`. Load `textures/entity/zombie.png` as its texture.
2. Change cubes and paint the skin.
3. Export with File → Export → **Export Bedrock Geometry**, overwriting `models/zombie.geo.json`. Save the texture over `zombie.png`.
4. Bones named `head`, `body`, `rightArm`, `leftArm`, `rightLeg` and `leftLeg` animate automatically.

## Making mods
1. Copy `mods/metal_barricade` to `mods/my_mod`.
2. Add `'my_mod'` to the list in `mods/mods.js`.
3. Inside `mod.js`:
```js
DC.registerMod({ name: 'My Mod', version: '1.0', description: 'What it does' });
DC.registerBlock({ name: 'spike_trap', textures: { all: DC.modPath('spikes.png') }, hardness: 2, tool: 'pickaxe', placeable: true });
DC.registerItem({ name: 'canned_beans', desc: 'Heals 2 hearts', use: 'heal', heal: 4, texture: DC.modPath('beans.png') });
DC.registerRecipe({ pattern: ['I I', ' I '], key: { I: 'iron_ingot' }, result: 'spike_trap', needsTable: true });
DC.on('nightStart', day => DC.ui.notify('Night ' + day + ' begins!'));
```
**Events you can hook:** `init`, `worldStart`, `tick`, `nightStart`, `dayStart`, `blockBreak`, `blockPlace`, `blockChanged`, `zombieSpawn`, `zombieAttack`, `zombieBreak`, `zombieKilled`, `playerDeath`, `craft`, `generateChunk` (add your own structures!).

**Console cheats for testing** (press F12 → Console):
- `DC.give('iron_machete')` gives you an item.
- `DC.game.time = 590` skips to just before nightfall.

## v0.13 notes: sliding glass doors, punch, 3D items
- **Sliding glass doors** (2 wide x 2 tall). The 11 11s and gas station shops use them now instead of oak doors.
  Walk up to one (or a zombie does) and the two halves slide apart into the walls; they shut 2 s after nobody's near.
  Craft: 4 glass on top + 2 iron ingots underneath (crafting table). Tweak `DOOR_RANGE`, `DOOR_STAY`, `DOOR_SLIDE` in `js/gates.js`.
  Only new worlds get the new shop buildings.
- Punch: the arm stays anchored at the bottom of the screen and swings from ~110° to ~70°. Tweak `ARM` / `PUNCH_RZ` in `js/viewmodel.js`.
- Items in hand / on the ground are 1 pixel thick with darker edges, like Minecraft.

## v0.12 notes: 11 11s, new gas stations, fenced police, HUD options, your own skin
- **Fixed:** dying while driving no longer respawns you inside the car. You fall out, and respawn at your spawn point / bed.
- **Hunger icons are red apples** now. **Options → Hunger** lets you pick red apples, oranges, watermelon, or a **bar** in any colour you like. **Heart colour** has a colour picker too ("Reset colours" puts them back).
- **Your own skin:** Options → **Upload skin…** takes any Minecraft skin PNG (64×64 or the old 64×32). It's saved on that device, and **Default skin** switches back.
- **Car top speeds:** sedan 50 mph, pickup / police / ambulance 45 mph. Crashing at 40+ mph does at least 3 hearts and 20% of the car.
- **Hitting** now throws a proper Minecraft-style punch (not a small lift of the arm).
- **New buildings** (in worlds you create from now on):
  - **11 11s**: a corner convenience store. Brick, glass front, an orange / green / red striped sign with a big red "11", aisles, drinks fridges, a coffee corner and the counter.
  - **Gas Station** redesigned like a real one: a big canopy on white pillars over 3 islands of our 2-tall pumps. Painted concrete: white walls, then a red stripe, a purple stripe and white on top. Plus a matching shop.
  - **Police Station** now has a **fenced parking lot** out back (wire fence all round) with a **large sliding gate** that opens when you drive up, and a back door.
- **Saved buildings keep paint, facing and gates** now. Anything you paint or set up in the Creative Realm and save with the Building Wand comes out the same in your survival worlds. In `js/data/buildings.js` you can use `b.paint(...)`, `b.fence(...)` and `b.gate(...)`.

## v0.11 notes: wire fences, sliding gates, real pause, build anywhere
- **Pause really pauses** now: time, zombies, cars and everything else freeze while the pause menu is open.
- **Wire Fence:** a full crafting table of iron (9 ingots). It's a chain-link panel 2 wide x 2 tall, thin like a window pane. **Zombies can't break it, climb it or jump it.** Electric fences with generators are coming later. Break any part and the whole piece comes back as 1 fence.
- **Sliding gates:**
  - **Iron Gate** (2 wide x 2 tall) = wire fence + 2 iron ingots. **Large Iron Gate** (4 wide x 2 tall) = 2 iron gates.
  - Drive up to a gate and it **slides open to the left** (left of whoever placed it), sliding over the fence next to it.
  - Place it from the other side and it opens to the right instead.
  - **5 seconds** after you're through it slides shut, **shoving zombies out of the way**. It never closes on you.
  - On foot: right-click it.
  - Settings at the top of `js/gates.js`.
- **Build anywhere:** every block can be placed in survival now (`allowBuilding` in `js/core.js`).
- **Options → Item glow:** turns the red glow around dropped items on or off.

## v0.10 notes: faster cars, car damage & explosions, 2-tall gas pumps
- **Gas pumps** are 1 wide, 2 tall: a red pump with a GAS sign, a screen, a hose and a concrete base. Older worlds' pumps get the top half drawn too.
- **Top speeds:** sedan 85 mph, pickup 75 mph, police car 90 mph, ambulance 70 mph. Change `maxSpeed` in `js/data/vehicles.js` (blocks/second, x 2.237 = mph).
- **Crashing hurts:** hitting something at 60+ mph does at least **3 hearts** to you and **20%** to the car (more the faster you go). 40-60 mph = 1.5 hearts, 10%.
- **Car health (GTA style):** the car HUD shows a health bar (green 90-100%, white 25-90%, red under 25%).
  - At 0 the engine is wrecked: it **smokes** from the hood and drives at half speed.
  - Damage it again (zombies clawing at it, crashes, smashing buildings, **bullets**) and it **catches fire**, then **explodes** about 5 seconds later.
  - The explosion hurts everyone within ~6 blocks, kills nearby zombies, sets other cars off, shatters glass and alerts every zombie around. Get out!
- **Zombies attack your car** instead of you while you're driving.
- **Car HUD:** gas is a percentage (a red **E** when empty). The HUD sits 10px above the hotbar, and the item name is hidden while you drive.
- **Fixed:** a gun no longer fires on its own when you scroll to it. Old clicks are thrown away, and if you're holding the button when you switch, let go first.

## v0.9 notes: beds, sleeping, flowers, dyes, buckets
- **Beds** are now real Minecraft-style beds: 2 blocks long, 1 wide, on little wooden legs, with a white pillow at the head. The pillow end goes away from you when you place one. You can stand on them.
- **Sleep:** right-click a bed at night. The screen fades to black and the night is skipped. A bed takes **5 seconds** to fall asleep, a **sleeping bag 15 seconds**. Sleeping also sets your respawn point.
  - You can't sleep while zombies are hunting you nearby.
  - Getting hurt wakes you up. Press sneak to get up early.
- **Cloth** turns up in supply crates, closets and garages. 6 cloth (2 columns of 3) at a crafting table makes a **sleeping bag**. 3 cloth on 3 planks makes a **bed**. Both can be painted with the roller, which changes the blanket colour.
- **Flowers** grow in patches: rose, sunflower, blue orchid, violet, orange/white/pink tulip and cornflower. Each flower crafts into **2 dye**: red, yellow, light blue, purple, orange, white, pink, blue. Other dyes: cactus = 2 green, coal = black, dirt = brown.
- **Buckets:** 3 iron ingots in a V. Right-click water to fill it. Big water (rivers, lakes, ponds of about 4x4+) flows back into the hole, like Minecraft's infinite water. Right-click the ground with a water bucket to pour it out.
- **Making paint:** water bucket in the middle of a crafting table, 8 dye of one colour around it = a **paint bucket** (32 blocks of paint, 4 per dip). New colours: light blue, orange, pink. An emptied paint bucket gives you the empty bucket back.
- **Roller:** the roller head turns the paint colour when you dip it and fades back to white as the paint runs out. Right-click water with it to wash it clean.
- **Doors:** the handle is now always on the side away from the hinges. The inside is mirrored, so it's on the left from inside.
- New textures come from `tools/make_v09_textures.py`.

## v0.8 notes: stealth, gore, smashing cars, blocks that face you
- **Speed is in mph.** Over **20 mph** your car crashes straight through glass. Near **top speed** it smashes through walls: brick, concrete, siding, drywall, furniture, doors. It never goes through the ground, stone or trees. Smashing slows you down, dents the car and is loud. Tweak `glassSmashMph` / `wallSmashAt` in `js/core.js`.
- **Road lines on east-west roads** now run along the road instead of across it.
- **Blocks face you** like Minecraft: stoves, fridges, TVs, crafting tables and wardrobes turn their front toward you. Logs and hay bales lie on their side when you place them against the side of a block.
- **Stealth:** zombies need a clear line of sight to see you now, even when you're holding a torch. Walls, floors and shut doors hide you. Getting upstairs out of sight really works.
  - Stand behind cover that's **2 blocks high** and **hold Shift (sneak)**. A purple **STEALTH** tag shows next to the hunter counter and their awareness bar drains.
  - Hiding without sneaking drains it much more slowly.
  - Walking near them on the same floor (not sneaking) lets them **hear** you. An amber **THEY HEAR YOU** tag shows.
  - Settings: `hideDrain`, `hearRange` in `js/core.js`.
- **Gore:** zombies bleed red pixel blood when hit. When they die they fall apart: head, arms, legs and body fly off and bounce. Blood **stains** the ground (grass, floors, roads…) under zombies and under you when you get hurt. Stains fade after 10 seconds (`bloodStainTime`).

## v0.7 notes: doors, paint, roofs, garages, falling trees
- **Torches** stick to the wall you click and lean out from it, like Minecraft. On the floor they're a little stick. Break the block holding a torch and the torch drops.
- **Your hand** stands up more (about 100° instead of 60°).
- **Oak doors** (6 planks in 2 columns at a crafting table = 3 doors). Place one in a doorway (2 blocks tall). Right-click to open and shut it. Sneak + right-click places blocks against it instead. **Zombies know how to open doors.** They fiddle with the handle for a second, then walk in. They can't see you through a shut door, though.
- **Paint:** find **Paint Buckets** (red, blue, green, yellow, white, black, brown, purple) in garages and supply crates. Make a **Paint Roller** from 2 wheat on top of a stick. Place a bucket, right-click it with the roller to dip it (each dip uses 1/8 of the bucket), then right-click siding, concrete, brick, drywall, doors, stairs or wooden furniture to paint it. One dip paints 16 blocks. Hold right-click to keep rolling. Break a bucket to pick it back up with its paint.
- **Oak Stairs** (6 planks in a staircase shape = 4) and **Asphalt Shingles** (coal + cobblestone = 4 black roofing stairs). Like Minecraft, stairs go up away from you.
- **Houses** in new worlds have black asphalt-shingle stair roofs and real doors. **Half of them have a garage with a concrete driveway.** Garages often have a supply crate and a paint bucket in the back.
- **Cars are 10x rarer** on the roads.
- **Car HUD:** one gas gauge with its percentage. The four little bars next to it are your tires. They turn amber when a tire is worn and red when it's flat or missing.
- **Crafting Totem:** 8 planks in a ring with cobblestone in the middle, at a crafting table. While it's in your inventory, pressing E gives you a 3x3 crafting grid anywhere.
- **Falling trees:** chop a log and everything above it (logs + leaves) tips over away from you and crashes down. You get all the logs, plus sticks and sometimes apples. The log below the cut stays as a stump.
- Old worlds keep their old towns. New houses, garages and roofs show up in worlds you create with v0.7. Every world gets the new blocks, doors, paint and falling trees.
- New textures come from `tools/make_v07_textures.py`, or you can paint over the PNGs.

## v0.6 notes: Creative Realm, your own buildings, controls, tires
### Designing building interiors (houses, hospitals, stores…)
1. **Singleplayer → Create New → Game Mode: Creative Realm.** It's a flat world: always day, no zombies, no damage, unlimited blocks. **Double-tap Jump** to fly (Jump = up, Sneak = down).
2. Press **E** (or **BAG** on iPhone) for the **Creative menu**: Blocks, **Furniture** (beds, couches, kitchen counters, stoves, fridges, TVs, desks, shelves, cash registers, medical cabinets, wallpaper, carpet…), Items, Food, Vehicles, Buildings and Props. Tap an item to put it in the highlighted hotbar slot.
3. Build your house. Include the floor. Put **supply crates**, fridges, wardrobes, store shelves and medical cabinets inside: players can break those for loot.
4. Take the **Building Wand** (first hotbar slot). **Left-click** one bottom corner (the floor), **right-click** the opposite top corner (the roof). A purple box shows the selection.
5. Press **B** (or **SAVE** on iPhone). Name it, pick the **type** (decides where it spawns), the side with the **front door** (it guesses from where you're standing) and **how often it spawns**. Save.
6. **Create a new survival world.** Your building now spawns there:
   - **House**: town plots, front door turned toward the road (max 22×22)
   - **Store / Apartment / Office**: city blocks (max 22×22)
   - **Hospital**: replaces the hospital you wake up in (any size, you spawn in the middle of the ground floor)
   - **Gas Station**: cities + towns · **Barn / Farm**: farms · **Prop**: never spawns by itself, only from the Creative menu
   Worlds copy the library when they're created, so old worlds never change under you.
7. **Creative menu → Buildings**: **Spawn** any building, **Edit** it (it spawns with the selection already set, change it, press B → *Save changes*), **Export / Import** (.json, to share between PC and iPhone, or with friends), **Delete**, and **Restore defaults**.
   10 default buildings come with the game: Small House, Two-Story House, Farmhouse, Corner Store, Pharmacy, Diner, Police Station, Apartment Block, Hospital and Gas Station. Their code is in `js/data/buildings.js`.

### Controls
**Options → Controls**: click any action, press the key or mouse button you want. Saved on that device. *Reset to defaults* undoes everything.

### Cars
- The old block cars on the highways are gone. Only real drivable cars spawn now.
- Cars crash into each other (they bounce, dent, and can wreck), and they hit you if you stand in the road.
- **Scrapping:** hit a car with a **pickaxe** (other tools just rock it). It wobbles and falls apart into **iron bars + its tires**.
- **Tires:** every car spawns with worn tires (50–70% life). They wear down as you drive and can **go flat or blow out** (more likely when old and when you're going fast). A flat makes the car slow and pull to one side. A missing tire means it barely moves. The car HUD shows each tire.
  - **Sneak + right-click** a wheel on another car to take its tire off.
  - **Right-click** your car with a **Tire** to put it on (it goes on the wheel you're looking at, or the worst one). You keep the old one if it still has life.

### iPhone
- Tapping hotbar slots works again (the touch controls were covering the hotbar).
- The inventory is a bit smaller so it fits better.

## v0.2 notes
- **Hunger:** the bar is on the right above the hotbar. Sprinting and jumping make you hungry faster. You only heal when hunger is 7 drumsticks or more, and you can't sprint at 3 or less. Hold right click to eat. Wheat makes bread (3 in a row); supply crates have cans, chips and chocolate.
- **Items drop on the floor:** they glow red and float. Walk over them to pick them up.
- **Zombies:**
  - Once a zombie starts hunting you, it keeps coming. If **none** of them can see you for 10 seconds (the white bar under the zombie counter), they lose track of you. Change it with `loseTrackTime` in `js/core.js`.
  - Zombies push each other apart, so they swarm around you instead of merging into one.
  - Hunters growl, and every zombie within 10 blocks of a growl joins the hunt.
  - Gunshots alert every zombie within 48–64 blocks.
  - Hunting zombies break blocks day and night. In daylight they break them more slowly.
- **Guns:** infinite ammo for testing. Pistol = iron ingots in a sideways L (`III` / `I..`); rifle = `III` / `PPI` (P = planks). Both need a crafting table. Headshots do double damage.

## v0.5 notes: shaders, iPhone, cartoon grass
- **Shaders (Options → Shaders):**
  - Warm sunlight with cool blue shadows on the sides of blocks.
  - Grass, wheat and leaves sway in the wind, and water ripples with sun glints.
  - Gradient sky with sunsets, a sun halo, stars and blocky clouds.
  - Fog that glows toward the sun, plus film-style colour grading and a vignette.
  - Turn shaders **OFF (fast)** on older phones. **Resolution** lowers the pixel count; the game also lowers it automatically if the frame rate drops.
- **Cartoon grass:** grass, dirt, leaves and tall grass are repainted in a bolder, Minecraft Dungeons-like style. Regenerate them with `tools/make_cartoon.py`, or just paint over the PNGs.
- **Shader code** lives in `js/render.js`, which explains each effect.

## v0.4 notes
- **You wake up in a hospital.** Ambulances and a cop car are parked out front.
- **Buildings** have staircases (walk straight up them), a corridor and separate rooms. Light now comes in through windows and doors, so rooms near windows are lit and deep inside is darker.
- **Cars:**
  - There are four kinds: sedans, pickups, abandoned police cars and ambulances. They sit on roads with a little fuel left.
  - Stop next to a **gas pump** (gas stations are in cities and towns) to refuel for free, or use a **Gas Can**.
  - Cars climb 1-block bumps, run zombies over, and their engines attract nearby zombies.
  - Hit a car with anything and it wobbles. Keep going and it breaks into **20 iron ingots**.

## Survival tips
- Punch trees to get logs. Make planks, then a crafting table, then wooden tools.
- Mine down for cobblestone, coal and iron. You need a stone pickaxe or better for iron.
- Forge iron at a crafting table: raw iron + coal makes an iron ingot.
- Coal + stick makes 4 torches. A torch in your hand lights the way, but at night it tells every zombie where you are.
- Break supply crates inside buildings for loot.
- Before dark, get inside and board up doors and windows with planks. Ladders take you up through apartments and offices to the roof.
