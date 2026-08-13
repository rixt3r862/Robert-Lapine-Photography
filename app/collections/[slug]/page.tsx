import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryExplorer } from "../../components/GalleryExplorer";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { collections, getCollection, getCollectionPhotos } from "../../data";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} | Robert Lapine Photography`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const collectionPhotos = getCollectionPhotos(slug);
  return (
    <main>
      <SiteHeader overlay />
      <header className="collection-hero">
        <img src={collection.cover} alt="" />
        <div className="collection-hero-shade" />
        <div className="collection-hero-copy">
          <p className="eyebrow">Collection · {collection.kicker}</p>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>
      </header>
      <section className="collection-gallery">
        <div className="collection-gallery-intro">
          <span>{String(collectionPhotos.length).padStart(2, "0")} photographs</span>
          <p>Select any image for a full-screen view. Use arrow keys to move through the collection.</p>
        </div>
        <GalleryExplorer items={collectionPhotos} />
      </section>
      <nav className="collection-next" aria-label="More collections">
        <span>Continue exploring</span>
        <a href="/collections">All collections →</a>
      </nav>
      <SiteFooter />
    </main>
  );
}
