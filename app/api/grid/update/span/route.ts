import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/util/client";

export async function POST(req: NextRequest) {
  try {
    const { id, span } = await req.json();

    const token = req.cookies.get("accessToken")?.value || "";
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Access token is missing" },
        { status: 401 }
      );
    }
    let decodedToken: { slug: string } | null = null;
    try {
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
        slug: string;
      };
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token", err },
        { status: 401 }
      );
    }

    if (!decodedToken || !decodedToken.slug) {
      return NextResponse.json(
        { success: false, error: "Invalid token payload" },
        { status: 401 }
      );
    }
    const { error: updateError } = await supabase
      .from("GridItem")
      .update({span})
      .eq("id", id);
    if (updateError) {
      console.error("Database update error:", updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error"+error },
      { status: 500 }
    );
  }
}
