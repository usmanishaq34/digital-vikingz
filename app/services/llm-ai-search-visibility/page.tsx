import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: "LLM and AI Search Visibility Service",
  description: "Get cited by ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews. Entity-first optimization engineered at the structural layer, not bolted on after publishing.",
  alternates: {
    canonical: '/services/llm-ai-search-visibility',
  },
  openGraph: {
    title: "LLM and AI Search Visibility Service | Digital Vikingz",
    description: "Get cited by ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews. Entity-first optimization engineered at the structural layer, not bolted on after publishing.",
    url: 'https://digitalvikingz.com/services/llm-ai-search-visibility',
    type: 'website',
  },
};

export default function Page() {
  return <ClientPage />;
}