import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/util/client";

export async function POST(req: NextRequest) {
  try {
    const { name, pfp, bio, links,toUpdate } = await req.json();

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
    const updateData: Record<string, string | undefined> = {};

    if (toUpdate === "name") {
      updateData.name = name;
    } else if (toUpdate === "bio") {
      updateData.bio = bio;
    } else if (toUpdate === "pfp") {
      updateData.pfp = pfp;
    } else if (toUpdate === "links") {
      updateData.links = links;
    } else {
      return NextResponse.json({ success: false, error: "Invalid update field" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("Portfolio")
      .update(updateData)
      .eq("slug", decodedToken.slug);

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ success: false, error: "Failed to update name" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
