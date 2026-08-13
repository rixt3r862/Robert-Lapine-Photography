import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders Robert Lapine Photography's portfolio hub", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Robert Lapine Photography \| Landscape &amp; Wildlife/);
  assert.match(html, /Chasing the light/);
  assert.match(html, /Featured collections/);
  assert.match(html, /Selected work/);
  assert.match(html, /Contact &amp; licensing/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("keeps the expanded portfolio content and routes in source", async () => {
  const [page, layout, data] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
  ]);
  assert.match(page, /<GalleryExplorer/);
  assert.match(page, /Featured collections/);
  assert.match(layout, /\/og\.png/);
  assert.equal((data.match(/id: "\d+"/g) ?? []).length, 25);
  await Promise.all([
    access(new URL("../app/collections/page.tsx", import.meta.url)),
    access(new URL("../app/collections/[slug]/page.tsx", import.meta.url)),
    access(new URL("../app/stories/canyonlands-after-dark/page.tsx", import.meta.url)),
    access(new URL("../app/contact/page.tsx", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
