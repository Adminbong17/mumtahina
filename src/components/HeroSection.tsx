'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDown, Sparkles, ChevronRight, Award } from 'lucide-react';
import { ModelProfile, PortfolioItem } from '@/lib/types';

interface HeroSectionProps {
  profile: ModelProfile;
  portfolio: PortfolioItem[];
  onOpenCompCard: () => void;
}

export default function HeroSection({ profile, portfolio, onOpenCompCard }: HeroSectionProps) {
  // Rotate through top featured shots
  const featuredShots = portfolio.filter(p => p.featured).slice(0, 4);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (featuredShots.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredShots.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredShots.length]);

  const currentPhoto = featuredShots[activeSlide] || portfolio[0];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#09090b] pt-28 pb-12">
      {/* Background Image Slide with overlay */}
      <div className="absolute inset-0 z-0">
        {currentPhoto && (
          <div className="relative w-full h-full transition-opacity duration-1000 ease-in-out">
            <Image
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top filter brightness-[0.72] contrast-[1.08] scale-[1.02] transition-transform duration-[10000ms] ease-out"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-black/60" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#09090b]/30 to-[#09090b]" />
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>@mumtahinaaa_ · 700K+ Community · Dhaka, Bangladesh</span>
          </div>

          {/* Main Title */}
          <div className="space-y-1">
            <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light tracking-[0.08em] leading-none uppercase drop-shadow-xl">
              {profile.name}
            </h1>
            <p className="text-amber-200/90 text-sm md:text-lg font-light tracking-[0.3em] uppercase pl-1">
              {profile.subtitle}
            </p>
          </div>

          {/* Headline quote */}
          <p className="text-zinc-300 text-sm md:text-base max-w-xl font-light leading-relaxed tracking-wide pt-2 border-l-2 border-amber-400/50 pl-4 bg-black/20 backdrop-blur-xs py-1 rounded-r">
            &ldquo;{profile.headline}&rdquo;
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              className="px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-[0.25em] rounded-full hover:bg-amber-300 transition-all duration-300 shadow-xl hover:shadow-amber-500/20 flex items-center gap-2 group"
            >
              <span>Explore Portfolio</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenCompCard}
              className="px-6 py-3.5 bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/40 font-medium text-xs uppercase tracking-[0.25em] rounded-full hover:bg-amber-500/10 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official Comp Card</span>
            </button>

            <a
              href="#contact"
              className="px-6 py-3.5 text-zinc-300 hover:text-white text-xs uppercase tracking-[0.25em] transition-colors"
            >
              Direct Booking
            </a>
          </div>

          {/* Slide Indicator bullets */}
          {featuredShots.length > 1 && (
            <div className="flex items-center gap-2 pt-6">
              {featuredShots.map((shot, idx) => (
                <button
                  key={shot.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    idx === activeSlide
                      ? 'w-8 bg-amber-400'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] text-zinc-400 tracking-widest pl-2">
                0{activeSlide + 1} / 0{featuredShots.length} · {currentPhoto.title}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Model Stats Ticker Bar (Bottom of Hero) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-8">
        <div className="bg-[#121216]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="pt-2 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">Height</span>
            <span className="text-sm md:text-base font-serif-luxury font-medium text-white tracking-wider">
              {profile.measurements.height}
            </span>
          </div>

          <div className="pt-2 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">Bust / Waist / Hips</span>
            <span className="text-sm md:text-base font-serif-luxury font-medium text-white tracking-wider">
              {profile.measurements.bust.replace(/"/g, '')} - {profile.measurements.waist.replace(/"/g, '')} - {profile.measurements.hips.replace(/"/g, '')}
            </span>
          </div>

          <div className="pt-2 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">Eyes</span>
            <span className="text-sm md:text-base font-serif-luxury font-medium text-white tracking-wider">
              {profile.measurements.eyes}
            </span>
          </div>

          <div className="pt-2 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">Hair</span>
            <span className="text-sm md:text-base font-serif-luxury font-medium text-white tracking-wider">
              {profile.measurements.hair}
            </span>
          </div>

          <div className="pt-2 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">Shoes</span>
            <span className="text-sm md:text-base font-serif-luxury font-medium text-white tracking-wider">
              {profile.measurements.shoes}
            </span>
          </div>

          <div className="pt-2 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">Location</span>
            <span className="text-sm md:text-base font-serif-luxury font-medium text-amber-300 tracking-wider">
              Dhaka, BD
            </span>
          </div>
        </div>

        <div className="text-center pt-6">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-xs uppercase tracking-[0.3em] transition-colors"
          >
            <span>Scroll Down</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
