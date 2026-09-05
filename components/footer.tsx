import { BrandMark } from './site-header';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <a className="brand-link" href="#home" aria-label="Cinqode home"><BrandMark /></a>
        <nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#work">Work</a><a href="#contact">Contact</a></nav>
        <p>© {new Date().getFullYear()} Cinqode. Built for what&apos;s next.</p>
      </div>
    </footer>
  );
}
