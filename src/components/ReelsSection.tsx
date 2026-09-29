'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ArrowRight, X, ExternalLink, Sparkles } from 'lucide-react';
import { ReelItem } from '@/lib/types';

interface ReelsSectionProps {
  reels: ReelItem[];
}

export default function ReelsSection({ reels }: ReelsSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<ReelItem | null>(null);

  // Main featured BTS video from mockup
  const featuredBts = {
    id: 'bts-main',
    title: 'Behind The Scenes — Luxury Bridal & Editorial',
    subtitle: 'Fashion | Campaigns | Lifestyle',
    thumbnailUrl: '/uploads/mumtahina_video_bts.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-shoot-39878-large.mp4',
    externalUrl: 'https://www.instagram.com/mumtahinaaa_',
  };

  const handleOpenVideo = () => {
    setSelectedVideo({
      id: featuredBts.id,
      title: featuredBts.title,
      thumbnailUrl: featuredBts.thumbnailUrl,
      videoUrl: featuredBts.videoUrl,
      platform: 'instagram',
      externalUrl: featuredBts.externalUrl,
      views: '1.4M',
      likes: '120K',
      audioTitle: 'Editorial Acoustic Beat',
      caption: 'On set with Mumtahina Jahan capturing contemporary couture.',
    });
  };

  return (
    <section id="video" className="py-24 bg-[#0c0c0e] text-white relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#dfb299]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 2-Column Split: Video Thumbnail (Left) & Editorial Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Video Thumbnail with Big Play Button (lg: col-span-7) */}
          <div className="lg:col-span-7">
            <div
              onClick={handleOpenVideo}
              className="group relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-sm overflow-hidden cursor-pointer shadow-2xl border border-white/10 bg-zinc-900"
            >
              <Image
                src={featuredBts.thumbnailUrl}
                alt="Behind The Scenes with Mumtahina Jahan"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark subtle overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

              {/* Large Circular Play Button (Centered as in mockup) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#dfb299] group-hover:border-[#dfb299] transition-all duration-300 shadow-2xl">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-black fill-current ml-1 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Subtitle, and Watch Video Button (lg: col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tag with dash */}
            <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-400 font-semibold">
              <span>VIDEO</span>
              <span className="w-10 h-[1px] bg-white/20" />
            </div>

            {/* Title */}
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.04em] text-white uppercase leading-[1.05]">
              BEHIND<br />THE SCENES
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-400 text-sm sm:text-base font-light tracking-wide">
              {featuredBts.subtitle}
            </p>

            {/* Watch Video Button */}
            <div className="pt-2">
              <button
                onClick={handleOpenVideo}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-lg cursor-pointer"
              >
                <span>WATCH VIDEO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden bg-black shadow-2xl border border-white/10">
              <video
                src={selectedVideo.videoUrl || featuredBts.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full pt-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl text-white font-normal">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-zinc-400">{selectedVideo.caption}</p>
              </div>

              <a
                href={selectedVideo.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#dfb299] hover:underline"
              >
                <span>Open in Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
