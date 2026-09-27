import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';
import { getServiceBySlug, services } from '@/lib/services-data';

export const dynamicParams = false;

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Cinqode`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <article className="service-page section shell">
          <Link className="service-back" href="/services">
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
            All services
          </Link>

          <header className="service-hero">
            <div className="service-hero-copy">
              <p className="section-kicker">Cinqode — Service</p>
              <h1>{service.name}</h1>
              <p className="service-hero-lead">{service.description}</p>
              <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link className="service-detail-link" href="/#contact">
                Get a quote
                <span aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
              </Link>
            </div>
            <div className="service-hero-media">
              <Image
                alt={`Cinqode ${service.name} project dashboard preview`}
                height={936}
                priority
                src={service.image}
                width={1664}
              />
            </div>
          </header>

          <section className="service-overview">
            <h2>Overview</h2>
            <div className="service-overview-copy">
              {service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="service-included">
            <h2>What&apos;s included</h2>
            <div className="service-feature-grid">
              {service.features.map((feature, index) => (
                <article className="service-feature" key={feature.title}>
                  <span className="service-feature-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          {service.types ? (
            <section className="service-types">
              <h2>{service.types.heading}</h2>
              <div className="service-feature-grid">
                {service.types.items.map((item) => (
                  <article className="service-feature" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="service-more">
            <h2>Explore more services</h2>
            <div className="service-more-list">
              {otherServices.map((item) => (
                <Link className="service-more-link" href={`/services/${item.slug}`} key={item.slug}>
                  {item.name}
                  <span aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
