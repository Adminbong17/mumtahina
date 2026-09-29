# Supabase Database Setup Guide (বাংলা ও English)

এই প্রজেক্টটিতে **Supabase (PostgreSQL + Cloud Storage + Realtime API)** সম্পূর্ণ ইন্টিগ্রেট করা হয়েছে। 

Vercel-এ ডিপ্লয় করলে স্থানীয় ফাইল সিস্টেমে কিছু সেভ করা যায় না, কিন্তু Supabase ব্যবহার করায়:
1. ভিজিটরদের বুকিং মেসেজ সরাসরি Supabase `inquiries` টেবিলে জমা হবে।
2. অ্যাডমিন প্যানেল (`/admin`) থেকে ছবি, রিলস, বায়ো বা মেজারমেন্টস এডিট করলে তা ক্লাউড ডেটাবেজে স্থায়ীভাবে সেভ থাকবে।
3. নতুন ছবি আপলোড করলে তা সরাসরি Supabase Cloud Storage-এ আপলোড হয়ে যাবে।

---

## ১. Supabase প্রজেক্ট তৈরি করুন:
1. [supabase.com](https://supabase.com) এ গিয়ে একটি ফ্রি একাউন্ট তৈরি করুন বা লগইন করুন।
2. **"New Project"** এ ক্লিক করে একটি প্রজেক্টের নাম দিন (যেমন: `mumtahina-portfolio`), একটি ডাটাবেজ পাসওয়ার্ড দিন এবং যেকোনো কাছাকাছি রিজিওন (যেমন: `Singapore`) সিলেক্ট করে **Create new project** এ ক্লিক করুন।

---

## ২. এক ক্লিকে সম্পূর্ণ ডেটাবেজ ও টেবিল তৈরি করুন:
1. Supabase ড্যাশবোর্ডের বাম পাশের মেনু থেকে **SQL Editor** এ ক্লিক করুন।
2. এই রিপোজিটরির **`supabase/schema.sql`** ফাইলের সব কোড কপি করে SQL Editor-এ পেস্ট করুন।
3. নিচে ডানপাশের সবুজ রঙের **"Run"** বাটনে ক্লিক করুন।
4. ব্যস! সব টেবিল (`profiles`, `portfolio`, `reels`, `brands`, `press`, `inquiries`, `admin_settings`), সিকিউরিটি পলিসি এবং মুমতাহিনার রিয়েল ডাটা স্বয়ংক্রিয়ভাবে ইনসার্ট হয়ে যাবে!

---

## ৩. এনভায়রনমেন্ট ভেরিয়েবল সেট করুন (API Keys):
1. Supabase ড্যাশবোর্ডে **Project Settings** (নিচে গিয়ার আইকন) -> **API** এ যান।
2. সেখান থেকে নিচের দুটি মান কপি করুন:
   * **Project URL**
   * **Project API Keys -> `anon` `public`**

3. **লোকাল ডেভেলপমেন্টের জন্য (`.env.local`):**
   প্রজেক্টের রুট ডিরেক্টরিতে একটি `.env.local` ফাইল তৈরি করে নিচের মতো লিখুন:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

4. **Vercel-এ লাইভ সাইটের জন্য:**
   * [vercel.com](https://vercel.com) ড্যাশবোর্ডে আপনার প্রজেক্ট ওপেন করুন।
   * **Settings** -> **Environment Variables** এ যান।
   * নিচের দুটি ভেরিয়েবল অ্যাড করুন:
     * Key: `NEXT_PUBLIC_SUPABASE_URL`, Value: আপনার Supabase URL
     * Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Value: আপনার Supabase anon key
   * Save করে **Redeploy** এ ক্লিক করুন।

---

## ৪. হাইব্রিড ফলব্যাক নিরাপত্তা:
যদি আপনি এখনো Supabase কী না বসান, তবুও ওয়েবসাইট কোনো ত্রুটি ছাড়াই লোকাল ডেটাবেজ (`data/db.json`) থেকে সম্পূর্ণ সঠিকভাবে চলবে!
