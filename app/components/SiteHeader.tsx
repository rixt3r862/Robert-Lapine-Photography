import Link from "next/link";
import { flickrUrl } from "../data";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`site-header${overlay ? " overlay" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Robert Lapine Photography home">
        <span>RL</span>
        <strong>Robert Lapine Photography</strong>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/collections">Collections</Link>
        <Link href="/stories/canyonlands-after-dark">Stories</Link>
        <Link href="/#about">About</Link>
        <Link href="/contact">Contact</Link>
        <a className="nav-cta" href={flickrUrl} target="_blank" rel="noreferrer">
          Flickr <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
