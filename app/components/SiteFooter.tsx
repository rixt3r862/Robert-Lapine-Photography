import Link from "next/link";
import { flickrUrl } from "../data";

export function SiteFooter() {
  return (
    <footer>
      <div>
        <p className="footer-name">Robert Lapine Photography</p>
        <p>Landscape &amp; wildlife photography</p>
      </div>
      <div className="footer-links">
        <Link href="/collections">Collections</Link>
        <Link href="/stories/canyonlands-after-dark">Stories</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <p>All photographs © Robert Lapine</p>
      <a href={flickrUrl} target="_blank" rel="noreferrer">Flickr archive ↗</a>
    </footer>
  );
}
