'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YouTubeIcon, TikTokIcon } from '@/components/SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'VIDEO', href: '#video' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer className="bg-[#070709] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Top Row: Brand, Nav, Socials */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          {/* Logo (Stacked Serif) */}
          <Link href="/" className="flex flex-col text-center lg:text-left group">
            <span className="font-serif-luxury text-xl tracking-[0.2em] font-semibold uppercase leading-tight group-hover:text-[#dfb299] transition-colors">
              MUMTAHINA
            </span>
            <span className="font-serif-luxury text-xl tracking-[0.2em] font-semibold uppercase leading-tight group-hover:text-[#dfb299] transition-colors">
              JAHAN
            </span>
          </Link>

          {/* Center Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Socials */}
          <div className="flex items-center space-x-5 text-zinc-400">
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
        </div>

        {/* Bottom Row: Copyright + Back to Top */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-light">
          <p>© 2026 Mumtahina Jahan. All Rights Reserved.</p>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#dfb299] hover:bg-[#dfb299]/10 transition-all duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
