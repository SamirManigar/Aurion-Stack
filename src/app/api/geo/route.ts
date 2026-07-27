import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1. Check CDN & Cloud provider headers (Vercel, Cloudflare, AWS CloudFront, NGINX geoip)
    const countryHeader =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      req.headers.get("x-country") ||
      req.headers.get("cloudfront-viewer-country") ||
      req.headers.get("x-real-ip-country");

    if (countryHeader) {
      const code = countryHeader.toUpperCase();
      return NextResponse.json({
        country: code,
        currency: code === "IN" ? "INR" : "USD",
        source: "header",
      });
    }

    // 2. Derive forwarding client IP for local setups or direct hosting
    const forwardedFor = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

    // Check if valid public IPv4 / IPv6
    if (
      clientIp &&
      clientIp !== "127.0.0.1" &&
      clientIp !== "::1" &&
      !clientIp.startsWith("192.168.") &&
      !clientIp.startsWith("10.") &&
      !clientIp.startsWith("172.")
    ) {
      const res = await fetch(`https://ipapi.co/${clientIp}/json/`, {
        headers: { "User-Agent": "AurionStack-Geo-Resolver/1.0" },
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = await res.json();
        const code = (data.country_code || data.country || "").toUpperCase();
        if (code) {
          return NextResponse.json({
            country: code,
            currency: code === "IN" ? "INR" : "USD",
            source: "ipapi",
          });
        }
      }
    }

    // Default fallback
    return NextResponse.json({
      country: "IN",
      currency: "INR",
      source: "default",
    });
  } catch (error) {
    return NextResponse.json(
      { country: "IN", currency: "INR", source: "error-fallback" },
      { status: 200 }
    );
  }
}
