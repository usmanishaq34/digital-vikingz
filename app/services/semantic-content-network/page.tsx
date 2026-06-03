import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: "Semantic Content Network Service",
  description: "External authority distribution through guest publications, syndicated content, and third-party citations across topically aligned domains. Brand entity reinforcement at scale.",
  alternates: {
    canonical: '/services/semantic-content-network',
  },
  openGraph: {
    title: "Semantic Content Network Service | Digital Vikingz",
    description: "External authority distribution through guest publications, syndicated content, and third-party citations across topically aligned domains. Brand entity reinforcement at scale.",
    url: 'https://digitalvikingz.com/services/semantic-content-network',
    type: 'website',
  },
};

export default function Page() {
  return <ClientPage />;
}