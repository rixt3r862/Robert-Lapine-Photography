import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const PROFILE_URL = "https://www.flickr.com/photos/carrera47/";
const API_URL = "https://api.flickr.com/services/rest/";
const USER_ID = "92256097@N08";
const OUTPUT = new URL("../app/flickr-catalog.json", import.meta.url);

async function getApiKey() {
  if (process.env.FLICKR_API_KEY) return process.env.FLICKR_API_KEY;
  const html = await fetch(PROFILE_URL, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) => response.text());
  const key = html.match(/flickr\.api\.site_key\s*=\s*"([a-f0-9]+)"/)?.[1];
  if (!key) throw new Error("Unable to discover Flickr's public site key. Set FLICKR_API_KEY and retry.");
  return key;
}

async function flickr(apiKey, method, params = {}) {
  const url = new URL(API_URL);
  url.search = new URLSearchParams({
    method,
    api_key: apiKey,
    format: "json",
    nojsoncallback: "1",
    ...params,
  });
  const result = await fetch(url).then((response) => response.json());
  if (result.stat !== "ok") throw new Error(`${method}: ${result.message || "Flickr request failed"}`);
  return result;
}

const locations = [
  [/canyonlands/i, "Canyonlands, Utah", "canyonlands"],
  [/yellowstone/i, "Yellowstone, Wyoming", "yellowstone"],
  [/(grand ?teton|teton nat|tetons)/i, "Grand Teton, Wyoming", "grand-teton"],
  [/fish lake/i, "Fish Lake, Utah", "fish-lake"],
  [/capitol reef/i, "Capitol Reef, Utah", "capitol-reef"],
  [/bison roundup/i, "American West", "bison-roundup"],
  [/death valley/i, "Death Valley, California", "western-landscapes"],
  [/arches/i, "Arches National Park, Utah", "western-landscapes"],
  [/bryce/i, "Bryce Canyon, Utah", "western-landscapes"],
  [/glacier/i, "Glacier National Park, Montana", "western-landscapes"],
  [/(monument valley|mexican hat)/i, "Monument Valley", "western-landscapes"],
  [/(mirror lake|provo falls|uinta)/i, "Uinta Mountains, Utah", "western-landscapes"],
  [/(antelope island|island bison|island sunset)/i, "Antelope Island, Utah", "western-landscapes"],
  [/(germany|berlin|munich|bavaria)/i, "Germany", "europe-travel"],
  [/vietnam/i, "Vietnam", "vietnam"],
];

const albumSlugs = {
  "72157667188613406": "europe-travel",
  "72157634207722908": "hdr-studies",
  "72157634694855799": "wildlife",
  "72157632613725888": "aerospace-career",
  "72157632613706918": "vietnam",
  "72157632613692004": "as-i-see-it",
  "72157632613653992": "beautiful-world",
};

function classify(photo, albumIds) {
  const text = `${photo.title} ${photo.description?._content || ""}`;
  const slugs = new Set(albumIds.map((id) => albumSlugs[id]).filter(Boolean));
  let location = "Robert Lapine archive";
  for (const [pattern, place, slug] of locations) {
    if (pattern.test(text)) {
      location = place;
      slugs.add(slug);
      break;
    }
  }

  const themes = new Set();
  if (/(bison|buffalo|bear|elk|deer|moose|wolf|coyote|eagle|owl|hawk|bird|horse|wildlife)/i.test(text) || slugs.has("wildlife")) themes.add("Wildlife");
  if (/(sunset|sunrise|mountain|lake|falls|canyon|valley|park|reef|arch|glacier|landscape|foliage|desert|river)/i.test(text) || slugs.has("beautiful-world")) themes.add("Landscape");
  if (/(aircraft|plane|aerospace|flight|air force|missile|rocket|hangar)/i.test(text) || slugs.has("aerospace-career")) themes.add("Aerospace");
  if (/(vietnam|soldier|army|military|veteran)/i.test(text) || slugs.has("vietnam")) themes.add("History");
  if (/(portrait|people|man|woman|child|worker|family)/i.test(text)) themes.add("People");
  if (/(building|church|barn|homestead|temple|architecture|street)/i.test(text)) themes.add("Architecture");
  if (/(hdr|night|moon|star|milky)/i.test(text) || slugs.has("hdr-studies")) themes.add("Light studies");
  if (slugs.has("europe-travel")) themes.add("Travel");
  if (!themes.size) themes.add("Observation");
  if (!slugs.size) slugs.add("complete-archive");

  return { location, collectionSlugs: [...slugs], themes: [...themes] };
}

async function analyzeImage(url) {
  try {
    const bytes = Buffer.from(await fetch(url).then((response) => response.arrayBuffer()));
    const image = sharp(bytes);
    const [{ dominant }, metadata] = await Promise.all([image.stats(), image.metadata()]);
    const brightness = Math.round((dominant.r * 299 + dominant.g * 587 + dominant.b * 114) / 1000);
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      dominantColor: `#${[dominant.r, dominant.g, dominant.b].map((value) => value.toString(16).padStart(2, "0")).join("")}`,
      brightness,
    };
  } catch {
    return { width: 0, height: 0, dominantColor: "#d7d1c7", brightness: 128 };
  }
}

async function mapLimit(items, limit, mapper) {
  const output = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await mapper(items[index], index);
      if ((index + 1) % 50 === 0) console.log(`Analyzed ${index + 1}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return output;
}

const apiKey = await getApiKey();
const [photoResult, albumResult] = await Promise.all([
  flickr(apiKey, "flickr.people.getPublicPhotos", {
    user_id: USER_ID,
    per_page: "500",
    page: "1",
    extras: "description,date_taken,date_upload,geo,tags,url_w,url_c,url_b,url_l,o_dims,views,media",
  }),
  flickr(apiKey, "flickr.photosets.getList", { user_id: USER_ID, per_page: "500", page: "1" }),
]);

const albums = albumResult.photosets.photoset;
const albumMembership = new Map();
await Promise.all(albums.map(async (album) => {
  const result = await flickr(apiKey, "flickr.photosets.getPhotos", { photoset_id: album.id, user_id: USER_ID, per_page: "500" });
  for (const photo of result.photoset.photo) {
    const memberships = albumMembership.get(photo.id) || [];
    memberships.push(album.id);
    albumMembership.set(photo.id, memberships);
  }
}));

const analyzed = await mapLimit(photoResult.photos.photo, 10, async (photo) => {
  const thumb = photo.url_w || photo.url_c || photo.url_b || photo.url_l;
  const image = photo.url_b || photo.url_l || photo.url_c || photo.url_w;
  const albumIds = albumMembership.get(photo.id) || [];
  const visual = await analyzeImage(thumb);
  const dimensions = {
    width: Number(photo.o_width || visual.width || photo.width_c || photo.width_w || 0),
    height: Number(photo.o_height || visual.height || photo.height_c || photo.height_w || 0),
  };
  const classification = classify(photo, albumIds);
  const year = String(photo.datetaken || "").slice(0, 4) || new Date(Number(photo.dateupload) * 1000).getUTCFullYear().toString();
  return {
    id: photo.id,
    title: photo.title || "Untitled photograph",
    description: photo.description?._content || "",
    year,
    dateTaken: photo.datetaken || "",
    dateUploaded: new Date(Number(photo.dateupload) * 1000).toISOString(),
    thumb,
    src: image,
    flickr: `${PROFILE_URL}${photo.id}/`,
    orientation: dimensions.height > dimensions.width ? "portrait" : "landscape",
    width: dimensions.width,
    height: dimensions.height,
    views: Number(photo.views || 0),
    albumIds,
    ...classification,
    ...visual,
    alt: `${photo.title || "Untitled photograph"}${classification.location === "Robert Lapine archive" ? "" : `, ${classification.location}`} — photograph by Robert Lapine`,
  };
});

const catalog = {
  generatedAt: new Date().toISOString(),
  source: PROFILE_URL,
  total: analyzed.length,
  albums: albums.map((album) => ({
    id: album.id,
    slug: albumSlugs[album.id],
    title: album.title._content,
    description: album.description._content,
    photoCount: Number(album.photos),
    primaryPhotoId: album.primary,
  })),
  photos: analyzed,
};

await writeFile(OUTPUT, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Wrote ${analyzed.length} photographs to ${OUTPUT.pathname}`);
