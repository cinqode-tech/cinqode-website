import { ArrowRight, Play } from 'lucide-react';
import { HeroArtwork } from './hero-artwork';

export function Hero() {
  return (
    <section className="hero shell" id="home" tabIndex={-1}>
      <div className="hero-copy">
        <p className="eyebrow"><span aria-hidden="true" /> We Code. You Grow.</p>
        <h1>We Build Digital{' '}<br />Solutions That{' '}<br /><em>Move</em>{' '}You Forward.</h1>
        <p className="hero-description">Cinqode helps businesses and brands unlock their full potential with smart, scalable and future-ready digital solutions.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#services">Explore Services <ArrowRight aria-hidden="true" size={17} /></a>
          <a className="secondary-button" href="#work">View Our Work <Play aria-hidden="true" size={13} fill="currentColor" /></a>
        </div>
      </div>
      <HeroArtwork />
    </section>
  );
}
