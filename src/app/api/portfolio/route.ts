import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { PortfolioItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, imageUrl, featured, photographer, client, year, location, description, tags, aspectRatio } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json(
        { success: false, message: "Title, category, and image URL are required" },
        { status: 400 }
      );
    }

    const db = getDb();
    const newItem: PortfolioItem = {
      id: `photo-${Date.now()}`,
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim(),
      aspectRatio: aspectRatio || 'tall',
      featured: Boolean(featured),
      photographer: photographer ? photographer.trim() : 'Studio Bengal',
      client: client ? client.trim() : 'Editorial',
      year: year || new Date().getFullYear().toString(),
      location: location ? location.trim() : 'Dhaka, Bangladesh',
      description: description ? description.trim() : '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : []),
      createdAt: new Date().toISOString()
    };

    if (!db.portfolio) {
      db.portfolio = [];
    }

    db.portfolio.unshift(newItem);
    saveDb(db);

    return NextResponse.json({ success: true, message: "Photo added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    return NextResponse.json({ error: "Failed to add portfolio item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Item ID is required" }, { status: 400 });
    }

    const db = getDb();
    const index = db.portfolio.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: "Photo not found" }, { status: 404 });
    }

    db.portfolio[index] = {
      ...db.portfolio[index],
      ...updates,
      tags: Array.isArray(updates.tags) ? updates.tags : (updates.tags ? updates.tags.split(',').map((t: string) => t.trim()) : db.portfolio[index].tags)
    };

    saveDb(db);
    return NextResponse.json({ success: true, message: "Photo updated successfully", item: db.portfolio[index] });
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: "Photo ID is required" }, { status: 400 });
    }

    const db = getDb();
    db.portfolio = db.portfolio.filter(p => p.id !== id);
    saveDb(db);

    return NextResponse.json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}
