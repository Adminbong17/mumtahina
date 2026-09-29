import { Metadata } from 'next';
import { getDbAsync } from '@/lib/db';
import PortfolioClientPage from './PortfolioClientPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Portfolio | Mumtahina Jahan - Editorial, Fashion & Commercial Archive',
  description: 'Explore the high-fashion and commercial modeling portfolio of Mumtahina Jahan Aria, featuring high couture, beauty, and luxury campaigns.',
};

export default async function PortfolioPage() {
  const data = await getDbAsync();

  return (
    <PortfolioClientPage
      portfolio={data.portfolio}
      profile={data.profile}
    />
  );
}
