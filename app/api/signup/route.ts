import bcryptjs from "bcryptjs";
import { supabase } from "@/util/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, slug, password } = await req.json();

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const { data, error } = await supabase
      .from("Users")
      .insert([{ email, slug, password: hashedPassword }]);
    const res = await supabase.from("Portfolio").insert([{ slug }]);

    if (error) {
      console.error("Error inserting user:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });

    const token = jwt.sign(
      {
        email: email,
        password: hashedPassword,
        slug: slug,
      },
      process.env.TOKEN_SECRET!
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    response.cookies.set("accessToken", token, options);

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
