'use client';

import React from 'react';
import Image from 'next/image';
import { Ruler, Sparkles, Download, Printer, ShieldCheck, Mail, Phone, MapPin, X } from 'lucide-react';
import { ModelProfile } from '@/lib/types';

interface ModelStatsSectionProps {
  profile: ModelProfile;
  compCardOpen: boolean;
  onCloseCompCard: () => void;
  onOpenCompCard: () => void;
}

export default function ModelStatsSection({
  profile,
  compCardOpen,
  onCloseCompCard,
  onOpenCompCard
}: ModelStatsSectionProps) {
  const { measurements, compCardImages, contact } = profile;

  const statList = [
    { label: 'Height', value: measurements.height },
    { label: 'Bust', value: measurements.bust },
    { label: 'Waist', value: measurements.waist },
    { label: 'Hips', value: measurements.hips },
    { label: 'Shoe Size', value: measurements.shoes },
    { label: 'Dress Size', value: measurements.dress },
    { label: 'Eye Color', value: measurements.eyes },
    { label: 'Hair Color', value: measurements.hair },
    { label: 'Skin Tone', value: measurements.skin },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="measurements" className="py-24 bg-[#0d0d11] relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Model Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-amber-400/20 shadow-2xl group">
              <Image
                src={compCardImages.fullBody}
                alt={`${profile.name} Full Body Polaroid`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Bottom Tag */}
              <div className="absolute bottom-6 inset-x-6 z-10 flex items-center justify-between text-xs bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono block">Representation</span>
                  <span className="font-serif-luxury text-white font-medium">{profile.agency}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Measurements Card */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
                <Ruler className="w-3.5 h-3.5" />
                <span>Physical Specifications</span>
              </div>
              <h2 className="font-serif-luxury text-4xl md:text-5xl text-white font-light tracking-wide uppercase">
                Model Measurements
              </h2>
              <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                Standard industry metrics for casting directors, fashion week fittings, haute couture designers, and commercial producers.
              </p>
            </div>

            {/* Grid of Measurements */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {statList.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#141418] border border-white/5 rounded-xl p-4 hover:border-amber-400/30 transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 block mb-1">
                    {stat.label}
                  </span>
                  <span className="text-lg md:text-xl font-serif-luxury text-white font-medium tracking-wide">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Comp Card Download Action */}
            <div className="bg-gradient-to-r from-amber-950/30 via-amber-900/10 to-transparent border border-amber-500/20 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="font-serif-luxury text-lg text-amber-200 block">
                  Official Composite Card (Comp Card)
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
                  Includes 4-angle standard agency polaroids, verified biometric specs, and direct booking contacts for fashion agents.
                </p>
              </div>

              <button
                onClick={onOpenCompCard}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>View & Print Comp Card</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COMP CARD MODAL & PRINT VIEW */}
      {compCardOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={onCloseCompCard}
        >
          <div
            className="relative max-w-4xl w-full bg-white text-zinc-900 rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden print:p-0 print:border-none print:shadow-none print:max-w-full my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Controls (Hidden during print) */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-200 no-print mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Agency Comp Card</span>
                <h3 className="font-serif-luxury text-2xl text-black font-semibold uppercase">{profile.name}</h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs uppercase tracking-wider hover:bg-black transition-colors"
                >
                  <Printer className="w-4 h-4" /> Print / PDF
                </button>
                <button
                  onClick={onCloseCompCard}
                  className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Printable Comp Card Layout */}
            <div className="space-y-6">
              {/* 4 Photos Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative aspect-[3/4] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                  <Image
                    src={compCardImages.headshot}
                    alt="Headshot"
                    fill
                    sizes="25vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-black/70 text-white px-2 py-0.5 rounded">
                    Headshot
                  </div>
                </div>

                <div className="relative aspect-[3/4] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                  <Image
                    src={compCardImages.profile}
                    alt="Profile View"
                    fill
                    sizes="25vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-black/70 text-white px-2 py-0.5 rounded">
                    Profile
                  </div>
                </div>

                <div className="relative aspect-[3/4] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                  <Image
                    src={compCardImages.fullBody}
                    alt="Full Body"
                    fill
                    sizes="25vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-black/70 text-white px-2 py-0.5 rounded">
                    Full Body
                  </div>
                </div>

                <div className="relative aspect-[3/4] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                  <Image
                    src={compCardImages.fashion}
                    alt="Editorial Fashion"
                    fill
                    sizes="25vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-black/70 text-white px-2 py-0.5 rounded">
                    Editorial
                  </div>
                </div>
              </div>

              {/* Model Name & Specs Banner */}
              <div className="border-t-2 border-b-2 border-black py-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4">
                  <h4 className="font-serif-luxury text-3xl text-black font-bold tracking-wider uppercase">
                    {profile.name}
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-zinc-600 font-sans">
                    {profile.subtitle}
                  </p>
                </div>

                <div className="md:col-span-8 grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Height</span>
                    <span className="font-bold text-black">{measurements.height}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Bust</span>
                    <span className="font-bold text-black">{measurements.bust}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Waist</span>
                    <span className="font-bold text-black">{measurements.waist}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Hips</span>
                    <span className="font-bold text-black">{measurements.hips}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Shoes</span>
                    <span className="font-bold text-black">{measurements.shoes}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Eyes</span>
                    <span className="font-bold text-black">{measurements.eyes}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Hair</span>
                    <span className="font-bold text-black">{measurements.hair}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Dress</span>
                    <span className="font-bold text-black">{measurements.dress}</span>
                  </div>
                </div>
              </div>

              {/* Agency Representation Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-600 gap-2">
                <div>
                  <span className="font-semibold text-black block">{profile.agency}</span>
                  <span>{contact.address}</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="block font-mono">Email: {contact.email}</span>
                  <span className="block font-mono">Booking Line: {contact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
