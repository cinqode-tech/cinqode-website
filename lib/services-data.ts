export type ServiceFeature = { title: string; description: string };

export type ServiceTypeGroup = { heading: string; items: ServiceFeature[] };

export type Service = {
  slug: string;
  name: string;
  description: string;
  overview: string[];
  features: ServiceFeature[];
  types?: ServiceTypeGroup;
  image: string;
  tags: string[];
};

export const services: Service[] = [
  {
    slug: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'Intelligent assistants that answer faster, automate routine work, and give your customers a more useful digital experience.',
    overview: [
      'A good assistant removes work instead of adding it. We scope the questions it should answer, connect it to the right data, and test it against real conversations before it goes live.',
      'Once deployed, we keep tuning prompts, retrieval, and hand-off rules so answers stay accurate as your content and products change.',
    ],
    features: [
      { title: 'Conversational design', description: 'Intents, tone, and fallbacks mapped to the questions customers actually ask.' },
      { title: 'Data & RAG integration', description: 'Your documents, products, and knowledge base connected as grounded sources.' },
      { title: 'Workflow automation', description: 'Routine requests routed and completed without a person in the loop.' },
      { title: 'Monitoring & tuning', description: 'Transcript review and ongoing prompt refinement after launch.' },
    ],
    types: {
      heading: 'Types of AI chatbots',
      items: [
        { title: 'LLM chatbots', description: 'Built directly on a large language model. Best for open-ended conversation, drafting, and summarising where answers draw on the model’s general knowledge rather than your private data.' },
        { title: 'RAG chatbots', description: 'Retrieval-augmented generation. The assistant looks up relevant passages in your documents, products, or knowledge base before replying, so answers stay current and traceable to a source.' },
        { title: 'CAG chatbots', description: 'Cache-augmented generation. Your knowledge is loaded into the model’s context up front, so replies arrive without a retrieval step — well suited to a stable body of content that changes rarely.' },
        { title: 'Agentic AI (AI agents)', description: 'Assistants that act as well as answer. Agents call tools and APIs, carry out multi-step tasks, and hand off to a person when a request needs one.' },
      ],
    },
    image: '/services/ai-chatbot-preview.png',
    tags: ['LLM-powered', 'RAG integration', 'Workflow automation'],
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    description: 'Modern web platforms engineered to load quickly, scale confidently, and turn your digital presence into measurable growth.',
    overview: [
      'We build for the way the site will be used, not just for launch day. Structure, performance budgets, and content models are decided up front so pages stay fast as they grow.',
      'Accessibility, analytics, and search foundations are part of the build, so the platform is measurable and maintainable from the first release.',
    ],
    features: [
      { title: 'Front-end engineering', description: 'Component-driven interfaces that stay consistent across every page and screen.' },
      { title: 'APIs & integrations', description: 'Payments, CRMs, and third-party services connected cleanly.' },
      { title: 'Performance & SEO', description: 'Fast loading, clean markup, and technical SEO built in from the start.' },
      { title: 'Scalable architecture', description: 'A codebase and hosting setup that holds up as traffic and content grow.' },
    ],
    image: '/services/web-development-preview.png',
    tags: ['Fast builds', 'Scalable systems', 'SEO-ready'],
  },
  {
    slug: 'erp',
    name: 'ERP',
    description: 'Purpose-built ERP systems that bring operations, reporting, and decision-making into one clear, dependable workspace.',
    overview: [
      'Off-the-shelf ERP forces your business into someone else’s process. We map how your teams actually work, then build modules around those flows.',
      'Data lives in one place, so reporting and decisions come from the same numbers rather than spreadsheets maintained in parallel.',
    ],
    features: [
      { title: 'Process mapping', description: 'Purchasing, inventory, sales, and finance workflows documented before anything is built.' },
      { title: 'Custom modules', description: 'Screens and automations shaped around your roles and approvals.' },
      { title: 'Reporting & dashboards', description: 'Live operational views instead of month-end spreadsheet reconciliation.' },
      { title: 'Integrations & migration', description: 'Existing systems and historical data brought across without losing history.' },
    ],
    image: '/services/erp-preview.png',
    tags: ['Business workflows', 'Custom dashboards', 'Connected data'],
  },
  {
    slug: 'mobile-app',
    name: 'Mobile App',
    description: 'Useful mobile products with thoughtful flows, reliable performance, and a clear path from first tap to loyal customer.',
    overview: [
      'Mobile products live or die on the first few screens. We define the core journey, then build and test it on real devices before expanding the feature set.',
      'Release management, analytics, and store submission are handled as part of the engagement, so shipping updates stays routine.',
    ],
    features: [
      { title: 'Product strategy & UX', description: 'Journeys, wireframes, and prototypes tested before development begins.' },
      { title: 'iOS & Android development', description: 'Native-feeling apps built with performance and battery use in mind.' },
      { title: 'Backend & APIs', description: 'Accounts, sync, and notifications supported by a dependable service layer.' },
      { title: 'App store release', description: 'Store listings, review requirements, and update pipelines managed end to end.' },
    ],
    image: '/services/mobile-app-preview.png',
    tags: ['iOS & Android', 'Product strategy', 'App store ready'],
  },
  {
    slug: 'wordpress-development',
    name: 'WordPress Development',
    description: 'We create professional, responsive, and user-friendly WordPress websites tailored to your business needs. From website setup and customization to maintenance and updates, we handle everything.',
    overview: [
      'A WordPress site should feel effortless to run. We design and build custom themes around your content and your customers, so every page loads quickly, reads clearly, and looks consistent on any screen.',
      'From first setup to long-term care, we stay involved — handling updates, security, performance, and new features as your business changes.',
    ],
    features: [
      { title: 'Custom theme development', description: 'A bespoke theme shaped around your brand and content model, not a repurposed template.' },
      { title: 'Setup & migration', description: 'Domain, hosting, content migration, and a clean launch with nothing left half-finished.' },
      { title: 'Maintenance & updates', description: 'Core, plugin, and security updates handled on a predictable schedule.' },
      { title: 'Performance & SEO', description: 'Optimised loading, clean markup, and structure search engines can read.' },
    ],
    image: '/services/wordpress-preview.png',
    tags: ['Custom builds', 'Site maintenance', 'Responsive design'],
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    description: 'Make your brand stand out with creative and professional designs. We provide logos, social media graphics, banners, business materials, thumbnails, and other visual content.',
    overview: [
      'Good design is more than decoration. We build a visual system — logo, type, colour, and layout — that stays coherent whether it appears on a business card or a paid campaign.',
      'You get source files, clear usage guidance, and assets sized for the platforms you actually publish on.',
    ],
    features: [
      { title: 'Logo & brand identity', description: 'Wordmarks, logos, and a compact identity kit you can apply consistently.' },
      { title: 'Social media graphics', description: 'Templates and creative sized for every platform you post to.' },
      { title: 'Business & print materials', description: 'Cards, decks, brochures, and banners prepared print-ready.' },
      { title: 'Thumbnails & covers', description: 'Scroll-stopping visuals built for video and editorial thumbnails.' },
    ],
    image: '/services/graphic-design-preview.png',
    tags: ['Logo design', 'Social media graphics', 'Brand materials'],
  },
  {
    slug: 'ads-video-editing',
    name: 'Ads Video Editing',
    description: 'We create engaging promotional videos and advertisements for social media and digital marketing. From short-form videos and reels to business ads and product promotions, we turn your ideas into attractive content.',
    overview: [
      'We turn raw footage and rough ideas into edits that communicate fast. Every cut, caption, and beat is placed to keep viewers watching through to the call to action.',
      'Deliverables arrive formatted for each platform, so your campaigns go live without last-minute resizing.',
    ],
    features: [
      { title: 'Reels & shorts', description: 'Vertical edits paced for social feeds and mobile viewing.' },
      { title: 'Business ads', description: 'Promotional spots that present your offer clearly and quickly.' },
      { title: 'Product promos', description: 'Feature-focused edits that show products in their best light.' },
      { title: 'Platform-ready exports', description: 'Correct aspect ratios, captions, and formats for every channel.' },
    ],
    image: '/services/ads-video-editing-preview.png',
    tags: ['Reels & shorts', 'Business ads', 'Product promos'],
  },
  {
    slug: 'pc-related-issues',
    name: 'PC Related Issues',
    description: 'Get help with everyday computer problems, including Windows errors, software installation, driver issues, system slowdowns, networking problems, and general PC troubleshooting.',
    overview: [
      'Slow startups, error messages, failing drivers, and connection problems cost real working time. We diagnose the actual cause and fix it properly rather than working around the symptom.',
      'Support is available remotely or on-site, for a single machine or an entire team.',
    ],
    features: [
      { title: 'Windows troubleshooting', description: 'Diagnosing crashes, errors, and startup failures down to the root cause.' },
      { title: 'Software & driver fixes', description: 'Installation, updates, and compatibility issues resolved cleanly.' },
      { title: 'Performance tuning', description: 'Clearing bloat and tuning systems so everyday work feels responsive again.' },
      { title: 'Network support', description: 'Wi-Fi, connectivity, and shared-resource problems tracked down and fixed.' },
    ],
    image: '/services/pc-support-preview.png',
    tags: ['Windows troubleshooting', 'Driver & software fixes', 'Network support'],
  },
  {
    slug: 'rdp-services',
    name: 'RDP',
    description: 'We provide RDP setup and configuration to help you securely access remote computers and servers from anywhere. We can assist with connection setup, user access, configuration, and troubleshooting.',
    overview: [
      'Remote access only works when it is both convenient and safe. We configure RDP with the right authentication, permissions, and network settings for how your team actually works.',
      'Whether you need a single machine reachable or a full remote workforce, we set it up and keep it running.',
    ],
    features: [
      { title: 'Secure remote access', description: 'Encrypted connections with strong authentication and sensible access rules.' },
      { title: 'User configuration', description: 'Accounts, permissions, and profiles set up for each person who needs access.' },
      { title: 'Connection setup', description: 'Firewall, port, and network configuration handled end to end.' },
      { title: 'Ongoing troubleshooting', description: 'Support when connections drop, credentials change, or access needs adjusting.' },
    ],
    image: '/services/rdp-preview.png',
    tags: ['Secure remote access', 'User configuration', 'Connection support'],
  },
  {
    slug: 'windows-server-management',
    name: 'Windows Server Management',
    description: 'We provide professional Windows Server management, including server setup, user and permission management, remote access, security configuration, updates, backups, networking, and performance monitoring.',
    overview: [
      'Your servers carry the systems your business depends on. We manage setup, permissions, updates, and monitoring so those systems stay available and predictable.',
      'Security and backups are treated as part of routine operations, not an afterthought — so recovery stays straightforward when it is needed.',
    ],
    features: [
      { title: 'Server setup & roles', description: 'Installation and configuration of roles matched to your workloads.' },
      { title: 'Users & permissions', description: 'Active Directory, groups, and access policies kept accurate and current.' },
      { title: 'Security & backups', description: 'Hardening, patch management, and tested backup routines.' },
      { title: 'Performance monitoring', description: 'Ongoing visibility into health, capacity, and emerging issues.' },
    ],
    image: '/services/windows-server-preview.png',
    tags: ['Server setup', 'Security & backups', 'Performance monitoring'],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
