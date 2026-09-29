'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModelProfile, ReelItem } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Play,
  Search,
  ArrowRight,
  X,
  MoreHorizontal,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { InstagramIcon, TikTokIcon } from '@/components/SocialIcons';

interface VideoClientPageProps {
  reels?: ReelItem[];
  profile?: ModelProfile;
}

interface VideoCardData {
  id: string;
  title: string;
  categoryTag: string;
  categoryFilter: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  externalUrl?: string;
  description?: string;
}

export default function VideoClientPage({ reels = [], profile }: VideoClientPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalVideo, setActiveModalVideo] = useState<{
    title: string;
    categoryTag: string;
    videoUrl: string;
    externalUrl?: string;
    description?: string;
  } | null>(null);

  const categories = ['ALL', 'FASHION FILMS', 'CAMPAIGNS', 'BTS', 'BEAUTY', 'REELS'];

  // Exact 6 video cards from the mockup
  const videoCards: VideoCardData[] = [
    {
      id: 'v1',
      title: 'Monsoon Muse',
      categoryTag: 'FASHION FILMS',
      categoryFilter: 'FASHION FILMS',
      duration: '02:18',
      thumbnailUrl: '/uploads/video_thumb_1.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-shoot-39878-large.mp4',
      externalUrl: 'https://www.instagram.com/mumtahinaaa_',
      description: 'A visual celebration of traditional muslin and contemporary elegance during the monsoons.'
    },
    {
      id: 'v2',
      title: 'Radiant You',
      categoryTag: 'BEAUTY CAMPAIGN',
      categoryFilter: 'BEAUTY',
      duration: '01:24',
      thumbnailUrl: '/uploads/video_thumb_2.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-glamorous-woman-in-a-black-dress-fashion-shoot-41484-large.mp4',
      externalUrl: 'https://www.instagram.com/mumtahinaaa_',
      description: 'Golden hour skincare and couture beauty campaign spotlighting natural radiance.'
    },
    {
      id: 'v3',
      title: 'Timeless Elegance',
      categoryTag: 'BRAND CAMPAIGN',
      categoryFilter: 'CAMPAIGNS',
      duration: '01:52',
      thumbnailUrl: '/uploads/video_thumb_3.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-for-the-camera-in-a-studio-39875-large.mp4',
      externalUrl: 'https://www.instagram.com/mumtahinaaa_',
      description: 'Commercial campaign bringing regal South Asian poise into modern high fashion.'
    },
    {
      id: 'v4',
      title: 'BTS – Photoshoot Day',
      categoryTag: 'BEHIND THE SCENES',
      categoryFilter: 'BTS',
      duration: '03:10',
      thumbnailUrl: '/uploads/video_thumb_4.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-shoot-39878-large.mp4',
      externalUrl: 'https://www.tiktok.com/@mumtahinaaa_2',
      description: 'Behind the scenes at a high-fashion editorial set with cameras, lights, and styling.'
    },
    {
      id: 'v5',
      title: 'A Day in My Life',
      categoryTag: 'EDITORIAL MOTION',
      categoryFilter: 'REELS',
      duration: '01:36',
      thumbnailUrl: '/uploads/video_thumb_5.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-smiling-in-a-portrait-42907-large.mp4',
      externalUrl: 'https://www.tiktok.com/@mumtahinaaa_2',
      description: 'An intimate glimpse into backstage fittings, prep, and personal reflections.'
    },
    {
      id: 'v6',
      title: 'Studio Vibes',
      categoryTag: 'STUDIO REELS',
      categoryFilter: 'REELS',
      duration: '01:20',
      thumbnailUrl: '/uploads/video_thumb_6.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-glamorous-woman-in-a-black-dress-fashion-shoot-41484-large.mp4',
      externalUrl: 'https://www.instagram.com/mumtahinaaa_',
      description: 'Dynamic rhythm and high energy editorial poses under dramatic studio spotlighting.'
    },
  ];

  // Featured video data
  const featuredVideo = {
    title: 'A Story Beyond the Frame',
    categoryTag: 'FEATURED VIDEO',
    duration: '03:45',
    thumbnailUrl: '/uploads/video_featured_flowers.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-shoot-39878-large.mp4',
    externalUrl: 'https://www.instagram.com/mumtahinaaa_',
    description: 'A glimpse into my world — where fashion, emotions and creativity come together. This featured video captures my journey, my passion and the stories we create through the lens.'
  };

  // Filter video cards
  const filteredVideos = useMemo(() => {
    return videoCards.filter((card) => {
      const matchesCategory =
        activeCategory === 'ALL' ||
        card.categoryFilter.toLowerCase() === activeCategory.toLowerCase() ||
        card.categoryTag.toLowerCase().includes(activeCategory.toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111113] flex flex-col font-sans selection:bg-[#dfb299]/30 selection:text-[#dfb299]">
      {/* 1. Global Navbar */}
      <Navbar profile={profile} />

      {/* 2. Hero Section (Exact Mockup Match - Dark Obsidian) */}
      <section className="relative min-h-[500px] lg:min-h-[560px] pt-32 pb-16 lg:py-0 flex items-center bg-[#0a0a0c] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 space-y-6 z-10 pt-4 lg:pt-0">
            {/* Tag */}
            <div className="flex items-center space-x-3 text-xs tracking-[0.28em] uppercase text-zinc-400 font-medium">
              <span>VIDEO</span>
              <span className="w-12 h-[1px] bg-white/20 hidden sm:block" />
            </div>

            {/* Main Title */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.06em] text-white uppercase leading-[1.05]">
              MOTION
            </h1>

            {/* Subtext */}
            <p className="max-w-xl text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              Fashion films, brand campaigns, behind the scenes and creative reels from my journey.
            </p>

            {/* Showreel Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveModalVideo({
                  title: 'Mumtahina Jahan — Official Showreel',
                  categoryTag: 'SHOWREEL',
                  videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-shoot-39878-large.mp4',
                  externalUrl: 'https://www.instagram.com/mumtahinaaa_',
                  description: 'A compilation of runway highlights, high-fashion editorials, and commercial campaigns.'
                })}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>WATCH SHOWREEL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Close-Up with Play Button, Badge & Signature */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div
              onClick={() => setActiveModalVideo({
                title: 'Mumtahina Jahan — Stories in Motion',
                categoryTag: 'HERO FILM',
                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-glamorous-woman-in-a-black-dress-fashion-shoot-41484-large.mp4',
                externalUrl: 'https://www.instagram.com/mumtahinaaa_',
                description: 'Fashion films, brand campaigns, behind the scenes and creative reels.'
              })}
              className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
            >
              <Image
                src="/uploads/about_hero_model.jpg"
                alt="Mumtahina Jahan - Motion Hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Top Right Script Badge: Stories in Motion */}
              <div className="absolute top-4 right-4 z-10 text-right">
                <span className="font-signature text-2xl sm:text-3xl text-white/90 block drop-shadow-md select-none -rotate-6">
                  Stories in Motion
                </span>
                <span className="w-12 h-[1px] bg-white/40 block ml-auto mt-1" />
              </div>

              {/* Large Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/90 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#dfb299] group-hover:border-[#dfb299] transition-all duration-300 shadow-2xl">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-[#111113] fill-current ml-1 transition-colors" />
                </div>
              </div>

              {/* Bottom Right Script Signature */}
              <div className="absolute bottom-4 right-4 z-10">
                <span className="font-signature text-3xl sm:text-4xl text-white block drop-shadow-lg select-none">
                  Mumtahina Jahan
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Section 2: Filters & Search Bar */}
      <section className="py-8 sm:py-10 bg-[#ffffff] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#111113] text-white shadow-md'
                      : 'bg-[#f4f4f6] hover:bg-[#e9e9ed] text-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full bg-[#f4f4f6] text-xs text-[#111113] placeholder:text-zinc-400 pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-zinc-300 focus:bg-white focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>
      </section>

      {/* 4. Section 3: 6 Video Cards Grid (3 Columns on Desktop, 2 Columns on Mobile) */}
      <section className="py-12 sm:py-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {filteredVideos.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <p className="text-base">No videos found matching your search.</p>
              <button
                onClick={() => {
                  setActiveCategory('ALL');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#b87c5e] underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="space-y-3 group cursor-pointer"
                  onClick={() => setActiveModalVideo({
                    title: video.title,
                    categoryTag: video.categoryTag,
                    videoUrl: video.videoUrl,
                    externalUrl: video.externalUrl,
                    description: video.description
                  })}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-zinc-900 border border-zinc-200 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                    {/* Centered Circular Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#dfb299] group-hover:text-black group-hover:border-[#dfb299] transition-all duration-300 shadow-lg">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge (Bottom Right) */}
                    <div className="absolute bottom-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-sm bg-black/70 backdrop-blur-sm text-[10px] sm:text-[11px] font-mono tracking-wider text-white">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  {/* Text Details Below Card */}
                  <div className="flex items-start justify-between gap-2 pt-1">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#b87c5e] block">
                        {video.categoryTag}
                      </span>
                      <h3 className="font-serif-luxury text-base sm:text-lg font-medium text-[#111113] group-hover:text-[#b87c5e] transition-colors leading-snug">
                        {video.title}
                      </h3>
                    </div>

                    <button
                      className="text-zinc-400 hover:text-[#111113] transition-colors p-1"
                      aria-label="More options"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (video.externalUrl) window.open(video.externalUrl, '_blank');
                      }}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 5. Section 4: FEATURED VIDEO — A STORY BEYOND THE FRAME (Cream/Off-White #f9f9fb) */}
      <section className="py-16 sm:py-24 bg-[#f9f9fb] border-t border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Large Video Thumbnail with Flowers (Desktop) / Below on Mobile */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div
                onClick={() => setActiveModalVideo({
                  title: featuredVideo.title,
                  categoryTag: featuredVideo.categoryTag,
                  videoUrl: featuredVideo.videoUrl,
                  externalUrl: featuredVideo.externalUrl,
                  description: featuredVideo.description
                })}
                className="group relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-zinc-900 border border-zinc-200 shadow-xl cursor-pointer"
              >
                <Image
                  src={featuredVideo.thumbnailUrl}
                  alt={featuredVideo.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Big Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#dfb299] group-hover:border-[#dfb299] transition-all duration-300 shadow-2xl">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-black fill-current ml-1 transition-colors" />
                  </div>
                </div>

                {/* Duration Badge Bottom Right */}
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-sm bg-black/70 backdrop-blur-sm text-xs font-mono tracking-wider text-white">
                    {featuredVideo.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Narrative & Watch Button */}
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-500 font-semibold">
                <span>FEATURED VIDEO</span>
                <span className="w-12 h-[1px] bg-zinc-300" />
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.04em] text-[#111113] uppercase leading-tight">
                A STORY<br />
                BEYOND THE FRAME
              </h2>

              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-light">
                {featuredVideo.description}
              </p>

              <div>
                <button
                  onClick={() => setActiveModalVideo({
                    title: featuredVideo.title,
                    categoryTag: featuredVideo.categoryTag,
                    videoUrl: featuredVideo.videoUrl,
                    externalUrl: featuredVideo.externalUrl,
                    description: featuredVideo.description
                  })}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-md cursor-pointer"
                >
                  <span>WATCH NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Section 5: CTA Banner (Matching Mockup with Smiling Model Portrait) */}
      <section className="relative w-full bg-[#0c0c0e] text-white overflow-hidden py-16 sm:py-24 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.05em] text-white uppercase leading-[1.1]">
              LET&apos;S CREATE SOMETHING<br className="hidden sm:inline" />
              BEAUTIFUL TOGETHER
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm font-light tracking-wide max-w-md leading-relaxed">
              Available for fashion films, brand campaigns, collaborations and creative projects.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>BOOK MUMTAHINA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Model Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/uploads/portfolio_cta_model.jpg"
                alt="Mumtahina Jahan Smiling"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Interactive Video Modal */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveModalVideo(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveModalVideo(null)}
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl bg-[#111114] border border-white/15 rounded-md overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#dfb299] font-medium block">
                  {activeModalVideo.categoryTag}
                </span>
                <h3 className="font-serif-luxury text-lg sm:text-xl text-white font-medium">
                  {activeModalVideo.title}
                </h3>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black rounded overflow-hidden">
              <video
                src={activeModalVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description & Social links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <p className="text-xs text-zinc-400 font-light max-w-lg">
                {activeModalVideo.description}
              </p>

              {activeModalVideo.externalUrl && (
                <a
                  href={activeModalVideo.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#dfb299] hover:underline shrink-0"
                >
                  <span>Watch on Social</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
