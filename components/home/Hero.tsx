import Link from "next/link";
import { TypewriterText } from "@/components/shared/TypewriterText";

export function Hero() {
  const roles = [
    "Web App Penetration Tester",
    "API Security Specialist",
    "Bug Bounty Hunter",
    "Ethical Hacker",
  ];

  return (
    <section className="py-16 md:py-32 bg-linear-to-b from-white via-white to-[#f5f5f5] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4ddcd3 1px, transparent 1px), linear-gradient(to bottom, #4ddcd3 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-black mb-4 text-balance">
              Ayesha Attaria
            </h1>

            {/* Typewriter animation */}
            <div className="mb-6 h-16 md:h-20">
              <TypewriterText
                words={roles}
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#4ddcd3]"
                speed={50}
                delay={2000}
              />
            </div>

            {/* Subtext */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 text-balance">
              I help companies in the US, Europe & beyond find real-world
              vulnerabilities before attackers do, through manual VAPT aligned
              with OWASP Top 10.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="btn-primary text-center">
                Book a Free 15-Min Call
              </Link>
              <Link href="/skills" className="btn-secondary text-center">
                View My Services
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 pt-8 border-t border-[#e5e5e5]">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-[#4ddcd3] font-bold">✓</span>
                30+ Organizations Secured
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-[#4ddcd3] font-bold">✓</span>
                Google · TikTok · Pinterest
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-[#4ddcd3] font-bold">✓</span>
                OWASP Aligned · Free Retest Included
              </div>
            </div>
          </div>

          {/* Right: Profile Image Placeholder */}
          <div className="flex items-center justify-center md:justify-end">
            <div
              className="w-64 h-64 md:w-80 md:h-80 lg:w-100 lg:h-100 rounded-full border-4 border-[#4ddcd3] bg-linear-to-br from-[#f5f5f5] to-white flex items-center justify-center shadow-lg"
              style={{
                boxShadow: "0 0 40px rgba(77, 220, 211, 0.2)",
              }}
            >
              <img
                src="/ayeshaattaria.jpeg"
                alt="Ayesha Attaria"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
