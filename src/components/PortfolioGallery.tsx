'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, X, ChevronLeft, ChevronRight, Camera, Tag, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { PortfolioItem, Category } from '@/lib/types';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

const CATEGORIES: { label: string; value: 'all' | Category }[] = [
  { label: 'All Works', value: 'all' },
  { label: 'Bridal & Jamdani', value: 'bridal' },
  { label: 'High Fashion Editorial', value: 'editorial' },
  { label: 'Commercial & Brands', value: 'commercial' },
  { label: 'Runway & Catwalk', value: 'runway' },
  { label: 'Beauty & Portraits', value: 'beauty' },
];

export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  const selectedIndex = selectedPhoto ? filteredItems.findIndex(i => i.id === selectedPhoto.id) : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex > 0) {
      setSelectedPhoto(filteredItems[selectedIndex - 1]);
    } else {
      setSelectedPhoto(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex < filteredItems.length - 1) {
      setSelectedPhoto(filteredItems[selectedIndex + 1]);
    } else {
      setSelectedPhoto(filteredItems[0]);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide uppercase">
            Lookbook & Campaigns
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            From majestic Jamdani sarees and couture runway shows to international editorial spreads.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-amber-400 text-black font-semibold shadow-lg shadow-amber-500/20'
                  : 'bg-[#141418] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative overflow-hidden rounded-xl bg-zinc-950 border border-white/10 cursor-pointer transition-all duration-500 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-amber-400/90 text-black text-[10px] uppercase font-bold tracking-widest">
                    Featured
                  </div>
                )}

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] uppercase tracking-wider">
                  {item.category}
                </div>

                {/* Bottom Details (Visible on hover & mobile) */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-amber-300 text-xs uppercase tracking-widest font-mono mb-1">
                    {item.client} · {item.year}
                  </p>
                  <h3 className="font-serif-luxury text-xl md:text-2xl text-white font-normal tracking-wide group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between text-xs text-zinc-400 border-t border-white/10 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-zinc-500" />
                      {item.photographer}
                    </span>
                    <span className="text-amber-400 flex items-center gap-1">
                      View Shoot <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No photographs found in this category yet.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 z-50 p-3 text-zinc-400 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 text-zinc-400 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 text-zinc-400 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#121216] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Box */}
            <div className="relative w-full md:w-3/5 h-[45vh] md:h-[80vh] bg-black">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain p-2"
              />
            </div>

            {/* Shoot Metadata Box */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[80vh]">
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] uppercase tracking-widest font-mono mb-2">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif-luxury text-2xl md:text-3xl text-white font-light tracking-wide">
                    {selectedPhoto.title}
                  </h3>
                </div>

                {selectedPhoto.description && (
                  <p className="text-zinc-300 text-sm leading-relaxed font-light">
                    {selectedPhoto.description}
                  </p>
                )}

                {/* Details Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-amber-400" /> Client / Brand
                    </span>
                    <span className="text-zinc-200 font-medium">{selectedPhoto.client}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-amber-400" /> Photographer
                    </span>
                    <span className="text-zinc-200 font-medium">{selectedPhoto.photographer}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> Release Year
                    </span>
                    <span className="text-zinc-200 font-medium">{selectedPhoto.year}</span>
                  </div>

                  {selectedPhoto.location && (
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" /> Location
                      </span>
                      <span className="text-zinc-200 font-medium">{selectedPhoto.location}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Tags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPhoto.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[11px]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action in Lightbox */}
              <div className="pt-6 border-t border-white/10 mt-6">
                <a
                  href="#contact"
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full block text-center py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-colors shadow-lg"
                >
                  Book Mumtahina For Shoot
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
