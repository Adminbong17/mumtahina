'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { PortfolioItem } from '@/lib/types';

interface PortfolioGalleryProps {
  portfolio: PortfolioItem[];
}

export default function PortfolioGallery({ portfolio }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', 'FASHION', 'BEAUTY', 'COMMERCIAL', 'EDITORIAL', 'LIFESTYLE'];

  // Default mockup photos
  const mockupPhotos = [
    {
      id: 'p1',
      title: 'Black Velvet Noir',
      category: 'fashion',
      imageUrl: '/uploads/mumtahina_portfolio_1.jpg',
      aspectRatio: 'tall',
    },
    {
      id: 'p2',
      title: 'Blush Silk Drape',
      category: 'beauty',
      imageUrl: '/uploads/mumtahina_portfolio_2.jpg',
      aspectRatio: 'tall',
    },
    {
      id: 'p3',
      title: 'Midnight Jamdani Elegance',
      category: 'editorial',
      imageUrl: '/uploads/mumtahina_portfolio_3.jpg',
      aspectRatio: 'tall',
    },
    {
      id: 'p4',
      title: 'White Muslin Serenity',
      category: 'lifestyle',
      imageUrl: '/uploads/mumtahina_portfolio_4.jpg',
      aspectRatio: 'tall',
    },
    {
      id: 'p5',
      title: 'Crimson Lace Couture',
      category: 'commercial',
      imageUrl: '/uploads/mumtahina_portfolio_5.jpg',
      aspectRatio: 'tall',
    },
  ];

  // Merge with custom portfolio items from database if available
  const displayPhotos = (portfolio && portfolio.length >= 5)
    ? portfolio.slice(0, 10)
    : mockupPhotos;

  const filteredPhotos = activeCategory === 'ALL'
    ? displayPhotos
    : displayPhotos.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const currentLightboxPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0c] text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          {/* Left Title */}
          <div className="flex items-center space-x-3">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase">
              PORTFOLIO
            </h2>
            <span className="w-12 h-[1px] bg-white/30 hidden sm:block" />
          </div>

          {/* Center Category Filters */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1 transition-colors relative cursor-pointer ${
                  activeCategory === cat
                    ? 'text-white font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white'
                    : 'hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right: View All */}
          <a
            href="#portfolio"
            onClick={() => setActiveCategory('ALL')}
            className="hidden lg:inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 5-Column Grid (as shown in desktop mockup) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-4 pt-10">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer bg-zinc-900 border border-white/5 shadow-lg"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title || `Mumtahina Jahan Portfolio ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-108"
              />
              
              {/* Hover Dark Overlay + Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#dfb299] font-medium">
                  {photo.category}
                </span>
                <p className="font-serif-luxury text-sm text-white font-normal truncate">
                  {photo.title}
                </p>
                <div className="pt-2 flex items-center text-[10px] tracking-[0.16em] uppercase text-zinc-300 gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Zoom Modal */}
      {currentLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {lightboxIndex !== null && lightboxIndex > 0 && (
            <button
              onClick={() => setLightboxIndex(lightboxIndex - 1)}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {lightboxIndex !== null && lightboxIndex < filteredPhotos.length - 1 && (
            <button
              onClick={() => setLightboxIndex(lightboxIndex + 1)}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] max-h-[75vh]">
              <Image
                src={currentLightboxPhoto.imageUrl}
                alt={currentLightboxPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center pt-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#dfb299]">
                {currentLightboxPhoto.category}
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal">
                {currentLightboxPhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
