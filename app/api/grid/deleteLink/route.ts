import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/util/client";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

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
        { success: false, error: "Invalid or expired token" + err },
        { status: 401 }
      );
    }

    if (!decodedToken?.slug) {
      return NextResponse.json(
        { success: false, error: "Invalid token payload" },
        { status: 401 }
      );
    }

    const { error: deleteError } = await supabase
      .from("GridItem")
      .delete()
      .eq("id", id);
    if (deleteError) {
      return NextResponse.json(
        { success: false, error: "Error updating portfolio" },
        { status: 505 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
