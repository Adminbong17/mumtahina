import { getDbAsync } from '@/lib/db';
import PortfolioClientHome from '@/components/PortfolioClientHome';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getDbAsync();

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
