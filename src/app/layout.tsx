import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mumtahina Jahan (@mumtahinaaa_) | Bangladeshi Fashion Model & Creator",
  description: "Official portfolio of Mumtahina Jahan Aria (@mumtahinaaa_) - Bangladeshi fashion, bridal, commercial, and runway model with 700K+ community. Bookings, comp card, and lookbook.",
  keywords: ["Mumtahina Jahan", "mumtahinaaa_", "Bangladeshi Model", "Dhaka Fashion", "Editorial Model", "Bridal Saree Model", "Jamdani", "Dhaka Fashion Week", "Runway Model"],
  openGraph: {
    title: "Mumtahina Jahan (@mumtahinaaa_) | Official Model Portfolio",
    description: "Bangladeshi Fashion, Editorial & Runway Model · 700K+ Community",
    images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-[#d4af37]/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
