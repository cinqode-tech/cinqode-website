'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const links = [
  ['Home', '#home'], ['Services', '#services'], ['Work', '#work'],
  ['About', '#about'], ['Process', '#contact'], ['Contact', '#contact'],
] as const;

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-symbol">C</span>
      {!compact && <span className="brand-name">cinqode</span>}
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
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true });
    });
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand-link" href="#home" aria-label="Cinqode home"><BrandMark /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
        </nav>
        <a className="talk-button desktop-talk" href="#contact">Let&apos;s Talk <ArrowUpRight aria-hidden="true" size={15} /></a>
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
      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a href={href} key={label} onClick={() => handleMobileNavigation(href)}>{label}</a>)}
          <a className="talk-button" href="#contact" onClick={() => handleMobileNavigation('#contact')}>Let&apos;s Talk <ArrowUpRight aria-hidden="true" size={16} /></a>
        </nav>
      )}
    </header>
  );
}
