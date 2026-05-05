import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { supabaseAdmin } from "@/lib/supabase";
import { Project } from "@/lib/supabase";
import { ArrowRight, Trophy, Shield, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Ayesha Attaria — Ethical Hacker",
  description:
    "Ayesha Attaria's professional portfolio showcasing expertise in penetration testing, bug bounty hunting, and web application security.",
  openGraph: {
    title: "Portfolio | Ayesha Attaria",
    url: "https://ayeshaattaria.site/portfolio",
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

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
}

async function getCertifications(): Promise<any[]> {
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

async function getCTFRankings(): Promise<any[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("ctf_rankings")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching CTF rankings:", error);
    return [];
  }
}

async function getBugBountyPrograms(): Promise<any[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("bug_bounty_programs")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching bug bounty programs:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getFeaturedProjects();
  const certifications = await getCertifications();
  const ctfRankings = await getCTFRankings();
  const bugBountyPrograms = await getBugBountyPrograms();

  return (
    <div className="bg-off-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="section-container relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            Portfolio
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Curated selection of security research, vulnerability assessments, and
            penetration testing engagements showcasing real-world expertise.
          </p>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Featured Work"
            subtitle="Highlights from my security research and penetration testing projects."
          />

          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      {project.image_url && (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg mb-6 group-hover:shadow-lg transition-shadow duration-300"
                        />
                      )}
                      
                      <h3 className="text-2xl font-serif font-bold text-black mb-3 group-hover:text-[#4ddcd3] transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {project.tags && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.split(",").slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-medium bg-[#4ddcd3]/10 text-[#4ddcd3] rounded-full"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#4ddcd3] font-medium hover:gap-3 transition-all duration-300"
                        >
                          View Project
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all duration-300"
                >
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-6">
                Portfolio items coming soon. Check back later!
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all duration-300"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Impact & Achievements */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Impact & Achievements"
            subtitle="Active participation in bug bounty programs and CTF competitions, with a track record of finding critical vulnerabilities and ranking in international competitions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { stat: "30+", label: "Organizations Secured", icon: Shield },
              { stat: "125+", label: "Vulnerabilities Found", icon: Award },
              { stat: "2+", label: "Years of Experience", icon: Trophy },
              { stat: "5+", label: "Certifications", icon: Award },
              { stat: "4+", label: "International CTF Finalist", icon: Trophy },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 text-center group hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center"
                >
                  <Icon className="w-8 h-8 text-[#4ddcd3] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl md:text-5xl font-serif font-bold text-black mb-2">
                    {item.stat}
                  </div>
                  <p className="font-medium text-gray-700 text-sm">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="section-container">
            <SectionHeading
              title="Certifications"
              subtitle="Professional certifications showcasing expertise in cybersecurity."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {cert.badge_image_url && (
                      <div className="mb-4 h-32 flex items-center justify-center">
                        <img
                          src={cert.badge_image_url}
                          alt={cert.title}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-lg font-serif font-bold text-black mb-2 group-hover:text-[#4ddcd3] transition-colors">
                      {cert.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 mb-4">Issued: {cert.issue_date}</p>
                    
                    {cert.description && (
                      <p className="text-sm text-gray-700 mb-4">{cert.description}</p>
                    )}
                    
                    {cert.credential_url && (
                      <Link
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#4ddcd3] font-medium text-sm hover:gap-3 transition-all duration-300"
                      >
                        View Credential
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTF Rankings & Hall of Fame */}
      {ctfRankings.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="section-container">
            <SectionHeading
              title="CTF Rankings & Hall of Fame"
              subtitle="International CTF competition achievements and rankings."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ctfRankings.map((ranking) => (
                <div
                  key={ranking.id}
                  className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300 flex items-center gap-6 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex-1">
                    {ranking.image_url && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border-2 border-[#4ddcd3] flex-shrink-0 flex items-center justify-center">
                        <img
                          src={ranking.image_url}
                          alt={ranking.competition_name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 flex-1">
                    <h3 className="text-lg font-serif font-bold text-black mb-1 group-hover:text-[#4ddcd3] transition-colors">
                      {ranking.competition_name}
                    </h3>
                    <p className="text-[#4ddcd3] font-bold text-2xl mb-1">
                      #{ranking.rank}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{ranking.year}</p>
                    {ranking.description && (
                      <p className="text-sm text-gray-700">{ranking.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bug Bounty Programs */}
      {bugBountyPrograms.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="section-container">
            <SectionHeading
              title="Bug Bounty Programs"
              subtitle="Active participation in leading bug bounty platforms."
            />

            {/* Horizontal scrolling container */}
            <div className="relative overflow-hidden">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {bugBountyPrograms.map((program, idx) => (
                  <div
                    key={program.id}
                    className="flex-shrink-0 glass-card p-6 w-48 group hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      {program.logo_url && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border-2 border-[#4ddcd3] flex items-center justify-center mb-4">
                          <img
                            src={program.logo_url}
                            alt={program.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      )}
                      
                      <h3 className="text-lg font-serif font-bold text-black mb-2 group-hover:text-[#4ddcd3] transition-colors">
                        {program.name}
                      </h3>
                      
                      {program.description && (
                        <p className="text-sm text-gray-700 mb-3">{program.description}</p>
                      )}
                      
                      {program.url && (
                        <Link
                          href={program.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#4ddcd3] font-medium text-sm hover:gap-3 transition-all duration-300"
                        >
                          Visit
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
                Interested in a Security Assessment?
              </h2>
              <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss your security needs and how I can help protect your applications.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
