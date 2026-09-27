import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, CodeXml, Handshake, Info, Palette, PenTool, Server, Sparkles, Target } from 'lucide-react';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'About — Cinqode',
  description: 'Four minds, one vision: the team behind Cinqode and how we build digital solutions that matter.',
};

const skills = [
  { icon: Cpu, label: 'AI & Automation' },
  { icon: CodeXml, label: 'Development' },
  { icon: PenTool, label: 'Design & Creative' },
  { icon: Server, label: 'Infrastructure' },
];

const milestones = [
  {
    title: 'The Idea',
    description: 'Four people with different backgrounds came together with one goal: build technology that solves real problems.',
  },
  {
    title: 'Cinqode Begins',
    description: 'We started Cinqode to bring development, AI, infrastructure and creative services under one team.',
  },
  {
    title: 'Building Together',
    description: 'From websites and applications to AI systems and server infrastructure, we started turning ideas into real products.',
  },
  {
    title: "What's Next",
    description: 'Our goal is to continue building smarter, scalable solutions for businesses around the world.',
  },
];

const founders = [
  {
    name: 'Zaid Iqbal',
    role: 'Co-Founder · AI & Software',
    bio: 'Focused on AI systems, LLM applications, MCP, RAG and intelligent automation.',
    socials: ['LinkedIn', 'GitHub', 'X'],
  },
  {
    name: 'Hashim Irfan',
    role: 'Co-Founder · Business Analyst & Development',
    bio: 'Focused on understanding business requirements, designing effective solutions, and developing scalable digital products that align technology with business goals..',
    socials: ['LinkedIn', 'GitHub', 'X'],
  },
  {
    name: 'Ahmed Affaq',
    role: 'Co-Founder · Web & Product',
    bio: 'Focused on web applications, product development and scalable digital experiences.',
    socials: ['LinkedIn', 'GitHub', 'X'],
  },
  {
    name: 'Usman Manzoor',
    role: 'Co-Founder · Word-press, Design & Creative',
    bio: 'Focused on branding, graphic design, video editing, creative direction and Word-press sitess.',
    socials: ['LinkedIn', 'Instagram', 'X'],
  },
];

const differentiators = [
  { icon: Sparkles, title: 'AI First', description: 'We explore AI where it can genuinely improve a product or workflow.' },
  { icon: Target, title: 'Built Around Your Business', description: "We don't force every client into the same solution." },
  { icon: Palette, title: 'Technology + Creativity', description: 'Development and design work together, not separately.' },
  { icon: Handshake, title: 'Long-Term Partnership', description: "We're here after launch for support, maintenance and growth." },
];

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('');
}

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="about-page shell">
          <header className="about-hero">
            <div className="about-hero-copy">
              <p className="section-kicker"><Info aria-hidden="true" size={14} /> About Us</p>
              <h1>Four Minds.<br /><span>One Vision.</span></h1>
              <p className="about-hero-lead">
                We&apos;re a team of four — united by a shared passion for technology, creativity, and solving
                real-world problems. Together, we build digital solutions that help businesses grow, scale, and stay
                ahead.
              </p>
              <Link className="primary-button" href="#team">
                Meet Our Team
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
            <div className="about-skills">
              <p className="section-kicker">Different skills. Same goal.</p>
              <ul className="about-skills-grid">
                {skills.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <span aria-hidden="true" className="about-skill-icon"><Icon size={19} strokeWidth={1.8} /></span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <section aria-labelledby="about-story-heading" className="about-story section">
            <div className="about-story-head">
              <div>
                <p className="section-kicker">Our Story</p>
                <h2 id="about-story-heading">How It All<br />Started</h2>
              </div>
              <p className="about-story-intro">
                Cinqode began with four individuals, each bringing unique skills and experiences. What started as a
                shared idea quickly turned into a focused mission — to build smart, scalable and future-ready digital
                solutions.
              </p>
            </div>
            <ol className="about-timeline">
              {milestones.map((milestone, index) => (
                <li key={milestone.title}>
                  <span aria-hidden="true" className="about-step">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="about-team-heading" className="about-team section" id="team">
            <p className="section-kicker">Our Team</p>
            <h2 id="about-team-heading">Meet the Founders</h2>
            <p className="about-team-sub">Four different minds. One shared mission.</p>
            <ul className="about-founders">
              {founders.map((founder) => (
                <li className="about-founder" key={founder.name}>
                  <span aria-hidden="true" className="about-founder-photo">{initials(founder.name)}</span>
                  <h3>{founder.name}</h3>
                  <p className="about-founder-role">{founder.role}</p>
                  <p className="about-founder-bio">{founder.bio}</p>
                  <ul aria-label={`${founder.name} links`} className="about-founder-socials">
                    {founder.socials.map((social) => (
                      <li key={social}>
                        <a href="#" aria-label={`${founder.name} on ${social}`}>{social}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about-different-heading" className="about-different section">
            <div className="about-different-head">
              <h2 id="about-different-heading">What Makes Cinqode Different?</h2>
              <p>
                We don&apos;t just build what&apos;s asked — we think about what&apos;s possible. Our approach combines
                technical expertise, creative thinking, and a strong focus on your business goals.
              </p>
            </div>
            {differentiators.map(({ icon: Icon, title, description }) => (
              <article className="about-different-item" key={title}>
                <Icon aria-hidden="true" className="about-different-icon" size={22} strokeWidth={1.8} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </section>

          <section aria-labelledby="about-mission-heading" className="about-mission">
            <svg aria-hidden="true" className="about-mission-art" preserveAspectRatio="none" viewBox="0 0 760 300">
              <path d="M0 300V214l86-92 78 92 66-58 84 92 72-70 74 78 70-64 88 82 62-56 80 84V300Z" fill="currentColor" opacity=".55" />
              <path d="M0 300v-46l104-70 90 78 96-62 88 74 92-56 96 68 98-58 96 70v2Z" fill="currentColor" opacity=".8" />
            </svg>
            <div className="about-mission-copy">
              <p className="section-kicker">Our Mission</p>
              <h2 id="about-mission-heading">
                We didn&apos;t start Cinqode just to build software. We started it to build solutions that matter.
              </h2>
              <p className="about-mission-sign">— The Cinqode Team</p>
            </div>
            <Link aria-label="Start a project with Cinqode" className="about-mission-arrow" href="/contact">
              <ArrowRight aria-hidden="true" size={20} />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
