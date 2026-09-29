'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModelProfile } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModelStatsSection from '@/components/ModelStatsSection';
import {
  ArrowRight,
  Gem,
  Heart,
  Camera,
  Star,
  User,
  Crown,
  Ruler,
  Hourglass,
  Footprints,
  MapPin,
  Calendar,
  Languages,
  CircleDot,
  FileText
} from 'lucide-react';

interface AboutClientPageProps {
  profile: ModelProfile;
}

export default function AboutClientPage({ profile }: AboutClientPageProps) {
  const [compCardOpen, setCompCardOpen] = useState(false);

  const quickFacts = [
    { label: 'Full Name', value: 'Mumtahina Jahan', icon: <User className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Profession', value: 'Model', icon: <Crown className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Height', value: "5'8\" (173 cm)", icon: <Ruler className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Bust', value: '34" (86 cm)', icon: <CircleDot className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Waist', value: '26" (66 cm)', icon: <Hourglass className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Hip', value: '36" (91 cm)', icon: <CircleDot className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Shoe Size', value: '38 (EU)', icon: <Footprints className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Location', value: 'Dhaka, Bangladesh', icon: <MapPin className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Availability', value: 'For shoots, campaigns and events', icon: <Calendar className="w-4 h-4 text-[#dfb299]" /> },
    { label: 'Languages', value: 'Bengali, English', icon: <Languages className="w-4 h-4 text-[#dfb299]" /> },
  ];

  const whatDrivesMe = [
    {
      title: 'CREATIVITY',
      subtitle: 'Bringing unique ideas to life',
      icon: <Gem className="w-6 h-6 text-[#dfb299]" strokeWidth={1.5} />,
    },
    {
      title: 'AUTHENTICITY',
      subtitle: 'Being real in every frame',
      icon: <Heart className="w-6 h-6 text-[#dfb299]" strokeWidth={1.5} />,
    },
    {
      title: 'VISUAL STORYTELLING',
      subtitle: 'Creating meaningful experiences',
      icon: <Camera className="w-6 h-6 text-[#dfb299]" strokeWidth={1.5} />,
    },
    {
      title: 'INSPIRATION',
      subtitle: 'Motivating through fashion and beauty',
      icon: <Star className="w-6 h-6 text-[#dfb299]" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans selection:bg-[#dfb299]/30 selection:text-[#dfb299]">
      {/* 1. Global Navbar */}
      <Navbar profile={profile} />

      {/* 2. Hero Section (Exact Mockup Match) */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-32 pb-16 lg:py-0 flex items-center bg-[#0a0a0c] overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Quote */}
          <div className="lg:col-span-7 space-y-6 z-10 pt-4 lg:pt-0">
            {/* Tag */}
            <div className="flex items-center space-x-3 text-xs tracking-[0.28em] uppercase text-zinc-400 font-medium">
              <span>ABOUT ME</span>
              <span className="w-12 h-[1px] bg-white/20 hidden sm:block" />
            </div>

            {/* Main Editorial Stacked Title */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.05em] text-white uppercase leading-[1.05]">
              MUMTAHINA<br />
              JAHAN
            </h1>

            {/* Editorial Quote */}
            <p className="max-w-xl text-zinc-300 text-base sm:text-lg font-light leading-relaxed italic border-l-2 border-[#dfb299]/40 pl-4 sm:pl-5 py-1">
              &ldquo;More than just a model, I am a storyteller who brings emotions to life through fashion, beauty and creativity.&rdquo;
            </p>

            {/* Mobile / Action Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-200 shadow-lg cursor-pointer"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Close-Up Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/uploads/about_hero_model.jpg"
                alt="Mumtahina Jahan Portrait"
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

      {/* 3. Section 2: MY STORY & QUICK FACTS (Off-white / Cream #f8f8f9) */}
      <section className="py-20 lg:py-24 bg-[#f8f8f9] text-[#111113] relative border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
            
            {/* Column 1 (Left): White Jamdani Portrait Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-sm overflow-hidden shadow-xl border border-zinc-200 group">
                <Image
                  src="/uploads/mumtahina_about.jpg"
                  alt="Mumtahina Jahan - White Jamdani"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Column 2 (Center): My Story & Signature */}
            <div className="lg:col-span-5 space-y-6">
              {/* Tag */}
              <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-500 font-semibold">
                <span>MY STORY</span>
                <span className="w-12 h-[1px] bg-zinc-300" />
              </div>

              {/* Title */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.04em] text-[#111113] uppercase leading-tight">
                A PASSION FOR FASHION & STORYTELLING
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-zinc-600 text-xs sm:text-sm leading-relaxed font-light">
                <p>
                  I am Mumtahina Jahan, a Bangladeshi model passionate about fashion, beauty and visual storytelling. I believe fashion is not just about clothing, it&apos;s a form of self-expression that connects people, cultures and emotions.
                </p>
                <p>
                  Through every photoshoot, campaign and collaboration, I try to bring authenticity, elegance and a meaningful story to life. I love working with creative people and brands who believe in creating impactful and beautiful content.
                </p>
              </div>

              {/* Cursive Signature */}
              <div className="pt-2">
                <span className="font-signature text-4xl sm:text-5xl text-[#2a2a2e] block select-none">
                  Mumtahina Jahan
                </span>
              </div>

              {/* Agency Comp Card Trigger */}
              <div className="pt-2">
                <button
                  onClick={() => setCompCardOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#111113] hover:text-[#b87c5e] transition-colors border-b border-[#111113]/30 pb-0.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>VIEW OFFICIAL COMP CARD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Column 3 (Right): QUICK FACTS */}
            <div className="lg:col-span-3 bg-white p-6 sm:p-7 rounded-sm border border-zinc-200/90 shadow-sm space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400 pb-3 border-b border-zinc-100">
                QUICK FACTS
              </h3>

              <div className="space-y-3">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-start justify-between text-xs gap-2">
                    <div className="flex items-center space-x-2 text-zinc-500 font-light shrink-0">
                      <span className="shrink-0">{fact.icon}</span>
                      <span>{fact.label}</span>
                    </div>
                    <span className="font-medium text-[#111113] text-right tracking-wide">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Section 3: WHAT DRIVES ME (Dark Obsidian #0a0a0c) */}
      <section className="py-20 bg-[#0a0a0c] text-white relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-4 text-xs tracking-[0.28em] uppercase text-zinc-400 font-medium">
              <span className="w-10 h-[1px] bg-white/20" />
              <span>WHAT DRIVES ME</span>
              <span className="w-10 h-[1px] bg-white/20" />
            </div>
          </div>

          {/* 2-Part Grid: B&W Photo (Left) + 4 Value Cards (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: B&W Chin-rest photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src="/uploads/about_drives_bw.jpg"
                  alt="Mumtahina Jahan - Artistic Expression"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center filter grayscale contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right: 4 Horizontal Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {whatDrivesMe.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-sm bg-[#111114] border border-white/5 hover:border-[#dfb299]/30 transition-all duration-300 space-y-3.5 group flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-serif-luxury text-sm font-medium tracking-[0.14em] uppercase text-white group-hover:text-[#dfb299] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Section 4: BEYOND THE CAMERA / LIFE OUTSIDE MODELING (Off-white / Cream #f8f8f9) */}
      <section className="py-20 lg:py-24 bg-[#f8f8f9] text-[#111113] relative border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left: Life Outside Modeling Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-500 font-semibold">
                <span>BEYOND THE CAMERA</span>
                <span className="w-12 h-[1px] bg-zinc-300" />
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal tracking-[0.04em] text-[#111113] uppercase leading-tight">
                LIFE OUTSIDE MODELING
              </h2>

              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-light">
                When I&apos;m not in front of the camera, I enjoy exploring art, traveling, good food and spending time with people who inspire me. I believe in maintaining a healthy lifestyle, continuous learning and staying connected with nature.
              </p>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-md cursor-pointer"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: 3 Photo Collage Gallery */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-lg border border-zinc-200 group">
                <Image
                  src="/uploads/about_pink_dress.jpg"
                  alt="Mumtahina Jahan - Lifestyle Pink"
                  fill
                  sizes="(max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-lg border border-zinc-200 group">
                <Image
                  src="/uploads/about_black_saree.jpg"
                  alt="Mumtahina Jahan - Casual Elegance"
                  fill
                  sizes="(max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-lg border border-zinc-200 group">
                <Image
                  src="/uploads/about_white_jamdani.jpg"
                  alt="Mumtahina Jahan - Traditional Glaze"
                  fill
                  sizes="(max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Section 5: Quote Banner (Full-width with Bridal Gown Image) */}
      <section className="relative w-full bg-[#0a0a0c] text-white overflow-hidden py-20 sm:py-28 border-t border-b border-white/10">
        {/* Background Image positioned to right */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="relative w-full lg:w-3/5 h-full opacity-60 lg:opacity-90">
            <Image
              src="/uploads/mumtahina_banner.jpg"
              alt="Mumtahina Jahan Bridal Gown"
              fill
              sizes="100vw"
              className="object-cover object-right-top filter brightness-[0.88] contrast-[1.05]"
            />
            {/* Subtle horizontal gradient to black on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/60" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-lg space-y-6">
            <div className="text-4xl text-[#dfb299] font-serif leading-none select-none">
              &ldquo;&ldquo;
            </div>

            <p className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-light text-white leading-relaxed">
              I believe beauty is not about perfection, but about confidence, kindness and the stories we choose to tell.
            </p>

            <div className="pt-2">
              <span className="font-signature text-3xl sm:text-4xl text-[#dfb299] block select-none">
                — Mumtahina Jahan
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Official Agency Comp Card Modal */}
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
