import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { supabaseAdmin } from "@/lib/supabase";
import { Experience } from "@/lib/supabase";
import { Briefcase, Award, Code2, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience | Ayesha Attaria — Bug Bounty Hunter & Penetration Tester",
  description:
    "Ayesha Attaria's professional experience includes bug bounty hunting on YesWeHack, Standoff365, and CTF competitions on HackTheBox and PortSwigger Academy.",
  openGraph: {
    title: "Experience | Ayesha Attaria",
    url: "https://ayeshaattaria.site/experience",
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

// Icon mapping for experience types
const getIconForType = (type: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    "bug-bounty": <Award className="w-8 h-8 text-teal-600" />,
    employment: <Briefcase className="w-8 h-8 text-teal-600" />,
    ctf: <Code2 className="w-8 h-8 text-teal-600" />,
    other: <BookOpen className="w-8 h-8 text-teal-600" />,
  };
  return icons[type] || icons["other"];
};

async function getExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("experience")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="bg-off-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="section-container relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            Experience
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Active participation in bug bounty programs and CTF competitions,
            with a track record of finding critical vulnerabilities and ranking
            in international competitions.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-20">
        <div className="section-container max-w-4xl">
          <SectionHeading
            title="Professional Timeline"
            subtitle="A chronological overview of my journey in cybersecurity and bug bounty hunting."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-24 top-0 bottom-0 w-1 bg-linear-to-b from-[#4ddcd3] to-transparent"></div>

            {/* Experience items */}
            {experiences.length > 0 ? (
              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="relative md:ml-56 group">
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute -left-32 top-6 w-12 h-12 rounded-2xl bg-off-white shadow-inner border-2 border-white items-center justify-center group-hover:bg-[#4ddcd3]/10 transition-colors duration-300">
                      {getIconForType(exp.type)}
                    </div>

                    {/* Content card */}
                    <div className="glass-card p-6 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-start gap-4 mb-4">
                        {exp.logo_url ? (
                          <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white border-2 border-[#4ddcd3] flex items-center justify-center">
                            <img
                              src={exp.logo_url}
                              alt={exp.organization}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div className="shrink-0 w-12 h-12 rounded-lg bg-white border-2 border-[#4ddcd3] flex items-center justify-center">
                            {getIconForType(exp.type)}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-serif font-bold text-2xl text-black">
                            {exp.organization}
                          </h3>
                          <p className="text-lg text-gray-700 font-medium">
                            {exp.title}
                          </p>
                          {exp.location && (
                            <p className="text-sm text-gray-500">
                              {exp.location}
                            </p>
                          )}
                          <span className="inline-block mt-2 px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
                            {exp.start_date}{" "}
                            {exp.end_date ? `– ${exp.end_date}` : "– Present"}
                          </span>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                      )}

                      {/* Achievements */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="text-[#4ddcd3] font-bold mt-0.5">
                                ▸
                              </span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Technologies */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white border border-[#e5e5e5] rounded text-xs text-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No experience entries yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="Impact & Achievements"
            subtitle="A summary of my bug bounty and CTF accomplishments."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 glass-card group hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl font-serif font-bold text-[#4ddcd3] mb-3">
                30+
              </div>
              <p className="font-medium text-gray-700">Organizations Secured</p>
            </div>

            <div className="text-center p-8 glass-card group hover:-translate-y-2 transition-all duration-300 delay-100">
              <div className="text-5xl font-serif font-bold text-[#4ddcd3] mb-3">
                100+
              </div>
              <p className="font-medium text-gray-700">Vulnerabilities Found</p>
            </div>

            <div className="text-center p-8 glass-card group hover:-translate-y-2 transition-all duration-300 delay-200">
              <div className="text-5xl font-serif font-bold text-[#4ddcd3] mb-3">
                #5
              </div>
              <p className="font-medium text-gray-700">
                Black Hat USA CTF 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Applied */}
      <section className="py-12 md:py-20">
        <div className="section-container max-w-3xl">
          <SectionHeading
            title="Vulnerability Types Found"
            subtitle="A breakdown of the vulnerability categories I specialize in discovering."
          />

          <div className="space-y-4">
            {[
              "Broken Access Control (BAC) - Privilege escalation & horizontal/vertical access violations",
              "Insecure Direct Object References (IDOR) - User enumeration and data theft",
              "Server-Side Request Forgery (SSRF) - Internal network access and cloud metadata exposure",
              "Cross-Site Scripting (XSS) - Stored, reflected, and DOM-based injection attacks",
              "SQL Injection - Database extraction and manipulation",
              "Authentication Bypass - Weak password reset flows and session fixation",
              "Business Logic Flaws - Workflow bypasses and transaction manipulation",
              "API Abuse - Rate limit bypass, account enumeration, resource abuse",
              "Insecure Deserialization - RCE and code execution vulnerabilities",
            ].map((vuln, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 glass-card hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-[#4ddcd3] font-bold text-lg">✓</span>
                <span className="text-gray-700">{vuln}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
