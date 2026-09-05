import { ArrowRight, Play } from 'lucide-react';

export function ContactCta() {
  return (
    <section className="contact-cta shell" id="contact" tabIndex={-1}>
      <div className="cta-copy">
        <h2>Ready to Build<br />Something <em>Amazing?</em></h2>
        <p>Let&apos;s turn your ideas into powerful digital solutions. We&apos;re just one click away.</p>
      </div>
      <div className="showreel" aria-hidden="true"><span><Play size={20} fill="currentColor" /></span> Play Showreel</div>
      <div className="cta-action">
        <h2 className="sr-only">Start a project with Cinqode</h2>
        <a className="primary-button" href="mailto:hello@cinqode.com">Get Started <ArrowRight aria-hidden="true" size={17} /></a>
      </div>
    </section>
  );
}
