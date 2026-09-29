'use client';

import React from 'react';
import Link from 'next/link';
import { PortfolioItem, ModelProfile } from '@/lib/types';
import Navbar from '@/components/Navbar';
import PortfolioGallery from '@/components/PortfolioGallery';
import BannerCtaSection from '@/components/BannerCtaSection';
import Footer from '@/components/Footer';

interface PortfolioClientPageProps {
  portfolio: PortfolioItem[];
  profile?: ModelProfile;
}

export default function PortfolioClientPage({ portfolio, profile }: PortfolioClientPageProps) {
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
            <span className="text-[#dfb299]">PORTFOLIO</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.06em] text-white uppercase leading-tight">
            PORTFOLIO ARCHIVE
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light tracking-wide leading-relaxed">
            A curated visual anthology spanning High Fashion, Beauty, Commercial Advertisements, Traditional Jamdani, and Contemporary Editorial shoots.
          </p>
        </div>
      </section>

      {/* 3. Main Portfolio Section (Mockup 5-Column Grid with Filter Tabs & Lightbox) */}
      <PortfolioGallery portfolio={portfolio} />

      {/* 4. Banner CTA */}
      <BannerCtaSection />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
