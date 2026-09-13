'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useId, useState } from 'react';
import { services } from '@/lib/services-data';

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const idPrefix = useId();
  const reduceMotion = useReducedMotion();

  return (
    <section className="services section shell" id="services" tabIndex={-1}>
      <p className="services-overline">Cinqode — Creative &amp; Development Services</p>
      <h2 className="sr-only">Our Services</h2>
      <div className="services-showcase">
        <div className="services-list" role="tablist" aria-label="Cinqode services">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                aria-controls={`${idPrefix}-panel`}
                aria-selected={isActive}
                className="service-option"
                id={`${idPrefix}-tab-${index}`}
                key={service.name}
                onClick={() => setActiveIndex(index)}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <span>{service.name}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence initial={!reduceMotion} mode="wait">
          <motion.article
            animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
            aria-labelledby={`${idPrefix}-tab-${activeIndex}`}
            className="service-detail"
            data-service={activeService.name}
            data-testid="service-detail"
            exit={reduceMotion ? { filter: 'blur(0px)', opacity: 1, x: 0 } : { filter: 'blur(3px)', opacity: 0.28, x: -42 }}
            id={`${idPrefix}-panel`}
            initial={reduceMotion ? false : { filter: 'blur(4px)', opacity: 0, x: 42 }}
            key={activeService.name}
            role="tabpanel"
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="service-tags">{activeService.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <p className="service-description">{activeService.description}</p>
            <a className="service-detail-link" href="#contact">
              Explore {activeService.name} services
              <span aria-hidden="true"><ArrowUpRight size={21} strokeWidth={1.8} /></span>
            </a>
            <div className="service-preview">
              <Image alt={`Cinqode ${activeService.name} project dashboard preview`} height={936} priority src={activeService.image} width={1664} />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
      <Link className="services-view-all" href="/services">
        View all services
        <span aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
      </Link>
    </section>
  );
}
