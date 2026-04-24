import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CertCard } from "@/components/shared/CertCard";
import { supabase } from "@/lib/supabase";
import { Certification } from "@/lib/supabase";
import {
  Trophy,
  Sword,
  GraduationCap,
  Shield,
  Search,
  Phone,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Certifications & Achievements | Ayesha Attaria — Ethical Hacker",
  description:
    "Ayesha Attaria holds certifications in Bug Bounty Hunting, Red Team Operations, Penetration Testing & Web Hacking, and Cybersecurity Education — with top CTF rankings worldwide.",
  openGraph: {
    title: "Certifications & Achievements | Ayesha Attaria",
    url: "https://ayeshaattaria.com/certifications",
    type: "website",
  },
};

async function getCertifications(): Promise<Certification[]> {
  try {
    const { data, error } = await supabase
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
  if (title.toLowerCase().includes("bug bounty"))
    return <Trophy className="w-12 h-12 text-teal-600" />;
  if (title.toLowerCase().includes("red team"))
    return <Sword className="w-12 h-12 text-teal-600" />;
  if (
    title.toLowerCase().includes("educator") ||
    title.toLowerCase().includes("education")
  )
    return <GraduationCap className="w-12 h-12 text-teal-600" />;
  return <Shield className="w-12 h-12 text-teal-600" />;
};

const ctfRankings = [
  {
    rank: "🥇 #5",
    event: "Bugcrowd x Black Hat USA International CTF 2025",
    description:
      "Ranked among the top 5 teams globally in web security challenges.",
  },
  {
    rank: "🏅 #18",
    event: "Iran Tech Olympics International CTF 2025",
    description:
      "Top-ranked performer in international cybersecurity competition.",
  },
  {
    rank: "🏆 Top Ranked",
    event: "Multiple Public & Private Bug Bounty Programs",
    description:
      "Consistent top performer on Bugcrowd, YesWeHack, Intigriti, and Standoff365.",
  },
];

const programs = [
  { name: "Bugcrowd", icon: <Trophy className="w-8 h-8 text-teal-600" /> },
  { name: "YesWeHack", icon: <Search className="w-8 h-8 text-teal-600" /> },
  { name: "Intigriti", icon: <Shield className="w-8 h-8 text-teal-600" /> },
  { name: "Standoff365", icon: <Sword className="w-8 h-8 text-teal-600" /> },
  { name: "Google", icon: <Search className="w-8 h-8 text-teal-600" /> },
  { name: "TikTok", icon: <Phone className="w-8 h-8 text-teal-600" /> },
  { name: "Pinterest", icon: <MapPin className="w-8 h-8 text-teal-600" /> },
];

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  const ctfRankings = [
    {
      rank: "🥇 #5",
      event: "Bugcrowd x Black Hat USA International CTF 2025",
      description:
        "Ranked among the top 5 teams globally in web security challenges.",
    },
    {
      rank: "🏅 #18",
      event: "Iran Tech Olympics International CTF 2025",
      description:
        "Top-ranked performer in international cybersecurity competition.",
    },
    {
      rank: "🏆 Top Ranked",
      event: "Multiple Public & Private Bug Bounty Programs",
      description:
        "Consistent top performer on Bugcrowd, YesWeHack, Intigriti, and Standoff365.",
    },
  ];

  const programs = [
    { name: "Bugcrowd", icon: "🏆" },
    { name: "YesWeHack", icon: "🎯" },
    { name: "Intigriti", icon: "🛡️" },
    { name: "Standoff365", icon: "⚔️" },
    { name: "Google", icon: "🔍" },
    { name: "TikTok", icon: "📱" },
    { name: "Pinterest", icon: "📌" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#f5f5f5] to-white">
        <div className="section-container">
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

      {/* Certifications */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Professional Certifications"
            subtitle="Industry-recognized credentials validating my expertise."
          />

          {certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-lg bg-white border-2 border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {cert.badge_image_url ? (
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-[#f5f5f5] to-[#e5e5e5] flex items-center justify-center">
                        <img
                          src={cert.badge_image_url}
                          alt={cert.badge_image_alt || cert.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0">
                        {getCertIcon(cert.title)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg text-black mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {cert.issuer}
                      </p>
                      <span className="inline-block px-2 py-1 bg-[#4ddcd3] bg-opacity-20 text-[#4ddcd3] text-xs font-medium rounded">
                        {cert.issue_date}
                      </span>
                    </div>
                  </div>
                  {cert.description && (
                    <p className="text-gray-700 text-sm">{cert.description}</p>
                  )}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-[#4ddcd3] text-sm font-medium hover:underline"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No certifications added yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTF Rankings */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container">
          <SectionHeading
            title="CTF Rankings & Achievements"
            subtitle="Competitive accomplishments in international cybersecurity competitions."
          />

          <div className="space-y-6">
            {ctfRankings.map((ranking, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg bg-gradient-to-r from-white to-[#f0f9f8] border-2 border-[#4ddcd3]"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-serif font-bold text-[#4ddcd3]">
                    {ranking.rank}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-xl text-black mb-2">
                      {ranking.event}
                    </h3>
                    <p className="text-gray-700">{ranking.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                className="p-6 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
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

      {/* Key Achievements */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container max-w-3xl">
          <SectionHeading
            title="Key Achievements"
            subtitle="Notable accomplishments that demonstrate impact and expertise."
          />

          <div className="space-y-4">
            {[
              "Discovered 100+ vulnerabilities across diverse applications and platforms",
              "Helped 25+ organizations remediate critical security issues",
              "Ranked in top 5 of international Black Hat CTF competition",
              "Active bug bounty hunter on 5+ platforms with consistent results",
              "Multiple valid submissions to Fortune 500 company security programs",
              "Expertise recognized through certifications from leading cybersecurity organizations",
              "Contributed to open-source security tools and research",
              "Mentored aspiring security professionals in VAPT methodologies",
            ].map((achievement, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg bg-white border border-[#e5e5e5]"
              >
                <span className="text-[#4ddcd3] font-bold text-2xl">★</span>
                <span className="text-gray-700 font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Learning */}
      <section className="py-12 md:py-20">
        <div className="section-container max-w-3xl">
          <SectionHeading
            title="Continuous Learning"
            subtitle="Commitment to staying current with evolving security threats."
          />

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The cybersecurity landscape evolves rapidly. I maintain my expertise
            through:
          </p>

          <ul className="space-y-3">
            {[
              "Regular completion of advanced security training and labs",
              "Active participation in CTF competitions and capture-the-flag events",
              "Continuous bug bounty hunting and real-world vulnerability research",
              "Membership in security communities and professional organizations",
              "Attending security conferences and workshops",
              "Reading threat research and vulnerability disclosures",
              "Experimenting with emerging attack vectors and techniques",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-[#4ddcd3] font-bold mt-1">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
