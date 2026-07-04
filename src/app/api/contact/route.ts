import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── Email via your configured SMTP / Resend ──────────────────────────────
    // To activate: set CONTACT_EMAIL env var on Vercel and uncomment the
    // transporter block below. Currently logs to console (safe for dev).
    //
    // import nodemailer from 'nodemailer'; // npm i nodemailer
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: 587,
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    // await transporter.sendMail({
    //   from: `"Aurion Stack Contact" <${process.env.SMTP_USER}>`,
    //   to: process.env.CONTACT_EMAIL || "aurionstack@gmail.com",
    //   subject: `New enquiry from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    // });

    console.log("📩 New contact form submission:", { name, email, message });

    return NextResponse.json({ success: true, message: "Message received! We'll reply within 24 hours." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please email us directly at aurionstack@gmail.com" }, { status: 500 });
  }
}
