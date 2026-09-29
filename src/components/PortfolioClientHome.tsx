'use client';

import React, { useState } from 'react';
import { ModelProfile, PortfolioItem, BrandPartner, PressFeature, ReelItem } from '@/lib/types';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import PortfolioGallery from './PortfolioGallery';
import ReelsSection from './ReelsSection';
import ModelStatsSection from './ModelStatsSection';
import AboutSection from './AboutSection';
import BrandsAndPressSection from './BrandsAndPressSection';
import BookingContactSection from './BookingContactSection';
import Footer from './Footer';

interface PortfolioClientHomeProps {
  initialProfile: ModelProfile;
  initialPortfolio: PortfolioItem[];
  initialReels?: ReelItem[];
  initialBrands: BrandPartner[];
  initialPress: PressFeature[];
}

export default function PortfolioClientHome({
  initialProfile,
  initialPortfolio,
  initialReels = [],
  initialBrands,
  initialPress
}: PortfolioClientHomeProps) {
  const [profile] = useState<ModelProfile>(initialProfile);
  const [portfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [reels] = useState<ReelItem[]>(initialReels);
  const [brands] = useState<BrandPartner[]>(initialBrands);
  const [press] = useState<PressFeature[]>(initialPress);
  const [compCardOpen, setCompCardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      {/* Navigation */}
      <Navbar
        profile={profile}
        onOpenCompCard={() => setCompCardOpen(true)}
      />

      {/* Hero Showcase */}
      <HeroSection
        profile={profile}
        portfolio={portfolio}
        onOpenCompCard={() => setCompCardOpen(true)}
      />

      {/* Model Specifications & Comp Card */}
      <ModelStatsSection
        profile={profile}
        compCardOpen={compCardOpen}
        onCloseCompCard={() => setCompCardOpen(false)}
        onOpenCompCard={() => setCompCardOpen(true)}
      />

      {/* Editorial Lookbook & Campaigns Gallery */}
      <PortfolioGallery items={portfolio} />

      {/* Viral Reels & Video Feeds */}
      {reels.length > 0 && <ReelsSection reels={reels} />}

      {/* Editorial Career Narrative & Highlights */}
      <AboutSection profile={profile} />

      {/* Brand Collaborations & Press Features */}
      <BrandsAndPressSection brands={brands} press={press} />

      {/* Casting & Booking Inquiries */}
      <BookingContactSection profile={profile} />

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  );
}
