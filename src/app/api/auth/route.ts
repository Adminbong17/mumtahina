import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { action, username, password, newPassword } = await request.json();
    const db = getDb();

    if (action === 'login') {
      const isValidUser = username.trim().toLowerCase() === db.admin.username.toLowerCase();
      const isValidPass = password === db.admin.passwordHash;

      if (isValidUser && isValidPass) {
        db.admin.lastLogin = new Date().toISOString();
        saveDb(db);

        const response = NextResponse.json({
          success: true,
          message: "Login successful",
          user: { username: db.admin.username }
        });

        // Set session cookie
        response.cookies.set('mumtahina_admin_token', 'authorized_admin_session', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
      }

      return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 });
    }

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: "Logged out" });
      response.cookies.delete('mumtahina_admin_token');
      return response;
    }

    if (action === 'change-password') {
      if (password !== db.admin.passwordHash) {
        return NextResponse.json({ success: false, message: "Current password does not match" }, { status: 400 });
      }

      if (!newPassword || newPassword.length < 5) {
        return NextResponse.json({ success: false, message: "New password must be at least 5 characters" }, { status: 400 });
      }

      db.admin.passwordHash = newPassword;
      saveDb(db);
      return NextResponse.json({ success: true, message: "Password updated successfully" });
    }

    return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Check if session cookie is valid
  const cookieHeader = request.headers.get('cookie') || '';
  const isLoggedIn = cookieHeader.includes('mumtahina_admin_token=authorized_admin_session');
  return NextResponse.json({ authenticated: isLoggedIn });
}
