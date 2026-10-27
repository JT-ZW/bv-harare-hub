export const zones = [
  {
    id: "food",
    name: "Sustainable Food Systems, Food Security & Healthy Nutrition",
    short: "Food systems",
    color: "yellow",
    symbol: "✳",
  },
  {
    id: "waste",
    name: "Waste Management",
    short: "Waste management",
    color: "purple",
    symbol: "↻",
  },
  {
    id: "energy",
    name: "Affordable & Clean Energy",
    short: "Clean energy",
    color: "orange",
    symbol: "☀",
  },
  {
    id: "ecosystems",
    name: "Ecosystems & Global Environmental Commons",
    short: "Ecosystems",
    color: "turquoise",
    symbol: "✺",
  },
  {
    id: "water",
    name: "Water Management",
    short: "Water management",
    color: "turquoise",
    symbol: "≈",
  },
  {
    id: "consumption",
    name: "Responsible Consumption & Production",
    short: "Responsible production",
    color: "purple",
    symbol: "↗",
  },
  {
    id: "mobility",
    name: "Sustainable Transport & Mobility",
    short: "Transport & mobility",
    color: "orange",
    symbol: "→",
  },
  {
    id: "education",
    name: "Education & Behavioral Change",
    short: "Education & behaviour",
    color: "yellow",
    symbol: "✧",
  },
  {
    id: "decarbonization",
    name: "Decarbonization",
    short: "Decarbonization",
    color: "turquoise",
    symbol: "↓",
  },
] as const;
export type ZoneId = (typeof zones)[number]["id"];
export type Fellow = {
  name: string;
  slug: string;
  cohort: number;
  zones: ZoneId[];
  linkedin?: string;
};
const rows: [string, number, ZoneId[], string?][] = [
  ["Anesu Emmanuel Chagadama", 3, ["waste"], "anesu-emmanuel-c-b6096215b"],
  ["Arnold Tsvigu", 3, ["food"], "arnold-tsvigu-11a14524a"],
  ["Asher Chakupa", 3, ["energy"], "asherchakupa"],
  [
    "Ashley Nyasha Muremba",
    3,
    ["education"],
    "ashley-nyasha-muremba-517627146",
  ],
  ["Catherine Fundikwa", 3, ["ecosystems"], "catherine-fundikwa-9a09b3281"],
  [
    "Christopher Tinotenda Squire",
    3,
    ["waste"],
    "christopher-squire-50275b250",
  ],
  [
    "Cyril Tawanda Mupfururiwa",
    3,
    ["food"],
    "cyril-tawanda-mupfururiwa-316598320",
  ],
  ["Gideon Mhlanga", 3, ["waste"]],
  ["Ian Tawanda Mugowa", 3, ["water"]],
  [
    "Jeffrey-Takunda Murungweni",
    3,
    ["food"],
    "jeffrey-takunda-murungweni-43991a193",
  ],
  ["Lenah Shumba", 3, ["waste"], "lenah-shumba-144674306"],
  ["Mutsa Chinanayi", 3, ["ecosystems"], "mutsa-china"],
  ["Nyasha Musimwa", 3, ["waste"], "musimwa-n"],
  ["Osirumiji Ihude", 3, ["mobility"], "osirumiji-ihude"],
  ["Penelope Nothemba Ncube", 3, ["waste"], "penelope-ncube"],
  ["Prince Tinokunda Mafigu", 3, ["energy"]],
  ["Ruvimbo Kwaramba", 3, ["consumption"]],
  [
    "Tadiwanashe Chikundi",
    3,
    ["consumption"],
    "tadiwanashe-chikundi-b35b49258",
  ],
  ["Tafadzwa Maonekesa Matange", 3, ["waste"]],
  ["Tafadzwa Wachenuka", 3, ["energy"], "tafadzwa-wachenuka-b5573b200"],
  ["Tanaka Admire Ndongera", 3, ["food"], "tanaka-admire-ndongera-04591718a"],
  ["Tapiwa Robson Makumbe", 3, ["energy"]],
  ["Tawanda Marufu Miranda", 3, ["food"]],
  ["Tinotenda Chikwanha", 3, ["consumption"], "tinotino-chikwanha-a842062b9"],
  ["Anesu Magora", 4, ["consumption", "waste"]],
  ["Charmaine Makara", 4, ["ecosystems"]],
  ["Clarris Bauti", 4, ["ecosystems"]],
  ["David Maguranyanga", 4, ["decarbonization", "food"]],
  ["Dayes Moses", 4, ["consumption", "waste"]],
  ["Fadzai Zaranyika", 4, ["food"]],
  ["Joyce Masenda", 4, ["food", "waste", "water"]],
  ["Kenny Chigangawa", 4, ["energy"]],
  ["Kupakwashe Simone Pfumayaramba", 4, ["food"]],
  ["Leticia Kativhu", 4, ["food"]],
  ["Memory Muguti Munorevesa", 4, ["water"]],
  ["Michael Mlungisi Nkomo", 4, ["energy"]],
  ["Munashe Moses Musarurwa", 4, ["mobility"]],
  ["Portia Tendai Munyonga", 4, ["food"]],
  ["Roity Anaishe Chimbuya", 4, ["food"]],
  ["Rufaro Tatenda Waziweyi", 4, ["food"]],
  ["Silia Hazel Mapepa", 4, ["energy"]],
  ["Tanyaradzwa Dendera", 4, ["food"]],
  ["Tatenda Alicia Murwira", 4, ["water"]],
  ["Tendai Jack", 4, ["ecosystems"]],
  ["Volition Smthxilo Mashamba", 4, ["energy"]],
];
export const fellows: Fellow[] = rows.map(
  ([name, cohort, zones, linkedin]) => ({
    name,
    cohort,
    zones,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ...(linkedin
      ? { linkedin: "https://www.linkedin.com/in/" + linkedin + "/" }
      : {}),
  }),
);
export const getZone = (id: string) => zones.find((z) => z.id === id)!;
export const initials = (name: string) =>
  name
    .split(/[ -]/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
