import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cinqode — Digital Product Engineering',
  description: 'Cinqode builds scalable digital products, web platforms, and business systems.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
