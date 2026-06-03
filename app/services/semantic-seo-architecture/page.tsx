import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Semantic SEO Architecture Service',
  description:
    "12-month authority blueprint built on Koray Tuğberk Gübür's semantic SEO methodology. Central Entity definition, topical map, Source Term Vector spec, entity infrastructure.",
  alternates: {
    canonical: '/services/semantic-seo-architecture',
  },
  openGraph: {
    title: 'Semantic SEO Architecture Service | Digital Vikingz',
    description:
      "12-month authority blueprint built on Koray Tuğberk Gübür's semantic SEO methodology. Central Entity definition, topical map, Source Term Vector spec, entity infrastructure.",
    url: 'https://digitalvikingz.com/services/semantic-seo-architecture',
    type: 'website',
  },
};

export default function Page() {
  return <ClientPage />;
}
