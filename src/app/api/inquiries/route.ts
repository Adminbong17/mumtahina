import { NextResponse } from 'next/server';
import { getDbAsync, addInquiryAsync, updateInquiryStatusAsync, deleteInquiryAsync } from '@/lib/db';
import { BookingInquiry } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDbAsync();
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

    await addInquiryAsync(newInquiry);

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
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "Inquiry ID and status required" }, { status: 400 });
    }

    await updateInquiryStatusAsync(id, status);

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

    await deleteInquiryAsync(id);

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
