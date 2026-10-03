"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowUpRight, Aperture, Play, Sparkles } from "lucide-react";
import styles from "./studio.module.css";

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
  title: "A story that keeps you watching.", category: "Creator edits",
  file: "featured-creator-edit", driveId: "1WreRqlmTx2KLYyXYb-YnntZEo5x8g7dS", duration: "0:55", portrait: true,
  description: "Talking-head storytelling, study-life B-roll, and animated explainers woven into one vertical edit.",
};
const projects: Project[] = [
  { title: "Motion meets the message", category: "Creator edits", file: "motion-led-creator-edit", driveId: "1JLdJ1oF96cXIRHM0McR1za1xgpuEQtrW", duration: "0:37", portrait: true, description: "A vertical talking-head edit with animated typography, product cutaways, and composited graphics." },
  { title: "Ideas, made visual", category: "Creator edits", file: "educational-creator-edit", driveId: "1du3kTf61S8TC-Hc1GD9tRazRiMCdGcp5", duration: "0:50", portrait: true, description: "An educational short combining on-camera delivery, interface animation, and visual explanations." },
  { title: "Spotify · Logo in motion", category: "Motion design", file: "spotify-logo-animation", driveId: "1ldRGvTMgtGAjoZfqlsU-e9qaILfywmMY", duration: "0:05", portrait: true, description: "A Spotify-themed animation study with kinetic type and a logo reveal." },
  { title: "The documentary treatment", category: "Documentary", file: "documentary-montage", driveId: "1_rib3r3n2tuzabhd11QTfXazV096OYlG", duration: "0:12", description: "A short montage using archival-style framing, layered imagery, and expressive type." },
  { title: "More than a talking head", category: "Creator edits", file: "talking-head-storytelling", driveId: "1-DO5Lj3stn2jIVSizPl5Bncy3BhqEJmL", duration: "0:20", description: "A landscape interview edit punctuated with illustrated cutaways and text callouts." },
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
    try { await videoRef.current?.play(); } catch { setError(true); }
  }
  return (
    <div className={`${styles.player} ${project.portrait ? styles.portraitPlayer : styles.landscapePlayer} ${hero ? styles.heroPlayer : ""}`}>
      <video ref={videoRef} aria-label={`${project.title} — ${project.duration}`} poster={`/creators/${project.file}.webp`} preload={hero ? "auto" : "none"} autoPlay={hero} muted={hero} loop={hero} controls={hero || started} playsInline onPlay={(event) => { setStarted(true); setError(false); pauseOtherVideos(event); }} onError={() => setError(true)}>
        <source src={`/creators/${project.file}.mp4`} type="video/mp4" />
        Your browser does not support video playback.
      </video>
      {!hero && !started && <button type="button" className={styles.playOverlay} onClick={play} aria-label={`Play ${project.title}`}><span className={styles.playCircle}><Play size={21} fill="currentColor" /></span><span className={styles.watchLabel}>Play film</span></button>}
      {!hero && !started && <span className={styles.duration}>{project.duration}</span>}
      {error && <div className={styles.videoError} role="status">Playback unavailable. <a href={`https://drive.google.com/file/d/${project.driveId}/view`} target="_blank" rel="noopener noreferrer">Watch on Drive <ArrowUpRight size={14} /></a></div>}
    </div>
  );
}

export default function CreatorStudio() {
  const [filter, setFilter] = useState<Category>("All work");
  const visibleProjects = projects.filter((project) => filter === "All work" || project.category === filter);
  return (
    <div className={styles.studio}>
      <a href="#studio-main" className={styles.skip}>Skip to content</a>
      <header className={styles.header}><div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Aurion Stack home"><Image src="/aurionstack-logo.webp" alt="" width={42} height={42} /><span>Aurion Stack<span>CREATOR STUDIO</span></span></Link>
        <nav aria-label="Creator studio" className={styles.navigation}><a href="#work">Selected work</a><a href="#creator">The creator</a><Link href="/" className={styles.back}><ArrowLeft size={14} /> Main site</Link></nav>
        <Link href="/#contact" className={styles.navButton}>Let’s create <ArrowUpRight size={15} /></Link>
      </div></header>
      <main id="studio-main" className={styles.main}>
        <section id="overview" className={styles.hero} aria-labelledby="studio-title">
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span className={styles.dot} /> THE CREATIVE SIDE OF AURION STACK</div>
            <h1 id="studio-title">Good stories.<br />Unforgettable<br /><em>edits.</em><span className={styles.heroAsterisk} aria-hidden="true">✳</span></h1>
            <p>From the first frame to the final cut. Explore a collection of creator edits, motion design, and visual storytelling by Historicalwallaby.</p>
            <div className={styles.heroActions}><a className={styles.primaryButton} href="#work">Explore the work <ArrowDown size={17} /></a><Link href="/#contact" className={styles.textLink}>Have an idea? <ArrowUpRight size={16} /></Link></div>
            <div className={styles.creatorSignature}><span className={styles.avatar}>hw</span><div><strong>Historicalwallaby</strong><span>THE CREATOR BEHIND THE CUTS</span></div><span className={styles.signatureLine} /></div>
          </div>
          <div className={styles.featured}>
            <div className={styles.featuredHeading}><span><span className={styles.dot} /> IN THE SPOTLIGHT</span><span>01 / FEATURED EDIT</span></div>
            <VideoPlayer project={featured} hero />
            <div className={styles.featuredCaption}><span>Creator storytelling</span><span>0:55 · AUTOPLAYS MUTED</span></div><p>{featured.description}</p>
          </div>
        </section>
        <div className={styles.ticker} aria-label="Studio disciplines"><span>CREATOR EDITS</span><span aria-hidden="true">✳</span><span>MOTION DESIGN</span><span aria-hidden="true">✳</span><span>VISUAL STORYTELLING</span><span aria-hidden="true">✳</span><span>MADE FRAME BY FRAME</span></div>
        <section id="work" className={styles.workSection} aria-labelledby="work-title">
          <div className={styles.sectionHeading}><div><div className={styles.eyebrow}>THE PORTFOLIO / 05 SELECTED FILMS</div><h2 id="work-title">A little range.<br /><span>A lot of character.</span></h2></div><p>Different formats. A considered touch.<br />Press play and get a feel for the work.</p></div>
          <div className={styles.filterBar}><div className={styles.filters} role="group" aria-label="Filter portfolio by format">{categories.map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)} className={filter === category ? styles.selected : ""}>{category}<span>{category === "All work" ? projects.length : projects.filter((project) => project.category === category).length}</span></button>)}</div><span className={styles.filterCount} aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? "film" : "films"}</span></div>
          <div className={`${styles.projectGrid} ${filter !== "All work" ? styles.filteredGrid : ""}`}>
            {visibleProjects.map((project) => <article key={project.file} className={`${styles.project} ${project.portrait ? styles.portraitProject : ""}`}>
              <VideoPlayer project={project} />
              <div className={styles.projectMeta}><span>{project.category}</span><span>{project.portrait ? "9:16" : project.file === "talking-head-storytelling" ? "16:10" : "16:9"} / {project.duration}</span></div>
              <h3>{project.title}</h3><p>{project.description}</p>
            </article>)}
          </div>
        </section>
        <section id="creator" className={styles.creator} aria-labelledby="creator-title">
          <div className={styles.creatorArtwork} aria-hidden="true"><span>THE HUMAN<br />BEHIND THE TIMELINE.</span><strong>hw<span>✳</span></strong><span>HISTORICALWALLABY / CREATOR</span></div>
          <div className={styles.creatorCopy}><div className={styles.eyebrow}>MEET THE CREATOR</div><h2 id="creator-title">Historicalwallaby<span>.</span></h2><p>One collection. Different ways to tell a story.</p><p>Explore his work across talking-head edits, animated graphics, and documentary-style sequences. A mix of timing, typography, and detail that gives every piece its own character.</p><div className={styles.skillTags}><span>Video editing</span><span>Motion design</span><span>Visual storytelling</span></div><Link href="/#contact" className={styles.textLink}>Talk about a creative project <ArrowUpRight size={17} /></Link></div>
        </section>
        <section id="collaborate" className={styles.contact} aria-labelledby="contact-title"><Sparkles size={25} className={styles.contactSpark} aria-hidden="true" /><div className={styles.eyebrow}>YOUR IDEA. THE NEXT GREAT FRAME.</div><h2 id="contact-title">Let’s make something<br /><em>worth watching.</em></h2><p>Have a story, a brief, or the beginning of an idea?<br />Bring it to Aurion Stack. Let’s talk.</p><Link href="/#contact" className={styles.primaryButton}>Discuss a project <ArrowUpRight size={19} /></Link></section>
        <footer className={styles.footer}><Link href="/" className={styles.footerBrand}><Aperture size={18} /> Aurion Stack <span>/ Creator Studio</span></Link><span>© {new Date().getFullYear()} Aurion Stack</span><a href="#overview">Back to top ↑</a></footer>
      </main>
    </div>
  );
}
