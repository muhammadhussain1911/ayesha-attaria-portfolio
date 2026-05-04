import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolsGrid } from "@/components/shared/ToolsGrid";
import { supabaseAdmin } from "@/lib/supabase";
import { Skill } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Skills & Expertise | Ayesha Attaria — Web App & API Pentester",
  description:
    "Ayesha Attaria's cybersecurity skills include Web App Penetration Testing, API Security (REST & GraphQL), OWASP Top 10, Bug Bounty Hunting, and advanced exploitation techniques.",
  openGraph: {
    title: "Skills & Expertise | Ayesha Attaria",
    url: "https://ayeshaattaria.site/skills",
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

async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("skills")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

const frameworks = [
  "OWASP Top 10",
  "OWASP API Security Top 10",
  "NIST Cybersecurity Framework",
  "CIS Controls",
  "CVSS v3.1 Scoring",
  "SANS Top 25",
  "Mitre ATT&CK Framework",
  "RESTful API Security",
];

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group skills by category
  const skillsByCategory: { [key: string]: Skill[] } = {};
  skills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  return (
    <div className="bg-off-white min-h-screen">
      {/* Frameworks & Methodologies */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="Frameworks & Methodologies"
            subtitle="Industry standards and best practices that guide my work."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frameworks.map((framework, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 glass-card group hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-[#4ddcd3] font-bold group-hover:translate-x-1 transition-transform">
                  →
                </span>
                <span className="font-medium text-gray-700">{framework}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      {Object.keys(skillsByCategory).length > 0 && (
        <section className="py-12 md:py-20 relative">
          <div className="section-container">
            <SectionHeading
              title="Technical Skills"
              subtitle="Detailed skills and proficiencies organized by category."
            />

            <div className="space-y-12">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-2xl font-serif font-bold text-black mb-6">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300"
                        >
                          {skill.image_url && (
                            <div className="mb-4 relative w-full h-32 rounded-lg overflow-hidden bg-linear-to-br from-[#f5f5f5] to-[#e5e5e5] flex items-center justify-center">
                              <img
                                src={skill.image_url}
                                alt={skill.name}
                                className="w-full h-full object-contain p-3"
                              />
                            </div>
                          )}
                          <h4 className="font-serif font-bold text-lg text-black mb-2">
                            {skill.name}
                          </h4>
                          {skill.description && (
                            <p className="text-gray-700 text-sm mb-4">
                              {skill.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2">
                            <div className="grow bg-[#e5e5e5] rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-[#4ddcd3] h-full transition-all duration-300"
                                style={{
                                  width: `${skill.proficiency || 0}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-xs font-medium text-gray-600 w-12 text-right">
                            {skill.proficiency || 0}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
