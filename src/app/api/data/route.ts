import { NextResponse } from 'next/server';
import { getDb, saveDb, resetDbToDefault } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    // Return sanitized data (omit admin password hash for safety)
    const sanitized = {
      ...db,
      admin: {
        username: db.admin.username,
        lastLogin: db.admin.lastLogin
      }
    };
    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Failed to fetch site data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.action === 'reset') {
      const resetData = resetDbToDefault();
      return NextResponse.json({ success: true, message: "Reset to default data", data: resetData });
    }

    const currentDb = getDb();
    const updated = {
      ...currentDb,
      ...body
    };
    saveDb(updated);
    return NextResponse.json({ success: true, message: "Site data saved" });
  } catch (error) {
    console.error("Failed to save data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
