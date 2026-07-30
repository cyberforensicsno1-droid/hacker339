import { useState, useEffect, useRef } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Eye,
  ThumbsUp,
  Share2,
  MessageSquare,
  BarChart2,
  Terminal,
  Zap,
  X,
  ExternalLink,
  Download,
  AlertCircle,
} from "lucide-react";
import {
  loadVideos,
  addVideo,
  deleteVideo,
  computeAverages,
  type VideoData,
} from "@/data/videos";
import { Link } from "wouter";

// ─── Animated Number ─────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ctrl = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent =
          decimals === 0
            ? Math.floor(v).toLocaleString() + suffix
            : v.toFixed(decimals) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [value, suffix, decimals]);
  return (
    <span ref={ref}>
      {decimals === 0 ? Math.floor(value).toLocaleString() : value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── Big Avg Card ─────────────────────────────────────────────────────────────

function AvgCard({
  icon,
  label,
  value,
  sub,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-5 rounded-lg border flex flex-col gap-3 group transition-all ${
        highlight
          ? "border-primary/50 bg-primary/[0.06] shadow-[0_0_18px_-6px_rgba(0,255,65,0.35)]"
          : "border-border bg-card/50 hover:border-primary/30"
      }`}
    >
      <div className={`${highlight ? "text-primary" : "text-primary/60 group-hover:text-primary"} transition-colors`}>
        {icon}
      </div>
      <div>
        <div className={`font-mono font-bold text-2xl ${highlight ? "text-primary" : "text-white"}`}>
          <AnimatedNumber value={value} decimals={Number.isInteger(value) ? 0 : 2} suffix="" />
        </div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
          {label}
        </div>
        {sub && (
          <div className="text-xs text-muted-foreground/60 mt-1 font-mono">{sub}</div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Import Modal ─────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: "",
  caption: "",
  link: "",
  views: "",
  likes: "",
  shares: "",
  comments: "",
  durationSec: "",
  music: "",
};

function ImportModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: Omit<VideoData, "id">) => void;
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<typeof EMPTY_FORM>>({});

  const set = (k: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  function validate() {
    const e: Partial<typeof EMPTY_FORM> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.views || isNaN(+form.views) || +form.views <= 0) e.views = "Enter a valid number";
    if (!form.likes || isNaN(+form.likes) || +form.likes < 0) e.likes = "Enter a valid number";
    if (!form.shares || isNaN(+form.shares) || +form.shares < 0) e.shares = "Enter a valid number";
    if (!form.comments || isNaN(+form.comments) || +form.comments < 0) e.comments = "Enter a valid number";
    if (!form.durationSec || isNaN(+form.durationSec) || +form.durationSec <= 0)
      e.durationSec = "Enter seconds (e.g. 11.77)";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const dur = +form.durationSec;
    onSave({
      title: form.title.trim(),
      caption: form.caption.trim(),
      link: form.link.trim(),
      views: Math.round(+form.views),
      likes: Math.round(+form.likes),
      shares: Math.round(+form.shares),
      comments: Math.round(+form.comments),
      duration: `${dur}s`,
      durationSec: dur,
      format: "720×1280 (9:16)",
      fps: "30 FPS",
      music: form.music.trim() || "Unknown",
    });
  }

  const fields: { key: keyof typeof EMPTY_FORM; label: string; placeholder: string; type?: string }[] = [
    { key: "title",       label: "Video Title *",        placeholder: "e.g. 5 Chrome Extensions For Hackers!" },
    { key: "caption",     label: "Caption / Hashtag",    placeholder: "e.g. Chrome Extension For Hackers #infosec" },
    { key: "link",        label: "Facebook Video Link",  placeholder: "https://www.facebook.com/share/r/..." },
    { key: "views",       label: "Total Views *",        placeholder: "e.g. 3300000",  type: "number" },
    { key: "likes",       label: "Total Likes *",        placeholder: "e.g. 44100",    type: "number" },
    { key: "shares",      label: "Total Shares *",       placeholder: "e.g. 2700",     type: "number" },
    { key: "comments",    label: "Total Comments *",     placeholder: "e.g. 401",      type: "number" },
    { key: "durationSec", label: "Duration (seconds) *", placeholder: "e.g. 11.77",    type: "number" },
    { key: "music",       label: "Background Music",     placeholder: "e.g. Dark Eyes (Slowed)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        className="bg-card border border-primary/30 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_0_60px_-15px_rgba(0,255,65,0.3)] relative"
      >
        {/* top bar */}
        <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border/50 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-mono text-sm text-primary uppercase tracking-widest flex items-center gap-2">
            <Download className="w-4 h-4" /> Import_Video_Data
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* helper note */}
          <div className="flex gap-2.5 p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs font-mono text-primary/80">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Video dekh ke stats manually enter karo. Views, Likes, Shares, Comments,
              aur Duration fill karo — baaki optional hai.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, placeholder, type }) => (
              <div key={key} className={key === "title" || key === "caption" || key === "link" ? "sm:col-span-2" : ""}>
                <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
                  {label}
                </label>
                <input
                  type={type ?? "text"}
                  step={type === "number" ? "any" : undefined}
                  value={form[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                  className={`w-full bg-background border rounded px-3 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors ${
                    errors[key]
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-border focus:border-primary/60"
                  }`}
                />
                {errors[key] && (
                  <p className="text-[10px] text-red-400 font-mono mt-1">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-border text-muted-foreground font-mono text-sm rounded hover:border-primary/30 hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-primary text-black font-mono font-bold text-sm rounded hover:shadow-[0_0_16px_rgba(0,255,65,0.5)] transition-all"
            >
              Save Video
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Video Row ────────────────────────────────────────────────────────────────

function VideoRow({ v, onDelete }: { v: VideoData; onDelete: () => void }) {
  const likeRate = ((v.likes / v.views) * 100).toFixed(2);
  const shareLike = ((v.shares / v.likes) * 100).toFixed(2);

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      layout
      className="border-b border-border/30 hover:bg-white/[0.02] transition-colors group text-sm font-mono"
    >
      <td className="py-3 px-4">
        <div className="text-white font-medium leading-tight max-w-[220px] truncate" title={v.title}>
          {v.title}
        </div>
        <div className="text-[10px] text-muted-foreground mt-0.5 truncate">{v.caption}</div>
      </td>
      <td className="py-3 px-4 text-primary">{(v.views / 1_000_000).toFixed(1)}M</td>
      <td className="py-3 px-4 text-white/80">{(v.likes / 1000).toFixed(1)}K</td>
      <td className="py-3 px-4 text-white/80">{(v.shares / 1000).toFixed(1)}K</td>
      <td className="py-3 px-4 text-white/80">{v.comments}</td>
      <td className="py-3 px-4 text-white/70">{v.duration}</td>
      <td className="py-3 px-4 text-primary/80">{likeRate}%</td>
      <td className="py-3 px-4">
        <span className="text-primary font-bold">{shareLike}%</span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {v.link && (
            <a href={v.link} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button onClick={onDelete} className="text-muted-foreground hover:text-red-400 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

// ─── Main Analytics Page ──────────────────────────────────────────────────────

export default function Analytics() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setVideos(loadVideos());
  }, []);

  const avgs = computeAverages(videos);

  function handleAdd(data: Omit<VideoData, "id">) {
    setVideos((prev) => addVideo(prev, data));
    setShowModal(false);
  }

  function handleDelete(id: number) {
    setVideos((prev) => deleteVideo(prev, id));
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Grid bg */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.12] bg-[linear-gradient(rgba(0,255,65,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl">
            <div>
              <h1 className="font-mono text-lg md:text-2xl text-primary tracking-widest font-bold flex items-center gap-2">
                <Terminal className="w-5 h-5 hidden sm:block" />
                ANALYTICS &amp; AVERAGES
              </h1>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5 sm:ml-7">
                Hacker339 · {videos.length} Videos · Aggregated Insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/"
                className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest border border-border hover:border-primary/40 px-3 py-1.5 rounded">
                ← Reports
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-mono font-bold text-xs rounded hover:shadow-[0_0_14px_rgba(0,255,65,0.5)] transition-all uppercase tracking-wider"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Import Video
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 md:px-6 py-10 max-w-5xl space-y-16">

          {/* ── Average Summary Cards ── */}
          {avgs && (
            <section>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                <BarChart2 className="w-3.5 h-3.5 text-primary" />
                Average Per Video — across {videos.length} videos
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <AvgCard icon={<Eye className="w-5 h-5" />} label="Avg Views" value={avgs.avgViews}
                  sub={`Total: ${(avgs.totalViews / 1_000_000).toFixed(1)}M`} />
                <AvgCard icon={<ThumbsUp className="w-5 h-5" />} label="Avg Likes" value={avgs.avgLikes}
                  sub={`Total: ${(avgs.totalLikes / 1000).toFixed(1)}K`} />
                <AvgCard icon={<Share2 className="w-5 h-5" />} label="Avg Shares" value={avgs.avgShares}
                  sub={`Total: ${(avgs.totalShares / 1000).toFixed(1)}K`} />
                <AvgCard icon={<MessageSquare className="w-5 h-5" />} label="Avg Comments" value={avgs.avgComments}
                  sub={`Total: ${avgs.totalComments}`} />
              </div>

              {/* Rate averages */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <AvgCard icon={<Zap className="w-5 h-5" />} label="Avg Like Rate"
                  value={avgs.avgLikeRate} sub="% of views" />
                <AvgCard icon={<Zap className="w-5 h-5" />} label="Avg Share Rate"
                  value={avgs.avgShareRate} sub="% of views" />
                <AvgCard icon={<Zap className="w-5 h-5" />} label="Avg Share:Like"
                  value={avgs.avgShareLikeRatio} sub="viral spread index" highlight />
                <AvgCard icon={<Terminal className="w-5 h-5" />} label="Avg Duration"
                  value={avgs.avgDurationSec} sub="seconds per video" />
              </div>
            </section>
          )}

          {/* ── Benchmark Box ── */}
          {avgs && (
            <section>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-primary" /> Target Benchmarks — Aapke page ke liye goal
              </p>
              <div className="rounded-xl border border-primary/25 bg-primary/[0.03] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                  {[
                    {
                      label: "Minimum Views Target",
                      value: `${(avgs.avgViews * 0.5 / 1_000_000).toFixed(1)}M+`,
                      desc: "50% of current average — achievable for a new page",
                    },
                    {
                      label: "Ideal Video Duration",
                      value: `≤ ${Math.ceil(avgs.avgDurationSec)}s`,
                      desc: "Stay under this to maximize watch completion rate",
                    },
                    {
                      label: "Share:Like Goal",
                      value: `≥ ${(avgs.avgShareLikeRatio * 0.8).toFixed(1)}%`,
                      desc: "80% of Hacker339's average — indicates viral content",
                    },
                  ].map((b) => (
                    <div key={b.label} className="space-y-1.5">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{b.label}</div>
                      <div className="text-2xl font-mono font-bold text-primary">{b.value}</div>
                      <div className="text-xs text-muted-foreground/80 font-mono leading-relaxed">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Video Table ── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-primary" /> All Videos ({videos.length})
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 text-xs font-mono text-primary hover:text-primary/80 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add Video
              </button>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border/60 bg-black/30">
                      {["Title", "Views", "Likes", "Shares", "Comments", "Duration", "Like Rate", "Share:Like", ""].map((h) => (
                        <th key={h} className="py-3 px-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-normal">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {videos.map((v) => (
                        <VideoRow key={v.id} v={v} onDelete={() => handleDelete(v.id)} />
                      ))}
                    </AnimatePresence>

                    {/* Average row */}
                    {avgs && (
                      <tr className="bg-primary/[0.04] border-t-2 border-primary/30 font-mono text-sm">
                        <td className="py-3 px-4 text-primary font-bold text-xs uppercase tracking-wider">
                          AVERAGE
                        </td>
                        <td className="py-3 px-4 text-primary font-bold">{(avgs.avgViews / 1_000_000).toFixed(1)}M</td>
                        <td className="py-3 px-4 text-white/90">{(avgs.avgLikes / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-white/90">{(avgs.avgShares / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-white/90">{avgs.avgComments}</td>
                        <td className="py-3 px-4 text-white/90">{avgs.avgDurationSec}s</td>
                        <td className="py-3 px-4 text-primary/80">{avgs.avgLikeRate}%</td>
                        <td className="py-3 px-4 text-primary font-bold">{avgs.avgShareLikeRatio}%</td>
                        <td />
                      </tr>
                    )}

                    {videos.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-muted-foreground font-mono text-sm">
                          No videos yet. Click "Import Video" to add one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── How to Improve ── */}
          {avgs && (
            <section className="pb-4">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-primary" /> Aapka Page Kaise Improve Kare
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    num: "01",
                    title: "Video Duration Target",
                    desc: `Apne videos ${Math.ceil(avgs.avgDurationSec)} seconds ya usse kam rakho. Hacker339 ka average ${avgs.avgDurationSec}s hai — yahi formula kaam kar raha hai.`,
                  },
                  {
                    num: "02",
                    title: "Engagement Goal",
                    desc: `Apne har video par Like Rate ${avgs.avgLikeRate}% se upar laao. Agar nahi aa raha toh title aur content more curiosity-driven banao.`,
                  },
                  {
                    num: "03",
                    title: "Viral Share Trigger",
                    desc: `Share:Like ratio ${avgs.avgShareLikeRatio}% benchmark hai. Isse achieve karne ke liye content "useful + surprising" hona chahiye — sirf entertaining nahi.`,
                  },
                  {
                    num: "04",
                    title: "More Data = Better Insight",
                    desc: `Abhi ${videos.length} videos analyzed hain. Jitne zyada videos add karoge, utna accurate average milega. Saare popular videos add karo.`,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-5 bg-card border border-border rounded-lg group hover:border-primary/30 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 font-mono text-5xl font-bold text-primary/[0.04] group-hover:text-primary/10 transition-colors pointer-events-none select-none">
                      {item.num}
                    </div>
                    <h3 className="text-sm font-mono font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </main>

        <footer className="py-10 border-t border-border bg-background/50 text-center relative z-10">
          <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
            Analytics Dashboard <span className="mx-2 text-primary/40">·</span> July 2026{" "}
            <span className="mx-2 text-primary/40">·</span> {videos.length} Videos Indexed
          </p>
        </footer>
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {showModal && (
          <ImportModal onClose={() => setShowModal(false)} onSave={handleAdd} />
        )}
      </AnimatePresence>
    </div>
  );
}
