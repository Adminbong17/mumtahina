import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return handleKeepAlive(request);
}

export async function POST(request: Request) {
  return handleKeepAlive(request);
}

async function handleKeepAlive(request: Request) {
  const now = new Date().toISOString();
  console.log(`[Keep-Alive Cron] Executed at ${now}`);

  // Optional: Verify Vercel Cron Secret if configured
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Only enforce if CRON_SECRET is explicitly set in env
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message: 'Supabase is not configured in environment variables',
        timestamp: now,
      },
      { status: 500 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to initialize Supabase client',
        timestamp: now,
      },
      { status: 500 }
    );
  }

  const operations: Record<string, any> = {};

  try {
    // 1. Try to record heartbeat into keep_alive_logs table
    const { data: logData, error: logError } = await supabase
      .from('keep_alive_logs')
      .insert([
        {
          source: 'automated_cron',
          message: 'Automated keep-alive ping to prevent database pause',
          pinged_at: now,
        },
      ])
      .select();

    if (!logError) {
      operations.keep_alive_logs = 'inserted successfully';
    } else {
      operations.keep_alive_logs = `skipped/error: ${logError.message}`;
    }

    // 2. Perform a read and touch on profiles table to guarantee active database traffic
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, updated_at')
      .limit(1);

    if (!profileError) {
      operations.profiles_read = 'successful';

      // Update timestamp on profile to record an active write
      await supabase
        .from('profiles')
        .update({ updated_at: now })
        .eq('id', 'mumtahina');
      operations.profiles_touch = 'updated timestamp';
    } else {
      operations.profiles = `error: ${profileError.message}`;
    }

    // 3. Fallback: Query inquiries table
    const { count, error: inqError } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true });

    if (!inqError) {
      operations.inquiries_count = count ?? 0;
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase keep-alive ping completed successfully. Database activity refreshed.',
      timestamp: now,
      databaseStatus: 'ACTIVE',
      operations,
    });
  } catch (error: any) {
    console.error('[Keep-Alive Cron Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to ping Supabase (Project may be paused or offline)',
        error: error?.message || String(error),
        timestamp: now,
      },
      { status: 503 }
    );
  }
}
