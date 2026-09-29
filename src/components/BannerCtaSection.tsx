'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface BannerCtaSectionProps {
  onOpenBooking: () => void;
}

export default function BannerCtaSection({ onOpenBooking }: BannerCtaSectionProps) {
  const bannerImage = '/uploads/mumtahina_banner.jpg';

  return (
    <section className="relative w-full bg-[#0a0a0c] text-white overflow-hidden py-16 sm:py-24 border-t border-b border-white/10">
      {/* Background with right side image fading in */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full lg:w-3/5 h-full opacity-60 lg:opacity-90">
          <Image
            src={bannerImage}
            alt="Mumtahina Jahan Bridal Editorial"
            fill
            sizes="100vw"
            className="object-cover object-right-top filter brightness-[0.85] contrast-[1.05]"
          />
          {/* Subtle horizontal gradient to black on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/60" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-xl space-y-8">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-6xl font-normal tracking-[0.06em] text-white uppercase leading-[1.08]">
            LET&apos;S CREATE<br />
            SOMETHING<br />
            BEAUTIFUL<br />
            TOGETHER.
          </h2>

          <div>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-xl cursor-pointer"
            >
              <span>BOOK MUMTAHINA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
