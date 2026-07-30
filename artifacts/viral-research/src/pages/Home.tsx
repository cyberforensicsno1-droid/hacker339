import { useEffect, useRef, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ExternalLink,
  Eye,
  ThumbsUp,
  Share2,
  MessageSquare,
  Terminal,
  Activity,
  Zap,
  Target,
  CheckSquare,
  GitCompare,
  ChevronRight,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Award,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const VIDEOS = [
  {
    id: 1,
    title: "5 Chrome Extensions For Hackers!",
    caption: "Chrome Extension For Hackers #infosec",
    link: "https://www.facebook.com/share/r/1ByqdhCdHJ/",
    views: 3300000,
    likes: 44100,
    shares: 2700,
    comments: 401,
    duration: "11.77s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Dark Eyes (Slowed)",
    likeRate: 1.34,
    shareRate: 0.08,
    shareLikeRatio: 6.1,
    commentRate: 0.01,
  },
  {
    id: 2,
    title: "7 Free Resources To Learn Hacking From Scratch",
    caption: "Free Learning Resources for Hackers #infosec",
    link: "https://www.facebook.com/share/r/1K9mPUr8VM/",
    views: 1900000,
    likes: 28600,
    shares: 1500,
    comments: 273,
    duration: "10.57s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Eyes · Dark (Slowed)",
    likeRate: 1.51,
    shareRate: 0.079,
    shareLikeRatio: 5.24,
    commentRate: 0.014,
  },
  {
    id: 3,
    title: "How To Turn Your Phone Into a Hacking Machine!",
    caption: "Transform your phone into a Hacking Mechine #infosec",
    link: "https://www.facebook.com/share/r/197d92Qr3Z/",
    views: 1500000,
    likes: 22295,
    shares: 1939,
    comments: 137,
    duration: "11.67s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Jumbo · Game Over (feat. Poccex)",
    likeRate: 1.49,
    shareRate: 0.13,
    shareLikeRatio: 8.7,
    commentRate: 0.009,
  },
  {
    id: 4,
    title: "How to Setup a Laptop For Hacking Step By Step Guide!",
    caption: "Laptop Setup Guide for Hackers #infosec",
    link: "https://www.facebook.com/share/r/1Bd6JsyEmh/",
    views: 1300000,
    likes: 17860,
    shares: 2031,
    comments: 95,
    duration: "12.27s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Tony Dark Eyes · Dark (Slowed)",
    likeRate: 1.37,
    shareRate: 0.156,
    shareLikeRatio: 11.37,
    commentRate: 0.007,
  },
  {
    id: 5,
    title: "Transform Android into Hacking Machine!",
    caption: "Transform Android into Hacking Mechine #infosec",
    link: "https://www.facebook.com/share/r/1KC2X8DhmH/",
    views: 1200000,
    likes: 20630,
    shares: 1596,
    comments: 191,
    duration: "11.37s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Tony Dark Eyes · Walk (Instrumental)",
    likeRate: 1.72,
    shareRate: 0.133,
    shareLikeRatio: 7.74,
    commentRate: 0.016,
  },
  {
    id: 6,
    title: "How to Become a Pro Hacker",
    caption: "Guidelines for Become a pro Hacker #CyberSecurity",
    link: "https://www.facebook.com/share/r/1D4CySr4hg/",
    views: 1100000,
    likes: 19759,
    shares: 1497,
    comments: 147,
    duration: "10.64s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Tony Dark Eyes · Dark (Slowed)",
    likeRate: 1.80,
    shareRate: 0.136,
    shareLikeRatio: 7.58,
    commentRate: 0.013,
  },
  {
    id: 7,
    title: "Beginner Hacking Guide is Trap",
    caption: "Beginner Hacking Guide is Trap #infosec",
    link: "https://www.facebook.com/share/v/185bMsRCM9/",
    views: 2000000,
    likes: 43249,
    shares: 5886,
    comments: 500,
    duration: "172s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "—",
    likeRate: 2.16,
    shareRate: 0.294,
    shareLikeRatio: 13.61,
    commentRate: 0.025,
  },
  {
    id: 8,
    title: "Cybersecurity Guidelines in 4 minutes",
    caption: "Cybersecurity Guidelines in 4 minutes #CyberSecurity",
    link: "https://www.facebook.com/share/v/1CuB3v3cen/",
    views: 1200000,
    likes: 28888,
    shares: 4878,
    comments: 220,
    duration: "220s",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "—",
    likeRate: 2.41,
    shareRate: 0.41,
    shareLikeRatio: 16.88,
    commentRate: 0.018,
  },
  {
    id: 9,
    title: "Change IP address every 3 second",
    caption: "Change your IP every 3 seconds using Tor on Kali Linux",
    link: "https://www.facebook.com/share/v/1GTUG7McHk/",
    views: 1300000,
    likes: 24759,
    shares: 4187,
    comments: 453,
    duration: "—",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "—",
    likeRate: 1.90,
    shareRate: 0.322,
    shareLikeRatio: 16.91,
    commentRate: 0.035,
  },
  {
    id: 10,
    title: "How to show all WiFi Password (Windows)",
    caption: "Show all saved WiFi passwords on Windows",
    link: "https://www.facebook.com/share/v/19M8u5AkL5/",
    views: 1100000,
    likes: 12712,
    shares: 2105,
    comments: 156,
    duration: "—",
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "—",
    likeRate: 1.16,
    shareRate: 0.191,
    shareLikeRatio: 16.56,
    commentRate: 0.014,
  },
];

const PATTERNS = [
  { label: "Duration", v1: "11.77s", v2: "10.57s", v3: "11.67s", v4: "12.27s", v5: "11.37s", v6: "10.64s", v7: "172s", v8: "220s ↑", note: "V7+V8 long-form outliers" },
  { label: "Format", v1: "9:16", v2: "9:16", v3: "9:16", v4: "9:16", v5: "9:16", v6: "9:16", v7: "9:16", v8: "9:16", note: "Always Reels format" },
  { label: "Music Style", v1: "Dark Slowed", v2: "Dark Slowed", v3: "Game Over", v4: "Dark Slowed", v5: "Walk Instr.", v6: "Dark Slowed", v7: "—", v8: "—", note: "Consistent dark energy" },
  { label: "Hashtag", v1: "#infosec", v2: "#infosec", v3: "#infosec", v4: "#infosec", v5: "#infosec", v6: "#CyberSec", v7: "#infosec", v8: "#CyberSec", note: "Cyber niche targeting" },
  { label: "Visual Theme", v1: "Black+Green", v2: "Black+Green", v3: "Black+Purple", v4: "Black+Red", v5: "Black+Green", v6: "Black+Green", v7: "Black+Red", v8: "Black+White", note: "Dark brand consistent" },
  { label: "Title Format", v1: "Number+Tool", v2: "Number+Res.", v3: "Action+Phone", v4: "How-to+Laptop", v5: "Action+Android", v6: "How-to+Role", v7: "Bait+Trap", v8: "Guide+Time ↑", note: "Time-bound hooks work" },
  { label: "Share:Like %", v1: "6.1%", v2: "5.24%", v3: "8.7%", v4: "11.37%", v5: "7.74%", v6: "7.58%", v7: "13.61%", v8: "16.88% ↑", note: "V8 record — viral peak" },
];

const TAKEAWAYS = [
  "Keep videos under 12 seconds — near 100% watch time triggers the algorithm",
  "Always use number-based titles: \"5 X\", \"7 X\" — specific numbers drive curiosity",
  "\"Free Resources\" framing is powerful — people love free, useful content",
  "Share:Like ratio above 5% means the content genuinely spreads organically",
  "Use #infosec or your niche hashtag on every post to build a targeted community",
  "Slowed, dark music builds a consistent brand aesthetic people recognise instantly",
  "\"Phone into Hacking Machine\" hit 8.7% Share:Like — device transformation hooks outperform list formats for shares",
  "Consistent 9:16 vertical format across all videos confirms Reels-first strategy is working",
];

// ─── Page-level aggregates ───────────────────────────────────────────────────

const totalViews    = VIDEOS.reduce((s, v) => s + v.views, 0);
const totalLikes    = VIDEOS.reduce((s, v) => s + v.likes, 0);
const totalShares   = VIDEOS.reduce((s, v) => s + v.shares, 0);
const avgLikeRate   = parseFloat((VIDEOS.reduce((s, v) => s + v.likeRate, 0) / VIDEOS.length).toFixed(2));
const avgShareLike  = parseFloat((VIDEOS.reduce((s, v) => s + v.shareLikeRatio, 0) / VIDEOS.length).toFixed(2));

// Actual views per video — chronological order (oldest V6 → newest V1)
const VIEWS_TREND = VIDEOS.slice().reverse().map((v) => ({
  name:  `V${v.id}`,
  views: v.views,
  viewsM: parseFloat((v.views / 1e6).toFixed(2)),
  title: v.title,
}));

// ─── Animated Number ─────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent =
          decimals === 0
            ? `${prefix}${Math.floor(v).toLocaleString()}${suffix}`
            : `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [value, suffix, prefix, decimals]);

  return (
    <span ref={nodeRef}>
      {prefix}
      {decimals === 0 ? Math.floor(value).toLocaleString() : value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="p-5 rounded-lg border border-primary/20 bg-card/50 flex flex-col items-center text-center group hover:border-primary/50 transition-colors hover:shadow-[0_0_15px_-5px_rgba(0,255,65,0.2)]"
    >
      <div className="text-primary/60 mb-3 group-hover:text-primary transition-colors group-hover:scale-110 transform duration-300">
        {icon}
      </div>
      <div className="text-2xl md:text-3xl font-mono font-bold text-foreground mb-1 tracking-tight">
        <AnimatedNumber value={value} />
      </div>
      <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({
  label,
  value,
  max,
  suffix,
  subtext,
  highlight = false,
}: {
  label: string;
  value: number;
  max: number;
  suffix: string;
  subtext: string;
  highlight?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs font-mono mb-1.5">
        <span className={highlight ? "text-primary font-bold" : "text-foreground"}>
          {label}
          {highlight && (
            <span className="ml-2 px-1.5 py-0.5 rounded-sm text-[9px] bg-primary text-black font-bold uppercase tracking-wider animate-pulse">
              Key
            </span>
          )}
        </span>
        <span>
          <span className="text-primary font-bold">
            <AnimatedNumber value={value} decimals={2} suffix={suffix} />
          </span>
          <span className="text-muted-foreground ml-1">{subtext}</span>
        </span>
      </div>
      <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-border/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
          className={`h-full ${highlight ? "bg-primary shadow-[0_0_8px_rgba(0,255,65,0.6)]" : "bg-primary/70"}`}
        />
      </div>
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({ prefix, title }: { prefix: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px bg-border flex-1" />
      <h2 className="text-lg md:text-xl font-mono text-white tracking-tight uppercase flex items-center gap-2 whitespace-nowrap">
        <span className="text-muted-foreground">{prefix}:</span>{" "}
        <span className="text-primary font-bold">{title}</span>
      </h2>
      <div className="h-px bg-border flex-1" />
    </div>
  );
}

// ─── Video Tab Button ────────────────────────────────────────────────────────

function VideoTab({
  video,
  rank,
  active,
  onClick,
}: {
  video: (typeof VIDEOS)[0];
  rank: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border font-mono text-sm transition-all ${
        active
          ? "border-primary/60 bg-primary/10 text-primary shadow-[0_0_14px_-4px_rgba(0,255,65,0.4)]"
          : "border-border bg-card/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-widest opacity-60">Video {video.id}</span>
        {rank === 1 && (
          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">Top</span>
        )}
        {rank === VIDEOS.length && (
          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground border border-border">Lowest</span>
        )}
      </div>
      <div className="font-bold leading-tight line-clamp-2">{video.title}</div>
      <div className="mt-2 flex items-center gap-2">
        <Eye className="w-3 h-3" />
        <span className="text-xs">
          {(video.views / 1_000_000).toFixed(1)}M views
        </span>
      </div>
    </button>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

// ─── Line Chart Config ───────────────────────────────────────────────────────

const LINE_SERIES = [
  { key: "Views",      color: "#00ff41", label: "Views (M)"      },
  { key: "Likes",      color: "#ffd700", label: "Likes (K)"      },
  { key: "Shares",     color: "#ff6b35", label: "Shares (K)"     },
  { key: "Comments",   color: "#a78bfa", label: "Comments"       },
  { key: "ShareLike",  color: "#38bdf8", label: "Share:Like %"   },
];

const maxViews      = Math.max(...VIDEOS.map((v) => v.views));
const maxLikes      = Math.max(...VIDEOS.map((v) => v.likes));
const maxShares     = Math.max(...VIDEOS.map(...[v => v.shares]));
const maxComments   = Math.max(...VIDEOS.map((v) => v.comments));
const maxShareLike  = Math.max(...VIDEOS.map((v) => v.shareLikeRatio));

const LINE_DATA = VIDEOS.map((vid) => ({
  name:      `V${vid.id}`,
  fullTitle: vid.title,
  Views:     parseFloat(((vid.views      / maxViews)     * 100).toFixed(1)),
  Likes:     parseFloat(((vid.likes      / maxLikes)     * 100).toFixed(1)),
  Shares:    parseFloat(((vid.shares     / maxShares)    * 100).toFixed(1)),
  Comments:  parseFloat(((vid.comments   / maxComments)  * 100).toFixed(1)),
  ShareLike: parseFloat(((vid.shareLikeRatio / maxShareLike) * 100).toFixed(1)),
  // raw for tooltip
  _views:      vid.views,
  _likes:      vid.likes,
  _shares:     vid.shares,
  _comments:   vid.comments,
  _shareLike:  vid.shareLikeRatio,
}));

function LineTooltip({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number; payload: (typeof LINE_DATA)[0] }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const raw = payload[0].payload;
  const actuals: Record<string, string> = {
    Views:     `${(raw._views / 1e6).toFixed(2)}M`,
    Likes:     `${(raw._likes / 1e3).toFixed(1)}K`,
    Shares:    `${(raw._shares / 1e3).toFixed(1)}K`,
    Comments:  String(raw._comments),
    ShareLike: `${raw._shareLike}%`,
  };
  return (
    <div className="bg-black/95 border border-white/10 rounded-lg p-3 font-mono text-xs shadow-xl min-w-[160px]">
      <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2">{label}</p>
      <p className="text-white/70 text-[10px] leading-snug mb-3 line-clamp-2">{raw.fullTitle}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-3 mb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
            <span style={{ color: p.color }} className="text-[10px]">{p.name}</span>
          </span>
          <span className="text-white font-bold text-[11px]">{actuals[p.name]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const v = VIDEOS.find((vid) => vid.id === activeId)!;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.12] bg-[linear-gradient(rgba(0,255,65,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl">
            <div>
              <h1 className="font-mono text-lg md:text-2xl text-primary tracking-widest font-bold flex items-center gap-2">
                <Terminal className="w-5 h-5 hidden sm:block" />
                VIRAL ANALYSIS REPORT
              </h1>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5 sm:ml-7">
                Hacker339 · {VIDEOS.length} Videos Analyzed
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/analytics"
                className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest border border-border hover:border-primary/40 px-3 py-1.5 rounded">
                <BarChart2 className="w-3 h-3" /> Analytics
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
                <span className="text-[10px] font-mono text-primary tracking-widest uppercase hidden sm:inline-block">
                  Live Data
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 md:px-6 py-10 max-w-5xl space-y-20">

          {/* ── Page Growth Summary ── */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-primary/25 bg-primary/[0.03] p-5 md:p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Verdict badge */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Page Growth Status</span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" /> Views Growing 3×
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] uppercase tracking-wider">
                  <Award className="w-3 h-3" /> Audience Expanding
                </span>
              </div>

              {/* Stat pills */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Total Reach",    value: `${(totalViews / 1e6).toFixed(1)}M`,  sub: "views across all videos", highlight: true },
                  { label: "Total Likes",    value: `${(totalLikes / 1000).toFixed(1)}K`, sub: "across all videos" },
                  { label: "Total Shares",   value: `${(totalShares / 1000).toFixed(1)}K`,sub: "organic spread" },
                  { label: "Avg Like Rate",  value: `${avgLikeRate}%`,                    sub: "per video average" },
                  { label: "Avg Share:Like", value: `${avgShareLike}%`,                   sub: "viral index average" },
                ].map((s) => (
                  <div key={s.label} className={`p-3 rounded-lg border ${s.highlight ? "border-primary/40 bg-primary/[0.06]" : "border-border/50 bg-black/20"}`}>
                    <div className={`font-mono font-bold text-xl ${s.highlight ? "text-primary" : "text-white"}`}>{s.value}</div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground/50 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── Video Selector ── */}
          <section>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
              Select Video
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[...VIDEOS].sort((a, b) => b.views - a.views).map((vid, i) => (
                <VideoTab
                  key={vid.id}
                  video={vid}
                  rank={i + 1}
                  active={activeId === vid.id}
                  onClick={() => setActiveId(vid.id)}
                />
              ))}
            </div>
          </section>

          {/* ── Selected Video Card ── */}
          <AnimatePresence mode="wait">
            <motion.section
              key={v.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="rounded-xl border border-primary/30 bg-card overflow-hidden shadow-[0_0_40px_-15px_rgba(0,255,65,0.25)] relative group">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50 group-hover:border-primary transition-colors" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/50 group-hover:border-primary transition-colors" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[80px] pointer-events-none" />

                <div className="p-8 md:p-14 text-center flex flex-col items-center relative z-10">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 ring-1 ring-primary/30 shadow-[0_0_18px_rgba(0,255,65,0.15)]">
                    <Play className="w-7 h-7 text-primary translate-x-0.5" />
                  </div>
                  <div className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.3em] mb-3">
                    Video {v.id} of {VIDEOS.length}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-mono font-bold text-white mb-3 tracking-tight leading-tight">
                    {v.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-8 font-mono">
                    Published by <span className="text-primary font-bold">Hacker339</span>
                    <span className="mx-2 opacity-40">·</span>
                    <span className="text-white/60">{v.caption}</span>
                  </p>
                  <a
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-black font-mono font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:scale-105 hover:shadow-[0_0_22px_rgba(0,255,65,0.5)] text-sm"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-2">
                      View Original Video <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.section>
          </AnimatePresence>

          {/* ── Stats Row ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`stats-${v.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              <StatCard icon={<Eye className="w-5 h-5" />} value={v.views} label="Total Views" />
              <StatCard icon={<ThumbsUp className="w-5 h-5" />} value={v.likes} label="Likes" />
              <StatCard icon={<Share2 className="w-5 h-5" />} value={v.shares} label="Shares" />
              <StatCard icon={<MessageSquare className="w-5 h-5" />} value={v.comments} label="Comments" />
            </motion.div>
          </AnimatePresence>

          {/* ── Technical + Engagement ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tech-${v.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            >
              {/* Tech Profile */}
              <div className="lg:col-span-1 p-5 rounded-lg border border-border bg-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full blur-3xl" />
                <h3 className="text-[11px] font-mono text-primary mb-5 border-b border-border pb-3 flex items-center gap-2 uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5" /> Technical_Profile
                </h3>
                <ul className="space-y-3.5 font-mono text-sm relative z-10">
                  {[
                    ["Duration", v.duration],
                    ["Format", v.format],
                    ["Frame Rate", v.fps],
                    ["Platform", "FB Reels"],
                    ["Music", v.music],
                  ].map(([k, val]) => (
                    <li key={k} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{k}</span>
                      <span
                        className={
                          k === "Music"
                            ? "text-primary text-xs bg-primary/10 px-2 py-0.5 rounded border border-primary/20"
                            : "text-white font-medium"
                        }
                      >
                        {val}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engagement */}
              <div className="lg:col-span-2 p-5 rounded-lg border border-border bg-card relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/4 rounded-full blur-3xl" />
                <h3 className="text-[11px] font-mono text-primary mb-5 border-b border-border pb-3 flex items-center gap-2 uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" /> Engagement_Analysis
                </h3>
                <div className="space-y-5 relative z-10">
                  <ProgressBar label="Like Rate" value={v.likeRate} max={5} suffix="%" subtext="of views" />
                  <ProgressBar label="Share Rate" value={v.shareRate} max={0.5} suffix="%" subtext="of views" />
                  <ProgressBar
                    label="Share-to-Like Ratio"
                    value={v.shareLikeRatio}
                    max={10}
                    suffix="%"
                    subtext="viral spread index"
                    highlight
                  />
                  <ProgressBar label="Comment Rate" value={v.commentRate} max={0.1} suffix="%" subtext="of views" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Actual Views Trend ── */}
          <section>
            <SectionHeading prefix="Growth" title="Views_Per_Video" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Trend bar chart */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 p-5 pt-6 rounded-xl border border-border bg-card relative overflow-hidden shadow-[0_0_40px_-15px_rgba(0,255,65,0.08)]"
              >
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
                  Actual view count — by video ID (V1–V8)
                </p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={VIEWS_TREND} margin={{ top: 4, right: 16, left: -8, bottom: 4 }} barCategoryGap="30%">
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#666", fontFamily: "monospace", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} tick={{ fill: "#555", fontFamily: "monospace", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload as (typeof VIEWS_TREND)[0];
                        return (
                          <div className="bg-black/95 border border-white/10 rounded-lg p-3 font-mono text-xs shadow-xl">
                            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">{d.name}</p>
                            <p className="text-white/70 text-[10px] mb-2 line-clamp-1">{d.title}</p>
                            <p className="text-primary font-bold text-sm">{d.viewsM}M views</p>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="views" fill="#00ff41" radius={[4, 4, 0, 0]} opacity={0.85} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Diagnosis panel */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-xl border border-border bg-card space-y-4"
              >
                <h3 className="text-[11px] font-mono text-primary uppercase tracking-widest border-b border-border pb-3">
                  Growth_Diagnosis
                </h3>

                <div className="space-y-3">
                  <div className="flex gap-2.5">
                    <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono text-white font-medium">Views are growing 3×</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">1.1M (oldest) → 3.3M (newest). Page ka reach 3 guna ho gaya hai.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono text-white font-medium">Audience expanding fast</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Jitne naye log page par aa rahe hain, views badhte ja rahe hain — strong momentum.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono text-white font-medium">Viral spread consistent</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Har video ka Share:Like &gt; 5% — formula start se hi kaam kar raha tha.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-[11px] font-mono text-primary/90 leading-relaxed">
                    <span className="font-bold">Bottom line:</span> Page strong growth par hai — purane videos se 3× zyada views aa rahe hain naye videos par. Formula kaam kar raha hai.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Growth Breakdown ── */}
          <section>
            <SectionHeading prefix="Analysis" title="What_Is_Working" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5" />,
                  title: "Overall Page Growth",
                  stat: "Views 3× in 6 videos",
                  detail: `Oldest video (V6) ne 1.1M views liye the, newest (V1) ne 3.3M liye — page ka reach 3 guna ho gaya hai sirf 6 videos mein.`,
                  color: "text-primary",
                  border: "border-primary/30",
                },
                {
                  icon: <Award className="w-5 h-5" />,
                  title: "Best Viral Formula",
                  stat: "Step-by-Step Guides",
                  detail: `V4 "Laptop Setup" — 11.37% Share:Like (highest across all videos). Instructional content sabse zyada share hota hai.`,
                  color: "text-yellow-400",
                  border: "border-yellow-500/20",
                },
                {
                  icon: <ArrowRight className="w-5 h-5" />,
                  title: "Next Video Strategy",
                  stat: "Keep the momentum",
                  detail: `Newest video 3.3M views par hai. Agle video mein same format (dark aesthetic + tool/resource + short duration) rakho aur 4M target karo.`,
                  color: "text-blue-400",
                  border: "border-blue-500/20",
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-5 rounded-xl border ${card.border} bg-card/60 hover:bg-card transition-all`}
                >
                  <div className={`${card.color} mb-3`}>{card.icon}</div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{card.title}</p>
                  <p className={`font-mono font-bold text-base ${card.color} mb-2`}>{card.stat}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.detail}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Visual Chart Comparison ── */}
          <section>
            <SectionHeading prefix="Chart" title="Visual_Comparison" />

            {/* Colour legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5 px-1">
              {LINE_SERIES.map((s) => (
                <span key={s.key} className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <span className="w-5 h-0.5 rounded-full inline-block" style={{ background: s.color }} />
                  <span style={{ color: s.color }}>{s.label}</span>
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="p-5 pt-6 rounded-xl border border-border bg-card relative overflow-hidden shadow-[0_0_40px_-15px_rgba(0,255,65,0.1)]"
            >
              <div className="absolute -top-10 -right-10 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Normalised score (% of max) — hover for actual values
              </p>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={LINE_DATA} margin={{ top: 8, right: 24, left: -12, bottom: 4 }} barCategoryGap="25%">
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#666", fontFamily: "monospace", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 105]}
                    tick={{ fill: "#555", fontFamily: "monospace", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<LineTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  {LINE_SERIES.map((s) => (
                    <Bar
                      key={s.key}
                      dataKey={s.key}
                      fill={s.color}
                      radius={[3, 3, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </section>

          {/* ── Side-by-Side Comparison ── */}
          <section>
            <SectionHeading prefix="Analysis" title="Video_Comparison" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-card overflow-x-auto relative"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

              {/* Header row */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-border/60 bg-black/30 min-w-[1000px]">
                <div className="py-3 px-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest border-r border-border/40">
                  Metric
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary uppercase tracking-widest border-r border-border/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> V1
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary/70 uppercase tracking-widest border-r border-border/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" /> V2
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary/50 uppercase tracking-widest border-r border-border/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" /> V3
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary/40 uppercase tracking-widest border-r border-border/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/20 shrink-0" /> V4
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary/30 uppercase tracking-widest border-r border-border/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/15 shrink-0" /> V5
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary/20 uppercase tracking-widest border-r border-border/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/10 shrink-0" /> V6
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary/60 uppercase tracking-widest border-r border-border/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" /> V7
                </div>
                <div className="py-3 px-3 font-mono text-[10px] text-primary/80 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" /> V8
                </div>
              </div>

              {[
                ["Views",     "3.3M",   "1.9M",   "1.5M",   "1.3M",   "1.2M",   "1.1M",   "2.0M",   "1.2M"],
                ["Likes",     "44.1K",  "28.6K",  "22.3K",  "17.9K",  "20.6K",  "19.8K",  "43.2K",  "28.9K"],
                ["Shares",    "2.7K",   "1.5K",   "1.9K",   "2.0K",   "1.6K",   "1.5K",   "5.9K",   "4.9K"],
                ["Comments",  "401",    "273",    "137",    "95",     "191",    "147",    "500",    "220"],
                ["Duration",  "11.77s", "10.57s", "11.67s", "12.27s", "11.37s", "10.64s", "172s",   "220s ↑"],
                ["Like Rate", "1.34%",  "1.51%",  "1.49%",  "1.37%",  "1.72%",  "1.80%",  "2.16%",  "2.41% ↑"],
                ["Share:Like","6.1%",   "5.24%",  "8.7%",   "11.37%", "7.74%",  "7.58%",  "13.61%", "16.88% ↑"],
              ].map(([metric, v1, v2, v3, v4, v5, v6, v7, v8], i) => (
                <div
                  key={metric}
                  className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-border/30 last:border-0 hover:bg-white/[0.02] transition-colors min-w-[1000px] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                >
                  <div className="py-3 px-3 font-mono text-xs text-muted-foreground border-r border-border/30">
                    {metric}
                  </div>
                  <div className="py-3 px-3 font-mono text-sm text-white font-medium border-r border-border/30">
                    {v1}
                  </div>
                  <div className={`py-3 px-3 font-mono text-sm font-medium border-r border-border/30 ${v2!.includes("↑") ? "text-primary" : "text-white/80"}`}>
                    {v2}
                  </div>
                  <div className={`py-3 px-3 font-mono text-sm font-medium border-r border-border/30 ${v3!.includes("↑") ? "text-primary" : "text-white/80"}`}>
                    {v3}
                  </div>
                  <div className={`py-3 px-3 font-mono text-sm font-medium border-r border-border/30 ${v4!.includes("↑") ? "text-primary" : "text-white/80"}`}>
                    {v4}
                  </div>
                  <div className={`py-3 px-3 font-mono text-sm font-medium border-r border-border/30 ${v5!.includes("↑") ? "text-primary" : "text-white/80"}`}>
                    {v5}
                  </div>
                  <div className={`py-3 px-3 font-mono text-sm font-medium border-r border-border/30 ${v6!.includes("↑") ? "text-primary" : "text-white/80"}`}>
                    {v6}
                  </div>
                  <div className={`py-3 px-3 font-mono text-sm font-medium border-r border-border/30 ${v7!.includes("↑") ? "text-primary" : "text-white/80"}`}>
                    {v7}
                  </div>
                  <div className={`py-3 px-3 font-mono text-sm font-medium ${v8!.includes("↑") ? "text-primary" : "text-white/80"}`}>
                    {v8}
                  </div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ── Confirmed Patterns ── */}
          <section>
            <SectionHeading prefix="Pattern" title="Confirmed_Consistency" />
            <div className="space-y-2">
              {PATTERNS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-[110px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-2 p-3 rounded-lg border border-border/40 bg-card/40 hover:border-primary/30 hover:bg-card/60 transition-all group text-sm font-mono min-w-[1060px]"
                >
                  <span className="text-muted-foreground text-xs uppercase tracking-wide">{p.label}</span>
                  <span className="text-white/80 text-xs truncate">{p.v1}</span>
                  <span className="text-white/80 text-xs truncate">{p.v2}</span>
                  <span className={`text-xs truncate ${p.v3.includes("↑") ? "text-primary font-bold" : "text-white/80"}`}>{p.v3}</span>
                  <span className={`text-xs truncate ${p.v4.includes("↑") ? "text-primary font-bold" : "text-white/80"}`}>{p.v4}</span>
                  <span className={`text-xs truncate ${p.v5.includes("↑") ? "text-primary font-bold" : "text-white/80"}`}>{p.v5}</span>
                  <span className={`text-xs truncate ${p.v6.includes("↑") ? "text-primary font-bold" : "text-white/80"}`}>{p.v6}</span>
                  <span className={`text-xs truncate ${p.v7.includes("↑") ? "text-primary font-bold" : "text-white/80"}`}>{p.v7}</span>
                  <span className={`text-xs truncate ${p.v8.includes("↑") ? "text-primary font-bold" : "text-white/80"}`}>{p.v8}</span>
                  <span className="flex items-center gap-1.5 text-primary text-[10px] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full whitespace-nowrap group-hover:bg-primary/20 transition-colors">
                    <Zap className="w-2.5 h-2.5" /> {p.note}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Proven Formula ── */}
          <section>
            <SectionHeading prefix="Framework" title="Viral_Formula" />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-xl border border-primary/25 bg-primary/[0.03] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/6 rounded-full blur-3xl" />

              <div className="flex flex-wrap items-center gap-2 font-mono text-sm relative z-10">
                {[
                  "Short Duration (< 12s)",
                  "+",
                  "Black/Green Hacker Aesthetic",
                  "+",
                  "Number Title (\"5 X\", \"7 X\")",
                  "+",
                  "Resource / Tool Content",
                  "+",
                  "Cybersecurity Niche",
                  "+",
                  "Slowed Dark Music",
                  "+",
                  "#infosec Hashtag",
                  "=",
                  "VIRAL REEL",
                ].map((item, i) => (
                  <span
                    key={i}
                    className={
                      item === "="
                        ? "text-white/40 text-lg mx-1"
                        : item === "+"
                        ? "text-white/30 text-lg mx-0.5"
                        : item === "VIRAL REEL"
                        ? "px-3 py-1 bg-primary text-black font-bold rounded-sm shadow-[0_0_16px_rgba(0,255,65,0.4)]"
                        : "px-2.5 py-1 border border-primary/30 text-primary/90 rounded bg-primary/5"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── Takeaways ── */}
          <section className="pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary/[0.03] border border-primary/20 p-7 md:p-10 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-xl font-mono text-white mb-7 flex items-center gap-3 relative z-10">
                <Target className="text-primary w-5 h-5" /> ACTIONABLE_TAKEAWAYS
                <span className="ml-2 text-xs font-normal text-muted-foreground flex items-center gap-1">
                  <GitCompare className="w-3 h-3" /> Based on {VIDEOS.length} videos
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
                {TAKEAWAYS.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex gap-3 p-4 bg-black/40 border border-primary/10 rounded group hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-2 mt-0.5">
                      <CheckSquare className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── Next Steps ── */}
          <section className="pb-4">
            <div className="p-5 rounded-lg border border-border/40 bg-card/30 font-mono text-sm">
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-primary" /> Research Status
              </p>
              <div className="space-y-2">
                {[
                  { done: true, text: "Video #1 analyzed — 5 Chrome Extensions For Hackers (3.3M)" },
                  { done: true, text: "Video #2 analyzed — 7 Free Resources To Learn Hacking (1.9M)" },
                  { done: true, text: "Video #3 analyzed — How To Turn Your Phone Into a Hacking Machine (1.5M)" },
                  { done: true, text: "Video #4 analyzed — How to Setup a Laptop For Hacking Step By Step Guide (1.3M)" },
                  { done: true, text: "Video #5 analyzed — Transform Android into Hacking Machine (1.2M)" },
                  { done: false, text: "Posting frequency pattern — pending" },
                  { done: false, text: "Full page niche audit — pending" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs">
                    <span className={item.done ? "text-primary" : "text-muted-foreground/40"}>
                      {item.done ? "▪" : "▫"}
                    </span>
                    <span className={item.done ? "text-foreground" : "text-muted-foreground/60"}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="py-10 border-t border-border bg-background/50 text-center relative z-10">
          <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
            Research Report{" "}
            <span className="mx-2 text-primary/40">·</span> July 2026{" "}
            <span className="mx-2 text-primary/40">·</span> {VIDEOS.length} Videos Analyzed{" "}
            <span className="mx-2 text-primary/40">·</span> Data from Facebook Reels
          </p>
          <div className="mt-5 flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
          </div>
        </footer>
      </div>
    </div>
  );
}
