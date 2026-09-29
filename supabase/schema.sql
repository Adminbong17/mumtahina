-- ==============================================================================
-- MUMTAHINA LUXURY FASHION PORTFOLIO - SUPABASE DATABASE SCHEMA & SEED DATA
-- Run this complete script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Enable pgcrypto extension for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CREATE TABLES

-- Profiles Table (Singleton row for Mumtahina Jahan Aria)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY DEFAULT 'mumtahina',
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  headline TEXT NOT NULL,
  location TEXT NOT NULL,
  agency TEXT NOT NULL,
  bio JSONB NOT NULL DEFAULT '[]'::jsonb,
  measurements JSONB NOT NULL DEFAULT '{}'::jsonb,
  comp_card_images JSONB NOT NULL DEFAULT '{}'::jsonb,
  contact JSONB NOT NULL DEFAULT '{}'::jsonb,
  socials JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Lookbook Table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('bridal', 'editorial', 'commercial', 'runway', 'beauty')),
  image_url TEXT NOT NULL,
  aspect_ratio TEXT DEFAULT 'tall',
  featured BOOLEAN DEFAULT false,
  photographer TEXT,
  client TEXT,
  year TEXT,
  location TEXT,
  description TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trending Reels Table
CREATE TABLE IF NOT EXISTS public.reels (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  external_url TEXT NOT NULL,
  views TEXT NOT NULL,
  likes TEXT NOT NULL,
  audio_title TEXT NOT NULL,
  caption TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brands Partnered Table
CREATE TABLE IF NOT EXISTS public.brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  logo_text TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Press Features Table
CREATE TABLE IF NOT EXISTS public.press (
  id TEXT PRIMARY KEY,
  publication TEXT NOT NULL,
  headline TEXT NOT NULL,
  date TEXT NOT NULL,
  quote TEXT NOT NULL,
  article_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Booking Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY DEFAULT ('inq-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  brand_or_agency TEXT NOT NULL,
  project_type TEXT NOT NULL,
  shoot_date TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'booked', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Settings Table
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.press ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES

-- Public Read Policies
DROP POLICY IF EXISTS "Public can view profile" ON public.profiles;
CREATE POLICY "Public can view profile" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view portfolio" ON public.portfolio;
CREATE POLICY "Public can view portfolio" ON public.portfolio FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view reels" ON public.reels;
CREATE POLICY "Public can view reels" ON public.reels FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view brands" ON public.brands;
CREATE POLICY "Public can view brands" ON public.brands FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view press" ON public.press;
CREATE POLICY "Public can view press" ON public.press FOR SELECT USING (true);

-- Inquiries: Public can insert new inquiries, read/update/delete for authenticated / service role
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select inquiries" ON public.inquiries;
CREATE POLICY "Allow select inquiries" ON public.inquiries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow update inquiries" ON public.inquiries;
CREATE POLICY "Allow update inquiries" ON public.inquiries FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete inquiries" ON public.inquiries;
CREATE POLICY "Allow delete inquiries" ON public.inquiries FOR DELETE USING (true);

-- Allow full management for profile, portfolio, reels, brands, press with anon/service key
DROP POLICY IF EXISTS "Allow manage profile" ON public.profiles;
CREATE POLICY "Allow manage profile" ON public.profiles FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow manage portfolio" ON public.portfolio;
CREATE POLICY "Allow manage portfolio" ON public.portfolio FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow manage reels" ON public.reels;
CREATE POLICY "Allow manage reels" ON public.reels FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow manage brands" ON public.brands;
CREATE POLICY "Allow manage brands" ON public.brands FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow manage press" ON public.press;
CREATE POLICY "Allow manage press" ON public.press FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow manage admin_settings" ON public.admin_settings;
CREATE POLICY "Allow manage admin_settings" ON public.admin_settings FOR ALL USING (true);

-- 5. STORAGE BUCKET FOR PORTFOLIO UPLOADS (OPTIONAL)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public can view portfolio bucket" ON storage.objects;
CREATE POLICY "Public can view portfolio bucket" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Anyone can upload to portfolio bucket" ON storage.objects;
CREATE POLICY "Anyone can upload to portfolio bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');

-- ==============================================================================
-- 6. POPULATE INITIAL DATA (UPSERT)
-- ==============================================================================


INSERT INTO public.profiles (id, name, subtitle, headline, location, agency, bio, measurements, comp_card_images, contact, socials)
VALUES (
  'mumtahina',
  'Mumtahina Jahan',
  'Fashion Model & Digital Creator · 700K+ Community',
  'Imagine, Believe, Achieve — Defining modern Bangladeshi elegance and contemporary couture.',
  'Dhaka, Bangladesh · Available Worldwide',
  'Represented by Mumtahina Management & Select Agencies',
  '["Mumtahina Jahan Aria (widely celebrated across South Asia as @mumtahinaaa_) is a premier Bangladeshi fashion model, digital creator, and lifestyle brand ambassador based in Dhaka. With an engaged digital community exceeding 700,000+ followers on Instagram and millions of impressions across social platforms, she stands as one of the most recognizable and magnetic young icons in contemporary Bengal fashion.", "With an academic foundation from American International University-Bangladesh (AIUB) following her schooling at Cantonment Girls'' Public School & College, Mumtahina seamlessly unites intellect, poise, and high-fashion versatility. Her lookbook spans majestic Dhakai Jamdani and vintage bridal sarees to minimalist modern prêt-à-porter and runway couture.", "Fronting major brand campaigns for premier lifestyle labels, haute couturiers, and beauty brands across Bangladesh, Mumtahina continues to inspire her audience with her signature personal mantra: ''Imagine, Believe, Achieve''."]'::jsonb,
  '{"height": "5''7\" (170 cm)", "bust": "33\" (84 cm)", "waist": "24.5\" (62 cm)", "hips": "35.5\" (90 cm)", "shoes": "38 EU / 7.5 US", "dress": "34 EU / 4 US", "eyes": "Deep Espresso", "hair": "Natural Dark Brunette", "skin": "Warm Golden Honey"}'::jsonb,
  '{"headshot": "/uploads/mumtahina_shoot_3.jpg", "profile": "/uploads/mumtahina_shoot_2.jpg", "fullBody": "/uploads/mumtahina_shoot_1.jpg", "fashion": "/uploads/mumtahina_shoot_4.jpg"}'::jsonb,
  '{"email": "bookings.mumtahina@gmail.com", "phone": "+880 1712-894021", "bookingWhatsApp": "+8801712894021", "agencyRep": "Mumtahina Management (Dhaka Bookings)", "address": "Dhaka, Bangladesh"}'::jsonb,
  '{"instagram": "https://www.instagram.com/mumtahinaaa_", "facebook": "https://www.facebook.com/mumtahina.jahan19", "tiktok": "https://www.tiktok.com/@mumtahinaaa_2", "whatsapp": "https://wa.me/8801712894021"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  headline = EXCLUDED.headline,
  location = EXCLUDED.location,
  agency = EXCLUDED.agency,
  bio = EXCLUDED.bio,
  measurements = EXCLUDED.measurements,
  comp_card_images = EXCLUDED.comp_card_images,
  contact = EXCLUDED.contact,
  socials = EXCLUDED.socials,
  updated_at = NOW();


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p1',
  'Royal Crimson Jamdani',
  'bridal',
  '/uploads/mumtahina_shoot_1.jpg',
  'tall',
  true,
  'Rafiqul Islam Studio',
  'Aarong Heritage Bridal',
  '2026',
  'Panam City, Sonargaon',
  'Handwoven golden Zari Jamdani bridal ensemble capturing timeless Bengali royal aesthetics.',
  '["Bridal", "Jamdani", "Heritage", "Saree"]'::jsonb,
  '2026-03-01T10:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p2',
  'Nocturne Velvet Couture',
  'editorial',
  '/uploads/mumtahina_shoot_2.jpg',
  'tall',
  true,
  'Elena Vance (Milan)',
  'Canvas Fashion Magazine',
  '2026',
  'Dhaka Art Summit',
  'Monochrome architectural silhouette editorial exploring avant-garde drapery.',
  '["Editorial", "High Fashion", "Black & White"]'::jsonb,
  '2026-02-15T11:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p3',
  'Golden Hour Prêt',
  'commercial',
  '/uploads/mumtahina_shoot_3.jpg',
  'tall',
  true,
  'Kazi Tahsin',
  'Taaga Festive Collection',
  '2025',
  'Cox''s Bazar Coast',
  'Spring/Summer contemporary ready-to-wear campaign celebrating lightweight natural Bengal fabrics.',
  '["Commercial", "Taaga", "Ready to Wear"]'::jsonb,
  '2025-11-20T09:30:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p4',
  'Dhaka Fashion Week Runway',
  'runway',
  '/uploads/mumtahina_shoot_4.jpg',
  'tall',
  true,
  'Fashion Guild Live',
  'Dhaka Fashion Week Gala',
  '2025',
  'InterContinental Dhaka',
  'Grand Finale showstopper walking for renowned couturier Bibi Russell.',
  '["Runway", "Catwalk", "Dhaka Fashion Week"]'::jsonb,
  '2025-10-14T18:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p5',
  'Rose Quartz & Dew Beauty',
  'beauty',
  '/uploads/mumtahina_shoot_5.jpg',
  'square',
  true,
  'Mahir Zaman',
  'L''Oréal Paris South Asia',
  '2026',
  'Gulshan Lake Pavilion',
  'Natural dewy skin and defined Bengali eye portrait highlighting warm undertones.',
  '["Beauty", "Close-up", "Cosmetics"]'::jsonb,
  '2026-01-10T12:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p6',
  'Ivory Silk Muslin',
  'bridal',
  '/uploads/mumtahina_shoot_6.jpg',
  'tall',
  false,
  'Dream Weaver Stories',
  'Zardosi Couture',
  '2025',
  'Ahsan Manzil, Old Dhaka',
  'Emerald green vintage weave with antique gold nakshi ornaments.',
  '["Bridal", "Benarasi", "Old Dhaka", "Jewelry"]'::jsonb,
  '2025-09-05T14:15:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p7',
  'Cyberpunk Dhaka Streetwear',
  'editorial',
  '/uploads/mumtahina_shoot_7.jpg',
  'tall',
  false,
  'Sarah Jenkins',
  'ICE Today Magazine',
  '2025',
  'Bengal Shilpalay',
  'Structured oversized blazers paired with raw handloom silk trousers.',
  '["Editorial", "Menswear Inspired", "Contemporary"]'::jsonb,
  '2025-08-12T10:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p8',
  'Aura of Saffron & Gold',
  'commercial',
  '/uploads/mumtahina_shoot_9.jpg',
  'tall',
  false,
  'Nayeem Ahmed',
  'Yellow BD Campaign',
  '2025',
  'Hatirjheel Promenade',
  'Winter outerwear and urban street fashion campaign for leading youth brand.',
  '["Commercial", "Streetwear", "Yellow BD"]'::jsonb,
  '2025-12-01T15:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p9',
  'Luminescent Glow Portrait',
  'beauty',
  '/uploads/mumtahina_shoot_10.jpg',
  'tall',
  false,
  'Studio Bengal',
  'Chondon Dhaka',
  '2026',
  'Sylhet Tea Gardens',
  'Ethereal pastel organza and hand-embroidered pearls in natural daylight.',
  '["Bridal", "Pastel", "Organza"]'::jsonb,
  '2026-02-28T09:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.portfolio (id, title, category, image_url, aspect_ratio, featured, photographer, client, year, location, description, tags, created_at)
VALUES (
  'p10',
  'Vogue South Asia Feature',
  'editorial',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
  'tall',
  true,
  'Arjun Verma',
  'Vogue South Asia Voices',
  '2026',
  'Padma River Sandbars',
  'A celebration of modern Bengal identity, featuring riverine natural backdrops.',
  '["Editorial", "Vogue", "Cover Story"]'::jsonb,
  '2026-03-10T16:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  aspect_ratio = EXCLUDED.aspect_ratio,
  featured = EXCLUDED.featured,
  photographer = EXCLUDED.photographer,
  client = EXCLUDED.client,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;


INSERT INTO public.reels (id, title, thumbnail_url, video_url, platform, external_url, views, likes, audio_title, caption)
VALUES (
  'r1',
  'Royal Crimson Jamdani Transition',
  '/uploads/mumtahina_shoot_1.jpg',
  '',
  'instagram',
  'https://www.instagram.com/mumtahinaaa_',
  '1.4M',
  '118K',
  'Bengali Classical Sitar & Lo-Fi Beat',
  'Nothing quite matches the royal elegance of handwoven Dhakai Jamdani ✨ #sareelove #mumtahina #dhakafashion #jamdani'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  video_url = EXCLUDED.video_url,
  platform = EXCLUDED.platform,
  external_url = EXCLUDED.external_url,
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  audio_title = EXCLUDED.audio_title,
  caption = EXCLUDED.caption;


INSERT INTO public.reels (id, title, thumbnail_url, video_url, platform, external_url, views, likes, audio_title, caption)
VALUES (
  'r2',
  'Golden Hour Glow & Sunkissed Vibes',
  '/uploads/mumtahina_shoot_2.jpg',
  '',
  'tiktok',
  'https://www.tiktok.com/@mumtahinaaa_2',
  '950K',
  '87K',
  'Acoustic Warm Sunset Sound',
  'Gulshan lake breezes and soft golden hour light 🌅 #goldenhour #lifestyle #mumtahina #dhakalife'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  video_url = EXCLUDED.video_url,
  platform = EXCLUDED.platform,
  external_url = EXCLUDED.external_url,
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  audio_title = EXCLUDED.audio_title,
  caption = EXCLUDED.caption;


INSERT INTO public.reels (id, title, thumbnail_url, video_url, platform, external_url, views, likes, audio_title, caption)
VALUES (
  'r3',
  'Festive Silk & Antique Gold Jewellery',
  '/uploads/mumtahina_shoot_3.jpg',
  '',
  'instagram',
  'https://www.instagram.com/mumtahinaaa_',
  '2.3M',
  '210K',
  'Dhaka Nights Aesthetic Beat',
  'When tradition meets timeless elegance ✨ Wedding guest & festive season look #bengalbeauty #reelsindia #festiveoutfit'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  video_url = EXCLUDED.video_url,
  platform = EXCLUDED.platform,
  external_url = EXCLUDED.external_url,
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  audio_title = EXCLUDED.audio_title,
  caption = EXCLUDED.caption;


INSERT INTO public.reels (id, title, thumbnail_url, video_url, platform, external_url, views, likes, audio_title, caption)
VALUES (
  'r4',
  'Minimalist Black Trench & Streetwalk',
  '/uploads/mumtahina_shoot_4.jpg',
  '',
  'tiktok',
  'https://www.tiktok.com/@mumtahinaaa_2',
  '810K',
  '72K',
  'Vogue Runway Electric Pace',
  'All black everything. City strolls & contemporary fashion 🖤 #fashioninspo #outfitoftheday #mumtahina'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  video_url = EXCLUDED.video_url,
  platform = EXCLUDED.platform,
  external_url = EXCLUDED.external_url,
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  audio_title = EXCLUDED.audio_title,
  caption = EXCLUDED.caption;


INSERT INTO public.reels (id, title, thumbnail_url, video_url, platform, external_url, views, likes, audio_title, caption)
VALUES (
  'r5',
  'Dewy Glass Skin & Soft Wing Glam',
  '/uploads/mumtahina_shoot_5.jpg',
  '',
  'instagram',
  'https://www.instagram.com/mumtahinaaa_',
  '1.9M',
  '165K',
  'Soft Velvet Ambient Melody',
  'Skin-first beauty & glowing party makeup. Collaboration with top Dhaka makeover studio 💄 #makeuptransformation #dewylook'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  video_url = EXCLUDED.video_url,
  platform = EXCLUDED.platform,
  external_url = EXCLUDED.external_url,
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  audio_title = EXCLUDED.audio_title,
  caption = EXCLUDED.caption;


INSERT INTO public.reels (id, title, thumbnail_url, video_url, platform, external_url, views, likes, audio_title, caption)
VALUES (
  'r6',
  'Slow-Motion Catwalk & Fabric Flow',
  '/uploads/mumtahina_shoot_6.jpg',
  '',
  'tiktok',
  'https://www.tiktok.com/@mumtahinaaa_2',
  '1.2M',
  '105K',
  'Runway Bassline Walk',
  'Pace, posture and presence. Catching the drape on the catwalk 👠 #catwalk #runwaywalk #model #dhakafashion'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  video_url = EXCLUDED.video_url,
  platform = EXCLUDED.platform,
  external_url = EXCLUDED.external_url,
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  audio_title = EXCLUDED.audio_title,
  caption = EXCLUDED.caption;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b1',
  'Aarong',
  'Heritage & Jamdani',
  'AARONG',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b2',
  'Taaga',
  'Contemporary Fusion',
  'TAAGA',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b3',
  'Yellow',
  'Streetwear & Lifestyle',
  'YELLOW',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b4',
  'Sailor',
  'Smart Casuals',
  'SAILOR',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b5',
  'Gala Makeover Studio',
  'Bridal & Beauty',
  'GALA MAKEOVER',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b6',
  'Herlan Bangladesh',
  'Skincare & Cosmetics',
  'HERLAN',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b7',
  'Chondon Dhaka',
  'Artisanal Handloom',
  'CHONDON',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.brands (id, name, category, logo_text, logo_url)
VALUES (
  'b8',
  'Apex Footwear',
  'Footwear & Accessories',
  'APEX',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  logo_text = EXCLUDED.logo_text,
  logo_url = EXCLUDED.logo_url;


INSERT INTO public.press (id, publication, headline, date, quote, article_url)
VALUES (
  'pr1',
  'Vogue South Asia',
  'The New Faces Defining Bengal High Fashion',
  'February 2026',
  'Mumtahina commands attention with an authentic grace that bridges ancient Bengal textile history and Milan runway dynamism.',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  publication = EXCLUDED.publication,
  headline = EXCLUDED.headline,
  date = EXCLUDED.date,
  quote = EXCLUDED.quote,
  article_url = EXCLUDED.article_url;


INSERT INTO public.press (id, publication, headline, date, quote, article_url)
VALUES (
  'pr2',
  'The Daily Star Lifestyle',
  'Dhaka Fashion Week: Mumtahina Stuns as Showstopper',
  'November 2025',
  'Her closing walk for the heritage Muslin showcase was arguably the most electrifying moment of the entire season.',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  publication = EXCLUDED.publication,
  headline = EXCLUDED.headline,
  date = EXCLUDED.date,
  quote = EXCLUDED.quote,
  article_url = EXCLUDED.article_url;


INSERT INTO public.press (id, publication, headline, date, quote, article_url)
VALUES (
  'pr3',
  'ICE Today',
  'Couture in the Capital: Model of the Year Profile',
  'August 2025',
  'Poised, focused, and undeniably magnetic in front of the lens.',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  publication = EXCLUDED.publication,
  headline = EXCLUDED.headline,
  date = EXCLUDED.date,
  quote = EXCLUDED.quote,
  article_url = EXCLUDED.article_url;


INSERT INTO public.inquiries (id, name, email, phone, brand_or_agency, project_type, shoot_date, budget, message, status, created_at)
VALUES (
  'inq-1790671931143',
  'Nadia Islam',
  'nadia@dhakafashion.com',
  '+880 1819-998877',
  'Dhaka Fashion Week Committee',
  'Runway / Fashion Week',
  '2026-11-20',
  'BDT 400,000',
  'Inviting Mumtahina as our primary runway showstopper for the Grand Gala.',
  'new',
  '2026-09-29T08:52:11.143Z'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.inquiries (id, name, email, phone, brand_or_agency, project_type, shoot_date, budget, message, status, created_at)
VALUES (
  'inq-101',
  'Sabrina Rahman',
  'sabrina@aarong.com',
  '+880 1711-223344',
  'Aarong Heritage',
  'Campaign / Commercial',
  '2026-10-15',
  'BDT 350,000',
  'We would love to book Mumtahina for our upcoming Winter Festive 2026 Jamdani campaign shoot in Sylhet.',
  'new',
  '2026-09-28T14:10:00Z'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.inquiries (id, name, email, phone, brand_or_agency, project_type, shoot_date, budget, message, status, created_at)
VALUES (
  'inq-102',
  'Marcus Thorne',
  'casting@lakmefw.com',
  '+91 98200 11223',
  'Lakme Fashion Week South Asia',
  'Runway',
  '2026-11-04',
  'USD $4,500 + Travel',
  'Invitation to walk as guest showstopper for South Asian Sustainable Design showcase in Mumbai.',
  'reviewed',
  '2026-09-25T08:30:00Z'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.admin_settings (key, value)
VALUES ('admin_credentials', '{"username": "admin", "passwordHash": "mumtahina2026", "lastLogin": "2026-09-29T10:25:19.143Z"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
