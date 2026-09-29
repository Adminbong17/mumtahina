import { Metadata } from 'next';
import { getDbAsync } from '@/lib/db';
import ContactClientPage from './ContactClientPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact & Booking | Mumtahina Jahan - Inquiries & Representation',
  description: 'Book Bangladeshi fashion model Mumtahina Jahan for campaigns, photoshoots, runway appearances, and editorial work.',
};

export default async function ContactPage() {
  const data = await getDbAsync();

  return <ContactClientPage profile={data.profile} />;
}
