import { Metadata } from 'next';
import { getDbAsync } from '@/lib/db';
import ExperienceClientPage from './ExperienceClientPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Experience & Brands | Mumtahina Jahan - Brand Endorsements & Runway',
  description: 'Review brand campaigns with Samsung, OPPO, LUX, NIOR, Aarong, and career milestones of Bangladeshi fashion model Mumtahina Jahan.',
};

export default async function ExperiencePage() {
  const data = await getDbAsync();

  return (
    <ExperienceClientPage
      brands={data.brands}
      press={data.press}
      profile={data.profile}
    />
  );
}
