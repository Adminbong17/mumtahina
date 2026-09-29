'use client';

import React from 'react';
import Link from 'next/link';
import { BrandPartner, PressFeature, ModelProfile } from '@/lib/types';
import Navbar from '@/components/Navbar';
import BrandsAndPressSection from '@/components/BrandsAndPressSection';
import BannerCtaSection from '@/components/BannerCtaSection';
import Footer from '@/components/Footer';
import { Newspaper, ExternalLink, Sparkles, Award } from 'lucide-react';

interface ExperienceClientPageProps {
  brands: BrandPartner[];
  press: PressFeature[];
  profile?: ModelProfile;
}

export default function ExperienceClientPage({ brands, press, profile }: ExperienceClientPageProps) {
  const editorialPress = [
    {
      title: 'Redefining Modern Bangladeshi Haute Couture: Mumtahina Jahan',
      outlet: 'Canvas Magazine',
      date: 'May 2024',
      snippet: 'From intricate handwoven Jamdani to contemporary minimalist fashion, Mumtahina brings an effortless grace that captivates fashion houses nationwide.',
      category: 'Cover Story',
      url: '#'
    },
    {
      title: 'Top 10 Runway Faces of Dhaka Fashion Week',
      outlet: 'The Daily Star — Showcase',
      date: 'November 2023',
      snippet: 'Mumtahina Jahan commanded the runway with regal posture and commanding presence during the opening night gala.',
      category: 'Editorial Feature',
      url: '#'
    },
    {
      title: 'Behind the High-Impact Campaign with Samsung & OPPO',
      outlet: 'Ice Today',
      date: 'September 2023',
      snippet: 'How commercial fashion modeling is evolving through digital storytelling and expressive visual brand ambassadors.',
      category: 'Industry Spotlight',
      url: '#'
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
            <span className="text-[#dfb299]">EXPERIENCE</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.06em] text-white uppercase leading-tight">
            CAREER & COLLABORATIONS
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light tracking-wide leading-relaxed">
            Leading national and multinational brand campaigns, editorial features, prestigious runway events, and media press.
          </p>
        </div>
      </section>

      {/* 3. Main Mockup Brands & Timeline Section */}
      <BrandsAndPressSection brands={brands} press={press} />

      {/* 4. Press & Editorial Coverage Section */}
      <section className="py-20 bg-[#0e0e11] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#dfb299] font-semibold block mb-1">
                MEDIA & PUBLICATIONS
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl uppercase tracking-[0.05em] font-normal">
                PRESS & EDITORIAL FEATURES
              </h2>
            </div>
            <p className="text-xs text-zinc-400 font-light max-w-sm">
              Featured in Bangladesh&apos;s foremost lifestyle magazines, national dailies, and fashion retrospectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorialPress.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#121216] border border-white/10 p-8 rounded-sm hover:border-[#dfb299]/40 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#dfb299] font-semibold">
                    <span>{item.category}</span>
                    <span className="text-zinc-500">{item.date}</span>
                  </div>

                  <h3 className="font-serif-luxury text-xl text-white font-medium group-hover:text-[#dfb299] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {item.snippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold text-white tracking-wider uppercase font-serif-luxury">
                    {item.outlet}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-[#dfb299] group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Banner CTA */}
      <BannerCtaSection />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
