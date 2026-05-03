import Link from "next/link";
import { TypewriterText } from "@/components/shared/TypewriterText";
import { Shield, Lock, Terminal, Activity } from "lucide-react";

export function Hero() {
  const roles = [
    "Web App Penetration Tester",
    "API Security Specialist",
    "Bug Bounty Hunter",
    "Ethical Hacker",
  ];

  return (
    <section className="py-12 md:py-20 bg-off-white relative overflow-hidden">
      {/* Cybersecurity animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4ddcd3] to-transparent opacity-50 animate-scan"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#4ddcd3]/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-black/5 blur-[120px]"></div>
      </div>

      <div className="section-container relative z-10 pt-8">
        <div className="glass-card p-8 md:p-12 lg:p-16 cyber-border group/hero">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-center">
            {/* Left: Text Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-8 backdrop-blur-sm">
                <Terminal className="w-4 h-4 text-[#4ddcd3]" />
                <span className="text-sm font-mono font-medium text-black tracking-wide">
                  INITIATING_SECURE_CONNECTION
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4ddcd3] animate-pulse-dot"></span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-black mb-4 text-balance leading-tight">
                Ayesha Attaria
              </h1>

              {/* Typewriter animation */}
              <div className="mb-6 h-16 md:h-20">
                <TypewriterText
                  words={roles}
                  className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#4ddcd3] filter drop-shadow-[0_0_8px_rgba(77,220,211,0.5)] group-hover/hero:text-black hover:text-black transition-colors duration-500 cursor-default"
                  speed={50}
                  delay={2000}
                />
              </div>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-gray-600 mb-10 text-balance leading-relaxed">
                I help companies in the US, Europe & beyond find real-world
                vulnerabilities before attackers do, through manual VAPT aligned
                with OWASP Top 10.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 group">
                  <Lock className="w-4 h-4 group-hover:animate-bounce-subtle" />
                  Secure Your App Now
                </Link>
                <Link href="/skills" className="btn-secondary flex items-center justify-center gap-2 group">
                  <Activity className="w-4 h-4 group-hover:text-[#4ddcd3] transition-colors" />
                  View My Methodology
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-8 border-t border-black/5">
                {[
                  "30+ Organizations Secured",
                  "Google · TikTok · Pinterest",
                  "OWASP Aligned",
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-xl shadow-sm border border-white">
                    <Shield className="w-4 h-4 text-[#4ddcd3]" />
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Profile Image & Tech Overlay */}
            <div className="flex items-center justify-center md:justify-end relative">
              <div className="absolute inset-0 bg-[#4ddcd3]/5 rounded-full animate-pulse-glow blur-xl pointer-events-none"></div>
              
              <div className="relative animate-float">
                {/* Tech floating elements */}
                <div className="absolute -top-6 -left-6 bg-white p-3 rounded-2xl shadow-soft-lg border border-white/50 z-20 backdrop-blur-md">
                  <Shield className="w-6 h-6 text-[#4ddcd3]" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-black p-3 rounded-2xl shadow-soft-lg border border-white/10 z-20 backdrop-blur-md">
                  <Lock className="w-6 h-6 text-[#4ddcd3]" />
                </div>
                
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-2 bg-white/50 backdrop-blur-sm border border-white shadow-soft-xl overflow-hidden relative z-10 group">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    {/* Matrix-like overlay effect on hover */}
                    <div className="absolute inset-0 bg-[#4ddcd3]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                      src="/ayeshaattaria.jpeg"
                      alt="Ayesha Attaria"
                      className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
