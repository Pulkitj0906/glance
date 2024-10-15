import { NextResponse } from "next/server";


export async function POST() {
  try {
    const response = NextResponse.json({
      message: "User logout successfully!",
      status: 200,
    });
    response.cookies.delete("accessToken");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error in logging you out!",error },
      { status: 401 }
    );
  }
}
