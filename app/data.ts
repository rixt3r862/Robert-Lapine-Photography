import flickrCatalog from "./flickr-catalog.json";

export type Photo = {
  id: string;
  src: string;
  title: string;
  location: string;
  year: string;
  collection: string;
  alt: string;
  orientation: "landscape" | "portrait";
  flickr: string;
  thumb?: string;
  description?: string;
  dateTaken?: string;
  collectionSlugs?: string[];
  themes?: string[];
  dominantColor?: string;
  brightness?: number;
  width?: number;
  height?: number;
  views?: number;
};

export type Collection = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  cover: string;
  featured?: boolean;
};

export const flickrUrl = "https://www.flickr.com/photos/carrera47/";

function flickrCover(id: string) {
  return flickrCatalog.photos.find((photo) => photo.id === id)?.src || flickrCatalog.photos[0].src;
}

export const collections: Collection[] = [
  {
    slug: "canyonlands",
    name: "Canyonlands After Dark",
    kicker: "Utah · 2022",
    description: "Monumental stone, deep shadow, and a sky crowded with stars.",
    cover: "/photos/canyon-75.jpg",
    featured: true,
  },
  {
    slug: "yellowstone",
    name: "Yellowstone Country",
    kicker: "Wyoming · 2021",
    description: "Weather, wildlife, and the vast rhythms of the northern range.",
    cover: "/photos/yellowstone-45.jpg",
    featured: true,
  },
  {
    slug: "grand-teton",
    name: "Grand Teton Homesteads",
    kicker: "Wyoming · 2021",
    description: "Weathered structures holding their ground beneath the Tetons.",
    cover: "/photos/teton-02.jpg",
    featured: true,
  },
  {
    slug: "fish-lake",
    name: "Autumn at Fish Lake",
    kicker: "Utah · 2020",
    description: "Aspen light, quiet trails, and the brief brilliance of fall.",
    cover: "/photos/foliage-02.jpg",
    featured: true,
  },
  {
    slug: "bison-roundup",
    name: "Bison Roundup",
    kicker: "American West · 2021",
    description: "Open land, moving herds, and dawn breaking over the basin.",
    cover: "/photos/bison-01.jpg",
    featured: true,
  },
  {
    slug: "capitol-reef",
    name: "Capitol Reef",
    kicker: "Utah · 2020",
    description: "A study of red-rock geology, scale, and desert light.",
    cover: "/photos/capitol-02.jpg",
    featured: true,
  },
  {
    slug: "western-landscapes",
    name: "Western Landscapes",
    kicker: "American West · Archive",
    description: "National parks, mountain water, desert roads, and the broad geography of the West.",
    cover: flickrCover("50868556326"),
  },
  {
    slug: "beautiful-world",
    name: "Our Beautiful World",
    kicker: "Places & light · Archive",
    description: "Robert’s wide-ranging study of the natural world and the changing character of light.",
    cover: flickrCover("8414795901"),
  },
  {
    slug: "as-i-see-it",
    name: "As I See It",
    kicker: "Details & observations · Archive",
    description: "Small scenes and easily missed details, photographed with an attentive and curious eye.",
    cover: flickrCover("8416071794"),
  },
  {
    slug: "wildlife",
    name: "Wildlife as I See It",
    kicker: "Wildlife · Archive",
    description: "Encounters with the animals that inhabit Robert’s western landscapes.",
    cover: flickrCover("8632415238"),
  },
  {
    slug: "vietnam",
    name: "My Vietnam Experience",
    kicker: "Documentary · 1960s",
    description: "A personal black-and-white record from Robert’s fifteen months in Vietnam.",
    cover: flickrCover("8429109994"),
  },
  {
    slug: "aerospace-career",
    name: "Aerospace Career Archive",
    kicker: "Professional work · Archive",
    description: "A selected record from Robert’s career as a professional aerospace photographer.",
    cover: flickrCover("8416096026"),
  },
  {
    slug: "europe-travel",
    name: "Europe & Travel",
    kicker: "Europe · 2014–2015",
    description: "Architecture, landscape, and daily observations gathered during travels through Europe.",
    cover: flickrCover("16100312813"),
  },
  {
    slug: "hdr-studies",
    name: "HDR & Light Studies",
    kicker: "Technique · Archive",
    description: "High-dynamic-range experiments and studies in difficult or dramatic light.",
    cover: flickrCover("9080012747"),
  },
];

const curatedPhotos: Photo[] = [
  { id: "52059513843", src: "/photos/canyon-102.jpg", title: "Stone & Silence", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "portrait", alt: "Weathered sandstone formation rising beneath a dark Canyonlands sky", flickr: "https://www.flickr.com/photos/carrera47/52059513843/" },
  { id: "52058441442", src: "/photos/canyon-98.jpg", title: "Night Sentinel", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "portrait", alt: "Tall sandstone tower illuminated against the night sky", flickr: "https://www.flickr.com/photos/carrera47/52058441442/" },
  { id: "52059513353", src: "/photos/canyon-75.jpg", title: "Under a Canyonlands Sky", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "landscape", alt: "Rock formations illuminated beneath a star-filled sky in Canyonlands", flickr: "https://www.flickr.com/photos/carrera47/52059513353/" },
  { id: "52058441142", src: "/photos/canyon-74.jpg", title: "Starlight Passage", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "portrait", alt: "A narrow desert passage and sandstone walls beneath stars", flickr: "https://www.flickr.com/photos/carrera47/52058441142/" },
  { id: "52059717474", src: "/photos/canyon-61.jpg", title: "Canyon Light", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "landscape", alt: "Canyonlands sandstone glowing in warm evening light", flickr: "https://www.flickr.com/photos/carrera47/52059717474/" },
  { id: "52059965030", src: "/photos/canyon-59.jpg", title: "The Needles", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "landscape", alt: "Layered sandstone needles stretching across the desert", flickr: "https://www.flickr.com/photos/carrera47/52059965030/" },
  { id: "52059964825", src: "/photos/canyon-51.jpg", title: "Desert Geometry", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "landscape", alt: "Angular sandstone forms in Canyonlands National Park", flickr: "https://www.flickr.com/photos/carrera47/52059964825/" },
  { id: "52059717074", src: "/photos/canyon-45.jpg", title: "Ancient Ground", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "landscape", alt: "Wide red-rock landscape under an expansive western sky", flickr: "https://www.flickr.com/photos/carrera47/52059717074/" },
  { id: "52059716809", src: "/photos/canyon-19.jpg", title: "Weathered Spire", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "portrait", alt: "A slender weathered sandstone spire in Canyonlands", flickr: "https://www.flickr.com/photos/carrera47/52059716809/" },
  { id: "52058440302", src: "/photos/canyon-16.jpg", title: "Desert Pillar", location: "Canyonlands, Utah", year: "2022", collection: "canyonlands", orientation: "portrait", alt: "Monumental sandstone pillar rising from the Utah desert", flickr: "https://www.flickr.com/photos/carrera47/52058440302/" },
  { id: "51669598847", src: "/photos/bison-01.jpg", title: "High Desert Dawn", location: "American West", year: "2021", collection: "bison-roundup", orientation: "landscape", alt: "Orange and blue dawn spreading across a wide western basin", flickr: "https://www.flickr.com/photos/carrera47/51669598847/" },
  { id: "51671272760", src: "/photos/bison-02.jpg", title: "Roundup Morning", location: "American West", year: "2021", collection: "bison-roundup", orientation: "landscape", alt: "Morning light across open grassland during a bison roundup", flickr: "https://www.flickr.com/photos/carrera47/51671272760/" },
  { id: "51668478003", src: "/photos/yellowstone-05.jpg", title: "Northern Range", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "landscape", alt: "Broad Yellowstone landscape beneath a changing sky", flickr: "https://www.flickr.com/photos/carrera47/51668478003/" },
  { id: "51669117605", src: "/photos/yellowstone-14.jpg", title: "Wild Country", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "landscape", alt: "Yellowstone wilderness stretching toward distant mountains", flickr: "https://www.flickr.com/photos/carrera47/51669117605/" },
  { id: "51668928414", src: "/photos/yellowstone-15.jpg", title: "Watching the Valley", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "portrait", alt: "Wildlife standing in the open Yellowstone landscape", flickr: "https://www.flickr.com/photos/carrera47/51668928414/" },
  { id: "51668478683", src: "/photos/yellowstone-23.jpg", title: "Across the Basin", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "landscape", alt: "Open Yellowstone basin with distant ridgelines", flickr: "https://www.flickr.com/photos/carrera47/51668478683/" },
  { id: "51668929569", src: "/photos/yellowstone-29.jpg", title: "Autumn Range", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "landscape", alt: "Autumn color moving across Yellowstone's northern range", flickr: "https://www.flickr.com/photos/carrera47/51668929569/" },
  { id: "51668929759", src: "/photos/yellowstone-45.jpg", title: "Open Range", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "landscape", alt: "Wildlife crossing an open Yellowstone plain", flickr: "https://www.flickr.com/photos/carrera47/51668929759/" },
  { id: "51668930349", src: "/photos/yellowstone-56.jpg", title: "Among the Pines", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "portrait", alt: "Wildlife framed by tall pines in Yellowstone", flickr: "https://www.flickr.com/photos/carrera47/51668930349/" },
  { id: "51668243156", src: "/photos/yellowstone-75.jpg", title: "Last Light, Yellowstone", location: "Yellowstone, Wyoming", year: "2021", collection: "yellowstone", orientation: "portrait", alt: "Last light falling across the Yellowstone landscape", flickr: "https://www.flickr.com/photos/carrera47/51668243156/" },
  { id: "51668476903", src: "/photos/teton-02.jpg", title: "Weathered Lines", location: "Grand Teton, Wyoming", year: "2021", collection: "grand-teton", orientation: "landscape", alt: "Historic wooden barn beneath a clouded Teton sky", flickr: "https://www.flickr.com/photos/carrera47/51668476903/" },
  { id: "51669116490", src: "/photos/teton-06.jpg", title: "Homestead Weather", location: "Grand Teton, Wyoming", year: "2021", collection: "grand-teton", orientation: "landscape", alt: "Weathered homestead structures against the Grand Tetons", flickr: "https://www.flickr.com/photos/carrera47/51669116490/" },
  { id: "51668925279", src: "/photos/foliage-02.jpg", title: "The Turning Trail", location: "Fish Lake, Utah", year: "2020", collection: "fish-lake", orientation: "portrait", alt: "A quiet trail winding through golden Fish Lake aspens", flickr: "https://www.flickr.com/photos/carrera47/51668925279/" },
  { id: "51669115075", src: "/photos/foliage-08.jpg", title: "Aspen Gold", location: "Fish Lake, Utah", year: "2020", collection: "fish-lake", orientation: "portrait", alt: "Sunlit golden aspen trees at Fish Lake", flickr: "https://www.flickr.com/photos/carrera47/51669115075/" },
  { id: "51667437882", src: "/photos/capitol-02.jpg", title: "Red Rock Rhythm", location: "Capitol Reef, Utah", year: "2020", collection: "capitol-reef", orientation: "landscape", alt: "Layered red-rock formations in Capitol Reef National Park", flickr: "https://www.flickr.com/photos/carrera47/51667437882/" },
];

const curatedById = new Map(curatedPhotos.map((photo) => [photo.id, photo]));

export const photos: Photo[] = flickrCatalog.photos.map((item) => {
  const curated = curatedById.get(item.id);
  const collectionSlugs = Array.from(new Set([
    ...item.collectionSlugs,
    ...(curated ? [curated.collection] : []),
  ]));
  return {
    id: item.id,
    src: item.src,
    thumb: item.thumb,
    title: item.title,
    location: item.location,
    year: item.year,
    collection: collectionSlugs.find((slug) => slug !== "complete-archive") || "complete-archive",
    collectionSlugs,
    themes: item.themes,
    alt: item.alt,
    orientation: item.orientation as Photo["orientation"],
    flickr: item.flickr,
    description: item.description,
    dateTaken: item.dateTaken,
    dominantColor: item.dominantColor,
    brightness: item.brightness,
    width: item.width,
    height: item.height,
    views: item.views,
    ...curated,
    collectionSlugs,
  };
});

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getCollectionPhotos(slug: string) {
  return photos.filter((photo) => photo.collectionSlugs?.includes(slug) || photo.collection === slug);
}
