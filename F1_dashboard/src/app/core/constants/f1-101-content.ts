/**
 * F1 101 — beginner's glossary content for the Pit Briefing page.
 * Facts verified for the 2026 season (2026-specific entries carry `is2026`).
 * Every entry ships in English (`en`) and Hinglish (`hi`).
 */

export interface F1101Category {
  id: string;
  label: string;
  color: string;
}

export interface F1101Entry {
  id: string;
  category: string;
  title: string;
  en: string;
  hi: string;
  is2026?: boolean;
}

/** One stage of the Rookie→World Champion learning path. Order of entryIds = teaching order. */
export interface F1101Tier {
  level: number;
  ladder: string;
  title: string;
  subtitle: string;
  entryIds: string[];
}

export const F1_101_TIERS: F1101Tier[] = [
  {
    level: 1, ladder: 'Karting', title: 'Race Day Ready',
    subtitle: 'The bare minimum to watch your first race and know what\'s going on.',
    entryIds: ['practice', 'qualifying', 'pole', 'formation-lap', 'standing-start', 'race-points', 'pit-stop', 'chequered-flag', 'podium']
  },
  {
    level: 2, ladder: 'Formula 3', title: 'Understanding the Broadcast',
    subtitle: 'Decode what you see and hear on TV — timing screens, radio calls, flags.',
    entryIds: ['gap-interval', 'sectors', 'box-box', 'green-flag', 'yellow-flag', 'blue-flag', 'white-flag', 'dnf', 'fastest-lap', 'two-championships']
  },
  {
    level: 3, ladder: 'Formula 2', title: 'Safety & Chaos',
    subtitle: 'Crashes, safety cars and red flags — the moments that flip races upside down.',
    entryIds: ['safety-car', 'vsc', 'red-flag', 'restart', 'race-control', 'black-flag', 'black-orange']
  },
  {
    level: 4, ladder: 'F1 Rookie', title: 'Strategy Brain',
    subtitle: 'Tyres and pit timing — why races are won in the garage, not just on track.',
    entryIds: ['compounds', 'wets', 'two-compound-rule', 'degradation', 'graining', 'pit-speed', 'undercut', 'overcut', 'parc-ferme', 'sprint']
  },
  {
    level: 5, ladder: 'F1 Driver', title: 'Racecraft & Rules',
    subtitle: 'How drivers actually race each other — and what happens when they cross the line.',
    entryIds: ['racing-line', 'track-limits', 'kerbs', 'chicane', 'backmarker', 'time-penalty', 'drive-through', 'stop-go', 'grid-penalty', 'penalty-points', 'rule-107', 'team-orders', 'numbers', 'sprint-points']
  },
  {
    level: 6, ladder: 'Race Winner', title: 'The Tech',
    subtitle: 'Aero and physics — the invisible forces that decide who\'s fast.',
    entryIds: ['downforce', 'dirty-air', 'slipstream', 'ground-effect', 'understeer', 'porpoising']
  },
  {
    level: 7, ladder: 'World Champion', title: '2026 Masterclass',
    subtitle: 'This season\'s brand-new rules — finish this and you know more than most old fans.',
    entryIds: ['overtake-mode', 'boost-mode', 'active-aero', 'new-pu', 'sustainable-fuel', 'smaller-cars', 'cost-cap', 'cadillac']
  }
];

export const F1_101_CATEGORIES: F1101Category[] = [
  { id: 'weekend', label: 'Race Weekend', color: '#ff6b5a' },
  { id: 'scoring', label: 'Scoring', color: '#ffb700' },
  { id: 'flags', label: 'Flags', color: '#4ade80' },
  { id: 'safety', label: 'Safety & Control', color: '#fb923c' },
  { id: 'tyres', label: 'Tyres', color: '#f472b6' },
  { id: 'pits', label: 'Pit Stops & Strategy', color: '#38bdf8' },
  { id: 'aero', label: 'Aero & Tech', color: '#a78bfa' },
  { id: 'track', label: 'Track & Racing', color: '#2dd4bf' },
  { id: 'penalties', label: 'Penalties', color: '#ef4444' },
  { id: 'rules2026', label: '2026 Rules', color: '#60a5fa' },
  { id: 'misc', label: 'Jargon & Misc', color: '#9ca3af' }
];

export const F1_101_ENTRIES: F1101Entry[] = [

  // ==================== RACE WEEKEND ====================
  {
    id: 'practice', category: 'weekend', title: 'Practice (FP1–FP3)',
    en: 'Three free practice sessions before qualifying. Teams test setups, tyres and fuel loads — the times don\'t count for anything.',
    hi: 'Qualifying se pehle 3 practice sessions hote hain. Teams setup, tyres aur fuel test karti hain — in sessions ke times kisi cheez me count nahi hote.'
  },
  {
    id: 'qualifying', category: 'weekend', title: 'Qualifying (Q1 → Q2 → Q3)',
    en: 'A knockout that sets the starting grid. Q1: all cars run, slowest 5 are out. Q2: same again. Q3: the top 10 fight for pole.',
    hi: 'Knockout format jo race ki starting grid decide karta hai. Q1 me sab cars, sabse slow 5 bahar. Q2 me phir wahi. Q3 me top 10 pole ke liye ladte hain.'
  },
  {
    id: 'pole', category: 'weekend', title: 'Pole Position',
    en: 'The fastest qualifier starts the race from the very front of the grid — statistically the best place to win from.',
    hi: 'Qualifying me sabse fast driver race me sabse aage se start karta hai. Jeetne ke liye statistically best jagah yahi hai.'
  },
  {
    id: 'sprint', category: 'weekend', title: 'Sprint Weekend',
    en: '6 weekends in 2026 add a short 100km Saturday race with its own Friday qualifying (SQ1/SQ2/SQ3). Top 8 score 8-7-6-5-4-3-2-1 points.',
    hi: '2026 me 6 weekends pe ek chhoti 100km Saturday race hoti hai, uski apni Friday qualifying ke sath. Top 8 ko 8-7-6-5-4-3-2-1 points milte hain.',
    is2026: true
  },
  {
    id: 'formation-lap', category: 'weekend', title: 'Formation Lap',
    en: 'One slow lap before the start where drivers warm up tyres and brakes, then line up on the grid for the standing start.',
    hi: 'Race start se pehle ek slow lap — drivers tyres aur brakes garam karte hain, phir grid pe apni jagah khade ho jaate hain.'
  },
  {
    id: 'standing-start', category: 'weekend', title: 'Standing Start',
    en: 'F1 races start from a standstill: five red lights come on one by one, and when they all go out — lights out and away we go.',
    hi: 'F1 race rukke se start hoti hai: paanch red lights ek-ek karke jalti hain, aur jab sab bujh jaati hain — lights out, race shuru!'
  },
  {
    id: 'parc-ferme', category: 'weekend', title: 'Parc Fermé',
    en: 'After qualifying, car setups are locked. Big changes mean starting from the pit lane — so teams must commit before quali.',
    hi: 'Qualifying ke baad car ka setup lock ho jaata hai. Bade changes kiye toh pit lane se start karna padta hai — isliye teams ko pehle hi decide karna hota hai.'
  },

  // ==================== SCORING ====================
  {
    id: 'race-points', category: 'scoring', title: 'Race Points',
    en: 'The top 10 finishers score 25-18-15-12-10-8-6-4-2-1. Win consistently and the title follows.',
    hi: 'Top 10 finishers ko 25-18-15-12-10-8-6-4-2-1 points milte hain. Jo consistently jeeta, championship usi ki.'
  },
  {
    id: 'fastest-lap', category: 'scoring', title: 'Fastest Lap Point',
    en: 'One bonus point for the race\'s fastest lap — but only if that driver finishes in the top 10.',
    hi: 'Race ka sabse fast lap lagane pe 1 bonus point — par sirf tab jab woh driver top 10 me finish kare.'
  },
  {
    id: 'two-championships', category: 'scoring', title: 'Two Championships',
    en: 'Every race feeds two title fights: the Drivers\' Championship (individual) and the Constructors\' (both cars of a team combined — this decides prize money).',
    hi: 'Har race do championships me count hoti hai: Drivers\' (individual) aur Constructors\' (team ki dono cars ke points milake — prize money isi se decide hoti hai).'
  },
  {
    id: 'sprint-points', category: 'scoring', title: 'Sprint Points',
    en: 'Sprint races pay less than a Grand Prix: the top 8 get 8-7-6-5-4-3-2-1. No fastest-lap bonus here.',
    hi: 'Sprint race me GP se kam points milte hain: top 8 ko 8-7-6-5-4-3-2-1. Yahan fastest-lap bonus nahi hota.'
  },

  // ==================== FLAGS ====================
  {
    id: 'green-flag', category: 'flags', title: 'Green Flag',
    en: 'All clear — racing at full speed is allowed. Shown after a hazard has been cleared.',
    hi: 'Sab clear — full speed racing allowed hai. Koi hazard hatne ke baad dikhaya jaata hai.'
  },
  {
    id: 'yellow-flag', category: 'flags', title: 'Yellow / Double Yellow',
    en: 'Danger ahead: slow down, no overtaking in that zone. Double yellow means be ready to stop completely.',
    hi: 'Aage danger hai: slow karo, us zone me overtaking mana hai. Double yellow ka matlab — poori tarah rukne ke liye ready raho.'
  },
  {
    id: 'blue-flag', category: 'flags', title: 'Blue Flag',
    en: 'Shown to a car about to be lapped: move aside and let the faster leader through, or get a penalty.',
    hi: 'Us car ko dikhate hain jo lap hone waali hai: side do aur leader ko jaane do, warna penalty milegi.'
  },
  {
    id: 'white-flag', category: 'flags', title: 'White Flag',
    en: 'A slow-moving car is ahead — maybe a car with damage or one entering the pits. Be careful.',
    hi: 'Aage koi slow car hai — shayad damaged car ya pits me jaati hui. Dhyan se.'
  },
  {
    id: 'red-flag', category: 'flags', title: 'Red Flag',
    en: 'Session stopped entirely — usually a big crash or dangerous conditions. Cars return to the pits and wait.',
    hi: 'Session poora rok diya gaya — usually bada crash ya dangerous conditions. Cars pits me aakar wait karti hain.'
  },
  {
    id: 'black-flag', category: 'flags', title: 'Black Flag',
    en: 'The harshest flag: disqualification. That driver must return to the pits and retire from the race.',
    hi: 'Sabse sakht flag: disqualification. Us driver ko pits me aakar race chhodni padti hai.'
  },
  {
    id: 'black-orange', category: 'flags', title: 'Black & Orange Flag',
    en: 'Your car has a dangerous mechanical problem — pit immediately and get it fixed before continuing.',
    hi: 'Car me koi dangerous mechanical problem hai — turant pit karo aur theek karwa ke hi wapas aao.'
  },
  {
    id: 'chequered-flag', category: 'flags', title: 'Chequered Flag',
    en: 'The finish. Waved at the winner first, then every car that follows. The most famous flag in motorsport.',
    hi: 'Race khatam. Pehle winner ko dikhaya jaata hai, phir baaki sab ko. Motorsport ka sabse famous flag.'
  },

  // ==================== SAFETY & RACE CONTROL ====================
  {
    id: 'safety-car', category: 'safety', title: 'Safety Car',
    en: 'After a crash, a real car leads the field slowly — no overtaking, everyone queues behind it. Gaps vanish, races restart tight.',
    hi: 'Crash ke baad ek real car sabko slowly lead karti hai — overtaking mana, sab uske peeche line me. Gaps khatam ho jaate hain, race phir se tight ho jaati hai.'
  },
  {
    id: 'vsc', category: 'safety', title: 'Virtual Safety Car (VSC)',
    en: 'A lighter version: no physical car, but every driver must stay above a minimum lap time. Gaps stay roughly the same.',
    hi: 'Halka version: koi physical car nahi, par har driver ko ek minimum lap time se upar rehna hota hai. Gaps almost same rehte hain.'
  },
  {
    id: 'race-control', category: 'safety', title: 'Race Director & Stewards',
    en: 'The FIA officials running the show. The Race Director controls the session; the Stewards judge incidents and hand out penalties.',
    hi: 'FIA ke officials jo sab control karte hain. Race Director session chalata hai; Stewards incidents judge karke penalties dete hain.'
  },
  {
    id: 'restart', category: 'safety', title: 'Restarts',
    en: 'When the Safety Car pulls in, the leader controls the pace until the line — then racing resumes. Red-flag restarts can even be full standing starts.',
    hi: 'Safety Car hatne pe leader pace control karta hai line tak — phir racing shuru. Red flag ke baad kabhi-kabhi poora standing start bhi hota hai.'
  },

  // ==================== TYRES ====================
  {
    id: 'compounds', category: 'tyres', title: 'Slick Compounds (C1–C5)',
    en: 'Pirelli brings 3 of its 5 compounds per weekend, labeled Soft (red, fastest but wears fast), Medium (yellow) and Hard (white, slow but lasts).',
    hi: 'Pirelli har weekend apne 5 me se 3 compounds laati hai: Soft (red — fastest par jaldi ghisti hai), Medium (yellow), Hard (white — slow par lambi chalti hai).',
    is2026: true
  },
  {
    id: 'wets', category: 'tyres', title: 'Intermediates & Full Wets',
    en: 'Rain tyres with grooves: green-marked Intermediates for a damp track, blue Full Wets for heavy rain.',
    hi: 'Baarish ke tyres grooves ke sath: halki geeli track ke liye green Intermediates, tez baarish ke liye blue Full Wets.'
  },
  {
    id: 'two-compound-rule', category: 'tyres', title: 'Two-Compound Rule',
    en: 'In a dry race, every driver must use at least two different slick compounds — which forces at least one pit stop.',
    hi: 'Dry race me har driver ko kam se kam 2 alag compounds use karne hote hain — isliye ek pit stop toh karna hi padta hai.'
  },
  {
    id: 'degradation', category: 'tyres', title: 'Degradation',
    en: 'Tyres get slower as they wear — "deg" decides when to pit. Manage it well and you can run longer on faster rubber.',
    hi: 'Tyres jaise-jaise ghiste hain, slow hote jaate hain — isi "deg" se pit stop ka time decide hota hai. Acche se manage karo toh zyada der fast reh sakte ho.'
  },
  {
    id: 'graining', category: 'tyres', title: 'Graining & Blistering',
    en: 'Two ways tyres go bad: graining (rubber tears and balls up on the surface) and blistering (overheated rubber bubbles from inside).',
    hi: 'Tyre kharab hone ke do tareeke: graining (rubber phat ke surface pe jam jaata hai) aur blistering (andar se overheat hoke bubble banta hai).'
  },

  // ==================== PIT STOPS & STRATEGY ====================
  {
    id: 'pit-stop', category: 'pits', title: 'Pit Stop',
    en: 'Around 20 crew members change all 4 tyres in about 2-3 seconds. Refuelling is banned — it\'s tyres and quick fixes only.',
    hi: 'Kareeb 20 log milke 2-3 second me chaaron tyres badal dete hain. Refuelling banned hai — sirf tyres aur chhote fixes.'
  },
  {
    id: 'box-box', category: 'pits', title: '"Box, Box!"',
    en: 'Radio code for "come into the pits NOW". You\'ll hear it constantly during broadcasts — from the German word "Boxenstopp".',
    hi: 'Radio pe iska matlab hai "abhi pits me aao". Broadcast me baar-baar sunoge — German word "Boxenstopp" se aaya hai.'
  },
  {
    id: 'pit-speed', category: 'pits', title: 'Pit-Lane Speed Limit',
    en: 'The pit lane has a strict speed limit (usually 80 km/h). Speeding there is an instant penalty.',
    hi: 'Pit lane me strict speed limit hoti hai (usually 80 km/h). Wahan speed ki toh turant penalty.'
  },
  {
    id: 'undercut', category: 'pits', title: 'Undercut',
    en: 'Pit BEFORE your rival: on fresh tyres you lap faster while they stay out on worn ones — and you jump ahead when they finally stop.',
    hi: 'Rival se PEHLE pit karo: fresh tyres pe tum fast lap karte ho jabki woh purane tyres pe hai — jab woh pit karega, tum aage nikal chuke hoge.'
  },
  {
    id: 'overcut', category: 'pits', title: 'Overcut',
    en: 'The reverse: stay out LONGER than your rival, push hard in clean air, and come out ahead after your own stop.',
    hi: 'Iska ulta: rival se ZYADA der bahar raho, clean air me push karo, aur apne stop ke baad usse aage niklo.'
  },

  // ==================== AERO & TECH ====================
  {
    id: 'downforce', category: 'aero', title: 'Downforce',
    en: 'The wings push the car DOWN into the track, letting it corner at speeds that would launch a normal car off the road.',
    hi: 'Wings car ko NEECHE track me dabate hain, jisse woh aisi speed pe corner le sakti hai jahan normal car udd jaati.'
  },
  {
    id: 'dirty-air', category: 'aero', title: 'Dirty Air',
    en: 'The turbulent air behind a car ruins the following car\'s downforce — the main reason close following and overtaking is hard.',
    hi: 'Aage waali car ke peeche ki kharab hawa peeche waali car ka downforce bigaad deti hai — isi wajah se paas jaake overtake karna mushkil hai.'
  },
  {
    id: 'slipstream', category: 'aero', title: 'Slipstream / Tow',
    en: 'On straights the opposite happens: tucking behind a car means less air resistance, giving you a speed boost to attack.',
    hi: 'Straights pe ulta hota hai: aage waali car ke theek peeche rehne se air resistance kam milta hai, aur attack karne ke liye speed boost mil jaata hai.'
  },
  {
    id: 'ground-effect', category: 'aero', title: 'Ground Effect',
    en: 'The car\'s floor is shaped to suck it toward the track using airflow underneath — downforce without the dirty-air penalty of big wings.',
    hi: 'Car ka floor aisa shape kiya hota hai ki neeche ki hawa use track ki taraf kheenchti hai — bade wings ke bina hi downforce mil jaata hai.'
  },
  {
    id: 'understeer', category: 'aero', title: 'Understeer & Oversteer',
    en: 'Understeer: the front slides and the car won\'t turn enough. Oversteer: the rear slides and the car turns too much (spins come from here).',
    hi: 'Understeer: front slide karta hai, car poora turn nahi hoti. Oversteer: rear slide karta hai, car zyada ghoom jaati hai (spin isi se hota hai).'
  },
  {
    id: 'porpoising', category: 'aero', title: 'Porpoising',
    en: 'A ground-effect side effect where the car bounces violently on straights as the floor stalls and grips repeatedly.',
    hi: 'Ground effect ka side effect — car straights pe zor-zor se uchhalti hai kyunki floor ka suction baar-baar toot-ta aur banta hai.'
  },

  // ==================== TRACK & RACING ====================
  {
    id: 'racing-line', category: 'track', title: 'Racing Line & Apex',
    en: 'The fastest path through a corner: enter wide, clip the inside point (the apex), exit wide. Every driver fights for this line.',
    hi: 'Corner ka sabse fast raasta: bahar se enter karo, andar ka point (apex) chhu ke, bahar exit karo. Har driver isi line ke liye ladta hai.'
  },
  {
    id: 'track-limits', category: 'track', title: 'Track Limits',
    en: 'The white lines are the track. Put all four wheels beyond them and your lap time gets deleted — or worse, a penalty.',
    hi: 'White lines hi track hai. Chaaron wheels usse bahar gaye toh lap time cancel — ya phir penalty bhi mil sakti hai.'
  },
  {
    id: 'kerbs', category: 'track', title: 'Kerbs',
    en: 'The striped bumps at corner edges. Riding them can straighten a corner and gain time — attack too hard and they unsettle the car.',
    hi: 'Corners ke kinaare waali striped bumps. Inpe chadhke corner seedha karke time bachta hai — par zyada aggression me car unstable ho jaati hai.'
  },
  {
    id: 'chicane', category: 'track', title: 'Chicane',
    en: 'A quick left-right (or right-left) flick added to slow cars down — usually before what used to be a dangerously fast section.',
    hi: 'Ek jaldi left-right (ya right-left) combo jo cars ko slow karne ke liye banaya jaata hai — usually kisi dangerous fast section se pehle.'
  },
  {
    id: 'backmarker', category: 'track', title: 'Backmarker',
    en: 'A car near the back that leaders catch up to and lap. Blue flags tell them to move aside.',
    hi: 'Peeche chal rahi car jise leaders pakad ke lap kar dete hain. Blue flag unhe side hone ko kehta hai.'
  },

  // ==================== PENALTIES ====================
  {
    id: 'time-penalty', category: 'penalties', title: 'Time Penalty (5s / 10s)',
    en: 'The most common punishment: 5 or 10 seconds added to your race time, or served waiting in your pit box before tyres are touched.',
    hi: 'Sabse common punishment: race time me 5 ya 10 second jud jaate hain, ya pit stop pe tyres chhoone se pehle utna wait karna padta hai.'
  },
  {
    id: 'drive-through', category: 'penalties', title: 'Drive-Through Penalty',
    en: 'Drive through the entire pit lane at the speed limit without stopping — costs around 20 seconds.',
    hi: 'Poori pit lane se speed limit pe guzarna padta hai bina ruke — kareeb 20 second ka loss.'
  },
  {
    id: 'stop-go', category: 'penalties', title: 'Stop-Go Penalty',
    en: 'Harsher: stop in your pit box for 10 seconds doing nothing — no tyres, no fixes — then rejoin.',
    hi: 'Zyada sakht: pit box me 10 second khade raho kuch kiye bina — na tyres, na repair — phir wapas jao.'
  },
  {
    id: 'grid-penalty', category: 'penalties', title: 'Grid Penalty',
    en: 'Start further back at the NEXT race — commonly given for using too many engine parts or causing a big crash.',
    hi: 'AGLI race me peeche se start karna padta hai — usually zyada engine parts use karne ya bada crash karne pe milti hai.'
  },
  {
    id: 'penalty-points', category: 'penalties', title: 'Penalty Points & Race Ban',
    en: 'Bad behaviour adds points to a driver\'s licence. Hit 12 points within 12 months and it\'s an automatic one-race ban.',
    hi: 'Galat harkaton pe licence me points judte hain. 12 mahine me 12 points hue toh ek race ka automatic ban.'
  },
  {
    id: 'rule-107', category: 'penalties', title: 'The 107% Rule',
    en: 'Too slow to race: if your best Q1 lap is more than 107% of the fastest time, you don\'t qualify to start (unless stewards make an exception).',
    hi: 'Bahut slow toh race nahi: agar Q1 ka best lap fastest time ke 107% se zyada hai, toh race start karne ki permission nahi milti (stewards exception de sakte hain).'
  },

  // ==================== 2026 RULES ====================
  {
    id: 'overtake-mode', category: 'rules2026', title: 'Overtake Mode (DRS is gone)',
    en: 'DRS is retired. Get within 1 second of the car ahead and you unlock extra electric power — usable ANYWHERE on the lap, not just fixed zones.',
    hi: 'DRS retire ho gaya. Aage waali car ke 1 second ke andar aao aur extra electric power milti hai — lap me KAHIN BHI use kar sakte ho, fixed zones nahi.',
    is2026: true
  },
  {
    id: 'boost-mode', category: 'rules2026', title: 'Boost Mode',
    en: 'A separate push-to-pass style burst of electric power that doesn\'t need you to be close to anyone — pure attacking tool.',
    hi: 'Ek alag push-to-pass jaisi electric power burst — iske liye kisi ke paas hone ki zaroorat nahi. Pure attack ka hathiyaar.',
    is2026: true
  },
  {
    id: 'active-aero', category: 'rules2026', title: 'Active Aero (X & Z modes)',
    en: 'The wings now physically move: Z-mode (high downforce) for corners, X-mode (low drag) for straights — available to everyone at set points.',
    hi: 'Wings ab actually hilte hain: corners ke liye Z-mode (zyada downforce), straights ke liye X-mode (kam drag) — sab drivers fixed points pe use kar sakte hain.',
    is2026: true
  },
  {
    id: 'new-pu', category: 'rules2026', title: 'New Power Units (50/50)',
    en: 'Still a 1.6L turbo V6, but electric power nearly triples for a ~50/50 petrol-electric split. Audi and Honda join as engine makers; Ford partners Red Bull.',
    hi: 'Engine wahi 1.6L turbo V6, par electric power almost 3x — ab ~50/50 petrol-electric split hai. Audi aur Honda engine banane aa gaye; Ford Red Bull ke sath hai.',
    is2026: true
  },
  {
    id: 'sustainable-fuel', category: 'rules2026', title: '100% Sustainable Fuel',
    en: 'From 2026 the fuel is fully sustainable — carbon captured from waste or the atmosphere, no new fossil carbon.',
    hi: '2026 se fuel poora sustainable hai — carbon waste ya atmosphere se aata hai, naya fossil carbon bilkul nahi.',
    is2026: true
  },
  {
    id: 'smaller-cars', category: 'rules2026', title: 'Smaller, Lighter Cars',
    en: 'Cars are 20cm shorter, 10cm narrower and ~30kg lighter than before — built to be more agile and race closer.',
    hi: 'Cars pehle se 20cm chhoti, 10cm patli aur ~30kg halki hain — zyada agile aur close racing ke liye banayi gayi hain.',
    is2026: true
  },
  {
    id: 'cost-cap', category: 'rules2026', title: 'Cost Cap ($215m)',
    en: 'Teams can spend at most $215 million a year (plus a separate engine cap) — so the richest team can\'t simply outspend everyone.',
    hi: 'Teams saal me max $215 million kharch kar sakti hain (engine ka alag cap hai) — taaki sabse ameer team sirf paise se na jeet jaaye.',
    is2026: true
  },
  {
    id: 'cadillac', category: 'rules2026', title: '11 Teams — Cadillac Joins',
    en: 'The grid grows to 22 cars: GM-backed Cadillac becomes the 11th team, running Ferrari engines, with Bottas and Pérez driving.',
    hi: 'Grid ab 22 cars ki hai: GM ki Cadillac 11th team ban gayi, Ferrari engines ke sath — drivers hain Bottas aur Pérez.',
    is2026: true
  },

  // ==================== JARGON & MISC ====================
  {
    id: 'gap-interval', category: 'misc', title: 'Gap vs Interval',
    en: 'On timing screens: Gap = your distance (in seconds) to the LEADER. Interval = your distance to the car directly ahead of you.',
    hi: 'Timing screen pe: Gap = LEADER se kitne second peeche ho. Interval = apne se theek aage waali car se kitne peeche ho.'
  },
  {
    id: 'sectors', category: 'misc', title: 'Sectors & Delta',
    en: 'Every lap is split into 3 sectors (S1/S2/S3). Delta means the time difference vs a reference lap — green delta is faster, purple is fastest of all.',
    hi: 'Har lap 3 sectors me split hoti hai (S1/S2/S3). Delta matlab kisi reference lap se time ka difference — green matlab faster, purple matlab sabse fast.'
  },
  {
    id: 'dnf', category: 'misc', title: 'DNF / DNS / DSQ',
    en: 'DNF: Did Not Finish (crash or breakdown). DNS: Did Not Start. DSQ: Disqualified — result wiped for breaking the rules.',
    hi: 'DNF: race poori nahi ki (crash ya breakdown). DNS: start hi nahi ki. DSQ: disqualify — rules todne pe result cancel.'
  },
  {
    id: 'podium', category: 'misc', title: 'Podium',
    en: 'The top-3 ceremony: trophies, national anthems and champagne. "Getting a podium" = finishing in the top 3.',
    hi: 'Top-3 ki ceremony: trophies, national anthem aur champagne. "Podium mila" matlab top 3 me finish kiya.'
  },
  {
    id: 'numbers', category: 'misc', title: 'Permanent Numbers',
    en: 'Every driver picks one career number and keeps it forever. Number 1 is reserved — only the reigning champion may run it.',
    hi: 'Har driver ek career number chunta hai jo hamesha uska rehta hai. Number 1 reserved hai — sirf current champion use kar sakta hai.'
  },
  {
    id: 'team-orders', category: 'misc', title: 'Team Orders',
    en: 'A team telling its drivers to swap positions or hold station — legal, strategic, and always controversial with fans.',
    hi: 'Team apne drivers ko position swap karne ya wahin rukne ka order deti hai — legal hai, strategic hai, aur fans me hamesha controversy karati hai.'
  }
];
