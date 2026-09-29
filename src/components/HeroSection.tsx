'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ModelProfile, PortfolioItem } from '@/lib/types';
import { InstagramIcon, FacebookIcon, YouTubeIcon, TikTokIcon } from '@/components/SocialIcons';

interface HeroSectionProps {
  profile: ModelProfile;
  portfolio: PortfolioItem[];
  onOpenBooking?: () => void;
}

export default function HeroSection({ profile, portfolio, onOpenBooking }: HeroSectionProps) {
  const heroImage = '/uploads/mumtahina_hero.jpg';

  const handleBookClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between bg-[#0a0a0c] pt-28 pb-8 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#dfb299]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 my-auto">
        {/* Left Column: Typography & CTAs */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6 pt-4 lg:pt-0">
          {/* Eyebrow Category */}
          <p className="text-[11px] md:text-xs tracking-[0.28em] text-zinc-400 font-medium uppercase">
            MODEL &bull; FASHION &bull; COMMERCIAL
          </p>

          {/* Huge Editorial Headline */}
          <div className="space-y-1">
            <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.06em] text-white font-normal leading-[0.95] uppercase">
              MUMTAHINA
            </h1>
            <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.06em] text-white font-normal leading-[0.95] uppercase">
              JAHAN
            </h1>
          </div>

          {/* Description sentence */}
          <p className="text-zinc-300 text-sm md:text-base font-light max-w-md leading-relaxed pt-1">
            A Bangladeshi model passionate about fashion, beauty and visual storytelling.
          </p>

          {/* Two Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-lg shadow-[#dfb299]/10"
            >
              <span>VIEW PORTFOLIO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              onClick={handleBookClick}
              className="px-7 py-3 rounded-full border border-white/30 hover:border-white/70 bg-transparent text-white text-xs font-medium tracking-[0.16em] uppercase transition-all duration-200 hover:bg-white/5 cursor-pointer"
            >
              BOOK ME
            </a>
          </div>

          {/* Mobile-only social icons */}
          <div className="flex lg:hidden items-center space-x-5 text-zinc-400 pt-3">
            <a href="https://www.instagram.com/mumtahinaaa_" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon className="w-4 h-4 hover:text-[#dfb299]" />
            </a>
            <a href="https://www.facebook.com/mumtahina.jahan19" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon className="w-4 h-4 hover:text-[#dfb299]" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <YouTubeIcon className="w-4 h-4 hover:text-[#dfb299]" />
            </a>
            <a href="https://www.tiktok.com/@mumtahinaaa_2" target="_blank" rel="noreferrer" aria-label="TikTok">
              <TikTokIcon className="w-4 h-4 hover:text-[#dfb299]" />
            </a>
          </div>
        </div>

        {/* Right Column: Mumtahina's Portrait (Chin resting in black saree) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-white/5 group">
            <Image
              src={heroImage}
              alt="Mumtahina Jahan"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Ticker & Scroll Indicator Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-10 border-t border-white/10 flex items-center justify-between text-zinc-400 text-[10px] md:text-xs tracking-[0.24em] uppercase">
        {/* Category list */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium text-zinc-400">
          <span>FASHION</span>
          <span className="text-zinc-600">|</span>
          <span>BEAUTY</span>
          <span className="text-zinc-600">|</span>
          <span>LIFESTYLE</span>
          <span className="text-zinc-600">|</span>
          <span>BRAND COLLABORATION</span>
        </div>

        {/* Scroll Down */}
        <div className="hidden sm:flex items-center space-x-2 text-zinc-400">
          <span className="text-[10px] tracking-[0.28em]">SCROLL DOWN</span>
          <span className="h-4 w-[1px] bg-zinc-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
