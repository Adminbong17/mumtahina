'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  LogOut,
  LayoutDashboard,
  Images,
  UserCheck,
  Inbox,
  Award,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink,
  Upload,
  RefreshCw,
  Search,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ArrowLeft,
  KeyRound,
  Download,
  Film,
  Play,
  Music2
} from 'lucide-react';
import { SiteData, PortfolioItem, BookingInquiry, Category, ModelProfile, BrandPartner, PressFeature, ReelItem } from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('mumtahina2026');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'photos' | 'reels' | 'profile' | 'inquiries' | 'brands' | 'settings'>('dashboard');

  // Site Data State
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Photo Add/Edit Modal
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PortfolioItem | null>(null);
  const [photoFormData, setPhotoFormData] = useState({
    title: '',
    category: 'bridal' as Category,
    imageUrl: '',
    photographer: '',
    client: '',
    year: '2026',
    location: '',
    description: '',
    tags: '',
    featured: false,
    aspectRatio: 'tall' as 'tall' | 'square' | 'wide'
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reel State
  const [reelModalOpen, setReelModalOpen] = useState(false);
  const [reelFormData, setReelFormData] = useState({
    title: '',
    thumbnailUrl: '',
    platform: 'instagram' as 'instagram' | 'tiktok',
    externalUrl: 'https://www.instagram.com/mumtahinaaa_',
    views: '1.2M',
    likes: '100K',
    audioTitle: 'Trending Reel Audio',
    caption: ''
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState<ModelProfile | null>(null);

  // Security password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check login on load
  useEffect(() => {
    checkAuth();
  }, []);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const loadData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        setSiteData(data);
        setProfileForm(data.profile);
      }
    } catch (err) {
      console.error(err);
      showStatus('error', 'Failed to load site data');
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username: usernameInput,
          password: passwordInput
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setAuthError(data.message || 'Invalid credentials');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Image file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPhotoFormData(prev => ({ ...prev, imageUrl: data.url }));
        showStatus('success', 'Image uploaded successfully!');
      } else {
        showStatus('error', data.message || 'Image upload failed');
      }
    } catch {
      showStatus('error', 'Image upload failed. Try pasting an image URL instead.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Photo Add / Edit submit
  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFormData.title || !photoFormData.imageUrl) {
      showStatus('error', 'Please provide a title and image');
      return;
    }

    try {
      const url = '/api/portfolio';
      const method = editingPhoto ? 'PUT' : 'POST';
      const payload = editingPhoto
        ? { id: editingPhoto.id, ...photoFormData }
        : photoFormData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('success', editingPhoto ? 'Photo updated successfully' : 'Photo added to lookbook!');
        setPhotoModalOpen(false);
        setEditingPhoto(null);
        loadData();
      } else {
        showStatus('error', data.message || 'Failed to save photo');
      }
    } catch {
      showStatus('error', 'Failed to save photo');
    }
  };

  const handleDeletePhoto = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the portfolio?`)) return;

    try {
      const res = await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('success', 'Photo removed');
        loadData();
      } else {
        showStatus('error', data.message || 'Failed to delete photo');
      }
    } catch {
      showStatus('error', 'Failed to delete photo');
    }
  };

  const handleToggleFeatured = async (photo: PortfolioItem) => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: photo.id, featured: !photo.featured })
      });
      if (res.ok) {
        showStatus('success', photo.featured ? 'Unmarked as featured' : 'Marked as featured on hero');
        loadData();
      }
    } catch {
      showStatus('error', 'Could not update status');
    }
  };

  // Reel actions
  const handleSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelFormData.title || !reelFormData.thumbnailUrl || !reelFormData.externalUrl) {
      showStatus('error', 'Please provide a title, thumbnail, and external link');
      return;
    }

    try {
      const res = await fetch('/api/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reelFormData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('success', 'Reel added successfully!');
        setReelModalOpen(false);
        setReelFormData({
          title: '',
          thumbnailUrl: '',
          platform: 'instagram',
          externalUrl: 'https://www.instagram.com/mumtahinaaa_',
          views: '1.2M',
          likes: '100K',
          audioTitle: 'Trending Reel Audio',
          caption: ''
        });
        loadData();
      } else {
        showStatus('error', data.message || 'Failed to save reel');
      }
    } catch {
      showStatus('error', 'Failed to save reel');
    }
  };

  const handleDeleteReel = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete reel "${title}"?`)) return;

    try {
      const res = await fetch(`/api/reels?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('success', 'Reel deleted');
        loadData();
      } else {
        showStatus('error', data.message || 'Failed to delete reel');
      }
    } catch {
      showStatus('error', 'Failed to delete reel');
    }
  };

  // Save Profile & Measurements
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm) return;

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('success', 'Model profile & measurements saved successfully!');
        loadData();
      } else {
        showStatus('error', data.message || 'Failed to save profile');
      }
    } catch {
      showStatus('error', 'Failed to save profile');
    }
  };

  // Inquiry Status update
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        showStatus('success', `Inquiry status changed to ${newStatus}`);
        loadData();
      }
    } catch {
      showStatus('error', 'Failed to update status');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showStatus('success', 'Inquiry deleted');
        loadData();
      }
    } catch {
      showStatus('error', 'Failed to delete inquiry');
    }
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showStatus('error', 'New passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change-password',
          password: currentPassword,
          newPassword
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('success', 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showStatus('error', data.message || 'Failed to update password');
      }
    } catch {
      showStatus('error', 'Failed to update password');
    }
  };

  // Reset database to default
  const handleResetData = async () => {
    if (!confirm('Are you sure you want to reset all portfolio data back to default demo state?')) return;
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' })
      });
      if (res.ok) {
        showStatus('success', 'Reset complete. Default data restored.');
        loadData();
      }
    } catch {
      showStatus('error', 'Reset failed');
    }
  };

  // ===================== LOGIN VIEW =====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-white relative">
        <div className="max-w-md w-full bg-[#121216] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-serif-luxury text-3xl font-light tracking-wider uppercase">
              Mumtahina CMS
            </h1>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
              Model Administration Portal
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-zinc-400 block font-mono">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-[11px] leading-relaxed">
              <strong>Initial Credentials for Mumtahina:</strong>
              <div className="font-mono mt-1 text-zinc-300">
                User: <span className="text-white font-bold">admin</span> | Password: <span className="text-white font-bold">mumtahina2026</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {authLoading ? 'Signing in...' : 'Sign In To Admin'}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===================== AUTHENTICATED DASHBOARD =====================
  const inquiries = siteData?.inquiries || [];
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const portfolioList = siteData?.portfolio || [];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#121216] border-b border-white/10 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-serif-luxury text-xl md:text-2xl text-white tracking-widest font-light uppercase">
              Mumtahina
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] uppercase tracking-widest font-mono font-bold">
              Admin CMS
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-wider text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 rounded-lg hover:bg-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Status Banner */}
      {statusMessage && (
        <div
          className={`px-6 py-3 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500 text-black font-semibold'
              : 'bg-rose-500 text-white'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 hover:text-white'
            }`}
          >
            <Images className="w-4 h-4" />
            <span>Lookbook & Photos ({portfolioList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'reels'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Reels & Videos ({(siteData?.reels || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Measurements & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer relative ${
              activeTab === 'inquiries'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Bookings & Inquiries ({inquiries.length})</span>
            {newInquiriesCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-rose-500 text-white font-bold">
                {newInquiriesCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('brands')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'brands'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Brands & Press</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* ===================== TAB 1: DASHBOARD ===================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Total Photos</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-luxury text-4xl text-white font-light">{portfolioList.length}</span>
                  <span className="text-xs text-amber-400">In Lookbook</span>
                </div>
              </div>

              <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">New Bookings</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-luxury text-4xl text-amber-300 font-light">{newInquiriesCount}</span>
                  <span className="text-xs text-zinc-400">Needs Response</span>
                </div>
              </div>

              <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Featured Hero Shots</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-luxury text-4xl text-white font-light">
                    {portfolioList.filter(p => p.featured).length}
                  </span>
                  <span className="text-xs text-zinc-400">Active</span>
                </div>
              </div>

              <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Model Status</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-luxury text-2xl text-emerald-400 font-medium">Available</span>
                  <span className="text-xs text-zinc-400">Worldwide</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-amber-400 font-mono mb-4">Quick Management Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setEditingPhoto(null);
                    setPhotoFormData({
                      title: '',
                      category: 'bridal',
                      imageUrl: '',
                      photographer: '',
                      client: '',
                      year: '2026',
                      location: '',
                      description: '',
                      tags: '',
                      featured: false,
                      aspectRatio: 'tall'
                    });
                    setPhotoModalOpen(true);
                  }}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload / Add New Photo</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Edit Measurements & Stats</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Inbox className="w-4 h-4 text-amber-400" />
                  <span>View All Inquiries ({inquiries.length})</span>
                </button>
              </div>
            </div>

            {/* Recent Inquiries List */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif-luxury text-xl text-white font-medium">Recent Booking Inquiries</h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  View All &rarr;
                </button>
              </div>

              {inquiries.length === 0 ? (
                <p className="text-zinc-500 text-sm py-4">No inquiries received yet.</p>
              ) : (
                <div className="divide-y divide-white/5">
                  {inquiries.slice(0, 3).map((item) => (
                    <div key={item.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white text-sm">{item.name}</span>
                          <span className="text-xs text-zinc-400">({item.brandOrAgency})</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                              item.status === 'new'
                                ? 'bg-amber-400 text-black'
                                : item.status === 'booked'
                                ? 'bg-emerald-500 text-black'
                                : 'bg-zinc-800 text-zinc-300'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">{item.message}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.phone && (
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name)},%20thank%20you%20for%20reaching%20out%20to%20Mumtahina.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-lg hover:bg-emerald-500/30 flex items-center gap-1.5"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Reply
                          </a>
                        )}

                        <a
                          href={`mailto:${item.email}?subject=Mumtahina%20Booking%20Inquiry%20Response`}
                          className="px-3 py-1.5 bg-white/10 text-zinc-200 text-xs rounded-lg hover:bg-white/20 flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" /> Email
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: PHOTOS / LOOKBOOK ===================== */}
        {activeTab === 'photos' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-luxury text-2xl text-white font-medium">Portfolio & Lookbook</h3>
                <p className="text-xs text-zinc-400">Add, edit, or delete photographs displayed on the public website.</p>
              </div>

              <button
                onClick={() => {
                  setEditingPhoto(null);
                  setPhotoFormData({
                    title: '',
                    category: 'bridal',
                    imageUrl: '',
                    photographer: '',
                    client: '',
                    year: '2026',
                    location: '',
                    description: '',
                    tags: '',
                    featured: false,
                    aspectRatio: 'tall'
                  });
                  setPhotoModalOpen(true);
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioList.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-[#121216] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative aspect-[3/4] bg-black">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      sizes="25vw"
                      className="object-cover object-top"
                    />

                    {photo.featured && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider z-10">
                        Featured
                      </span>
                    )}

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-zinc-300 text-[10px] uppercase z-10">
                      {photo.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-serif-luxury text-base text-white font-medium line-clamp-1">{photo.title}</h4>
                      <p className="text-xs text-zinc-400">{photo.client} · {photo.year}</p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleToggleFeatured(photo)}
                        className={`text-[11px] font-mono cursor-pointer ${
                          photo.featured ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {photo.featured ? '★ Starred' : '☆ Pin to Hero'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingPhoto(photo);
                            setPhotoFormData({
                              title: photo.title,
                              category: photo.category,
                              imageUrl: photo.imageUrl,
                              photographer: photo.photographer,
                              client: photo.client,
                              year: photo.year,
                              location: photo.location || '',
                              description: photo.description || '',
                              tags: Array.isArray(photo.tags) ? photo.tags.join(', ') : '',
                              featured: photo.featured,
                              aspectRatio: photo.aspectRatio || 'tall'
                            });
                            setPhotoModalOpen(true);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeletePhoto(photo.id, photo.title)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: REELS & VIDEOS ===================== */}
        {activeTab === 'reels' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-luxury text-2xl text-white font-medium">Trending Reels & Videos</h3>
                <p className="text-xs text-zinc-400">Manage short-form viral videos, catwalk walks, and beauty transformations.</p>
              </div>

              <button
                onClick={() => setReelModalOpen(true)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Reel / Video</span>
              </button>
            </div>

            {/* Reels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(siteData?.reels || []).map((reel) => (
                <div
                  key={reel.id}
                  className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative aspect-[9/16] bg-black max-h-[380px]">
                    <Image
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-amber-300 text-[10px] uppercase font-bold tracking-wider z-10">
                      {reel.platform}
                    </span>

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-zinc-300 text-[10px] font-mono z-10">
                      {reel.views} views
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                      <p className="text-[11px] text-amber-300 font-mono line-clamp-1">{reel.audioTitle}</p>
                      <h4 className="font-serif-luxury text-sm font-medium line-clamp-1">{reel.title}</h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-zinc-400 line-clamp-2">{reel.caption}</p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <a
                        href={reel.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
                      >
                        <span>Open Link</span> <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => handleDeleteReel(reel.id, reel.title)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded cursor-pointer"
                        title="Delete Reel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: PROFILE & MEASUREMENTS ===================== */}
        {activeTab === 'profile' && profileForm && (
          <form onSubmit={handleSaveProfile} className="space-y-8 animate-fadeIn max-w-4xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif-luxury text-2xl text-white font-medium">Model Profile & Biometrics</h3>
                <p className="text-xs text-zinc-400">Update model measurements, bio, representation agency, and contact info.</p>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>

            {/* Basic Info */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono">Core Identity & Agency</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Model Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Subtitle / Profession</label>
                  <input
                    type="text"
                    value={profileForm.subtitle}
                    onChange={(e) => setProfileForm({ ...profileForm, subtitle: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Headline Statement</label>
                  <input
                    type="text"
                    value={profileForm.headline}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Agency Representation</label>
                  <input
                    type="text"
                    value={profileForm.agency}
                    onChange={(e) => setProfileForm({ ...profileForm, agency: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            {/* Model Measurements Grid */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono">Biometric Measurements (For Castings)</h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Height</label>
                  <input
                    type="text"
                    value={profileForm.measurements.height}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, height: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Bust</label>
                  <input
                    type="text"
                    value={profileForm.measurements.bust}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, bust: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Waist</label>
                  <input
                    type="text"
                    value={profileForm.measurements.waist}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, waist: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Hips</label>
                  <input
                    type="text"
                    value={profileForm.measurements.hips}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, hips: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Shoe Size</label>
                  <input
                    type="text"
                    value={profileForm.measurements.shoes}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, shoes: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Dress Size</label>
                  <input
                    type="text"
                    value={profileForm.measurements.dress}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, dress: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Eye Color</label>
                  <input
                    type="text"
                    value={profileForm.measurements.eyes}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, eyes: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Hair Color</label>
                  <input
                    type="text"
                    value={profileForm.measurements.hair}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, hair: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Skin Tone</label>
                  <input
                    type="text"
                    value={profileForm.measurements.skin}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        measurements: { ...profileForm.measurements, skin: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            {/* Bio Paragraphs */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono">Career Bio Paragraphs</h4>

              {profileForm.bio.map((paragraph, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-xs uppercase text-zinc-400 block">Paragraph {idx + 1}</label>
                  <textarea
                    rows={3}
                    value={paragraph}
                    onChange={(e) => {
                      const updatedBio = [...profileForm.bio];
                      updatedBio[idx] = e.target.value;
                      setProfileForm({ ...profileForm, bio: updatedBio });
                    }}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg p-3 text-sm text-white resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Contact & Socials */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono">Contact & Social Links</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Booking Email</label>
                  <input
                    type="email"
                    value={profileForm.contact.email}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, email: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Phone Line</label>
                  <input
                    type="text"
                    value={profileForm.contact.phone}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, phone: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">WhatsApp Number (e.g. +880...)</label>
                  <input
                    type="text"
                    value={profileForm.contact.bookingWhatsApp}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, bookingWhatsApp: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={profileForm.socials.instagram}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, instagram: e.target.value }
                      })
                    }
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* ===================== TAB 4: BOOKING INQUIRIES ===================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-2xl text-white font-medium">Casting & Booking Inquiries</h3>
                <p className="text-xs text-zinc-400">Incoming requests from fashion directors, brands, and photographers.</p>
              </div>

              <span className="text-xs font-mono text-zinc-400">
                Total: {inquiries.length} | New: {newInquiriesCount}
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-[#121216] border border-white/10 rounded-2xl p-12 text-center text-zinc-500">
                No inquiries received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-[#121216] border rounded-2xl p-6 transition-all ${
                      inq.status === 'new' ? 'border-amber-400/50 bg-[#16161c]' : 'border-white/10'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-serif-luxury text-xl text-white font-medium">{inq.name}</h4>
                          <span className="text-xs text-zinc-400 font-mono">({inq.brandOrAgency})</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                              inq.status === 'new'
                                ? 'bg-amber-400 text-black'
                                : inq.status === 'booked'
                                ? 'bg-emerald-500 text-black'
                                : inq.status === 'contacted'
                                ? 'bg-blue-500 text-white'
                                : inq.status === 'reviewed'
                                ? 'bg-purple-500 text-white'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-mono">
                          <span>Project: <strong className="text-zinc-200">{inq.projectType}</strong></span>
                          {inq.shootDate && <span>Date: <strong className="text-zinc-200">{inq.shootDate}</strong></span>}
                          {inq.budget && <span>Budget: <strong className="text-amber-300">{inq.budget}</strong></span>}
                          <span>Received: {new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="p-4 bg-[#181820] rounded-xl text-zinc-300 text-sm leading-relaxed mt-2">
                          {inq.message}
                        </div>
                      </div>

                      {/* Inquiry Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Mumtahina's%20management.%20Regarding%20your%20booking%20request:`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Client
                          </a>
                        )}

                        <a
                          href={`mailto:${inq.email}?subject=Mumtahina%20Booking%20Inquiry%20-%20${encodeURIComponent(inq.brandOrAgency)}`}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" /> Email Response
                        </a>

                        <div className="flex items-center gap-1 pt-1">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="bg-[#181820] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-300 flex-1"
                          >
                            <option value="new">Mark New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="booked">Booked</option>
                            <option value="archived">Archived</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 5: BRANDS & PRESS ===================== */}
        {activeTab === 'brands' && siteData && (
          <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif-luxury text-xl text-white font-medium">Brand Collaborations</h3>
              <p className="text-xs text-zinc-400">Current featured brands displayed on portfolio.</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {siteData.brands.map((b) => (
                  <div key={b.id} className="p-4 bg-[#181820] border border-white/5 rounded-xl text-center">
                    <span className="font-serif-luxury text-white font-medium block">{b.logoText}</span>
                    <span className="text-[10px] text-zinc-400">{b.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif-luxury text-xl text-white font-medium">Press & Magazine Quotes</h3>
              <div className="space-y-3">
                {siteData.press.map((p) => (
                  <div key={p.id} className="p-4 bg-[#181820] border border-white/5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs text-amber-400">
                      <span>{p.publication}</span>
                      <span className="text-zinc-500">{p.date}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{p.title}</p>
                    {p.quote && <p className="text-xs text-zinc-400 italic">&ldquo;{p.quote}&rdquo;</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 6: SETTINGS ===================== */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fadeIn max-w-2xl">
            {/* Change Password */}
            <form onSubmit={handleChangePassword} className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
                <KeyRound className="w-4 h-4" />
                <span>Security & Admin Password</span>
              </div>
              <p className="text-xs text-zinc-400">
                Mumtahina can change her login password at any time.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>

            {/* Backup & Reset */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono block">Data Backup & Recovery</span>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/api/data"
                  download="mumtahina-portfolio-backup.json"
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Backup JSON</span>
                </a>

                <button
                  onClick={handleResetData}
                  className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restore Demo Seed Data</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================== PHOTO ADD/EDIT MODAL ===================== */}
      {photoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setPhotoModalOpen(false)}
        >
          <div
            className="max-w-2xl w-full bg-[#121216] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl my-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif-luxury text-xl text-white font-medium">
                {editingPhoto ? 'Edit Photo Details' : 'Add New Portfolio Photo'}
              </h3>
              <button
                onClick={() => setPhotoModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              {/* Image Source (Upload OR URL) */}
              <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-400 block font-mono">
                  Photo Image * (Upload file or paste URL)
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={photoFormData.imageUrl}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, imageUrl: e.target.value })}
                    placeholder="https://... or upload below"
                    className="flex-1 bg-[#181820] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"
                  />

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="px-4 py-2.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 rounded-lg text-xs font-semibold uppercase flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                  </button>
                </div>

                {/* Preview Thumbnail */}
                {photoFormData.imageUrl && (
                  <div className="relative w-28 h-36 rounded-lg overflow-hidden border border-white/10 mt-2">
                    <Image
                      src={photoFormData.imageUrl}
                      alt="Preview"
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={photoFormData.title}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, title: e.target.value })}
                    placeholder="e.g. Royal Jamdani Saree"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Category *</label>
                  <select
                    value={photoFormData.category}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, category: e.target.value as Category })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="bridal">Bridal & Jamdani</option>
                    <option value="editorial">High Fashion Editorial</option>
                    <option value="commercial">Commercial & Brands</option>
                    <option value="runway">Runway & Catwalk</option>
                    <option value="beauty">Beauty & Portraits</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Client / Brand</label>
                  <input
                    type="text"
                    value={photoFormData.client}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, client: e.target.value })}
                    placeholder="e.g. Aarong Heritage"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Photographer</label>
                  <input
                    type="text"
                    value={photoFormData.photographer}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, photographer: e.target.value })}
                    placeholder="e.g. Rafiqul Islam Studio"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Year</label>
                  <input
                    type="text"
                    value={photoFormData.year}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Location</label>
                  <input
                    type="text"
                    value={photoFormData.location}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, location: e.target.value })}
                    placeholder="e.g. Panam City / Dhaka"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase text-zinc-400 block mb-1">Story / Shoot Description</label>
                <textarea
                  rows={2}
                  value={photoFormData.description}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, description: e.target.value })}
                  placeholder="Details about ensemble, concept, drapery..."
                  className="w-full bg-[#181820] border border-white/10 rounded-lg p-3 text-sm text-white resize-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase text-zinc-400 block mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={photoFormData.tags}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, tags: e.target.value })}
                  placeholder="Bridal, Jamdani, Saree, Gold"
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={photoFormData.featured}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-700 text-amber-500 focus:ring-0"
                />
                <label htmlFor="featuredToggle" className="text-xs text-zinc-300">
                  Feature on Hero Slideshow (High priority showcase)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setPhotoModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white text-xs uppercase"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider rounded-lg"
                >
                  {editingPhoto ? 'Save Changes' : 'Add To Lookbook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== REEL ADD MODAL ===================== */}
      {reelModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setReelModalOpen(false)}
        >
          <div
            className="max-w-lg w-full bg-[#121216] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl my-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif-luxury text-xl text-white font-medium">
                Add Viral Reel / Fashion Video
              </h3>
              <button
                onClick={() => setReelModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveReel} className="space-y-4">
              <div>
                <label className="text-xs uppercase text-zinc-400 block mb-1">Reel Title *</label>
                <input
                  type="text"
                  required
                  value={reelFormData.title}
                  onChange={(e) => setReelFormData({ ...reelFormData, title: e.target.value })}
                  placeholder="e.g. Traditional Jamdani Saree Transition"
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Platform *</label>
                  <select
                    value={reelFormData.platform}
                    onChange={(e) => setReelFormData({ ...reelFormData, platform: e.target.value as 'instagram' | 'tiktok' })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="instagram">Instagram Reel</option>
                    <option value="tiktok">TikTok Video</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Views Count</label>
                  <input
                    type="text"
                    value={reelFormData.views}
                    onChange={(e) => setReelFormData({ ...reelFormData, views: e.target.value })}
                    placeholder="e.g. 1.2M"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase text-zinc-400 block mb-1">Thumbnail Image URL *</label>
                <input
                  type="text"
                  required
                  value={reelFormData.thumbnailUrl}
                  onChange={(e) => setReelFormData({ ...reelFormData, thumbnailUrl: e.target.value })}
                  placeholder="https://... image link"
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs uppercase text-zinc-400 block mb-1">External Reel URL *</label>
                <input
                  type="text"
                  required
                  value={reelFormData.externalUrl}
                  onChange={(e) => setReelFormData({ ...reelFormData, externalUrl: e.target.value })}
                  placeholder="https://www.instagram.com/reel/... or https://www.tiktok.com/..."
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Likes Count</label>
                  <input
                    type="text"
                    value={reelFormData.likes}
                    onChange={(e) => setReelFormData({ ...reelFormData, likes: e.target.value })}
                    placeholder="e.g. 110K"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-400 block mb-1">Audio / Sound Title</label>
                  <input
                    type="text"
                    value={reelFormData.audioTitle}
                    onChange={(e) => setReelFormData({ ...reelFormData, audioTitle: e.target.value })}
                    placeholder="e.g. Bengali Sitar Lo-Fi"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase text-zinc-400 block mb-1">Caption / Hashtags</label>
                <textarea
                  rows={2}
                  value={reelFormData.caption}
                  onChange={(e) => setReelFormData({ ...reelFormData, caption: e.target.value })}
                  placeholder="Reel caption and tags..."
                  className="w-full bg-[#181820] border border-white/10 rounded-lg p-3 text-sm text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setReelModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white text-xs uppercase"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider rounded-lg"
                >
                  Save Reel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
