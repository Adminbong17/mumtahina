'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Award, Globe, Heart } from 'lucide-react';
import { ModelProfile } from '@/lib/types';

interface AboutSectionProps {
  profile: ModelProfile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const highlights = [
    {
      icon: Award,
      title: "Runway Excellence",
      desc: "Showstopper for Dhaka Fashion Week, Lakme South Asia showcases, and Khadi Design Fair."
    },
    {
      icon: Heart,
      title: "Heritage Champion",
      desc: "Passionate advocate for ancient Bengal artisanal weaves: Dhakai Jamdani, Muslin & Rajshahi Silk."
    },
    {
      icon: Globe,
      title: "Global Versatility",
      desc: "Bridging South Asian high fashion with contemporary Milan and Paris editorial aesthetics."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Bio Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Career & Vision</span>
              </div>
              <h2 className="font-serif-luxury text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide uppercase">
                The Narrative
              </h2>
            </div>

            {/* Paragraphs from database */}
            <div className="space-y-5 text-zinc-300 font-light text-base leading-relaxed">
              {profile.bio.map((paragraph, index) => (
                <p key={index} className="tracking-wide">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-2 bg-[#121216] p-4 rounded-xl border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif-luxury text-white text-sm font-medium">{item.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Backing decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-amber-700/10 rounded-3xl blur-2xl -z-10" />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src={profile.compCardImages.fashion}
                  alt={`${profile.name} Editorial Portrait`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono block">Signature Style</span>
                  <p className="font-serif-luxury text-white text-sm">
                    &ldquo;Fashion is our living archive; every fold of Jamdani carries three centuries of human soul.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
