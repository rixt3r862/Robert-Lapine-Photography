import { flickrUrl } from "../data";

export function SiteFooter() {
  return (
    <footer>
      <div>
        <p className="footer-name">Robert Lapine Photography</p>
        <p>Landscape &amp; wildlife photography</p>
      </div>
      <div className="footer-links">
        <a href="/collections">Collections</a>
        <a href="/stories/canyonlands-after-dark">Stories</a>
        <a href="/contact">Contact</a>
      </div>
      <p>All photographs © Robert Lapine</p>
      <a href={flickrUrl} target="_blank" rel="noreferrer">Flickr archive ↗</a>
    </footer>
  );
}
