import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services-data';

export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((service) => (
        <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
          <div className="service-card-thumb">
            <Image alt={`Cinqode ${service.name} project dashboard preview`} height={936} src={service.image} width={1664} />
          </div>
          <h2>{service.name}</h2>
          <p>{service.description}</p>
          <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <span className="service-card-cta">
            View service
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </span>
        </Link>
      ))}
    </div>
  );
}
