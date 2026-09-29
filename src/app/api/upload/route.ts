import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const finalFileName = `${timestamp}-${cleanFileName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // If Supabase is configured, attempt upload to Supabase Storage bucket
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        try {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(finalFileName, buffer, {
              contentType: file.type || 'image/jpeg',
              upsert: true,
            });

          if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage
              .from('portfolio')
              .getPublicUrl(finalFileName);

            return NextResponse.json({
              success: true,
              url: publicUrl,
              fileName: finalFileName,
              size: file.size,
              storage: 'supabase'
            });
          } else {
            console.warn("Supabase storage upload failed, falling back to local:", uploadError?.message);
          }
        } catch (storageErr) {
          console.warn("Supabase storage exception, falling back to local:", storageErr);
        }
      }
    }

    // Local filesystem fallback
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, finalFileName);
    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${finalFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: finalFileName,
      size: file.size,
      storage: 'local'
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
