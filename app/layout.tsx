import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import ClientFixes from './ClientFixes';

export const metadata: Metadata = {
  metadataBase: new URL('https://digitalvikingz.com'),
  alternates: {
    canonical: './',
  },
  title: {
    default: 'Semantic SEO Authority Agency — Digital Vikingz',
    template: '%s | Digital Vikingz',
  },
  description: 'Digital Vikingz is a semantic SEO authority agency. We architect topical authority, AI search visibility, and pipeline attribution for businesses claiming category ownership.',
  verification: {
    google: [
      'EBFJv7MeTbcdwufJHKRH901x0SBxTN2ncAzsLPRjrwI',
      'DnaxiW3hERr_y8er0a1ZFBu9GZcjO1SyPCxS78LlqoE',
    ],
    other: {
      'msvalidate.01': 'F1194E70F93409CEEA3BA42F4DB2A45A',
    },
  },
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
      <body>
        <ClientFixes />
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K12HCG09VL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K12HCG09VL');
          `}
        </Script>
      </body>
    </html>
  );
}