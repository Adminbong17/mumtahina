import { NextResponse } from 'next/server';
import { getDbAsync, getDb, updateProfileAsync } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDbAsync();
    return NextResponse.json({ profile: db.profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = await getDbAsync();

    const updatedProfile = {
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

    await updateProfileAsync(updatedProfile);
    return NextResponse.json({ success: true, message: "Profile updated successfully", profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
