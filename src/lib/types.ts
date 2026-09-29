export interface Measurements {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  shoes: string;
  dress: string;
  eyes: string;
  hair: string;
  skin: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
}

export interface ModelProfile {
  name: string;
  subtitle: string;
  headline: string;
  location: string;
  agency: string;
  bio: string[];
  measurements: Measurements;
  compCardImages: {
    headshot: string;
    profile: string;
    fullBody: string;
    fashion: string;
  };
  contact: {
    email: string;
    phone: string;
    bookingWhatsApp: string;
    agencyRep: string;
    address: string;
  };
  socials: SocialLinks;
}

export type Category = 'editorial' | 'bridal' | 'commercial' | 'runway' | 'beauty';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  imageUrl: string;
  aspectRatio?: 'tall' | 'square' | 'wide';
  featured: boolean;
  photographer: string;
  client: string;
  year: string;
  location?: string;
  description?: string;
  tags?: string[];
  createdAt: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  category: string;
  logoText: string;
  featuredCampaign?: string;
}

export interface PressFeature {
  id: string;
  publication: string;
  title: string;
  date: string;
  link?: string;
  quote?: string;
  imageUrl?: string;
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  brandOrAgency: string;
  projectType: string;
  shootDate?: string;
  budget?: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'booked' | 'archived';
  createdAt: string;
}

export interface ReelItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  externalUrl: string;
  views: string;
  likes: string;
  audioTitle: string;
  caption: string;
}

export interface SiteData {
  profile: ModelProfile;
  portfolio: PortfolioItem[];
  reels: ReelItem[];
  brands: BrandPartner[];
  press: PressFeature[];
  inquiries: BookingInquiry[];
  admin: {
    username: string;
    passwordHash: string; // or plain hashed/stored for easy management
    lastLogin?: string;
  };
}
