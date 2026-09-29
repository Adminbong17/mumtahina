import { NextResponse } from 'next/server';
import { getDbAsync, addReelItemAsync, deleteReelItemAsync } from '@/lib/db';
import { ReelItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDbAsync();
    return NextResponse.json({ reels: db.reels || [] });
  } catch (error) {
    console.error("Failed to get reels:", error);
    return NextResponse.json({ error: "Failed to get reels" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, thumbnailUrl, platform, externalUrl, views, likes, audioTitle, caption } = body;

    if (!title || !thumbnailUrl || !externalUrl) {
      return NextResponse.json(
        { success: false, message: "Title, thumbnail, and external URL are required" },
        { status: 400 }
      );
    }

    const newReel: ReelItem = {
      id: `reel-${Date.now()}`,
      title: title.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      platform: platform || 'instagram',
      externalUrl: externalUrl.trim(),
      views: views || '100K',
      likes: likes || '10K',
      audioTitle: audioTitle ? audioTitle.trim() : 'Trending Audio',
      caption: caption ? caption.trim() : ''
    };

    await addReelItemAsync(newReel);

    return NextResponse.json({ success: true, message: "Reel added successfully", reel: newReel });
  } catch (error) {
    console.error("Error adding reel:", error);
    return NextResponse.json({ error: "Failed to add reel" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: "Reel ID is required" }, { status: 400 });
    }

    await deleteReelItemAsync(id);

    return NextResponse.json({ success: true, message: "Reel deleted successfully" });
  } catch (error) {
    console.error("Error deleting reel:", error);
    return NextResponse.json({ error: "Failed to delete reel" }, { status: 500 });
  }
}
