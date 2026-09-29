import fs from 'fs';
import path from 'path';
import { SiteData, ModelProfile, PortfolioItem, ReelItem, BrandPartner, PressFeature, BookingInquiry } from './types';
import { initialSiteData } from '@/data/initialData';
import { getSupabaseAdmin, isSupabaseConfigured } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Synchronous local file fallback
export function getDb(): SiteData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSiteData, null, 2), 'utf-8');
      return initialSiteData;
    }

    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return parsed as SiteData;
  } catch (error) {
    console.error("Error reading database file, returning initial data:", error);
    return initialSiteData;
  }
}

// Synchronous local file saver
export function saveDb(data: SiteData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving to local database file:", error);
    return false;
  }
}

export function resetDbToDefault(): SiteData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSiteData, null, 2), 'utf-8');
    return initialSiteData;
  } catch (error) {
    console.error("Error resetting database:", error);
    return initialSiteData;
  }
}

// ============================================================================
// SUPABASE CLOUD DATABASE ADAPTER WITH HYBRID FALLBACK
// ============================================================================

export async function getDbAsync(): Promise<SiteData> {
  const localDb = getDb();
  if (!isSupabaseConfigured()) {
    return localDb;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return localDb;

  try {
    // 1. Fetch Profile
    const { data: profileRow, error: pErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', 'mumtahina')
      .single();

    // 2. Fetch Portfolio
    const { data: portfolioRows, error: portErr } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    // 3. Fetch Reels
    const { data: reelsRows, error: rErr } = await supabase
      .from('reels')
      .select('*')
      .order('created_at', { ascending: false });

    // 4. Fetch Brands
    const { data: brandsRows } = await supabase
      .from('brands')
      .select('*');

    // 5. Fetch Press
    const { data: pressRows } = await supabase
      .from('press')
      .select('*');

    // 6. Fetch Inquiries
    const { data: inquiriesRows } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    // 7. Fetch Admin credentials
    const { data: adminRow } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'admin_credentials')
      .single();

    if (pErr && portErr && rErr) {
      console.warn("Supabase tables not initialized yet, using local database fallback.");
      return localDb;
    }

    const profile: ModelProfile = profileRow ? {
      name: profileRow.name,
      subtitle: profileRow.subtitle,
      headline: profileRow.headline,
      location: profileRow.location,
      agency: profileRow.agency,
      bio: Array.isArray(profileRow.bio) ? profileRow.bio : localDb.profile.bio,
      measurements: profileRow.measurements || localDb.profile.measurements,
      compCardImages: profileRow.comp_card_images || localDb.profile.compCardImages,
      contact: profileRow.contact || localDb.profile.contact,
      socials: profileRow.socials || localDb.profile.socials,
    } : localDb.profile;

    const portfolio: PortfolioItem[] = (portfolioRows && portfolioRows.length > 0)
      ? portfolioRows.map((r: any) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          imageUrl: r.image_url,
          aspectRatio: r.aspect_ratio || 'tall',
          featured: Boolean(r.featured),
          photographer: r.photographer || '',
          client: r.client || '',
          year: r.year || '',
          location: r.location || '',
          description: r.description || '',
          tags: Array.isArray(r.tags) ? r.tags : [],
          createdAt: r.created_at || new Date().toISOString()
        }))
      : localDb.portfolio;

    const reels: ReelItem[] = (reelsRows && reelsRows.length > 0)
      ? reelsRows.map((r: any) => ({
          id: r.id,
          title: r.title,
          thumbnailUrl: r.thumbnail_url,
          videoUrl: r.video_url || undefined,
          platform: r.platform,
          externalUrl: r.external_url,
          views: r.views,
          likes: r.likes,
          audioTitle: r.audio_title,
          caption: r.caption,
        }))
      : (localDb.reels || []);

    const brands: BrandPartner[] = (brandsRows && brandsRows.length > 0)
      ? brandsRows.map((b: any) => ({
          id: b.id,
          name: b.name,
          category: b.category,
          logoText: b.logo_text,
          logoUrl: b.logo_url || undefined,
        }))
      : localDb.brands;

    const press: PressFeature[] = (pressRows && pressRows.length > 0)
      ? pressRows.map((p: any) => ({
          id: p.id,
          publication: p.publication,
          title: p.title || p.headline || '',
          date: p.date,
          quote: p.quote,
          link: p.article_url || p.link || undefined,
        }))
      : localDb.press;

    const inquiries: BookingInquiry[] = (inquiriesRows && inquiriesRows.length > 0)
      ? inquiriesRows.map((inq: any) => ({
          id: inq.id,
          name: inq.name,
          email: inq.email,
          phone: inq.phone,
          brandOrAgency: inq.brand_or_agency,
          projectType: inq.project_type,
          shootDate: inq.shoot_date || '',
          budget: inq.budget || '',
          message: inq.message,
          status: inq.status,
          createdAt: inq.created_at
        }))
      : (localDb.inquiries || []);

    const admin = adminRow?.value || localDb.admin;

    return {
      profile,
      portfolio,
      reels,
      brands,
      press,
      inquiries,
      admin
    };
  } catch (err) {
    console.error("Error reading from Supabase, falling back to local database:", err);
    return localDb;
  }
}

// Inquiries Mutations
export async function addInquiryAsync(inquiry: BookingInquiry): Promise<boolean> {
  // Always update local fallback
  const db = getDb();
  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(inquiry);
  saveDb(db);

  if (!isSupabaseConfigured()) return true;

  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('inquiries').insert({
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      brand_or_agency: inquiry.brandOrAgency,
      project_type: inquiry.projectType,
      shoot_date: inquiry.shootDate,
      budget: inquiry.budget,
      message: inquiry.message,
      status: inquiry.status,
      created_at: inquiry.createdAt
    });
    if (error) console.error("Error inserting inquiry into Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase insert inquiry exception:", err);
    return false;
  }
}

export async function updateInquiryStatusAsync(id: string, status: BookingInquiry['status']): Promise<boolean> {
  const db = getDb();
  if (db.inquiries) {
    const item = db.inquiries.find(i => i.id === id);
    if (item) item.status = status;
    saveDb(db);
  }

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (error) console.error("Error updating inquiry in Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase update inquiry exception:", err);
    return false;
  }
}

export async function deleteInquiryAsync(id: string): Promise<boolean> {
  const db = getDb();
  if (db.inquiries) {
    db.inquiries = db.inquiries.filter(i => i.id !== id);
    saveDb(db);
  }

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) console.error("Error deleting inquiry from Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase delete inquiry exception:", err);
    return false;
  }
}

// Portfolio Mutations
export async function addPortfolioItemAsync(item: PortfolioItem): Promise<boolean> {
  const db = getDb();
  if (!db.portfolio) db.portfolio = [];
  db.portfolio.unshift(item);
  saveDb(db);

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('portfolio').insert({
      id: item.id,
      title: item.title,
      category: item.category,
      image_url: item.imageUrl,
      aspect_ratio: item.aspectRatio,
      featured: item.featured,
      photographer: item.photographer,
      client: item.client,
      year: item.year,
      location: item.location,
      description: item.description,
      tags: item.tags,
      created_at: item.createdAt
    });
    if (error) console.error("Error inserting portfolio into Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase insert portfolio exception:", err);
    return false;
  }
}

export async function updatePortfolioItemAsync(id: string, updates: Partial<PortfolioItem>): Promise<boolean> {
  const db = getDb();
  const index = db.portfolio.findIndex(p => p.id === id);
  if (index !== -1) {
    db.portfolio[index] = { ...db.portfolio[index], ...updates };
    saveDb(db);
  }

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const payload: any = {};
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl;
    if (updates.aspectRatio !== undefined) payload.aspect_ratio = updates.aspectRatio;
    if (updates.featured !== undefined) payload.featured = updates.featured;
    if (updates.photographer !== undefined) payload.photographer = updates.photographer;
    if (updates.client !== undefined) payload.client = updates.client;
    if (updates.year !== undefined) payload.year = updates.year;
    if (updates.location !== undefined) payload.location = updates.location;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.tags !== undefined) payload.tags = updates.tags;

    const { error } = await supabase.from('portfolio').update(payload).eq('id', id);
    if (error) console.error("Error updating portfolio in Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase update portfolio exception:", err);
    return false;
  }
}

export async function deletePortfolioItemAsync(id: string): Promise<boolean> {
  const db = getDb();
  db.portfolio = db.portfolio.filter(p => p.id !== id);
  saveDb(db);

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('portfolio').delete().eq('id', id);
    if (error) console.error("Error deleting portfolio from Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase delete portfolio exception:", err);
    return false;
  }
}

// Profile Mutations
export async function updateProfileAsync(profile: ModelProfile): Promise<boolean> {
  const db = getDb();
  db.profile = profile;
  saveDb(db);

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('profiles').upsert({
      id: 'mumtahina',
      name: profile.name,
      subtitle: profile.subtitle,
      headline: profile.headline,
      location: profile.location,
      agency: profile.agency,
      bio: profile.bio,
      measurements: profile.measurements,
      comp_card_images: profile.compCardImages,
      contact: profile.contact,
      socials: profile.socials,
      updated_at: new Date().toISOString()
    });
    if (error) console.error("Error updating profile in Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase update profile exception:", err);
    return false;
  }
}

// Reels Mutations
export async function addReelItemAsync(item: ReelItem): Promise<boolean> {
  const db = getDb();
  if (!db.reels) db.reels = [];
  db.reels.unshift(item);
  saveDb(db);

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('reels').insert({
      id: item.id,
      title: item.title,
      thumbnail_url: item.thumbnailUrl,
      video_url: item.videoUrl,
      platform: item.platform,
      external_url: item.externalUrl,
      views: item.views,
      likes: item.likes,
      audio_title: item.audioTitle,
      caption: item.caption,
    });
    if (error) console.error("Error inserting reel in Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase insert reel exception:", err);
    return false;
  }
}

export async function deleteReelItemAsync(id: string): Promise<boolean> {
  const db = getDb();
  if (db.reels) {
    db.reels = db.reels.filter(r => r.id !== id);
    saveDb(db);
  }

  if (!isSupabaseConfigured()) return true;
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('reels').delete().eq('id', id);
    if (error) console.error("Error deleting reel from Supabase:", error);
    return !error;
  } catch (err) {
    console.error("Supabase delete reel exception:", err);
    return false;
  }
}
