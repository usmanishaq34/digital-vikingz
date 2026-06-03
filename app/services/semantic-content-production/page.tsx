import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: "Semantic Content Production Service",
  description: "Long-form content production governed by your topical map and Source Term Vector. Koray-aligned briefs, predicate-clean writing, editorial QA, schema deployment.",
  alternates: {
    canonical: '/services/semantic-content-production',
  },
  openGraph: {
    title: "Semantic Content Production Service | Digital Vikingz",
    description: "Long-form content production governed by your topical map and Source Term Vector. Koray-aligned briefs, predicate-clean writing, editorial QA, schema deployment.",
    url: 'https://digitalvikingz.com/services/semantic-content-production',
    type: 'website',
  },
};

export default function Page() {
  return <ClientPage />;
}