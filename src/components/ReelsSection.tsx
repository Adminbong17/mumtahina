'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Sparkles, Heart, Eye, Music2, ExternalLink, X, Film } from 'lucide-react';
import { ReelItem } from '@/lib/types';

interface ReelsSectionProps {
  reels: ReelItem[];
}

export default function ReelsSection({ reels }: ReelsSectionProps) {
  const [activePlatform, setActivePlatform] = useState<'all' | 'instagram' | 'tiktok'>('all');
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  const filteredReels = activePlatform === 'all'
    ? reels
    : reels.filter(r => r.platform === activePlatform);

  return (
    <section id="reels" className="py-24 bg-[#09090b] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            <Film className="w-3.5 h-3.5" />
            <span>Short-Form Video & Motions</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide uppercase">
            Viral Reels & Runway Videos
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            Catwalk motion, bridal saree transitions, beauty transformations, and everyday aesthetic moments from @mumtahinaaa_.
          </p>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActivePlatform('all')}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
              activePlatform === 'all'
                ? 'bg-amber-400 text-black font-semibold shadow-lg shadow-amber-500/20'
                : 'bg-[#141418] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            All Videos ({reels.length})
          </button>

          <button
            onClick={() => setActivePlatform('instagram')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
              activePlatform === 'instagram'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg'
                : 'bg-[#141418] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <span>Instagram Reels</span>
          </button>

          <button
            onClick={() => setActivePlatform('tiktok')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
              activePlatform === 'tiktok'
                ? 'bg-zinc-100 text-black font-semibold shadow-lg'
                : 'bg-[#141418] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <span>TikTok (@mumtahinaaa_2)</span>
          </button>
        </div>

        {/* Reels 9:16 Vertical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-white/10 cursor-pointer shadow-xl hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Background Thumbnail Image */}
              <Image
                src={reel.thumbnailUrl}
                alt={reel.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center filter brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Bar: Platform Badge & Views */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    reel.platform === 'instagram'
                      ? 'bg-pink-600/80 text-white backdrop-blur-md'
                      : 'bg-black/80 text-zinc-200 border border-white/20 backdrop-blur-md'
                  }`}
                >
                  {reel.platform === 'instagram' ? 'Reels' : 'TikTok'}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 text-xs font-mono">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>{reel.views}</span>
                </div>
              </div>

              {/* Center Play Button on hover */}
              <div className="relative z-10 mx-auto my-auto opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400">
                  <Play className="w-6 h-6 ml-1 fill-currentColor" />
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="relative z-10 p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
                  <Music2 className="w-3.5 h-3.5 animate-pulse text-amber-400 shrink-0" />
                  <span className="line-clamp-1">{reel.audioTitle}</span>
                </div>

                <h3 className="font-serif-luxury text-lg text-white font-medium line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {reel.title}
                </h3>

                <p className="text-zinc-300 text-xs line-clamp-2 font-light leading-relaxed">
                  {reel.caption}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {reel.likes}
                  </span>

                  <span className="text-amber-400 flex items-center gap-1 font-mono text-[11px]">
                    Play Video <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REEL PREVIEW MODAL */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveReel(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveReel(null)}
            className="absolute top-6 right-6 z-50 p-3 text-zinc-400 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-md w-full bg-[#121216] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 9:16 Video Frame */}
            <div className="relative aspect-[9/16] w-full bg-black overflow-hidden">
              <Image
                src={activeReel.thumbnailUrl}
                alt={activeReel.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

              {/* Reel Info Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-bold uppercase tracking-wider text-[10px]">
                  {activeReel.platform}
                </span>

                <div className="flex items-center gap-3 text-white font-mono text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-amber-400" /> {activeReel.views}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {activeReel.likes}</span>
                </div>
              </div>

              {/* Bottom Caption & Music in Reel */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2 text-white">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
                  <Music2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeReel.audioTitle}</span>
                </div>
                <h4 className="font-serif-luxury text-xl font-medium">{activeReel.title}</h4>
                <p className="text-xs text-zinc-200 line-clamp-3 font-light leading-relaxed">
                  {activeReel.caption}
                </p>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 bg-[#181820] border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-400 font-mono">
                {activeReel.platform === 'instagram' ? '@mumtahinaaa_' : '@mumtahinaaa_2'}
              </span>

              <a
                href={activeReel.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-colors shadow-lg"
              >
                <span>Open on {activeReel.platform === 'instagram' ? 'Instagram' : 'TikTok'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
