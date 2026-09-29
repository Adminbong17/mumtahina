import { getDb } from '@/lib/db';
import PortfolioClientHome from '@/components/PortfolioClientHome';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const data = getDb();

  return (
    <PortfolioClientHome
      initialProfile={data.profile}
      initialPortfolio={data.portfolio}
      initialReels={data.reels || []}
      initialBrands={data.brands}
      initialPress={data.press}
    />
  );
}
