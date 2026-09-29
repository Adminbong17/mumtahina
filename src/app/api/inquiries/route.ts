import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { BookingInquiry } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json({ inquiries: db.inquiries || [] });
  } catch (error) {
    console.error("Failed to get inquiries:", error);
    return NextResponse.json({ error: "Failed to get inquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, brandOrAgency, projectType, shootDate, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Email, Message)." },
        { status: 400 }
      );
    }

    const db = getDb();
    const newInquiry: BookingInquiry = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      brandOrAgency: brandOrAgency ? brandOrAgency.trim() : 'Independent Project',
      projectType: projectType || 'Editorial / Commercial',
      shootDate: shootDate || '',
      budget: budget || '',
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    if (!db.inquiries) {
      db.inquiries = [];
    }

    db.inquiries.unshift(newInquiry);
    saveDb(db);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your booking inquiry has been received. Mumtahina and her management team will respond shortly.",
      inquiry: newInquiry
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const db = getDb();

    const item = db.inquiries.find(i => i.id === id);
    if (!item) {
      return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    }

    item.status = status;
    saveDb(db);

    return NextResponse.json({ success: true, message: `Inquiry marked as ${status}` });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: "Inquiry ID is required" }, { status: 400 });
    }

    const db = getDb();
    db.inquiries = db.inquiries.filter(i => i.id !== id);
    saveDb(db);

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
