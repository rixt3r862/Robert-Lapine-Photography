import { GalleryExplorer } from "./components/GalleryExplorer";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { collections, flickrUrl, photos } from "./data";

const selectedIds = [
  "52059513353",
  "52059513843",
  "51669598847",
  "51668925279",
  "51668476903",
  "51668929759",
  "51667437882",
  "51669117605",
  "52059965030",
];

const selectedPhotos = selectedIds
  .map((id) => photos.find((photo) => photo.id === id))
  .filter((photo): photo is (typeof photos)[number] => Boolean(photo));

export default function Home() {
  return (
    <main>
      <SiteHeader overlay />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img className="hero-image" src="/photos/canyon-75.jpg" alt="Rock formations illuminated beneath a star-filled Canyonlands sky" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Landscape &amp; wildlife photography</p>
          <h1 id="hero-title">Chasing the light<br /><em>out West.</em></h1>
          <p className="hero-intro">Robert Lapine photographs the vast, quiet drama of America&apos;s wild places—from red-rock nights to open-range mornings.</p>
          <a className="text-link" href="/collections">Explore the collections <span aria-hidden="true">→</span></a>
        </div>
        <div className="hero-caption"><span>Featured</span><span>Canyonlands, Utah</span></div>
      </section>

      <section className="intro" aria-label="Portfolio introduction">
        <p className="eyebrow dark">A patient eye. A wild horizon.</p>
        <p className="intro-statement">Drawn to weather, wilderness, and the fleeting moments when a familiar landscape becomes something extraordinary.</p>
      </section>

      <section className="collections-section" aria-labelledby="collections-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Explore by place</p>
            <h2 id="collections-title">Featured collections</h2>
          </div>
          <p>Six bodies of work from across the American West, presented here in their own right.</p>
        </div>
        <div className="collection-grid">
          {collections.map((collection, index) => {
            const count = photos.filter((photo) => photo.collection === collection.slug).length;
            return (
              <a className="collection-card" href={`/collections/${collection.slug}`} key={collection.slug}>
                <span className="collection-image"><img src={collection.cover} alt="" loading={index > 2 ? "lazy" : "eager"} /></span>
                <span className="collection-index">{String(index + 1).padStart(2, "0")} / {String(collections.length).padStart(2, "0")}</span>
                <span className="collection-card-copy">
                  <span className="collection-kicker">{collection.kicker} · {count} photographs</span>
                  <strong>{collection.name}</strong>
                  <span>{collection.description}</span>
                </span>
              </a>
            );
          })}
        </div>
        <a className="text-link dark-link" href="/collections">View all collections <span aria-hidden="true">→</span></a>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div><p className="eyebrow dark">Portfolio / 2020–2022</p><h2 id="work-title">Selected work</h2></div>
          <p>Select any photograph to view it here without leaving Robert&apos;s portfolio.</p>
        </div>
        <GalleryExplorer items={selectedPhotos} />
        <div className="collection-cta">
          <p>Twenty-five photographs now live here.</p>
          <a href="/collections">Explore the complete onsite portfolio <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="story-feature" aria-labelledby="story-title">
        <div className="story-image"><img src="/photos/canyon-102.jpg" alt="Sandstone formation beneath the night sky" loading="lazy" /></div>
        <div className="story-copy">
          <p className="eyebrow">Field story · Canyonlands</p>
          <h2 id="story-title">When the desert goes dark, the stone begins to glow.</h2>
          <p>A visual essay about scale, patience, and the celestial light that transforms Canyonlands after sunset.</p>
          <a className="text-link" href="/stories/canyonlands-after-dark">Read the photo story <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-number" aria-hidden="true">RL / 47</div>
        <div className="about-copy">
          <p className="eyebrow">Behind the lens</p>
          <h2 id="about-title">The long way is usually the right way.</h2>
          <p>Robert&apos;s photography is rooted in attention: watching weather move across a ridge, waiting for first light to find the canyon walls, and leaving room for the landscape to speak for itself.</p>
          <p>His archive traces years on the road through Canyonlands, Yellowstone, Grand Teton, Capitol Reef, and the quiet country in between.</p>
          <div className="about-actions">
            <a className="text-link" href="/contact">Prints &amp; licensing <span aria-hidden="true">→</span></a>
            <a className="quiet-link" href={flickrUrl} target="_blank" rel="noreferrer">Browse the complete Flickr archive ↗</a>
          </div>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <p className="eyebrow dark">Bring the work home</p>
        <h2 id="contact-title">Interested in a print or licensing a photograph?</h2>
        <p>Start with the image title and intended use. Robert can help identify the right photograph and format.</p>
        <a className="button-dark" href="/contact">Contact &amp; licensing →</a>
      </section>

      <SiteFooter />
    </main>
  );
}
