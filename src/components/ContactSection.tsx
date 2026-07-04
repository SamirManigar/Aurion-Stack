"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const quickLinks = [
  { href: "https://wa.me/919322974288", label: "WhatsApp", Icon: WhatsappIcon, external: true },
  { href: "mailto:aurionstack@gmail.com", label: "aurionstack@gmail.com", Icon: Mail, external: false },
  { href: "https://discord.com/users/1222025472142217257", label: "Discord", Icon: MessageCircle, external: true },
  { href: "https://instagram.com/aurionstack", label: "@aurionstack", Icon: InstagramIcon, external: true },
];


export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Please email us directly.");
    }
  };

  return (
    <section id="contact" className="relative border-t border-border bg-card py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl font-heading font-normal tracking-tight text-foreground sm:text-5xl mb-6">
              Let's Build Something <span className="text-muted-foreground">Great</span>
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg max-w-xl mx-auto leading-relaxed">
              Tell us about your project and we'll outline an architecture plan in our discovery call — free, no commitment.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center rounded-2xl border border-primary/20 bg-primary/5">
                  <CheckCircle2 size={48} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Message received!</h3>
                  <p className="text-muted-foreground text-sm">We'll reply within 24 hours. For urgent enquiries, WhatsApp us directly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-xs text-muted-foreground underline hover:text-foreground transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>


                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Briefly describe what you want to build, automate, or fix..."
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground/60">We reply within 24 hours · No spam, ever</p>
                </form>
              )}
            </motion.div>

            {/* ── Quick Links ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-3"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Or reach us directly</p>
              {quickLinks.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-background px-5 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/40"
                >
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    <Icon />
                  </div>
                  <span className="truncate">{label}</span>
                </a>
              ))}

              <div className="mt-8 p-5 rounded-xl border border-border bg-card/40">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Response time</p>
                <p className="text-2xl font-bold text-foreground">≤ 24h</p>
                <p className="text-xs text-muted-foreground mt-1">WhatsApp is fastest · usually under 2 hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="container mx-auto mt-24 border-t border-border px-4 pt-10 sm:mt-32 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            © {new Date().getFullYear()} Aurion Stack. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {[
              { label: "Services", href: "/services" },
              { label: "Pricing", href: "/pricing" },
              { label: "Solutions", href: "/solutions" },
              { label: "Insights", href: "/insights" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
