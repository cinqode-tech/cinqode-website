import { ContactCta } from '@/components/contact-cta';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { SiteHeader } from '@/components/site-header';
import { Stats } from '@/components/stats';
import { TrustStrip } from '@/components/trust-strip';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TrustStrip />
        <Services />
        <Stats />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
