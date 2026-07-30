import { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";
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
  CheckSquare
} from "lucide-react";

function AnimatedNumber({ value, suffix = "", prefix = "", decimals = 0 }: { value: number, suffix?: string, prefix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (decimals === 0) {
          node.textContent = `${prefix}${Math.floor(v).toLocaleString()}${suffix}`;
        } else {
          node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [value, suffix, prefix, decimals]);

  return (
    <span ref={nodeRef}>
      {prefix}{decimals === 0 ? Math.floor(value).toLocaleString() : value.toFixed(decimals)}{suffix}
    </span>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg border border-primary/20 bg-card/50 flex flex-col items-center text-center group hover:border-primary/50 transition-colors hover:shadow-[0_0_15px_-5px_rgba(0,255,65,0.2)]"
    >
      <div className="text-primary/70 mb-4 group-hover:text-primary transition-colors group-hover:scale-110 transform duration-300">
        {icon}
      </div>
      <div className="text-2xl md:text-3xl font-mono font-bold text-foreground mb-1 tracking-tight">
        <AnimatedNumber value={value} />
      </div>
      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

function ProgressBar({ label, value, max, suffix, subtext }: { label: string, value: number, max: number, suffix: string, subtext: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div>
      <div className="flex justify-between text-xs font-mono mb-1.5">
        <span className="text-foreground">{label}</span>
        <span>
          <span className="text-primary font-bold"><AnimatedNumber value={value} decimals={2} suffix={suffix} /></span>
          <span className="text-muted-foreground ml-1">{subtext}</span>
        </span>
      </div>
      <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-border/50">
        <motion.div 
          initial={{ width: 0 }} 
          whileInView={{ width: `${percentage}%` }} 
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-full bg-primary/80" 
        />
      </div>
    </div>
  )
}

function ViralCard({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative p-6 bg-card border border-border group hover:border-primary/40 transition-all overflow-hidden rounded-lg flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 p-4 font-mono text-6xl font-bold text-primary/[0.03] group-hover:text-primary/10 transition-colors pointer-events-none select-none">
        {num}
      </div>
      <h3 className="text-lg font-mono font-bold text-white mb-3 relative z-10 group-hover:text-primary transition-colors pr-8">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10 flex-1">{desc}</p>
    </motion.div>
  )
}

function FormulaRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      <th className="py-4 px-6 font-mono font-normal text-muted-foreground w-1/3 border-r border-border/50">{label}</th>
      <td className={`py-4 px-6 font-medium ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </td>
    </tr>
  )
}

function TakeawayCard({ text }: { text: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-3 p-4 bg-black/40 border border-primary/10 rounded group hover:border-primary/30 transition-colors"
    >
      <CheckSquare className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Background Grid & Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-10 mix-blend-overlay" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl">
            <div>
              <h1 className="font-mono text-xl md:text-2xl text-primary tracking-widest font-bold flex items-center gap-2">
                <Terminal className="w-5 h-5 hidden sm:block" />
                VIRAL ANALYSIS REPORT
              </h1>
              <p className="text-xs text-muted-foreground font-mono mt-1 sm:ml-7">Hacker339 Page Research</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
              <span className="text-[10px] font-mono text-primary tracking-widest uppercase hidden sm:inline-block">Live Data</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Section 1: Hero / Video Card */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="rounded-xl border border-primary/30 bg-card overflow-hidden shadow-[0_0_40px_-15px_rgba(0,255,65,0.3)] relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
              
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 group-hover:border-primary/80 transition-colors" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 group-hover:border-primary/80 transition-colors" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 group-hover:border-primary/80 transition-colors" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 group-hover:border-primary/80 transition-colors" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="p-8 md:p-16 text-center flex flex-col items-center relative z-10">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-8 ring-1 ring-primary/30 shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary translate-x-0.5" />
                </div>
                <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-4 tracking-tight leading-tight">5 Chrome Extensions For Hackers!</h2>
                <p className="text-lg text-muted-foreground mb-10 font-mono">Published by <span className="text-primary font-bold">Hacker339</span></p>
                
                <a 
                  href="https://www.facebook.com/share/r/1ByqdhCdHJ/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-mono font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    View Source Asset <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <StatCard icon={<Eye className="w-6 h-6" />} value={3300000} label="Total Views" />
            <StatCard icon={<ThumbsUp className="w-6 h-6" />} value={44100} label="Total Likes" />
            <StatCard icon={<Share2 className="w-6 h-6" />} value={2700} label="Total Shares" />
            <StatCard icon={<MessageSquare className="w-6 h-6" />} value={401} label="Total Comments" />
          </div>

          {/* Section 3 & 4: Technical Profile & Engagement Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 p-6 rounded-lg border border-border bg-card relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <h3 className="text-sm font-mono text-primary mb-6 border-b border-border pb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> TECHNICAL_PROFILE
              </h3>
              <ul className="space-y-4 font-mono text-sm relative z-10">
                <li className="flex justify-between items-center"><span className="text-muted-foreground">Duration</span> <span className="text-white font-medium">11.77s</span></li>
                <li className="flex justify-between items-center"><span className="text-muted-foreground">Format</span> <span className="text-white font-medium">720×1280 (9:16)</span></li>
                <li className="flex justify-between items-center"><span className="text-muted-foreground">Frame Rate</span> <span className="text-white font-medium">30 FPS</span></li>
                <li className="flex justify-between items-center"><span className="text-muted-foreground">Platform</span> <span className="text-white font-medium">FB Reels</span></li>
                <li className="flex justify-between items-center"><span className="text-muted-foreground">Music</span> <span className="text-white font-medium bg-primary/10 px-2 py-0.5 rounded text-primary border border-primary/20">Dark Eyes</span></li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 p-6 rounded-lg border border-border bg-card relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <h3 className="text-sm font-mono text-primary mb-6 border-b border-border pb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" /> ENGAGEMENT_ANALYSIS
              </h3>
              <div className="space-y-6 mt-4 relative z-10">
                <ProgressBar label="Like Rate" value={1.34} max={5} suffix="%" subtext="of views" />
                <ProgressBar label="Share Rate" value={0.08} max={0.5} suffix="%" subtext="of views" />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative p-5 rounded-lg bg-primary/10 border border-primary/40 mt-6 mb-6 overflow-hidden shadow-[inset_0_0_20px_rgba(0,255,65,0.05)] group"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/30 transition-colors" />
                  <div className="flex justify-between items-center mb-3 relative z-10">
                    <span className="font-mono text-sm text-primary flex items-center gap-2 font-bold">
                      <Zap className="w-4 h-4" /> SHARE-TO-LIKE RATIO
                      <span className="px-2 py-0.5 rounded-sm text-[10px] bg-primary text-black font-bold ml-2 animate-pulse uppercase tracking-wider">Key Metric</span>
                    </span>
                    <span className="font-mono font-bold text-2xl text-white drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]"><AnimatedNumber value={6.1} decimals={1} suffix="%" /></span>
                  </div>
                  <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden relative z-10 border border-primary/20">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '80%' }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} 
                      className="h-full bg-primary relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                  <p className="text-xs text-primary/80 mt-3 font-mono relative z-10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
                    Indicates highly viral organic spread potential.
                  </p>
                </motion.div>
                
                <ProgressBar label="Comment Rate" value={0.01} max={0.1} suffix="%" subtext="of views" />
              </div>
            </motion.div>
          </div>

          {/* Section 5: Why It Went Viral */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-border flex-1" />
              <h2 className="text-xl md:text-2xl font-mono text-white tracking-tight uppercase flex items-center gap-2">
                <span className="text-muted-foreground">Analysis:</span> <span className="text-primary font-bold">Viral_Triggers</span>
              </h2>
              <div className="h-px bg-border flex-1" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ViralCard 
                num="01" 
                title="11-Second Hook" 
                desc="Ultra-short duration means near-100% watch time, which triggers Facebook's algorithm to amplify reach aggressively."
              />
              <ViralCard 
                num="02" 
                title="Curiosity + Utility" 
                desc='"Hackers" triggers forbidden knowledge curiosity; "5 Extensions" promises actionable value. An irresistible combo.'
              />
              <ViralCard 
                num="03" 
                title="Shares Are the Engine" 
                desc="2.7K shares at a 6.1% share-to-like ratio means massive organic viral spread, not just passive consumption."
              />
            </div>
          </div>

          {/* Section 6: Content Formula Breakdown */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-border flex-1" />
              <h2 className="text-xl md:text-2xl font-mono text-white tracking-tight uppercase flex items-center gap-2">
                <span className="text-muted-foreground">Framework:</span> <span className="text-primary font-bold">Content_Formula</span>
              </h2>
              <div className="h-px bg-border flex-1" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border overflow-hidden rounded-lg shadow-lg relative"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-border/50">
                  <FormulaRow label="Topic" value="Cybersecurity / Hacker Tools" />
                  <FormulaRow label="Title Format" value="Number + Tool Type + Audience (5 Chrome Extensions For Hackers)" highlight />
                  <FormulaRow label="Visual Style" value="Black background + Green neon text" />
                  <FormulaRow label="Content Type" value="List/Listicle (actionable format)" />
                  <FormulaRow label="Target Emotion" value="Curiosity + Utility" />
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Section 7: Takeaways for Page Growth */}
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary/[0.03] border border-primary/20 p-8 md:p-10 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <h2 className="text-2xl font-mono text-white mb-8 flex items-center gap-3 relative z-10">
                <Target className="text-primary w-6 h-6" /> ACTIONABLE_TAKEAWAYS
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <TakeawayCard text="Keep videos under 15 seconds for maximum watch completion" />
                <TakeawayCard text="Use number-based titles (5 tools, 3 tricks, 10 hacks)" />
                <TakeawayCard text="Pick topics that feel exclusive or forbidden (hackers, secrets, tricks)" />
                <TakeawayCard text="Create shareable content — useful info people want to send to friends" />
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-border bg-background/50 text-center relative z-10">
          <p className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
            Research Report <span className="mx-2 text-primary/50">·</span> July 2026 <span className="mx-2 text-primary/50">·</span> Data from Facebook Reels
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
          </div>
        </footer>
      </div>
      
      {/* Global CSS animation for shimmer */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}} />
    </div>
  )
}
