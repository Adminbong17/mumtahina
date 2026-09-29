'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { ModelProfile } from '@/lib/types';

interface BookingContactSectionProps {
  profile: ModelProfile;
}

export default function BookingContactSection({ profile }: BookingContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandOrAgency: '',
    projectType: 'Campaign / Commercial',
    shootDate: '',
    budget: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(data.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          brandOrAgency: '',
          projectType: 'Campaign / Commercial',
          shootDate: '',
          budget: '',
          message: ''
        });
      } else {
        setError(data.message || 'Failed to submit inquiry. Please try again or message via WhatsApp.');
      }
    } catch {
      setError('Network connection error. Please try reaching out via direct WhatsApp or email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info & WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
                <Mail className="w-3.5 h-3.5" />
                <span>Castings & Collaborations</span>
              </div>
              <h2 className="font-serif-luxury text-4xl md:text-5xl text-white font-light tracking-wide uppercase">
                Book Mumtahina
              </h2>
              <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                Available for editorial shoots, runway fashion weeks, bridal haute couture, television commercials, and international brand ambassadorships.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono">Official Bookings</span>
                  <a href={`mailto:${profile.contact.email}`} className="text-sm font-medium text-white hover:text-amber-300 transition-colors">
                    {profile.contact.email}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono">Direct Management Line</span>
                  <a href={`tel:${profile.contact.phone}`} className="text-sm font-medium text-white hover:text-amber-300 transition-colors">
                    {profile.contact.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono">Agency Representation</span>
                  <p className="text-sm font-medium text-white">{profile.contact.agencyRep}</p>
                  <p className="text-xs text-zinc-400">{profile.contact.address}</p>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <div className="p-6 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/20 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                <span>Urgent Casting or Next-Day Bookings</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Connect directly with Mumtahina&apos;s booking coordinator on WhatsApp for immediate availability and rate sheets.
              </p>
              <a
                href={`https://wa.me/${profile.contact.bookingWhatsApp.replace(/[^0-9]/g, '')}?text=Hello%20Mumtahina,%20we%20have%20an%20urgent%20inquiry%20for%20a%20shoot`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-lg shadow-emerald-950"
              >
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Right Column: Casting Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
              <h3 className="font-serif-luxury text-2xl text-white font-medium mb-2 uppercase">
                Submit Casting Call
              </h3>
              <p className="text-xs text-zinc-400 mb-8 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Official response sent within 24 business hours.</span>
              </p>

              {success && (
                <div className="p-4 mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3 text-emerald-300 text-sm animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                  <p>{success}</p>
                </div>
              )}

              {error && (
                <div className="p-4 mb-6 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 text-sm animate-fadeIn">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Farzana Huq"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. farzana@aarong.com"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                      Contact Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 171X-XXXXXX"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                      Brand / Agency / Production House
                    </label>
                    <input
                      type="text"
                      value={formData.brandOrAgency}
                      onChange={(e) => setFormData({ ...formData, brandOrAgency: e.target.value })}
                      placeholder="e.g. Aarong / Taaga / Vogue BD"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-amber-400/60 transition-colors"
                    >
                      <option value="Campaign / Commercial">Campaign / Commercial</option>
                      <option value="Runway / Fashion Week">Runway / Fashion Week</option>
                      <option value="Bridal / Traditional">Bridal / Traditional</option>
                      <option value="Editorial / Magazine">Editorial / Magazine</option>
                      <option value="Brand Ambassadorship">Brand Ambassadorship</option>
                      <option value="Lookbook Catalog">Lookbook Catalog</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                      Expected Date
                    </label>
                    <input
                      type="date"
                      value={formData.shootDate}
                      onChange={(e) => setFormData({ ...formData, shootDate: e.target.value })}
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g. BDT 250K / Day"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                    Project Brief & Shoot Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding shoot moodboard, location, usage rights (Digital / Print / TVC), wardrobe style, and tentative schedule..."
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-[0.25em] rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Casting Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
