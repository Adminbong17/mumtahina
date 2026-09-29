import { Metadata } from 'next';
import { getDbAsync } from '@/lib/db';
import AboutClientPage from './AboutClientPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About | Mumtahina Jahan - Professional Fashion Model',
  description: 'Learn about Mumtahina Jahan Aria, a top Bangladeshi fashion, commercial, and runway model based in Dhaka, Bangladesh.',
};

export default async function AboutPage() {
  const data = await getDbAsync();

  return <AboutClientPage profile={data.profile} />;
}
