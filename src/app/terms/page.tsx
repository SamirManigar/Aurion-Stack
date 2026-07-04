import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Aurion Stack — the rules governing use of our website and services.",
  alternates: { canonical: "https://aurionstack.dev/terms" },
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: April 2025</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using any Aurion Stack website, product, or service, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Services</h2>
            <p>Aurion Stack provides custom software development, AI automation systems, and SaaS products. Specific terms for individual products (AuraIQ, GapTuber, BusinessZip, VisioScript) are governed by separate agreements provided at the point of purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Payment and Refunds</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All project-based services require a signed Statement of Work and a deposit before work begins.</li>
              <li>SaaS subscriptions are billed monthly and can be cancelled at any time. No refunds are issued for partial billing periods.</li>
              <li>One-time setup fees (e.g., AuraIQ Starter) are non-refundable once delivery has commenced.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
            <p>Upon full payment, clients receive ownership of all custom-developed code and assets created specifically for their project. Aurion Stack retains ownership of proprietary frameworks, libraries, and internal tooling used in delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Acceptable Use</h2>
            <p>You agree not to use our services to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Violate any applicable law or regulation.</li>
              <li>Infringe the intellectual property rights of others.</li>
              <li>Transmit spam, malware, or harmful content.</li>
              <li>Attempt to reverse engineer, copy, or resell our products without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Aurion Stack shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you in the 30 days preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Governing Law</h2>
            <p>These terms are governed by applicable international commercial law. Any disputes shall be resolved by good-faith negotiation, then binding arbitration if unresolved within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of our services after changes constitute acceptance. Material changes will be communicated via email to active clients.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:aurionstack@gmail.com" className="text-primary underline">aurionstack@gmail.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border bg-background py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aurion Stack ·{" "}
          <Link href="/privacy" className="hover:text-foreground underline underline-offset-2">Privacy Policy</Link>
          {" · "}
          <Link href="/" className="hover:text-foreground underline underline-offset-2">Home</Link>
        </p>
      </footer>
    </div>
  );
}
