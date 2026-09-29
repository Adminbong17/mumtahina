'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ReelItem, ModelProfile } from '@/lib/types';
import Navbar from '@/components/Navbar';
import ReelsSection from '@/components/ReelsSection';
import BannerCtaSection from '@/components/BannerCtaSection';
import Footer from '@/components/Footer';
import { Play, Sparkles, X, ExternalLink, Film } from 'lucide-react';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '@/components/SocialIcons';

interface VideoClientPageProps {
  reels: ReelItem[];
  profile?: ModelProfile;
}

export default function VideoClientPage({ reels, profile }: VideoClientPageProps) {
  const [activeModalVideo, setActiveModalVideo] = useState<{
    title: string;
    videoUrl?: string;
    externalUrl?: string;
    caption?: string;
  } | null>(null);

  const videoClips = [
    {
      id: 'clip-1',
      title: 'Runway Elegance — Dhaka Fashion Gala',
      category: 'Runway',
      platform: 'instagram',
      views: '1.2M',
      likes: '95K',
      thumbnailUrl: '/uploads/mumtahina_hero.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-shoot-39878-large.mp4',
      externalUrl: 'https://www.instagram.com/mumtahinaaa_',
    },
    {
      id: 'clip-2',
      title: 'Heritage Jamdani Motion Campaign',
      category: 'Commercial',
      platform: 'instagram',
      views: '840K',
      likes: '68K',
      thumbnailUrl: '/uploads/mumtahina_portfolio_3.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-smiling-in-a-portrait-42907-large.mp4',
      externalUrl: 'https://www.instagram.com/mumtahinaaa_',
    },
    {
      id: 'clip-3',
      title: 'Luxury Velvet Editorial Behind The Scenes',
      category: 'BTS',
      platform: 'tiktok',
      views: '2.1M',
      likes: '190K',
      thumbnailUrl: '/uploads/mumtahina_portfolio_1.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-for-the-camera-in-a-studio-39875-large.mp4',
      externalUrl: 'https://www.tiktok.com/@mumtahinaaa_2',
    },
    {
      id: 'clip-4',
      title: 'Golden Hour Muslin Series Showreel',
      category: 'Editorial',
      platform: 'instagram',
      views: '650K',
      likes: '52K',
      thumbnailUrl: '/uploads/mumtahina_portfolio_4.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-shoot-39878-large.mp4',
      externalUrl: 'https://www.instagram.com/mumtahinaaa_',
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans selection:bg-[#dfb299]/30 selection:text-[#dfb299]">
      {/* 1. Navbar */}
      <Navbar profile={profile} />

      {/* 2. Editorial Page Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-[#0e0e12] to-[#0a0a0c]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dfb299]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-[11px] tracking-[0.28em] uppercase text-zinc-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#dfb299]">VIDEO</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.06em] text-white uppercase leading-tight">
            MOTION & SHOWREEL
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light tracking-wide leading-relaxed">
            Runway walks, television commercials, brand campaigns, and intimate behind-the-scenes moments in motion.
          </p>
        </div>
      </section>

      {/* 3. Main Featured Behind The Scenes Video Section (From Mockup) */}
      <ReelsSection reels={reels} />

      {/* 4. Additional Motion Clips & Campaign Reels Showcase */}
      <section className="py-20 bg-[#0e0e11] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#dfb299] font-semibold block mb-1">
                CAMPAIGN REELS & SHORTS
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl uppercase tracking-[0.05em] font-normal">
                FEATURED MOTION CLIPS
              </h2>
            </div>
            <div className="flex items-center space-x-4 text-xs tracking-wider text-zinc-400 font-medium">
              <a
                href="https://www.instagram.com/mumtahinaaa_"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 hover:text-[#dfb299] transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@mumtahinaaa_</span>
              </a>
              <span className="text-white/20">•</span>
              <a
                href="https://www.tiktok.com/@mumtahinaaa_2"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 hover:text-[#dfb299] transition-colors"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoClips.map((clip) => (
              <div
                key={clip.id}
                onClick={() => setActiveModalVideo({
                  title: clip.title,
                  videoUrl: clip.videoUrl,
                  externalUrl: clip.externalUrl,
                  caption: `${clip.category} shoot featuring Mumtahina Jahan.`
                })}
                className="group relative bg-[#131317] border border-white/10 rounded-sm overflow-hidden cursor-pointer hover:border-[#dfb299]/50 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[9/16] w-full bg-zinc-900 overflow-hidden">
                  <Image
                    src={clip.thumbnailUrl}
                    alt={clip.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Category Pill Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-[#dfb299] font-medium">
                      {clip.category}
                    </span>
                  </div>

                  {/* Play Button Icon Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#dfb299] group-hover:border-[#dfb299] transition-all duration-300">
                      <Play className="w-5 h-5 text-white group-hover:text-black fill-current ml-0.5 transition-colors" />
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="absolute bottom-3 inset-x-3 z-10 space-y-1">
                    <h3 className="font-serif-luxury text-sm font-medium text-white line-clamp-2 leading-snug group-hover:text-[#dfb299] transition-colors">
                      {clip.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-zinc-300">
                      <span>{clip.views} views</span>
                      <span>❤️ {clip.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#111114] border border-white/20 rounded-lg overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif-luxury text-lg text-white font-medium">
                {activeModalVideo.title}
              </h3>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black rounded overflow-hidden">
              <video
                src={activeModalVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-zinc-400 font-light">
                {activeModalVideo.caption}
              </p>
              {activeModalVideo.externalUrl && (
                <a
                  href={activeModalVideo.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#dfb299] hover:underline"
                >
                  <span>Watch on Social</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Banner CTA */}
      <BannerCtaSection />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
