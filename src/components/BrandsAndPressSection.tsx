'use client';

import React from 'react';
import { Sparkles, Quote, ExternalLink } from 'lucide-react';
import { BrandPartner, PressFeature } from '@/lib/types';

interface BrandsAndPressSectionProps {
  brands: BrandPartner[];
  press: PressFeature[];
}

export default function BrandsAndPressSection({ brands, press }: BrandsAndPressSectionProps) {
  return (
    <section id="brands" className="py-24 bg-[#0d0d11] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        {/* Brand Collaborations Banner */}
        <div className="space-y-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Brand Collaborations</span>
          </div>

          <h3 className="font-serif-luxury text-3xl md:text-4xl text-white font-light uppercase tracking-wider">
            Trusted By Premier Fashion Houses
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group p-6 bg-[#141418] border border-white/5 rounded-xl hover:border-amber-400/40 hover:bg-[#181820] transition-all duration-300 flex flex-col items-center justify-center min-h-[110px]"
              >
                <span className="font-serif-luxury text-xl md:text-2xl text-zinc-300 group-hover:text-amber-200 tracking-[0.2em] font-medium transition-colors">
                  {brand.logoText}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1 font-mono">
                  {brand.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Press & Editorial Features */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
              <Quote className="w-3.5 h-3.5" />
              <span>Press & Publications</span>
            </div>
            <h3 className="font-serif-luxury text-3xl md:text-4xl text-white font-light uppercase tracking-wider">
              Critical Acclaim
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {press.map((item) => (
              <div
                key={item.id}
                className="bg-[#121216] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-mono tracking-wider">
                    <span>{item.publication}</span>
                    <span className="text-zinc-500 text-[11px]">{item.date}</span>
                  </div>

                  <h4 className="font-serif-luxury text-lg text-white font-medium group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h4>

                  {item.quote && (
                    <p className="text-zinc-400 text-sm leading-relaxed font-light italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs text-zinc-500">
                  <span>Fashion Editorial Review</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-300 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
