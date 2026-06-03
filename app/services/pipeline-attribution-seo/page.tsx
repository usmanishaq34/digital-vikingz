import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: "Pipeline Attribution SEO Service",
  description: "Bottom-funnel content engineering tied to qualified pipeline. Conversion-intent clusters, attribution model setup, SEO-to-revenue reporting for founder-led businesses.",
  alternates: {
    canonical: '/services/pipeline-attribution-seo',
  },
  openGraph: {
    title: "Pipeline Attribution SEO Service | Digital Vikingz",
    description: "Bottom-funnel content engineering tied to qualified pipeline. Conversion-intent clusters, attribution model setup, SEO-to-revenue reporting for founder-led businesses.",
    url: 'https://digitalvikingz.com/services/pipeline-attribution-seo',
    type: 'website',
  },
};

export default function Page() {
  return <ClientPage />;
}