import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { supabaseAdmin } from "@/lib/supabase";
import { Project } from "@/lib/supabase";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Security Research | Ayesha Attaria — Penetration Tester",
  description:
    "Explore Ayesha Attaria's security research projects, vulnerability writeups, CTF solutions, and VAPT case studies for web applications and APIs.",
  openGraph: {
    title: "Projects & Security Research | Ayesha Attaria",
    url: "https://ayeshaattaria.site/projects",
    type: "website",
  },
};

async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#f5f5f5] to-white">
        <div className="section-container">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            Projects & Research
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Security research projects, vulnerability case studies, and detailed
            writeups showcasing real-world exploitation techniques and findings.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Featured Projects"
            subtitle="Real-world vulnerability research and detailed case studies."
          />

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="p-8 rounded-lg border border-[#e5e5e5] bg-white hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.image_alt || project.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
                      {project.severity_found || "Research"}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-black mb-3 text-balance">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-[#f5f5f5] border border-[#e5e5e5] rounded text-xs text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.project_url ? (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#4ddcd3] font-medium hover:text-[#2ec4bb] transition-colors"
                    >
                      View Writeup <span>→</span>
                    </a>
                  ) : (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-[#4ddcd3] font-medium hover:text-[#2ec4bb] transition-colors"
                    >
                      Read More <span>→</span>
                    </Link>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No projects published yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tools & Scripts */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container">
          <SectionHeading
            title="Open Source Tools & Scripts"
            subtitle="Security tools and scripts I've developed and shared with the community."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placeholder */}
            <div className="p-8 rounded-lg bg-white border-2 border-[#e5e5e5] border-dashed flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">
                  Open source tools coming soon
                </p>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-white border-2 border-[#e5e5e5] border-dashed flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">
                  Custom exploitation scripts
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-6 italic">
            Coming soon: GitHub repositories, exploitation scripts, and Nuclei
            templates for automated vulnerability scanning.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="section-container text-center">
          <h2 className="text-3xl font-serif font-bold text-black mb-4">
            Interested in a Security Assessment?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore my blog for more detailed writeups, or get in touch to
            discuss your security needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/blog" className="btn-secondary">
              Read More on Blog
            </Link>
            <Link href="/contact" className="btn-primary">
              Start Your Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
