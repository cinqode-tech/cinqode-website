'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useId, useState } from 'react';

type Service = { name: string; description: string; image: string; tags: string[] };

const services: Service[] = [
  { name: 'AI Chatbot', image: '/services/ai-chatbot-preview.png', tags: ['LLM-powered', 'RAG integration', 'Workflow automation'], description: 'Intelligent assistants that answer faster, automate routine work, and give your customers a more useful digital experience.' },
  { name: 'Web Development', image: '/services/web-development-preview.png', tags: ['Fast builds', 'Scalable systems', 'SEO-ready'], description: 'Modern web platforms engineered to load quickly, scale confidently, and turn your digital presence into measurable growth.' },
  { name: 'ERP', image: '/services/erp-preview.png', tags: ['Business workflows', 'Custom dashboards', 'Connected data'], description: 'Purpose-built ERP systems that bring operations, reporting, and decision-making into one clear, dependable workspace.' },
  { name: 'Mobile App', image: '/services/mobile-app-preview.png', tags: ['iOS & Android', 'Product strategy', 'App store ready'], description: 'Useful mobile products with thoughtful flows, reliable performance, and a clear path from first tap to loyal customer.' },
  { name: 'WordPress Development', image: '/services/wordpress-preview.png', tags: ['Custom themes', 'Easy publishing', 'Secure foundation'], description: 'Flexible WordPress experiences that give your team control without compromising on speed, quality, or visual polish.' },
  { name: 'Graphic Design', image: '/services/graphic-design-preview.png', tags: ['Brand assets', 'Campaign creative', 'Clear storytelling'], description: 'Visual systems and campaign materials that make your brand recognisable, clear, and ready for every touchpoint.' },
  { name: 'Ads Video Editing', image: '/services/ads-video-editing-preview.png', tags: ['Short-form video', 'Paid campaigns', 'Social-ready'], description: 'Attention-holding ad edits built to communicate quickly, fit each platform, and move audiences toward action.' },
  { name: 'PC Related Issues', image: '/services/pc-support-preview.png', tags: ['Troubleshooting', 'Performance tuning', 'Remote support'], description: 'Straightforward technical support that resolves PC issues, restores performance, and keeps your team moving.' },
  { name: 'RDP', image: '/services/rdp-preview.png', tags: ['Secure access', 'Remote teams', 'Reliable setup'], description: 'Remote desktop environments configured for secure, dependable access wherever your team needs to work.' },
  { name: 'Windows Server Management', image: '/services/windows-server-preview.png', tags: ['Server setup', 'Monitoring', 'Ongoing support'], description: 'Windows Server management that keeps your infrastructure stable, secure, and ready for the demands of your business.' },
];

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
    </section>
  );
}
