import Link from 'next/link';
import { BrandMark } from './site-header';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <Link className="brand-link" href="/" aria-label="Cinqode home"><BrandMark /></Link>
        <nav aria-label="Footer navigation"><Link href="/services">Services</Link><Link href="/#work">Work</Link><Link href="/#contact">Contact</Link></nav>
        <p>© {new Date().getFullYear()} Cinqode. Built for what&apos;s next.</p>
      </div>
    </footer>
  );
}
