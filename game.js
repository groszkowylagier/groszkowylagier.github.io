// ============================================================================
// JERCEWO 3D – „INNY ŚWIAT” (KARGOPOŁŁAG wg G. Herlinga-Gruzińskiego)
// 1h = 1 min w realu, Szpital dr. Zabielskiego 12h, Karty Budynków Clash Royale
// ============================================================================

const FACTIONS = {
  POLITICAL: {
    id: 'POLITICAL',
    name: 'Polityczni („Biełoruczki” • Art. 58)',
    short: 'Polityczny',
    color: 0x3b6ea5,
    hatColor: 0x25384d,
    workMult: 1.25,
    speedMult: 1.0,
    coldResist: 0.95,
    crimeRate: 0.04,
    aggr: 0.04,
    maxHp: 100,
    desc: 'Polacy, inteligencja, inżynierowie i więźniowie sumienia z Jercewa (jak G. Herling-Gruziński, Kostylew, Karinen). Wydajni (+25% pracy), prześladowani przez Urków.'
  },
  BYTOVIK: {
    id: 'BYTOVIK',
    name: 'Bytowicy (Pospolici • Tragarze)',
    short: 'Bytowik',
    color: 0x6e6252,
    hatColor: 0x453d33,
    workMult: 1.0,
    speedMult: 1.05,
    coldResist: 1.05,
    crimeRate: 0.12,
    aggr: 0.1,
    maxHp: 100,
    desc: 'Chłopi, kołchoźnicy i tragarze (jak brygadzista Kowal czy Pamfiłow). Trzon brygad roboczych w Jercewie – odporni na mróz, czasem kradną mąkę lub chleb z głodu.'
  },
  URKA: {
    id: 'URKA',
    name: 'Urkowie („Błatni” • Nocni Władcy)',
    short: 'Urka',
    color: 0x262629,
    hatColor: 0x851e1e,
    workMult: 0.5,
    speedMult: 0.95,
    coldResist: 1.1,
    crimeRate: 0.5,
    aggr: 0.75,
    maxHp: 100,
    desc: 'Zawodowi bandyci z Jercewa pod wodzą Gawriłowa. Odmawiają pracy bez strażnika, nocą grają w karty o cudze waciaki i życie, terroryzują „Biełoruczki”.'
  },
  SUKA: {
    id: 'SUKA',
    name: 'Suki (Kolaboranci • Dziesiętnicy)',
    short: 'Suka',
    color: 0x3b593f,
    hatColor: 0x243827,
    workMult: 1.15,
    speedMult: 1.05,
    coldResist: 1.0,
    crimeRate: 0.16,
    aggr: 0.45,
    maxHp: 100,
    desc: 'Byli Urkowie i dawni funkcjonariusze współpracujący z Trzecim Oddziałem oraz Wochrą. Dobrze pracują (+15%), ale toczą krwawą wojnę z Urkami.'
  }
};

const JOBS = {
  WOOD:    { id: 'WOOD',    name: '🪓 Lesopował (Wyrąb Tajgi)',        unit: 'szt. drewna', baseMoney: 16, desc: 'Morderczy marsz za Wachtę do archangielskiej tajgi pod Jercewem. Ścina sosny i nosi kłody do tartaku.' },
  TRAIN:   { id: 'TRAIN',   name: '📦 Baza Żywnościowa (Tragarze)',    unit: 'skrzyń/worków', baseMoney: 30, desc: 'Praca brygady Herlinga-Gruzińskiego i Kowala na bocznicy w Jercewie. Rozładunek wagonów kolejowych do magazynu.' },
  QUARRY:  { id: 'QUARRY',  name: '⛏️ Cegielnia i Gliniarnia Jercewo', unit: 'wózków urobku', baseMoney: 26, desc: 'Kucie zmarzniętej gliny, kamienia i praca przy wykopach pod elektrownię na siarczystym mrozie.' },
  KITCHEN: { id: 'KITCHEN', name: '🍲 Kuchnia (Trzy Kotły i Piece)',   unit: 'kotłów/wsadów', baseMoney: 10, desc: 'Gotuje zupę dla Trzech Kotłów w Jercewie i dokłada drewno do piecyków „Burżujek” w barakach.' }
};

const REGIMES = {
  SLEEP:    { id: 'SLEEP',    name: 'SEN (Baraki – Ogrzewanie)', color: '#2c3e50' },
  ROLLCALL: { id: 'ROLLCALL', name: 'APEL PRZED WACHTĄ',         color: '#8e44ad' },
  MEAL:     { id: 'MEAL',     name: 'POSIŁEK (Trzy Kotły)',      color: '#d35400' },
  WORK:     { id: 'WORK',     name: 'PRACA (Brygady Jercewa)',   color: '#b83227' },
  FREE:     { id: 'FREE',     name: 'CZAS WOLNY W ZONIE',        color: '#27ae60' }
};

const SOUP_TYPES = {
  WATERY: { id: 'WATERY', name: 'Cienka zupa z brukwi (Kocioł I)',  kcal: 220, cost: 1 },
  CABBAGE:{ id: 'CABBAGE',name: 'Kapuśniak z kaszą (Kocioł II)',    kcal: 480, cost: 3 },
  FISH:   { id: 'FISH',   name: 'Ucha rybna z dorsza (Kocioł III)', kcal: 780, cost: 5 }
};

const EXTRA_TYPES = {
  NONE:   { id: 'NONE',   name: 'Brak dodatku',                     kcal: 0,   cost: 0 },
  HERRING:{ id: 'HERRING',name: 'Solony śledź + ziemniak',          kcal: 310, cost: 2 },
  LARD:   { id: 'LARD',   name: 'Dodatkowa łyżka kaszy ze słoniną', kcal: 640, cost: 4 }
};

const BUILDABLES = {
  BARRACK: {
    id: 'BARRACK', name: '🏠 Barak „Trupiarnia” / Nowy Barak (+8 prycz)',
    costMoney: 220, costWood: 30, w: 16, d: 10, wallHex: 0x5c4632, floorHex: 0x735b44,
    desc: 'Dodatkowy barak w Zonie Jercewa z pryczami i żeliwnym piecykiem „Burżujką”. Zwiększa limit więźniów o +8.'
  },
  WATCHTOWER: {
    id: 'WATCHTOWER', name: '🗼 Wieżyczka Strażnicza WOChR („Wyszka”)',
    costMoney: 140, costWood: 20, w: 4, d: 4, wallHex: 0x4f3b28, floorHex: 0x3d2e20,
    desc: 'Zapewnia stały nadzór wartowników w promieniu 28m – więźniowie w zasięgu pracują o +25% szybciej i boją się sabotażu.'
  },
  BONFIRE: {
    id: 'BONFIRE', name: '🔥 Ognisko Polowe (Na Lesopowale)',
    costMoney: 60, costWood: 12, w: 3.2, d: 3.2, wallHex: 0x3b3b3b, floorHex: 0x555555,
    desc: 'Postaw przy drodze do tajgi lub w cegielni – ogrzewa przechodzących i pracujących na mrozie więźniów!'
  },
  SAWMILL_OUTPOST: {
    id: 'SAWMILL_OUTPOST', name: '🪵 Polowa Birża Leśna (Skład Drewna)',
    costMoney: 180, costWood: 25, w: 10, d: 8, wallHex: 0x543d28, floorHex: 0x6b5037,
    desc: 'Postaw blisko tajgi! Drwale z „Lesopowału” będą odnosić kłody tutaj zamiast iść przez całą Zonę.'
  },
  SOLITARY: {
    id: 'SOLITARY', name: '🔒 Zimny Izolator Karny (Karcer przy Wachcie)',
    costMoney: 160, costWood: 20, w: 8, d: 7, wallHex: 0x495159, floorHex: 0x66707a,
    desc: 'Nieogrzewany blok karceru przy bramie obozowej w Jercewie. Obniża ryzyko buntu w obozie.'
  }
};

const CRIMES = [
  { id: 'KOSTYLEV_BURN', title: 'Samookaleczenie w ogniu (metoda Kostylewa)', desc: 'Więzień wieczorem włożył dłoń do rozpalonego piecyka „Burżujki”, aby wyłudzić u dr. Zabielskiego zwolnienie z wyrębu lasu!' },
  { id: 'STEAL_FLOUR',   title: 'Kradzież mąki i śledzi na Bazie Żywnościowej', desc: 'Przyłapany podczas rozładunku wagonu na stacji Jercewo na chowaniu sypkiej mąki w nogawkach waciaka.' },
  { id: 'CARDS_URKA',    title: 'Nocna gra w karty Urków o cudze waciaki', desc: 'Urkowie urządzili w baraku grę w karty o porcję chleba i nowe buty należące do więźnia politycznego.' },
  { id: 'NIGHT_BLIND',   title: 'Odmowa wyjścia za Wachtę („Kurza ślepota”)', desc: 'Więzień rzucił narzędzie w śnieg przed Wachtą, tłumacząc się cyngą, „kurzą ślepotą” i odmrożeniami.' },
  { id: 'SABOTAGE_SAW',  title: 'Sabotaż piły dwuręcznej na „Lesopowale”', desc: 'Celowo wygiął zęby piły na kamieniu w tajdze, by brygada leśna nie wyrobiła 100% normy.' },
  { id: 'ASSAULT_SUKA',  title: 'Krwawe porachunki z „Suką” za barakiem', desc: 'Zaatakował dziesiętnika współpracującego z Trzecim Oddziałem NKWD, próbując odebrać mu przydział z Trzeciego Kotła.' }
];

// --- STREFY I BUDYNKI W OBOZIE JERCEWO (Każdy główny budynek ma Kartę w stylu Clash Royale!) ---
const ZONES = {
  BARRACKS_1: {
    id: 'BARRACKS_1', x: -24, z: -14, w: 16, d: 10, name: 'Barak Brygad Leśnych (Jercewo)',
    icon: '🏠', rarity: 'COMMON', rarityName: 'Karta Zwykła', level: 1, maxLevel: 100,
    baseMoneyCost: 140, baseWoodCost: 20,
    bonusDesc: level => `Pojemność: +${6 + level * 4} prycz • Ciepło piecyka „Burżujki”: +${level * 25}%`
  },
  BARRACKS_2: {
    id: 'BARRACKS_2', x: -24, z: 4, w: 16, d: 10, name: 'Barak Tragarzy (Brygada Kowala)',
    icon: '🏠', rarity: 'COMMON', rarityName: 'Karta Zwykła', level: 1, maxLevel: 100,
    baseMoneyCost: 140, baseWoodCost: 20,
    bonusDesc: level => `Pojemność: +${6 + level * 4} prycz • Ciepło piecyka „Burżujki”: +${level * 25}%`
  },
  CANTEEN: {
    id: 'CANTEEN', x: -2, z: -15, w: 15, d: 10, name: 'Kuchnia Obozowa (Trzy Kotły)',
    icon: '🍲', rarity: 'RARE', rarityName: 'Karta Rzadka', level: 1, maxLevel: 100,
    baseMoneyCost: 180, baseWoodCost: 25,
    bonusDesc: level => `Kaloryczność Trzech Kotłów: +${(level - 1) * 12}% kcal • Leczenie głodu przy posiłku: +${level * 5} HP`
  },
  INFIRMARY: {
    id: 'INFIRMARY', x: 18, z: 4, w: 10, d: 9, name: 'Szpital (Lazaret dr. Zabielskiego)',
    icon: '🏥', rarity: 'EPIC', rarityName: 'Karta Epicka', level: 1, maxLevel: 100,
    baseMoneyCost: 220, baseWoodCost: 25,
    bonusDesc: level => `Leczy „dochodiagów” (<10 HP) do 100 HP w ${Math.max(2, 13 - level)}h • Ogrzewanie szpitalne: +${level * 30}%`
  },
  SAWMILL: {
    id: 'SAWMILL', x: 18, z: -14, w: 11, d: 9, name: 'Tartak w Jercewie („Lesopował”)',
    icon: '🪓', rarity: 'RARE', rarityName: 'Karta Rzadka', level: 1, maxLevel: 100,
    baseMoneyCost: 190, baseWoodCost: 20,
    bonusDesc: level => `Zysk z kłody sosnowej: ${Math.round(16 * (1 + (level - 1) * 0.25))} ₽ • Drewno z kłody: +${3 + level} szt.`
  },
  DEPOT: {
    id: 'DEPOT', x: 15, z: 48, w: 18, d: 8, name: 'Baza Żywnościowa (Stacja Jercewo)',
    icon: '🚂', rarity: 'EPIC', rarityName: 'Karta Epicka', level: 1, maxLevel: 100,
    baseMoneyCost: 240, baseWoodCost: 30,
    bonusDesc: level => `Zysk za worek/skrzynię z wagonu: ${30 + (level - 1) * 10} ₽ • Ładunek pociągu: ${14 + level * 2} skrzyń`
  },
  QUARRY: {
    id: 'QUARRY', x: -86, z: 40, w: 22, d: 18, name: 'Cegielnia i Gliniarnia w Jercewie',
    icon: '⛏️', rarity: 'LEGENDARY', rarityName: 'Karta Legendarna', level: 1, maxLevel: 100,
    baseMoneyCost: 260, baseWoodCost: 30,
    bonusDesc: level => `Zysk za wózek urobku: ${Math.round(26 * (1 + (level - 1) * 0.3))} ₽ • Tempo kucia na mrozie: +${(level - 1) * 15}%`
  },
  ROLLCALL: {
    id: 'ROLLCALL', x: -2, z: 3, w: 16, d: 13, name: 'Plac Apelowy i „Wachta” (Jercewo)',
    icon: '👑', rarity: 'LEGENDARY', rarityName: 'Karta Legendarna', level: 1, maxLevel: 100,
    baseMoneyCost: 200, baseWoodCost: 25,
    bonusDesc: level => `Dyscyplina w Zonie: +${level * 5}% • Czas działania przemówień na apelu: ${10 + level * 2}h`
  },

  // Bramy („Wachty”) i strefy nawigacyjne
  CAMP_GATE_E:{ x: 30,  z: 0,   w: 4,  d: 6,  name: 'Wachta Wschodnia (Szlak na Lesopował)' },
  CAMP_GATE_W:{ x: -38, z: 12,  w: 4,  d: 6,  name: 'Wachta Zachodnia (Droga do Cegielni)' },
  CAMP_GATE_S:{ x: -2,  z: 24,  w: 6,  d: 4,  name: 'Wachta Główna (Do Bazy Żywnościowej)' },
  TRAIN_DOCK: { x: -2,  z: 62,  w: 28, d: 5,  name: 'Bocznica Kolejowa Stacji Jercewo' },
  FOREST:     { x: 92,  z: 0,   w: 42, d: 68, name: 'Tajga Archangielska („Lesopował”)' }
};

const CARD_KEYS = ['BARRACKS_1', 'BARRACKS_2', 'CANTEEN', 'INFIRMARY', 'SAWMILL', 'DEPOT', 'QUARRY', 'ROLLCALL'];

// Progi łącznej liczby ulepszeń budynków wymagane na kolejne gwiazdki obozu (1★..5★):
// 1★ = 10 ulepszeń, 2★ = 30 ulepszeń, 3★ = 50 ulepszeń, 4★ = 100 ulepszeń, 5★ = 300 ulepszeń!
const STAR_UPGRADE_THRESHOLDS = [10, 30, 50, 100, 300];

// --- GŁÓWNY STAN GRY ---
const state = {
  money: 650,
  wood: 90,
  day: 1,
  hour: 7,
  minute: 0,
  gameSpeed: 1,
  temperature: -18,
  deaths: 0,
  campLevel: 1,
  campStars: 0,               // Ogólny poziom obozu w gwiazdkach od 0 do 5 (powiększa mapę i teren zony!)
  totalBuildingUpgrades: 0,   // Licznik ulepszeń budynków (10 -> 1★, 30 -> 2★, 50 -> 3★, 100 -> 4★, 300 -> 5★)
  campXp: 0,
  extraBarrackBeds: 0,
  selectedBrush: 'WORK',
  activePanel: null,
  selectedEntity: null,
  selectedBuildingKey: null,

  speechBuff: {
    type: null,
    name: 'Brak aktywnego przemówienia',
    workMult: 1.0,
    crimeMult: 1.0,
    hoursLeft: 0
  },

  quotas: {
    WOOD: 15,
    TRAIN: 22,
    QUARRY: 14,
    KITCHEN: 26
  },

  meals: {
    TIER_50:  { label: 'Kocioł Pierwszy (Poniżej 50% normy – „Dochodiagi”)', breadGrams: 400, soup: 'WATERY',  extra: 'NONE',    burnedKcal: 1950 },
    TIER_100: { label: 'Kocioł Drugi (50% – 124% normy – Podstawowy)',       breadGrams: 550, soup: 'CABBAGE', extra: 'HERRING', burnedKcal: 2850 },
    TIER_125: { label: 'Kocioł Trzeci (125%+ normy – Stachanowski)',         breadGrams: 800, soup: 'FISH',    extra: 'LARD',    burnedKcal: 3550 }
  },

  schedule: [
    'SLEEP','SLEEP','SLEEP','SLEEP','SLEEP','ROLLCALL',
    'MEAL','WORK','WORK','WORK','WORK','WORK',
    'MEAL','WORK','WORK','WORK','WORK','WORK',
    'ROLLCALL','MEAL','FREE','FREE','SLEEP','SLEEP'
  ],

  train: {
    present: false,
    phase: 'ARRIVING', // 'ARRIVING' | 'DOCKED' | 'DEPARTING' | 'COOLDOWN'
    cratesLeft: 16,
    maxCrates: 16,
    nextArrivalHours: 0,
    xPos: -85,
    cooldownTimer: 0
  },

  transportAnim: {
    active: false,
    phase: 'NONE',
    xPos: -155,
    timer: 0,
    pendingPrisoners: []
  },

  buildMode: {
    active: false,
    typeId: null
  },

  moveMode: {
    active: false,
    zoneKey: null
  },

  prisoners: [],
  guards: [],
  trees: [],
  particles: [],
  customBuildings: [],
  customBuildingKeys: [],
  watchtowers: [],
  bonfires: [],
  sawmillDropoffs: [],
  buildingMeshes: {},
  navVersion: 1,
  autoSaveCookies: true,
  snowEnabled: true,
  crimeReports: [],
  activeCrimeReport: null
};

let nextCustomBuildingId = 1;

// Zwraca aktualne granice ogrodzonej zony obozu (powiększają się MOCNO z każdą gwiazdką 0–5 ★, żeby było dużo miejsca na nowe budynki!)
function getCampBounds() {
  const s = state.campStars || 0;
  return {
    minX: -38 - s * 24,
    maxX: 30 + s * 24,
    minZ: -24 - s * 28,
    maxZ: 24 + s * 6
  };
}

function getNextStarUpgradeTarget() {
  if (state.campStars >= 5) return STAR_UPGRADE_THRESHOLDS[4];
  return STAR_UPGRADE_THRESHOLDS[state.campStars];
}

function getCampStarsDisplay(stars = state.campStars) {
  const s = Math.max(0, Math.min(5, stars));
  return '★'.repeat(s) + '☆'.repeat(5 - s);
}

// Bohaterowie „Innego Świata” Gustawa Herlinga-Gruzińskiego (każdy pojawia się TYLKO RAZ na całą grę!)
const HERLING_ROSTER = [
  { name: 'Gustaw Herling-Gruziński', faction: 'POLITICAL', job: 'TRAIN' },
  { name: 'Michaił Kostylew',         faction: 'POLITICAL', job: 'WOOD' },
  { name: 'Dimitrij „Kowal”',         faction: 'BYTOVIK',   job: 'TRAIN' },
  { name: 'Rusto Karinen (Fin)',      faction: 'POLITICAL', job: 'WOOD' },
  { name: 'Iwan Iwanowicz',           faction: 'POLITICAL', job: 'TRAIN' },
  { name: 'Inż. Aleksander Sadowski', faction: 'POLITICAL', job: 'QUARRY' },
  { name: 'Inż. Machapetian',         faction: 'POLITICAL', job: 'KITCHEN' },
  { name: 'Mikołaj Pamfiłow',         faction: 'BYTOVIK',   job: 'TRAIN' },
  { name: 'Natalia Lwowna',           faction: 'POLITICAL', job: 'KITCHEN' },
  { name: 'Jewgienija Fiodorowna',    faction: 'POLITICAL', job: 'WOOD' }
];
let herlingRosterIndex = 0;
const usedPrisonerNames = new Set();

// Specjalna trójka z „Pociągu Uległych” (za 0 ₽): różowa, fioletowa i niebieska koszula,
// zgłaszani co 10 sekund za przestępstwa (nawet jak nic nie zrobili) aż do śmierci, bez prawa do szpitala!
const SUBMISSIVE_TRIO = [
  {
    name: 'Antoni Zadrożny',
    shirtColor: 0xff66b2, // Różowa koszula
    hatColor: 0x992662,
    shirtLabel: 'Różowa koszula',
    faction: 'BYTOVIK',
    job: 'WOOD',
    isSubmissiveSpecial: true
  },
  {
    name: 'Matvii Mozheiko',
    shirtColor: 0x9b30ff, // Fioletowa koszula
    hatColor: 0x4b1280,
    shirtLabel: 'Fioletowa koszula',
    faction: 'BYTOVIK',
    job: 'QUARRY',
    isSubmissiveSpecial: true
  },
  {
    name: 'Yaraslau Belski',
    shirtColor: 0x1e90ff, // Niebieska koszula
    hatColor: 0x104e8b,
    shirtLabel: 'Niebieska koszula',
    faction: 'BYTOVIK',
    job: 'TRAIN',
    isSubmissiveSpecial: true
  }
];

// Pula całkowicie losowych imion i nazwisk dla pozostałych więźniów (bez powtórzeń bohaterów książki!)
const NAMES_FIRST = [
  'Piotr', 'Wasilij', 'Grigorij', 'Siergiej', 'Andriej', 'Lew', 'Jakow',
  'Wiktor', 'Konstantin', 'Osip', 'Władimir', 'Arkadij', 'Giennadij', 'Jemieljan',
  'Danił', 'Matwiej', 'Timofiej', 'kiryl', 'oleg', 'Paweł', 'Roman', 'Anatolij'
].map(s => s.charAt(0).toUpperCase() + s.slice(1));

const NAMES_LAST = [
  'Morozow', 'Wołkow', 'Kozłow', 'Smirnow', 'Kuzniecow', 'Popow', 'Lebiediew',
  'Orłow', 'Kowalenko', 'Biełow', 'Tarasow', 'Żukow', 'Rabinowicz', 'Pawłow',
  'Sokołow', 'Nowikow', 'Fiodorow', 'Gromow', 'Makarow', 'Zajcew', 'Sołowjow', 'Borysow'
];

// ============================================================================
// SCENA THREE.JS I KAMERA 3D
// ============================================================================
let scene, camera, renderer, raycaster, mouse, groundPlane;
let yardMesh = null;
let perimeterFenceGroup = null;
let sunLight, ambientLight, hemiLight;
let trainGroup, cargoMeshes = [];
let passengerTrainGroup;
let stoveLights = [];
let snowSystem;
let buildGhostMesh = null;

const cameraCtrl = {
  target: new THREE.Vector3(0, 2.0, 6),
  distance: 86,
  angleH: 0,               // Stały kierunek bez obracania!
  angleV: Math.PI / 4,     // Dokładnie kąt 45 stopni i lekko do góry!
  keys: {},
  isDragging: false,
  dragStart: { x: 0, y: 0 },
  prevMouse: { x: 0, y: 0 },
  dragMovedDist: 0,
  pinchStartDist: 0
};

function initThree() {
  const container = document.getElementById('canvas-container');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x161e24);
  scene.fog = new THREE.FogExp2(0x18222a, 0.0018);

  camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 1, 1200);
  updateCameraTransform();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  ambientLight = new THREE.AmbientLight(0x9ab4cc, 0.58);
  scene.add(ambientLight);

  hemiLight = new THREE.HemisphereLight(0xddeeff, 0x334455, 0.45);
  scene.add(hemiLight);

  sunLight = new THREE.DirectionalLight(0xfff4e0, 0.95);
  sunLight.position.set(55, 85, 45);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 280;
  const d = 115;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight);

  buildCampEnvironment();
  buildSnowParticles();
  setupInputHandlers();
}

function updateCameraTransform() {
  const x = cameraCtrl.target.x + cameraCtrl.distance * Math.sin(cameraCtrl.angleV) * Math.sin(cameraCtrl.angleH);
  const y = cameraCtrl.distance * Math.cos(cameraCtrl.angleV);
  const z = cameraCtrl.target.z + cameraCtrl.distance * Math.sin(cameraCtrl.angleV) * Math.cos(cameraCtrl.angleH);
  camera.position.set(x, y, z);
  camera.lookAt(cameraCtrl.target);
}

// ============================================================================
// BUDOWA ŚWIATA 3D Z ODZNAKAMI POZIOMÓW BUDYNKÓW (JAK W CLASH ROYALE!)
// ============================================================================
function buildCampEnvironment() {
  const groundGeo = new THREE.PlaneGeometry(340, 340);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0xdbe2e8, roughness: 0.93 });
  groundPlane = new THREE.Mesh(groundGeo, groundMat);
  groundPlane.rotation.x = -Math.PI / 2;
  groundPlane.receiveShadow = true;
  scene.add(groundPlane);

  const yard = new THREE.Mesh(
    new THREE.PlaneGeometry(68, 48),
    new THREE.MeshStandardMaterial({ color: 0xaab2b8, roughness: 0.97 })
  );
  yard.rotation.x = -Math.PI / 2;
  yard.position.set(-4, 0.02, 0);
  yard.receiveShadow = true;
  scene.add(yard);
  yardMesh = yard;

  buildSnowRoad(30, 0, 92, 0, 5.5);
  buildSnowRoad(-38, 12, -86, 40, 5.0);
  buildSnowRoad(-2, 24, -2, 62, 6.0);
  buildSnowRoad(-2, 55, 15, 55, 5.0);
  buildSnowRoad(-86, 40, -2, 55, 4.5);

  buildCutawayBuilding(ZONES.BARRACKS_1, 0x5c4632, 0x735b44, 'BARRACKS', 'BARRACKS_1');
  buildCutawayBuilding(ZONES.BARRACKS_2, 0x5c4632, 0x735b44, 'BARRACKS', 'BARRACKS_2');
  buildCutawayBuilding(ZONES.CANTEEN,    0x614e3a, 0x806a52, 'CANTEEN',  'CANTEEN');
  buildCutawayBuilding(ZONES.SAWMILL,    0x543d28, 0x6b5037, 'SAWMILL',  'SAWMILL');
  buildCutawayBuilding(ZONES.DEPOT,      0x4a5259, 0x626b73, 'DEPOT',    'DEPOT');
  buildCutawayBuilding(ZONES.INFIRMARY,  0x6b757d, 0x8f9aa3, 'INFIRMARY','INFIRMARY');

  state.sawmillDropoffs.push(ZONES.SAWMILL);

  buildRollCallPlaza();
  buildQuarryZone();
  buildPerimeterFenceAndTowers();
  buildRailwayAndTrains();
  spawnInitialForest();
}

function createBuildingLevelSprite(zoneKey) {
  const z = ZONES[zoneKey];
  if (!z) return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 72;
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(7.5, 2.1, 1);
  sprite.position.set(0, 5.2, 0);
  sprite.userData.canvas = canvas;
  sprite.userData.tex = tex;
  sprite.userData.zoneKey = zoneKey;
  refreshBuildingLevelSprite(sprite);
  return sprite;
}

function refreshBuildingLevelSprite(sprite) {
  const z = ZONES[sprite.userData.zoneKey];
  if (!z) return;
  const ctx = sprite.userData.canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 72);

  // Tło w stylu Clash Royale (złoto-niebieski baner z koroną/gwiazdką poziomu)
  ctx.fillStyle = 'rgba(18, 24, 32, 0.88)';
  ctx.fillRect(8, 8, 240, 54);
  ctx.lineWidth = 3;
  ctx.strokeStyle = z.rarity === 'LEGENDARY' ? '#f1c40f' : (z.rarity === 'EPIC' ? '#9b59b6' : (z.rarity === 'RARE' ? '#e67e22' : '#bdc3c7'));
  ctx.strokeRect(8, 8, 240, 54);

  // Odznaka poziomu po lewej
  ctx.fillStyle = '#f39c12';
  ctx.fillRect(14, 14, 58, 42);
  ctx.fillStyle = '#111';
  ctx.font = '900 15px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`LVL ${z.level}`, 43, 40);

  // Nazwa budynku
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px Segoe UI, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`${z.icon} ${z.name.slice(0, 20)}`, 80, 33);

  ctx.fillStyle = '#f5c542';
  ctx.font = 'bold 11px Segoe UI, sans-serif';
  ctx.fillText(`★ Ulepsz / ✋ Przesuń`, 80, 50);

  sprite.userData.tex.needsUpdate = true;
}

function buildSnowRoad(x1, z1, x2, z2, width) {
  const dx = x2 - x1, dz = z2 - z1;
  const len = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(width, len),
    new THREE.MeshStandardMaterial({ color: 0x99a2aa, roughness: 0.98 })
  );
  road.rotation.x = -Math.PI / 2;
  road.rotation.z = angle;
  road.position.set((x1 + x2) / 2, 0.03, (z1 + z2) / 2);
  road.receiveShadow = true;
  scene.add(road);

  const postMat = new THREE.MeshStandardMaterial({ color: 0x3d2e20 });
  const steps = Math.floor(len / 14);
  for (let i = 1; i <= steps; i++) {
    const t = i / (steps + 1);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 4.2, 6), postMat);
    pole.position.set(x1 + dx * t, 2.1, z1 + dz * t - 3.2);
    pole.castShadow = true;
    scene.add(pole);
  }
}

function buildCutawayBuilding(zone, wallHex, floorHex, type, zoneKey = null) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0, zone.z);
  if (zoneKey) group.userData.buildingKey = zoneKey;

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(zone.w, 0.2, zone.d),
    new THREE.MeshStandardMaterial({ color: floorHex, roughness: 0.85 })
  );
  floor.position.y = 0.1;
  floor.receiveShadow = true;
  group.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({ color: wallHex, roughness: 0.8 });
  const topTrimMat = new THREE.MeshStandardMaterial({ color: 0x2b2118, roughness: 0.9 });
  const hBack = 2.6;
  const hFront = 1.1;
  const thick = 0.45;

  const backW = new THREE.Mesh(new THREE.BoxGeometry(zone.w, hBack, thick), wallMat);
  backW.position.set(0, hBack / 2, -zone.d / 2 + thick / 2);
  backW.castShadow = true;
  group.add(backW);

  const leftW = new THREE.Mesh(new THREE.BoxGeometry(thick, hBack, zone.d), wallMat);
  leftW.position.set(-zone.w / 2 + thick / 2, hBack / 2, 0);
  leftW.castShadow = true;
  group.add(leftW);

  const rightW = new THREE.Mesh(new THREE.BoxGeometry(thick, hFront, zone.d * 0.65), wallMat);
  rightW.position.set(zone.w / 2 - thick / 2, hFront / 2, -zone.d * 0.15);
  rightW.castShadow = true;
  group.add(rightW);

  const sideLen = Math.max(1.2, (zone.w - 3.2) / 2);
  const frontL = new THREE.Mesh(new THREE.BoxGeometry(sideLen, hFront, thick), wallMat);
  frontL.position.set(-zone.w / 2 + sideLen / 2, hFront / 2, zone.d / 2 - thick / 2);
  frontL.castShadow = true;
  group.add(frontL);

  const frontR = new THREE.Mesh(new THREE.BoxGeometry(sideLen, hFront, thick), wallMat);
  frontR.position.set(zone.w / 2 - sideLen / 2, hFront / 2, zone.d / 2 - thick / 2);
  frontR.castShadow = true;
  group.add(frontR);

  const trimBack = new THREE.Mesh(new THREE.BoxGeometry(zone.w + 0.1, 0.15, thick + 0.1), topTrimMat);
  trimBack.position.set(0, hBack + 0.05, -zone.d / 2 + thick / 2);
  group.add(trimBack);

  if (type === 'BARRACKS' || type === 'BARRACK') {
    const bunkMat = new THREE.MeshStandardMaterial({ color: 0x8c6d46 });
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0x4f5d66 });
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xb0b8bf });
    zone.bunkSlots = [];

    for (let bx = -zone.w / 2 + 2.2; bx <= zone.w / 2 - 2.2; bx += 3.4) {
      for (let bz of [-zone.d / 2 + 1.9, zone.d / 2 - 2.1]) {
        // Nie stawiaj pryczy w świetle frontowych drzwi wejściowych
        if (bz > 0 && Math.abs(bx) < 2.1) continue;

        // Słupki dwupiętrowej pryczy
        for (let px of [-0.95, 0.95]) {
          for (let pz of [-0.55, 0.55]) {
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.65, 0.12), bunkMat);
            post.position.set(bx + px, 0.82, bz + pz);
            group.add(post);
          }
        }
        // Dolna i górna prycza + sienniki i poduszki
        for (let tier of [
          { frameY: 0.45, matY: 0.55, sleepY: 0.58 },
          { frameY: 1.25, matY: 1.35, sleepY: 1.38 }
        ]) {
          const frame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 1.3), bunkMat);
          frame.position.set(bx, tier.frameY, bz);
          frame.castShadow = true;
          group.add(frame);

          const mat = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.12, 1.15), mattressMat);
          mat.position.set(bx, tier.matY, bz);
          group.add(mat);

          // Dwie poduszki na każdej szerokiej pryczy (miejsce dla 2 więźniów)
          for (let side of [-0.42, 0.42]) {
            const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.09, 0.32), pillowMat);
            pillow.position.set(bx + side, tier.matY + 0.08, bz - 0.35);
            group.add(pillow);

            zone.bunkSlots.push({
              relX: bx + side,
              relZ: bz,
              relWalkX: bx,
              relWalkZ: (bz < 0 ? bz + 1.0 : bz - 1.0),
              x: zone.x + bx + side,
              y: tier.sleepY,
              z: zone.z + bz,
              walkX: zone.x + bx,
              walkZ: zone.z + (bz < 0 ? bz + 1.0 : bz - 1.0)
            });
          }
        }
      }
    }
    addStoveToBuilding(group, 0, 0);
  } else if (type === 'CANTEEN') {
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x997950 });
    for (let tx of [-3.5, 2.5]) {
      const tbl = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.8, 1.6), tableMat);
      tbl.position.set(tx, 0.5, 1.2);
      tbl.castShadow = true;
      group.add(tbl);
    }
    const cauldron = new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 0.9, 1.3, 12),
      new THREE.MeshStandardMaterial({ color: 0x2d3136, metalness: 0.6 })
    );
    cauldron.position.set(-4.2, 0.75, -2.4);
    group.add(cauldron);
    addStoveToBuilding(group, 3.5, -2.2);
  } else if (type === 'SAWMILL' || type === 'SAWMILL_OUTPOST') {
    const logMat = new THREE.MeshStandardMaterial({ color: 0x7a5533 });
    for (let i = 0; i < 6; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 3.2, 8), logMat);
      log.rotation.z = Math.PI / 2;
      log.position.set(-2.0, 0.45 + (i % 3) * 0.45, -1.5 + Math.floor(i / 3) * 0.8);
      log.castShadow = true;
      group.add(log);
    }
  } else if (type === 'DEPOT') {
    const crateMat = new THREE.MeshStandardMaterial({ color: 0x9e7b4f });
    for (let cx = -5; cx <= 5; cx += 3.2) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 1.5), crateMat);
      c.position.set(cx, 0.7, -1.2);
      c.castShadow = true;
      group.add(c);
    }
  } else if (type === 'INFIRMARY' || type === 'SOLITARY') {
    const bedMat = new THREE.MeshStandardMaterial({ color: 0xd9e2e8 });
    const crossMat = new THREE.MeshBasicMaterial({ color: 0xe74c3c });
    for (let bx of [-2.4, 0, 2.4]) {
      const bed = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 2.4), bedMat);
      bed.position.set(bx, 0.45, -1.2);
      group.add(bed);
    }
    const cross = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.2), crossMat);
    cross.position.set(0, 2.2, -zone.d / 2 + 0.5);
    group.add(cross);
    addStoveToBuilding(group, 0, 1.6);
  }

  if (zoneKey) {
    const lvlSprite = createBuildingLevelSprite(zoneKey);
    if (lvlSprite) group.add(lvlSprite);
    state.buildingMeshes[zoneKey] = { group, lvlSprite };
  }

  scene.add(group);
  return group;
}

function addStoveToBuilding(group, x, z) {
  const stove = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.7, 1.6, 10),
    new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 })
  );
  stove.position.set(x, 0.85, z);
  group.add(stove);

  const pipe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 2.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  pipe.position.set(x, 2.45, z);
  group.add(pipe);

  const glow = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.4, 0.15),
    new THREE.MeshBasicMaterial({ color: 0xff6a00 })
  );
  glow.position.set(x, 0.7, z + 0.6);
  group.add(glow);

  const light = new THREE.PointLight(0xff7b29, 1.35, 18);
  light.position.set(x, 1.7, z);
  group.add(light);
  stoveLights.push(light);
}

function createBonfireMesh(x, z, zoneKey = null) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  if (zoneKey) group.userData.buildingKey = zoneKey;

  const ring = new THREE.Mesh(
    new THREE.CylinderGeometry(1.0, 1.2, 0.4, 10),
    new THREE.MeshStandardMaterial({ color: 0x3b3b3b })
  );
  ring.position.y = 0.2;
  group.add(ring);

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.65, 1.4, 7),
    new THREE.MeshBasicMaterial({ color: 0xff8811 })
  );
  flame.position.y = 0.9;
  group.add(flame);

  const fireLight = new THREE.PointLight(0xff7711, 1.5, 22);
  fireLight.position.y = 1.9;
  group.add(fireLight);
  stoveLights.push(fireLight);

  if (zoneKey) {
    const lvlSprite = createBuildingLevelSprite(zoneKey);
    if (lvlSprite) {
      lvlSprite.position.y = 3.6;
      group.add(lvlSprite);
    }
    state.buildingMeshes[zoneKey] = { group, lvlSprite, flame, fireLight };
  }

  scene.add(group);
  const bfEntry = { x, z, group, zoneKey, radius: 9.5 };
  state.bonfires.push(bfEntry);
  return bfEntry;
}

function createWatchtowerMesh(x, z, zoneKey = null, isCornerTower = false) {
  const postMat = new THREE.MeshStandardMaterial({ color: 0x3d2e20 });
  const tower = new THREE.Group();
  tower.position.set(x, 0, z);
  if (zoneKey) tower.userData.buildingKey = zoneKey;

  const legGeo = new THREE.CylinderGeometry(0.18, 0.22, 6.5, 6);
  for (let lx of [-1.1, 1.1]) {
    for (let lz of [-1.1, 1.1]) {
      const leg = new THREE.Mesh(legGeo, postMat);
      leg.position.set(lx, 3.25, lz);
      leg.castShadow = true;
      tower.add(leg);
    }
  }
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 2.2, 2.8),
    new THREE.MeshStandardMaterial({ color: 0x4f3b28 })
  );
  cabin.position.y = 7.0;
  cabin.castShadow = true;
  tower.add(cabin);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.4, 1.6, 4),
    new THREE.MeshStandardMaterial({ color: 0x2c2219 })
  );
  roof.position.y = 8.9;
  roof.rotation.y = Math.PI / 4;
  tower.add(roof);

  if (zoneKey) {
    const lvlSprite = createBuildingLevelSprite(zoneKey);
    if (lvlSprite) {
      lvlSprite.position.y = 10.6;
      tower.add(lvlSprite);
    }
    state.buildingMeshes[zoneKey] = { group: tower, lvlSprite };
  }

  scene.add(tower);
  const twEntry = { x, z, group: tower, zoneKey, isCornerTower, radius: 28 };
  state.watchtowers.push(twEntry);
  return twEntry;
}

function buildRollCallPlaza() {
  const z = ZONES.ROLLCALL;
  const group = new THREE.Group();
  group.position.set(z.x, 0, z.z);
  group.userData.buildingKey = 'ROLLCALL';

  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(z.w, 0.12, z.d),
    new THREE.MeshStandardMaterial({ color: 0x707880, roughness: 0.9 })
  );
  pad.position.y = 0.06;
  pad.receiveShadow = true;
  group.add(pad);

  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 1.1, 2.0),
    new THREE.MeshStandardMaterial({ color: 0x7a1c1c })
  );
  podium.position.set(0, 0.55, -z.d / 2 + 1.4);
  podium.castShadow = true;
  group.add(podium);

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.22, 4.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x4a3828 })
  );
  post.position.set(-z.w / 2 + 1.2, 2.25, -z.d / 2 + 1.2);
  post.castShadow = true;
  group.add(post);

  const lvlSprite = createBuildingLevelSprite('ROLLCALL');
  if (lvlSprite) group.add(lvlSprite);
  state.buildingMeshes['ROLLCALL'] = { group, lvlSprite };

  scene.add(group);
  createBonfireMesh(z.x + 5.5, z.z - 4.0);
}

function buildQuarryZone() {
  const q = ZONES.QUARRY;
  const group = new THREE.Group();
  group.position.set(q.x, 0, q.z);
  group.userData.buildingKey = 'QUARRY';

  const rockMat = new THREE.MeshStandardMaterial({ color: 0x565e66, roughness: 0.95, flatShading: true });
  const coords = [
    [-6.5, -4.2, 3.2], [0.5, -5.0, 3.6], [6.8, -3.5, 2.9],
    [-4.5, 3.8, 3.0], [4.2, 4.0, 3.4], [0, 1.2, 2.5]
  ];
  coords.forEach(([rx, rz, size]) => {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(size, 0), rockMat);
    rock.position.set(rx, size * 0.65, rz);
    rock.rotation.set(Math.random(), Math.random(), 0);
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  });

  const lvlSprite = createBuildingLevelSprite('QUARRY');
  if (lvlSprite) {
    lvlSprite.position.y = 6.2;
    group.add(lvlSprite);
  }
  state.buildingMeshes['QUARRY'] = { group, lvlSprite };

  scene.add(group);
}

function buildPerimeterFenceAndTowers() {
  // Usuń stare ogrodzenie i stare narożne wieżyczki przed przebudową powiększonej Zony
  if (perimeterFenceGroup) {
    scene.remove(perimeterFenceGroup);
    perimeterFenceGroup = null;
  }
  for (let i = state.watchtowers.length - 1; i >= 0; i--) {
    if (state.watchtowers[i].isCornerTower) {
      scene.remove(state.watchtowers[i].group);
      state.watchtowers.splice(i, 1);
    }
  }

  const bounds = getCampBounds();
  const minX = bounds.minX, maxX = bounds.maxX, minZ = bounds.minZ, maxZ = bounds.maxZ;

  // Zaktualizuj współrzędne bram („Wacht”), aby zawsze pokrywały się z rozszerzonym płotem
  ZONES.CAMP_GATE_E.x = maxX;
  ZONES.CAMP_GATE_W.x = minX;
  ZONES.CAMP_GATE_S.z = maxZ;

  // Powiększ wydeptany plac Zony oraz cały ośnieżony teren mapy wraz z gwiazdkami (0–5 ★)
  if (yardMesh) {
    const w = maxX - minX;
    const d = maxZ - minZ;
    yardMesh.geometry.dispose();
    yardMesh.geometry = new THREE.PlaneGeometry(w, d);
    yardMesh.position.set((minX + maxX) / 2, 0.02, (minZ + maxZ) / 2);
  }
  if (groundPlane) {
    const scale = 1 + (state.campStars || 0) * 0.65;
    groundPlane.scale.set(scale, scale, 1);
  }

  // Gdy Zona mocno się rozszerza na wschód i zachód, odsuń las (FOREST) oraz cegielnię (QUARRY) poza nowy płot,
  // aby całe wnętrze powiększonego obozu było wolnym placem pod budowę nowych budynków!
  if (maxX + 42 > ZONES.FOREST.x) {
    const shiftX = (maxX + 42) - ZONES.FOREST.x;
    ZONES.FOREST.x += shiftX;
    state.trees.forEach(t => {
      if (t.x < maxX + 16) {
        t.x += shiftX + 12;
        if (t.group) t.group.position.x = t.x;
      }
    });
  }
  if (minX - 34 < ZONES.QUARRY.x) {
    ZONES.QUARRY.x = minX - 34;
    if (state.buildingMeshes['QUARRY'] && state.buildingMeshes['QUARRY'].group) {
      state.buildingMeshes['QUARRY'].group.position.x = ZONES.QUARRY.x;
    }
  }

  const fenceGroup = new THREE.Group();
  const postMat = new THREE.MeshStandardMaterial({ color: 0x3d2e20 });
  const wireMat = new THREE.MeshStandardMaterial({ color: 0x6c737a, metalness: 0.5 });

  function addFenceSegment(x1, z1, x2, z2) {
    const dx = x2 - x1, dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    if (len < 0.5) return;
    const angle = Math.atan2(dx, dz);
    const steps = Math.max(1, Math.floor(len / 4));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 2.8, 6), postMat);
      post.position.set(x1 + dx * t, 1.4, z1 + dz * t);
      post.castShadow = true;
      fenceGroup.add(post);
    }
    for (let h of [0.8, 1.5, 2.2]) {
      const wire = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, len), wireMat);
      wire.position.set((x1 + x2) / 2, h, (z1 + z2) / 2);
      wire.rotation.y = angle;
      fenceGroup.add(wire);
    }
  }

  // Północny płot (z bramą północną x: -6 .. 2)
  addFenceSegment(minX, minZ, -6, minZ);
  addFenceSegment(2, minZ, maxX, minZ);
  // Zachodni płot (z Wachtą Zachodnią z: 8 .. 16)
  addFenceSegment(minX, minZ, minX, 8);
  addFenceSegment(minX, 16, minX, maxZ);
  // Południowy płot (z Wachtą Główną x: -6 .. 2)
  addFenceSegment(minX, maxZ, -6, maxZ);
  addFenceSegment(2, maxZ, maxX, maxZ);
  // Wschodni płot (z Wachtą Wschodnią z: -4 .. 4)
  addFenceSegment(maxX, minZ, maxX, -4);
  addFenceSegment(maxX, 4, maxX, maxZ);

  scene.add(fenceGroup);
  perimeterFenceGroup = fenceGroup;
  state.navVersion = (state.navVersion || 1) + 1;

  [[minX, minZ], [maxX, minZ], [minX, maxZ], [maxX, maxZ]].forEach(([cx, cz]) => {
    createWatchtowerMesh(cx, cz, null, true);
  });
}

// Rozszerza poziom gwiazdek obozu (0 -> 5 ★) za ulepszanie budynków (10 / 30 / 50 / 100 / 300 ulepszeń),
// mocno powiększa mapę gry i rozszerza ogrodzony teren Zony pod nowe budynki!
function expandCampStarLevel() {
  if (state.campStars >= 5) return;
  const nextStar = state.campStars + 1;

  state.campStars = nextStar;
  state.extraBarrackBeds += 6; // Bonus miejsc z rozbudowy terytorium obozu

  // Przebuduj i mocno rozszerz ogrodzenie Zony, plac i mapę 3D!
  buildPerimeterFenceAndTowers();

  // Dodaj nowe sosny na rozszerzonych rubieżach tajgi
  ZONES.FOREST.d += 18;
  for (let i = 0; i < 16; i++) {
    const tx = ZONES.FOREST.x - ZONES.FOREST.w / 2 + 2 + Math.random() * (ZONES.FOREST.w - 4);
    const tz = ZONES.FOREST.z - ZONES.FOREST.d / 2 + 2 + Math.random() * (ZONES.FOREST.d - 4);
    createTree(tx, tz);
  }

  // Zresetuj narożniki nawigacji NPC, żeby korzystały z nowej przestrzeni
  state.navVersion = (state.navVersion || 1) + 1;
  state.prisoners.forEach(p => { p.navPath = null; });
  state.guards.forEach(g => { g.navPath = null; });

  const b = getCampBounds();
  spawnBurstParticles(0, 4.5, 0, 0xf1c40f, 35);
  addLog(`⭐ NOWA GWIAZDKA OBOZU (${state.totalBuildingUpgrades} ulepszeń): ${getCampStarsDisplay(state.campStars)} (${state.campStars}/5 ★)! Teren Zony mocno się powiększył do ${Math.round(b.maxX - b.minX)}m × ${Math.round(b.maxZ - b.minZ)}m – masz mnóstwo nowego miejsca na budynki!`, 'good');

  updateHUD();
  renderInspector();
  if (state.activePanel) renderActivePanel();
}

function buildRailwayAndTrains() {
  const railZ = ZONES.TRAIN_DOCK.z + 2.8;
  const railGroup = new THREE.Group();

  const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x3b2c1e });
  for (let rx = -160; rx <= 160; rx += 1.6) {
    const sl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 3.0), sleeperMat);
    sl.position.set(rx, 0.08, railZ);
    railGroup.add(sl);
    const sl2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 3.0), sleeperMat);
    sl2.position.set(rx, 0.08, railZ + 4.5);
    railGroup.add(sl2);
  }

  const steelMat = new THREE.MeshStandardMaterial({ color: 0x778088, metalness: 0.7 });
  for (let offsetZ of [-0.9, 0.9, 3.6, 5.4]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(320, 0.2, 0.14), steelMat);
    rail.position.set(0, 0.22, railZ + offsetZ);
    railGroup.add(rail);
  }
  scene.add(railGroup);

  trainGroup = new THREE.Group();
  trainGroup.position.set(state.train.xPos, 0.25, railZ);

  const locoBody = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.35, 7.5, 12),
    new THREE.MeshStandardMaterial({ color: 0x1c2124, roughness: 0.5 })
  );
  locoBody.rotation.z = Math.PI / 2;
  locoBody.position.set(14.5, 1.8, 0);
  locoBody.castShadow = true;
  trainGroup.add(locoBody);

  const chimney = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.35, 1.4, 10),
    new THREE.MeshStandardMaterial({ color: 0x111417 })
  );
  chimney.position.set(16.8, 3.3, 0);
  trainGroup.add(chimney);

  const locoCab = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 3.2, 2.9),
    new THREE.MeshStandardMaterial({ color: 0x262c30 })
  );
  locoCab.position.set(10.0, 2.1, 0);
  locoCab.castShadow = true;
  trainGroup.add(locoCab);

  const wagonMat = new THREE.MeshStandardMaterial({ color: 0x592b24 });
  for (let wx of [-6.5, 3.2]) {
    const bed = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.45, 2.9), wagonMat);
    bed.position.set(wx, 0.8, 0);
    bed.castShadow = true;
    trainGroup.add(bed);
  }

  cargoMeshes = [];
  const crateMat = new THREE.MeshStandardMaterial({ color: 0xb88b52, roughness: 0.8 });
  for (let i = 0; i < 34; i++) {
    const wagonIdx = i < 17 ? 0 : 1;
    const localIdx = i % 17;
    const cx = (wagonIdx === 0 ? -9.8 : -0.1) + (localIdx % 5) * 1.55;
    const cy = 1.45 + Math.floor(localIdx / 5) * 0.95;
    const cz = (localIdx % 2 === 0 ? -0.55 : 0.55);
    const crate = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.1), crateMat);
    crate.position.set(cx, cy, cz);
    crate.castShadow = true;
    trainGroup.add(crate);
    cargoMeshes.push(crate);
  }
  scene.add(trainGroup);
  updateTrainCargoVisuals();

  passengerTrainGroup = new THREE.Group();
  passengerTrainGroup.position.set(-155, 0.25, railZ + 4.5);

  const pLoco = new THREE.Mesh(
    new THREE.CylinderGeometry(1.3, 1.3, 7.0, 12),
    new THREE.MeshStandardMaterial({ color: 0x1e2429 })
  );
  pLoco.rotation.z = Math.PI / 2;
  pLoco.position.set(9.5, 1.8, 0);
  passengerTrainGroup.add(pLoco);

  const cattleWagon = new THREE.Mesh(
    new THREE.BoxGeometry(11.0, 3.2, 2.9),
    new THREE.MeshStandardMaterial({ color: 0x6e2219, roughness: 0.85 })
  );
  cattleWagon.position.set(0, 2.1, 0);
  cattleWagon.castShadow = true;
  passengerTrainGroup.add(cattleWagon);

  scene.add(passengerTrainGroup);
}

function updateTrainCargoVisuals() {
  const showCargo = (state.train.phase === 'ARRIVING' || state.train.phase === 'DOCKED');
  for (let i = 0; i < cargoMeshes.length; i++) {
    cargoMeshes[i].visible = showCargo && i < state.train.cratesLeft;
  }
}

function spawnInitialForest() {
  const f = ZONES.FOREST;
  for (let i = 0; i < 55; i++) {
    const tx = f.x - f.w / 2 + 2 + Math.random() * (f.w - 4);
    const tz = f.z - f.d / 2 + 2 + Math.random() * (f.d - 4);
    createTree(tx, tz);
  }
}

function createTree(x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.35, 2.2, 7),
    new THREE.MeshStandardMaterial({ color: 0x4d3622 })
  );
  trunk.position.y = 1.1;
  trunk.castShadow = true;
  group.add(trunk);

  const foliageGroup = new THREE.Group();
  const greenMat = new THREE.MeshStandardMaterial({ color: 0x264730, roughness: 0.9 });
  const snowCapMat = new THREE.MeshStandardMaterial({ color: 0xe6eef2, roughness: 0.95 });

  [
    { y: 2.4, r: 1.55, h: 2.2 },
    { y: 3.7, r: 1.2,  h: 1.9 },
    { y: 4.8, r: 0.8,  h: 1.5 }
  ].forEach(layer => {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(layer.r, layer.h, 7), greenMat);
    cone.position.y = layer.y;
    cone.castShadow = true;
    foliageGroup.add(cone);

    const snowCone = new THREE.Mesh(new THREE.ConeGeometry(layer.r * 0.85, layer.h * 0.45, 7), snowCapMat);
    snowCone.position.y = layer.y + layer.h * 0.29;
    foliageGroup.add(snowCone);
  });

  group.add(foliageGroup);
  scene.add(group);

  state.trees.push({
    x, z,
    group,
    foliageGroup,
    chopped: false,
    fallAngle: 0,
    regrowTimer: 0
  });
}

function buildSnowParticles() {
  const count = 1400;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 240;
    positions[i * 3 + 1] = Math.random() * 42;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 240;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.38, transparent: true, opacity: 0.72 });
  snowSystem = new THREE.Points(geo, mat);
  scene.add(snowSystem);
}

// ============================================================================
// TWORZENIE POSTACI 3D (Z PEŁNYM IMIENIEM I NAZWISKIEM, ANIMACJĄ I DYMKIEM)
// ============================================================================
let nextEntityId = 1;

function createCharacterMesh(bodyHex, hatHex, isGuard = false) {
  const root = new THREE.Group();

  const shadowDisk = new THREE.Mesh(
    new THREE.CircleGeometry(0.58, 12),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
  );
  shadowDisk.rotation.x = -Math.PI / 2;
  shadowDisk.position.y = 0.03;
  root.add(shadowDisk);

  const legMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2e });
  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.24), legMat);
  leftLeg.position.set(-0.2, 0.25, 0);
  root.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.24), legMat);
  rightLeg.position.set(0.2, 0.25, 0);
  root.add(rightLeg);

  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.98, 0.52),
    new THREE.MeshStandardMaterial({ color: bodyHex, roughness: 0.8 })
  );
  torso.position.y = 0.88;
  torso.castShadow = true;
  root.add(torso);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0xe6bfa8, roughness: 0.7 })
  );
  head.position.y = 1.58;
  head.castShadow = true;
  root.add(head);

  const hat = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.28, 0.68),
    new THREE.MeshStandardMaterial({ color: hatHex, roughness: 0.85 })
  );
  hat.position.y = 1.82;
  root.add(hat);

  const handMat = new THREE.MeshStandardMaterial({ color: bodyHex });
  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), handMat);
  leftArm.position.set(-0.5, 0.9, 0);
  root.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), handMat);
  rightArm.position.set(0.5, 0.9, 0);
  root.add(rightArm);

  const toolMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.65, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x777d84, metalness: 0.6 })
  );
  toolMesh.position.set(0, -0.3, 0.2);
  toolMesh.visible = false;
  rightArm.add(toolMesh);

  if (isGuard) {
    const badge = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.16, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xff2222 })
    );
    badge.position.set(0, 1.83, 0.35);
    root.add(badge);

    const rifle = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.0, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x2b1d12 })
    );
    rifle.position.set(0.46, 0.95, 0.18);
    rifle.rotation.x = 0.35;
    root.add(rifle);
  }

  const carriedBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.45, 0.55),
    new THREE.MeshStandardMaterial({ color: 0x9c7241 })
  );
  carriedBox.position.set(0, 1.05, 0.55);
  carriedBox.visible = false;
  root.add(carriedBox);

  const canvas = document.createElement('canvas');
  canvas.width = 220;
  canvas.height = 90;
  const tex = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(3.8, 1.55, 1);
  sprite.position.y = 2.85;
  root.add(sprite);

  return { root, torso, leftArm, rightArm, leftLeg, rightLeg, toolMesh, carriedBox, canvas, tex, sprite };
}

function updateOverheadSprite(entity) {
  const ctx = entity.mesh.canvas.getContext('2d');
  ctx.clearRect(0, 0, 220, 90);

  const isStarving = entity.type === 'PRISONER' && entity.nutrition < 30;
  const isExhausted = entity.type === 'PRISONER' && entity.energy !== undefined && entity.energy <= 0;

  if (entity.speechBubble && entity.speechTimer > 0) {
    ctx.fillStyle = 'rgba(255, 255, 240, 0.94)';
    ctx.fillRect(10, 2, 200, 24);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(10, 2, 200, 24);
    ctx.font = 'bold 12px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#111';
    const prefix = isStarving ? '🍖 ' : (isExhausted ? '🪫 ' : '');
    ctx.fillText(prefix + entity.speechBubble, 110, 18);
  } else if (isStarving) {
    // Gdy więzień jest bardzo wygłodzony (<30% sytości) -> wyświetla się ikonka mięska 🍖 w dymku oraz licznik do śmierci z głodu (24h)!
    const hoursLeft = Math.max(1, Math.ceil(24 - (entity.starvationHours || 0)));
    ctx.fillStyle = 'rgba(180, 28, 28, 0.95)';
    ctx.fillRect(18, 2, 184, 24);
    ctx.strokeStyle = '#ffbb33';
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 2, 184, 24);
    ctx.lineWidth = 1;
    ctx.font = 'bold 12.5px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff5cc';
    ctx.fillText(`🍖 GŁÓD! (${hoursLeft}h do śmierci)`, 110, 18);
  } else if (isExhausted) {
    ctx.fillStyle = 'rgba(90, 25, 110, 0.94)';
    ctx.fillRect(18, 2, 184, 24);
    ctx.strokeStyle = '#f1c40f';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 2, 184, 24);
    ctx.lineWidth = 1;
    ctx.font = 'bold 12px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffeaa7';
    ctx.fillText(`🪫 BRAK ENERGII (4x wolniej)`, 110, 18);
  }

  ctx.font = 'bold 13px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  const icon = `${isStarving ? '🍖' : ''}${isExhausted ? '🪫' : ''}${entity.statusIcon || ''}`;
  ctx.fillText(`${icon} ${entity.name}`, 110, 44);

  if (entity.type === 'PRISONER') {
    // Pasek HP
    ctx.fillStyle = 'rgba(0,0,0,0.78)';
    ctx.fillRect(35, 50, 150, 7);
    const hpPct = Math.max(0, Math.min(1, entity.hp / entity.maxHp));
    ctx.fillStyle = entity.inHospital ? '#5dade2' : (hpPct > 0.5 ? '#2ecc71' : (hpPct > 0.25 ? '#f39c12' : '#e74c3c'));
    ctx.fillRect(37, 52, Math.round(146 * hpPct), 3);

    // Pasek Ciepła
    ctx.fillStyle = 'rgba(0,0,0,0.78)';
    ctx.fillRect(35, 59, 150, 6);
    const warmPct = Math.max(0, Math.min(1, entity.warmth / 100));
    ctx.fillStyle = warmPct > 0.3 ? '#3498db' : '#ff5555';
    ctx.fillRect(37, 61, Math.round(146 * warmPct), 2);

    // Pasek Sytości / Głodu (🍖)
    ctx.fillStyle = 'rgba(0,0,0,0.78)';
    ctx.fillRect(35, 67, 150, 6);
    const nutPct = Math.max(0, Math.min(1, (entity.nutrition !== undefined ? entity.nutrition : 85) / 100));
    ctx.fillStyle = nutPct >= 0.3 ? '#e67e22' : '#ff2222';
    ctx.fillRect(37, 69, Math.round(146 * nutPct), 2);

    // Pasek Energii (⚡)
    ctx.fillStyle = 'rgba(0,0,0,0.78)';
    ctx.fillRect(35, 75, 150, 6);
    const rawEnergy = entity.energy !== undefined ? entity.energy : 100;
    const energyPct = Math.max(0, Math.min(1, rawEnergy / 100));
    ctx.fillStyle = rawEnergy > 25 ? '#f1c40f' : (rawEnergy > 0 ? '#e67e22' : '#9b59b6');
    ctx.fillRect(37, 77, Math.round(146 * energyPct), 2);
  } else {
    ctx.fillStyle = 'rgba(46, 204, 113, 0.85)';
    ctx.fillRect(55, 52, 110, 6);
  }

  entity.mesh.tex.needsUpdate = true;
}

function generateUniqueFullName() {
  for (let attempt = 0; attempt < 150; attempt++) {
    const first = NAMES_FIRST[Math.floor(Math.random() * NAMES_FIRST.length)];
    const last = NAMES_LAST[Math.floor(Math.random() * NAMES_LAST.length)];
    const candidate = `${first} ${last}`;
    if (!usedPrisonerNames.has(candidate)) {
      usedPrisonerNames.add(candidate);
      return candidate;
    }
  }
  const fallback = `${NAMES_FIRST[0]} ${NAMES_LAST[0]} #${nextEntityId}`;
  usedPrisonerNames.add(fallback);
  return fallback;
}

function spawnPrisoner(factionKey = null, customJob = null, spawnAtPos = null, customName = null, specialCfg = null) {
  const id = nextEntityId++;
  let herlingChar = null;
  if (!customName && !specialCfg && herlingRosterIndex < HERLING_ROSTER.length) {
    herlingChar = HERLING_ROSTER[herlingRosterIndex++];
    usedPrisonerNames.add(herlingChar.name);
  }

  const keys = Object.keys(FACTIONS);
  const fKey = (specialCfg ? specialCfg.faction : null) || (herlingChar ? herlingChar.faction : null) || factionKey || keys[Math.floor(Math.random() * keys.length)];
  const faction = FACTIONS[fKey];

  const fullName = customName || (specialCfg ? specialCfg.name : null) || (herlingChar ? herlingChar.name : generateUniqueFullName());
  usedPrisonerNames.add(fullName);

  const jobKeys = ['WOOD', 'WOOD', 'TRAIN', 'QUARRY', 'KITCHEN'];
  const assignedJob = (specialCfg ? specialCfg.job : null) || (herlingChar ? herlingChar.job : null) || customJob || jobKeys[id % jobKeys.length];

  const shirtHex = (specialCfg && specialCfg.shirtColor) ? specialCfg.shirtColor : faction.color;
  const hatHex = (specialCfg && specialCfg.hatColor) ? specialCfg.hatColor : faction.hatColor;
  const mesh = createCharacterMesh(shirtHex, hatHex, false);

  const startX = spawnAtPos ? spawnAtPos.x : (ZONES.ROLLCALL.x + (Math.random() - 0.5) * 9);
  const startZ = spawnAtPos ? spawnAtPos.z : (ZONES.ROLLCALL.z + (Math.random() - 0.5) * 7);
  mesh.root.position.set(startX, 0, startZ);
  scene.add(mesh.root);

  const isSubmissive = Boolean(specialCfg && specialCfg.isSubmissiveSpecial);

  // Indywidualna wydajność pracy każdego więźnia – dzięki temu niektórzy pracują lepiej (III Kocioł 125%+),
  // niektórzy przeciętnie (II Kocioł 100%), a niektórzy gorzej (I Kocioł <50%)!
  let workTalent = 1.0;
  let workTraitLabel = '🔨 Przeciętny robotnik (Kocioł II)';
  let initialQuotaPct = 100;

  if (fKey === 'URKA' || id % 4 === 3) {
    workTalent = 0.55 + (id % 3) * 0.06; // Słaby / Leniwy -> wyrabia ok. 40–65% normy (I Kocioł Karny)
    workTraitLabel = '🐌 Słaby / Ociążały (Kocioł I)';
    initialQuotaPct = 45;
  } else if (id % 4 === 1) {
    workTalent = 1.38 + (id % 3) * 0.08; // Przodownik / Stachanowiec -> wyrabia 125–150% normy (III Kocioł Stachanowski)
    workTraitLabel = '⚡ Przodownik Pracy (Kocioł III)';
    initialQuotaPct = 135;
  } else {
    workTalent = 1.0 + (id % 2) * 0.08;  // Solidny robotnik -> wyrabia ~100% normy (II Kocioł Zasadniczy)
    workTraitLabel = '🔨 Solidny Robotnik (Kocioł II)';
    initialQuotaPct = 100;
  }

  const prisoner = {
    id,
    type: 'PRISONER',
    name: fullName,
    faction: fKey,
    job: assignedJob,
    hp: 100,
    maxHp: 100,
    warmth: 98,
    nutrition: 82 + (id % 14), // Zbalansowany poziom sytości na start (82–95%), żeby nagle wszyscy nie byli wygłodzeni!
    energy: 100,               // Energia więźnia: spada 5%/h pracy, odnawia się 20%/h poza pracą; poniżej 0 pracuje 4x wolniej!
    exhaustedLogged: false,
    starvationHours: 0,        // Gdy nutrition < 30% przez 24h -> więzień umiera z głodu!
    workTalent,
    workTraitLabel,
    kcalBalance: 0,
    unitsProducedToday: 0,
    quotaPct: initialQuotaPct,
    lastDayQuotaPct: initialQuotaPct,
    obedience: fKey === 'URKA' ? 50 : 85,
    inHospital: false,
    hospitalHoursLeft: 0,
    neverHospital: isSubmissive,
    isSubmissiveSpecial: isSubmissive,
    customShirtColor: (specialCfg && specialCfg.shirtColor) ? specialCfg.shirtColor : null,
    customHatColor: (specialCfg && specialCfg.hatColor) ? specialCfg.hatColor : null,
    shirtLabel: specialCfg ? specialCfg.shirtLabel : null,
    autoCrimeTimer: isSubmissive ? 10.0 : 0,
    punishedRationsHours: 0,
    solitaryTimer: 0,
    freezePostTimer: 0,
    disobeyTimer: 0,
    warmingUp: false,
    isSleepingOnBunk: false,
    navCorner: null,
    speechBubble: '',
    speechTimer: 0,
    x: startX,
    z: startZ,
    targetX: startX,
    targetZ: startZ,
    workProgress: 0,
    carrying: false,
    fightTarget: null,
    statusIcon: '',
    animPhase: Math.random() * 10,
    mesh
  };

  mesh.root.userData.entity = prisoner;
  updateOverheadSprite(prisoner);
  state.prisoners.push(prisoner);
  return prisoner;
}

function spawnGuard(patrolZone = 'ROLLCALL') {
  const id = nextEntityId++;
  const lastName = NAMES_LAST[Math.floor(Math.random() * NAMES_LAST.length)];
  const mesh = createCharacterMesh(0x2f4f2f, 0x1e331e, true);
  const zObj = ZONES[patrolZone] || ZONES.ROLLCALL;
  const sx = zObj.x + (Math.random() - 0.5) * 4;
  const sz = (patrolZone === 'BARRACKS_1') ? (zObj.z + zObj.d / 2 + 2.0) : (zObj.z + (Math.random() - 0.5) * 4);
  mesh.root.position.set(sx, 0, sz);
  scene.add(mesh.root);

  const guard = {
    id,
    type: 'GUARD',
    name: `Wartownik ${lastName}`,
    patrolZone,
    speechBubble: '',
    speechTimer: 0,
    x: sx,
    z: sz,
    targetX: sx,
    targetZ: sz,
    statusIcon: '💂',
    animPhase: Math.random() * 10,
    mesh
  };

  mesh.root.userData.entity = guard;
  updateOverheadSprite(guard);
  state.guards.push(guard);
  return guard;
}

function setEntitySpeech(entity, text, duration = 6.0) {
  entity.speechBubble = text;
  entity.speechTimer = duration;
  updateOverheadSprite(entity);
}

// ============================================================================
// KOLIZJE Z BUDYNKAMI I OGRODZENIEM + NAWIGACJA PRZEZ DRZWI I BRAMY („WACHTY”)
// ============================================================================
function isInsideCampFence(x, z) {
  const b = getCampBounds();
  return x > b.minX && x < b.maxX && z > b.minZ && z < b.maxZ;
}

function getWalledBuildings() {
  const list = [
    ZONES.BARRACKS_1,
    ZONES.BARRACKS_2,
    ZONES.CANTEEN,
    ZONES.INFIRMARY,
    ZONES.SAWMILL,
    ZONES.DEPOT
  ];
  for (const cb of state.customBuildings) {
    if (cb.type === 'BARRACK' || cb.type === 'SAWMILL_OUTPOST' || cb.type === 'SOLITARY') {
      list.push(cb);
    }
  }
  return list;
}

function getAllBarracks() {
  const list = [ZONES.BARRACKS_1, ZONES.BARRACKS_2];
  for (const cb of state.customBuildings) {
    if (cb.type === 'BARRACK') list.push(cb);
  }
  return list;
}

function getPrisonerBarrack(p) {
  const barracks = getAllBarracks();
  return barracks[p.id % barracks.length];
}

function getPrisonerBunkSlot(p) {
  const barrack = getPrisonerBarrack(p);
  if (barrack.bunkSlots && barrack.bunkSlots.length > 0) {
    const idx = Math.floor(p.id / getAllBarracks().length) % barrack.bunkSlots.length;
    const slot = barrack.bunkSlots[idx];
    return {
      barrack,
      x: barrack.x + (slot.relX !== undefined ? slot.relX : (slot.x - barrack.x)),
      y: slot.y,
      z: barrack.z + (slot.relZ !== undefined ? slot.relZ : (slot.z - barrack.z)),
      walkX: barrack.x + (slot.relWalkX !== undefined ? slot.relWalkX : (slot.walkX - barrack.x)),
      walkZ: barrack.z + (slot.relWalkZ !== undefined ? slot.relWalkZ : (slot.walkZ - barrack.z))
    };
  }
  return {
    barrack,
    x: barrack.x + ((p.id % 5) - 2) * 2.5,
    y: 0.58,
    z: barrack.z - 2.0,
    walkX: barrack.x,
    walkZ: barrack.z
  };
}

function isPointInBuilding(px, pz, b, margin = 0) {
  return Math.abs(px - b.x) < (b.w / 2 + margin) && Math.abs(pz - b.z) < (b.d / 2 + margin);
}

function segmentIntersectsBox(x1, z1, x2, z2, minX, maxX, minZ, maxZ) {
  let t0 = 0, t1 = 1;
  const dx = x2 - x1;
  const dz = z2 - z1;
  const p = [-dx, dx, -dz, dz];
  const q = [x1 - minX, maxX - x1, z1 - minZ, maxZ - z1];
  for (let i = 0; i < 4; i++) {
    if (Math.abs(p[i]) < 1e-6) {
      if (q[i] < 0) return false;
    } else {
      const t = q[i] / p[i];
      if (p[i] < 0) {
        if (t > t1) return false;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return false;
        if (t < t1) t1 = t;
      }
    }
  }
  return t0 <= t1;
}

// Znajduje budynek ze ścianami, w którego wnętrzu znajduje się punkt (px, pz)
function findContainingWalledBuilding(px, pz, margin = -0.05) {
  const buildings = getWalledBuildings();
  for (const b of buildings) {
    if (isPointInBuilding(px, pz, b, margin)) {
      return b;
    }
  }
  return null;
}

// Jeśli punkt narożnika leży wewnątrz innego budynku, wypchnij go na zewnątrz
function pushPointOutOfBuildings(pt, buildings, pad = 1.4) {
  let { x, z } = pt;
  for (let iter = 0; iter < 3; iter++) {
    let changed = false;
    for (const b of buildings) {
      const hw = b.w / 2 + pad;
      const hd = b.d / 2 + pad;
      if (Math.abs(x - b.x) < hw && Math.abs(z - b.z) < hd) {
        const dl = Math.abs(x - (b.x - hw));
        const dr = Math.abs((b.x + hw) - x);
        const db = Math.abs(z - (b.z - hd));
        const df = Math.abs((b.z + hd) - z);
        const m = Math.min(dl, dr, db, df);
        if (m === dl) x = b.x - hw - 0.2;
        else if (m === dr) x = b.x + hw + 0.2;
        else if (m === db) z = b.z - hd - 0.2;
        else z = b.z + hd + 0.2;
        changed = true;
      }
    }
    if (!changed) break;
  }
  return { x, z };
}

// Wyznacza listę punktów pośrednich omijających wszystkie budynki na odcinku (x1, z1) -> (x2, z2)
function computeOutdoorLegWaypoints(x1, z1, x2, z2) {
  const buildings = getWalledBuildings();
  const waypoints = [];
  let cx = x1;
  let cz = z1;
  const visitedBuildings = new Set();

  for (let step = 0; step < 6; step++) {
    let hitBuilding = null;
    let bestDist = Infinity;

    for (const b of buildings) {
      if (visitedBuildings.has(b.id)) continue;
      if (isPointInBuilding(cx, cz, b, 0.2) || isPointInBuilding(x2, z2, b, 0.2)) continue;

      const pad = 0.75;
      const minX = b.x - b.w / 2 - pad;
      const maxX = b.x + b.w / 2 + pad;
      const minZ = b.z - b.d / 2 - pad;
      const maxZ = b.z + b.d / 2 + pad;

      if (segmentIntersectsBox(cx, cz, x2, z2, minX, maxX, minZ, maxZ)) {
        const d = Math.hypot(b.x - cx, b.z - cz);
        if (d < bestDist) {
          bestDist = d;
          hitBuilding = b;
        }
      }
    }

    if (!hitBuilding) break;
    visitedBuildings.add(hitBuilding.id);

    const b = hitBuilding;
    const cPad = 2.0;
    const nw = pushPointOutOfBuildings({ x: b.x - b.w / 2 - cPad, z: b.z - b.d / 2 - cPad }, buildings, 1.1);
    const ne = pushPointOutOfBuildings({ x: b.x + b.w / 2 + cPad, z: b.z - b.d / 2 - cPad }, buildings, 1.1);
    const sw = pushPointOutOfBuildings({ x: b.x - b.w / 2 - cPad, z: b.z + b.d / 2 + cPad }, buildings, 1.1);
    const se = pushPointOutOfBuildings({ x: b.x + b.w / 2 + cPad, z: b.z + b.d / 2 + cPad }, buildings, 1.1);

    const wallMinX = b.x - b.w / 2 - 0.15;
    const wallMaxX = b.x + b.w / 2 + 0.15;
    const wallMinZ = b.z - b.d / 2 - 0.15;
    const wallMaxZ = b.z + b.d / 2 + 0.15;

    // Kandydaci: pojedyncze narożniki oraz pary narożników wzdłuż boków budynku
    const candidateChains = [
      [nw], [ne], [sw], [se],
      [nw, ne], [ne, nw],
      [sw, se], [se, sw],
      [nw, sw], [sw, nw],
      [ne, se], [se, ne]
    ];

    let bestChain = [sw];
    let bestScore = Infinity;

    for (const chain of candidateChains) {
      let valid = true;
      let totalLen = 0;
      let px = cx, pz = cz;

      for (const pt of chain) {
        if (segmentIntersectsBox(px, pz, pt.x, pt.z, wallMinX, wallMaxX, wallMinZ, wallMaxZ)) {
          valid = false;
          break;
        }
        totalLen += Math.hypot(pt.x - px, pt.z - pz);
        px = pt.x;
        pz = pt.z;
      }

      if (valid) {
        const cutsEnd = segmentIntersectsBox(px, pz, x2, z2, wallMinX, wallMaxX, wallMinZ, wallMaxZ);
        if (cutsEnd) valid = false;
        totalLen += Math.hypot(x2 - px, z2 - pz);
      }

      const score = (valid ? 0 : 10000) + totalLen;
      if (score < bestScore) {
        bestScore = score;
        bestChain = chain;
      }
    }

    for (const pt of bestChain) {
      waypoints.push(pt);
      cx = pt.x;
      cz = pt.z;
    }
  }

  waypoints.push({ x: x2, z: z2 });
  return waypoints;
}

// Buduje kompletną, deterministyczną ścieżkę punktów (przez drzwi budynków, bramy obozowe i wokół przeszkód)
function buildReliablePath(startX, startZ, finalX, finalZ) {
  const path = [];
  let curX = startX;
  let curZ = startZ;

  const startB = findContainingWalledBuilding(curX, curZ, -0.05);
  const endB = findContainingWalledBuilding(finalX, finalZ, -0.05);

  // Jeśli start i cel są w tym samym budynku -> idź bezpośrednio wewnątrz budynku
  if (startB && startB === endB) {
    path.push({ x: finalX, z: finalZ });
    return path;
  }

  // 1. Wyjście z budynku początkowego przez frontowe drzwi (ściana południowa +Z)
  if (startB) {
    const doorZ = startB.z + startB.d / 2;
    path.push({ x: startB.x, z: doorZ - 0.8 });
    path.push({ x: startB.x, z: doorZ + 2.1 });
    curX = startB.x;
    curZ = doorZ + 2.1;
  }

  // 2. Ustal punkt docelowy na zewnątrz (przed drzwiami budynku docelowego lub bezpośrednio finalX/finalZ)
  let outDestX = finalX;
  let outDestZ = finalZ;
  if (endB) {
    outDestX = endB.x;
    outDestZ = endB.z + endB.d / 2 + 2.1;
  }

  // 3. Przejście przez bramę obozu („Wachtę”), jeśli trzeba wejść lub wyjść z ogrodzonej Zony
  const b = getCampBounds();
  const inCamp = isInsideCampFence(curX, curZ);
  const destInCamp = isInsideCampFence(outDestX, outDestZ);
  const gateEZ = ZONES.CAMP_GATE_E.z; // 0
  const gateWZ = ZONES.CAMP_GATE_W.z; // 12
  const gateSX = ZONES.CAMP_GATE_S.x; // -2

  if (inCamp !== destInCamp) {
    let insideGatePt, outsideGatePt;
    const refOutX = inCamp ? outDestX : curX;
    const refOutZ = inCamp ? outDestZ : curZ;

    if (refOutX >= b.maxX) {
      insideGatePt  = { x: b.maxX - 3.0, z: gateEZ };
      outsideGatePt = { x: b.maxX + 3.0, z: gateEZ };
    } else if (refOutX <= b.minX) {
      insideGatePt  = { x: b.minX + 3.0, z: gateWZ };
      outsideGatePt = { x: b.minX - 3.0, z: gateWZ };
    } else if (refOutZ <= b.minZ) {
      insideGatePt  = { x: gateSX, z: b.minZ + 3.0 };
      outsideGatePt = { x: gateSX, z: b.minZ - 3.0 };
    } else {
      insideGatePt  = { x: gateSX, z: b.maxZ - 3.0 };
      outsideGatePt = { x: gateSX, z: b.maxZ + 3.0 };
    }

    const firstGatePt  = inCamp ? insideGatePt : outsideGatePt;
    const secondGatePt = inCamp ? outsideGatePt : insideGatePt;

    // Odcinek 1: od bieżącej pozycji do wejścia w oś bramy
    const leg1 = computeOutdoorLegWaypoints(curX, curZ, firstGatePt.x, firstGatePt.z);
    for (const pt of leg1) path.push(pt);

    // Przejście na drugą stronę bramy
    path.push(secondGatePt);

    // Odcinek 2: od wyjścia z bramy do celu zewnętrznego
    const leg2 = computeOutdoorLegWaypoints(secondGatePt.x, secondGatePt.z, outDestX, outDestZ);
    for (const pt of leg2) path.push(pt);
  } else if (!inCamp && !destInCamp && segmentIntersectsBox(curX, curZ, outDestX, outDestZ, b.minX - 0.5, b.maxX + 0.5, b.minZ - 0.5, b.maxZ + 0.5)) {
    // Oba punkty są poza obozem, ale linia przecina ogrodzenie obozu (np. droga z Cegielni do Magazynu) -> omiń płot od południa
    const cornerPt = { x: Math.min(curX, outDestX) < b.minX ? b.minX - 3.2 : b.maxX + 3.2, z: b.maxZ + 3.5 };
    path.push(cornerPt);
    const leg2 = computeOutdoorLegWaypoints(cornerPt.x, cornerPt.z, outDestX, outDestZ);
    for (const pt of leg2) path.push(pt);
  } else {
    // Zwykła trasa w obrębie tej samej strefy (wewnątrz obozu lub na zewnątrz)
    const leg = computeOutdoorLegWaypoints(curX, curZ, outDestX, outDestZ);
    for (const pt of leg) path.push(pt);
  }

  // 4. Wejście do budynku docelowego przez frontowe drzwi
  if (endB) {
    const doorZ = endB.z + endB.d / 2;
    path.push({ x: endB.x, z: doorZ - 0.8 });
    path.push({ x: finalX, z: finalZ });
  }

  return path;
}

// Delikatna korekta pozycji, aby postać nie przenikała przez ściany budynków
function resolveBuildingAndFenceCollisions(entity, oldX, oldZ) {
  const buildings = getWalledBuildings();
  const wallMargin = 0.28;
  const doorHalfWidth = 1.65;

  for (const b of buildings) {
    const halfW = b.w / 2;
    const halfD = b.d / 2;
    const wasInside = Math.abs(oldX - b.x) < halfW && Math.abs(oldZ - b.z) < halfD;

    if (wasInside) {
      const minInX = b.x - halfW + wallMargin;
      const maxInX = b.x + halfW - wallMargin;
      const minInZ = b.z - halfD + wallMargin;
      const maxInZ = b.z + halfD - wallMargin;

      if (entity.x < minInX) entity.x = minInX;
      if (entity.x > maxInX) entity.x = maxInX;
      if (entity.z < minInZ) entity.z = minInZ;
      if (entity.z > maxInZ && Math.abs(entity.x - b.x) > doorHalfWidth) {
        entity.z = maxInZ;
      }
    } else {
      const outHalfW = halfW + wallMargin;
      const outHalfD = halfD + wallMargin;
      if (Math.abs(entity.x - b.x) < outHalfW && Math.abs(entity.z - b.z) < outHalfD) {
        const enteringFrontDoor =
          oldZ >= (b.z + halfD - 0.7) &&
          Math.abs(entity.x - b.x) <= doorHalfWidth;

        if (!enteringFrontDoor) {
          const distLeft  = Math.abs(entity.x - (b.x - outHalfW));
          const distRight = Math.abs((b.x + outHalfW) - entity.x);
          const distBack  = Math.abs(entity.z - (b.z - outHalfD));
          const distFront = Math.abs((b.z + outHalfD) - entity.z);
          const minD = Math.min(distLeft, distRight, distBack, distFront);

          if (minD === distLeft)       entity.x = b.x - outHalfW;
          else if (minD === distRight) entity.x = b.x + outHalfW;
          else if (minD === distBack)  entity.z = b.z - outHalfD;
          else                         entity.z = b.z + outHalfD;
        }
      }
    }
  }
}

function ensureStandingPosture(entity) {
  if (entity.isSleepingOnBunk) {
    entity.isSleepingOnBunk = false;
    entity.mesh.root.rotation.x = 0;
    entity.mesh.root.rotation.z = 0;
    entity.mesh.torso.rotation.x = 0;
    entity.mesh.torso.rotation.z = 0;
    entity.mesh.root.position.set(entity.x, 0, entity.z);
  }
}

// Stałe, indywidualne miejsce docelowe wewnątrz strefy dla każdego NPC
function getEntitySlotInZone(entity, zone) {
  const angle = (entity.id * 2.39996) % (Math.PI * 2);
  const radiusFactor = 0.16 + ((entity.id % 4) * 0.05);
  const tx = zone.x + Math.cos(angle) * (zone.w * radiusFactor);
  const tz = zone.z + Math.sin(angle) * (zone.d * radiusFactor);
  return { x: tx, z: tz };
}

function moveTowardsZone(entity, zone, dt, speed) {
  const slot = getEntitySlotInZone(entity, zone);
  const distToSlot = moveTowardsPoint(entity, slot.x, slot.z, dt, speed);

  // Jeśli postać weszła już przez drzwi do środka budynku/strefy, zwracamy mały dystans żeby od razu wykonała akcję!
  const insideBox =
    Math.abs(entity.x - zone.x) <= zone.w * 0.42 &&
    Math.abs(entity.z - zone.z) <= zone.d * 0.36;

  return insideBox ? Math.min(distToSlot, 1.5) : distToSlot;
}

function moveTowardsPoint(entity, finalX, finalZ, dt, speed) {
  ensureStandingPosture(entity);

  const totalDist = Math.hypot(finalX - entity.x, finalZ - entity.z);
  if (totalDist <= 0.25) {
    entity.mesh.root.position.y = 0;
    entity.mesh.leftLeg.rotation.x = 0;
    entity.mesh.rightLeg.rotation.x = 0;
    return totalDist;
  }

  // Jeśli więzień jest wygłodzony (<30% sytości, ikonka 🍖), porusza się 2x wolniej!
  const effectiveSpeed = (entity.type === 'PRISONER' && entity.nutrition < 30) ? (speed * 0.5) : speed;

  // Wyznacz deterministyczną ścieżkę punktów tylko wtedy, gdy zmienił się cel lub układ budynków
  const goalChanged =
    !entity.navPath ||
    entity.navPath.length === 0 ||
    entity.navVersion !== state.navVersion ||
    Math.hypot((entity.navGoalX || 0) - finalX, (entity.navGoalZ || 0) - finalZ) > 0.75;

  if (goalChanged) {
    entity.navPath = buildReliablePath(entity.x, entity.z, finalX, finalZ);
    entity.navPathIdx = 0;
    entity.navGoalX = finalX;
    entity.navGoalZ = finalZ;
    entity.navVersion = state.navVersion;
    entity.stuckTimer = 0;
  }

  // Przeskocz osiągnięte punkty pośrednie (nigdy nie cofa się do wcześniejszego punktu -> zero oscylacji i kręcenia!)
  while (
    entity.navPathIdx < entity.navPath.length - 1 &&
    Math.hypot(entity.navPath[entity.navPathIdx].x - entity.x, entity.navPath[entity.navPathIdx].z - entity.z) < 0.48
  ) {
    entity.navPathIdx++;
    entity.stuckTimer = 0;
  }

  const wp = entity.navPath[entity.navPathIdx] || { x: finalX, z: finalZ };
  const dx = wp.x - entity.x;
  const dz = wp.z - entity.z;
  const distToWp = Math.hypot(dx, dz);

  if (distToWp > 0.05) {
    const oldX = entity.x;
    const oldZ = entity.z;
    const vx = dx / distToWp;
    const vz = dz / distToWp;

    const step = Math.min(distToWp, effectiveSpeed * dt);
    entity.x += vx * step;
    entity.z += vz * step;

    resolveBuildingAndFenceCollisions(entity, oldX, oldZ);

    const movedDist = Math.hypot(entity.x - oldX, entity.z - oldZ);

    // Jeśli postać zahaczyła o krawędź ściany, płynnie przejdź dalej bez blokowania
    if (step > 0.001 && movedDist < step * 0.35) {
      entity.stuckTimer = (entity.stuckTimer || 0) + dt;
      if (entity.stuckTimer > 0.25) {
        if (entity.navPathIdx < entity.navPath.length - 1 && distToWp < 1.8) {
          entity.navPathIdx++;
        } else {
          entity.x = oldX + vx * step;
          entity.z = oldZ + vz * step;
        }
        entity.stuckTimer = 0;
      }
    } else {
      entity.stuckTimer = 0;
    }

    entity.mesh.root.position.set(entity.x, 0, entity.z);

    // Obrót zawsze w stronę celu podróży (wp), a NIE po odbiciu od ściany -> zero drżenia i kręcenia się w kółko!
    const targetRot = Math.atan2(dx, dz);
    let diffRot = targetRot - entity.mesh.root.rotation.y;
    while (diffRot > Math.PI) diffRot -= Math.PI * 2;
    while (diffRot < -Math.PI) diffRot += Math.PI * 2;
    entity.mesh.root.rotation.y += diffRot * Math.min(1, dt * 10);

    entity.animPhase += dt * effectiveSpeed * 3.2;
    entity.mesh.root.position.y = Math.abs(Math.sin(entity.animPhase)) * 0.12;
    entity.mesh.leftArm.rotation.x = Math.sin(entity.animPhase) * 0.65;
    entity.mesh.rightArm.rotation.x = -Math.sin(entity.animPhase) * 0.65;
    entity.mesh.leftLeg.rotation.x = -Math.sin(entity.animPhase) * 0.65;
    entity.mesh.rightLeg.rotation.x = Math.sin(entity.animPhase) * 0.65;
  }

  return totalDist;
}

// ============================================================================
// POMOCNICZE FUNKCJE POJEMNOŚCI, OGRZEWANIA W BARAKACH I SZPITALA
// ============================================================================
function getPrisonerCapacity() {
  const b1 = 6 + ZONES.BARRACKS_1.level * 4;
  const b2 = 6 + ZONES.BARRACKS_2.level * 4;
  return b1 + b2 + state.extraBarrackBeds;
}

function getMealKcalAndCost(tierKey) {
  const m = state.meals[tierKey];
  const canteenBonus = 1 + (ZONES.CANTEEN.level - 1) * 0.12;
  const breadKcal = Math.round((m.breadGrams / 100) * 215);
  const breadCost = Math.round((m.breadGrams / 250) * 1.2);
  const soup = SOUP_TYPES[m.soup] || SOUP_TYPES.WATERY;
  const extra = EXTRA_TYPES[m.extra] || EXTRA_TYPES.NONE;
  return {
    totalKcal: Math.round((breadKcal + soup.kcal + extra.kcal) * canteenBonus),
    burnedKcal: m.burnedKcal,
    cost: breadCost + soup.cost + extra.cost
  };
}

function getPrisonerMealTier(p) {
  if (p.punishedRationsHours > 0) return 'TIER_50';
  const effectiveQuota = Math.max(p.quotaPct || 0, p.lastDayQuotaPct || 0);
  if (effectiveQuota >= 125) return 'TIER_125';
  if (effectiveQuota >= 75) return 'TIER_100';
  return 'TIER_50';
}

// Szeroka detekcja przebywania w Baraku, Stołówce lub Szpitalu (żeby więźniowie zawsze się ogrzewali!)
function isInsideWarmBuilding(x, z) {
  for (let key of ['BARRACKS_1', 'BARRACKS_2', 'CANTEEN', 'INFIRMARY']) {
    const b = ZONES[key];
    // +2.2m marginesu wokół ścian, żeby nawet stojąc przy wejściu do baraku się ogrzewali
    if (Math.abs(x - b.x) <= b.w / 2 + 2.2 && Math.abs(z - b.z) <= b.d / 2 + 2.2) return true;
  }
  for (let cb of state.customBuildings) {
    if ((cb.type === 'BARRACK' || cb.type === 'SOLITARY') &&
        Math.abs(x - cb.x) <= cb.w / 2 + 2.2 && Math.abs(z - cb.z) <= cb.d / 2 + 2.2) {
      return true;
    }
  }
  return false;
}

function isNearBonfire(x, z) {
  for (let bf of state.bonfires) {
    const rad = bf.radius || 9.5;
    if (Math.hypot(x - bf.x, z - bf.z) <= rad) return true;
  }
  return false;
}

function isNearGuardOrTower(x, z, guardRadius = 15) {
  for (let g of state.guards) {
    if (Math.hypot(g.x - x, g.z - z) <= guardRadius) return true;
  }
  for (let tw of state.watchtowers) {
    const rad = tw.radius || 28;
    if (Math.hypot(tw.x - x, tw.z - z) <= rad) return true;
  }
  return false;
}

function findNearestSawmillDropoff(x, z) {
  let best = ZONES.SAWMILL;
  let bestDist = Math.hypot(x - best.x, z - best.z);
  for (let sd of state.sawmillDropoffs) {
    const d = Math.hypot(x - sd.x, z - sd.z);
    if (d < bestDist) {
      bestDist = d;
      best = sd;
    }
  }
  return best;
}

// ============================================================================
// AI WIĘŹNIÓW (SPANIE NA PRYCZACH, CZAS WOLNY W BARAKACH, GŁÓD 🍖, SZPITAL, PRACA)
// ============================================================================
function isPrisonerBeingPunished(p) {
  return (cutsceneState.active && cutsceneState.prisoner === p) || p.freezePostTimer > 0 || p.solitaryTimer > 0;
}

function updatePrisonerAI(p, dt) {
  const regime = state.schedule[state.hour];
  const faction = FACTIONS[p.faction];

  if (p.speechTimer > 0) {
    p.speechTimer -= dt;
    if (p.speechTimer <= 0) {
      p.speechBubble = '';
      updateOverheadSprite(p);
    }
  }
  if (p.punishedRationsHours > 0) {
    p.punishedRationsHours = Math.max(0, p.punishedRationsHours - dt / 60);
  }

  // SPECJALNE TRIO Z POCIĄGU ULEGŁYCH (Antoni Zadrożny, Matvii Mozheiko, Yaraslau Belski):
  // Są zgłaszani przez strażników o popełnienie przestępstwa DOSŁOWNIE CO 10 SEKUND (nawet jak nic nie zrobili), aż nie zginą!
  if (p.isSubmissiveSpecial && p.hp > 0) {
    p.autoCrimeTimer -= dt;
    if (p.autoCrimeTimer <= 0) {
      p.autoCrimeTimer = 10.0;
      triggerPrisonerCrime(p, true);
    }
  }

  // 1. KARA STANIA POD SŁUPEM NA MROZIE (w trakcie kary więzień NIE TRAFIA do szpitala nawet poniżej 10 HP, tylko może zginąć!)
  if (p.freezePostTimer > 0) {
    p.freezePostTimer = Math.max(0, p.freezePostTimer - dt);
    p.statusIcon = '🥶';
    p.mesh.toolMesh.visible = false;
    // Podczas kary pod słupem traci ciepło i zdrowie oraz wyraźnie drży z zimna!
    p.warmth = Math.max(0, p.warmth - dt * 1.5);
    p.hp -= dt * 0.85;
    const postX = ZONES.ROLLCALL.x - 4.5;
    const postZ = ZONES.ROLLCALL.z - 3.2;
    const dist = moveTowardsPoint(p, postX, postZ, dt, 4.0);
    if (dist < 1.2) {
      const nowS = performance.now() * 0.05;
      p.mesh.root.position.x = p.x + Math.sin(nowS) * 0.075;
      p.mesh.torso.rotation.z = Math.sin(nowS * 0.9) * 0.12;
      p.mesh.leftArm.rotation.x = -0.8 + Math.sin(nowS * 1.1) * 0.14;
      p.mesh.rightArm.rotation.x = -0.8 - Math.sin(nowS * 1.1) * 0.14;
    }
    return;
  }

  // 2. KARA W KARCERZE / IZOLATORZE (w trakcie kary więzień NIE TRAFIA do szpitala nawet poniżej 10 HP, tylko może zginąć!)
  if (p.solitaryTimer > 0) {
    p.solitaryTimer = Math.max(0, p.solitaryTimer - dt);
    p.statusIcon = '🔒';
    p.mesh.toolMesh.visible = false;
    p.hp -= dt * 0.5;
    const customSolitary = state.customBuildings.find(cb => cb.type === 'SOLITARY');
    if (customSolitary) {
      moveTowardsZone(p, customSolitary, dt, 4.2);
    } else {
      moveTowardsPoint(p, ZONES.ROLLCALL.x + 12.0, ZONES.ROLLCALL.z + 9.0, dt, 4.2);
    }
    return;
  }

  // 3. KRYTYCZNE ZDROWIE (< 10 HP) -> DOPIERO GDY KARA SIĘ SKOŃCZY (i jeśli przeżył, np. zostało mu 2 HP) IDZIE DO SZPITALA!
  // UWAGA: Więźniowie z Pociągu Uległych (p.neverHospital === true) NIGDY nie trafiają do szpitala!
  if (!p.inHospital && !p.neverHospital && !isPrisonerBeingPunished(p) && p.hp < 10 && p.hp > 0) {
    p.inHospital = true;
    const totalHealHours = Math.max(4, 13 - ZONES.INFIRMARY.level); // Na Lvl 1 dokładnie 12h!
    p.hospitalHoursLeft = totalHealHours;
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    p.mesh.toolMesh.visible = false;
    p.fightTarget = null;
    setEntitySpeech(p, 'Idę do szpitala (<10 HP)!', 6.0);
    addLog(`🏥 SZPITAL: Więzień ${p.name} ma ${Math.round(p.hp)} HP (<10 HP)! Skierowany do Szpitala w Jercewie na ${totalHealHours}h kuracji (do 100 HP).`, 'warn');
  }

  if (p.inHospital) {
    p.statusIcon = '🏥';
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    p.mesh.toolMesh.visible = false;
    const bedOffsets = [-2.4, 0, 2.4];
    const bedX = ZONES.INFIRMARY.x + bedOffsets[p.id % 3];
    const bedZ = ZONES.INFIRMARY.z - 1.2;
    const dist = moveTowardsPoint(p, bedX, bedZ, dt, 5.2);
    // W szpitalu szybko się ogrzewa i nie głoduje
    p.warmth = Math.min(100, p.warmth + dt * (4.5 + ZONES.INFIRMARY.level * 0.5));
    p.nutrition = Math.min(100, p.nutrition + dt * 0.8);

    if (dist < 2.2) {
      // Kładzie się na łóżku szpitalnym podczas kuracji!
      p.isSleepingOnBunk = true;
      p.mesh.root.position.set(bedX, 0.65, bedZ);
      p.mesh.root.rotation.set(-Math.PI / 2, 0, 0);
      p.mesh.leftArm.rotation.x = 0;
      p.mesh.rightArm.rotation.x = 0;
      p.mesh.leftLeg.rotation.x = 0;
      p.mesh.rightLeg.rotation.x = 0;

      // 1 godzina w grze = 60 sekund przy 1x
      const hoursPassed = dt / 60.0;
      const prevHours = p.hospitalHoursLeft;
      p.hospitalHoursLeft = Math.max(0, p.hospitalHoursLeft - hoursPassed);

      // Leczy się równomiernie przez 12h aż do pełnych 100 HP
      if (prevHours > 0) {
        const neededHp = p.maxHp - p.hp;
        const healStep = (neededHp / prevHours) * hoursPassed;
        p.hp = Math.min(p.maxHp, p.hp + Math.max(0.12 * dt, healStep));
      }

      if (p.hospitalHoursLeft <= 0 || p.hp >= p.maxHp - 0.2) {
        p.hp = p.maxHp; // Pełne 100 HP!
        p.warmth = 100;
        p.inHospital = false;
        p.hospitalHoursLeft = 0;
        ensureStandingPosture(p);
        setEntitySpeech(p, 'Wyleczony na 100 HP!', 5.0);
        addLog(`✅ WYPIS ZE SZPITALA: Więzień ${p.name} zakończył leczenie u dr. Zabielskiego i ma 100 HP!`, 'good');
      }
    }
    return;
  }

  // 4. Bójka
  if (p.fightTarget) {
    const target = p.fightTarget;
    p.fightTimer = (p.fightTimer || 0) + dt;
    if (!state.prisoners.includes(target) || target.hp <= 10 || target.inHospital || regime === 'SLEEP' || p.fightTimer > 6.5) {
      p.fightTarget = null;
      p.fightTimer = 0;
    } else {
      p.statusIcon = '🥊';
      p.mesh.toolMesh.visible = false;
      const dist = Math.hypot(target.x - p.x, target.z - p.z);
      if (dist > 1.35) {
        moveTowardsPoint(p, target.x, target.z, dt, 4.8);
      } else {
        const dmg = (p.faction === 'URKA' ? 4.5 : 3.0) * dt;
        target.hp = Math.max(4, target.hp - dmg);
        if (Math.random() < 0.15) {
          spawnBurstParticles(target.x, 1.2, target.z, 0xcc1111, 3);
        }
      }
      return;
    }
  }

  // 5. Nieposłuszeństwo
  if (p.disobeyTimer > 0) {
    p.disobeyTimer -= dt;
    p.statusIcon = '⚠️';
    p.mesh.toolMesh.visible = false;
    moveTowardsZone(p, ZONES.ROLLCALL, dt, 2.8);
    return;
  }

  // Histereza ogrzewania (jeśli spadnie poniżej 25% ciepła, idzie do Baraku i grzeje się aż do 80% – ZERO drgania na progu 25%!)
  if (p.warmth < 25) {
    p.warmingUp = true;
  } else if (p.warmth >= 80 || regime === 'ROLLCALL' || regime === 'MEAL') {
    p.warmingUp = false;
  }

  if (p.warmingUp && regime !== 'SLEEP') {
    p.statusIcon = '🔥';
    p.mesh.toolMesh.visible = false;
    const barrack = getPrisonerBarrack(p);
    moveTowardsZone(p, barrack, dt, 5.2);
    return;
  }

  // Szansa na przestępstwo (zmniejszona jeśli zbudowano Izolator Karny SOLITARY lub wysoki poziom Placu Apelowego)
  if (regime === 'WORK' || regime === 'FREE') {
    const solitaryCount = state.customBuildings.filter(cb => cb.type === 'SOLITARY').length;
    const solitaryMult = Math.max(0.4, 1 - solitaryCount * 0.18);
    const crimeChance = faction.crimeRate * state.speechBuff.crimeMult * solitaryMult * (p.obedience < 60 ? 1.4 : 0.6) * 0.0022 * dt;
    if (Math.random() < crimeChance) {
      triggerPrisonerCrime(p);
      return;
    }
  }

  // 6. ZACHOWANIE WG GRAFIKU DNIA:
  // --- SEN (SLEEP): Więźniowie naprawdę kładą się i śpią na dwupiętrowych pryczach w barakach! ---
  if (regime === 'SLEEP') {
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    p.mesh.toolMesh.visible = false;
    p.statusIcon = '💤';

    const bunk = getPrisonerBunkSlot(p);
    const insideMyBarrack = isPointInBuilding(p.x, p.z, bunk.barrack, -0.1);
    const distToBunk = Math.hypot(bunk.walkX - p.x, bunk.walkZ - p.z);

    if (insideMyBarrack && distToBunk < 1.8) {
      // Kładzie się poziomo na swojej pryczy (dolnej lub górnej) z głową na poduszce!
      p.isSleepingOnBunk = true;
      p.mesh.root.position.set(bunk.x, bunk.y, bunk.z);
      p.mesh.root.rotation.set(-Math.PI / 2, 0, 0);
      p.mesh.torso.rotation.set(0, 0, 0);
      p.mesh.leftArm.rotation.x = 0;
      p.mesh.rightArm.rotation.x = 0;
      p.mesh.leftLeg.rotation.x = 0;
      p.mesh.rightLeg.rotation.x = 0;
      if (p.warmth > 45) {
        p.hp = Math.min(p.maxHp, p.hp + dt * 0.42);
      }
    } else {
      moveTowardsPoint(p, bunk.walkX, bunk.walkZ, dt, 5.2);
    }
  }
  // --- APEL (ROLLCALL): Ustawiają się w równych szeregach przed trybuną ---
  else if (regime === 'ROLLCALL') {
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    p.mesh.toolMesh.visible = false;
    p.statusIcon = '📢';
    const idx = state.prisoners.indexOf(p);
    const col = idx % 7;
    const row = Math.floor(idx / 7);
    const tx = ZONES.ROLLCALL.x - 5.4 + col * 1.8;
    const tz = ZONES.ROLLCALL.z - 1.5 + row * 1.8;
    const dist = moveTowardsPoint(p, tx, tz, dt, 5.2);
    if (dist < 0.5) {
      p.mesh.root.rotation.y = Math.PI; // Twarzą do trybuny Naczelnika
      p.obedience = Math.min(100, p.obedience + dt * 0.12);
    }
  }
  // --- POSIŁEK (MEAL): Idą do Stołówki i jedzą ze swojego Kotła (I, II lub III) ---
  else if (regime === 'MEAL') {
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    p.mesh.toolMesh.visible = false;
    p.statusIcon = '🥣';
    const dist = moveTowardsZone(p, ZONES.CANTEEN, dt, 5.6);
    if (dist < 4.5) {
      const tierKey = getPrisonerMealTier(p);
      const mealInfo = getMealKcalAndCost(tierKey);
      const kcalRatio = mealInfo.totalKcal / Math.max(1000, mealInfo.burnedKcal);
      // Im bardziej kaloryczny kocioł ustawił gracz, tym szybciej rośnie sytość (nutrition) podczas jedzenia w stołówce!
      const nutGainRate = kcalRatio >= 0.85 ? (1.15 * kcalRatio) : (0.32 * kcalRatio);
      p.nutrition = Math.min(100, p.nutrition + dt * nutGainRate);
      p.hp = Math.min(p.maxHp, p.hp + dt * (0.35 * ZONES.CANTEEN.level));
      p.warmth = Math.min(100, p.warmth + dt * 3.5);
    }
  }
  // --- CZAS WOLNY (FREE): Spędzają czas wolny w BARAKACH (stojąc i rozmawiając przy ciepłym piecyku „Burżujce”)! ---
  else if (regime === 'FREE') {
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    p.mesh.toolMesh.visible = false;
    p.statusIcon = p.warmth < 90 ? '🔥' : '🚬';
    const barrack = getPrisonerBarrack(p);
    const dist = moveTowardsZone(p, barrack, dt, 4.6);
    if (dist < 4.0) {
      p.hp = Math.min(p.maxHp, p.hp + dt * 0.18);
      p.obedience = Math.min(100, p.obedience + dt * 0.08);
      checkFactionConflict(p, dt * 0.5);
    }
  }
  // --- PRACA (WORK): Brygady robocze ---
  else if (regime === 'WORK') {
    if (p.faction === 'URKA' && p.obedience < 75) {
      // Jeśli Urka znajdzie się w zasięgu strażnika lub wieżyczki, zostaje zagoniony do pracy (posłuszeństwo rośnie do 82%, zero zawracania w połowie drogi!)
      if (isNearGuardOrTower(p.x, p.z, 16)) {
        p.obedience = 82;
      } else {
        p.statusIcon = '🎲';
        p.mesh.toolMesh.visible = false;
        const barrack = getPrisonerBarrack(p);
        moveTowardsZone(p, barrack, dt, 3.6);
        checkFactionConflict(p, dt * 1.2);
        return;
      }
    }
    performJobBehavior(p, dt, faction);
  }
}

function performJobBehavior(p, dt, faction) {
  const supervised = isNearGuardOrTower(p.x, p.z, 16) ? 1.25 : 1.0;
  // Wpływ wyżywienia, indywidualnego talentu (p.workTalent) oraz energii (p.energy) na szybkość pracy!
  // Gdy energia spadnie poniżej 0 (<= 0), więzień pracuje 4x wolniej (0.25x)!
  const nutBonus = p.nutrition >= 70 ? 1.15 : (p.nutrition < 30 ? 0.65 : 1.0);
  const energyMult = (p.energy !== undefined && p.energy <= 0) ? 0.25 : 1.0;
  const talent = p.workTalent || 1.0;
  const speedMult = faction.workMult * talent * supervised * state.speechBuff.workMult * nutBonus * energyMult;
  const walkSpeed = 5.8;

  if (p.job === 'WOOD') {
    const sawmillLvl = ZONES.SAWMILL.level;
    if (!p.carrying) {
      if (!p.targetTree || p.targetTree.chopped) {
        const availableTrees = state.trees.filter(t => !t.chopped);
        p.targetTree = availableTrees.length > 0
          ? availableTrees[p.id % availableTrees.length]
          : state.trees[p.id % state.trees.length];
      }
      const tree = p.targetTree;
      p.statusIcon = '🪓';
      const offsetAngle = (p.id * 1.7) % (Math.PI * 2);
      const tx = tree.x + Math.cos(offsetAngle) * 0.85;
      const tz = tree.z + Math.sin(offsetAngle) * 0.85;
      const dist = moveTowardsPoint(p, tx, tz, dt, walkSpeed);
      if (dist < 1.8) {
        p.mesh.toolMesh.visible = true;
        p.workProgress += dt * speedMult;
        p.mesh.rightArm.rotation.x = Math.sin(performance.now() * 0.022) * 1.35;
        if (Math.random() < 0.14) {
          spawnBurstParticles(tree.x, 1.1, tree.z, 0xc89d66, 2);
        }
        if (p.workProgress >= 3.2) {
          p.workProgress = 0;
          p.carrying = true;
          p.mesh.toolMesh.visible = false;
          p.mesh.carriedBox.visible = true;
          if (!tree.chopped) {
            tree.chopped = true;
            tree.fallAngle = 0.1;
            tree.regrowTimer = 35;
          }
        }
      } else {
        p.mesh.toolMesh.visible = false;
      }
    } else {
      p.statusIcon = '🪵';
      p.mesh.toolMesh.visible = false;
      const dropoff = findNearestSawmillDropoff(p.x, p.z);
      const dist = moveTowardsZone(p, dropoff, dt, walkSpeed * 0.92);
      if (dist < 2.8) {
        p.carrying = false;
        p.mesh.carriedBox.visible = false;
        const outpostLvlBonus = (dropoff && dropoff.isCustom && dropoff.level > 1) ? (dropoff.level - 1) : 0;
        const rub = Math.round(JOBS.WOOD.baseMoney * (1 + (sawmillLvl - 1) * 0.25)) + outpostLvlBonus * 4;
        state.wood += 3 + sawmillLvl + outpostLvlBonus;
        state.money += rub;
        recordPrisonerProduction(p, 1);
        spawnBurstParticles(p.x, 1.8, p.z, 0xf5c542, 4);
      }
    }
  } else if (p.job === 'TRAIN') {
    const depotLvl = ZONES.DEPOT.level;
    if (p.carrying) {
      p.statusIcon = '📦';
      p.mesh.toolMesh.visible = false;
      const dist = moveTowardsZone(p, ZONES.DEPOT, dt, walkSpeed * 0.92);
      if (dist < 2.5) {
        p.carrying = false;
        p.mesh.carriedBox.visible = false;
        const rub = JOBS.TRAIN.baseMoney + (depotLvl - 1) * 10;
        state.money += rub;
        recordPrisonerProduction(p, 1);
        spawnBurstParticles(p.x, 1.8, p.z, 0xf5c542, 5);
      }
    } else if (state.train.phase === 'DOCKED' && state.train.cratesLeft > 0) {
      p.statusIcon = '🚂';
      p.mesh.toolMesh.visible = false;
      const standX = ZONES.TRAIN_DOCK.x + (p.id % 6 - 2.5) * 2.4;
      const standZ = ZONES.TRAIN_DOCK.z;
      const dist = moveTowardsPoint(p, standX, standZ, dt, walkSpeed);
      if (dist < 2.2) {
        p.workProgress += dt * speedMult;
        p.mesh.rightArm.rotation.x = Math.sin(performance.now() * 0.018) * 0.9;
        if (p.workProgress >= 1.8 && state.train.cratesLeft > 0) {
          p.workProgress = 0;
          state.train.cratesLeft--;
          updateTrainCargoVisuals();
          p.carrying = true;
          p.mesh.carriedBox.visible = true;
        }
      }
    } else {
      // Gdy pociąg właśnie wjeżdża lub odjeżdża z bocznicy w Jercewie, tragarze czekają na rampie w gotowości
      p.statusIcon = '🚂';
      p.mesh.toolMesh.visible = false;
      const waitX = ZONES.TRAIN_DOCK.x + (p.id % 6 - 2.5) * 2.4;
      const waitZ = ZONES.TRAIN_DOCK.z - 1.2;
      moveTowardsPoint(p, waitX, waitZ, dt, walkSpeed * 0.85);
    }
  } else if (p.job === 'QUARRY') {
    runQuarryWork(p, dt, speedMult, walkSpeed);
  } else if (p.job === 'KITCHEN') {
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    p.mesh.toolMesh.visible = false;
    p.statusIcon = '🍲';
    const dist = moveTowardsZone(p, ZONES.CANTEEN, dt, walkSpeed);
    if (dist < 2.8) {
      p.workProgress += dt * speedMult;
      if (p.workProgress >= 12.5) {
        p.workProgress = 0;
        state.money += JOBS.KITCHEN.baseMoney + ZONES.CANTEEN.level * 2;
        recordPrisonerProduction(p, 1);
        state.prisoners.forEach(other => {
          other.warmth = Math.min(100, other.warmth + 1.5);
        });
      }
    }
  }
}

function runQuarryWork(p, dt, speedMult, walkSpeed) {
  const quarryLvl = ZONES.QUARRY.level;
  if (!p.carrying) {
    p.statusIcon = '⛏️';
    const dist = moveTowardsZone(p, ZONES.QUARRY, dt, walkSpeed);
    if (dist < 3.2) {
      p.mesh.toolMesh.visible = true;
      p.workProgress += dt * speedMult * (1 + (quarryLvl - 1) * 0.15);
      p.mesh.rightArm.rotation.x = Math.sin(performance.now() * 0.025) * 1.4;
      if (Math.random() < 0.12) {
        spawnBurstParticles(p.x, 0.9, p.z, 0x88929a, 2);
      }
      if (p.workProgress >= 3.2) {
        p.workProgress = 0;
        p.carrying = true;
        p.mesh.toolMesh.visible = false;
        p.mesh.carriedBox.visible = true;
      }
    } else {
      p.mesh.toolMesh.visible = false;
    }
  } else {
    p.statusIcon = '🪨';
    p.mesh.toolMesh.visible = false;
    const dist = moveTowardsZone(p, ZONES.DEPOT, dt, walkSpeed * 0.9);
    if (dist < 2.6) {
      p.carrying = false;
      p.mesh.carriedBox.visible = false;
      const rub = Math.round(JOBS.QUARRY.baseMoney * (1 + (quarryLvl - 1) * 0.3));
      state.money += rub;
      recordPrisonerProduction(p, 1);
      spawnBurstParticles(p.x, 1.8, p.z, 0xf5c542, 5);
    }
  }
}

function recordPrisonerProduction(p, amount) {
  p.unitsProducedToday = (p.unitsProducedToday || 0) + amount;
  const targetQuota = Math.max(1, state.quotas[p.job] || 15);
  p.quotaPct = Math.round((p.unitsProducedToday / targetQuota) * 100);
  if (state.selectedEntity === p) renderInspector();
  if (state.activePanel === 'nutrition' || state.activePanel === 'prisoners') {
    renderActivePanel();
  }
}

// Oblicza dzienny urobek (w jednostkach pracy na dzień) dla konkretnego więźnia
function estimatePrisonerDailyOutput(p, jobIdOverride = null) {
  if (!p) return 10;
  const jobId = jobIdOverride || p.job || 'WOOD';
  const workHours = Math.max(1, state.schedule.filter(s => s === 'WORK').length);
  // 1 godzina w grze = 60s w realu; po odliczeniu dojścia z apelu/posiłku zostaje ok. 52s efektywnej pracy na każdą godzinę WORK
  const activeWorkSec = workHours * 52;

  const faction = FACTIONS[p.faction] || FACTIONS.POLITICAL;
  const factionWorkMult = Number.isFinite(faction.workMult) ? faction.workMult : 1.0;
  const factionSpeedMult = Number.isFinite(faction.speedMult) ? faction.speedMult : 1.0;
  const talent = Number.isFinite(p.workTalent) && p.workTalent > 0 ? p.workTalent : 1.0;
  const nutBonus = p.nutrition >= 70 ? 1.15 : (p.nutrition < 30 ? 0.65 : 1.0);
  const energyMult = (p.energy !== undefined && p.energy <= 0) ? 0.25 : 1.0;
  const walkHungerPenalty = p.nutrition < 30 ? 0.5 : 1.0;
  const speechMult = (state.speechBuff && Number.isFinite(state.speechBuff.workMult)) ? state.speechBuff.workMult : 1.0;
  // Urkowie często uchylają się od pracy, gdy nie stoi nad nimi strażnik
  const urkaSlackMult = (p.faction === 'URKA' && p.obedience < 75) ? 0.55 : 1.0;

  const effWorkSpeed = Math.max(0.1, factionWorkMult * talent * speechMult * nutBonus * energyMult);
  const effWalkSpeed = Math.max(1.8, 5.8 * factionSpeedMult * walkHungerPenalty);

  let cycleSec = 30;
  if (jobId === 'WOOD') {
    const dropoff = findNearestSawmillDropoff(ZONES.FOREST.x, ZONES.FOREST.z) || ZONES.SAWMILL;
    const gateE = ZONES.CAMP_GATE_E || { x: 30, z: 0 };
    // Droga z lasu przez Wachtę Wschodnią do punktu zrzutu (Tartak lub Skład Polowy) i z powrotem
    const oneWayDist = Math.hypot(ZONES.FOREST.x - gateE.x, ZONES.FOREST.z - gateE.z) +
                       Math.hypot(dropoff.x - gateE.x, dropoff.z - gateE.z);
    const walkSec = (oneWayDist * 2.0) / effWalkSpeed;
    const chopSec = 3.2 / effWorkSpeed;
    cycleSec = walkSec + chopSec;
  } else if (jobId === 'TRAIN') {
    const oneWayDist = Math.hypot(ZONES.TRAIN_DOCK.x - ZONES.DEPOT.x, ZONES.TRAIN_DOCK.z - ZONES.DEPOT.z) * 1.25;
    const walkSec = (oneWayDist * 2.0) / effWalkSpeed;
    const loadSec = 1.8 / effWorkSpeed;
    const trainWaitOverhead = 8.5; // Czas oczekiwania na manewry składu na bocznicy
    cycleSec = walkSec + loadSec + trainWaitOverhead;
  } else if (jobId === 'QUARRY') {
    const quarryLvl = ZONES.QUARRY.level || 1;
    const gateW = ZONES.CAMP_GATE_W || { x: -38, z: 12 };
    const oneWayDist = Math.hypot(ZONES.QUARRY.x - gateW.x, ZONES.QUARRY.z - gateW.z) +
                       Math.hypot(ZONES.DEPOT.x - gateW.x, ZONES.DEPOT.z - gateW.z);
    const walkSec = (oneWayDist * 2.0) / effWalkSpeed;
    const mineSec = 3.2 / (effWorkSpeed * (1 + (quarryLvl - 1) * 0.15));
    cycleSec = walkSec + mineSec;
  } else if (jobId === 'KITCHEN') {
    cycleSec = (12.5 / effWorkSpeed) + 5.5;
  }

  const rawEst = (activeWorkSec / Math.max(4, cycleSec)) * urkaSlackMult;
  let estimated = Number.isFinite(rawEst) ? Math.max(1, Math.round(rawEst)) : 10;

  if (!jobIdOverride || jobIdOverride === p.job) {
    const todayDone = Number.isFinite(p.unitsProducedToday) ? p.unitsProducedToday : 0;
    if (p.lastDayUnits && Number.isFinite(p.lastDayUnits) && p.lastDayUnits > 0) {
      estimated = Math.round(estimated * 0.5 + p.lastDayUnits * 0.5);
    }
    if (todayDone > estimated) {
      estimated = todayDone;
    }
  }
  return Math.max(1, estimated);
}

// Zwraca statystyki wydobycia/pracy dla danej brygady: średnia, najlepszy więzień, najgorszy więzień oraz podział na kotły
function getJobProductionStats(jobId) {
  const assigned = state.prisoners.filter(p => p.job === jobId);
  const pool = assigned.length > 0 ? assigned : state.prisoners;
  const quota = Math.max(1, state.quotas[jobId] || 15);

  if (pool.length === 0) {
    return {
      assignedCount: 0,
      usingFallbackPool: false,
      avgDaily: 0,
      bestDaily: 0,
      bestName: 'Brak więźniów',
      bestToday: 0,
      worstDaily: 0,
      worstName: 'Brak więźniów',
      worstToday: 0,
      avgToday: 0,
      tier125Count: 0,
      tier100Count: 0,
      tier50Count: 0,
      req125: Math.ceil(quota * 1.25),
      req75: Math.ceil(quota * 0.75)
    };
  }

  let sumDaily = 0;
  let sumToday = 0;
  let bestP = pool[0];
  let bestVal = estimatePrisonerDailyOutput(pool[0], jobId);
  let worstP = pool[0];
  let worstVal = bestVal;
  let tier125Count = 0;
  let tier100Count = 0;
  let tier50Count = 0;

  pool.forEach(p => {
    const rawVal = estimatePrisonerDailyOutput(p, jobId);
    const val = Number.isFinite(rawVal) && rawVal > 0 ? rawVal : 1;
    const todayVal = (p.job === jobId && Number.isFinite(p.unitsProducedToday)) ? p.unitsProducedToday : 0;
    sumDaily += val;
    sumToday += todayVal;

    if (val > bestVal || (val === bestVal && todayVal > (bestP.unitsProducedToday || 0))) {
      bestVal = val;
      bestP = p;
    }
    if (val < worstVal || (val === worstVal && todayVal < (worstP.unitsProducedToday || 0))) {
      worstVal = val;
      worstP = p;
    }

    const pctAtQuota = Math.round((val / quota) * 100);
    if (pctAtQuota >= 125) tier125Count++;
    else if (pctAtQuota >= 75) tier100Count++;
    else tier50Count++;
  });

  const avgDaily = Math.round((sumDaily / pool.length) * 10) / 10;
  const avgToday = assigned.length > 0 ? Math.round((sumToday / assigned.length) * 10) / 10 : 0;

  return {
    assignedCount: assigned.length,
    usingFallbackPool: assigned.length === 0,
    avgDaily: Number.isFinite(avgDaily) ? avgDaily : 0,
    bestDaily: Number.isFinite(bestVal) ? bestVal : 0,
    bestName: bestP ? bestP.name : '-',
    bestToday: bestP && bestP.job === jobId ? (bestP.unitsProducedToday || 0) : 0,
    worstDaily: Number.isFinite(worstVal) ? worstVal : 0,
    worstName: worstP ? worstP.name : '-',
    worstToday: worstP && worstP.job === jobId ? (worstP.unitsProducedToday || 0) : 0,
    avgToday: Number.isFinite(avgToday) ? avgToday : 0,
    tier125Count,
    tier100Count,
    tier50Count,
    req125: Math.ceil(quota * 1.25),
    req75: Math.ceil(quota * 0.75)
  };
}

// ============================================================================
// SYSTEM KART BUDYNKÓW W STYLU CLASH ROYALE (ROZBUDOWA WSZYSTKICH BUDYNKÓW!)
// ============================================================================
function getCardUpgradeCost(zoneKey) {
  const z = ZONES[zoneKey];
  const lvl = Math.max(1, z.level || 1);
  return {
    money: Math.round(z.baseMoneyCost * (1 + (lvl - 1) * 0.22)),
    wood: Math.round(z.baseWoodCost * (1 + (lvl - 1) * 0.18))
  };
}

function getAllUpgradeableCardKeys() {
  return [...CARD_KEYS, ...state.customBuildingKeys];
}

function upgradeBuildingCard(zoneKey) {
  const z = ZONES[zoneKey];
  if (!z || z.level >= z.maxLevel) return;
  const cost = getCardUpgradeCost(zoneKey);
  if (state.money < cost.money || state.wood < cost.wood) return;

  state.money -= cost.money;
  state.wood -= cost.wood;
  z.level++;

  // Efekty ulepszania dla postawionych przez gracza budynków!
  if (z.isCustom) {
    if (z.type === 'BARRACK') {
      state.extraBarrackBeds += 4;
    } else if (z.type === 'WATCHTOWER') {
      const tw = state.watchtowers.find(t => t.zoneKey === zoneKey);
      if (tw) tw.radius = 28 + (z.level - 1) * 5;
    } else if (z.type === 'BONFIRE') {
      const bf = state.bonfires.find(b => b.zoneKey === zoneKey);
      if (bf) bf.radius = 9.5 + (z.level - 1) * 3.0;
    }
  }

  // Licznik ulepszeń budynków do Gwiazdek Obozu (1★ = 10, 2★ = 30, 3★ = 50, 4★ = 100, 5★ = 300 ulepszeń)!
  state.totalBuildingUpgrades = (state.totalBuildingUpgrades || 0) + 1;
  state.campLevel = 1 + state.totalBuildingUpgrades;

  while (state.campStars < 5 && state.totalBuildingUpgrades >= STAR_UPGRADE_THRESHOLDS[state.campStars]) {
    state.money += 150;
    expandCampStarLevel();
  }

  // Zaktualizuj odznakę 3D nad budynkiem i dodaj efekt wizualny ulepszenia w 3D!
  const bm = state.buildingMeshes[zoneKey];
  if (bm) {
    if (bm.lvlSprite) refreshBuildingLevelSprite(bm.lvlSprite);
    if (bm.flame) {
      bm.flame.scale.setScalar(1 + (z.level - 1) * 0.18);
    }
    spawnBurstParticles(z.x, 3.5, z.z, 0xf1c40f, 18);
    spawnBurstParticles(z.x, 4.0, z.z, 0x3498db, 12);

    // Dodatkowy detal wizualny na budynku (złota gwiazda / maszt na dachu)
    if (z.d >= 6) {
      const banner = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.3, 6),
        new THREE.MeshBasicMaterial({ color: 0xf1c40f })
      );
      banner.position.set((z.level - 5) * 1.1, 2.9, -z.d / 2 + 0.5);
      bm.group.add(banner);
    }
  }

  addLog(`🃏 ULEPSZONO KARTĘ: ${z.icon} ${z.name} awansował na Poziom ${z.level}!`, 'good');
  updateHUD();
  renderInspector();
  if (state.activePanel) renderActivePanel();
}

// ============================================================================
// SYSTEM PRZESTĘPSTW, RAPORTÓW STRAŻNIKÓW I KAR DYSCYPLINARNYCH
// ============================================================================
function triggerPrisonerCrime(p, isForcedSubmissive = false) {
  let crime;
  if (isForcedSubmissive) {
    const submissiveCrimes = [
      {
        title: `Prowokacyjne noszenie ${p.shirtLabel || 'kolorowej koszuli'} (Raport co 10s)`,
        desc: `Strażnik zgłasza więźnia z „Pociągu Uległych” (${p.name}), choć ten dosłownie nic nie zrobił i tylko stał spokojnie!`
      },
      {
        title: `Podejrzana uległość na terenie zony Jercewa`,
        desc: `Wartownik melduje: „Więzień ${p.name} (${p.shirtLabel}) zachowuje się podejrzanie grzecznie! Zgłaszam go ponownie do raportu karnego!”`
      },
      {
        title: `Fałszywy donos wartownika (co 10 sekund)`,
        desc: `Dowódca warty znów wypisał raport na więźnia ${p.name} (${p.shirtLabel}), mimo że więzień nie popełnił żadnego wykroczenia.`
      }
    ];
    crime = submissiveCrimes[Math.floor(Math.random() * submissiveCrimes.length)];
    setEntitySpeech(p, 'Przecież nic nie zrobiłem!', 4.5);
  } else {
    crime = CRIMES[Math.floor(Math.random() * CRIMES.length)];
    p.disobeyTimer = 18;
    setEntitySpeech(p, 'Nie będę tyrać!', 5.0);
  }

  const guardName = state.guards.length > 0
    ? state.guards[Math.floor(Math.random() * state.guards.length)].name
    : 'Dowódca Wartowników';

  const report = {
    id: Date.now() + Math.random(),
    prisonerId: p.id,
    prisonerName: p.name,
    faction: p.faction,
    guardName,
    crimeTitle: crime.title,
    crimeDesc: crime.desc,
    hour: state.hour
  };

  state.crimeReports.unshift(report);
  addLog(`🚨 RAPORT: ${p.name} (${p.shirtLabel || FACTIONS[p.faction].short}) – ${crime.title}! <a href="#" style="color:#f5c542;" onclick="openCrimeReportById(${report.id}); return false;">[Rozpatrz]</a>`, 'danger');

  if (!state.activeCrimeReport && !cutsceneState.active) {
    showCrimeModal(report);
  }
}

function openCrimeReportById(repId) {
  const rep = state.crimeReports.find(r => r.id === repId);
  if (rep) showCrimeModal(rep);
}

function showCrimeModal(report) {
  const p = state.prisoners.find(x => x.id === report.prisonerId);
  if (!p) {
    state.crimeReports = state.crimeReports.filter(r => r.id !== report.id);
    return;
  }
  state.activeCrimeReport = report;

  const modal = document.getElementById('crime-modal');
  const body = document.getElementById('crime-modal-body');
  modal.classList.remove('hidden');

  body.innerHTML = `
    <div style="background:#1a1d21; border-left:4px solid #e74c3c; padding:9px; margin-bottom:10px; border-radius:4px;">
      <div style="font-size:11px; color:#aaa;">Melduje: <b>💂 ${report.guardName}</b></div>
      <div style="font-size:14px; font-weight:bold; color:#fff; margin:3px 0;">
        Więzień: ${p.name} <span class="faction-tag faction-${p.faction}">${FACTIONS[p.faction].short}</span>
      </div>
      <div style="color:#ff9e9e; font-weight:bold; font-size:12.5px;">Przewinienie: ${report.crimeTitle}</div>
      <div style="color:#ccc; font-size:11.5px; margin-top:3px;">„${report.crimeDesc}”</div>
    </div>
    <div style="font-size:12px; color:#d4a017; font-weight:bold; margin-bottom:6px;">
      Towarzyszu Naczelniku, jaką karę wymierzyć temu więźniowi?
    </div>
    <div class="punish-grid">
      <button class="action-btn secondary" onclick="punishPrisoner(${p.id}, 'WARN', true)">🗣️ Nagana i przymus powrotu do pracy</button>
      <button class="action-btn warn" onclick="punishPrisoner(${p.id}, 'RATION_CUT', true)">🍞 Karny Kocioł (300g chleba na 24h)</button>
      <button class="action-btn warn" onclick="punishPrisoner(${p.id}, 'BATON', true)">🏏 Chłosta pałką (-22 HP, +posłuszeństwo)</button>
      <button class="action-btn secondary" onclick="punishPrisoner(${p.id}, 'SOLITARY', true)">🔒 Zamknięcie w Karcerze (Izolator)</button>
      <button class="action-btn" onclick="punishPrisoner(${p.id}, 'FREEZE_POST', true)">🥶 Słup karny na mrozie (-30% ciepła)</button>
      <button class="action-btn" style="background:#6e1414; border-color:#ff4444;" onclick="punishPrisoner(${p.id}, 'EXECUTE', true)">🔫 Rozstrzelanie przed szeregiem (Strach)</button>
    </div>
  `;
}

function closeCrimeModal() {
  state.activeCrimeReport = null;
  document.getElementById('crime-modal').classList.add('hidden');
}

function punishPrisoner(prisonerId, punishmentType, fromModal = false) {
  const idx = state.prisoners.findIndex(x => x.id === prisonerId);
  if (idx === -1) {
    if (fromModal) closeCrimeModal();
    return;
  }
  const p = state.prisoners[idx];
  p.disobeyTimer = 0;
  p.fightTarget = null;

  if (state.activeCrimeReport) {
    state.crimeReports = state.crimeReports.filter(r => r.id !== state.activeCrimeReport.id);
  }
  if (fromModal) closeCrimeModal();

  // Jeśli wybrano ROZSTRZELANIE (EXECUTE), CHŁOSTĘ (BATON) lub SŁUP NA MROZIE (FREEZE_POST) -> ODPALAMY CUTSCENKĘ 3D!
  if (punishmentType === 'EXECUTE' || punishmentType === 'BATON' || punishmentType === 'FREEZE_POST') {
    if (punishmentType === 'FREEZE_POST') {
      p.freezePostTimer = 20;
    }
    startPunishmentCutscene(p, punishmentType);
    return;
  }

  if (punishmentType === 'WARN') {
    p.obedience = Math.min(100, p.obedience + 15);
    setEntitySpeech(p, 'Już idę do roboty...', 4.5);
    addLog(`⚖️ Więzień ${p.name} otrzymał surową naganę i wrócił do pracy.`, 'info');
  } else if (punishmentType === 'RATION_CUT') {
    p.punishedRationsHours = 24;
    p.obedience = Math.min(100, p.obedience + 25);
    setEntitySpeech(p, 'Tylko nie kocioł karny!', 4.5);
    addLog(`🍞 Więzień ${p.name} skazany na Karny Kocioł Nr 1 (obcięte racje przez 24h).`, 'warn');
  } else if (punishmentType === 'SOLITARY') {
    p.solitaryTimer = 25;
    p.obedience = Math.min(100, p.obedience + 40);
    setEntitySpeech(p, 'Do izolatora?!', 4.5);
    addLog(`🔒 Więzień ${p.name} wtrącony do karceru.`, 'warn');
  }

  updateHUD();
  renderInspector();
  if (state.activePanel) renderActivePanel();
}

// ============================================================================
// SYSTEM CUTSCENEK 3D (ROZSTRZELANIE, CHŁOSTA, SŁUP NA MROZIE, APEL OBOZOWY)
// ============================================================================
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playCutsceneGongSound() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 1.2);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.25);
  } catch (e) {}
}

function playGunshotSound() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.55;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.9, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

function playWhipCrackSound() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.22;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.028));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.75, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

function playArcticWindSound() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 1.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(520, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.7);
    filter.frequency.linearRampToValueAtTime(420, ctx.currentTime + 1.4);
    filter.Q.value = 4.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

function playRollCallHornSound() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.setValueAtTime(277, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.95);
  } catch (e) {}
}

const cutsceneState = {
  active: false,
  type: null, // 'EXECUTE' | 'BATON' | 'FREEZE_POST' | 'ROLLCALL'
  speechType: null,
  speechApplied: false,
  prisoner: null,
  guard1: null,
  guard2: null,
  witnesses: [],
  timer: 0,
  shotFired: false,
  strikesDone: 0,
  shake: 0,
  stageX: 0,
  stageZ: 0,
  tempMeshes: [],
  muzzleLight: null,
  savedCam: null
};

function startPunishmentCutscene(prisoner, type) {
  if (cutsceneState.active) finishCutscene();
  closePanel();
  closeCrimeModal();
  closeSpeechModal();

  ensureStandingPosture(prisoner);

  // Zapisz stan kamery sprzed cutscenki
  cutsceneState.savedCam = {
    targetX: cameraCtrl.target.x,
    targetZ: cameraCtrl.target.z,
    distance: cameraCtrl.distance,
    angleH: cameraCtrl.angleH,
    angleV: cameraCtrl.angleV
  };

  const stageX = ZONES.ROLLCALL.x - 2.5;
  const stageZ = ZONES.ROLLCALL.z - 2.2;
  cutsceneState.active = true;
  cutsceneState.type = type;
  cutsceneState.speechType = null;
  cutsceneState.speechApplied = false;
  cutsceneState.prisoner = prisoner;
  cutsceneState.timer = 0;
  cutsceneState.shotFired = false;
  cutsceneState.strikesDone = 0;
  cutsceneState.shake = 0;
  cutsceneState.stageX = stageX;
  cutsceneState.stageZ = stageZ;
  cutsceneState.tempMeshes = [];

  if (state.guards.length === 0) spawnGuard('ROLLCALL');
  cutsceneState.guard1 = state.guards[0];
  cutsceneState.guard2 = state.guards.length > 1 ? state.guards[1] : null;

  prisoner.carrying = false;
  prisoner.mesh.carriedBox.visible = false;
  prisoner.mesh.toolMesh.visible = false;
  prisoner.x = stageX;
  prisoner.z = stageZ;
  prisoner.mesh.root.position.set(stageX, 0, stageZ);
  prisoner.mesh.root.rotation.set(0, 0, 0);

  // Drewniany słup egzekucyjny / pręgierz / słup mrozu za więźniem
  const postColor = type === 'FREEZE_POST' ? 0x6b8ba4 : 0x3b2818;
  const postMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.22, 2.7, 8),
    new THREE.MeshStandardMaterial({ color: postColor })
  );
  postMesh.position.set(stageX, 1.35, stageZ - 0.45);
  scene.add(postMesh);
  cutsceneState.tempMeshes.push(postMesh);

  // Reflektor oświetlający scenę kary
  const lightColor = type === 'FREEZE_POST' ? 0x88ddff : 0xffe6cc;
  const spot = new THREE.PointLight(lightColor, 2.4, 24);
  spot.position.set(stageX, 5.5, stageZ + 2.0);
  scene.add(spot);
  cutsceneState.tempMeshes.push(spot);

  const muzzleLight = new THREE.PointLight(0xffaa22, 0, 25);
  muzzleLight.position.set(stageX, 1.5, stageZ + 3.2);
  scene.add(muzzleLight);
  cutsceneState.muzzleLight = muzzleLight;
  cutsceneState.tempMeshes.push(muzzleLight);

  // Ustaw świadków (innych więźniów) w półkolu wokół miejsca kary
  cutsceneState.witnesses = state.prisoners.filter(other => other !== prisoner && !other.inHospital).slice(0, 8);
  cutsceneState.witnesses.forEach((w, idx) => {
    ensureStandingPosture(w);
    const ang = -Math.PI * 0.75 + (idx / Math.max(1, cutsceneState.witnesses.length - 1)) * Math.PI * 0.7;
    const wx = stageX + Math.cos(ang) * 5.8;
    const wz = stageZ + Math.sin(ang) * 5.8;
    w.x = wx;
    w.z = wz;
    w.mesh.root.position.set(wx, 0, wz);
    w.mesh.root.rotation.y = Math.atan2(stageX - wx, stageZ - wz);
    setEntitySpeech(w, type === 'FREEZE_POST' ? 'Zamarznie przy tym słupie...' : 'Patrzcie, co się dzieje...', 5.5);
  });

  const g1 = cutsceneState.guard1;
  const g2 = cutsceneState.guard2;

  if (type === 'EXECUTE') {
    g1.x = stageX - (g2 ? 0.75 : 0);
    g1.z = stageZ + 4.4;
    g1.mesh.root.position.set(g1.x, 0, g1.z);
    g1.mesh.root.rotation.y = Math.PI;
    g1.mesh.rightArm.rotation.x = -1.35;
    setEntitySpeech(g1, 'Pluton! Gotuj broń! Cel...', 2.2);

    if (g2) {
      g2.x = stageX + 0.75;
      g2.z = stageZ + 4.4;
      g2.mesh.root.position.set(g2.x, 0, g2.z);
      g2.mesh.root.rotation.y = Math.PI;
      g2.mesh.rightArm.rotation.x = -1.35;
    }

    prisoner.statusIcon = '💀';
    setEntitySpeech(prisoner, 'Litości! Nie strzelajcie!', 2.2);
    document.getElementById('cutscene-title').textContent = `🔫 EGZEKUCJA PRZED SZEREGIEM: ${prisoner.name.toUpperCase()}`;
    document.getElementById('cutscene-subtitle').textContent =
      `Strażnik ${g1.name}: „Za sabotaż i bunt wobec władzy obozowej... Pluton, gotuj broń! Cel...”`;
  } else if (type === 'BATON') {
    prisoner.statusIcon = '🏏';
    prisoner.mesh.torso.rotation.x = 0.55;
    setEntitySpeech(prisoner, 'Błagam, tylko nie baty!', 2.0);

    g1.x = stageX + 1.15;
    g1.z = stageZ + 0.35;
    g1.mesh.root.position.set(g1.x, 0, g1.z);
    g1.mesh.root.rotation.y = -Math.PI / 2;
    g1.mesh.rightArm.rotation.x = -2.4;

    const whipMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.08, 1.45, 6),
      new THREE.MeshStandardMaterial({ color: 0x1a110b })
    );
    whipMesh.position.set(0, -0.55, 0.35);
    whipMesh.rotation.x = 0.7;
    g1.mesh.rightArm.add(whipMesh);
    cutsceneState.whipMesh = whipMesh;

    setEntitySpeech(g1, 'Wymierzyć karę chłosty!', 2.0);
    document.getElementById('cutscene-title').textContent = `🏏 PUBLICZNA KARA CHŁOSTY (BICZOWANIE): ${prisoner.name.toUpperCase()}`;
    document.getElementById('cutscene-subtitle').textContent =
      `Strażnik ${g1.name}: „Za złamanie dyscypliny obozowej – kara publicznego biczowania pod słupem!”`;
  } else if (type === 'FREEZE_POST') {
    // SŁUP KARNY NA MROZIE: Więzień przywiązany do oblodzonego słupa drży z zimna na mrozie!
    prisoner.statusIcon = '🥶';
    setEntitySpeech(prisoner, 'Brrr... Z-zamarznę tu na śmierć!', 2.2);

    // Zaspa śnieżna i lód u stóp słupa
    const snowRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 1.25, 0.32, 12),
      new THREE.MeshStandardMaterial({ color: 0xd8eef8, roughness: 0.6 })
    );
    snowRing.position.set(stageX, 0.16, stageZ - 0.15);
    scene.add(snowRing);
    cutsceneState.tempMeshes.push(snowRing);

    g1.x = stageX + 1.75;
    g1.z = stageZ + 1.1;
    g1.mesh.root.position.set(g1.x, 0, g1.z);
    g1.mesh.root.rotation.y = -Math.PI * 0.65;
    g1.mesh.rightArm.rotation.x = -0.8;
    setEntitySpeech(g1, 'Rozkaz Naczelnika: stoisz pod słupem na mrozie!', 2.5);

    document.getElementById('cutscene-title').textContent = `🥶 SŁUP KARNY NA SIARCZYSTYM MROZIE: ${prisoner.name.toUpperCase()}`;
    document.getElementById('cutscene-subtitle').textContent =
      `Strażnik ${g1.name} przywiązał więźnia do słupa na mrozie (${state.temperature}°C). Więzień trzęsie się z zimna!`;
    playArcticWindSound();
  }

  document.getElementById('cutscene-overlay').classList.remove('hidden');
  playCutsceneGongSound();
}

// --- CUTSCENKA APELU OBOZOWEGO (WIĘŹNIOWIE STOJĄ W SZEREGACH I SŁUCHAJĄ, A GRACZ PRZEMAWIA Z TRYBUNY!) ---
function startRollCallCutscene(speechType) {
  if (cutsceneState.active) finishCutscene();
  closePanel();
  closeCrimeModal();
  closeSpeechModal();

  cutsceneState.savedCam = {
    targetX: cameraCtrl.target.x,
    targetZ: cameraCtrl.target.z,
    distance: cameraCtrl.distance,
    angleH: cameraCtrl.angleH,
    angleV: cameraCtrl.angleV
  };

  const stageX = ZONES.ROLLCALL.x;
  const stageZ = ZONES.ROLLCALL.z;
  cutsceneState.active = true;
  cutsceneState.type = 'ROLLCALL';
  cutsceneState.speechType = speechType;
  cutsceneState.speechApplied = false;
  cutsceneState.prisoner = null;
  cutsceneState.timer = 0;
  cutsceneState.shotFired = false;
  cutsceneState.strikesDone = 0;
  cutsceneState.shake = 0;
  cutsceneState.stageX = stageX;
  cutsceneState.stageZ = stageZ;
  cutsceneState.tempMeshes = [];

  if (state.guards.length === 0) spawnGuard('ROLLCALL');
  cutsceneState.guard1 = state.guards[0];
  cutsceneState.guard2 = state.guards.length > 1 ? state.guards[1] : null;

  const g1 = cutsceneState.guard1;
  const g2 = cutsceneState.guard2;
  const podiumZ = ZONES.ROLLCALL.z - ZONES.ROLLCALL.d / 2 + 1.4;

  // Gracz (jako Naczelnik Obozu) stoi wysoko na czerwonej trybunie z megafonem w dłoni!
  g1.x = stageX;
  g1.z = podiumZ;
  g1.mesh.root.position.set(stageX, 1.1, podiumZ);
  g1.mesh.root.rotation.set(0, 0, 0);
  g1.mesh.rightArm.rotation.x = -1.9;

  // Dodaj megafon 3D do ręki przemawiającego na trybunie
  const megaMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.65, 10),
    new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.6 })
  );
  megaMesh.position.set(0, -0.45, 0.32);
  megaMesh.rotation.x = Math.PI / 2;
  g1.mesh.rightArm.add(megaMesh);
  cutsceneState.whipMesh = megaMesh;

  if (g2) {
    g2.x = stageX - 2.6;
    g2.z = podiumZ + 0.5;
    g2.mesh.root.position.set(g2.x, 0, g2.z);
    g2.mesh.root.rotation.set(0, 0, 0);
  }

  // Oświetlenie trybuny i szeregów
  const spot = new THREE.PointLight(0xfff0cc, 2.5, 28);
  spot.position.set(stageX, 6.5, stageZ);
  scene.add(spot);
  cutsceneState.tempMeshes.push(spot);

  // Ustaw wszystkich zdrowych więźniów w równych szeregach twarzą do trybuny Naczelnika!
  cutsceneState.witnesses = state.prisoners.filter(p => !p.inHospital);
  cutsceneState.witnesses.forEach((w, idx) => {
    ensureStandingPosture(w);
    w.carrying = false;
    w.mesh.carriedBox.visible = false;
    w.mesh.toolMesh.visible = false;
    const col = idx % 7;
    const row = Math.floor(idx / 7);
    const wx = stageX - 5.4 + col * 1.8;
    const wz = stageZ - 1.2 + row * 1.75;
    w.x = wx;
    w.z = wz;
    w.mesh.root.position.set(wx, 0, wz);
    w.mesh.root.rotation.set(0, Math.PI, 0); // Patrzą prosto na trybunę!
    w.statusIcon = '📢';
    setEntitySpeech(w, 'Baczność! Naczelnik przemawia...', 2.2);
  });

  const speechLines = {
    MOTIVATE: {
      title: '📢 APEL OBOZOWY: PRZEMÓWIENIE MOTYWACYJNE NACZELNIKA',
      commanderSay: '📢 „Uczciwa praca drogą do przedterminowego zwolnienia!”',
      sub: 'Naczelnik z trybuny: „Więźniowie Jercewa! Kto wyrabia 100% i 125% normy, ten otrzyma Trzeci Kocioł i skrócenie wyroku!”'
    },
    TERROR: {
      title: '📢 APEL OBOZOWY: GROŹBA TERRORU I SĄDU OBOZOWEGO',
      commanderSay: '📢 „Za sabotaż i odmowę pracy – karcer lub kula w łeb!”',
      sub: 'Naczelnik z trybuny: „Każdy przejaw buntu, samookaleczenia lub sabotażu na Lesopowale będzie karany bez litości!”'
    },
    REWARD: {
      title: '📢 APEL OBOZOWY: WYDANIE MACHORKI I GORĄCEJ KASZY (45 ₽)',
      commanderSay: '📢 „Wydać wszystkim dodatkową chochlę kaszy i machorkę!”',
      sub: 'Naczelnik z trybuny: „Za trud na mrozie zarządzam wydanie gorącej kaszy ze słoniną oraz paczek machorki dla wszystkich brygad!”'
    },
    SEARCH: {
      title: '📢 APEL OBOZOWY: GENERALNA REWIZJA SZEREGÓW NA PLACU',
      commanderSay: '📢 „Straż! Przeszukać szeregi i skonfiskować kontrabandę!”',
      sub: 'Naczelnik z trybuny: „Stać w szeregu bez ruchu! Wartownicy przeprowadzą rewizję osobistą każdego więźnia!”'
    }
  };

  const info = speechLines[speechType] || speechLines.MOTIVATE;
  setEntitySpeech(g1, info.commanderSay, 3.2);
  document.getElementById('cutscene-title').textContent = info.title;
  document.getElementById('cutscene-subtitle').textContent = info.sub;
  document.getElementById('cutscene-overlay').classList.remove('hidden');
  playRollCallHornSound();
}

function triggerScreenFlash() {
  const fl = document.getElementById('cutscene-flash');
  if (!fl) return;
  fl.style.opacity = '0.85';
  setTimeout(() => { fl.style.opacity = '0'; }, 95);
}

function updatePunishmentCutscene(dt) {
  if (!cutsceneState.active) return;
  cutsceneState.timer += dt;
  const t = cutsceneState.timer;
  const p = cutsceneState.prisoner;
  const g1 = cutsceneState.guard1;
  const g2 = cutsceneState.guard2;
  const sx = cutsceneState.stageX;
  const sz = cutsceneState.stageZ;

  // Płynny najazd kamery 3D z bliska i lekki obrót filmowy wokół sceny
  const isRollCall = cutsceneState.type === 'ROLLCALL';
  const targetDist = isRollCall ? 18.5 : 14.5;
  const targetAngleV = isRollCall ? 1.05 : 1.12;
  const targetAngleH = isRollCall ? (-0.35 + t * 0.14) : (0.55 + t * 0.14);

  cameraCtrl.target.x += (sx - cameraCtrl.target.x) * Math.min(1, dt * 6);
  cameraCtrl.target.z += ((sz + 1.0) - cameraCtrl.target.z) * Math.min(1, dt * 6);
  cameraCtrl.distance += (targetDist - cameraCtrl.distance) * Math.min(1, dt * 5);
  cameraCtrl.angleV += (targetAngleV - cameraCtrl.angleV) * Math.min(1, dt * 5);
  cameraCtrl.angleH = targetAngleH;

  if (cutsceneState.shake > 0) {
    cutsceneState.shake = Math.max(0, cutsceneState.shake - dt * 2.8);
    cameraCtrl.target.x += (Math.random() - 0.5) * cutsceneState.shake;
    cameraCtrl.target.z += (Math.random() - 0.5) * cutsceneState.shake;
  }
  updateCameraTransform();

  // --- 1. LOGIKA CUTSCENKI ROZSTRZELANIA (EXECUTE) ---
  if (cutsceneState.type === 'EXECUTE') {
    if (t < 2.1) {
      p.mesh.root.position.x = sx + Math.sin(t * 35) * 0.05;
    } else if (!cutsceneState.shotFired) {
      cutsceneState.shotFired = true;
      cutsceneState.shake = 0.9;
      playGunshotSound();
      triggerScreenFlash();
      cutsceneState.muzzleLight.intensity = 6.0;

      spawnBurstParticles(g1.x, 1.35, g1.z - 0.8, 0xffaa00, 14);
      spawnBurstParticles(g1.x, 1.45, g1.z - 1.1, 0xcccccc, 10);
      if (g2) {
        spawnBurstParticles(g2.x, 1.35, g2.z - 0.8, 0xffaa00, 14);
        spawnBurstParticles(g2.x, 1.45, g2.z - 1.1, 0xcccccc, 10);
      }

      g1.mesh.rightArm.rotation.x = -1.75;
      if (g2) g2.mesh.rightArm.rotation.x = -1.75;
      setEntitySpeech(g1, 'PAL!', 2.5);

      spawnBurstParticles(sx, 1.15, sz, 0xcc0000, 26);
      const bloodPool = new THREE.Mesh(
        new THREE.CircleGeometry(0.95, 14),
        new THREE.MeshBasicMaterial({ color: 0x7a0909 })
      );
      bloodPool.rotation.x = -Math.PI / 2;
      bloodPool.position.set(sx, 0.04, sz + 0.45);
      scene.add(bloodPool);
      cutsceneState.tempMeshes.push(bloodPool);

      p.hp = 0;
      p.speechBubble = '';
      updateOverheadSprite(p);

      cutsceneState.witnesses.forEach((w, i) => {
        setEntitySpeech(w, i % 2 === 0 ? 'Boże, rozstrzelali go!' : 'Lepiej wyrabiać 100% normy...', 4.0);
      });

      document.getElementById('cutscene-subtitle').textContent =
        `💥 SALWA! Wyrok wykonano. Cały obóz zamarł z przerażenia (+100% posłuszeństwa wszystkich więźniów).`;
    } else {
      cutsceneState.muzzleLight.intensity = Math.max(0, cutsceneState.muzzleLight.intensity - dt * 18);
      const fallProgress = Math.min(1, (t - 2.1) * 3.2);
      p.mesh.root.rotation.x = fallProgress * (Math.PI / 2);
      p.mesh.root.position.y = fallProgress * 0.22;
    }

    if (t >= 5.3) {
      finishCutscene();
    }
  }

  // --- 2. LOGIKA CUTSCENKI BICZOWANIA / CHŁOSTY (BATON) ---
  else if (cutsceneState.type === 'BATON') {
    const strikeTimes = [1.25, 2.15, 3.05, 3.95];
    const cries = [
      'Ała! [Cios 1/4]',
      'Litości, Naczelniku! [Cios 2/4]',
      'Będę już wyrabiać normę! [Cios 3/4]',
      'Dosyć, przysięgam posłuszeństwo! [Cios 4/4]'
    ];

    if (cutsceneState.strikesDone < strikeTimes.length && t >= strikeTimes[cutsceneState.strikesDone]) {
      const idx = cutsceneState.strikesDone;
      cutsceneState.strikesDone++;
      cutsceneState.shake = 0.42;

      playWhipCrackSound();
      g1.mesh.rightArm.rotation.x = 0.45;
      p.mesh.torso.rotation.x = 0.85;
      p.mesh.root.position.x = sx - 0.14;
      spawnBurstParticles(sx, 1.1, sz, 0xcc1111, 10);

      p.hp = Math.max(0, p.hp - 5.5);
      p.obedience = Math.min(100, p.obedience + 12);
      if (p.hp <= 0) {
        setEntitySpeech(p, 'Ugh... [Zmarł podczas chłosty]', 2.5);
        p.mesh.root.rotation.x = Math.PI / 2;
        p.mesh.root.position.y = 0.22;
      } else {
        setEntitySpeech(p, cries[idx], 1.5);
      }
      updateOverheadSprite(p);

      document.getElementById('cutscene-subtitle').textContent =
        `💥 SMAGNIĘCIE BATEM (${cutsceneState.strikesDone}/4)! ${p.name}: „${p.hp <= 0 ? 'Więzień nie wytrzymał razów i skonał pod słupem!' : cries[idx]}” (HP: ${Math.round(p.hp)}, Posłuszeństwo: ${Math.round(p.obedience)}%)`;
    } else {
      g1.mesh.rightArm.rotation.x += (-2.3 - g1.mesh.rightArm.rotation.x) * Math.min(1, dt * 6);
      if (p.hp > 0) {
        p.mesh.torso.rotation.x += (0.55 - p.mesh.torso.rotation.x) * Math.min(1, dt * 7);
        p.mesh.root.position.x += (sx - p.mesh.root.position.x) * Math.min(1, dt * 8);
      }
    }

    if (t >= 4.4 && t < 4.55) {
      setEntitySpeech(g1, p.hp <= 0 ? 'Zabierzcie ciało spod słupa!' : 'Wracaj do brygady!', 2.0);
    }

    if (t >= 5.3) {
      finishCutscene();
    }
  }

  // --- 3. LOGIKA CUTSCENKI SŁUPA NA MROZIE (FREEZE_POST – DRŻENIE Z ZIMNA!) ---
  else if (cutsceneState.type === 'FREEZE_POST') {
    const freezeTicks = [1.1, 2.2, 3.3, 4.3];
    const freezeCries = [
      'Brrr... Nie czuję już palców u rąk! [Mróz 1/4]',
      'Z-zamarzam! Litości, odwiążcie mnie! [Mróz 2/4]',
      'S-serce mi staje z zimna... [Mróz 3/4]',
      'Będę posłuszny, tylko puśćcie do baraku! [Mróz 4/4]'
    ];

    if (p.hp > 0) {
      // Intensywne drżenie całego ciała więźnia przy słupie z zimna!
      p.mesh.root.position.x = sx + Math.sin(t * 58) * 0.085;
      p.mesh.root.position.z = sz + Math.cos(t * 52) * 0.04;
      p.mesh.torso.rotation.z = Math.sin(t * 46) * 0.14;
      p.mesh.torso.rotation.x = 0.22 + Math.sin(t * 36) * 0.06;
      p.mesh.leftArm.rotation.x = -0.9 + Math.sin(t * 54) * 0.18;
      p.mesh.rightArm.rotation.x = -0.9 - Math.sin(t * 54) * 0.18;

      // Para z ust i zamieć śnieżna wokół więźnia
      if (Math.random() < 0.35) {
        spawnBurstParticles(sx, 1.55, sz + 0.2, 0xd8f2ff, 2);
      }
    }

    if (cutsceneState.strikesDone < freezeTicks.length && t >= freezeTicks[cutsceneState.strikesDone]) {
      const idx = cutsceneState.strikesDone;
      cutsceneState.strikesDone++;
      cutsceneState.shake = 0.25;
      playArcticWindSound();

      spawnBurstParticles(sx, 1.3, sz, 0x88ddff, 12);
      p.warmth = Math.max(0, p.warmth - 9);
      p.hp = Math.max(0, p.hp - 4.5);
      p.obedience = Math.min(100, p.obedience + 13);

      if (p.hp <= 0) {
        setEntitySpeech(p, 'Z-zamarzł na śmierć...', 2.5);
        p.mesh.root.rotation.x = Math.PI / 2;
        p.mesh.root.position.y = 0.22;
      } else {
        setEntitySpeech(p, freezeCries[idx], 1.5);
      }
      updateOverheadSprite(p);

      document.getElementById('cutscene-subtitle').textContent =
        `❄️ SIARCZYSTY MRÓZ (${cutsceneState.strikesDone}/4)! ${p.name}: „${p.hp <= 0 ? 'Więzień zamarzł na śmierć przy słupie!' : freezeCries[idx]}” (HP: ${Math.round(p.hp)}, Ciepło: ${Math.round(p.warmth)}%)`;
    }

    if (t >= 5.2) {
      finishCutscene();
    }
  }

  // --- 4. LOGIKA CUTSCENKI APELU OBOZOWEGO (ROLLCALL – SZEREGI SŁUCHAJĄ GRACZA!) ---
  else if (cutsceneState.type === 'ROLLCALL') {
    const sType = cutsceneState.speechType;
    // Naczelnik gestykuluje na trybunie z megafonem
    if (g1) {
      g1.mesh.rightArm.rotation.x = -1.9 + Math.sin(t * 9) * 0.25;
    }

    if (t >= 2.2 && !cutsceneState.speechApplied) {
      cutsceneState.speechApplied = true;
      const dur = 10 + ZONES.ROLLCALL.level * 2;

      if (sType === 'MOTIVATE') {
        state.speechBuff = { type: sType, name: 'Motywacja (+20% pracy)', workMult: 1.2, crimeMult: 0.85, hoursLeft: dur };
        addLog(`📢 APEL: Wygłoszono przemówienie motywacyjne z trybuny (+20% wydajności pracy przez ${dur}h)!`, 'good');
        cutsceneState.witnesses.forEach((w, i) => {
          w.obedience = Math.min(100, w.obedience + 12);
          const msg = w.faction === 'URKA' ? 'Gadaj zdrów, naczelniku...' : (i % 2 === 0 ? 'Wyrobimy 100% normy!' : 'Byle do przedterminowego zwolnienia!');
          setEntitySpeech(w, msg, 4.0);
        });
        document.getElementById('cutscene-subtitle').textContent =
          `🚩 Szeregi odpowiadają: „Wyrobimy normę!” Tempo pracy wszystkich brygad wzrasta o +20% przez ${dur}h!`;
      } else if (sType === 'TERROR') {
        playGunshotSound();
        triggerScreenFlash();
        cutsceneState.shake = 0.6;
        state.speechBuff = { type: sType, name: 'Żelazna Dyscyplina (-70% przestępstw)', workMult: 1.15, crimeMult: 0.3, hoursLeft: dur };
        addLog(`📢 APEL: Zagrożono trybunałem i kulą w łeb za sabotaż. Posłuszeństwo wzrosło o +35%!`, 'warn');
        cutsceneState.witnesses.forEach((w, i) => {
          w.obedience = Math.min(100, w.obedience + 35);
          setEntitySpeech(w, i % 2 === 0 ? 'Nie strzelajcie! Będziemy tyrać!' : 'Lepiej nie podpadać strażnikom...', 4.0);
        });
        document.getElementById('cutscene-subtitle').textContent =
          `💀 Strzał ostrzegawczy w powietrze! Więźniowie drżą w szeregach (-70% przestępstw przez ${dur}h, +35% posłuszeństwa)!`;
      } else if (sType === 'REWARD') {
        state.speechBuff = { type: sType, name: 'Premia Stachanowska (+30% pracy)', workMult: 1.3, crimeMult: 0.5, hoursLeft: dur };
        addLog(`📢 APEL: Rozdano machorkę i dodatkową kaszę! Więźniowie wiwatują (+30% tempa pracy, +15 HP, +30% sytości)!`, 'good');
        cutsceneState.witnesses.forEach(w => {
          w.hp = Math.min(w.maxHp, w.hp + 15);
          w.warmth = Math.min(100, w.warmth + 25);
          w.nutrition = Math.min(100, w.nutrition + 30);
          spawnBurstParticles(w.x, 1.8, w.z, 0x2ecc71, 4);
          setEntitySpeech(w, 'Ura! Gorąca kasza i machorka!', 4.5);
        });
        document.getElementById('cutscene-subtitle').textContent =
          `🍲 Szeregi wiwatują! Wszyscy otrzymują gorącą kaszę i machorkę (+30% pracy, +15 HP, +25% ciepła, +30% sytości)!`;
      } else if (sType === 'SEARCH') {
        const foundMoney = 55 + ZONES.ROLLCALL.level * 8;
        state.money += foundMoney;
        addLog(`🔍 APEL: Przeprowadzono rewizję szeregów na placu. Skonfiskowano ukryte ruble (+${foundMoney} ₽)!`, 'info');
        cutsceneState.witnesses.forEach((w, i) => {
          w.obedience = Math.min(100, w.obedience + 20);
          spawnBurstParticles(w.x, 1.5, w.z, 0xf1c40f, 4);
          setEntitySpeech(w, i % 2 === 0 ? 'Zabrali nawet ostatni tytoń...' : 'Wszystko wytrzepali z waciaka!', 4.0);
        });
        document.getElementById('cutscene-subtitle').textContent =
          `🔍 Strażnicy przeszukali szeregi więźniów! Skonfiskowano ukryte kosztowności i ruble (+${foundMoney} ₽ do budżetu)!`;
      }
    }

    // Animacje reakcji więźniów w szeregach po przemówieniu Naczelnika
    if (t >= 2.2) {
      cutsceneState.witnesses.forEach((w, idx) => {
        if (sType === 'MOTIVATE') {
          w.mesh.rightArm.rotation.x = -2.2 + Math.sin(t * 12 + idx) * 0.25;
        } else if (sType === 'TERROR') {
          w.mesh.root.position.x = w.x + Math.sin(t * 48 + idx) * 0.055;
          w.mesh.torso.rotation.x = 0.25;
        } else if (sType === 'REWARD') {
          w.mesh.root.position.y = Math.abs(Math.sin(t * 12 + idx)) * 0.22;
          w.mesh.leftArm.rotation.x = -2.3;
          w.mesh.rightArm.rotation.x = -2.3;
        } else if (sType === 'SEARCH') {
          w.mesh.leftArm.rotation.x = -2.6;
          w.mesh.rightArm.rotation.x = -2.6;
        }
      });
    }

    if (t >= 5.2) {
      finishCutscene();
    }
  }
}

function skipCutscene() {
  if (cutsceneState.active) {
    finishCutscene();
  }
}

function finishCutscene() {
  if (!cutsceneState.active) return;
  const type = cutsceneState.type;
  const p = cutsceneState.prisoner;
  const g1 = cutsceneState.guard1;
  const g2 = cutsceneState.guard2;

  cutsceneState.tempMeshes.forEach(m => scene.remove(m));
  cutsceneState.tempMeshes = [];

  if (cutsceneState.whipMesh && g1) {
    g1.mesh.rightArm.remove(cutsceneState.whipMesh);
    cutsceneState.whipMesh = null;
  }

  if (g1) {
    g1.mesh.rightArm.rotation.x = 0;
    g1.mesh.root.position.y = 0;
    g1.navPath = null;
  }
  if (g2) {
    g2.mesh.rightArm.rotation.x = 0;
    g2.mesh.root.position.y = 0;
    g2.navPath = null;
  }
  if (p) {
    p.navPath = null;
  }

  // Przywróć postawę wszystkich świadków i zresetuj ich ścieżki po teleportacji na apel
  cutsceneState.witnesses.forEach(w => {
    w.mesh.root.position.set(w.x, 0, w.z);
    w.mesh.torso.rotation.set(0, 0, 0);
    w.mesh.leftArm.rotation.x = 0;
    w.mesh.rightArm.rotation.x = 0;
    w.navPath = null;
  });
  state.navVersion = (state.navVersion || 1) + 1;

  cutsceneState.active = false;

  if (type === 'EXECUTE') {
    const idx = state.prisoners.indexOf(p);
    if (idx !== -1) {
      state.deaths++;
      scene.remove(p.mesh.root);
      state.prisoners.splice(idx, 1);
    }
    state.crimeReports = state.crimeReports.filter(r => r.prisonerId !== p.id);
    state.prisoners.forEach(other => {
      other.obedience = 100;
      other.disobeyTimer = 0;
    });
    if (state.selectedEntity === p) state.selectedEntity = null;
    addLog(`🔫 EGZEKUCJA WYKONANA: Więzień ${p.name} został rozstrzelany przed szeregiem. Posłuszeństwo w obozie: 100%!`, 'danger');
  } else if (type === 'BATON') {
    const remainingStrikes = 4 - cutsceneState.strikesDone;
    if (remainingStrikes > 0) {
      p.hp = Math.max(0, p.hp - remainingStrikes * 5.5);
      p.obedience = Math.min(100, p.obedience + remainingStrikes * 12);
    }
    p.mesh.torso.rotation.set(0, 0, 0);
    p.mesh.root.rotation.set(0, 0, 0);
    p.mesh.root.position.y = 0;
    updateOverheadSprite(p);

    if (p.hp <= 0) {
      const idx = state.prisoners.indexOf(p);
      if (idx !== -1) {
        state.deaths++;
        spawnBurstParticles(p.x, 0.8, p.z, 0x222222, 8);
        scene.remove(p.mesh.root);
        state.prisoners.splice(idx, 1);
      }
      state.crimeReports = state.crimeReports.filter(r => r.prisonerId !== p.id);
      if (state.selectedEntity === p) state.selectedEntity = null;
      addLog(`💀 ŚMIERĆ PODCZAS KARY: Więzień ${p.name} miał za mało zdrowia i zmarł podczas chłosty pod słupem!`, 'danger');
    } else {
      addLog(`🏏 CHŁOSTA WYKONANA: Więzień ${p.name} otrzymał baty na Placu Apelowym (Pozostało HP: ${Math.round(p.hp)}, Posłuszeństwo: ${Math.round(p.obedience)}%).`, 'warn');
      if (p.hp < 10 && !p.neverHospital && !p.inHospital) {
        p.inHospital = true;
        const totalHealHours = Math.max(4, 13 - ZONES.INFIRMARY.level);
        p.hospitalHoursLeft = totalHealHours;
        setEntitySpeech(p, `Zostało mi ${Math.round(p.hp)} HP! Idę do szpitala!`, 6.0);
        addLog(`🏥 PO KARZE DO SZPITALA: Kara więźnia ${p.name} dobiegła końca (zostało mu ${Math.round(p.hp)} HP < 10 HP) – trafia teraz do Szpitala na ${totalHealHours}h!`, 'warn');
      }
    }
  } else if (type === 'FREEZE_POST') {
    const remainingTicks = 4 - cutsceneState.strikesDone;
    if (remainingTicks > 0) {
      p.warmth = Math.max(0, p.warmth - remainingTicks * 9);
      p.hp = Math.max(0, p.hp - remainingTicks * 4.5);
      p.obedience = Math.min(100, p.obedience + remainingTicks * 13);
    }
    p.mesh.torso.rotation.set(0, 0, 0);
    p.mesh.root.rotation.set(0, 0, 0);
    p.mesh.root.position.set(p.x, 0, p.z);
    updateOverheadSprite(p);

    if (p.hp <= 0) {
      const idx = state.prisoners.indexOf(p);
      if (idx !== -1) {
        state.deaths++;
        spawnBurstParticles(p.x, 0.8, p.z, 0x88ddff, 10);
        scene.remove(p.mesh.root);
        state.prisoners.splice(idx, 1);
      }
      state.crimeReports = state.crimeReports.filter(r => r.prisonerId !== p.id);
      if (state.selectedEntity === p) state.selectedEntity = null;
      addLog(`💀 ZAMARZŁ POD SŁUPEM: Więzień ${p.name} nie wytrzymał mrozu podczas kary pod słupem i zamarzł na śmierć!`, 'danger');
    } else {
      addLog(`🥶 SŁUP KARNY NA MROZIE: Więzień ${p.name} stoi i trzęsie się z zimna pod słupem (HP: ${Math.round(p.hp)}, Ciepło: ${Math.round(p.warmth)}%).`, 'danger');
    }
  } else if (type === 'ROLLCALL') {
    // Jeśli gracz pominął cutscenkę apelu przed 2.2s, zaaplikuj efekt przemówienia teraz
    if (!cutsceneState.speechApplied) {
      cutsceneState.timer = 2.3;
      cutsceneState.active = true;
      updatePunishmentCutscene(0.01);
      cutsceneState.active = false;
    }
  }

  // Przywróć kamerę (stały kąt 45 stopni i lekko do góry, bez obracania)
  if (cutsceneState.savedCam) {
    cameraCtrl.target.set(cutsceneState.savedCam.targetX, 2.0, cutsceneState.savedCam.targetZ);
    cameraCtrl.distance = cutsceneState.savedCam.distance;
    cameraCtrl.angleH = 0;
    cameraCtrl.angleV = Math.PI / 4;
    updateCameraTransform();
  }

  document.getElementById('cutscene-overlay').classList.add('hidden');
  updateHUD();
  renderInspector();
  if (state.activePanel) renderActivePanel();
}

// ============================================================================
// APELE OBOZOWE I PRZEMÓWIENIA NACZELNIKA (Z CUTSCENKĄ 3D!)
// ============================================================================
function openRollCallModal() {
  state.schedule[state.hour] = 'ROLLCALL';
  updateScheduleStripUI();

  const modal = document.getElementById('speech-modal');
  const body = document.getElementById('speech-modal-body');
  modal.classList.remove('hidden');

  body.innerHTML = `
    <p style="color:#ccc; margin-bottom:10px;">
      Więźniowie ustawiają się w szeregach na Placu Apelowym przed trybuną. Wybierz, co chcesz im ogłosić (uruchomi się <b>Cutscenka 3D Apelu</b>):
    </p>
    <div style="display:flex; flex-direction:column; gap:8px;">
      <div class="info-box" style="margin:0;">
        <h4>🚩 1. „Uczciwa praca drogą do przedterminowego zwolnienia!”</h4>
        <p>Motywacyjne przemówienie z trybuny. Brygady pracują o <b>+20% wydajniej</b> oraz zyskują +12% posłuszeństwa.</p>
        <button class="action-btn green" onclick="deliverSpeech('MOTIVATE')">🎬 Wygłoś przemówienie motywacyjne (Cutscenka 3D)</button>
      </div>
      <div class="info-box" style="margin:0;">
        <h4>💀 2. „Za niewyrobienie normy i sabotaż – karcer lub kula w łeb!”</h4>
        <p>Przemówienie grozy z wystrzałem ostrzegawczym. Obniża przestępstwa o <b>-70%</b> i daje +35% posłuszeństwa.</p>
        <button class="action-btn" onclick="deliverSpeech('TERROR')">🎬 Wygłoś groźbę terroru (Cutscenka 3D)</button>
      </div>
      <div class="info-box" style="margin:0;">
        <h4>🍲 3. „Podwójna porcja gorącej kaszy i machorka dla wszystkich!” (Koszt: 45 ₽)</h4>
        <p>Wszyscy więźniowie zyskują <b>+30% tempa pracy</b>, +15 HP, +25% ciepła oraz <b>+30% sytości (przeciw głodowi 🍖)</b>!</p>
        <button class="action-btn warn" ${state.money < 45 ? 'disabled' : ''} onclick="deliverSpeech('REWARD')">🎬 Wydaj kaszę i machorkę – 45 ₽ (Cutscenka 3D)</button>
      </div>
      <div class="info-box" style="margin:0;">
        <h4>🔍 4. „Rewizja generalna szeregów na placu!”</h4>
        <p>Strażnicy przeszukują ubrania wszystkich więźniów. Konfiskata ukrytych rubli (<b>+${55 + ZONES.ROLLCALL.level * 8} ₽ do budżetu</b>).</p>
        <button class="action-btn secondary" onclick="deliverSpeech('SEARCH')">🎬 Zarządź rewizję na placu (Cutscenka 3D)</button>
      </div>
    </div>
  `;
}

function closeSpeechModal() {
  document.getElementById('speech-modal').classList.add('hidden');
}

function deliverSpeech(type) {
  closeSpeechModal();
  if (type === 'REWARD') {
    if (state.money < 45) return;
    state.money -= 45;
  }
  startRollCallCutscene(type);
  updateHUD();
}

// ============================================================================
// ANIMACJA PRZYJAZDU POCIĄGU ETAPOWEGO I WYCHODZENIA WIĘŹNIÓW
// ============================================================================
function startPrisonerTransportAnimation(factionsList) {
  state.transportAnim.active = true;
  state.transportAnim.phase = 'ARRIVING';
  state.transportAnim.xPos = -145;
  state.transportAnim.timer = 0;
  state.transportAnim.pendingPrisoners = [...factionsList];
  passengerTrainGroup.position.x = -145;

  cameraCtrl.target.set(ZONES.TRAIN_DOCK.x, 0, ZONES.TRAIN_DOCK.z - 8);
  updateCameraTransform();
  addLog(`🚂 Pociąg etapowy zbliża się do stacji kolejowej z nowymi więźniami (${factionsList.length} os.)!`, 'info');
}

function updateTransportTrainAnimation(dt) {
  if (!state.transportAnim.active) return;
  const anim = state.transportAnim;
  const railZ = ZONES.TRAIN_DOCK.z + 7.3;

  if (Math.random() < 0.35) {
    spawnBurstParticles(passengerTrainGroup.position.x + 11, 3.6, railZ, 0xdddddd, 2);
  }

  if (anim.phase === 'ARRIVING') {
    anim.xPos += dt * 38;
    passengerTrainGroup.position.x = anim.xPos;
    if (anim.xPos >= ZONES.TRAIN_DOCK.x) {
      anim.xPos = ZONES.TRAIN_DOCK.x;
      passengerTrainGroup.position.x = anim.xPos;
      anim.phase = 'UNLOADING';
      anim.timer = 0.6;
      addLog(`🚃 Pociąg etapowy zatrzymał się na rampie. Strażnicy otwierają drzwi wagonu „Tiepłuszka”!`, 'good');
    }
  } else if (anim.phase === 'UNLOADING') {
    anim.timer -= dt;
    if (anim.timer <= 0 && anim.pendingPrisoners.length > 0) {
      const entry = anim.pendingPrisoners.shift();
      const spawnPos = {
        x: passengerTrainGroup.position.x + (Math.random() - 0.5) * 4,
        z: ZONES.TRAIN_DOCK.z + 2.5
      };
      let p;
      if (entry && typeof entry === 'object' && entry.isSubmissiveSpecial) {
        p = spawnPrisoner(entry.faction, entry.job, spawnPos, entry.name, entry);
        setEntitySpeech(p, `Jestem ${entry.name} (${entry.shirtLabel})!`, 6.5);
        addLog(`👕 Z Pociągu Uległych wyszedł: ${p.name} ubrany w ${entry.shirtLabel}!`, 'warn');
      } else {
        p = spawnPrisoner(entry, null, spawnPos);
        setEntitySpeech(p, 'Gdzie nas wywieźli?!', 6.0);
      }
      anim.timer = 0.75;
      updateHUD();
      if (state.activePanel === 'prisoners') renderActivePanel();
    } else if (anim.pendingPrisoners.length === 0 && anim.timer <= -0.5) {
      anim.phase = 'DEPARTING';
      addLog(`🚂 Wszyscy więźniowie z etapu wyładowani – kolumna maszeruje na Plac Apelowy, pociąg odjeżdża.`, 'info');
    }
  } else if (anim.phase === 'DEPARTING') {
    anim.xPos += dt * 42;
    passengerTrainGroup.position.x = anim.xPos;
    if (anim.xPos > 165) {
      anim.active = false;
      anim.phase = 'NONE';
      if (state.pendingAutoUrkaTransports && state.pendingAutoUrkaTransports > 0) {
        state.pendingAutoUrkaTransports--;
        triggerAutoUrkaTransport();
      }
    }
  }
}

function triggerAutoUrkaTransport() {
  if (state.transportAnim.active) {
    state.pendingAutoUrkaTransports = (state.pendingAutoUrkaTransports || 0) + 1;
    return;
  }
  const urkaCount = 8;
  const neededBeds = (state.prisoners.length + urkaCount) - getPrisonerCapacity();
  if (neededBeds > 0) {
    state.extraBarrackBeds += neededBeds;
  }
  state.money += 180;
  addLog(`🚂 AUTOMATYCZNY ETAP CO 3 DNI (Dzień ${state.day}): Z Centrali Gułagu przyjechał przymusowy transport 8 Urków („Błatnych” • Dotacja: +180 ₽)!`, 'danger');
  startPrisonerTransportAnimation(Array(urkaCount).fill('URKA'));
  updateHUD();
  if (state.activePanel === 'transport') renderActivePanel();
}

// ============================================================================
// TRYB BUDOWANIA NOWYCH OBIEKTÓW 3D ORAZ PRZESUWANIA BUDYNKÓW NA MAPIE
// ============================================================================
function startBuildMode(typeId) {
  const b = BUILDABLES[typeId];
  if (!b) return;
  if (state.money < b.costMoney || state.wood < b.costWood) {
    addLog(`⚠️ Za mało zasobów na budowę: ${b.name}!`, 'warn');
    return;
  }

  state.moveMode.active = false;
  state.moveMode.zoneKey = null;
  state.buildMode.active = true;
  state.buildMode.typeId = typeId;
  closePanel();

  if (buildGhostMesh) scene.remove(buildGhostMesh);
  const ghostGeo = new THREE.BoxGeometry(b.w, 2.5, b.d);
  const ghostMat = new THREE.MeshBasicMaterial({ color: 0x2ecc71, transparent: true, opacity: 0.45 });
  buildGhostMesh = new THREE.Mesh(ghostGeo, ghostMat);
  buildGhostMesh.position.set(cameraCtrl.target.x, 1.25, cameraCtrl.target.z);
  scene.add(buildGhostMesh);

  const banner = document.getElementById('build-mode-banner');
  document.getElementById('build-mode-text').textContent =
    `🧱 TRYB BUDOWY: ${b.name} (${b.costMoney} ₽, ${b.costWood} drewna) – Dotknij / kliknij LPM na mapie, aby postawić`;
  banner.classList.remove('hidden');
}

function startMoveBuildingMode(zoneKey) {
  const z = ZONES[zoneKey];
  if (!z) return;

  state.buildMode.active = false;
  state.buildMode.typeId = null;
  state.moveMode.active = true;
  state.moveMode.zoneKey = zoneKey;
  closePanel();

  if (buildGhostMesh) scene.remove(buildGhostMesh);
  const ghostGeo = new THREE.BoxGeometry(z.w || 8, 2.8, z.d || 8);
  const ghostMat = new THREE.MeshBasicMaterial({ color: 0xf1c40f, transparent: true, opacity: 0.5 });
  buildGhostMesh = new THREE.Mesh(ghostGeo, ghostMat);
  buildGhostMesh.position.set(z.x, 1.4, z.z);
  scene.add(buildGhostMesh);

  const banner = document.getElementById('build-mode-banner');
  document.getElementById('build-mode-text').textContent =
    `✋ PRZESUWANIE BUDYNKU: ${z.icon || '🏗️'} ${z.name} – Dotknij / kliknij nowe miejsce na mapie, aby przestawić!`;
  banner.classList.remove('hidden');
}

function cancelBuildMode() {
  state.buildMode.active = false;
  state.buildMode.typeId = null;
  state.moveMode.active = false;
  state.moveMode.zoneKey = null;
  if (buildGhostMesh) {
    scene.remove(buildGhostMesh);
    buildGhostMesh = null;
  }
  document.getElementById('build-mode-banner').classList.add('hidden');
}

// Sprawdza, czy w miejscu (x, z) o wymiarach (w, d) nie stoi już inny budynek, płot lub tory kolejowe
function checkBuildingPlacementValid(x, z, w, d, ignoreZoneKey = null) {
  const minGap = 1.6; // Minimalny odstęp między budynkami (żeby nie nachodziły na siebie i było przejście)
  const allKeys = getAllUpgradeableCardKeys();

  for (const key of allKeys) {
    if (key === ignoreZoneKey) continue;
    const other = ZONES[key];
    if (!other) continue;
    const ow = other.w || 4;
    const od = other.d || 4;
    if (
      Math.abs(x - other.x) < (w / 2 + ow / 2 + minGap) &&
      Math.abs(z - other.z) < (d / 2 + od / 2 + minGap)
    ) {
      return { valid: false, reason: `W tym miejscu stoi już: ${other.name}` };
    }
  }

  // Nie pozwól stawiać na torach kolejowych i rampie pociągu
  const railMinZ = ZONES.TRAIN_DOCK.z - 3.5;
  const railMaxZ = ZONES.TRAIN_DOCK.z + 10.5;
  if (z + d / 2 > railMinZ && z - d / 2 < railMaxZ) {
    return { valid: false, reason: 'Nie można budować na torach kolejowych i rampie!' };
  }

  // Nie pozwól stawiać bezpośrednio na linii drutu kolczastego lub w bramie („Wachcie”)
  const fb = getCampBounds();
  const fPad = 1.2;
  const crossesWestFence  = (x - w / 2 - fPad < fb.minX && x + w / 2 + fPad > fb.minX) && (z + d / 2 > fb.minZ - fPad && z - d / 2 < fb.maxZ + fPad);
  const crossesEastFence  = (x - w / 2 - fPad < fb.maxX && x + w / 2 + fPad > fb.maxX) && (z + d / 2 > fb.minZ - fPad && z - d / 2 < fb.maxZ + fPad);
  const crossesNorthFence = (z - d / 2 - fPad < fb.minZ && z + d / 2 + fPad > fb.minZ) && (x + w / 2 > fb.minX - fPad && x - w / 2 < fb.maxX + fPad);
  const crossesSouthFence = (z - d / 2 - fPad < fb.maxZ && z + d / 2 + fPad > fb.maxZ) && (x + w / 2 > fb.minX - fPad && x - w / 2 < fb.maxX + fPad);

  if (crossesWestFence || crossesEastFence || crossesNorthFence || crossesSouthFence) {
    return { valid: false, reason: 'Nie można stawiać budynku na ogrodzeniu obozu ani w bramie!' };
  }

  return { valid: true, reason: '' };
}

function updateBuildGhostAt(x, z) {
  if (!buildGhostMesh) return;
  buildGhostMesh.position.set(x, 1.25, z);

  let w = 8, d = 8, ignoreKey = null;
  if (state.buildMode.active && state.buildMode.typeId) {
    const b = BUILDABLES[state.buildMode.typeId];
    if (b) { w = b.w; d = b.d; }
  } else if (state.moveMode.active && state.moveMode.zoneKey) {
    const zObj = ZONES[state.moveMode.zoneKey];
    if (zObj) { w = zObj.w || 8; d = zObj.d || 8; ignoreKey = state.moveMode.zoneKey; }
  }

  const check = checkBuildingPlacementValid(x, z, w, d, ignoreKey);
  buildGhostMesh.material.color.setHex(check.valid ? 0x2ecc71 : 0xe74c3c);
}

function relocateBuildingTo(zoneKey, newX, newZ) {
  const z = ZONES[zoneKey];
  if (!z) {
    cancelBuildMode();
    return;
  }

  const rx = Math.round(newX * 10) / 10;
  const rz = Math.round(newZ * 10) / 10;
  const check = checkBuildingPlacementValid(rx, rz, z.w || 8, z.d || 8, zoneKey);
  if (!check.valid) {
    addLog(`🚫 Nie można przesunąć budynku tutaj! ${check.reason}. Wybierz wolne miejsce na mapie.`, 'danger');
    updateBuildGhostAt(rx, rz);
    return;
  }

  z.x = rx;
  z.z = rz;

  const bm = state.buildingMeshes[zoneKey];
  if (bm && bm.group) {
    bm.group.position.set(z.x, 0, z.z);
  }

  // Zaktualizuj współrzędne prycz, jeśli przeniesiono barak
  if (z.bunkSlots && z.bunkSlots.length > 0) {
    z.bunkSlots.forEach(slot => {
      if (slot.relX !== undefined) {
        slot.x = z.x + slot.relX;
        slot.z = z.z + slot.relZ;
        slot.walkX = z.x + slot.relWalkX;
        slot.walkZ = z.z + slot.relWalkZ;
      }
    });
  }

  // Jeśli to wieżyczka lub ognisko, zaktualizuj jej wpis w tablicach zasięgu
  const tw = state.watchtowers.find(t => t.zoneKey === zoneKey);
  if (tw) {
    tw.x = z.x;
    tw.z = z.z;
  }
  const bf = state.bonfires.find(b => b.zoneKey === zoneKey);
  if (bf) {
    bf.x = z.x;
    bf.z = z.z;
  }

  // Zresetuj stan snu/nawigacji NPC, żeby płynnie dostosowali się do nowego układu budynków
  state.navVersion = (state.navVersion || 1) + 1;
  state.prisoners.forEach(p => {
    p.navPath = null;
    if (p.isSleepingOnBunk) {
      ensureStandingPosture(p);
    }
  });
  state.guards.forEach(g => {
    g.navPath = null;
  });

  spawnBurstParticles(z.x, 2.2, z.z, 0xf1c40f, 14);
  addLog(`✋ PRZESUNIĘTO BUDYNEK: ${z.icon || '🏗️'} ${z.name} na nową pozycję (${Math.round(z.x)}, ${Math.round(z.z)})!`, 'good');

  cancelBuildMode();
  state.selectedBuildingKey = zoneKey;
  renderInspector();
  updateHUD();
}

function createCustomBuildingCardMeta(typeId, numId) {
  const b = BUILDABLES[typeId];
  if (typeId === 'BARRACK') {
    return {
      icon: '🏠',
      rarity: 'COMMON',
      rarityName: 'Postawiony Barak',
      shortName: `Barak Dodatkowy #${numId}`,
      bonusDesc: level => `Pojemność: +${4 + level * 4} prycz • Ciepło piecyka: +${level * 25}%`
    };
  }
  if (typeId === 'WATCHTOWER') {
    return {
      icon: '🗼',
      rarity: 'RARE',
      rarityName: 'Postawiona Wyszka',
      shortName: `Wyszka Strażnicza #${numId}`,
      bonusDesc: level => `Promień nadzoru: ${28 + (level - 1) * 5}m • Tłumienie buntu: -${4 + (level - 1) * 3}%`
    };
  }
  if (typeId === 'BONFIRE') {
    return {
      icon: '🔥',
      rarity: 'COMMON',
      rarityName: 'Postawione Ognisko',
      shortName: `Ognisko Polowe #${numId}`,
      bonusDesc: level => `Promień ciepła: ${(9.5 + (level - 1) * 3).toFixed(1)}m • Moc grzania: +${level * 30}%`
    };
  }
  if (typeId === 'SAWMILL_OUTPOST') {
    return {
      icon: '🪵',
      rarity: 'RARE',
      rarityName: 'Polowa Birża Leśna',
      shortName: `Polowa Birża #${numId}`,
      bonusDesc: level => `Bonus za kłodę: +${level - 1} szt. drewna i +${(level - 1) * 4} ₽ • Bliski zrzut drewna`
    };
  }
  return {
    icon: '🔒',
    rarity: 'EPIC',
    rarityName: 'Postawiony Karcer',
    shortName: `Izolator Karny #${numId}`,
    bonusDesc: level => `Spadek przestępstw: -${15 + (level - 1) * 6}% • Dyscyplina w Zonie: +${level * 5}%`
  };
}

function placeBuildingAt(x, z) {
  const typeId = state.buildMode.typeId;
  const b = BUILDABLES[typeId];
  if (!b) return;
  if (state.money < b.costMoney || state.wood < b.costWood) {
    cancelBuildMode();
    return;
  }

  const rx = Math.round(x * 10) / 10;
  const rz = Math.round(z * 10) / 10;
  const check = checkBuildingPlacementValid(rx, rz, b.w, b.d, null);
  if (!check.valid) {
    addLog(`🚫 Nie można postawić budynku na innym budynku! (${check.reason}) – wybierz wolne miejsce.`, 'danger');
    updateBuildGhostAt(rx, rz);
    return;
  }

  state.money -= b.costMoney;
  state.wood -= b.costWood;

  const numId = nextCustomBuildingId++;
  const zoneKey = `CUSTOM_${numId}`;
  const meta = createCustomBuildingCardMeta(typeId, numId);

  const zoneObj = {
    id: zoneKey,
    x: Math.round(x * 10) / 10,
    z: Math.round(z * 10) / 10,
    w: b.w,
    d: b.d,
    type: typeId,
    isCustom: true,
    name: meta.shortName,
    icon: meta.icon,
    rarity: meta.rarity,
    rarityName: meta.rarityName,
    level: 1,
    maxLevel: 100,
    baseMoneyCost: Math.max(50, Math.round(b.costMoney * 0.85)),
    baseWoodCost: Math.max(10, Math.round(b.costWood * 0.85)),
    bonusDesc: meta.bonusDesc
  };

  ZONES[zoneKey] = zoneObj;
  state.customBuildingKeys.push(zoneKey);

  if (typeId === 'BARRACK') {
    buildCutawayBuilding(zoneObj, b.wallHex, b.floorHex, 'BARRACK', zoneKey);
    state.extraBarrackBeds += 8;
    state.customBuildings.push(zoneObj);
  } else if (typeId === 'WATCHTOWER') {
    createWatchtowerMesh(zoneObj.x, zoneObj.z, zoneKey, false);
    state.customBuildings.push(zoneObj);
  } else if (typeId === 'BONFIRE') {
    createBonfireMesh(zoneObj.x, zoneObj.z, zoneKey);
    state.customBuildings.push(zoneObj);
  } else if (typeId === 'SAWMILL_OUTPOST') {
    buildCutawayBuilding(zoneObj, b.wallHex, b.floorHex, 'SAWMILL_OUTPOST', zoneKey);
    state.sawmillDropoffs.push(zoneObj);
    state.customBuildings.push(zoneObj);
  } else if (typeId === 'SOLITARY') {
    buildCutawayBuilding(zoneObj, b.wallHex, b.floorHex, 'SOLITARY', zoneKey);
    state.customBuildings.push(zoneObj);
  }

  state.navVersion = (state.navVersion || 1) + 1;
  state.prisoners.forEach(p => { p.navPath = null; });
  state.guards.forEach(g => { g.navPath = null; });

  spawnBurstParticles(zoneObj.x, 1.5, zoneObj.z, 0x2ecc71, 12);
  addLog(`🧱 Zbudowano: ${meta.icon} ${zoneObj.name} (Poziom 1)! Kliknij go na mapie lub w Kartach, aby go ulepszyć lub przesunąć!`, 'good');
  cancelBuildMode();
  state.selectedEntity = null;
  state.selectedBuildingKey = zoneKey;
  renderInspector();
  updateHUD();
}

// ============================================================================
// TEMPERATURA (5% NA GODZINĘ NA MROZIE!), OGRZEWANIE W BARAKACH, BÓJKI I STRAŻNICY
// ============================================================================
function checkFactionConflict(p, chanceDt) {
  if (p.fightTarget || p.inHospital || isNearGuardOrTower(p.x, p.z, 12)) return;
  const f = FACTIONS[p.faction];
  if (Math.random() > f.aggr * 0.04 * chanceDt) return;

  for (let other of state.prisoners) {
    if (other === p || other.hp <= 12 || other.inHospital) continue;
    if (Math.hypot(other.x - p.x, other.z - p.z) < 5.5) {
      const isEnemy =
        (p.faction === 'URKA' && (other.faction === 'SUKA' || other.faction === 'POLITICAL')) ||
        (p.faction === 'SUKA' && other.faction === 'URKA');
      if (isEnemy) {
        p.fightTarget = other;
        if (other.faction === 'URKA' || other.faction === 'SUKA') other.fightTarget = p;
        addLog(`🥊 Bójka frakcyjna! ${p.name} zaatakował ${other.name}!`, 'warn');
        break;
      }
    }
  }
}

function updateGuardAI(g, dt) {
  let fighter = state.prisoners.find(p => p.fightTarget !== null);
  if (fighter) {
    g.statusIcon = '🚨';
    const dist = moveTowardsPoint(g, fighter.x, fighter.z, dt, 6.8);
    if (dist < 2.2) {
      if (fighter.fightTarget) fighter.fightTarget.fightTarget = null;
      fighter.fightTarget = null;
      fighter.hp = Math.max(8, fighter.hp - 5);
      fighter.obedience = Math.min(100, fighter.obedience + 20);
      spawnBurstParticles(fighter.x, 1.3, fighter.z, 0xffaa00, 5);
      addLog(`💂 ${g.name} rozdzielił bójkę więźnia ${fighter.name}.`, 'info');
    }
    return;
  }

  g.statusIcon = '💂';
  const zObj = ZONES[g.patrolZone] || ZONES.ROLLCALL;
  moveTowardsZone(g, zObj, dt, 3.8);
}

function updateEnvironmentAndVitals(dt) {
  const dayFactor = Math.sin(((state.hour - 5) / 24) * Math.PI * 2);
  state.temperature = Math.round(-22 + dayFactor * 8);

  const sunElev = Math.max(0.15, (dayFactor + 1) * 0.48);
  sunLight.intensity = sunElev * 1.1;
  ambientLight.intensity = 0.28 + sunElev * 0.45;

  for (let t of state.trees) {
    if (t.chopped) {
      if (t.fallAngle < Math.PI / 2) {
        t.fallAngle = Math.min(Math.PI / 2, t.fallAngle + dt * 2.8);
        t.foliageGroup.rotation.z = t.fallAngle;
        if (t.fallAngle >= Math.PI / 2) {
          t.foliageGroup.visible = false;
          t.foliageGroup.rotation.z = 0;
        }
      }
      t.regrowTimer -= dt;
      if (t.regrowTimer <= 0) {
        t.chopped = false;
        t.fallAngle = 0;
        t.foliageGroup.visible = true;
      }
    }
  }

  const stovesWorking = state.wood > 0;
  stoveLights.forEach(l => {
    l.intensity = stovesWorking ? (1.35 + Math.sin(performance.now() * 0.01) * 0.2) : 0.25;
  });

  // 1 godzina w grze = 1 minuta w realu (60 sekund przy 1x).
  // Spadek ciepła na mrozie: dokładnie 5% na godzinę = 5.0 / 60.0 % na sekundę!
  const baseColdLossPerSec = 5.0 / 60.0;
  const barrackHeatLevel = (ZONES.BARRACKS_1.level + ZONES.BARRACKS_2.level) / 2;
  const regime = state.schedule[state.hour];

  // Zbalansowane zużycie sytości (nutrition) na sekundę (1h = 60s):
  // Podczas PRACY zużywa ~2.2%/h, w CZASIE WOLNYM/APELU ~0.9%/h, podczas SNU ~0.4%/h.
  // Dzięki temu dobrze żywieni więźniowie (Kocioł II i III) utrzymują 70–100% sytości,
  // a ci na Kotle I (lub przy obciętych racjach / braku posiłków w grafiku) stopniowo głodnieją (<30% -> 🍖)!
  const nutLossPerHour = regime === 'WORK' ? 2.2 : (regime === 'SLEEP' ? 0.45 : (regime === 'MEAL' ? 0 : 0.9));
  const nutLossPerSec = nutLossPerHour / 60.0;

  for (let i = state.prisoners.length - 1; i >= 0; i--) {
    const p = state.prisoners[i];
    const faction = FACTIONS[p.faction];
    const insideBuilding = isInsideWarmBuilding(p.x, p.z);
    const nearFire = isNearBonfire(p.x, p.z);

    if ((insideBuilding || nearFire) && p.freezePostTimer <= 0) {
      // Szybkie i pewne ogrzewanie w barakach, stołówce, szpitalu i przy ogniskach!
      const heatRate = (stovesWorking ? 2.4 : 0.7) * (1 + (barrackHeatLevel - 1) * 0.25);
      p.warmth = Math.min(100, p.warmth + dt * heatRate);
    } else {
      const lossRate = baseColdLossPerSec / faction.coldResist;
      p.warmth = Math.max(0, p.warmth - dt * lossRate);
    }

    // Zużycie kalorii i system GŁODU (🍖):
    if (!p.inHospital && regime !== 'MEAL') {
      const punishedExtraDrain = p.punishedRationsHours > 0 ? 1.45 : 1.0;
      p.nutrition = Math.max(0, p.nutrition - dt * nutLossPerSec * punishedExtraDrain);
    }

    // System ENERGII (⚡):
    // - spada 5% na godzinę pracy (5.0 / 60.0 % na sekundę)
    // - odnawia się 20% na godzinę odpoczynku/snu poza pracą (20.0 / 60.0 % na sekundę, maks. 100%)
    // - gdy spadnie poniżej 0 (<= 0), więzień pracuje 4x wolniej!
    if (p.energy === undefined) p.energy = 100;
    const isWorkingNow = !p.inHospital && p.solitaryTimer <= 0 && p.freezePostTimer <= 0 && regime === 'WORK';
    if (isWorkingNow) {
      p.energy = Math.max(-50, p.energy - dt * (5.0 / 60.0));
      if (p.energy <= 0 && !p.exhaustedLogged) {
        p.exhaustedLogged = true;
        addLog(`🪫 WYCZERPANIE: Energia więźnia ${p.name} spadła poniżej 0% (${Math.round(p.energy)}%) – pracuje teraz 4x wolniej!`, 'warn');
      }
    } else {
      p.energy = Math.min(100, p.energy + dt * (20.0 / 60.0));
      if (p.energy > 0 && p.exhaustedLogged) {
        p.exhaustedLogged = false;
      }
    }

    if (p.nutrition < 30) {
      // Więzień jest wygłodzony (🍖 w dymku, 2x wolniejszy ruch). Jeśli stan ten potrwa 24h -> umiera z głodu!
      const prevStarv = p.starvationHours || 0;
      p.starvationHours = prevStarv + (dt / 60.0); // +1h na 60 sekund czasu gry
      if (prevStarv === 0) {
        addLog(`🍖 GŁÓD: Więzień ${p.name} jest wygłodzony (<30% sytości)! Porusza się 2x wolniej – jeśli nie zje przez 24h, umrze z głodu!`, 'warn');
      }
      if (p.starvationHours >= 24.0) {
        p.hp = 0;
        p.diedOfStarvation = true;
      }
    } else if (p.starvationHours > 0) {
      // Po najedzeniu się powyżej 30% sytości licznik śmierci głodowej się cofa
      p.starvationHours = Math.max(0, p.starvationHours - (dt / 60.0) * 3.0);
    }

    // Jeśli Ciepło spadnie do 0% i nie jest w szpitalu -> hipotermia
    if (p.warmth <= 0.2 && !p.inHospital) {
      p.hp -= dt * 0.8;
      p.statusIcon = '🥶';
    }

    // Sprawdź czy spadł poniżej 10 HP (od mrozu, pobicia lub po zakończeniu kary) -> idzie do Szpitala na 12h!
    // UWAGA: W trakcie kary (isPrisonerBeingPunished) więzień NIE trafia do szpitala, tylko może zginąć!
    // Więźniowie z Pociągu Uległych (p.neverHospital) NIGDY nie trafiają do szpitala!
    if (!p.inHospital && !p.neverHospital && !isPrisonerBeingPunished(p) && p.hp < 10 && p.hp > 0) {
      p.inHospital = true;
      p.hospitalHoursLeft = Math.max(4, 13 - ZONES.INFIRMARY.level);
      addLog(`🏥 SZPITAL: Więzień ${p.name} ma ${Math.round(p.hp)} HP (<10 HP) i został przeniesiony do Szpitala na 12h leczenia!`, 'warn');
    }

    updateOverheadSprite(p);

    if (p.hp <= 0) {
      handlePrisonerDeath(p, i);
    }
  }
}

function handlePrisonerDeath(p, index) {
  state.deaths++;
  let cause = 'zmarł od ran i wycieńczenia';
  if (p.diedOfStarvation) {
    cause = 'zmarł z głodu po 24 godzinach skrajnego wygłodzenia (🍖)';
  } else if (p.warmth <= 1) {
    cause = 'zamarzł na mrozie (hipotermia)';
  }
  addLog(`💀 ZGON: Więzień ${p.name} (${FACTIONS[p.faction].short}) ${cause}!`, 'danger');

  spawnBurstParticles(p.x, 0.8, p.z, 0x222222, 8);
  scene.remove(p.mesh.root);
  state.prisoners.splice(index, 1);
  state.crimeReports = state.crimeReports.filter(r => r.prisonerId !== p.id);
  if (state.activeCrimeReport && state.activeCrimeReport.prisonerId === p.id) {
    closeCrimeModal();
  }

  if (state.selectedEntity === p) {
    state.selectedEntity = null;
    renderInspector();
  }
  updateHUD();
  if (state.activePanel === 'prisoners' || state.activePanel === 'guards') renderActivePanel();
}

function spawnBurstParticles(x, y, z, colorHex, count = 6) {
  const geo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
  const mat = new THREE.MeshBasicMaterial({ color: colorHex });
  for (let i = 0; i < count; i++) {
    const p = new THREE.Mesh(geo, mat);
    p.position.set(x, y, z);
    scene.add(p);
    state.particles.push({
      mesh: p,
      vx: (Math.random() - 0.5) * 3.5,
      vy: 1.5 + Math.random() * 2.5,
      vz: (Math.random() - 0.5) * 3.5,
      life: 0.7
    });
  }
}

// ============================================================================
// ZEGAR OBOZOWY: 1 GODZINA W GRZE = 1 MINUTA W REALU (60 SEKUND)!
// ============================================================================
let timeAccumulator = 0;

function advanceClock(dt) {
  // 1 sekunda rzeczywista (przy 1x) = 1 minuta w grze -> 60 sekund w realu = 1 godzina w grze!
  timeAccumulator += dt * 1.0;
  while (timeAccumulator >= 1) {
    timeAccumulator -= 1;
    state.minute++;
    if (state.minute >= 60) {
      state.minute = 0;
      onHourPassed();
    }
  }
}

function onHourPassed() {
  state.hour++;
  if (state.speechBuff.hoursLeft > 0) {
    state.speechBuff.hoursLeft--;
    if (state.speechBuff.hoursLeft <= 0) {
      state.speechBuff = { type: null, name: 'Brak aktywnego przemówienia', workMult: 1.0, crimeMult: 1.0, hoursLeft: 0 };
    }
  }

  if (state.hour >= 24) {
    state.hour = 0;
    state.day++;
    let planBonusRubles = 0;
    let stachCount = 0, normCount = 0, weakCount = 0;

    state.prisoners.forEach(p => {
      // Zapisz wczorajszy dzienny urobek i wyrobienie normy (z uwzględnieniem indywidualnego talentu i ustawionej normy!)
      const dailyUnits = p.unitsProducedToday > 0 ? p.unitsProducedToday : estimatePrisonerDailyOutput(p);
      p.lastDayUnits = dailyUnits;
      const targetQuota = Math.max(1, state.quotas[p.job] || 15);
      const achieved = Math.round((dailyUnits / targetQuota) * 100);
      p.lastDayQuotaPct = achieved;
      p.quotaPct = achieved;
      p.unitsProducedToday = 0;

      if (achieved >= 125) {
        stachCount++;
        planBonusRubles += 22;
      } else if (achieved >= 75) {
        normCount++;
        planBonusRubles += 12;
      } else {
        weakCount++;
      }
    });

    if (planBonusRubles > 0) {
      state.money += planBonusRubles;
    }
    addLog(`📅 Dzień ${state.day}: Podsumowanie norm -> Kocioł III (125%+): ${stachCount} os., Kocioł II (100%): ${normCount} os., Kocioł I (<75%): ${weakCount} os. Premia z Centrali: +${planBonusRubles} ₽!`, 'good');

    // Automatyczny transport 8 Urków raz na 3 dni (Dzień 3, 6, 9, 12...)
    if (state.day % 3 === 0) {
      triggerAutoUrkaTransport();
    }

    if (state.autoSaveCookies) {
      saveGameToCookies(true);
    }
  }

  // Spalanie drewna w piecykach co godzinę
  if (state.wood > 0) {
    state.wood = Math.max(0, state.wood - 2);
  }

  if (state.schedule[state.hour] === 'MEAL') {
    let totalMealCost = 0;
    state.prisoners.forEach(p => {
      const tierKey = getPrisonerMealTier(p);
      const mealInfo = getMealKcalAndCost(tierKey);
      totalMealCost += mealInfo.cost;

      const diff = mealInfo.totalKcal - mealInfo.burnedKcal;
      p.kcalBalance = diff;

      // Wpływ ustawień posiłków (chleb, zupa, dodatek dla każdego z 3 kotłów) na sytość (nutrition) i zdrowie!
      const kcalRatio = mealInfo.totalKcal / Math.max(1000, mealInfo.burnedKcal);
      if (kcalRatio >= 0.85) {
        // Dobry posiłek (zwykle Kocioł II i III) solidnie karmi więźnia
        p.nutrition = Math.min(100, p.nutrition + Math.round(24 * kcalRatio));
        p.hp = Math.min(p.maxHp, p.hp + 4 * ZONES.CANTEEN.level);
      } else {
        // Głodowa porcja (np. Kocioł I Karny lub okrojone racje) daje bardzo mało sytości -> więzień stopniowo wpada w głód (🍖)!
        p.nutrition = Math.min(100, p.nutrition + Math.round(8 * kcalRatio));
      }
    });
    state.money = Math.max(0, state.money - Math.round(totalMealCost * 0.5));
  }

  updateScheduleStripUI();
}

function updateFreightTrain(dt) {
  const railZ = ZONES.TRAIN_DOCK.z + 2.8;

  if (state.train.phase === 'ARRIVING') {
    state.train.present = false;
    state.train.xPos += dt * 32;
    trainGroup.position.x = state.train.xPos;

    if (Math.random() < 0.35) {
      spawnBurstParticles(trainGroup.position.x + 16.8, 3.8, railZ, 0xe8eef2, 2);
    }

    if (state.train.xPos >= ZONES.TRAIN_DOCK.x) {
      state.train.xPos = ZONES.TRAIN_DOCK.x;
      trainGroup.position.x = state.train.xPos;
      state.train.phase = 'DOCKED';
      state.train.present = true;
      updateTrainCargoVisuals();
      addLog(`🚂 Na bocznicę Bazy Żywnościowej w Jercewie wjechał pociąg towarowy (${state.train.cratesLeft} skrzyń do rozładunku)!`, 'info');
    }
  } else if (state.train.phase === 'DOCKED') {
    state.train.present = true;
    trainGroup.position.x = ZONES.TRAIN_DOCK.x;

    if (Math.random() < 0.08) {
      spawnBurstParticles(trainGroup.position.x + 16.8, 3.8, railZ, 0xd8e0e6, 1);
    }

    if (state.train.cratesLeft <= 0) {
      state.train.present = false;
      state.train.phase = 'DEPARTING';
      updateTrainCargoVisuals();
      addLog(`🚂 Brygada tragarzy opróżniła wagony! Pociąg towarowy odjeżdża ze stacji Jercewo, kolejny skład już w drodze.`, 'good');
    }
  } else if (state.train.phase === 'DEPARTING') {
    state.train.present = false;
    state.train.xPos += dt * 36;
    trainGroup.position.x = state.train.xPos;

    if (Math.random() < 0.35) {
      spawnBurstParticles(trainGroup.position.x + 16.8, 3.8, railZ, 0xe8eef2, 2);
    }

    if (state.train.xPos >= 165) {
      state.train.phase = 'COOLDOWN';
      state.train.cooldownTimer = 6.0;
    }
  } else if (state.train.phase === 'COOLDOWN') {
    state.train.present = false;
    state.train.cooldownTimer -= dt;
    if (state.train.cooldownTimer <= 0) {
      state.train.maxCrates = 14 + ZONES.DEPOT.level * 2;
      state.train.cratesLeft = state.train.maxCrates;
      state.train.xPos = -155;
      trainGroup.position.x = -155;
      state.train.phase = 'ARRIVING';
      updateTrainCargoVisuals();
    }
  }
}

// ============================================================================
// OGÓLNE WSKAŹNIKI OBOZU PRACY I INTERFEJS UŻYTKOWNIKA
// ============================================================================
function getCampIndicators() {
  const n = state.prisoners.length;
  if (n === 0) {
    return { avgHp: 0, avgWarmth: 0, avgObedience: 100, avgQuota: 0, riotRisk: 0, inHosp: 0 };
  }
  let sumHp = 0, sumWarmth = 0, sumObed = 0, sumQuota = 0, urkaCount = 0, inHosp = 0;
  state.prisoners.forEach(p => {
    sumHp += (p.hp / p.maxHp) * 100;
    sumWarmth += p.warmth;
    sumObed += Math.min(100, p.obedience + ZONES.ROLLCALL.level * 3);
    sumQuota += p.quotaPct;
    if (p.faction === 'URKA') urkaCount++;
    if (p.inHospital) inHosp++;
  });

  const avgHp = Math.round(sumHp / n);
  const avgWarmth = Math.round(sumWarmth / n);
  const avgObedience = Math.min(100, Math.round(sumObed / n));
  const avgQuota = Math.round(sumQuota / n);

  const guardSuppress = state.guards.length * 8 + state.watchtowers.length * 4;
  const rawRiot = Math.max(0, (100 - avgObedience) * 0.7 + urkaCount * 6 - guardSuppress);
  const riotRisk = Math.min(100, Math.max(2, Math.round(rawRiot)));

  return { avgHp, avgWarmth, avgObedience, avgQuota, riotRisk, inHosp };
}

function addLog(text, type = 'info') {
  const box = document.getElementById('event-log');
  if (!box) return;
  const div = document.createElement('div');
  div.className = `log-entry ${type}`;
  const hh = String(state.hour).padStart(2, '0');
  const mm = String(state.minute).padStart(2, '0');
  div.innerHTML = `<span style="color:#888;">[${hh}:${mm}]</span> ${text}`;
  box.prepend(div);
  while (box.children.length > 35) box.removeChild(box.lastChild);
}

function updateHUD() {
  const ind = getCampIndicators();

  const starEl = document.getElementById('hud-camp-lvl');
  if (starEl) starEl.textContent = getCampStarsDisplay(state.campStars);
  const subEl = document.getElementById('hud-camp-sub');
  if (subEl) {
    const nextTarget = getNextStarUpgradeTarget();
    subEl.textContent = state.campStars >= 5
      ? `5/5 ★ (${state.totalBuildingUpgrades} ulepsz.)`
      : `${state.campStars}/5 ★ (${state.totalBuildingUpgrades}/${nextTarget} ulepsz.)`;
  }

  document.getElementById('hud-money').textContent = `${state.money} ₽`;
  document.getElementById('hud-wood').textContent = `${state.wood} szt.`;
  document.getElementById('hud-pop').textContent = `${state.prisoners.length} / ${getPrisonerCapacity()}`;
  document.getElementById('hud-guards').textContent = `${state.guards.length}`;
  document.getElementById('hud-hospital').textContent = `${ind.inHosp} os.`;

  const tempEl = document.getElementById('hud-temp');
  tempEl.textContent = `${state.temperature}°C`;
  tempEl.className = state.temperature <= -26 ? 'val temp-freeze' : 'val temp-cold';
  document.getElementById('hud-deaths').textContent = `${state.deaths}`;

  const hh = String(state.hour).padStart(2, '0');
  const mm = String(state.minute).padStart(2, '0');
  document.getElementById('hud-clock').textContent = `Dzień ${state.day} • ${hh}:${mm}`;

  // Pasek Ogólnych Wskaźników Obozu
  document.getElementById('ind-hp-val').textContent = `${ind.avgHp}%`;
  document.getElementById('ind-hp-bar').style.width = `${ind.avgHp}%`;

  document.getElementById('ind-warm-val').textContent = `${ind.avgWarmth}%`;
  document.getElementById('ind-warm-bar').style.width = `${ind.avgWarmth}%`;

  document.getElementById('ind-obed-val').textContent = `${ind.avgObedience}%`;
  document.getElementById('ind-obed-bar').style.width = `${ind.avgObedience}%`;

  document.getElementById('ind-quota-val').textContent = `${ind.avgQuota}%`;
  document.getElementById('ind-quota-bar').style.width = `${Math.min(100, ind.avgQuota)}%`;

  document.getElementById('ind-riot-val').textContent = `${ind.riotRisk}%`;
  document.getElementById('ind-riot-bar').style.width = `${ind.riotRisk}%`;

  const trainLbl = document.getElementById('train-status-label');
  if (state.transportAnim.active) {
    trainLbl.innerHTML = `🚃 <b>Etap więźniów na stacji Jercewo!</b>`;
  } else if (state.train.phase === 'ARRIVING') {
    trainLbl.innerHTML = `🚂 Pociąg towarowy: <b>Wjeżdża na stację (${state.train.cratesLeft} skrzyń)...</b>`;
  } else if (state.train.phase === 'DOCKED') {
    trainLbl.innerHTML = `🚂 Baza Żywnościowa: <b>${state.train.cratesLeft}/${state.train.maxCrates} skrzyń</b>`;
  } else {
    trainLbl.innerHTML = `🚂 Pociąg towarowy: <b>Odjeżdża (nowy za chwilę)</b>`;
  }
}

function updateScheduleStripUI() {
  const bar = document.getElementById('mini-schedule-bar');
  bar.innerHTML = '';
  for (let h = 0; h < 24; h++) {
    const reg = state.schedule[h];
    const cell = document.createElement('div');
    cell.className = `mini-hour regime-${reg} ${h === state.hour ? 'current-hour' : ''}`;
    cell.textContent = h;
    cell.onclick = () => openPanel('schedule');
    bar.appendChild(cell);
  }
  const curReg = REGIMES[state.schedule[state.hour]];
  const badge = document.getElementById('current-regime-label');
  badge.textContent = `PORA: ${curReg.name}`;
  badge.className = `current-regime-badge regime-${curReg.id}`;
}

function setGameSpeed(speed) {
  state.gameSpeed = speed;
  document.querySelectorAll('.speed-btn[data-speed]').forEach(btn => {
    btn.classList.toggle('active', parseFloat(btn.dataset.speed) === speed);
  });
}

function openPanel(tabName) {
  if (state.activePanel === tabName) {
    closePanel();
    return;
  }
  state.activePanel = tabName;
  document.querySelectorAll('.dock-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabName);
  });
  document.getElementById('management-panel').classList.remove('hidden');
  renderActivePanel();
}

function closePanel() {
  state.activePanel = null;
  document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('management-panel').classList.add('hidden');
}

function renderActivePanel() {
  const titleEl = document.getElementById('panel-title');
  const contentEl = document.getElementById('panel-content');
  if (!state.activePanel) return;

  // 1. TALIA KART BUDYNKÓW W STYLU CLASH ROYALE + GWIAZDKI OBOZU (0–5 ★ ZA ULEPSZANIE BUDYNKÓW!)
  if (state.activePanel === 'cards') {
    const prevThreshold = state.campStars > 0 ? STAR_UPGRADE_THRESHOLDS[state.campStars - 1] : 0;
    const nextThreshold = getNextStarUpgradeTarget();
    const curUpgrades = state.totalBuildingUpgrades || 0;
    const spanReq = Math.max(1, nextThreshold - prevThreshold);
    const progressInTier = Math.max(0, curUpgrades - prevThreshold);
    const xpPct = state.campStars >= 5 ? 100 : Math.min(100, Math.round((progressInTier / spanReq) * 100));
    const b = getCampBounds();
    const campW = Math.round(b.maxX - b.minX);
    const campD = Math.round(b.maxZ - b.minZ);
    const nextStar = state.campStars + 1;

    titleEl.textContent = `🃏 Karty Budynków i Gwiazdki Obozu (${getCampStarsDisplay(state.campStars)} ${state.campStars}/5 ★)`;

    let html = `
      <div class="info-box" style="border-color:var(--accent-gold); background:linear-gradient(90deg, #1b2838 0%, #243447 100%);">
        <h4>
          <span>⭐ Poziom Obozu w Gwiazdkach: <b style="color:#f1c40f; font-size:15px;">${getCampStarsDisplay(state.campStars)} (${state.campStars}/5 ★)</b></span>
          <span>Teren Zony: <b>${campW}m × ${campD}m</b></span>
        </h4>
        <p style="font-size:11px; color:#ccc; margin-bottom:6px;">
          Gwiazdki obozu zdobywasz <b>za ulepszanie budynków</b>! Z każdą kolejną gwiazdką mapa i ogrodzony teren Zony <b>mocno się powiększają</b>, dając dużo miejsca na stawianie nowych budynków:<br>
          • <b>1 ★</b>: 10 ulepszeń &nbsp;• <b>2 ★</b>: 30 ulepszeń &nbsp;• <b>3 ★</b>: 50 ulepszeń &nbsp;• <b>4 ★</b>: 100 ulepszeń &nbsp;• <b>5 ★</b>: 300 ulepszeń
        </p>
        <div class="cr-xp-bar" style="margin-bottom:4px;">
          <div class="cr-xp-fill" style="width:${xpPct}%; background:linear-gradient(90deg, #f39c12, #f1c40f);"></div>
          <div class="cr-xp-text">
            ${state.campStars >= 5
              ? `★★★★★ Maksymalny poziom 5 ★ osiągnięty! (Łącznie ulepszeń: ${curUpgrades})`
              : `Ulepszenia budynków do ${nextStar} ★: ${curUpgrades} / ${nextThreshold} (brakuje ${Math.max(0, nextThreshold - curUpgrades)} ulepszeń)`}
          </div>
        </div>
      </div>
      <div class="cr-deck-grid">
    `;

    const allCardKeys = getAllUpgradeableCardKeys();
    allCardKeys.forEach(key => {
      const z = ZONES[key];
      if (!z) return;
      const isMax = z.level >= z.maxLevel;
      const cost = getCardUpgradeCost(key);
      const canAfford = !isMax && state.money >= cost.money && state.wood >= cost.wood;
      const cardProgressPct = Math.round((z.level / z.maxLevel) * 100);
      const rarityColors = { COMMON: '#bdc3c7', RARE: '#e67e22', EPIC: '#c39bd3', LEGENDARY: '#f1c40f' };

      html += `
        <div class="cr-card cr-rarity-${z.rarity}" onclick="focusCameraOnBuilding('${key}')">
          <div>
            <div class="cr-card-top">
              <div class="cr-icon-box">
                <span>${z.icon}</span>
                <span class="cr-lvl-pill">Poziom ${z.level}</span>
              </div>
              <div class="cr-title-area">
                <h4>${z.name}</h4>
                <div class="cr-rarity-label" style="color:${rarityColors[z.rarity]};">${z.rarityName}</div>
              </div>
            </div>

            <div class="cr-xp-bar">
              <div class="cr-xp-fill" style="width:${cardProgressPct}%;"></div>
              <div class="cr-xp-text">${z.level} / ${z.maxLevel} LVL</div>
            </div>

            <div class="cr-stats-list">
              ${z.bonusDesc(z.level)}
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px;">
            <button class="cr-upgrade-btn" ${!canAfford ? 'disabled' : ''} onclick="event.stopPropagation(); upgradeBuildingCard('${key}')">
              ${isMax ? '★ MAKSYMALNY POZIOM' : `⬆️ ULEPSZ (${cost.money} ₽ + ${cost.wood} 🪵)`}
            </button>
            <button class="action-btn secondary" style="padding:4px 6px; font-size:10.5px;" onclick="event.stopPropagation(); startMoveBuildingMode('${key}')">
              ✋ Przesuń budynek na mapie
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    contentEl.innerHTML = html;
  }

  // 2. OGÓLNE WSKAŹNIKI OBOZU PRACY
  else if (state.activePanel === 'indicators') {
    titleEl.textContent = '📈 Ogólne Wskaźniki Obozu Pracy (Raport Centrali)';
    const ind = getCampIndicators();
    const hospList = state.prisoners.filter(p => p.inHospital);

    let html = `
      <p class="section-desc">
        Kompleksowy przegląd stanu Twojego łagru. Pamiętaj: <b>1 godzina w grze trwa 1 minutę w realu</b>, a więźniowie poniżej 10 HP automatycznie trafiają do Szpitala na 12h kuracji do 100 HP.
      </p>
      <div class="grid-2">
        <div class="info-box">
          <h4>❤️ Średnie Zdrowie Więźniów <span>${ind.avgHp}%</span></h4>
          <div class="bar-wrap"><div class="bar-fill" style="width:${ind.avgHp}%; background:#2ecc71;"></div></div>
          <p>Ulepszaj Stołówkę i Szpital, aby utrzymać pełne zdrowie załogi.</p>
        </div>
        <div class="info-box">
          <h4>🔥 Średnie Ogrzanie (Baraki) <span>${ind.avgWarmth}%</span></h4>
          <div class="bar-wrap"><div class="bar-fill" style="width:${ind.avgWarmth}%; background:#3498db;"></div></div>
          <p>W barakach i stołówce więźniowie szybko ogrzewają się do 100%.</p>
        </div>
        <div class="info-box">
          <h4>⚖️ Posłuszeństwo i Dyscyplina <span>${ind.avgObedience}%</span></h4>
          <div class="bar-wrap"><div class="bar-fill" style="width:${ind.avgObedience}%; background:#f1c40f;"></div></div>
          <p>Wpływa na to liczba strażników, przemówienia na apelach i wymierzane kary.</p>
        </div>
        <div class="info-box">
          <h4>⚠️ Ryzyko Buntu / Sabotażu <span>${ind.riotRisk}%</span></h4>
          <div class="bar-wrap"><div class="bar-fill" style="width:${ind.riotRisk}%; background:#e74c3c;"></div></div>
          <p>Rośnie gdy w obozie jest wielu niepilnowanych Urków.</p>
        </div>
      </div>

      <div class="info-box" style="border-color:#5dade2;">
        <h4>🏥 Pacjenci w Szpitalu Obozowym (Lazaret LVL ${ZONES.INFIRMARY.level}) <span>${hospList.length} os.</span></h4>
        <p>Więźniowie, którym HP spadnie poniżej 10, przerywają pracę i leczą się w Lazarecie przez ${Math.max(4, 13 - ZONES.INFIRMARY.level)}h aż do 100 HP:</p>
        ${hospList.length === 0
          ? `<div style="font-size:11.5px; color:#82d173;">Brak pacjentów w stanie krytycznym – wszyscy więźniowie są zdolni do pracy.</div>`
          : hospList.map(p => `
              <div class="prisoner-row" onclick="selectEntityById(${p.id})" style="margin-top:4px;">
                <span>🏥 <b>${p.name}</b> (${FACTIONS[p.faction].short})</span>
                <span style="color:#5dade2;">HP: ${Math.round(p.hp)}/100 • Pozostało: ${p.hospitalHoursLeft.toFixed(1)}h</span>
              </div>
            `).join('')}
      </div>
    `;
    contentEl.innerHTML = html;
  }

  // 3. GRAFIK DNIA I APEL
  else if (state.activePanel === 'schedule') {
    titleEl.textContent = '🕒 Grafik Dnia (24h • 1h = 1 min w realu)';
    const workH = state.schedule.filter(s => s === 'WORK').length;
    const restH = 24 - workH;
    const energyDrain = workH * 5;
    const energyGain = restH * 20;
    let html = `
      <div class="info-box" style="border-color:#8e44ad;">
        <h4>📢 Apel i Przemówienie Naczelnika <span>Aktywny efekt: ${state.speechBuff.name}</span></h4>
        <p>Zwołaj więźniów na Plac Apelowy i wygłoś przemówienie przez megafon.</p>
        <button class="action-btn secondary" style="background:#8e44ad; border-color:#b06cd1;" onclick="openRollCallModal()">
          📢 Zwołaj Apel i Wybierz Przemówienie
        </button>
      </div>
      <div class="info-box" style="border-color:#f1c40f; margin-bottom:8px;">
        <h4>⚡ Bilans Energii Więźniów <span>Praca: ${workH}h (-${energyDrain}%) • Odpoczynek: ${restH}h (+${energyGain}%)</span></h4>
        <p style="margin-bottom:0;">
          Energia spada o <b>5% na godzinę pracy</b> i odnawia się o <b>20% na godzinę odpoczynku/snu</b>. Gdy spadnie <b>poniżej 0%</b>, więzień pracuje <b>4x wolniej</b>!
        </p>
      </div>
      <div class="palette-row">
    `;
    Object.values(REGIMES).forEach(r => {
      const sel = state.selectedBrush === r.id ? 'selected' : '';
      html += `<button class="palette-btn regime-${r.id} ${sel}" onclick="selectScheduleBrush('${r.id}')">${r.name.split(' ')[0]}</button>`;
    });
    html += `</div><div class="schedule-grid">`;
    for (let h = 0; h < 24; h++) {
      const r = REGIMES[state.schedule[h]];
      html += `
        <div class="sched-cell regime-${r.id}" onclick="paintScheduleHour(${h})">
          <strong>${String(h).padStart(2, '0')}:00</strong>
          <span>${r.name.split(' ')[0]}</span>
        </div>
      `;
    }
    html += `</div>`;
    contentEl.innerHTML = html;
  }

  // 4. POSIŁKI (KCAL) I NORMY PRODUKCYJNE
  else if (state.activePanel === 'nutrition') {
    titleEl.textContent = `🍲 Posiłki (kcal) i Normy Dzienne (Stołówka LVL ${ZONES.CANTEEN.level})`;
    let html = `
      <p class="section-desc">
        Ustal <b>co jedzą więźniowie i ile</b> dla każdego progu wyrobienia normy (<b><50%</b>, <b>100%</b>, <b>125%+</b>).
        Ulepszanie karty <b>Stołówki</b> zwiększa kaloryczność każdego posiłku o +12% na poziom!
      </p>
    `;

    ['TIER_50', 'TIER_100', 'TIER_125'].forEach(tKey => {
      const m = state.meals[tKey];
      const calc = getMealKcalAndCost(tKey);
      const balance = calc.totalKcal - calc.burnedKcal;
      const balColor = balance >= 0 ? '#2ecc71' : '#ff6b6b';

      html += `
        <div class="info-box">
          <h4>
            <span>${m.label}</span>
            <span style="color:${balColor};">${calc.totalKcal} kcal / zużywa ${calc.burnedKcal} kcal</span>
          </h4>
          <p>Koszt: <b>${calc.cost} ₽/os.</b> • Bilans: <b style="color:${balColor};">${balance >= 0 ? '+' + balance : balance} kcal/dzień</b></p>
          <div class="grid-3" style="align-items:center;">
            <div>
              <label style="font-size:10.5px; color:#ccc;">Chleb żytni (${m.breadGrams}g):</label>
              <input type="range" min="200" max="1100" step="50" value="${m.breadGrams}" style="width:100%;"
                oninput="updateMealConfig('${tKey}', 'breadGrams', parseInt(this.value))" />
            </div>
            <div>
              <label style="font-size:10.5px; color:#ccc;">Zupa (Bałanda):</label>
              <select class="job-select" style="width:100%;" onchange="updateMealConfig('${tKey}', 'soup', this.value)">
                ${Object.values(SOUP_TYPES).map(s => `<option value="${s.id}" ${m.soup === s.id ? 'selected' : ''}>${s.name} (${s.kcal} kcal)</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="font-size:10.5px; color:#ccc;">Dodatek:</label>
              <select class="job-select" style="width:100%;" onchange="updateMealConfig('${tKey}', 'extra', this.value)">
                ${Object.values(EXTRA_TYPES).map(ex => `<option value="${ex.id}" ${m.extra === ex.id ? 'selected' : ''}>${ex.name} (+${ex.kcal} kcal)</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      `;
    });

    html += `
      <div class="info-box" style="border-color:var(--accent-gold);">
        <h4>📏 Ustawienie 100% Normy Dziennej dla każdej pracy (Statystyki Brygad)</h4>
        <p style="font-size:11px; color:#bbb; margin-bottom:8px;">
          Poniżej widzisz <b>ile średnio dziennie wyrabia więzień</b> w danej pracy, a także wynik <b>najlepszego (Przodownika)</b> i <b>najgorszego (Dochodiagi)</b> więźnia. Ustaw normę tak, aby najlepsi mogli sięgnąć po <b>Kocioł III (125%+)</b>, przeciętni po <b>Kocioł II (75–124%)</b>, a najsłabsi trafiali na <b>Kocioł I (&lt;75%)</b>!
        </p>
        <div class="grid-2">
          ${Object.values(JOBS).map(j => {
            const st = getJobProductionStats(j.id);
            const curQuota = state.quotas[j.id];
            const sliderMax = Math.max(150, curQuota + 30);
            return `
              <div style="background:#1a1d20; padding:9px; border-radius:6px; border:1px solid #353b42;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <span style="font-size:12px; font-weight:bold; color:#fff;">${j.name}</span>
                  <span style="font-size:10.5px; color:#9ec5fe;">Brygada: <b>${st.assignedCount} os.</b></span>
                </div>

                <div style="font-size:12px; color:#ddd; margin:4px 0 6px; background:#121417; padding:5px 7px; border-radius:4px; border-left:3px solid var(--accent-gold);">
                  100% normy = <b style="color:#f5c542; font-size:13.5px;">${curQuota} ${j.unit}</b> / dzień
                  <div style="font-size:10px; color:#aaa; margin-top:2px;">
                    Kocioł II (75%+): od <b>${st.req75}</b> • Kocioł III (125%+): od <b>${st.req125} ${j.unit}</b>
                  </div>
                </div>

                <div style="background:#14171a; padding:6px 7px; border-radius:4px; font-size:10.5px; line-height:1.45; margin-bottom:7px; border:1px solid #292e33;">
                  <div style="color:#f5c542;">📊 <b>Średnio wyrabia więzień:</b> <b>${st.avgDaily} ${j.unit}/dzień</b> <span style="color:#888;">(dziś śr.: ${st.avgToday})</span></div>
                  <div style="color:#2ecc71;">🏆 <b>Najlepszy więzień:</b> <b>${st.bestDaily} ${j.unit}/dzień</b> — <i>${st.bestName}</i> <span style="color:#888;">(dziś: ${st.bestToday})</span></div>
                  <div style="color:#e74c3c;">🐌 <b>Najgorszy więzień:</b> <b>${st.worstDaily} ${j.unit}/dzień</b> — <i>${st.worstName}</i> <span style="color:#888;">(dziś: ${st.worstToday})</span></div>
                  <div style="margin-top:4px; padding-top:4px; border-top:1px dashed #333; color:#ccc; font-size:10px;">
                    Prognoza kotłów przy normie <b>${curQuota}</b>:
                    <span style="color:#2ecc71; font-weight:bold;">III: ${st.tier125Count} os.</span> •
                    <span style="color:#f5c542; font-weight:bold;">II: ${st.tier100Count} os.</span> •
                    <span style="color:#e74c3c; font-weight:bold;">I: ${st.tier50Count} os.</span>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                  <input type="range" min="1" max="${sliderMax}" step="1" value="${curQuota}"
                    style="flex:1; cursor:pointer;"
                    oninput="setJobQuotaExact('${j.id}', this.value)">
                  <input type="number" min="1" max="500" value="${curQuota}"
                    style="width:54px; background:#111; color:#f5c542; border:1px solid #555; border-radius:4px; padding:2px 4px; font-weight:bold; text-align:center;"
                    onchange="setJobQuotaExact('${j.id}', this.value)">
                </div>

                <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:5px;">
                  <button class="speed-btn" onclick="changeJobQuota('${j.id}', -10)">-10</button>
                  <button class="speed-btn" onclick="changeJobQuota('${j.id}', -5)">-5</button>
                  <button class="speed-btn" onclick="changeJobQuota('${j.id}', -1)">-1</button>
                  <button class="speed-btn" onclick="changeJobQuota('${j.id}', 1)">+1</button>
                  <button class="speed-btn" onclick="changeJobQuota('${j.id}', 5)">+5</button>
                  <button class="speed-btn" onclick="changeJobQuota('${j.id}', 10)">+10</button>
                </div>

                <div style="display:flex; gap:4px;">
                  <button class="speed-btn" style="flex:1; background:#2b3a2c; border-color:#2ecc71; font-size:10px;"
                    onclick="setJobQuotaExact('${j.id}', ${Math.max(1, Math.round(st.avgDaily))})">
                    🎯 Ustaw pod średnią (${Math.max(1, Math.round(st.avgDaily))})
                  </button>
                  <button class="speed-btn" style="flex:1; background:#3a3122; border-color:#f5c542; font-size:10px;"
                    onclick="setJobQuotaExact('${j.id}', ${Math.max(1, Math.round(st.bestDaily * 0.8))})">
                    ⚡ Stachanowska (${Math.max(1, Math.round(st.bestDaily * 0.8))})
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    contentEl.innerHTML = html;
  }

  // 5. PRACE I BRYGADY
  else if (state.activePanel === 'jobs') {
    titleEl.textContent = '🪓 Prace, Dalekie Brygady i Sprzedaż Drewna';
    const counts = { WOOD: 0, TRAIN: 0, QUARRY: 0, KITCHEN: 0 };
    state.prisoners.forEach(p => counts[p.job] = (counts[p.job] || 0) + 1);

    let html = `
      <div class="info-box" style="border-color: var(--accent-gold);">
        <h4>🪵 Handel Drewnem z Tartaku <span>Zapas: ${state.wood} szt.</span></h4>
        <p>Sprzedaj nadwyżkę drewna za ruble, aby mieć środki na ulepszanie kart budynków!</p>
        <button class="action-btn green" ${state.wood < 25 ? 'disabled' : ''} onclick="sellWoodBundle()">
          Sprzedaj 25 szt. drewna (+100 ₽)
        </button>
      </div>
    `;
    Object.values(JOBS).forEach(j => {
      const st = getJobProductionStats(j.id);
      html += `
        <div class="info-box">
          <h4>${j.name} <span style="color:var(--accent-gold);">Brygada: ${counts[j.id] || 0} os. • Norma: ${state.quotas[j.id]} ${j.unit}</span></h4>
          <p>${j.desc}</p>
          <div style="font-size:11px; color:#ccc; background:#14171a; padding:6px 8px; border-radius:4px; margin-bottom:6px;">
            📊 Średnio: <b style="color:#f5c542;">${st.avgDaily} ${j.unit}/dzień</b> •
            🏆 Najlepszy: <b style="color:#2ecc71;">${st.bestDaily}</b> (${st.bestName}) •
            🐌 Najgorszy: <b style="color:#e74c3c;">${st.worstDaily}</b> (${st.worstName})
          </div>
          <button class="action-btn secondary" onclick="reassignOnePrisoner('${j.id}')">+ Przydziel więźnia do tej brygady</button>
        </div>
      `;
    });
    contentEl.innerHTML = html;
  }

  // 6. WIĘŹNIOWIE I FRAKCJE
  else if (state.activePanel === 'prisoners') {
    titleEl.textContent = `👥 Ewidencja Więźniów (${state.prisoners.length}/${getPrisonerCapacity()})`;
    let html = `<div class="grid-2" style="margin-bottom:8px;">`;
    Object.values(FACTIONS).forEach(f => {
      const count = state.prisoners.filter(p => p.faction === f.id).length;
      html += `
        <div class="info-box" style="margin-bottom:0;">
          <h4><span class="faction-tag faction-${f.id}">${f.name}</span> <span>${count} os.</span></h4>
          <p style="margin-bottom:0; font-size:10.5px;">${f.desc}</p>
        </div>
      `;
    });
    html += `</div><div class="prisoner-list">`;

    const jobShortLabels = {
      WOOD: '🪵 Las',
      TRAIN: '🚂 Kolej',
      QUARRY: '⛏️ Skały',
      KITCHEN: '🍲 Kuchnia'
    };

    state.prisoners.forEach(p => {
      const tierKey = getPrisonerMealTier(p);
      const isStarv = p.nutrition < 30;
      const isExh = (p.energy !== undefined ? p.energy : 100) <= 0;
      html += `
        <div class="prisoner-row" onclick="selectEntityById(${p.id})" style="flex-direction:column; align-items:stretch; gap:5px;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
            <div>
              <strong>${isStarv ? '🍖 ' : ''}${isExh ? '🪫 ' : ''}${p.name}</strong>
              <span class="faction-tag faction-${p.faction}" style="margin-left:5px;">${FACTIONS[p.faction].short}</span>
              ${p.inHospital ? `<span style="color:#5dade2; font-weight:bold; margin-left:4px;">[🏥 W SZPITALU: ${p.hospitalHoursLeft.toFixed(1)}h]</span>` : ''}
              ${isStarv ? `<span style="color:#ff5555; font-weight:bold; margin-left:4px;">[🍖 GŁÓD: ${Math.max(1, Math.ceil(24 - p.starvationHours))}h do śmierci!]</span>` : ''}
              ${isExh ? `<span style="color:#c39bd3; font-weight:bold; margin-left:4px;">[🪫 WYCZERPANY: praca 4x wolniej!]</span>` : ''}
              <div style="font-size:10.5px; color:#aaa; margin-top:2px;">
                ❤️ HP: <b>${Math.round(p.hp)}/${p.maxHp}</b> • ❄️ Ciepło: <b>${Math.round(p.warmth)}%</b> • 🍖 Sytość: <b style="color:${isStarv ? '#ff4444' : '#e67e22'};">${Math.round(p.nutrition)}%</b> • ⚡ Energia: <b style="color:${isExh ? '#ff5555' : '#f1c40f'};">${Math.round(p.energy !== undefined ? p.energy : 100)}%</b> • 📊 Norma: <b style="color:#f5c542;">${Math.max(p.quotaPct, p.lastDayQuotaPct || 0)}%</b> (${state.meals[tierKey].label.split('(')[0].trim()})
              </div>
              <div style="font-size:10px; color:#9bd19e;">${p.workTraitLabel || '🔨 Robotnik'}</div>
            </div>
            <select class="job-select" onclick="event.stopPropagation()" onchange="changePrisonerJob(${p.id}, this.value)">
              ${Object.values(JOBS).map(j => `<option value="${j.id}" ${p.job === j.id ? 'selected' : ''}>${j.name}</option>`).join('')}
            </select>
          </div>
          <div class="job-pills-row" onclick="event.stopPropagation()">
            ${Object.values(JOBS).map(j => `
              <button class="job-pill-btn ${p.job === j.id ? 'active' : ''}" onclick="changePrisonerJob(${p.id}, '${j.id}')">
                ${jobShortLabels[j.id] || j.name}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });
    html += `</div>`;
    contentEl.innerHTML = html;
  }

  // 7. STRAŻNICY I RAPORTY
  else if (state.activePanel === 'guards') {
    titleEl.textContent = `💂 Strażnicy WOChR (${state.guards.length}) i Raporty Karne`;
    const hireCost = 130 + state.guards.length * 35;
    let html = `
      <div class="info-box">
        <h4>Zwerbuj nowego strażnika WOChR <span>Koszt: ${hireCost} ₽</span></h4>
        <button class="action-btn green" ${state.money < hireCost ? 'disabled' : ''} onclick="hireGuard(${hireCost})">
          💂 Zatrudnij strażnika (${hireCost} ₽)
        </button>
      </div>
    `;

    if (state.crimeReports.length > 0) {
      html += `<h4 style="color:#ff8888; font-size:12px; margin:8px 0 5px;">🚨 Oczekujące Raporty od Strażników (${state.crimeReports.length}):</h4>`;
      state.crimeReports.slice(0, 5).forEach(rep => {
        html += `
          <div class="info-box" style="border-color:#e74c3c;">
            <h4>${rep.prisonerName} <span>${rep.crimeTitle}</span></h4>
            <p>${rep.crimeDesc}</p>
            <button class="action-btn" onclick="openCrimeReportById(${rep.id})">⚖️ Wybierz karę dla więźnia</button>
          </div>
        `;
      });
    }

    const patrolOptions = [
      { id: 'ROLLCALL', name: 'Plac Apelowy i Obóz' },
      { id: 'FOREST', name: 'Daleka Tajga (Wyrąb)' },
      { id: 'TRAIN_DOCK', name: 'Daleka Rampa Kolejowa' },
      { id: 'QUARRY', name: 'Daleki Kamieniołom' },
      { id: 'BARRACKS_1', name: 'Baraki więzienne' }
    ];
    html += `<div class="prisoner-list">`;
    state.guards.forEach(g => {
      html += `
        <div class="prisoner-row" onclick="selectEntityById(${g.id})">
          <div>
            <strong>💂 ${g.name}</strong>
            <div style="font-size:10.5px; color:#9bd19e;">Służba patrolowa • Uzbrojony</div>
          </div>
          <select class="job-select" onclick="event.stopPropagation()" onchange="changeGuardPatrol(${g.id}, this.value)">
            ${patrolOptions.map(o => `<option value="${o.id}" ${g.patrolZone === o.id ? 'selected' : ''}>Patrol: ${o.name}</option>`).join('')}
          </select>
        </div>
      `;
    });
    html += `</div>`;
    contentEl.innerHTML = html;
  }

  // 8. TRANSPORT WIĘŹNIÓW
  else if (state.activePanel === 'transport') {
    titleEl.textContent = '🚂 Sprowadzanie Etapów (Animacja Pociągu)';
    const freeBeds = getPrisonerCapacity() - state.prisoners.length;
    const busy = state.transportAnim.active;
    const daysUntilAutoUrka = 3 - (state.day % 3);
    let html = `
      <p class="section-desc">
        Wolne miejsca w barakach: <b>${freeBeds}</b> (${state.prisoners.length}/${getPrisonerCapacity()}).
        Bohaterowie z książki <i>„Inny Świat”</i> pojawiają się maksymalnie <b>po 1 razie na całą grę</b>, a pozostali więźniowie są losowi.
      </p>
      <div class="info-box" style="border-color:#e74c3c; background:rgba(231,76,60,0.12);">
        <h4>🚂 Automatyczny Etap z Centrali: 8 Urków co 3 dni <span style="color:#ff8888;">Za: ${daysUntilAutoUrka} ${daysUntilAutoUrka === 1 ? 'dzień' : 'dni'} (Dzień ${state.day + daysUntilAutoUrka})</span></h4>
        <p style="font-size:11.5px; color:#ddd; margin-bottom:2px;">
          Raz na <b>3 dni</b> (Dzień 3, 6, 9, 12...) pociąg z Centrali Gułagu przyjeżdża <b>samoczynnie</b> i wyładowuje na rampie <b>8 groźnych Urków („Błatnych”)</b> wraz z dotacją +180 ₽. Pamiętaj o zatrudnianiu strażników i rozbudowie Wyszek!
        </p>
      </div>
      <div class="info-box" style="border-color:#ff66b2; background:rgba(155,48,255,0.12);">
        <h4>👕 Pociąg Uległych (+3 specjalnych NPC) <span style="color:#ff66b2;">Koszt: 0 ₽</span></h4>
        <p style="font-size:11.5px; color:#ddd; margin-bottom:6px;">
          Z pociągu wychodzi 3 specjalnych NPC:<br>
          • <b style="color:#ff66b2;">Antoni Zadrożny</b> (różowa koszula)<br>
          • <b style="color:#b86bff;">Matvii Mozheiko</b> (fioletowa koszula)<br>
          • <b style="color:#4da6ff;">Yaraslau Belski</b> (niebieska koszula)<br>
          ⚠️ Są zgłaszani przez strażników o popełnienie przestępstwa <b>co 10 sekund</b> (nawet gdy nic nie zrobili), aż nie zginą, i <b>nigdy nie trafiają do szpitala</b>!
        </p>
        <button class="action-btn" style="background:linear-gradient(90deg,#c2185b,#6a1b9a,#1565c0); border-color:#ff99cc;" ${busy ? 'disabled' : ''} onclick="orderPrisonerTransport('SUBMISSIVE')">
          ${busy ? '🚂 Pociąg etapowy w drodze...' : '🚃 Wezwij Pociąg Uległych (0 ₽)'}
        </button>
      </div>
      <div class="info-box">
        <h4>🚃 Etap Mieszany (+4 więźniów) <span>Koszt: 90 ₽</span></h4>
        <button class="action-btn secondary" ${(busy || freeBeds < 1 || state.money < 90) ? 'disabled' : ''} onclick="orderPrisonerTransport('MIXED')">
          ${busy ? '🚂 Pociąg etapowy w drodze...' : 'Zamów Pociąg Etapowy Mieszany (90 ₽)'}
        </button>
      </div>
      <div class="info-box">
        <h4>📘 Spec-Etap Politycznych z Art. 58 (+4 więźniów) <span>Koszt: 150 ₽</span></h4>
        <button class="action-btn secondary" ${(busy || freeBeds < 1 || state.money < 150) ? 'disabled' : ''} onclick="orderPrisonerTransport('POLITICAL')">
          ${busy ? '🚂 Pociąg etapowy w drodze...' : 'Zamów Pociąg Politycznych (150 ₽)'}
        </button>
      </div>
      <div class="info-box">
        <h4>🔪 Karny Transport Urków (+4 więźniów) <span style="color:#2ecc71;">Dotacja: +130 ₽!</span></h4>
        <button class="action-btn" ${(busy || freeBeds < 1) ? 'disabled' : ''} onclick="orderPrisonerTransport('URKA')">
          ${busy ? '🚂 Pociąg etapowy w drodze...' : 'Przyjmij Pociąg Urków (+130 ₽)'}
        </button>
      </div>
    `;
    contentEl.innerHTML = html;
  }

  // 9. BUDOWA NOWYCH OBIEKTÓW NA MAPIE 3D + ULEPSZANIE I PRZESUWANIE POSTAWIONYCH BUDYNKÓW
  else if (state.activePanel === 'build') {
    const bBounds = getCampBounds();
    const campW = Math.round(bBounds.maxX - bBounds.minX);
    const campD = Math.round(bBounds.maxZ - bBounds.minZ);
    const nextReq = getNextStarUpgradeTarget();
    const curUpg = state.totalBuildingUpgrades || 0;
    titleEl.textContent = '🧱 Budowa, Ulepszanie i Przesuwanie Budynków';
    let html = `
      <p class="section-desc">
        Teren Zony: <b>${campW}m × ${campD}m</b> (${getCampStarsDisplay(state.campStars)} ${state.campStars}/5 ★) •
        Ulepszenia budynków: <b style="color:#f1c40f;">${curUpg} / ${nextReq}</b> (progi gwiazdek i powiększenia terenu: <b>10, 30, 50, 100, 300</b> ulepszeń).
      </p>
    `;

    if (state.customBuildingKeys.length > 0) {
      html += `
        <div class="info-box" style="border-color:var(--accent-gold);">
          <h4>🏗️ Twoje Postawione Budynki (${state.customBuildingKeys.length}) – Ulepszaj i Przesuwaj</h4>
          <div style="display:flex; flex-direction:column; gap:6px; margin-top:6px;">
            ${state.customBuildingKeys.map(key => {
              const cz = ZONES[key];
              if (!cz) return '';
              const isMax = cz.level >= cz.maxLevel;
              const cost = getCardUpgradeCost(key);
              const canAfford = !isMax && state.money >= cost.money && state.wood >= cost.wood;
              return `
                <div style="background:#15181c; padding:7px 9px; border-radius:5px; border:1px solid #343a40; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                  <div>
                    <strong style="color:#fff; font-size:12px;">${cz.icon} ${cz.name} <span style="color:#f1c40f;">(LVL ${cz.level}/${cz.maxLevel})</span></strong>
                    <div style="font-size:10.5px; color:#aaa;">${cz.bonusDesc(cz.level)}</div>
                  </div>
                  <div style="display:flex; gap:5px;">
                    <button class="action-btn green" style="width:auto; padding:5px 9px; font-size:11px;" ${!canAfford ? 'disabled' : ''} onclick="upgradeBuildingCard('${key}')">
                      ${isMax ? '★ MAX' : `⬆️ Ulepsz (${cost.money} ₽ + ${cost.wood} 🪵)`}
                    </button>
                    <button class="action-btn secondary" style="width:auto; padding:5px 9px; font-size:11px;" onclick="startMoveBuildingMode('${key}')">
                      ✋ Przesuń
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    Object.values(BUILDABLES).forEach(b => {
      const canAfford = state.money >= b.costMoney && state.wood >= b.costWood;
      html += `
        <div class="info-box">
          <h4>${b.name} <span style="color:var(--accent-gold);">${b.costMoney} ₽ + ${b.costWood} drewna</span></h4>
          <p>${b.desc}</p>
          <button class="action-btn green" ${!canAfford ? 'disabled' : ''} onclick="startBuildMode('${b.id}')">
            🧱 Postaw na mapie 3D
          </button>
        </div>
      `;
    });
    contentEl.innerHTML = html;
  }

  // 10. USTAWIENIA GRY (ZAPIS I WCZYTAJ W PLIKACH COOKIE)
  else if (state.activePanel === 'settings') {
    titleEl.textContent = '⚙️ Ustawienia Gry (Zapis i Wczytywanie – Pliki Cookie)';
    const saveInfo = getCookieSaveMeta();

    let html = `
      <p class="section-desc">
        Zarządzaj stanem swojego obozu w Jercewie. Cały postęp (budynki, poziomy, gwiazdki, więźniowie, grafik, normy i budżet) jest zapisywany bezpośrednio w <b>plikach Cookie przeglądarki</b> (ważność: 365 dni).
      </p>

      <div class="info-box" style="border-color:var(--accent-gold); background:rgba(241, 196, 15, 0.08);">
        <h4>🍪 Zapis stanu gry w plikach Cookie <span>${saveInfo ? '✅ Zapis dostępny' : 'Brak zapisu'}</span></h4>
        ${saveInfo ? `
          <div style="background:#14171a; padding:8px 10px; border-radius:5px; font-size:11.5px; color:#ddd; margin:6px 0; border:1px solid #343a40;">
            📅 <b>Ostatni zapis:</b> ${saveInfo.savedAt}<br>
            ⭐ <b>Gwiazdki Obozu:</b> ${getCampStarsDisplay(saveInfo.campStars)} (${saveInfo.campStars}/5 ★ • ${saveInfo.totalBuildingUpgrades || 0} ulepszeń)<br>
            📆 <b>Czas w grze:</b> Dzień ${saveInfo.day}, godz. ${String(saveInfo.hour).padStart(2, '0')}:${String(saveInfo.minute || 0).padStart(2, '0')}<br>
            💰 <b>Zasoby:</b> ${saveInfo.money} ₽ • ${saveInfo.wood} szt. drewna • 👥 <b>Więźniowie:</b> ${saveInfo.prisonerCount} os.
          </div>
        ` : `
          <p style="color:#aaa; margin:6px 0;">Nie zapisano jeszcze żadnego stanu gry w plikach Cookie. Kliknij przycisk poniżej, aby zapisać obóz!</p>
        `}

        <div style="display:flex; flex-direction:column; gap:7px; margin-top:8px;">
          <button class="action-btn green" style="padding:9px; font-size:12.5px;" onclick="saveGameToCookies(false)">
            💾 Zapisz grę teraz (w plikach Cookie)
          </button>
          <button class="action-btn secondary" style="padding:9px; font-size:12.5px; background:#1f618d; border-color:#5dade2;" ${!saveInfo ? 'disabled' : ''} onclick="loadGameFromCookies(false)">
            📂 Wczytaj grę (z plików Cookie)
          </button>
          <button class="action-btn" style="padding:7px; font-size:11.5px; background:#6e1414;" ${!saveInfo ? 'disabled' : ''} onclick="deleteCookieSave()">
            🗑️ Usuń zapis z plików Cookie
          </button>
        </div>
      </div>

      <div class="info-box">
        <h4>🔄 Automatyczny Zapis i Opcje Gry</h4>
        <div style="display:flex; flex-direction:column; gap:7px; margin-top:6px;">
          <button class="action-btn secondary" onclick="toggleAutoSaveCookies()">
            ${state.autoSaveCookies ? '✅ Auto-zapis w plikach Cookie co północ (00:00): WŁĄCZONY' : '⬜ Auto-zapis w plikach Cookie co północ (00:00): WYŁĄCZONY'}
          </button>
          <button class="action-btn secondary" onclick="toggleSnowParticles()">
            ${state.snowEnabled ? '❄️ Opady śniegu 3D: WŁĄCZONE' : '☀️ Opady śniegu 3D: WYŁĄCZONE'}
          </button>
          <button class="action-btn secondary" onclick="resetCameraToCamp()">
            🎯 Wyśrodkuj kamerę na Placu Apelowym (Kąt 45°)
          </button>
        </div>
      </div>
    `;
    contentEl.innerHTML = html;
  }
}

function focusCameraOnBuilding(zoneKey) {
  const z = ZONES[zoneKey];
  if (!z) return;
  state.selectedEntity = null;
  state.selectedBuildingKey = zoneKey;
  cameraCtrl.target.set(z.x, 2.0, z.z);
  updateCameraTransform();
  renderInspector();
}

// ============================================================================
// SYSTEM ZAPISU I WCZYTYWANIA STANU GRY W PLIKACH COOKIE (Z OBSŁUGĄ WIELU PORCJI)
// ============================================================================
const COOKIE_PREFIX = 'jercewo_save_';
const COOKIE_CHUNK_SIZE = 2600; // Bezpieczny rozmiar pojedynczego ciasteczka (< 4096 bajtów)

function setBrowserCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getBrowserCookie(name) {
  const prefix = `${name}=`;
  const parts = document.cookie ? document.cookie.split('; ') : [];
  for (const part of parts) {
    if (part.indexOf(prefix) === 0) {
      return decodeURIComponent(part.substring(prefix.length));
    }
  }
  return null;
}

function removeBrowserCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function writeSaveStringToCookies(jsonStr) {
  // Usuń ewentualne stare porcje ciasteczek
  for (let i = 0; i < 12; i++) {
    removeBrowserCookie(`${COOKIE_PREFIX}chunk_${i}`);
  }

  const totalChunks = Math.ceil(jsonStr.length / COOKIE_CHUNK_SIZE);
  setBrowserCookie(`${COOKIE_PREFIX}count`, String(totalChunks), 365);
  for (let i = 0; i < totalChunks; i++) {
    const slice = jsonStr.slice(i * COOKIE_CHUNK_SIZE, (i + 1) * COOKIE_CHUNK_SIZE);
    setBrowserCookie(`${COOKIE_PREFIX}chunk_${i}`, slice, 365);
  }

  // Dodatkowa kopia zapasowa na wypadek otwierania z lokalnego dysku (file://), gdzie część przeglądarek ogranicza document.cookie
  try {
    localStorage.setItem(`${COOKIE_PREFIX}backup`, jsonStr);
  } catch (_) {}
}

function readSaveStringFromCookies() {
  const countStr = getBrowserCookie(`${COOKIE_PREFIX}count`);
  if (countStr) {
    const count = parseInt(countStr, 10);
    if (count > 0 && count <= 20) {
      let full = '';
      let ok = true;
      for (let i = 0; i < count; i++) {
        const ch = getBrowserCookie(`${COOKIE_PREFIX}chunk_${i}`);
        if (ch === null) {
          ok = false;
          break;
        }
        full += ch;
      }
      if (ok && full.length > 2) return full;
    }
  }

  try {
    const backup = localStorage.getItem(`${COOKIE_PREFIX}backup`);
    if (backup) return backup;
  } catch (_) {}
  return null;
}

function getCookieSaveMeta() {
  const raw = readSaveStringFromCookies();
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return {
      savedAt: data.savedAt || 'Nieznana data',
      day: data.day || 1,
      hour: data.hour !== undefined ? data.hour : 7,
      minute: data.minute || 0,
      money: data.money || 0,
      wood: data.wood || 0,
      campStars: data.campStars || 0,
      totalBuildingUpgrades: data.totalBuildingUpgrades || 0,
      prisonerCount: Array.isArray(data.prisoners) ? data.prisoners.length : 0
    };
  } catch (_) {
    return null;
  }
}

function saveGameToCookies(silent = false) {
  const saveData = {
    v: 1,
    savedAt: new Date().toLocaleString('pl-PL'),
    money: state.money,
    wood: state.wood,
    day: state.day,
    hour: state.hour,
    minute: state.minute,
    temperature: state.temperature,
    deaths: state.deaths,
    campLevel: state.campLevel,
    campStars: state.campStars,
    totalBuildingUpgrades: state.totalBuildingUpgrades || 0,
    extraBarrackBeds: state.extraBarrackBeds || 0,
    herlingRosterIndex,
    autoSaveCookies: state.autoSaveCookies,
    snowEnabled: state.snowEnabled,
    quotas: { ...state.quotas },
    meals: JSON.parse(JSON.stringify(state.meals)),
    schedule: [...state.schedule],
    coreBuildings: CARD_KEYS.map(key => ({
      k: key,
      l: ZONES[key].level,
      x: ZONES[key].x,
      z: ZONES[key].z
    })),
    customBuildings: state.customBuildings.map(cb => ({
      t: cb.type,
      l: cb.level,
      x: cb.x,
      z: cb.z,
      n: cb.name
    })),
    prisoners: state.prisoners.map(p => ({
      n: p.name,
      f: p.faction,
      j: p.job,
      hp: Math.round(p.hp),
      w: Math.round(p.warmth),
      nut: Math.round(p.nutrition),
      en: Math.round(p.energy !== undefined ? p.energy : 100),
      sh: Math.round((p.starvationHours || 0) * 10) / 10,
      wt: p.workTalent,
      wl: p.workTraitLabel,
      up: p.unitsProducedToday,
      qp: p.quotaPct,
      lq: p.lastDayQuotaPct,
      ob: Math.round(p.obedience),
      ih: p.inHospital ? 1 : 0,
      hh: Math.round((p.hospitalHoursLeft || 0) * 10) / 10,
      nh: p.neverHospital ? 1 : 0,
      sub: p.isSubmissiveSpecial ? 1 : 0,
      sc: p.customShirtColor || 0,
      hc: p.customHatColor || 0,
      sl: p.shirtLabel || '',
      x: Math.round(p.x * 10) / 10,
      z: Math.round(p.z * 10) / 10
    })),
    guards: state.guards.map(g => ({
      n: g.name,
      pz: g.patrolZone,
      x: Math.round(g.x * 10) / 10,
      z: Math.round(g.z * 10) / 10
    }))
  };

  const jsonStr = JSON.stringify(saveData);
  writeSaveStringToCookies(jsonStr);

  if (!silent) {
    addLog(`💾 ZAPISANO GRĘ W PLIKACH COOKIE (${saveData.savedAt} • Dzień ${state.day}, ${getCampStarsDisplay(state.campStars)})!`, 'good');
    if (state.activePanel === 'settings') renderActivePanel();
  }
}

function loadGameFromCookies(silent = false) {
  const raw = readSaveStringFromCookies();
  if (!raw) {
    if (!silent) addLog('⚠️ Brak zapisanego stanu gry w plikach Cookie!', 'warn');
    return false;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    if (!silent) addLog('⚠️ Błąd odczytu danych z plików Cookie!', 'danger');
    return false;
  }

  if (cutsceneState.active) finishCutscene();
  closeCrimeModal();
  closeSpeechModal();
  cancelBuildMode();
  state.selectedEntity = null;
  state.selectedBuildingKey = null;
  state.crimeReports = [];

  state.money = data.money !== undefined ? data.money : 650;
  state.wood = data.wood !== undefined ? data.wood : 90;
  state.day = data.day || 1;
  state.hour = data.hour !== undefined ? data.hour : 7;
  state.minute = data.minute || 0;
  state.temperature = data.temperature !== undefined ? data.temperature : -18;
  state.deaths = data.deaths || 0;
  state.campLevel = data.campLevel || 1;
  state.campStars = data.campStars || 0;
  state.totalBuildingUpgrades = data.totalBuildingUpgrades || 0;
  state.autoSaveCookies = data.autoSaveCookies !== undefined ? data.autoSaveCookies : true;
  state.snowEnabled = data.snowEnabled !== undefined ? data.snowEnabled : true;
  if (snowSystem) snowSystem.visible = state.snowEnabled;
  if (data.herlingRosterIndex !== undefined) herlingRosterIndex = data.herlingRosterIndex;

  if (data.quotas) state.quotas = { ...state.quotas, ...data.quotas };
  if (data.meals) state.meals = data.meals;
  if (Array.isArray(data.schedule) && data.schedule.length === 24) {
    state.schedule = [...data.schedule];
  }

  // 1. Przywróć pozycje i poziomy głównych budynków
  if (Array.isArray(data.coreBuildings)) {
    data.coreBuildings.forEach(cb => {
      const z = ZONES[cb.k];
      if (!z) return;
      z.level = cb.l || 1;
      if (cb.x !== undefined && cb.z !== undefined) {
        z.x = cb.x;
        z.z = cb.z;
        const bm = state.buildingMeshes[cb.k];
        if (bm && bm.group) bm.group.position.set(z.x, 0, z.z);
        if (z.bunkSlots) {
          z.bunkSlots.forEach(slot => {
            if (slot.relX !== undefined) {
              slot.x = z.x + slot.relX;
              slot.z = z.z + slot.relZ;
              slot.walkX = z.x + slot.relWalkX;
              slot.walkZ = z.z + slot.relWalkZ;
            }
          });
        }
      }
      const bm = state.buildingMeshes[cb.k];
      if (bm && bm.lvlSprite) refreshBuildingLevelSprite(bm.lvlSprite);
    });
  }

  // 2. Usuń obecne postawione budynki gracza i odtwórz te z zapisu Cookie
  state.customBuildingKeys.forEach(k => {
    const bm = state.buildingMeshes[k];
    if (bm && bm.group) scene.remove(bm.group);
    delete state.buildingMeshes[k];
    delete ZONES[k];
  });
  state.customBuildingKeys = [];
  state.customBuildings = [];
  state.watchtowers = state.watchtowers.filter(t => t.isCornerTower);
  state.bonfires = state.bonfires.filter(b => !b.zoneKey);
  state.sawmillDropoffs = [ZONES.SAWMILL];
  nextCustomBuildingId = 1;
  state.extraBarrackBeds = (state.campStars || 0) * 6;

  if (Array.isArray(data.customBuildings)) {
    data.customBuildings.forEach(savedB => {
      const b = BUILDABLES[savedB.t];
      if (!b) return;
      const numId = nextCustomBuildingId++;
      const zoneKey = `CUSTOM_${numId}`;
      const meta = createCustomBuildingCardMeta(savedB.t, numId);
      const lvl = savedB.l || 1;

      const zoneObj = {
        id: zoneKey,
        x: savedB.x,
        z: savedB.z,
        w: b.w,
        d: b.d,
        type: savedB.t,
        isCustom: true,
        name: savedB.n || meta.shortName,
        icon: meta.icon,
        rarity: meta.rarity,
        rarityName: meta.rarityName,
        level: lvl,
        maxLevel: 100,
        baseMoneyCost: Math.max(50, Math.round(b.costMoney * 0.85)),
        baseWoodCost: Math.max(10, Math.round(b.costWood * 0.85)),
        bonusDesc: meta.bonusDesc
      };

      ZONES[zoneKey] = zoneObj;
      state.customBuildingKeys.push(zoneKey);

      if (savedB.t === 'BARRACK') {
        buildCutawayBuilding(zoneObj, b.wallHex, b.floorHex, 'BARRACK', zoneKey);
        state.extraBarrackBeds += 8 + (lvl - 1) * 4;
        state.customBuildings.push(zoneObj);
      } else if (savedB.t === 'WATCHTOWER') {
        createWatchtowerMesh(zoneObj.x, zoneObj.z, zoneKey, false);
        const tw = state.watchtowers.find(t => t.zoneKey === zoneKey);
        if (tw) tw.radius = 28 + (lvl - 1) * 5;
        state.customBuildings.push(zoneObj);
      } else if (savedB.t === 'BONFIRE') {
        createBonfireMesh(zoneObj.x, zoneObj.z, zoneKey);
        const bf = state.bonfires.find(bfItem => bfItem.zoneKey === zoneKey);
        if (bf) bf.radius = 9.5 + (lvl - 1) * 3.0;
        state.customBuildings.push(zoneObj);
      } else if (savedB.t === 'SAWMILL_OUTPOST') {
        buildCutawayBuilding(zoneObj, b.wallHex, b.floorHex, 'SAWMILL_OUTPOST', zoneKey);
        state.sawmillDropoffs.push(zoneObj);
        state.customBuildings.push(zoneObj);
      } else if (savedB.t === 'SOLITARY') {
        buildCutawayBuilding(zoneObj, b.wallHex, b.floorHex, 'SOLITARY', zoneKey);
        state.customBuildings.push(zoneObj);
      }

      const bm = state.buildingMeshes[zoneKey];
      if (bm && bm.lvlSprite) refreshBuildingLevelSprite(bm.lvlSprite);
    });
  }

  // 3. Przebuduj powiększone ogrodzenie i mapę dla wczytanej liczby gwiazdek (0–5 ★)
  if (data.extraBarrackBeds !== undefined) {
    state.extraBarrackBeds = Math.max(state.extraBarrackBeds, data.extraBarrackBeds);
  }
  buildPerimeterFenceAndTowers();

  // 4. Odtwórz więźniów oraz strażników z zapisu Cookie
  state.prisoners.forEach(p => scene.remove(p.mesh.root));
  state.guards.forEach(g => scene.remove(g.mesh.root));
  state.prisoners = [];
  state.guards = [];
  usedPrisonerNames.clear();

  if (Array.isArray(data.prisoners)) {
    data.prisoners.forEach(sp => {
      const specialCfg = (sp.sub || sp.sc) ? {
        name: sp.n,
        faction: sp.f,
        job: sp.j,
        shirtColor: sp.sc || undefined,
        hatColor: sp.hc || undefined,
        shirtLabel: sp.sl || '',
        isSubmissiveSpecial: Boolean(sp.sub)
      } : null;

      const p = spawnPrisoner(sp.f, sp.j, { x: sp.x || 0, z: sp.z || 0 }, sp.n, specialCfg);
      p.hp = sp.hp !== undefined ? sp.hp : 100;
      p.warmth = sp.w !== undefined ? sp.w : 95;
      p.nutrition = sp.nut !== undefined ? sp.nut : 85;
      p.energy = sp.en !== undefined ? sp.en : 100;
      p.starvationHours = sp.sh || 0;
      if (sp.wt) p.workTalent = sp.wt;
      if (sp.wl) p.workTraitLabel = sp.wl;
      p.unitsProducedToday = Number.isFinite(sp.up) ? sp.up : 0;
      const defaultEstPct = Math.round((estimatePrisonerDailyOutput(p, p.job) / Math.max(1, state.quotas[p.job] || 15)) * 100);
      p.quotaPct = Number.isFinite(sp.qp) ? sp.qp : defaultEstPct;
      p.lastDayQuotaPct = Number.isFinite(sp.lq) ? sp.lq : defaultEstPct;
      p.obedience = sp.ob !== undefined ? sp.ob : 80;
      p.inHospital = Boolean(sp.ih);
      p.hospitalHoursLeft = sp.hh || 0;
      p.neverHospital = Boolean(sp.nh);
      updateOverheadSprite(p);
    });
  }

  if (Array.isArray(data.guards)) {
    data.guards.forEach(sg => {
      const g = spawnGuard(sg.pz || 'ROLLCALL');
      if (sg.n) g.name = sg.n;
      if (sg.x !== undefined && sg.z !== undefined) {
        g.x = sg.x;
        g.z = sg.z;
        g.mesh.root.position.set(g.x, 0, g.z);
      }
      updateOverheadSprite(g);
    });
  }

  state.navVersion = (state.navVersion || 1) + 1;
  updateScheduleStripUI();
  updateHUD();
  renderInspector();
  if (state.activePanel) renderActivePanel();

  if (!silent) {
    addLog(`📂 WCZYTANO GRĘ Z PLIKÓW COOKIE (Zapis z: ${data.savedAt || 'wcześniej'} • Dzień ${state.day}, ${getCampStarsDisplay(state.campStars)})!`, 'good');
  }
  return true;
}

function deleteCookieSave() {
  removeBrowserCookie(`${COOKIE_PREFIX}count`);
  for (let i = 0; i < 12; i++) {
    removeBrowserCookie(`${COOKIE_PREFIX}chunk_${i}`);
  }
  try {
    localStorage.removeItem(`${COOKIE_PREFIX}backup`);
  } catch (_) {}
  addLog('🗑️ Usunięto zapis gry z plików Cookie.', 'warn');
  if (state.activePanel === 'settings') renderActivePanel();
}

function toggleAutoSaveCookies() {
  state.autoSaveCookies = !state.autoSaveCookies;
  addLog(`🔄 Automatyczny zapis w plikach Cookie co północ: ${state.autoSaveCookies ? 'WŁĄCZONY' : 'WYŁĄCZONY'}.`, 'info');
  if (state.activePanel === 'settings') renderActivePanel();
}

function toggleSnowParticles() {
  state.snowEnabled = !state.snowEnabled;
  if (snowSystem) snowSystem.visible = state.snowEnabled;
  if (state.activePanel === 'settings') renderActivePanel();
}

function selectScheduleBrush(brushId) {
  state.selectedBrush = brushId;
  renderActivePanel();
}

function paintScheduleHour(hour) {
  state.schedule[hour] = state.selectedBrush;
  Object.keys(JOBS).forEach(jId => recalculateJobQuotaPercentages(jId));
  updateScheduleStripUI();
  renderActivePanel();
  updateHUD();
}

function updateMealConfig(tierKey, field, val) {
  state.meals[tierKey][field] = val;
  renderActivePanel();
}

function recalculateJobQuotaPercentages(jobId) {
  const newQuota = Math.max(1, state.quotas[jobId] || 15);
  state.prisoners.forEach(p => {
    if (p.job === jobId) {
      const estDaily = estimatePrisonerDailyOutput(p, jobId);
      p.lastDayQuotaPct = Math.round((estDaily / newQuota) * 100);
      p.quotaPct = p.unitsProducedToday > 0
        ? Math.round((p.unitsProducedToday / newQuota) * 100)
        : p.lastDayQuotaPct;
    }
  });
}

function changeJobQuota(jobId, delta) {
  state.quotas[jobId] = Math.max(1, Math.min(500, (state.quotas[jobId] || 15) + delta));
  recalculateJobQuotaPercentages(jobId);
  renderActivePanel();
  updateHUD();
}

function setJobQuotaExact(jobId, rawVal) {
  const parsed = parseInt(rawVal, 10);
  if (!isNaN(parsed)) {
    state.quotas[jobId] = Math.max(1, Math.min(500, parsed));
    recalculateJobQuotaPercentages(jobId);
    renderActivePanel();
    updateHUD();
  }
}

function sellWoodBundle() {
  if (state.wood >= 25) {
    state.wood -= 25;
    state.money += 100;
    addLog(`🪵 Sprzedano 25 szt. drewna za +100 ₽.`, 'good');
    updateHUD();
    renderActivePanel();
  }
}

function reassignOnePrisoner(targetJob) {
  const candidate = state.prisoners.find(p => p.job !== targetJob);
  if (candidate) {
    candidate.job = targetJob;
    candidate.carrying = false;
    candidate.mesh.carriedBox.visible = false;
    renderActivePanel();
    renderInspector();
  }
}

function changePrisonerJob(id, newJob) {
  const p = state.prisoners.find(x => x.id === id);
  if (p) {
    p.job = newJob;
    p.carrying = false;
    p.mesh.carriedBox.visible = false;
    const targetQ = Math.max(1, state.quotas[p.job] || 15);
    p.lastDayQuotaPct = Math.round((estimatePrisonerDailyOutput(p, p.job) / targetQ) * 100);
    p.quotaPct = p.unitsProducedToday > 0
      ? Math.round((p.unitsProducedToday / targetQ) * 100)
      : p.lastDayQuotaPct;
    addLog(`📋 Więzień ${p.name} przeniesiony do: ${JOBS[newJob].name}.`, 'info');
    renderInspector();
    if (state.activePanel === 'prisoners' || state.activePanel === 'jobs' || state.activePanel === 'nutrition') {
      renderActivePanel();
    }
  }
}

function hireGuard(cost) {
  if (state.money >= cost) {
    state.money -= cost;
    const zones = ['FOREST', 'TRAIN_DOCK', 'QUARRY', 'ROLLCALL'];
    const g = spawnGuard(zones[state.guards.length % zones.length]);
    addLog(`💂 Zatrudniono strażnika: ${g.name}.`, 'good');
    updateHUD();
    renderActivePanel();
  }
}

function changeGuardPatrol(id, newZone) {
  const g = state.guards.find(x => x.id === id);
  if (g) {
    g.patrolZone = newZone;
    addLog(`💂 ${g.name} patroluje teraz: ${ZONES[newZone].name}.`, 'info');
    renderInspector();
    if (state.activePanel === 'guards') {
      renderActivePanel();
    }
  }
}

function orderPrisonerTransport(kind) {
  if (state.transportAnim.active) return;

  if (kind === 'SUBMISSIVE') {
    // Pociąg Uległych za 0 rubli – zawsze mieści 3 specjalnych NPC (w razie potrzeby dostawia prycze w baraku)
    if (state.prisoners.length + 3 > getPrisonerCapacity()) {
      state.extraBarrackBeds += (state.prisoners.length + 3 - getPrisonerCapacity());
    }
    const specialList = SUBMISSIVE_TRIO.map(cfg => ({ ...cfg, isSubmissiveSpecial: true }));
    closePanel();
    addLog(`🚂 Wezwano „Pociąg Uległych” za 0 ₽! W drodze: Antoni Zadrożny (różowa koszula), Matvii Mozheiko (fioletowa koszula) i Yaraslau Belski (niebieska koszula)!`, 'warn');
    startPrisonerTransportAnimation(specialList);
    updateHUD();
    return;
  }

  const cap = getPrisonerCapacity();
  const count = Math.min(4, cap - state.prisoners.length);
  if (count <= 0) return;

  let list = [];
  if (kind === 'MIXED') {
    if (state.money < 90) return;
    state.money -= 90;
    const pool = ['BYTOVIK', 'BYTOVIK', 'SUKA', 'POLITICAL'];
    for (let i = 0; i < count; i++) list.push(pool[i % pool.length]);
  } else if (kind === 'POLITICAL') {
    if (state.money < 150) return;
    state.money -= 150;
    for (let i = 0; i < count; i++) list.push('POLITICAL');
  } else if (kind === 'URKA') {
    state.money += 130;
    for (let i = 0; i < count; i++) list.push('URKA');
  }

  closePanel();
  startPrisonerTransportAnimation(list);
  updateHUD();
}

function selectEntityById(id) {
  const found = state.prisoners.find(p => p.id === id) || state.guards.find(g => g.id === id);
  if (found) {
    state.selectedBuildingKey = null;
    state.selectedEntity = found;
    cameraCtrl.target.set(found.x, 2.0, found.z);
    updateCameraTransform();
    renderInspector();
  }
}

function sendPrisonerToHospitalManual(id) {
  const p = state.prisoners.find(x => x.id === id);
  if (!p) return;
  if (p.neverHospital) {
    addLog(`🚫 Więzień ${p.name} (z Pociągu Uległych) ma całkowity zakaz wstępu do Szpitala Obozowego!`, 'danger');
    return;
  }
  if (isPrisonerBeingPunished(p)) {
    addLog(`⚠️ Więzień ${p.name} odbywa aktualnie karę! Do szpitala może trafić dopiero po zakończeniu kary.`, 'warn');
    return;
  }
  p.inHospital = true;
  p.hospitalHoursLeft = Math.max(4, 13 - ZONES.INFIRMARY.level);
  addLog(`🏥 Skierowano więźnia ${p.name} do Szpitala na kurację do 100 HP.`, 'info');
  renderInspector();
}

function renderInspector() {
  const body = document.getElementById('inspector-body');
  const sub = document.getElementById('inspector-sub');

  // Jeśli wybrano budynek 3D -> pokaż jego Kartę Clash Royale w Inspektorze!
  if (state.selectedBuildingKey && ZONES[state.selectedBuildingKey]) {
    const key = state.selectedBuildingKey;
    const z = ZONES[key];
    const isMax = z.level >= z.maxLevel;
    const cost = getCardUpgradeCost(key);
    const canAfford = !isMax && state.money >= cost.money && state.wood >= cost.wood;
    const pct = Math.round((z.level / z.maxLevel) * 100);

    sub.textContent = `${z.rarityName} • LVL ${z.level}`;
    body.innerHTML = `
      <div class="cr-card cr-rarity-${z.rarity}">
        <div class="cr-card-top">
          <div class="cr-icon-box">
            <span>${z.icon}</span>
            <span class="cr-lvl-pill">LVL ${z.level}</span>
          </div>
          <div class="cr-title-area">
            <h4>${z.name}</h4>
            <div class="cr-rarity-label" style="color:#f1c40f;">${z.rarityName}</div>
          </div>
        </div>
        <div class="cr-xp-bar">
          <div class="cr-xp-fill" style="width:${pct}%;"></div>
          <div class="cr-xp-text">Poziom ${z.level} / ${z.maxLevel}</div>
        </div>
        <div class="cr-stats-list">
          ${z.bonusDesc(z.level)}
        </div>
        <button id="insp-cr-upg-btn" class="cr-upgrade-btn" ${!canAfford ? 'disabled' : ''} onclick="upgradeBuildingCard('${key}')">
          ${isMax ? '★ MAKSYMALNY POZIOM' : `⬆️ ULEPSZ (${cost.money} ₽ + ${cost.wood} 🪵)`}
        </button>
        <button class="action-btn secondary" style="margin-top:6px; font-size:11px; padding:6px;" onclick="startMoveBuildingMode('${key}')">
          ✋ PRZESUŃ BUDYNEK NA MAPIE
        </button>
      </div>
    `;
    return;
  }

  const e = state.selectedEntity;
  if (!e) {
    sub.textContent = 'Dotknij postać lub budynek 3D';
    body.innerHTML = `Dotknij / kliknij dowolnego <b>więźnia</b> (aby zmienić pracę, wymierzyć karę lub wysłać do szpitala) albo dowolny <b>budynek 3D</b>, aby ulepszyć jego Kartę!`;
    return;
  }

  if (e.type === 'PRISONER') {
    const f = FACTIONS[e.faction];
    sub.textContent = `Akta #${1040 + e.id}`;
    const hpPct = Math.round((e.hp / e.maxHp) * 100);
    const warmPct = Math.round(e.warmth);
    const tierKey = getPrisonerMealTier(e);
    const mealCalc = getMealKcalAndCost(tierKey);

    const jobShortLabels = {
      WOOD: '🪵 Wyrąb Lasu',
      TRAIN: '🚂 Rampa Kolej.',
      QUARRY: '⛏️ Kamieniołom',
      KITCHEN: '🍲 Kuchnia'
    };

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <strong style="font-size:14px; color:#fff;">${e.name}</strong>
        <span class="faction-tag faction-${e.faction}">${f.name}</span>
      </div>

      ${e.isSubmissiveSpecial ? `
        <div style="background:rgba(194,24,91,0.22); border:1px solid #ff66b2; color:#ffccf2; padding:5px; border-radius:4px; font-size:10.5px; margin-bottom:5px;">
          👕 <b>Pociąg Uległych (${e.shirtLabel}):</b> Zgłaszany co 10s za przestępstwo • 🚫 Nigdy nie trafia do szpitala!
        </div>
      ` : ''}

      <div id="insp-hosp-box" style="display:${e.inHospital ? 'block' : 'none'}; background:#1b4f72; color:#fff; padding:5px; border-radius:4px; font-size:11px; margin-bottom:5px;">
        🏥 <b>W SZPITALU:</b> Leczy się do 100 HP (pozostało ${e.hospitalHoursLeft.toFixed(1)}h)
      </div>

      <div id="insp-starv-box" style="display:${e.nutrition < 30 ? 'block' : 'none'}; background:#7a1414; border:1px solid #ffbb33; color:#fff5cc; padding:5px; border-radius:4px; font-size:10.5px; margin-bottom:5px;">
        🍖 <b>WYGŁODZONY (&lt;30%):</b> Porusza się 2x wolniej! Śmierć z głodu za <b>${Math.max(1, Math.ceil(24 - (e.starvationHours || 0)))}h</b>!
      </div>

      <div id="insp-energy-box" style="display:${(e.energy !== undefined ? e.energy : 100) <= 0 ? 'block' : 'none'}; background:#4a154b; border:1px solid #f1c40f; color:#ffeaa7; padding:5px; border-radius:4px; font-size:10.5px; margin-bottom:5px;">
        🪫 <b>BRAK ENERGII (≤0%):</b> Więzień jest wyczerpany i pracuje <b>4x wolniej</b>!
      </div>

      <div id="insp-hp-text" style="font-size:11px; margin-bottom:2px;">❤️ Zdrowie (HP): <b>${Math.round(e.hp)} / ${e.maxHp}</b> • Posłuszeństwo: <b>${Math.round(e.obedience)}%</b></div>
      <div class="bar-wrap"><div id="insp-hp-bar" class="bar-fill" style="width:${hpPct}%; background:${hpPct > 45 ? '#2ecc71' : '#e74c3c'};"></div></div>

      <div id="insp-warm-text" style="font-size:11px; margin-top:4px; margin-bottom:2px;">❄️ Ciepło: <b>${warmPct}%</b> (spadek na mrozie: 5%/h)</div>
      <div class="bar-wrap"><div id="insp-warm-bar" class="bar-fill" style="width:${warmPct}%; background:#3498db;"></div></div>

      <div id="insp-nut-text" style="font-size:11px; margin-top:4px; margin-bottom:2px;">🍖 Sytość: <b>${Math.round(e.nutrition)}%</b> ${e.nutrition < 30 ? '<b style="color:#ff5555;">(GŁÓD – 2x wolniejszy!)</b>' : ''}</div>
      <div class="bar-wrap"><div id="insp-nut-bar" class="bar-fill" style="width:${Math.round(e.nutrition)}%; background:${e.nutrition >= 30 ? '#e67e22' : '#ff2222'};"></div></div>

      <div id="insp-energy-text" style="font-size:11px; margin-top:4px; margin-bottom:2px;">⚡ Energia: <b>${Math.round(e.energy !== undefined ? e.energy : 100)}%</b> (-5%/h pracy, +20%/h odpoczynku) ${(e.energy !== undefined && e.energy <= 0) ? '<b style="color:#ff5555;">(4x wolniej!)</b>' : ''}</div>
      <div class="bar-wrap"><div id="insp-energy-bar" class="bar-fill" style="width:${Math.max(0, Math.min(100, Math.round(e.energy !== undefined ? e.energy : 100)))}%; background:${(e.energy !== undefined ? e.energy : 100) > 25 ? '#f1c40f' : '#9b59b6'};"></div></div>

      <div style="background:#1a1d21; padding:6px; border-radius:4px; margin-top:6px; font-size:11px;">
        <div style="color:#9bd19e; font-size:10.5px; margin-bottom:2px;">${e.workTraitLabel || '🔨 Robotnik'}</div>
        <div id="insp-quota-text">📊 Norma: <b style="color:#f5c542;">${Math.max(e.quotaPct, e.lastDayQuotaPct || 0)}%</b> (dziś: ${e.unitsProducedToday}/${state.quotas[e.job]} ${JOBS[e.job].unit})</div>
        <div id="insp-meal-text">🍲 Przydział: <b>${state.meals[tierKey].label.split('(')[0]}</b> (${mealCalc.totalKcal} kcal / zużywa ${mealCalc.burnedKcal} kcal)</div>
      </div>

      <div style="margin-top:6px;">
        <label style="font-size:10.5px; color:#ccc; display:block; margin-bottom:3px;">Przydział pracy (1 dotknięcie lub lista):</label>
        <div class="job-pills-row">
          ${Object.values(JOBS).map(j => `
            <button class="job-pill-btn ${e.job === j.id ? 'active' : ''}" onclick="changePrisonerJob(${e.id}, '${j.id}')">
              ${jobShortLabels[j.id] || j.name}
            </button>
          `).join('')}
        </div>
        <select class="job-select" style="width:100%; margin-top:5px;" onchange="changePrisonerJob(${e.id}, this.value)">
          ${Object.values(JOBS).map(j => `<option value="${j.id}" ${e.job === j.id ? 'selected' : ''}>${j.name}</option>`).join('')}
        </select>
      </div>

      <div style="margin-top:7px; border-top:1px solid #3a3f45; padding-top:6px;">
        <div style="font-size:11px; font-weight:bold; color:#e67e22; margin-bottom:4px;">⚖️ Wymierz Karę Dyscyplinarną:</div>
        <div class="punish-grid">
          <button class="action-btn secondary" style="font-size:10.5px; padding:4px;" onclick="punishPrisoner(${e.id}, 'WARN')">🗣️ Nagana</button>
          <button class="action-btn warn" style="font-size:10.5px; padding:4px;" onclick="punishPrisoner(${e.id}, 'RATION_CUT')">🍞 Karny Kocioł</button>
          <button class="action-btn warn" style="font-size:10.5px; padding:4px;" onclick="punishPrisoner(${e.id}, 'BATON')">🏏 Chłosta (-22 HP)</button>
          <button class="action-btn secondary" style="font-size:10.5px; padding:4px;" onclick="punishPrisoner(${e.id}, 'SOLITARY')">🔒 Karcer</button>
          <button class="action-btn" style="font-size:10.5px; padding:4px;" onclick="punishPrisoner(${e.id}, 'FREEZE_POST')">🥶 Słup na mrozie</button>
          <button class="action-btn" style="font-size:10.5px; padding:4px; background:#6e1414;" onclick="punishPrisoner(${e.id}, 'EXECUTE')">🔫 Rozstrzelaj</button>
        </div>
        <button class="action-btn green" style="font-size:10.5px; padding:4px; margin-top:5px;" ${e.neverHospital ? 'disabled' : ''} onclick="sendPrisonerToHospitalManual(${e.id})">
          ${e.neverHospital ? '🚫 Zakaz Szpitala (Pociąg Uległych)' : '🏥 Wyślij do Szpitala na kurację'}
        </button>
      </div>
    `;
  } else {
    sub.textContent = `Strażnik WOChR`;
    body.innerHTML = `
      <strong style="font-size:14px; color:#82d173;">💂 ${e.name}</strong>
      <p style="font-size:11px; color:#aaa; margin:6px 0;">Pilnuje więźniów, składa raporty o przestępstwach, pacyfikuje bójki i zwiększa tempo pracy o +25%.</p>
      <label style="font-size:11px; color:#ccc; display:block; margin-bottom:3px;">Strefa patrolu:</label>
      <select class="job-select" style="width:100%; padding:5px;" onchange="changeGuardPatrol(${e.id}, this.value)">
        <option value="ROLLCALL" ${e.patrolZone === 'ROLLCALL' ? 'selected' : ''}>Plac Apelowy i Obóz</option>
        <option value="FOREST" ${e.patrolZone === 'FOREST' ? 'selected' : ''}>Daleka Tajga (Wyrąb)</option>
        <option value="TRAIN_DOCK" ${e.patrolZone === 'TRAIN_DOCK' ? 'selected' : ''}>Daleka Rampa Kolejowa</option>
        <option value="QUARRY" ${e.patrolZone === 'QUARRY' ? 'selected' : ''}>Daleki Kamieniołom</option>
        <option value="BARRACKS_1" ${e.patrolZone === 'BARRACKS_1' ? 'selected' : ''}>Baraki więzienne</option>
      </select>
    `;
  }
}

// Płynna aktualizacja samych liczb i pasków w Inspektorze BEZ przeładowywania DOM
// (dzięki temu otwarta lista <select> NIGDY sama nie znika!)
function updateInspectorLiveValues() {
  if (state.selectedBuildingKey && ZONES[state.selectedBuildingKey]) {
    const key = state.selectedBuildingKey;
    const z = ZONES[key];
    const btn = document.getElementById('insp-cr-upg-btn');
    if (btn) {
      const isMax = z.level >= z.maxLevel;
      const cost = getCardUpgradeCost(key);
      const canAfford = !isMax && state.money >= cost.money && state.wood >= cost.wood;
      btn.disabled = !canAfford;
    }
    return;
  }

  const e = state.selectedEntity;
  if (!e || e.type !== 'PRISONER') return;

  const hpPct = Math.round((e.hp / e.maxHp) * 100);
  const warmPct = Math.round(e.warmth);

  const hospBox = document.getElementById('insp-hosp-box');
  if (hospBox) {
    hospBox.style.display = e.inHospital ? 'block' : 'none';
    if (e.inHospital) {
      hospBox.innerHTML = `🏥 <b>W SZPITALU:</b> Leczy się do 100 HP (pozostało ${e.hospitalHoursLeft.toFixed(1)}h)`;
    }
  }

  const hpText = document.getElementById('insp-hp-text');
  if (hpText) {
    hpText.innerHTML = `❤️ Zdrowie (HP): <b>${Math.round(e.hp)} / ${e.maxHp}</b> • Posłuszeństwo: <b>${Math.round(e.obedience)}%</b>`;
  }
  const hpBar = document.getElementById('insp-hp-bar');
  if (hpBar) {
    hpBar.style.width = `${hpPct}%`;
    hpBar.style.background = hpPct > 45 ? '#2ecc71' : '#e74c3c';
  }

  const warmText = document.getElementById('insp-warm-text');
  if (warmText) {
    warmText.innerHTML = `❄️ Ciepło: <b>${warmPct}%</b> (spadek na mrozie: 5%/h)`;
  }
  const warmBar = document.getElementById('insp-warm-bar');
  if (warmBar) {
    warmBar.style.width = `${warmPct}%`;
  }

  const nutPct = Math.round(e.nutrition);
  const starvBox = document.getElementById('insp-starv-box');
  if (starvBox) {
    starvBox.style.display = e.nutrition < 30 ? 'block' : 'none';
    if (e.nutrition < 30) {
      starvBox.innerHTML = `🍖 <b>WYGŁODZONY (&lt;30%):</b> Porusza się 2x wolniej! Śmierć z głodu za <b>${Math.max(1, Math.ceil(24 - (e.starvationHours || 0)))}h</b>!`;
    }
  }
  const nutText = document.getElementById('insp-nut-text');
  if (nutText) {
    nutText.innerHTML = `🍖 Sytość: <b>${nutPct}%</b> ${e.nutrition < 30 ? '<b style="color:#ff5555;">(GŁÓD – 2x wolniejszy!)</b>' : ''}`;
  }
  const nutBar = document.getElementById('insp-nut-bar');
  if (nutBar) {
    nutBar.style.width = `${nutPct}%`;
    nutBar.style.background = e.nutrition >= 30 ? '#e67e22' : '#ff2222';
  }

  const energyVal = Math.round(e.energy !== undefined ? e.energy : 100);
  const energyBox = document.getElementById('insp-energy-box');
  if (energyBox) {
    energyBox.style.display = energyVal <= 0 ? 'block' : 'none';
  }
  const energyText = document.getElementById('insp-energy-text');
  if (energyText) {
    energyText.innerHTML = `⚡ Energia: <b>${energyVal}%</b> (-5%/h pracy, +20%/h odpoczynku) ${energyVal <= 0 ? '<b style="color:#ff5555;">(4x wolniej!)</b>' : ''}`;
  }
  const energyBar = document.getElementById('insp-energy-bar');
  if (energyBar) {
    energyBar.style.width = `${Math.max(0, Math.min(100, energyVal))}%`;
    energyBar.style.background = energyVal > 25 ? '#f1c40f' : '#9b59b6';
  }

  const quotaText = document.getElementById('insp-quota-text');
  if (quotaText) {
    quotaText.innerHTML = `📊 Norma: <b style="color:#f5c542;">${Math.max(e.quotaPct, e.lastDayQuotaPct || 0)}%</b> (dziś: ${e.unitsProducedToday}/${state.quotas[e.job]} ${JOBS[e.job].unit})`;
  }
  const mealText = document.getElementById('insp-meal-text');
  if (mealText) {
    const tierKey = getPrisonerMealTier(e);
    const mealCalc = getMealKcalAndCost(tierKey);
    mealText.innerHTML = `🍲 Przydział: <b>${state.meals[tierKey].label.split('(')[0]}</b> (${mealCalc.totalKcal} kcal / zużywa ${mealCalc.burnedKcal} kcal)`;
  }
}

// ============================================================================
// WEJŚCIE DOTYKOWE (TABLET) ORAZ MYSZY I KLAWIATURY (STAŁY KĄT 45° BEZ OBRACANIA)
// ============================================================================
function zoomCameraBy(delta) {
  if (cutsceneState.active) return;
  const maxDist = 175 + (state.campStars || 0) * 45;
  cameraCtrl.distance = Math.max(24, Math.min(maxDist, cameraCtrl.distance + delta));
  updateCameraTransform();
}

function resetCameraToCamp() {
  if (cutsceneState.active) return;
  cameraCtrl.target.set(0, 2.0, 6);
  cameraCtrl.distance = 86 + (state.campStars || 0) * 16;
  cameraCtrl.angleH = 0;
  cameraCtrl.angleV = Math.PI / 4;
  updateCameraTransform();
}

function clampCameraTarget() {
  const starExtra = (state.campStars || 0) * 45;
  cameraCtrl.target.x = Math.max(-145 - starExtra, Math.min(145 + starExtra, cameraCtrl.target.x));
  cameraCtrl.target.y = 2.0;
  cameraCtrl.target.z = Math.max(-105 - starExtra, Math.min(110 + starExtra, cameraCtrl.target.z));
}

function panCameraByScreenDelta(dx, dy) {
  if (cutsceneState.active) return;
  // Skalowanie przesuwania względem oddalenia kamery
  const panScale = cameraCtrl.distance * 0.00145;
  cameraCtrl.target.x -= dx * panScale;
  cameraCtrl.target.z -= dy * panScale * 1.25;
  clampCameraTarget();
  updateCameraTransform();
}

function setupInputHandlers() {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener('keydown', e => {
    cameraCtrl.keys[e.key.toLowerCase()] = true;
    if (e.key === 'Escape' && (state.buildMode.active || state.moveMode.active)) {
      cancelBuildMode();
    }
  });
  window.addEventListener('keyup', e => {
    cameraCtrl.keys[e.key.toLowerCase()] = false;
  });

  const dom = renderer.domElement;
  dom.addEventListener('contextmenu', e => e.preventDefault());

  // --- MYSZ (PC): Przeciąganie LPM lub PPM przesuwa mapę (bez obracania!). Krótkie kliknięcie wybiera obiekt ---
  dom.addEventListener('mousedown', e => {
    if (e.button === 2 && (state.buildMode.active || state.moveMode.active)) {
      cancelBuildMode();
      return;
    }
    if (e.button === 0 || e.button === 2) {
      cameraCtrl.isPanning = true;
      cameraCtrl.dragStart = { x: e.clientX, y: e.clientY };
      cameraCtrl.prevMouse = { x: e.clientX, y: e.clientY };
      cameraCtrl.dragMovedDist = 0;
    }
  });

  window.addEventListener('mousemove', e => {
    if (cameraCtrl.isPanning) {
      const dx = e.clientX - cameraCtrl.prevMouse.x;
      const dy = e.clientY - cameraCtrl.prevMouse.y;
      cameraCtrl.prevMouse = { x: e.clientX, y: e.clientY };
      cameraCtrl.dragMovedDist += Math.hypot(dx, dy);
      if (cameraCtrl.dragMovedDist > 4) {
        panCameraByScreenDelta(dx, dy);
      }
    }

    if ((state.buildMode.active || state.moveMode.active) && buildGhostMesh) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObject(groundPlane);
      if (hit.length > 0) {
        updateBuildGhostAt(hit[0].point.x, hit[0].point.z);
      }
    }
  });

  window.addEventListener('mouseup', e => {
    if (cameraCtrl.isPanning) {
      const wasClick = cameraCtrl.dragMovedDist < 10 && e.button === 0;
      cameraCtrl.isPanning = false;
      if (wasClick && e.target === dom) {
        handleViewportTapOrClick(e.clientX, e.clientY);
      }
    }
  });

  dom.addEventListener('wheel', e => {
    zoomCameraBy(e.deltaY * 0.055);
  }, { passive: true });

  // --- DOTYK (TABLET): 1 palec przesuwa mapę / stuka w więźniów i budynki, 2 palce (szczypanie) przybliżają/oddalają ---
  dom.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      cameraCtrl.isPanning = true;
      cameraCtrl.dragStart = { x: t.clientX, y: t.clientY };
      cameraCtrl.prevMouse = { x: t.clientX, y: t.clientY };
      cameraCtrl.dragMovedDist = 0;

      if ((state.buildMode.active || state.moveMode.active) && buildGhostMesh) {
        mouse.x = (t.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(t.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hit = raycaster.intersectObject(groundPlane);
        if (hit.length > 0) {
          updateBuildGhostAt(hit[0].point.x, hit[0].point.z);
        }
      }
    } else if (e.touches.length === 2) {
      cameraCtrl.isPanning = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      cameraCtrl.pinchStartDist = Math.hypot(dx, dy);
      cameraCtrl.pinchStartCamDist = cameraCtrl.distance;
    }
  }, { passive: false });

  dom.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && cameraCtrl.isPanning) {
      const t = e.touches[0];
      const dx = t.clientX - cameraCtrl.prevMouse.x;
      const dy = t.clientY - cameraCtrl.prevMouse.y;
      cameraCtrl.prevMouse = { x: t.clientX, y: t.clientY };
      cameraCtrl.dragMovedDist += Math.hypot(dx, dy);

      if ((state.buildMode.active || state.moveMode.active) && buildGhostMesh) {
        mouse.x = (t.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(t.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hit = raycaster.intersectObject(groundPlane);
        if (hit.length > 0) {
          updateBuildGhostAt(hit[0].point.x, hit[0].point.z);
        }
      }

      if (cameraCtrl.dragMovedDist > 6) {
        panCameraByScreenDelta(dx, dy);
      }
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      if (cameraCtrl.pinchStartDist > 10) {
        const scale = cameraCtrl.pinchStartDist / Math.max(10, dist);
        const maxDist = 175 + (state.campStars || 0) * 45;
        cameraCtrl.distance = Math.max(24, Math.min(maxDist, cameraCtrl.pinchStartCamDist * scale));
        updateCameraTransform();
      }
    }
  }, { passive: false });

  dom.addEventListener('touchend', e => {
    if (cameraCtrl.isPanning && e.changedTouches.length > 0) {
      const t = e.changedTouches[0];
      const wasTap = cameraCtrl.dragMovedDist < 14;
      cameraCtrl.isPanning = false;
      if (wasTap) {
        handleViewportTapOrClick(t.clientX, t.clientY);
      }
    }
    if (e.touches.length === 0) {
      cameraCtrl.isPanning = false;
      cameraCtrl.pinchStartDist = 0;
    }
  }, { passive: false });
}

function handleViewportTapOrClick(clientX, clientY) {
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  if (state.buildMode.active) {
    const hit = raycaster.intersectObject(groundPlane);
    if (hit.length > 0) {
      placeBuildingAt(hit[0].point.x, hit[0].point.z);
    }
    return;
  }

  if (state.moveMode.active && state.moveMode.zoneKey) {
    const hit = raycaster.intersectObject(groundPlane);
    if (hit.length > 0) {
      relocateBuildingTo(state.moveMode.zoneKey, hit[0].point.x, hit[0].point.z);
    }
    return;
  }

  // 1. Sprawdź czy kliknięto/dotknięto więźnia lub strażnika (także z lekką tolerancją odległości na tablecie)
  const charRoots = [
    ...state.prisoners.map(p => p.mesh.root),
    ...state.guards.map(g => g.mesh.root)
  ];
  const charHits = raycaster.intersectObjects(charRoots, true);
  if (charHits.length > 0) {
    let obj = charHits[0].object;
    while (obj && !obj.userData.entity) obj = obj.parent;
    if (obj && obj.userData.entity) {
      state.selectedBuildingKey = null;
      state.selectedEntity = obj.userData.entity;
      renderInspector();
      return;
    }
  }

  // Dodatkowe wsparcie dla tabletu: jeśli palec trafił minimalnie obok postaci na ziemi (w promieniu 2.2m), wybierz najbliższą postać!
  const groundHit = raycaster.intersectObject(groundPlane);
  if (groundHit.length > 0) {
    const gx = groundHit[0].point.x;
    const gz = groundHit[0].point.z;
    let closestEntity = null;
    let bestDist = 2.2;
    const allChars = [...state.prisoners, ...state.guards];
    for (const ch of allChars) {
      const d = Math.hypot(ch.x - gx, ch.z - gz);
      if (d < bestDist) {
        bestDist = d;
        closestEntity = ch;
      }
    }
    if (closestEntity) {
      state.selectedBuildingKey = null;
      state.selectedEntity = closestEntity;
      renderInspector();
      return;
    }
  }

  // 2. Sprawdź czy kliknięto budynek 3D (główny lub postawiony przez gracza!)
  const bGroups = Object.values(state.buildingMeshes).map(bm => bm.group);
  const bHits = raycaster.intersectObjects(bGroups, true);
  if (bHits.length > 0) {
    let obj = bHits[0].object;
    while (obj && !obj.userData.buildingKey) obj = obj.parent;
    if (obj && obj.userData.buildingKey) {
      state.selectedEntity = null;
      state.selectedBuildingKey = obj.userData.buildingKey;
      renderInspector();
      return;
    }
  }

  // Fallback dotykowy dla budynków (szczególnie mniejszych jak Ognisko czy Wieżyczka)
  if (groundHit.length > 0) {
    const gx = groundHit[0].point.x;
    const gz = groundHit[0].point.z;
    for (const key of getAllUpgradeableCardKeys()) {
      const z = ZONES[key];
      if (!z) continue;
      if (Math.abs(gx - z.x) <= Math.max(2.6, (z.w || 4) / 2) &&
          Math.abs(gz - z.z) <= Math.max(2.6, (z.d || 4) / 2)) {
        state.selectedEntity = null;
        state.selectedBuildingKey = key;
        renderInspector();
        return;
      }
    }
  }
}

function handleCameraKeyboard(dt) {
  const moveSpeed = 48 * dt;
  // Stały kąt bez obracania (angleH = 0, angleV = Math.PI / 4)
  cameraCtrl.angleH = 0;
  cameraCtrl.angleV = Math.PI / 4;

  if (cameraCtrl.keys['w'] || cameraCtrl.keys['arrowup']) cameraCtrl.target.z -= moveSpeed;
  if (cameraCtrl.keys['s'] || cameraCtrl.keys['arrowdown']) cameraCtrl.target.z += moveSpeed;
  if (cameraCtrl.keys['d'] || cameraCtrl.keys['arrowright']) cameraCtrl.target.x += moveSpeed;
  if (cameraCtrl.keys['a'] || cameraCtrl.keys['arrowleft']) cameraCtrl.target.x -= moveSpeed;

  clampCameraTarget();
  updateCameraTransform();
}

// ============================================================================
// PĘTLA GŁÓWNA GRY (GAMELOOP)
// ============================================================================
let lastFrameTime = performance.now();
let uiRefreshTimer = 0;

function animate(now) {
  requestAnimationFrame(animate);
  const rawDt = Math.min(0.1, (now - lastFrameTime) / 1000);
  lastFrameTime = now;

  if (cutsceneState.active) {
    updatePunishmentCutscene(rawDt);
  } else {
    handleCameraKeyboard(rawDt);

    const simDt = rawDt * state.gameSpeed;
    if (simDt > 0) {
      advanceClock(simDt);
      updateEnvironmentAndVitals(simDt);
      updateFreightTrain(simDt);
      updateTransportTrainAnimation(simDt);

      state.prisoners.forEach(p => updatePrisonerAI(p, simDt));
      state.guards.forEach(g => updateGuardAI(g, simDt));
    }
  }

  if (snowSystem) {
    const pos = snowSystem.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] -= rawDt * 4.8;
      pos[i] += Math.sin(now * 0.001 + i) * rawDt * 1.2;
      if (pos[i + 1] < 0) pos[i + 1] = 40;
    }
    snowSystem.geometry.attributes.position.needsUpdate = true;
  }

  for (let i = state.particles.length - 1; i >= 0; i--) {
    const pt = state.particles[i];
    pt.life -= rawDt;
    pt.mesh.position.x += pt.vx * rawDt;
    pt.mesh.position.y += pt.vy * rawDt;
    pt.mesh.position.z += pt.vz * rawDt;
    pt.vy -= 6.5 * rawDt;
    if (pt.life <= 0) {
      scene.remove(pt.mesh);
      state.particles.splice(i, 1);
    }
  }

  uiRefreshTimer += rawDt;
  if (uiRefreshTimer >= 0.4) {
    uiRefreshTimer = 0;
    updateHUD();
    updateInspectorLiveValues();
  }

  renderer.render(scene, camera);
}

// ============================================================================
// INICJALIZACJA STARTOWA
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  initThree();

  spawnPrisoner('POLITICAL', 'WOOD');
  spawnPrisoner('POLITICAL', 'WOOD');
  spawnPrisoner('POLITICAL', 'TRAIN');
  spawnPrisoner('BYTOVIK',   'WOOD');
  spawnPrisoner('BYTOVIK',   'WOOD');
  spawnPrisoner('BYTOVIK',   'TRAIN');
  spawnPrisoner('BYTOVIK',   'QUARRY');
  spawnPrisoner('BYTOVIK',   'QUARRY');
  spawnPrisoner('BYTOVIK',   'KITCHEN');
  spawnPrisoner('SUKA',      'TRAIN');
  spawnPrisoner('SUKA',      'QUARRY');
  spawnPrisoner('URKA',      'WOOD');
  spawnPrisoner('URKA',      'QUARRY');
  spawnPrisoner('URKA',      'TRAIN');

  spawnGuard('ROLLCALL');
  spawnGuard('FOREST');
  spawnGuard('TRAIN_DOCK');
  spawnGuard('QUARRY');

  updateScheduleStripUI();
  updateHUD();

  addLog('📖 Witaj w obozie w JERCEWIE (Kargopołłag) z „Innego Świata” Gustawa Herlinga-Gruzińskiego!', 'good');
  addLog('🚂 Pociągi towarowe kursują na bocznicę Bazy Żywnościowej – brygada tragarzy (Herling, Kowal, Iwan) rozładowuje wagony!', 'info');
  addLog('🏥 Lazaret dr. Zabielskiego: więźniowie poniżej 10 HP idą do szpitala i leczą się przez 12h do 100 HP.', 'good');

  requestAnimationFrame(animate);
});
