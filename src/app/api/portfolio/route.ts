import { NextResponse } from 'next/server';
import { addPortfolioItemAsync, updatePortfolioItemAsync, deletePortfolioItemAsync } from '@/lib/db';
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

    await addPortfolioItemAsync(newItem);

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

    const cleanUpdates = {
      ...updates,
      tags: Array.isArray(updates.tags) ? updates.tags : (updates.tags ? updates.tags.split(',').map((t: string) => t.trim()) : undefined)
    };

    await updatePortfolioItemAsync(id, cleanUpdates);

    return NextResponse.json({ success: true, message: "Photo updated successfully" });
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

    await deletePortfolioItemAsync(id);

    return NextResponse.json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}
