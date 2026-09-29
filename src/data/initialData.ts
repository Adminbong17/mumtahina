import { SiteData } from "@/lib/types";

export const initialSiteData: SiteData = {
  profile: {
    name: "Mumtahina Jahan",
    subtitle: "Fashion Model & Digital Creator · 700K+ Community",
    headline: "Imagine, Believe, Achieve — Defining modern Bangladeshi elegance and contemporary couture.",
    location: "Dhaka, Bangladesh · Available Worldwide",
    agency: "Represented by Mumtahina Management & Select Agencies",
    bio: [
      "Mumtahina Jahan Aria (widely celebrated across South Asia as @mumtahinaaa_) is a premier Bangladeshi fashion model, digital creator, and lifestyle brand ambassador based in Dhaka. With an engaged digital community exceeding 700,000+ followers on Instagram and millions of impressions across social platforms, she stands as one of the most recognizable and magnetic young icons in contemporary Bengal fashion.",
      "With an academic foundation from American International University-Bangladesh (AIUB) following her schooling at Cantonment Girls' Public School & College, Mumtahina seamlessly unites intellect, poise, and high-fashion versatility. Her lookbook spans majestic Dhakai Jamdani and vintage bridal sarees to minimalist modern prêt-à-porter and runway couture.",
      "Fronting major brand campaigns for premier lifestyle labels, haute couturiers, and beauty brands across Bangladesh, Mumtahina continues to inspire her audience with her signature personal mantra: 'Imagine, Believe, Achieve'."
    ],
    measurements: {
      height: "5'7\" (170 cm)",
      bust: "33\" (84 cm)",
      waist: "24.5\" (62 cm)",
      hips: "35.5\" (90 cm)",
      shoes: "38 EU / 7.5 US",
      dress: "34 EU / 4 US",
      eyes: "Deep Espresso",
      hair: "Natural Dark Brunette",
      skin: "Warm Golden Honey"
    },
    compCardImages: {
      headshot: "/uploads/mumtahina_shoot_3.jpg",
      profile: "/uploads/mumtahina_shoot_2.jpg",
      fullBody: "/uploads/mumtahina_shoot_1.jpg",
      fashion: "/uploads/mumtahina_shoot_4.jpg"
    },
    contact: {
      email: "bookings.mumtahina@gmail.com",
      phone: "+880 1712-894021",
      bookingWhatsApp: "+8801712894021",
      agencyRep: "Mumtahina Management (Dhaka Bookings)",
      address: "Dhaka, Bangladesh"
    },
    socials: {
      instagram: "https://www.instagram.com/mumtahinaaa_",
      facebook: "https://www.facebook.com/mumtahina.jahan19",
      tiktok: "https://www.tiktok.com/@mumtahinaaa_2",
      whatsapp: "https://wa.me/8801712894021"
    }
  },
  portfolio: [
    {
      id: "p1",
      title: "Royal Crimson Jamdani",
      category: "bridal",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: true,
      photographer: "Rafiqul Islam Studio",
      client: "Aarong Heritage Bridal",
      year: "2026",
      location: "Panam City, Sonargaon",
      description: "Handwoven golden Zari Jamdani bridal ensemble capturing timeless Bengali royal aesthetics.",
      tags: ["Bridal", "Jamdani", "Heritage", "Saree"],
      createdAt: "2026-03-01T10:00:00Z"
    },
    {
      id: "p2",
      title: "Nocturne Haute Couture",
      category: "editorial",
      imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: true,
      photographer: "Elena Vance (Milan)",
      client: "Canvas Fashion Magazine",
      year: "2026",
      location: "Dhaka Art Summit",
      description: "Monochrome architectural silhouette editorial exploring avant-garde drapery.",
      tags: ["Editorial", "High Fashion", "Black & White"],
      createdAt: "2026-02-15T11:00:00Z"
    },
    {
      id: "p3",
      title: "Summer Muslin Breeze",
      category: "commercial",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: true,
      photographer: "Kazi Tahsin",
      client: "Taaga Festive Collection",
      year: "2025",
      location: "Cox's Bazar Coast",
      description: "Spring/Summer contemporary ready-to-wear campaign celebrating lightweight natural Bengal fabrics.",
      tags: ["Commercial", "Taaga", "Ready to Wear"],
      createdAt: "2025-11-20T09:30:00Z"
    },
    {
      id: "p4",
      title: "Bengal Khadi Runway",
      category: "runway",
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: true,
      photographer: "Fashion Guild Live",
      client: "Dhaka Fashion Week Gala",
      year: "2025",
      location: "InterContinental Dhaka",
      description: "Grand Finale showstopper walking for renowned couturier Bibi Russell.",
      tags: ["Runway", "Catwalk", "Dhaka Fashion Week"],
      createdAt: "2025-10-14T18:00:00Z"
    },
    {
      id: "p5",
      title: "Golden Hour Sunkissed",
      category: "beauty",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "square",
      featured: true,
      photographer: "Mahir Zaman",
      client: "L'Oréal Paris South Asia",
      year: "2026",
      location: "Gulshan Lake Pavilion",
      description: "Natural dewy skin and defined Bengali eye portrait highlighting warm undertones.",
      tags: ["Beauty", "Close-up", "Cosmetics"],
      createdAt: "2026-01-10T12:00:00Z"
    },
    {
      id: "p6",
      title: "Emerald Benarasi Elegance",
      category: "bridal",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: false,
      photographer: "Dream Weaver Stories",
      client: "Zardosi Couture",
      year: "2025",
      location: "Ahsan Manzil, Old Dhaka",
      description: "Emerald green vintage weave with antique gold nakshi ornaments.",
      tags: ["Bridal", "Benarasi", "Old Dhaka", "Jewelry"],
      createdAt: "2025-09-05T14:15:00Z"
    },
    {
      id: "p7",
      title: "Minimalist Modernist",
      category: "editorial",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: false,
      photographer: "Sarah Jenkins",
      client: "ICE Today Magazine",
      year: "2025",
      location: "Bengal Shilpalay",
      description: "Structured oversized blazers paired with raw handloom silk trousers.",
      tags: ["Editorial", "Menswear Inspired", "Contemporary"],
      createdAt: "2025-08-12T10:00:00Z"
    },
    {
      id: "p8",
      title: "Urban Pulse Winter",
      category: "commercial",
      imageUrl: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: false,
      photographer: "Nayeem Ahmed",
      client: "Yellow BD Campaign",
      year: "2025",
      location: "Hatirjheel Promenade",
      description: "Winter outerwear and urban street fashion campaign for leading youth brand.",
      tags: ["Commercial", "Streetwear", "Yellow BD"],
      createdAt: "2025-12-01T15:00:00Z"
    },
    {
      id: "p9",
      title: "Silk Saree Flow",
      category: "bridal",
      imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: false,
      photographer: "Studio Bengal",
      client: "Chondon Dhaka",
      year: "2026",
      location: "Sylhet Tea Gardens",
      description: "Ethereal pastel organza and hand-embroidered pearls in natural daylight.",
      tags: ["Bridal", "Pastel", "Organza"],
      createdAt: "2026-02-28T09:00:00Z"
    },
    {
      id: "p10",
      title: "Vogue South Asia Feature",
      category: "editorial",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "tall",
      featured: true,
      photographer: "Arjun Verma",
      client: "Vogue South Asia Voices",
      year: "2026",
      location: "Padma River Sandbars",
      description: "A celebration of modern Bengal identity, featuring riverine natural backdrops.",
      tags: ["Editorial", "Vogue", "Cover Story"],
      createdAt: "2026-03-10T16:00:00Z"
    }
  ],
  reels: [
    {
      id: "r1",
      title: "Royal Crimson Jamdani Transition",
      thumbnailUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      platform: "instagram",
      externalUrl: "https://www.instagram.com/mumtahinaaa_",
      views: "1.4M",
      likes: "118K",
      audioTitle: "Bengali Classical Sitar & Lo-Fi Beat",
      caption: "Nothing quite matches the royal elegance of handwoven Dhakai Jamdani ✨ #sareelove #mumtahina #dhakafashion #jamdani"
    },
    {
      id: "r2",
      title: "Golden Hour Glow & Sunkissed Vibes",
      thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      platform: "tiktok",
      externalUrl: "https://www.tiktok.com/@mumtahinaaa_2",
      views: "950K",
      likes: "87K",
      audioTitle: "Acoustic Warm Sunset Sound",
      caption: "Gulshan lake breezes and soft golden hour light 🌅 #goldenhour #lifestyle #mumtahina #dhakalife"
    },
    {
      id: "r3",
      title: "Festive Silk & Antique Gold Jewellery",
      thumbnailUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      platform: "instagram",
      externalUrl: "https://www.instagram.com/mumtahinaaa_",
      views: "2.3M",
      likes: "210K",
      audioTitle: "Dhaka Nights Aesthetic Beat",
      caption: "When tradition meets timeless elegance ✨ Wedding guest & festive season look #bengalbeauty #reelsindia #festiveoutfit"
    },
    {
      id: "r4",
      title: "Minimalist Black Trench & Streetwalk",
      thumbnailUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      platform: "tiktok",
      externalUrl: "https://www.tiktok.com/@mumtahinaaa_2",
      views: "810K",
      likes: "72K",
      audioTitle: "Vogue Runway Electric Pace",
      caption: "All black everything. City strolls & contemporary fashion 🖤 #fashioninspo #outfitoftheday #mumtahina"
    },
    {
      id: "r5",
      title: "Dewy Glass Skin & Soft Wing Glam",
      thumbnailUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      platform: "instagram",
      externalUrl: "https://www.instagram.com/mumtahinaaa_",
      views: "1.9M",
      likes: "165K",
      audioTitle: "Soft Velvet Ambient Melody",
      caption: "Skin-first beauty & glowing party makeup. Collaboration with top Dhaka makeover studio 💄 #makeuptransformation #dewylook"
    },
    {
      id: "r6",
      title: "Slow-Motion Catwalk & Fabric Flow",
      thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      platform: "tiktok",
      externalUrl: "https://www.tiktok.com/@mumtahinaaa_2",
      views: "1.2M",
      likes: "105K",
      audioTitle: "Runway Bassline Walk",
      caption: "Pace, posture and presence. Catching the drape on the catwalk 👠 #catwalk #runwaywalk #model #dhakafashion"
    }
  ],
  brands: [
    { id: "b1", name: "Aarong", category: "Heritage & Jamdani", logoText: "AARONG" },
    { id: "b2", name: "Taaga", category: "Contemporary Fusion", logoText: "TAAGA" },
    { id: "b3", name: "Yellow", category: "Streetwear & Lifestyle", logoText: "YELLOW" },
    { id: "b4", name: "Sailor", category: "Smart Casuals", logoText: "SAILOR" },
    { id: "b5", name: "Gala Makeover Studio", category: "Bridal & Beauty", logoText: "GALA MAKEOVER" },
    { id: "b6", name: "Herlan Bangladesh", category: "Skincare & Cosmetics", logoText: "HERLAN" },
    { id: "b7", name: "Chondon Dhaka", category: "Artisanal Handloom", logoText: "CHONDON" },
    { id: "b8", name: "Apex Footwear", category: "Footwear & Accessories", logoText: "APEX" }
  ],
  press: [
    {
      id: "pr1",
      publication: "Vogue South Asia",
      title: "The New Faces Defining Bengal High Fashion",
      date: "February 2026",
      quote: "Mumtahina commands attention with an authentic grace that bridges ancient Bengal textile history and Milan runway dynamism."
    },
    {
      id: "pr2",
      publication: "The Daily Star Lifestyle",
      title: "Dhaka Fashion Week: Mumtahina Stuns as Showstopper",
      date: "November 2025",
      quote: "Her closing walk for the heritage Muslin showcase was arguably the most electrifying moment of the entire season."
    },
    {
      id: "pr3",
      publication: "ICE Today",
      title: "Couture in the Capital: Model of the Year Profile",
      date: "August 2025",
      quote: "Poised, focused, and undeniably magnetic in front of the lens."
    }
  ],
  inquiries: [
    {
      id: "inq-101",
      name: "Sabrina Rahman",
      email: "sabrina@aarong.com",
      phone: "+880 1711-223344",
      brandOrAgency: "Aarong Heritage",
      projectType: "Campaign / Commercial",
      shootDate: "2026-10-15",
      budget: "BDT 350,000",
      message: "We would love to book Mumtahina for our upcoming Winter Festive 2026 Jamdani campaign shoot in Sylhet.",
      status: "new",
      createdAt: "2026-09-28T14:10:00Z"
    },
    {
      id: "inq-102",
      name: "Marcus Thorne",
      email: "casting@lakmefw.com",
      phone: "+91 98200 11223",
      brandOrAgency: "Lakme Fashion Week South Asia",
      projectType: "Runway",
      shootDate: "2026-11-04",
      budget: "USD $4,500 + Travel",
      message: "Invitation to walk as guest showstopper for South Asian Sustainable Design showcase in Mumbai.",
      status: "reviewed",
      createdAt: "2026-09-25T08:30:00Z"
    }
  ],
  admin: {
    username: "admin",
    passwordHash: "mumtahina2026", // Default initial password that she can change
    lastLogin: "2026-09-29T12:00:00Z"
  }
};
