# Mumtahina — Official Model Portfolio & Admin CMS

A high-fashion, editorial portfolio website and self-service Admin Content Management System (CMS) designed for Bangladeshi fashion, bridal, commercial, and runway model **Mumtahina**.

---

## 🌟 Features

### 1. High-Fashion Public Portfolio
- **Editorial Hero Showcase**: Full-bleed luxury photography carousel, atmospheric gold gradients, and quick model statistics ticker.
- **Model Biometrics & Measurements**:
  - Height (5'8.5" / 174 cm), Bust, Waist, Hips, Shoe size, Dress size, Eye color, Hair color, Skin tone.
- **Official Model Composite Card (Comp Card)**:
  - Standard agency 4-photo polaroid layout (Headshot, Profile, Full-Body, Editorial).
  - One-click **Print / Download PDF** for casting directors and agencies.
- **Lookbook & Portfolio Gallery with Category Filters**:
  - *Bridal & Jamdani* (Dhakai Jamdani, Rajshahi Silk, Benarasi)
  - *High Fashion Editorial* (Milan & Dhaka avant-garde spreads)
  - *Commercial & Brands* (Taaga, Aarong, Yellow, Sailor, Apex)
  - *Runway & Catwalk* (Dhaka Fashion Week, Lakme South Asia showcase)
  - *Beauty & Portraits*
  - **Interactive Lightbox**: Fullscreen high-resolution zoom, shoot credits (Photographer, Client/Brand, Location, Year, Category story).
- **Career Narrative & Highlights**:
  - Story of elevating Bangladeshi heritage textiles into contemporary couture.
- **Brand Collaborations & Press Features**:
  - Logos & typography of premier fashion houses.
  - Editorial quotes from *Vogue South Asia*, *The Daily Star*, and *ICE Today*.
- **Casting & Booking Inquiries**:
  - Direct inquiry form for casting directors, brands, and photographers.
  - Instant response dispatch into the model's admin inbox.
  - Direct **WhatsApp Booking CTA** for fast casting coordination.

---

### 2. Self-Service Admin Panel (`/admin`)
Mumtahina can easily manage the entire website on her own without writing code:
- **Dashboard Overview**:
  - Live counts of total photos, pending inquiries, featured hero shots, and quick actions.
- **Photo & Lookbook Manager**:
  - Add new photos with direct file upload from phone/laptop or paste image URLs.
  - Assign categories, photographer credits, brand clients, year, and tags.
  - Toggle "Feature on Hero" (pins to top slideshow).
  - Edit or delete photos anytime.
- **Measurements & Profile Editor**:
  - Update physical measurements (Height, Bust, Waist, Hips, Shoes, Eyes, Hair).
  - Edit bio paragraphs and representation agency details.
  - Update contact information, email, phone, and WhatsApp numbers.
  - Update Instagram, Facebook, TikTok links.
- **Bookings & Inquiries Inbox**:
  - View all incoming casting calls and shoot inquiries.
  - 1-click **"WhatsApp Client"** button (opens WhatsApp with a prefilled message).
  - 1-click **"Email Response"** button.
  - Change status (`New`, `Reviewed`, `Contacted`, `Booked`, `Archived`).
- **Brand & Press Manager**:
  - Manage brand partners and magazine review quotes.
- **Settings & Security**:
  - Change admin password.
  - 1-click download of full site data backup (JSON).
  - 1-click restore to demo seed data.

---

## 🔑 Admin Credentials

| Parameter | Value |
|-----------|-------|
| **Admin URL** | [http://localhost:3000/admin](http://localhost:3000/admin) |
| **Username** | `admin` |
| **Password** | `mumtahina2026` |

*(Mumtahina can change this password anytime in Admin -> Settings)*

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies (already completed)
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser:
# Public Portfolio: http://localhost:3000
# Admin CMS:       http://localhost:3000/admin
```

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 with bespoke luxury typography & gold accents
- **Language**: TypeScript
- **Icons**: Lucide React + custom inline vectors
- **Persistence**: File-based atomic JSON storage (`data/db.json`)
- **Uploads**: Native Next.js multipart form-data image upload handler (`public/uploads`)
