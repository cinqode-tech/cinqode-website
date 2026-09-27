'use client';

import { ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';

const needs = [
  'AI / LLM', 'Web Development', 'ERP', 'Mobile App', 'WordPress',
  'Graphic Design', 'Video Editing', 'PC Support', 'RDP', 'Windows Server',
];

const budgets = ["Let's discuss", '$500 - $1,000', '$1,000 - $5,000', '$5,000+'];

const messageLimit = 1000;

export function ContactForm() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <form
      className="contact-form"
      id="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="contact-form-head">
        <h2>Send Us a Message</h2>
        <a className="contact-form-link" href="mailto:hello@cinqode.com">
          Let&apos;s discuss your project
          <ArrowRight aria-hidden="true" size={16} />
        </a>
      </div>

      <div className="contact-fields">
        <div className="contact-field">
          <label htmlFor="contact-name">Your Name *</label>
          <input id="contact-name" name="name" placeholder="John Doe" required type="text" autoComplete="name" />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-company">Company / Organization</label>
          <input id="contact-company" name="company" placeholder="Your company name" type="text" autoComplete="organization" />
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-email">Email Address *</label>
          <input id="contact-email" name="email" placeholder="you@example.com" required type="email" autoComplete="email" />
        </div>

        <fieldset className="contact-fieldset">
          <legend>What do you need?</legend>
          <div className="contact-chips">
            {needs.map((need) => (
              <label className="contact-chip" key={need}>
                <input name="needs" type="checkbox" value={need} />
                <span>{need}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-message">Tell us about it</label>
          <textarea
            id="contact-message"
            maxLength={messageLimit}
            name="message"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us about your project, problem or idea…"
            value={message}
          />
          <span className="contact-counter">{message.length}/{messageLimit}</span>
        </div>

        <fieldset className="contact-fieldset">
          <legend>What&apos;s your budget?</legend>
          <div className="contact-chips">
            {budgets.map((budget) => (
              <label className="contact-chip" key={budget}>
                <input name="budget" type="radio" value={budget} />
                <span>{budget}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="contact-form-footer">
          <button className="contact-submit" type="submit">
            Send Project Brief
            <Send aria-hidden="true" size={16} />
          </button>
          <p aria-live="polite" className="contact-status" role="status">
            {sent ? 'Thanks — your brief is ready to send.' : ''}
          </p>
        </div>
      </div>
    </form>
  );
}
