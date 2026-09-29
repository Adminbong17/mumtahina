'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Lock, Sparkles, Phone, ArrowUpRight } from 'lucide-react';
import { ModelProfile } from '@/lib/types';

interface NavbarProps {
  profile: ModelProfile;
  onOpenCompCard?: () => void;
}

export default function Navbar({ profile, onOpenCompCard }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Reels & Videos', href: '#reels' },
    { label: 'Measurements', href: '#measurements' },
    { label: 'Editorial & Story', href: '#about' },
    { label: 'Brands & Press', href: '#brands' },
    { label: 'Contact & Booking', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#09090b]/85 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="group flex flex-col items-start">
          <span className="font-serif-luxury text-2xl md:text-3xl tracking-[0.25em] text-white group-hover:text-amber-300 transition-colors uppercase font-light">
            {profile.name}
          </span>
          <span className="text-[10px] tracking-[0.35em] text-zinc-400 uppercase font-sans -mt-1 group-hover:text-amber-200/80 transition-colors">
            DHAKA · MILAN · RUNWAY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] text-zinc-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-300 transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}

          {onOpenCompCard && (
            <button
              onClick={onOpenCompCard}
              className="text-amber-300/90 hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Comp Card
            </button>
          )}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {profile.socials.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-amber-300 hover:bg-white/5 rounded-full transition-colors"
              title="Instagram @mumtahinaaa_"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}

          {profile.socials.tiktok && (
            <a
              href={profile.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-amber-300 hover:bg-white/5 rounded-full transition-colors"
              title="TikTok @mumtahinaaa_2"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          )}

          <a
            href={`https://wa.me/${profile.contact.bookingWhatsApp.replace(/[^0-9]/g, '')}?text=Hello%20Mumtahina,%20we%20are%20interested%20in%20booking%20you%20for%20a%20fashion%20project`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 px-4 py-2.5 rounded-full transition-all duration-300"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            Direct Booking
          </a>

          <Link
            href="/admin"
            title="Admin Login"
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            <Lock className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center space-x-3">
          <Link
            href="/admin"
            className="p-2 text-zinc-400 hover:text-white"
            title="Admin"
          >
            <Lock className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-200 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-white/10 px-8 py-8 animate-fadeIn">
          <div className="flex flex-col space-y-6 text-sm uppercase tracking-[0.2em] text-zinc-300 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-300 transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}

            {onOpenCompCard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCompCard();
                }}
                className="text-amber-300 flex items-center justify-between text-left py-1"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  View & Download Comp Card
                </span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </button>
            )}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href={`https://wa.me/${profile.contact.bookingWhatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-3 bg-amber-500 text-black font-semibold tracking-wider rounded-md hover:bg-amber-400 transition-colors"
              >
                WhatsApp Booking Direct
              </a>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs text-zinc-400 border border-white/10 rounded-md hover:text-white"
              >
                Model / Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
