import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { flickrUrl } from "../data";

export const metadata: Metadata = {
  title: "Contact & Licensing | Robert Lapine Photography",
  description: "Contact Robert Lapine about photographic prints, licensing, and image use.",
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="contact-page">
        <div className="contact-heading">
          <p className="eyebrow dark">Contact &amp; licensing</p>
          <h1>Let&apos;s find the right photograph.</h1>
          <p>For print availability, editorial or commercial licensing, and other image-use questions, contact Robert directly using the details on his business card.</p>
          <div className="contact-direct">
            <a className="button-dark" href="mailto:vietnamvet71@comcast.net">Email Robert →</a>
            <a className="contact-detail" href="tel:+18013884832">801-388-4832</a>
            <a className="contact-detail" href="mailto:vietnamvet71@comcast.net">vietnamvet71@comcast.net</a>
          </div>
        </div>
        <aside className="inquiry-guide">
          <p className="eyebrow dark">What to include</p>
          <ol>
            <li><span>01</span><p><strong>The photograph</strong>Use the title shown in the onsite gallery.</p></li>
            <li><span>02</span><p><strong>Your intended use</strong>Print, editorial, commercial, exhibition, or another purpose.</p></li>
            <li><span>03</span><p><strong>Timing and format</strong>Include your preferred dimensions and deadline, if known.</p></li>
          </ol>
          <p className="contact-note">Prefer Flickr? <a href={flickrUrl} target="_blank" rel="noreferrer">Visit Robert&apos;s established portfolio and message him there ↗</a></p>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
