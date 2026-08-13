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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visible = useMemo(
    () => activeFilter === "all" ? items : items.filter((photo) => photo.collection === activeFilter),
    [activeFilter, items],
  );
  const activePhoto = activeIndex === null ? null : visible[activeIndex];
  const activePhotoSrc = activePhoto && typeof window !== "undefined" && window.location.pathname.startsWith("/Robert-Lapine-Photography")
    ? `/Robert-Lapine-Photography${activePhoto.src}`
    : activePhoto?.src;

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
    setActiveIndex(null);
  }

  return (
    <>
      {filters && (
        <div className="gallery-filters" aria-label="Filter photographs by collection">
          <button className={activeFilter === "all" ? "active" : ""} onClick={() => changeFilter("all")}>All work</button>
          {collections.map((collection) => (
            <button
              className={activeFilter === collection.slug ? "active" : ""}
              key={collection.slug}
              onClick={() => changeFilter(collection.slug)}
            >
              {collection.name.replace(" After Dark", "").replace(" Country", "")}
            </button>
          ))}
        </div>
      )}

      <div className="gallery">
        {visible.map((photo, index) => (
          <button
            className={`photo-card ${photo.orientation === "portrait" ? "tall" : "wide"}`}
            key={photo.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${photo.title}`}
          >
            <span className="photo-frame">
              <img src={photo.src} alt={photo.alt} loading={index > 5 ? "lazy" : "eager"} />
              <span className="view-mark" aria-hidden="true">+</span>
            </span>
            <span className="photo-meta">
              <span>{photo.title}</span>
              <span>{String(index + 1).padStart(2, "0")} · {photo.location}</span>
            </span>
          </button>
        ))}
      </div>

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
