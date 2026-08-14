"use client";

import { useEffect, useMemo, useState } from "react";
import type { Photo } from "../data";
import { collections } from "../data";

export function GalleryExplorer({
  items,
  filters = false,
}: {
  items: Photo[];
  filters?: boolean;
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(items.length > 48 ? 36 : items.length);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visible = useMemo(
    () => items.filter((photo) => {
      const matchesCollection = activeFilter === "all" || photo.collection === activeFilter || photo.collectionSlugs?.includes(activeFilter);
      const search = query.trim().toLowerCase();
      const matchesSearch = !search || [photo.title, photo.location, photo.year, ...(photo.themes || [])].join(" ").toLowerCase().includes(search);
      return matchesCollection && matchesSearch;
    }),
    [activeFilter, items, query],
  );
  const displayed = visible.slice(0, limit);
  const activePhoto = activeIndex === null ? null : visible[activeIndex];
  const resolveAsset = (src?: string) => src && src.startsWith("/") && typeof window !== "undefined" && window.location.pathname.startsWith("/Robert-Lapine-Photography")
    ? `/Robert-Lapine-Photography${src}`
    : src;
  const activePhotoSrc = resolveAsset(activePhoto?.src);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((activeIndex + 1) % visible.length);
      if (event.key === "ArrowLeft") setActiveIndex((activeIndex - 1 + visible.length) % visible.length);
    }
    document.body.style.overflow = activePhoto ? "hidden" : "";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, activePhoto, visible.length]);

  function changeFilter(slug: string) {
    setActiveFilter(slug);
    setLimit(36);
    setActiveIndex(null);
  }

  return (
    <>
      {filters && (
        <div className="archive-tools" aria-label="Search and filter photographs">
          <label>
            <span>Search the archive</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(36); setActiveIndex(null); }} placeholder="Place, title, year, or subject" type="search" />
          </label>
          <label>
            <span>Collection</span>
            <select value={activeFilter} onChange={(event) => changeFilter(event.target.value)}>
              <option value="all">All 421 photographs</option>
              {collections.map((collection) => <option value={collection.slug} key={collection.slug}>{collection.name}</option>)}
            </select>
          </label>
          <p><strong>{visible.length}</strong> {visible.length === 1 ? "photograph" : "photographs"}</p>
        </div>
      )}

      <div className="gallery">
        {displayed.map((photo, index) => (
          <button
            className={`photo-card ${photo.orientation === "portrait" ? "tall" : "wide"}`}
            key={photo.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${photo.title}`}
          >
            <span className="photo-frame" style={{ backgroundColor: photo.dominantColor }}>
              <img src={resolveAsset(photo.thumb || photo.src)} alt={photo.alt} loading={index > 5 ? "lazy" : "eager"} decoding="async" />
              <span className="view-mark" aria-hidden="true">+</span>
            </span>
            <span className="photo-meta">
              <span>{photo.title}</span>
              <span>{String(index + 1).padStart(2, "0")} · {photo.location}</span>
            </span>
          </button>
        ))}
      </div>

      {displayed.length < visible.length && (
        <div className="archive-more">
          <button onClick={() => setLimit((current) => Math.min(current + 36, visible.length))}>Show 36 more</button>
          <span>Showing {displayed.length} of {visible.length}</span>
        </div>
      )}

      {activePhoto && activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activePhoto.title} photograph viewer`}>
          <button className="lightbox-backdrop" onClick={() => setActiveIndex(null)} aria-label="Close photograph viewer" />
          <div className="lightbox-inner">
            <div className="lightbox-topline">
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span>
              <button onClick={() => setActiveIndex(null)} aria-label="Close photograph viewer">Close ×</button>
            </div>
            <img src={activePhotoSrc} alt={activePhoto.alt} />
            <div className="lightbox-caption">
              <div>
                <h3>{activePhoto.title}</h3>
                <p>{activePhoto.location} · {activePhoto.year}</p>
              </div>
              <a href={activePhoto.flickr} target="_blank" rel="noreferrer">View original on Flickr ↗</a>
            </div>
            {visible.length > 1 && (
              <div className="lightbox-controls">
                <button onClick={() => setActiveIndex((activeIndex - 1 + visible.length) % visible.length)} aria-label="Previous photograph">← Previous</button>
                <button onClick={() => setActiveIndex((activeIndex + 1) % visible.length)} aria-label="Next photograph">Next →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
