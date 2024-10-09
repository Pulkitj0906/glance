import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("accessToken")?.value || "";
    const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    return NextResponse.json({
      slug: decodedToken.slug,
    });
  } catch (error) {
    return NextResponse.json({ status: 502,error });
  }
}
