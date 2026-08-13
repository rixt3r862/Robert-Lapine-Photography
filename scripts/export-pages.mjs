import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputRoot = path.join(projectRoot, "docs");
const basePath = "/Robert-Lapine-Photography";
const collectionSlugs = [
  "canyonlands",
  "yellowstone",
  "grand-teton",
  "fish-lake",
  "bison-roundup",
  "capitol-reef",
];
const routes = [
  "/",
  "/collections",
  ...collectionSlugs.map((slug) => `/collections/${slug}`),
  "/stories/canyonlands-after-dark",
  "/contact",
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(path.join(projectRoot, "dist/client"), outputRoot, { recursive: true });

const workerUrl = pathToFileURL(path.join(projectRoot, "dist/server/index.js"));
workerUrl.searchParams.set("pages-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const context = {
  waitUntil() {},
  passThroughOnException() {},
};

function addBasePath(html) {
  return html
    .replaceAll('="/_next/', `="${basePath}/_next/`)
    .replaceAll('="/photos/', `="${basePath}/photos/`)
    .replaceAll('href="/collections', `href="${basePath}/collections`)
    .replaceAll('href="/stories/', `href="${basePath}/stories/`)
    .replaceAll('href="/contact', `href="${basePath}/contact`)
    .replaceAll('href="/#', `href="${basePath}/#`)
    .replaceAll('href="/"', `href="${basePath}/"`)
    .replaceAll('href=\\"/collections', `href=\\"${basePath}/collections`)
    .replaceAll('href=\\"/stories/', `href=\\"${basePath}/stories/`)
    .replaceAll('href=\\"/contact', `href=\\"${basePath}/contact`)
    .replaceAll('href=\\"/#', `href=\\"${basePath}/#`)
    .replaceAll('href=\\"/\\"', `href=\\"${basePath}/\\"`)
    .replace("<head>", "<head><meta name=\"github-pages-base-path\" content=\"/Robert-Lapine-Photography\"/>");
}

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://pages.local${route}`, { headers: { accept: "text/html" } }),
    env,
    context,
  );
  if (!response.ok) {
    throw new Error(`Could not export ${route}: ${response.status}`);
  }
  const html = addBasePath(await response.text());
  const routeDirectory = route === "/" ? outputRoot : path.join(outputRoot, route.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), html);
}

await writeFile(path.join(outputRoot, ".nojekyll"), "");
await cp(path.join(outputRoot, "index.html"), path.join(outputRoot, "404.html"));

console.log(`Exported ${routes.length} routes to ${outputRoot}`);
