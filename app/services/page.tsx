import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { ServiceGrid } from '@/components/service-grid';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Services — Cinqode',
  description: 'Explore the full range of digital product, development, and support services Cinqode offers.',
};

export default function ServicesPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="services-page section shell">
          <p className="section-kicker">Cinqode — Creative &amp; Development Services</p>
          <div className="section-heading">
            <h1>All Our Services</h1>
            <p>Everything Cinqode builds and supports, from AI-powered products to day-to-day infrastructure.</p>
          </div>
          <ServiceGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
