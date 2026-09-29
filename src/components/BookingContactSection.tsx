'use client';

import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { ContactInfo, SocialLinks } from '@/lib/types';
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/SocialIcons';

interface BookingContactSectionProps {
  contact: ContactInfo;
  socials: SocialLinks;
}

export default function BookingContactSection({ contact, socials }: BookingContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandOrAgency: '',
    projectType: 'Commercial Campaign',
    shootDate: '',
    budget: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit booking inquiry');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        brandOrAgency: '',
        projectType: 'Commercial Campaign',
        shootDate: '',
        budget: '',
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const contactChannels = [
    {
      label: 'Email',
      icon: <Mail className="w-5 h-5 text-[#111113]" />,
      action: `mailto:${contact.email || 'bookings.mumtahina@gmail.com'}`,
      info: contact.email || 'bookings.mumtahina@gmail.com'
    },
    {
      label: 'WhatsApp',
      icon: <WhatsAppIcon className="w-5 h-5 text-[#111113]" />,
      action: `https://wa.me/8801712894021?text=${encodeURIComponent("Hello Mumtahina! I would like to discuss a fashion / commercial booking inquiry.")}`,
      info: '+880 1712-894021'
    },
    {
      label: 'Instagram',
      icon: <InstagramIcon className="w-5 h-5 text-[#111113]" />,
      action: 'https://www.instagram.com/mumtahinaaa_',
      info: '@mumtahinaaa_'
    },
    {
      label: 'TikTok',
      icon: <TikTokIcon className="w-5 h-5 text-[#111113]" />,
      action: 'https://www.tiktok.com/@mumtahinaaa_2',
      info: '@mumtahinaaa_2'
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#0a0a0c] text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header matching mockup */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center space-x-3 text-xs tracking-[0.24em] uppercase text-zinc-400 font-semibold">
            <span>CONTACT ME</span>
            <span className="w-12 h-[1px] bg-white/20" />
          </div>

          <p className="text-zinc-300 text-sm sm:text-base font-light">
            For brand collaboration, photoshoots, events or any enquiry.
          </p>
        </div>

        {/* 4 Circular Action Cards matching mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.action}
              target={channel.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-sm bg-zinc-900/60 border border-white/10 hover:border-[#dfb299]/50 transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Circular Icon Container */}
              <div className="w-14 h-14 rounded-full bg-[#dfb299] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md mb-4">
                {channel.icon}
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:text-[#dfb299] transition-colors">
                {channel.label}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono pt-1">
                {channel.info}
              </span>
            </a>
          ))}
        </div>

        {/* Direct Booking Inquiry Form */}
        <div className="max-w-3xl mx-auto bg-zinc-950/80 p-8 sm:p-12 rounded-sm border border-white/10 shadow-2xl">
          <div className="text-center space-y-2 pb-8 border-b border-white/10">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-white uppercase tracking-wider">
              Direct Booking &amp; Campaign Inquiry
            </h3>
            <p className="text-xs text-zinc-400 tracking-wide font-light">
              Submit your inquiry directly to Mumtahina and her management team.
            </p>
          </div>

          {success ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-serif-luxury text-2xl text-white">Inquiry Received</h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Thank you! Your inquiry has been safely stored. Mumtahina&apos;s management team will contact you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-6 py-2 rounded-full border border-white/20 text-xs uppercase tracking-wider text-zinc-300 hover:text-white"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-8 space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-sm text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#dfb299]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@agency.com"
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-sm text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#dfb299]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1712..."
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-sm text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#dfb299]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                    Brand or Agency
                  </label>
                  <input
                    type="text"
                    value={formData.brandOrAgency}
                    onChange={(e) => setFormData({ ...formData, brandOrAgency: e.target.value })}
                    placeholder="e.g. Vogue South Asia / Aarong"
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-sm text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#dfb299]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-[#dfb299]"
                  >
                    <option value="Commercial Campaign">Commercial Campaign</option>
                    <option value="Bridal & Festive Shoot">Bridal &amp; Festive Shoot</option>
                    <option value="Editorial & Cover Shoot">Editorial &amp; Cover Shoot</option>
                    <option value="Runway & Fashion Week">Runway &amp; Fashion Week</option>
                    <option value="Brand Ambassadorship">Brand Ambassadorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                    Estimated Shoot Date
                  </label>
                  <input
                    type="date"
                    value={formData.shootDate}
                    onChange={(e) => setFormData({ ...formData, shootDate: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-[#dfb299]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                  Message / Project Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the concept, moodboard, locations, and requirements..."
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-sm text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#dfb299]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#dfb299] hover:bg-[#cf9f85] text-[#111113] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 shadow-xl cursor-pointer disabled:opacity-50"
              >
                {loading ? 'TRANSMITTING INQUIRY...' : 'TRANSMIT BOOKING INQUIRY'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
