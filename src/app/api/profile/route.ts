import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json({ profile: db.profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    db.profile = {
      ...db.profile,
      ...body,
      measurements: {
        ...db.profile.measurements,
        ...(body.measurements || {})
      },
      contact: {
        ...db.profile.contact,
        ...(body.contact || {})
      },
      socials: {
        ...db.profile.socials,
        ...(body.socials || {})
      },
      compCardImages: {
        ...db.profile.compCardImages,
        ...(body.compCardImages || {})
      }
    };

    saveDb(db);
    return NextResponse.json({ success: true, message: "Profile updated successfully", profile: db.profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
