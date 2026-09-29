import { Metadata } from 'next';
import { getDbAsync } from '@/lib/db';
import VideoClientPage from './VideoClientPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Video & Motion | Mumtahina Jahan - Commercials, Runway & BTS',
  description: 'Watch video commercials, runway catwalks, and behind-the-scenes motion films featuring Bangladeshi model Mumtahina Jahan.',
};

export default async function VideoPage() {
  const data = await getDbAsync();

  return (
    <VideoClientPage
      reels={data.reels || []}
      profile={data.profile}
    />
  );
}
