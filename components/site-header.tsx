'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const links = [
  ['Home', '/#home'], ['Services', '/services'], ['Work', '/#work'],
  ['About', '/#about'], ['Contact', '/#contact'],
] as const;

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? ' brand-mark-compact' : ''}`}>
      <Image
        alt="Cinqode"
        height={compact ? 737 : 689}
        priority
        src={compact ? '/brand/cinqode-icon.png' : '/brand/cinqode-wordmark.png'}
        width={compact ? 737 : 3671}
      />
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const handleMobileNavigation = (href: string) => {
    setOpen(false);
    const hash = href.slice(href.indexOf('#'));
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(hash)?.focus({ preventScroll: true });
    });
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand-link" href="/" aria-label="Cinqode home"><BrandMark /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            href.includes('#')
              ? <a href={href} key={label}>{label}</a>
              : <Link href={href} key={label}>{label}</Link>
          ))}
        </nav>
        <Link className="talk-button desktop-talk" href="/#contact">Let&apos;s Talk <ArrowUpRight aria-hidden="true" size={15} /></Link>
        <button
          ref={buttonRef}
          className="menu-button"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav className="mobile-nav" hidden={!open} id="mobile-navigation" aria-label="Mobile navigation">
        {links.map(([label, href]) => (
          href.includes('#')
            ? <a href={href} key={label} onClick={() => handleMobileNavigation(href)}>{label}</a>
            : <Link href={href} key={label} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link className="talk-button" href="/#contact" onClick={() => handleMobileNavigation('/#contact')}>Let&apos;s Talk <ArrowUpRight aria-hidden="true" size={16} /></Link>
      </nav>
    </header>
  );
}
