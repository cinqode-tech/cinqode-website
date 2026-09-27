import Link from 'next/link';
import { GitHubIcon, LinkedInIcon, XIcon } from './social-icons';
import { BrandMark } from './site-header';

const socials = [
  { label: 'LinkedIn', Icon: LinkedInIcon, href: '#' },
  { label: 'GitHub', Icon: GitHubIcon, href: '#' },
  { label: 'X', Icon: XIcon, href: '#' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <Link className="brand-link" href="/" aria-label="Cinqode home"><BrandMark /></Link>
        <ul aria-label="Cinqode social profiles" className="footer-socials">
          {socials.map(({ label, Icon, href }) => (
            <li key={label}><a href={href} aria-label={`Cinqode on ${label}`}><Icon /></a></li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} Cinqode. Built for what&apos;s next.</p>
      </div>
    </footer>
  );
}
