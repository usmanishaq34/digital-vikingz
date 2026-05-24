import type { Metadata } from 'next';
import './globals.css';
import ClientFixes from './ClientFixes';

export const metadata: Metadata = {
  title: 'Semantic SEO Authority Agency — Digital Vikingz',
  description: 'Digital Vikingz is a semantic SEO authority agency. We architect topical authority, AI search visibility, and pipeline attribution for businesses claiming category ownership.',
  icons: { icon: '/images/icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><ClientFixes />{children}</body>
    </html>
  );
}
