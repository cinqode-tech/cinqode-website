import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Mail, MapPin, MessagesSquare, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Contact — Cinqode',
  description: 'Tell us what you are working on and we will come back with a clear plan and a quote.',
};

const details = [
  { icon: Mail, label: 'Email', lines: ['hello@cinqode.com'], href: 'mailto:hello@cinqode.com' },
  { icon: Phone, label: 'Phone / WhatsApp', lines: ['+92 300 1234567'], href: 'tel:+923001234567' },
  { icon: MapPin, label: 'Location', lines: ['Lahore, Pakistan'] },
  { icon: Clock, label: 'Availability', lines: ['Mon - Sat', '9:00 AM – 7:00 PM'] },
];

const assurances = ['Free Consultation', 'Project Guidance', 'Technology Suggestions', 'No Obligation'];

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="contact-page shell">
          <header className="contact-hero">
            <div className="contact-hero-copy">
              <p className="section-kicker"><MessagesSquare aria-hidden="true" size={14} /> Get In Touch</p>
              <h1>Have an Idea?<br /><span>Let&apos;s Make It Real.</span></h1>
              <p className="contact-hero-lead">
                Tell us what you&apos;re working on, what you&apos;re trying to solve, or even just what you&apos;re
                thinking about. We&apos;ll figure out the technology together.
              </p>
            </div>
            <div className="contact-hero-note">
              <p>Your Idea.<br />Our expertise.<br />Real solutions.</p>
              <span aria-hidden="true" className="contact-hero-line" />
            </div>
          </header>

          <div className="contact-grid">
            <section aria-labelledby="contact-details-heading" className="contact-card contact-info">
              <p className="section-kicker">Contact Information</p>
              <h2 id="contact-details-heading">Start a Conversation</h2>
              <p className="contact-info-copy">
                We&apos;d love to hear from you. Choose the best way to reach us or fill out the form and we&apos;ll get
                back to you as soon as possible.
              </p>
              <ul className="contact-details">
                {details.map(({ icon: Icon, label, lines, href }) => (
                  <li className="contact-detail" key={label}>
                    <span aria-hidden="true" className="contact-detail-icon"><Icon size={18} strokeWidth={1.8} /></span>
                    <div>
                      <p className="contact-detail-label">{label}</p>
                      <p className="contact-detail-value">
                        {lines.map((line, index) => (
                          <span key={line}>
                            {index > 0 ? <br /> : null}
                            {href && index === 0 ? <a href={href}>{line}</a> : line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Send us a message" className="contact-card contact-form-card">
              <ContactForm />
            </section>
          </div>

          <section aria-labelledby="contact-banner-heading" className="contact-banner">
            <svg aria-hidden="true" className="contact-banner-route" viewBox="0 0 900 260" preserveAspectRatio="none">
              <path d="M0 210C160 210 210 120 330 120s170 92 290 92 190-82 280-82" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="120" cy="196" fill="currentColor" r="4" />
              <circle cx="640" cy="205" fill="currentColor" r="4" />
              <circle cx="780" cy="120" fill="currentColor" r="4" />
            </svg>
            <div className="contact-banner-copy">
              <p className="section-kicker">Not Sure Where to Start?</p>
              <h2 id="contact-banner-heading">You Don&apos;t Need<br />a Complete Plan.</h2>
              <p>
                Have an idea but don&apos;t know what technology you need? That&apos;s okay. Tell us what you&apos;re
                trying to accomplish and we&apos;ll help you figure out the right approach.
              </p>
              <Link className="primary-button" href="#contact-form">
                Talk to Cinqode
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
            <ul className="contact-banner-list">
              {assurances.map((item) => (
                <li key={item}><Check aria-hidden="true" size={18} strokeWidth={2.4} />{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
