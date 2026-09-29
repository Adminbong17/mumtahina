'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModelProfile, PortfolioItem } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ZoomIn
} from 'lucide-react';

interface PortfolioClientPageProps {
  portfolio?: PortfolioItem[];
  profile?: ModelProfile;
}

export default function PortfolioClientPage({ portfolio = [], profile }: PortfolioClientPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', 'FASHION', 'BEAUTY', 'COMMERCIAL', 'EDITORIAL', 'LIFESTYLE'];

  // All 16 photos matching mockup
  const allMockupPhotos = [
    {
      id: 'photo-1',
      title: 'Midnight Velvet Noir',
      category: 'FASHION',
      imageUrl: '/uploads/portfolio_grid_1.jpg',
    },
    {
      id: 'photo-2',
      title: 'Soft Blush Silk Drapery',
      category: 'BEAUTY',
      imageUrl: '/uploads/portfolio_grid_2.jpg',
    },
    {
      id: 'photo-3',
      title: 'Serene Jamdani Muslin',
      category: 'LIFESTYLE',
      imageUrl: '/uploads/portfolio_grid_3.jpg',
    },
    {
      id: 'photo-4',
      title: 'Contemplative Saree Poise',
      category: 'EDITORIAL',
      imageUrl: '/uploads/portfolio_grid_4.jpg',
    },
    {
      id: 'photo-5',
      title: 'Bridal Gown Golden Slumber',
      category: 'FASHION',
      imageUrl: '/uploads/portfolio_grid_5.jpg',
    },
    {
      id: 'photo-6',
      title: 'Crimson Wine Radiance',
      category: 'COMMERCIAL',
      imageUrl: '/uploads/portfolio_grid_6.jpg',
    },
    {
      id: 'photo-7',
      title: 'Windblown High Couture',
      category: 'BEAUTY',
      imageUrl: '/uploads/portfolio_grid_7.jpg',
    },
    {
      id: 'photo-8',
      title: 'Rose Petal Elegance',
      category: 'EDITORIAL',
      imageUrl: '/uploads/portfolio_grid_8.jpg',
    },
    {
      id: 'photo-9',
      title: 'Morning Sunlit Muslin',
      category: 'LIFESTYLE',
      imageUrl: '/uploads/portfolio_grid_9.jpg',
    },
    {
      id: 'photo-10',
      title: 'Classic Saree Glaze',
      category: 'FASHION',
      imageUrl: '/uploads/portfolio_grid_10.jpg',
    },
    {
      id: 'photo-11',
      title: 'Bridal Slumber Perspective',
      category: 'BEAUTY',
      imageUrl: '/uploads/portfolio_grid_11.jpg',
    },
    {
      id: 'photo-12',
      title: 'Glow Essence Advertising',
      category: 'COMMERCIAL',
      imageUrl: '/uploads/portfolio_grid_12.jpg',
    },
    {
      id: 'photo-13',
      title: 'Introspective Lens Noir',
      category: 'EDITORIAL',
      imageUrl: '/uploads/portfolio_grid_13.jpg',
    },
    {
      id: 'photo-14',
      title: 'Playful Warmth Lifestyle',
      category: 'LIFESTYLE',
      imageUrl: '/uploads/portfolio_grid_14.jpg',
    },
    {
      id: 'photo-15',
      title: 'Traditional Lace Heritage',
      category: 'FASHION',
      imageUrl: '/uploads/portfolio_grid_15.jpg',
    },
    {
      id: 'photo-16',
      title: 'Ethereal Garden Glance',
      category: 'BEAUTY',
      imageUrl: '/uploads/portfolio_grid_16.jpg',
    },
  ];

  // Merge with custom portfolio items from database if available
  const basePhotos = useMemo(() => {
    if (portfolio && portfolio.length > 5) {
      return portfolio.map((item, idx) => ({
        id: item.id || `custom-${idx}`,
        title: item.title,
        category: (item.category || 'FASHION').toUpperCase(),
        imageUrl: item.imageUrl,
      }));
    }
    return allMockupPhotos;
  }, [portfolio]);

  // Filter by category and search
  const filteredPhotos = useMemo(() => {
    return basePhotos.filter((item) => {
      const matchesCategory =
        activeCategory === 'ALL' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [basePhotos, activeCategory, searchQuery]);

  // Pagination calculation (16 per page for desktop, or dynamic)
  const itemsPerPage = 16;
  const totalPages = Math.max(1, Math.ceil(filteredPhotos.length / itemsPerPage));
  const currentPhotos = filteredPhotos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currentLightboxPhoto =
    lightboxIndex !== null && filteredPhotos[lightboxIndex]
      ? filteredPhotos[lightboxIndex]
      : null;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev! + 1) % filteredPhotos.length));
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! === 0 ? filteredPhotos.length - 1 : prev! - 1
      );
    }
  };

  // Keyboard controls for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111113] flex flex-col font-sans selection:bg-[#dfb299]/30 selection:text-[#dfb299]">
      {/* 1. Global Navbar */}
      <Navbar profile={profile} />

      {/* 2. Hero Section (Exact Mockup Match - Dark Obsidian) */}
      <section className="relative min-h-[480px] lg:min-h-[540px] pt-32 pb-16 lg:py-0 flex items-center bg-[#0a0a0c] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 space-y-5 z-10 pt-4 lg:pt-0">
            {/* Tag */}
            <div className="flex items-center space-x-3 text-xs tracking-[0.28em] uppercase text-zinc-400 font-medium">
              <span>GALLERY</span>
              <span className="w-12 h-[1px] bg-white/20 hidden sm:block" />
            </div>

            {/* Main Editorial Title */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.06em] text-white uppercase leading-[1.05]">
              PORTFOLIO
            </h1>

            {/* Description */}
            <p className="max-w-xl text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              A collection of my work across fashion, beauty, commercial and editorial projects. Each photo tells a story, a moment, a feeling.
            </p>
          </div>

          {/* Right Column: Hero Close-Up Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/uploads/about_hero_model.jpg"
                alt="Mumtahina Jahan - Portfolio Hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Section 2: Filters & Search Bar */}
      <section className="py-8 sm:py-10 bg-[#ffffff] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#111113] text-white shadow-md'
                      : 'bg-[#f4f4f6] hover:bg-[#e9e9ed] text-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search photos..."
              className="w-full bg-[#f4f4f6] text-xs text-[#111113] placeholder:text-zinc-400 pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-zinc-300 focus:bg-white focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>
      </section>

      {/* 4. Section 3: Photo Grid (16 Photos, 4x4 on Desktop, 2x8 on Mobile) */}
      <section className="py-12 sm:py-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {currentPhotos.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <p className="text-base">No photos found matching your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('ALL');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#b87c5e] underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {currentPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900 cursor-pointer border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Photo Image */}
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark subtle bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Category Label (Bottom Left) */}
                  <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-3.5 z-10">
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-white drop-shadow-md">
                      {photo.category}
                    </span>
                  </div>

                  {/* Search / Zoom Icon (Bottom Right) */}
                  <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 z-10">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/60 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#dfb299] group-hover:text-black group-hover:border-[#dfb299] transition-all duration-300 shadow-md">
                      <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. Section 4: Pagination Bar (Matching Mockup) */}
          <div className="flex items-center justify-center space-x-2 pt-12 sm:pt-16">
            {/* Prev Arrow */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#f4f4f6] hover:bg-[#e9e9ed] disabled:opacity-40 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page 1 */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                currentPage === 1
                  ? 'bg-[#111113] text-white shadow-sm'
                  : 'bg-[#f4f4f6] hover:bg-[#e9e9ed] text-zinc-700'
              }`}
            >
              1
            </button>

            {/* Page 2 */}
            {totalPages >= 2 && (
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === 2
                    ? 'bg-[#111113] text-white shadow-sm'
                    : 'bg-[#f4f4f6] hover:bg-[#e9e9ed] text-zinc-700'
                }`}
              >
                2
              </button>
            )}

            {/* Page 3 */}
            {totalPages >= 3 && (
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === 3
                    ? 'bg-[#111113] text-white shadow-sm'
                    : 'bg-[#f4f4f6] hover:bg-[#e9e9ed] text-zinc-700'
                }`}
              >
                3
              </button>
            )}

            {/* Dots */}
            <span className="w-8 text-center text-xs text-zinc-400 select-none">...</span>

            {/* Page 8 / Total */}
            <button
              onClick={() => setCurrentPage(Math.max(totalPages, 8))}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                currentPage === 8
                  ? 'bg-[#111113] text-white shadow-sm'
                  : 'bg-[#f4f4f6] hover:bg-[#e9e9ed] text-zinc-700'
              }`}
            >
              8
            </button>

            {/* Next Arrow */}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#f4f4f6] hover:bg-[#e9e9ed] text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Section 5: CTA Banner (Matching Mockup with Smiling Model Portrait) */}
      <section className="relative w-full bg-[#0c0c0e] text-white overflow-hidden py-16 sm:py-24 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.05em] text-white uppercase leading-[1.1]">
              LET&apos;S CREATE<br className="hidden sm:inline" />
              SOMETHING BEAUTIFUL
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm font-light tracking-wide max-w-md leading-relaxed">
              Available for fashion shoots, brand campaigns and collaborations.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>BOOK MUMTAHINA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Model Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/uploads/portfolio_cta_model.jpg"
                alt="Mumtahina Jahan Smiling"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Lightbox Zoom Modal */}
      {currentLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous arrow */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next arrow */}
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[72vh] rounded overflow-hidden shadow-2xl">
              <Image
                src={currentLightboxPhoto.imageUrl}
                alt={currentLightboxPhoto.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Bottom Metadata bar */}
            <div className="w-full pt-4 flex items-center justify-between text-white border-t border-white/10 mt-3">
              <div>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#dfb299] font-medium block">
                  {currentLightboxPhoto.category}
                </span>
                <h3 className="font-serif-luxury text-lg text-white font-medium">
                  {currentLightboxPhoto.title}
                </h3>
              </div>
              <span className="text-xs text-zinc-400">
                {lightboxIndex! + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
