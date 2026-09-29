'use client';

import React from 'react';
import Image from 'next/image';
import { Ruler, Sparkles, MapPin, Footprints, FileText, ArrowRight } from 'lucide-react';
import { ModelProfile } from '@/lib/types';

interface AboutSectionProps {
  profile: ModelProfile;
  onOpenCompCard: () => void;
}

export default function AboutSection({ profile, onOpenCompCard }: AboutSectionProps) {
  const aboutImage = '/uploads/mumtahina_about.jpg';

  const stats = [
    { label: 'Height', value: "5'8\"", icon: '🧍' },
    { label: 'Bust', value: '34"', icon: '📏' },
    { label: 'Waist', value: '26"', icon: '⏳' },
    { label: 'Hip', value: '36"', icon: '🍑' },
    { label: 'Shoe Size', value: '38 (EU)', icon: '👠' },
    { label: 'Location', value: 'Dhaka, Bangladesh', icon: '📍' },
  ];

  return (
    <section id="about" className="py-24 bg-[#f9f9fb] text-[#18181b] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: White Jamdani Portrait Photo (lg: col-span-4) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/3] lg:aspect-[4/3.5] rounded-sm overflow-hidden shadow-xl border border-zinc-200 group">
              <Image
                src={aboutImage}
                alt="Mumtahina Jahan Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Middle Column: Bio & Signature (lg: col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tag with dash */}
            <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-500 font-semibold">
              <span>ABOUT ME</span>
              <span className="w-10 h-[1px] bg-zinc-300" />
            </div>

            {/* Title */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.04em] text-[#111113] uppercase leading-tight">
              MUMTAHINA JAHAN
            </h2>

            {/* Paragraph */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
              I am a Bangladeshi model passionate about fashion, beauty and visual storytelling. I love working with creative people and brands to create meaningful and aesthetically beautiful content.
            </p>

            {/* Script Signature */}
            <div className="pt-2">
              <span className="font-signature text-4xl sm:text-5xl text-[#2a2a2e] block select-none">
                Mumtahina Jahan
              </span>
            </div>

            {/* Comp card CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenCompCard}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#111113] hover:text-[#b87c5e] transition-colors border-b border-[#111113]/30 pb-0.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>OFFICIAL AGENCY COMP CARD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Physical Specs List (lg: col-span-3) */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-7 rounded-sm border border-zinc-200/80 shadow-sm space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400 pb-2 border-b border-zinc-100">
              PHYSICAL SPECS
            </h3>

            <div className="space-y-3.5">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 text-zinc-500 font-light">
                    <span className="text-base select-none">{stat.icon}</span>
                    <span>{stat.label}</span>
                  </div>
                  <span className="font-medium text-[#111113] tracking-wide">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
