import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/util/client";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { link } = await req.json();

    const response = await fetch(link);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $("title").text();
    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "";
    const absoluteFaviconUrl = favicon.startsWith("http")
      ? favicon
      : new URL(favicon, link).href;

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
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (!decodedToken?.slug) {
      return NextResponse.json(
        { success: false, error: "Invalid token payload" },
        { status: 401 }
      );
    }

    let item:Record<string,string> = {
      title,
      link,
      favicon: absoluteFaviconUrl,
      id:randomUUID(),
    };
    if(link.includes("github.com") || link.includes("x.com")){
        item["username"]=link.substring(link.lastIndexOf("/")+1)
    }
    if(link.includes("github.com")){
        item['title']=title.substring(title.indexOf("(")+1,title.indexOf(")"))
        item["type"]="github"
    }
    if(link.includes("x.com")){
        item["title"]="X(Twitter)"
        item["type"]="x"
    }
    
    console.log(item)
    const { data, error } = await supabase
      .from("Portfolio")
      .select("grids")
      .eq("slug", decodedToken.slug)
      .single();
    if (error && error.code !== "PGRST116") { 
      return NextResponse.json(
        { success: false, error: "Error fetching portfolio data" },
        { status: 500 }
      );
    }

    const existingLinks = data?.grids || [];
    const toSet = [...existingLinks, item];

    const { error: updateError } = await supabase
      .from("Portfolio")
      .update({ grids: toSet })
      .eq("slug", decodedToken.slug);
    if (updateError) {
      return NextResponse.json(
        { success: false, error: "Error updating portfolio" },
        { status: 505 }
      );
    }

    return NextResponse.json({
      success: true,
      item,
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
