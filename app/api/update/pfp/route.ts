import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/util/client';
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('file') as File | null;

    if (!image) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const fileExt = image.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const token = req.cookies.get("accessToken")?.value || "";
    if (!token) {
      return NextResponse.json({ success: false, error: "Access token is missing" }, { status: 401 });
    }
    let decodedToken: { slug: string } | null = null;
    try {
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { slug: string };
    } catch (err) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 });
    }

    if (!decodedToken || !decodedToken.slug) {
      return NextResponse.json({ success: false, error: "Invalid token payload" }, { status: 401 });
    }


    const { data, error } = await supabase.storage
      .from('pfp')
      .upload(fileName, image, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const uploadedImage = await supabase.storage
      .from("pfp")
      .createSignedUrl(fileName, 60 * 60 * 24 * 365);
      const publicUrl=uploadedImage.data?.signedUrl

    const { error: updateError } = await supabase
      .from("Portfolio")
      .update({ pfp: publicUrl })
      .eq("slug", decodedToken.slug);

    if (updateError) {
      console.error('Database update error:', updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
