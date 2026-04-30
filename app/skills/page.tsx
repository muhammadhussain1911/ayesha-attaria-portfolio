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

const coreCompetencies = [
  {
    title: "Web Application Penetration Testing",
    description: "Comprehensive security assessment of web applications.",
  },
  {
    title: "API Security Testing (REST & GraphQL)",
    description:
      "Specialized testing for API vulnerabilities and misconfigurations.",
  },
  {
    title: "Vulnerability Assessment (VAPT)",
    description: "Full-cycle vulnerability discovery and reporting.",
  },
  {
    title: "Bug Bounty Hunting",
    description:
      "Active participation in public and private bug bounty programs.",
  },
  {
    title: "Attack Surface Analysis",
    description: "Reconnaissance and asset discovery methodologies.",
  },
  {
    title: "Report Writing & Documentation",
    description: "Clear, actionable, CVSS-scored vulnerability reports.",
  },
  {
    title: "CTF Competitions",
    description: "Web security challenges and competitive exploitation.",
  },
];

const vulnerabilities = [
  "SQL Injection",
  "Cross-Site Scripting (XSS)",
  "Cross-Site Request Forgery (CSRF)",
  "Broken Authentication",
  "API Key Exposure",
  "Server-Side Template Injection (SSTI)",
  "XML External Entity (XXE)",
  "Insecure Deserialization",
  "API Rate Limiting Bypass",
  "GraphQL Vulnerabilities",
  "JWT Token Vulnerabilities",
  "Directory Traversal",
  "Insecure Direct Object References",
  "Security Misconfiguration",
  "Sensitive Data Exposure",
  "Broken Access Control",
];

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

const tools = [
  { name: "Burp Suite Pro", icon: "Search" },
  { name: "OWASP ZAP", icon: "Zap" },
  { name: "Postman", icon: "Mail" },
  { name: "Nuclei", icon: "AlertTriangle" },
  { name: "Subfinder", icon: "Target" },
  { name: "SQLMap", icon: "Database" },
  { name: "XSStrike", icon: "Scissors" },
  { name: "Nikto", icon: "Swords" },
  { name: "Nmap", icon: "Map" },
  { name: "Wireshark", icon: "Waves" },
  { name: "Hashcat", icon: "Lock" },
  { name: "Metasploit", icon: "Flame" },
];

const platforms = [
  { name: "Bugcrowd", icon: "Trophy" },
  { name: "YesWeHack", icon: "Target" },
  { name: "Intigriti", icon: "Shield" },
  { name: "Standoff365", icon: "Swords" },
  { name: "HackerOne", icon: "AlertCircle" },
  { name: "Hack The Box", icon: "Package" },
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
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-20 bg-linear-to-b from-[#f5f5f5] to-white">
        <div className="section-container">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Comprehensive cybersecurity capabilities across web applications,
            APIs, and emerging threat landscapes.
          </p>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Core Competencies"
            subtitle="The foundation of my security testing practice."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreCompetencies.map((skill, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300 bg-white"
              >
                <h3 className="font-serif font-bold text-lg text-black mb-2">
                  {skill.title}
                </h3>
                <p className="text-gray-700 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vulnerability Specializations */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container">
          <SectionHeading
            title="Vulnerability Specializations"
            subtitle="The attack vectors and vulnerabilities I specialize in finding and exploiting."
          />

          <div className="flex flex-wrap gap-3">
            {vulnerabilities.map((vuln, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm font-medium text-gray-700 hover:border-[#4ddcd3] hover:text-[#4ddcd3] transition-all duration-300"
              >
                {vuln}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks & Methodologies */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Frameworks & Methodologies"
            subtitle="Industry standards and best practices that guide my work."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frameworks.map((framework, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5]"
              >
                <span className="text-[#4ddcd3] font-bold">→</span>
                <span className="font-medium text-gray-700">{framework}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container">
          <SectionHeading
            title="Tools & Technologies"
            subtitle="The instruments I use to discover and validate vulnerabilities."
          />
          <ToolsGrid tools={tools} />
        </div>
      </section>

      {/* Platforms */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Platforms & Communities"
            subtitle="Bug bounty programs and security platforms where I'm actively involved."
          />
          <ToolsGrid tools={platforms} />
        </div>
      </section>

      {/* Skills by Category */}
      {Object.keys(skillsByCategory).length > 0 && (
        <section className="py-12 md:py-20 bg-[#f5f5f5]">
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
                          className="p-6 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
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
