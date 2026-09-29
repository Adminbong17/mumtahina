'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Lock } from 'lucide-react';
import { ModelProfile } from '@/lib/types';
import { InstagramIcon, FacebookIcon, YouTubeIcon, TikTokIcon } from '@/components/SocialIcons';

interface NavbarProps {
  profile: ModelProfile;
  onOpenBooking?: () => void;
}

export default function Navbar({ profile, onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'VIDEO', href: '#video' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleBookClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo (Stacked serif as in mockup) */}
        <Link href="/" className="flex flex-col text-left group">
          <span className="font-serif-luxury text-xl md:text-2xl tracking-[0.22em] text-white font-semibold leading-tight uppercase group-hover:text-[#dfb299] transition-colors">
            MUMTAHINA
          </span>
          <span className="font-serif-luxury text-xl md:text-2xl tracking-[0.22em] text-white font-semibold leading-tight uppercase group-hover:text-[#dfb299] transition-colors">
            JAHAN
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-7 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`hover:text-white transition-colors py-1 relative ${
                link.label === 'HOME' ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#dfb299]' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Socials + Divider + Book Me Button */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Social Icons */}
          <div className="flex items-center space-x-3.5 text-zinc-300">
            <a
              href="https://www.instagram.com/mumtahinaaa_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#dfb299] transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/mumtahina.jahan19"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#dfb299] transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#dfb299] transition-colors"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@mumtahinaaa_2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-[#dfb299] transition-colors"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Thin divider line */}
          <div className="h-4 w-[1px] bg-white/20" />

          {/* Book Me Pill Button */}
          <a
            href="#contact"
            onClick={handleBookClick}
            className="px-5 py-2 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-sm cursor-pointer"
          >
            BOOK ME
          </a>

          {/* Admin link */}
          <Link
            href="/admin"
            title="Admin CMS"
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#dfb299] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#09090b]/98 backdrop-blur-xl z-50 flex flex-col justify-between p-8 border-t border-white/10 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-6 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg tracking-[0.2em] font-serif-luxury uppercase text-zinc-200 hover:text-[#dfb299] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="space-y-6 pt-8 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleBookClick(e);
              }}
              className="block w-full py-3.5 text-center rounded-full bg-[#dfb299] text-black text-xs font-semibold tracking-[0.2em] uppercase cursor-pointer"
            >
              BOOK ME
            </a>

            <div className="flex items-center justify-center space-x-6 text-zinc-300 pt-2">
              <a href="https://www.instagram.com/mumtahinaaa_" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5 hover:text-[#dfb299]" />
              </a>
              <a href="https://www.facebook.com/mumtahina.jahan19" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5 hover:text-[#dfb299]" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <YouTubeIcon className="w-5 h-5 hover:text-[#dfb299]" />
              </a>
              <a href="https://www.tiktok.com/@mumtahinaaa_2" target="_blank" rel="noreferrer" aria-label="TikTok">
                <TikTokIcon className="w-5 h-5 hover:text-[#dfb299]" />
              </a>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Lock className="w-4 h-4 text-zinc-500" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
