import type { Metadata } from "next";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Canyonlands After Dark | Robert Lapine Photography",
  description: "A photographic study of sandstone, shadow, and the night sky in Canyonlands, Utah.",
};

export default function CanyonlandsStory() {
  return (
    <main className="story-page">
      <SiteHeader overlay />
      <header className="story-hero">
        <img src="/photos/canyon-75.jpg" alt="Canyonlands rock formations beneath a star-filled sky" />
        <div className="story-hero-shade" />
        <div><p className="eyebrow">Field story · Utah, 2022</p><h1>Canyonlands<br /><em>After Dark</em></h1></div>
      </header>
      <article className="story-article">
        <div className="story-lede">
          <p className="story-chapter">01 / The waiting</p>
          <p>The desert changes character when the last daylight leaves the rock. Familiar formations become silhouettes, distance becomes difficult to judge, and every patch of light feels deliberate.</p>
        </div>
        <figure className="story-wide"><img src="/photos/canyon-59.jpg" alt="Sandstone needles crossing the desert horizon" /><figcaption>The Needles · Canyonlands, Utah</figcaption></figure>
        <div className="story-note"><p className="story-chapter">02 / Scale</p><blockquote>Stone holds the light long after the sky has let it go.</blockquote></div>
        <div className="story-pair">
          <figure><img src="/photos/canyon-102.jpg" alt="Tall sandstone formation beneath the night sky" /><figcaption>Stone &amp; Silence</figcaption></figure>
          <figure><img src="/photos/canyon-98.jpg" alt="Sandstone tower illuminated at night" /><figcaption>Night Sentinel</figcaption></figure>
        </div>
        <div className="story-lede reverse">
          <p className="story-chapter">03 / The sky arrives</p>
          <p>Once darkness settles in, the sky stops being a backdrop. Stars define the space above the formations and reveal the true scale of the country below.</p>
        </div>
        <figure className="story-wide"><img src="/photos/canyon-45.jpg" alt="Wide Canyonlands landscape beneath an expansive sky" /><figcaption>Ancient Ground · Canyonlands, Utah</figcaption></figure>
        <div className="story-end"><p>Explore the complete sequence.</p><Link className="button-dark" href="/collections/canyonlands">Canyonlands collection →</Link></div>
      </article>
      <SiteFooter />
    </main>
  );
}
import Link from "next/link";
