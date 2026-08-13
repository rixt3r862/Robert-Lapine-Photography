import { flickrUrl } from "../data";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`site-header${overlay ? " overlay" : ""}`}>
      <a className="wordmark" href="/" aria-label="Robert Lapine Photography home">
        <span>RL</span>
        <strong>Robert Lapine Photography</strong>
      </a>
      <nav aria-label="Main navigation">
        <a href="/collections">Collections</a>
        <a href="/stories/canyonlands-after-dark">Stories</a>
        <a href="/#about">About</a>
        <a href="/contact">Contact</a>
        <a className="nav-cta" href={flickrUrl} target="_blank" rel="noreferrer">
          Flickr <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
