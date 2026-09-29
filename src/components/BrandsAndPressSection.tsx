'use client';

import React from 'react';
import { BrandPartner, PressFeature } from '@/lib/types';

interface BrandsAndPressSectionProps {
  brands: BrandPartner[];
  press: PressFeature[];
}

export default function BrandsAndPressSection({ brands, press }: BrandsAndPressSectionProps) {
  // Exact brands from the mockup
  const brandList = [
    { name: 'SAMSUNG', fontStyle: 'font-sans font-black tracking-[0.18em]' },
    { name: 'oppo', fontStyle: 'font-sans font-bold lowercase tracking-wider' },
    { name: 'LUX', fontStyle: 'font-serif tracking-[0.25em] font-normal text-2xl' },
    { name: 'NIOR', fontStyle: 'font-sans font-bold tracking-[0.2em]' },
    { name: 'Aarong', fontStyle: 'font-serif italic font-medium tracking-wide' },
    { name: 'bKash', fontStyle: 'font-sans font-bold tracking-tight' },
    { name: 'Daraz', fontStyle: 'font-sans font-extrabold tracking-tight' },
    { name: 'PANTENE', fontStyle: 'font-sans font-medium tracking-[0.18em]' },
  ];

  // Exact career timeline from the mockup
  const experiences = [
    { year: '2024', title: 'Brand Campaign', subtitle: 'Beauty & Lifestyle' },
    { year: '2023', title: 'Fashion Photoshoot', subtitle: 'Editorial' },
    { year: '2023', title: 'Commercial Shoot', subtitle: 'E-commerce Brand' },
    { year: '2022', title: 'Event Appearance', subtitle: 'Fashion Show' },
    { year: '2021', title: 'Brand Collaboration', subtitle: 'Social Media Campaign' },
  ];

  return (
    <section id="experience" className="bg-[#f8f8f9] text-[#111113] py-20 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Top: Brands I've Worked With */}
        <div className="space-y-10">
          <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-500 font-semibold">
            <span>BRANDS I&apos;VE WORKED WITH</span>
            <span className="w-12 h-[1px] bg-zinc-300" />
          </div>

          {/* 8-Column / Responsive Brands Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 items-center justify-items-center py-4 border-y border-zinc-200/80">
            {brandList.map((brand) => (
              <div
                key={brand.name}
                className="w-full flex items-center justify-center p-3 text-zinc-800 hover:text-black transition-transform duration-200 hover:scale-105 select-none"
              >
                <span className={`text-base sm:text-lg opacity-85 hover:opacity-100 ${brand.fontStyle}`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Experience Timeline */}
        <div className="space-y-10 max-w-3xl">
          <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-500 font-semibold">
            <span>EXPERIENCE</span>
            <span className="w-12 h-[1px] bg-zinc-300" />
          </div>

          {/* Minimalist Vertical Timeline */}
          <div className="relative pl-6 sm:pl-8 border-l border-zinc-300 space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#111113] border-2 border-white shadow-sm" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                  {/* Year */}
                  <span className="font-mono text-sm sm:text-base font-semibold text-zinc-900 tracking-wider w-16">
                    {exp.year}
                  </span>

                  {/* Title & Subtitle */}
                  <div>
                    <h4 className="font-serif-luxury text-lg sm:text-xl font-medium text-[#111113] leading-snug">
                      {exp.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 font-light">
                      {exp.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
