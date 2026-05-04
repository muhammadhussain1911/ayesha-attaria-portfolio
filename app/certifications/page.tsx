import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CertCard } from "@/components/shared/CertCard";
import { IconRenderer } from "@/components/shared/IconRenderer";
import { supabaseAdmin } from "@/lib/supabase";
import { Certification } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Certifications & Achievements | Ayesha Attaria — Ethical Hacker",
  description:
    "Ayesha Attaria holds certifications in Bug Bounty Hunting, Red Team Operations, Penetration Testing & Web Hacking, and Cybersecurity Education — with top CTF rankings worldwide.",
  openGraph: {
    title: "Certifications & Achievements | Ayesha Attaria",
    url: "https://ayeshaattaria.site/certifications",
    type: "website",
    images: [
      {
        url: "/ayeshaattaria.jpeg",
        width: 1200,
        height: 630,
        alt: "Ayesha Attaria - Web App & API Penetration Tester",
      },
    ],
  },
};

async function getCertifications(): Promise<Certification[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("certifications")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

const getCertIcon = (title: string) => {
  if (title.toLowerCase().includes("bug bounty")) return "Trophy";
  if (title.toLowerCase().includes("red team")) return "Swords";
  if (
    title.toLowerCase().includes("educator") ||
    title.toLowerCase().includes("education")
  )
    return "GraduationCap";
  return "Shield";
};

const programs = [
  { name: "Bugcrowd", icon: "Trophy" },
  { name: "YesWeHack", icon: "Target" },
  { name: "Intigriti", icon: "Shield" },
  { name: "Standoff365", icon: "Swords" },
  { name: "Google", icon: "Search" },
  { name: "TikTok", icon: "Smartphone" },
  { name: "Pinterest", icon: "Pin" },
];

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="bg-off-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="section-container relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            Certifications & Achievements
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Professional certifications, CTF rankings, and bug bounty program
            participation demonstrating expertise and commitment to continuous
            learning.
          </p>
        </div>
      </section>

      {/* Bug Bounty Programs */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Bug Bounty Programs"
            subtitle="Platforms and organizations where I actively report vulnerabilities."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="p-6 glass-card group hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-3">{program.icon}</div>
                <p className="font-medium text-gray-700 text-sm">
                  {program.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
