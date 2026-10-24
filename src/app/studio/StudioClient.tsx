"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowUpRight, Play, Sparkles, Mail } from "lucide-react";
import styles from "./studio.module.css";

const WHATSAPP_URL = "https://wa.me/919272161837?text=Hi%20Aurion%20Stack%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20creative%20project";
const EMAIL_URL = "mailto:aurionstack@gmail.com?subject=Creative%20Project%20Enquiry%20%E2%80%94%20Aurion%20Stack%20Studio";

const WhatsappIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const categories = ["All work", "Creator edits", "Motion design", "Documentary"] as const;
type Category = (typeof categories)[number];

type Project = {
  title: string;
  category: Exclude<Category, "All work">;
  file: string;
  driveId: string;
  duration: string;
  description: string;
  portrait?: boolean;
};

const featured: Project = {
  title: "A story that keeps you watching.",
  category: "Creator edits",
  file: "featured-creator-edit",
  driveId: "1WreRqlmTx2KLYyXYb-YnntZEo5x8g7dS",
  duration: "0:55",
  portrait: true,
  description: "Talking-head storytelling, study-life B-roll, and animated explainers woven into one vertical edit.",
};

const projects: Project[] = [
  {
    title: "Motion meets the message",
    category: "Creator edits",
    file: "motion-led-creator-edit",
    driveId: "1JLdJ1oF96cXIRHM0McR1za1xgpuEQtrW",
    duration: "0:37",
    portrait: true,
    description: "A vertical talking-head edit with animated typography, product cutaways, and composited graphics.",
  },
  {
    title: "Ideas, made visual",
    category: "Creator edits",
    file: "educational-creator-edit",
    driveId: "1du3kTf61S8TC-Hc1GD9tRazRiMCdGcp5",
    duration: "0:50",
    portrait: true,
    description: "An educational short combining on-camera delivery, interface animation, and visual explanations.",
  },
  {
    title: "Spotify · Logo in motion",
    category: "Motion design",
    file: "spotify-logo-animation",
    driveId: "1ldRGvTMgtGAjoZfqlsU-e9qaILfywmMY",
    duration: "0:05",
    portrait: true,
    description: "A Spotify-themed animation study with kinetic type and a logo reveal.",
  },
  {
    title: "The documentary treatment",
    category: "Documentary",
    file: "documentary-montage",
    driveId: "1_rib3r3n2tuzabhd11QTfXazV096OYlG",
    duration: "0:12",
    description: "A short montage using archival-style framing, layered imagery, and expressive type.",
  },
  {
    title: "More than a talking head",
    category: "Creator edits",
    file: "talking-head-storytelling",
    driveId: "1-DO5Lj3stn2jIVSizPl5Bncy3BhqEJmL",
    duration: "0:20",
    description: "A landscape interview edit punctuated with illustrated cutaways and text callouts.",
  },
];

function pauseOtherVideos(event: SyntheticEvent<HTMLVideoElement>) {
  const current = event.currentTarget;
  current.closest("main")?.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
    if (video !== current) video.pause();
  });
}

function VideoPlayer({ project, hero = false }: { project: Project; hero?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);

  async function play() {
    setStarted(true);
    setError(false);
    try {
      await videoRef.current?.play();
    } catch {
      setError(true);
    }
  }

  return (
    <div
      className={`${styles.player} ${
        project.portrait ? styles.portraitPlayer : styles.landscapePlayer
      } ${hero ? styles.heroPlayer : ""}`}
    >
      <video
        ref={videoRef}
        aria-label={`${project.title} — ${project.duration}`}
        poster={`/creators/${project.file}.webp`}
        preload={hero ? "auto" : "none"}
        autoPlay={hero}
        muted={hero}
        loop={hero}
        controls={hero || started}
        playsInline
        onPlay={(event) => {
          setStarted(true);
          setError(false);
          pauseOtherVideos(event);
        }}
        onError={() => setError(true)}
      >
        <source src={`/creators/${project.file}.mp4`} type="video/mp4" />
        Your browser does not support video playback.
      </video>

      {!hero && !started && (
        <button
          type="button"
          className={styles.playOverlay}
          onClick={play}
          aria-label={`Play ${project.title}`}
        >
          <span className={styles.playCircle}>
            <Play size={22} fill="currentColor" />
          </span>
          <span className={styles.watchLabel}>Play film</span>
        </button>
      )}

      {!hero && !started && (
        <span className={styles.duration}>{project.duration}</span>
      )}

      {error && (
        <div className={styles.videoError} role="status">
          Playback unavailable.{" "}
          <a
            href={`https://drive.google.com/file/d/${project.driveId}/view`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Drive <ArrowUpRight size={13} />
          </a>
        </div>
      )}
    </div>
  );
}

export default function StudioClient() {
  const [filter, setFilter] = useState<Category>("All work");
  const visibleProjects = projects.filter(
    (project) => filter === "All work" || project.category === filter
  );

  return (
    <div className={styles.studio}>
      <a href="#studio-main" className={styles.skip}>
        Skip to content
      </a>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="Aurion Stack home">
            <div className={styles.brandLogoWrap}>
              <Image
                src="/studio-logo.png"
                alt="Aurion Studio Logo"
                width={40}
                height={40}
                className={styles.brandLogo}
                priority
              />
            </div>
            <div className={styles.brandTitle}>
              <span>Aurion Stack</span>
              <span className={styles.brandSub}>CREATIVE STUDIO</span>
            </div>
          </Link>

          <nav aria-label="Creator studio navigation" className={styles.navigation}>
            <a href="#work">Selected work</a>
            <a href="#creator">The creator</a>
            <Link href="/" className={styles.back}>
              <ArrowLeft size={14} /> Main site
            </Link>
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navButton}
            aria-label="Direct WhatsApp message to discuss a creative project"
          >
            <WhatsappIcon size={16} /> Let’s create <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main id="studio-main" className={styles.main}>
        {/* ── Hero Section ── */}
        <section id="overview" className={styles.hero} aria-labelledby="studio-title">
          <div className={styles.heroAmbient} aria-hidden="true">
            <div className={styles.ambientGlow1} />
            <div className={styles.ambientGlow2} />
          </div>

          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} /> THE CREATIVE SIDE OF AURION STACK
            </div>
            <h1 id="studio-title">
              Good stories.
              <br />
              Unforgettable
              <br />
              <em>edits.</em>
              <span className={styles.heroAsterisk} aria-hidden="true">
                ✳
              </span>
            </h1>
            <p>
              From the first frame to the final cut. Explore a collection of creator
              edits, motion design, and visual storytelling by Historicalwallaby.
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">
                Explore the work <ArrowDown size={17} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
              >
                Have an idea? Chat with us <ArrowUpRight size={16} />
              </a>
            </div>

            <div className={styles.creatorSignature}>
              <span className={styles.avatar}>hw</span>
              <div>
                <strong>Historicalwallaby</strong>
                <span>THE CREATOR BEHIND THE CUTS</span>
              </div>
              <span className={styles.signatureLine} />
            </div>
          </div>

          <div className={styles.featured}>
            <div className={styles.featuredHeading}>
              <span>
                <span className={styles.dot} /> IN THE SPOTLIGHT
              </span>
              <span>01 / FEATURED EDIT</span>
            </div>
            <VideoPlayer project={featured} hero />
            <div className={styles.featuredCaption}>
              <span>Creator storytelling</span>
              <span>0:55 · AUTOPLAYS MUTED</span>
            </div>
            <p>{featured.description}</p>
          </div>
        </section>

        {/* ── Ticker ── */}
        <div className={styles.ticker} aria-label="Studio disciplines">
          <span>CREATOR EDITS</span>
          <span aria-hidden="true">✳</span>
          <span>MOTION DESIGN</span>
          <span aria-hidden="true">✳</span>
          <span>VISUAL STORYTELLING</span>
          <span aria-hidden="true">✳</span>
          <span>MADE FRAME BY FRAME</span>
        </div>

        {/* ── Work / Selected Films ── */}
        <section id="work" className={styles.workSection} aria-labelledby="work-title">
          <div className={styles.sectionHeading}>
            <div>
              <div className={styles.eyebrow}>THE PORTFOLIO / 05 SELECTED FILMS</div>
              <h2 id="work-title">
                A little range.
                <br />
                <span>A lot of character.</span>
              </h2>
            </div>
            <p>
              Different formats. A considered touch.
              <br />
              Press play and get a feel for the work.
            </p>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.filters} role="group" aria-label="Filter portfolio by format">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                  className={filter === category ? styles.selected : ""}
                >
                  {category}
                  <span>
                    {category === "All work"
                      ? projects.length
                      : projects.filter((project) => project.category === category).length}
                  </span>
                </button>
              ))}
            </div>
            <span className={styles.filterCount} aria-live="polite">
              {visibleProjects.length} {visibleProjects.length === 1 ? "film" : "films"}
            </span>
          </div>

          <div
            className={`${styles.projectGrid} ${
              filter !== "All work" ? styles.filteredGrid : ""
            }`}
          >
            {visibleProjects.map((project) => (
              <article
                key={project.file}
                className={`${styles.project} ${
                  project.portrait ? styles.portraitProject : ""
                }`}
              >
                <VideoPlayer project={project} />
                <div className={styles.projectMeta}>
                  <span>{project.category}</span>
                  <span>
                    {project.portrait
                      ? "9:16"
                      : project.file === "talking-head-storytelling"
                      ? "16:10"
                      : "16:9"}{" "}
                    / {project.duration}
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── The Creator ── */}
        <section id="creator" className={styles.creator} aria-labelledby="creator-title">
          <div className={styles.creatorArtwork} aria-hidden="true">
            <span>
              THE HUMAN
              <br />
              BEHIND THE TIMELINE.
            </span>
            <strong>
              hw<span>✳</span>
            </strong>
            <span>HISTORICALWALLABY / CREATOR</span>
          </div>
          <div className={styles.creatorCopy}>
            <div className={styles.eyebrow}>MEET THE CREATOR</div>
            <h2 id="creator-title">
              Historicalwallaby<span>.</span>
            </h2>
            <p>One collection. Different ways to tell a story.</p>
            <p>
              Explore his work across talking-head edits, animated graphics, and
              documentary-style sequences. A mix of timing, typography, and detail
              that gives every piece its own character.
            </p>
            <div className={styles.skillTags}>
              <span>Video editing</span>
              <span>Motion design</span>
              <span>Visual storytelling</span>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Talk on WhatsApp directly <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        {/* ── Collaborate CTA ── */}
        <section id="collaborate" className={styles.contact} aria-labelledby="contact-title">
          <Sparkles size={26} className={styles.contactSpark} aria-hidden="true" />
          <div className={styles.eyebrow}>YOUR IDEA. THE NEXT GREAT FRAME.</div>
          <h2 id="contact-title">
            Let’s make something
            <br />
            <em>worth watching.</em>
          </h2>
          <p>
            Have a story, a brief, or the beginning of an idea? Reach out directly
            via WhatsApp or email — we reply within a few hours.
          </p>

          <div className={styles.contactChannels}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              <span className={styles.whatsappIconWrap}>
                <WhatsappIcon size={20} />
              </span>
              <span>WhatsApp · 9272161837</span>
              <ArrowUpRight size={16} />
            </a>

            <a href={EMAIL_URL} className={styles.emailButton}>
              <Mail size={18} />
              <span>aurionstack@gmail.com</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className={styles.directBadge}>
            <Sparkles size={13} />
            <span>Direct founder & creative contact · Instant response</span>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <Link href="/" className={styles.footerBrand}>
            <Image
              src="/studio-logo.png"
              alt="Aurion Studio"
              width={22}
              height={22}
              className={styles.footerLogo}
            />
            Aurion Stack <span>/ Studio</span>
          </Link>
          <span>© {new Date().getFullYear()} Aurion Stack Studio</span>
          <a href="#overview" className={styles.backToTop}>
            Back to top ↑
          </a>
        </footer>
      </main>
    </div>
  );
}
