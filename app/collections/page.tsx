import type { Metadata } from "next";
import { GalleryExplorer } from "../components/GalleryExplorer";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { collections, photos } from "../data";

export const metadata: Metadata = {
  title: "Collections | Robert Lapine Photography",
  description: "Explore Robert Lapine's landscape and wildlife photography collections from across the American West.",
};

export default function CollectionsPage() {
  return (
    <main>
      <SiteHeader />
      <header className="page-hero">
        <p className="eyebrow dark">The portfolio</p>
        <h1>Collections</h1>
        <p>Landscapes, wildlife, night skies, and the enduring character of the American West—organized by place and journey.</p>
      </header>
      <section className="collection-index-grid" aria-label="Photography collections">
        {collections.map((collection, index) => {
          const count = photos.filter((photo) => photo.collection === collection.slug).length;
          return (
            <Link href={`/collections/${collection.slug}`} className="index-card" key={collection.slug}>
              <span className="index-card-image"><img src={collection.cover} alt="" /></span>
              <span className="index-card-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="index-card-copy">
                <span>{collection.kicker} · {count} photographs</span>
                <strong>{collection.name}</strong>
                <span>{collection.description}</span>
              </span>
            </Link>
          );
        })}
      </section>
      <section className="work archive-work" aria-labelledby="archive-title">
        <div className="section-heading">
          <div><p className="eyebrow dark">Browse the archive</p><h2 id="archive-title">All photographs</h2></div>
          <p>Filter by collection, then select any photograph for an onsite full-screen view.</p>
        </div>
        <GalleryExplorer items={photos} filters />
      </section>
      <SiteFooter />
    </main>
  );
}
