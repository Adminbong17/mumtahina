'use client';

import React from 'react';
import Link from 'next/link';
import { ModelProfile } from '@/lib/types';
import Navbar from '@/components/Navbar';
import BookingContactSection from '@/components/BookingContactSection';
import Footer from '@/components/Footer';
import { MapPin, Clock, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

interface ContactClientPageProps {
  profile: ModelProfile;
}

export default function ContactClientPage({ profile }: ContactClientPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans selection:bg-[#dfb299]/30 selection:text-[#dfb299]">
      {/* 1. Navbar */}
      <Navbar profile={profile} />

      {/* 2. Editorial Page Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-[#0e0e12] to-[#0a0a0c]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dfb299]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-[11px] tracking-[0.28em] uppercase text-zinc-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#dfb299]">CONTACT</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.06em] text-white uppercase leading-tight">
            BOOKING & INQUIRIES
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light tracking-wide leading-relaxed">
            For fashion editorials, commercial advertising, runway bookings, and brand collaborations, reach out directly or submit the inquiry form below.
          </p>
        </div>
      </section>

      {/* 3. Representation & Availability Info Bar */}
      <section className="bg-[#121216] border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#dfb299]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-semibold">Base Location</span>
              <span className="text-sm font-medium text-white">Dhaka, Bangladesh (Available Globally)</span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#dfb299]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-semibold">Response Time</span>
              <span className="text-sm font-medium text-white">Within 12 - 24 Hours</span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#dfb299]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-semibold">Management</span>
              <span className="text-sm font-medium text-white">Direct & Agency Representation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Contact Section (4 Circular Action Cards & Booking Form) */}
      <BookingContactSection
        contact={profile.contact}
        socials={profile.socials}
      />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
