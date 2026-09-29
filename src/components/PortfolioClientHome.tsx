'use client';

import React, { useState } from 'react';
import { ModelProfile, PortfolioItem, BrandPartner, PressFeature, ReelItem } from '@/lib/types';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import PortfolioGallery from './PortfolioGallery';
import ReelsSection from './ReelsSection';
import BrandsAndPressSection from './BrandsAndPressSection';
import BannerCtaSection from './BannerCtaSection';
import BookingContactSection from './BookingContactSection';
import Footer from './Footer';
import ModelStatsSection from './ModelStatsSection';

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

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans selection:bg-[#dfb299]/30 selection:text-[#dfb299]">
      {/* 1. Navbar */}
      <Navbar
        profile={profile}
        onOpenBooking={scrollToContact}
      />

      {/* 2. Hero Section */}
      <HeroSection
        profile={profile}
        portfolio={portfolio}
        onOpenBooking={scrollToContact}
      />

      {/* 3. About Me Section (Cream background with Specs and Signature) */}
      <AboutSection
        profile={profile}
        onOpenCompCard={() => setCompCardOpen(true)}
      />

      {/* 4. Portfolio Section (5-column gallery with filter tabs) */}
      <PortfolioGallery portfolio={portfolio} />

      {/* 5. Behind The Scenes Video Section */}
      <ReelsSection reels={reels} />

      {/* 6. Brands I've Worked With & Experience Timeline */}
      <BrandsAndPressSection brands={brands} press={press} />

      {/* 7. Banner CTA (Let's Create Something Beautiful Together) */}
      <BannerCtaSection onOpenBooking={scrollToContact} />

      {/* 8. Contact Me & Booking Inquiries */}
      <BookingContactSection
        contact={profile.contact}
        socials={profile.socials}
      />

      {/* 9. Footer */}
      <Footer />

      {/* 10. Printable Agency Comp Card Modal */}
      {compCardOpen && (
        <ModelStatsSection
          profile={profile}
          compCardOpen={compCardOpen}
          onCloseCompCard={() => setCompCardOpen(false)}
          onOpenCompCard={() => setCompCardOpen(true)}
        />
      )}
    </div>
  );
}
