'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModelProfile } from '@/lib/types';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import BannerCtaSection from '@/components/BannerCtaSection';
import Footer from '@/components/Footer';
import ModelStatsSection from '@/components/ModelStatsSection';
import { Sparkles, CheckCircle2, Award, Heart, Globe, Camera } from 'lucide-react';

interface AboutClientPageProps {
  profile: ModelProfile;
}

export default function AboutClientPage({ profile }: AboutClientPageProps) {
  const [compCardOpen, setCompCardOpen] = useState(false);

  const pillars = [
    {
      title: 'High Fashion & Couture',
      description: 'Bringing poise and high-fashion drama to bespoke Jamdani, designer silk sarees, modern bridal couture, and contemporary pret-a-porter.',
      icon: <Sparkles className="w-5 h-5 text-[#dfb299]" />
    },
    {
      title: 'Commercial & Advertising',
      description: 'Face of prominent advertising campaigns across telecom, tech, beauty, skincare, and national retail brands with proven audience resonance.',
      icon: <Award className="w-5 h-5 text-[#dfb299]" />
    },
    {
      title: 'Runway & Live Events',
      description: 'Commanding presence on runway ramps, prestigious fashion weeks, red carpet gala appearances, and designer showcase galas.',
      icon: <Camera className="w-5 h-5 text-[#dfb299]" />
    },
    {
      title: 'Global Aesthetic & Heritage',
      description: 'Harmoniously blending timeless South Asian elegance with international editorial aesthetics, versatile for both domestic and international shoots.',
      icon: <Globe className="w-5 h-5 text-[#dfb299]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans selection:bg-[#dfb299]/30 selection:text-[#dfb299]">
      {/* 1. Global Navbar */}
      <Navbar profile={profile} />

      {/* 2. Editorial Page Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-[#0e0e12] to-[#0a0a0c]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dfb299]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-[11px] tracking-[0.28em] uppercase text-zinc-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#dfb299]">ABOUT</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.06em] text-white uppercase leading-tight">
            ABOUT MUMTAHINA JAHAN
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light tracking-wide leading-relaxed">
            Elegance, Versatility & Editorial Poise. Dedicated to authentic visual storytelling, high-fashion artistry, and prominent commercial campaigns.
          </p>
        </div>
      </section>

      {/* 3. Main Mockup About Section (Cream Background with Specs, Signature & Jamdani Portrait) */}
      <AboutSection
        profile={profile}
        onOpenCompCard={() => setCompCardOpen(true)}
      />

      {/* 4. The Modeling Philosophy & Pillars */}
      <section className="py-24 bg-[#0d0d10] text-white border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#dfb299] font-semibold block mb-2">
                CORE DISCIPLINES
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl uppercase tracking-[0.05em] font-normal">
                ARTISTIC VISION & EXPERTISE
              </h2>
            </div>
            <p className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
              Every shoot is an opportunity to transform a designer&apos;s imagination into an unforgettable visual narrative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-[#121216] border border-white/5 p-8 rounded-sm hover:border-[#dfb299]/30 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#dfb299]/10 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="font-serif-luxury text-xl font-medium tracking-wide text-white group-hover:text-[#dfb299] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Physical Profile & Agency Measurements */}
      <section className="py-24 bg-[#0a0a0c] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.24em] text-zinc-400 font-semibold block">
                FULL SPECIFICATIONS
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl uppercase tracking-[0.05em] font-normal text-white">
                MODEL ATTRIBUTES & REPRESENTATION
              </h2>
              <div className="w-16 h-[1px] bg-[#dfb299] mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              {[
                { label: 'Height', val: "5'8\" (173 cm)" },
                { label: 'Bust', val: '34" (86 cm)' },
                { label: 'Waist', val: '26" (66 cm)' },
                { label: 'Hips', val: '36" (91 cm)' },
                { label: 'Shoe Size', val: '38 EU / 7.5 US' },
                { label: 'Dress Size', val: '34-36 EU / Small' },
                { label: 'Eye Color', val: 'Deep Dark Brown' },
                { label: 'Hair Color', val: 'Natural Black' },
                { label: 'Languages', val: 'Bengali, English' },
              ].map((item, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-white/10 p-5 rounded-sm">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 block mb-1 font-semibold">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-white tracking-wide">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => setCompCardOpen(true)}
                className="px-8 py-3.5 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-black text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-lg"
              >
                VIEW OFFICIAL COMP CARD
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Banner CTA */}
      <BannerCtaSection />

      {/* 7. Footer */}
      <Footer />

      {/* 8. Comp Card Modal */}
      {compCardOpen && (
        <ModelStatsSection
          profile={profile}
          compCardOpen={compCardOpen}
          onCloseCompCard={() => setCompCardOpen(false)}
          onOpenCompCard={() => setCompCardOpen(true)}
        />
      )}
    </div>
  );
}
