import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Aurion Stack — how we collect, use, and protect your personal data.",
  alternates: { canonical: "https://aurionstack.dev/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between max-w-4xl">
          <Link href="/" className="text-sm font-bold tracking-tight text-foreground">Aurion Stack</Link>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to Home</Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <div className="mb-12">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-primary mb-4">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-heading font-normal tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: April 2025</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Who We Are</h2>
            <p>Aurion Stack ("we", "our", "us") is an AI and SaaS development agency operating globally. Our website is <a href="https://aurionstack.dev" className="text-primary underline">https://aurionstack.dev</a>. You can contact us at <a href="mailto:aurionstack@gmail.com" className="text-primary underline">aurionstack@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. What Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Contact information:</strong> When you reach out via our contact form, WhatsApp, or email, we collect your name, email address, and the content of your message.</li>
              <li><strong className="text-foreground">Usage data:</strong> We may collect anonymised analytics data (page views, time on site, device type) to improve the quality of our website.</li>
              <li><strong className="text-foreground">Product data:</strong> If you use our products (AuraIQ, GapTuber, BusinessZip, VisioScript), the data you submit or generate is governed by those products' own privacy terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to enquiries and provide project discovery services.</li>
              <li>To improve the content and functionality of our website.</li>
              <li>To send project-related communications (we never send unsolicited marketing).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
            <p>We do not sell, rent, or trade your personal data to any third party. We may share data with service providers strictly necessary to operate our business (e.g., email hosting) under data processing agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Cookies</h2>
            <p>Our main website does not currently use tracking cookies. If we add analytics, we will update this policy and provide appropriate consent mechanisms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, email us at <a href="mailto:aurionstack@gmail.com" className="text-primary underline">aurionstack@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Data Retention</h2>
            <p>We retain contact enquiry data for up to 24 months, after which it is deleted unless required by law or ongoing project relationship.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be reflected by the "last updated" date above. Continued use of the site constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Contact</h2>
            <p>Questions about this policy? Email <a href="mailto:aurionstack@gmail.com" className="text-primary underline">aurionstack@gmail.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border bg-background py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aurion Stack ·{" "}
          <Link href="/terms" className="hover:text-foreground underline underline-offset-2">Terms of Service</Link>
          {" · "}
          <Link href="/" className="hover:text-foreground underline underline-offset-2">Home</Link>
        </p>
      </footer>
    </div>
  );
}
