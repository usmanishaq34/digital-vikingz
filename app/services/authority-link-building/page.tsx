import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: "Authority Link Building Service",
  description: "Entity-reinforcing link acquisition. Topical-relevance scoring, anchor governance, link velocity calibration. Every link selected to strengthen your Central Entity, not chase DR.",
  alternates: {
    canonical: '/services/authority-link-building',
  },
  openGraph: {
    title: "Authority Link Building Service | Digital Vikingz",
    description: "Entity-reinforcing link acquisition. Topical-relevance scoring, anchor governance, link velocity calibration. Every link selected to strengthen your Central Entity, not chase DR.",
    url: 'https://digitalvikingz.com/services/authority-link-building',
    type: 'website',
  },
};

export default function Page() {
  return <ClientPage />;
}