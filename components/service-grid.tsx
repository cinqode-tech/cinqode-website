'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { services, type Service } from '@/lib/services-data';

export function ServiceGrid() {
  const [selected, setSelected] = useState<Service | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  const openService = (service: Service, event: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setSelected(service);
  };

  const close = () => {
    setSelected(null);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.name}>
            <button aria-haspopup="dialog" className="service-card-trigger" onClick={(event) => openService(service, event)} type="button">
              <div className="service-card-thumb">
                <Image alt={`Cinqode ${service.name} project dashboard preview`} height={936} src={service.image} width={1664} />
              </div>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
            </button>
            <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            animate={{ opacity: 1 }}
            className="service-modal-overlay"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={close}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              aria-labelledby={titleId}
              aria-modal="true"
              className="service-modal"
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: -16 }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: -50 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              style={{ willChange: 'transform, opacity' }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.175, 0.885, 0.32, 1.275] }}
            >
              <button aria-label="Close service details" className="service-modal-close" onClick={close} ref={closeButtonRef} type="button">
                <X aria-hidden="true" size={20} />
              </button>
              <div className="service-modal-thumb">
                <Image alt={`Cinqode ${selected.name} project dashboard preview`} height={936} src={selected.image} width={1664} />
              </div>
              <h2 id={titleId}>{selected.name}</h2>
              <p className="service-description">{selected.description}</p>
              <div className="service-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link className="service-detail-link" href="/#contact" onClick={close}>
                Get a quote
                <span aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
