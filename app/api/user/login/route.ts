import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password, actualPassword, slug } = await req.json();
    const isPasswordCorrect = await bcryptjs.compare(password, actualPassword);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        {
          status: 401,
        }
      );
    }
    const response = NextResponse.json({ success: true, redirect: slug });
    const token = jwt.sign(
      {
        email,
        password: actualPassword,
        slug,
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
    return NextResponse.json({ error });
  }
}
