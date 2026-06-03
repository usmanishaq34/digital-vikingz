import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: "Semantic Content Audit Service",
  description: "Diagnostic audit for entity coverage, predicate consistency, semantic dilution, and AI citation readiness. Fixed-scope, written deliverable for sites validating fit before architecture.",
  alternates: {
    canonical: '/services/semantic-content-audit',
  },
  openGraph: {
    title: "Semantic Content Audit Service | Digital Vikingz",
    description: "Diagnostic audit for entity coverage, predicate consistency, semantic dilution, and AI citation readiness. Fixed-scope, written deliverable for sites validating fit before architecture.",
    url: 'https://digitalvikingz.com/services/semantic-content-audit',
    type: 'website',
  },
};

export default function Page() {
  return <ClientPage />;
}