import { Bot, Boxes, Clapperboard, Code2, Monitor, Network, PenTool, ServerCog, Smartphone, SquareDashed } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

type Service = { name: string; note: string; icon: LucideIcon };

const services: Service[] = [
  { name: 'AI Chatbot', note: 'LLM, MCP, RAG intelligent chatbots powered by AI for smarter conversations and automation.', icon: Bot },
  { name: 'Web Development', note: 'Modern, fast & responsive websites and web applications built with the latest tech.', icon: Code2 },
  { name: 'ERP', note: 'Custom ERP solutions to streamline your business operations and increase productivity.', icon: Boxes },
  { name: 'Mobile App', note: 'Android & iOS apps that are scalable, user-friendly and powerful.', icon: Smartphone },
  { name: 'WordPress Development', note: 'Custom WordPress websites with powerful functionality and stunning design.', icon: SquareDashed },
  { name: 'Graphic Design', note: 'Creative visuals that represent your brand and communicate your message.', icon: PenTool },
  { name: 'Ads Video Editing', note: 'Engaging ad videos that capture attention and drive results.', icon: Clapperboard },
  { name: 'PC Related Issues', note: 'Troubleshooting, optimization & support for all kinds of PC problems.', icon: Monitor },
  { name: 'RDP', note: 'Secure and reliable Remote Desktop access solutions for your business.', icon: Network },
  { name: 'Windows Server Management 2025', note: 'Install, configure & manage Windows Server 2025 for maximum performance.', icon: ServerCog },
];

export function Services() {
  return (
    <section className="services section shell" id="services" tabIndex={-1}>
      <div className="section-heading">
        <div><p className="section-kicker">What We Do</p><h2>Our Services</h2></div>
        <p>From idea to implementation, we provide end-to-end digital services tailored to your business needs.</p>
        <a className="services-action" href="#contact" aria-label="Start a project with Cinqode"><ArrowUpRight aria-hidden="true" size={27} /></a>
      </div>
      <ul className="service-grid">
        {services.map(({ name, note, icon: Icon }) => (
          <li key={name}>
            <article className="service-card">
              <span className="service-icon" aria-hidden="true"><Icon size={36} strokeWidth={1.5} /></span>
              <h3>{name}</h3>
              <p>{note}</p>
              <a aria-label={`Explore ${name} services`} href="#contact"><ArrowUpRight aria-hidden="true" size={16} /></a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
