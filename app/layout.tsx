import type { Metadata } from 'next';
import './globals.css';
import { ScrollToTop } from '@/components/scroll-to-top';

export const metadata: Metadata = {
  title: 'Cinqode — Digital Product Engineering',
  description: 'Cinqode builds scalable digital products, web platforms, and business systems.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
