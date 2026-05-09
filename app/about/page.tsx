import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolsGrid } from "@/components/shared/ToolsGrid";
import { IconRenderer } from "@/components/shared/IconRenderer";
import { Skill, Certification, Experience } from "@/lib/supabase";
import { Award, Briefcase, Code2, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About Me | Ayesha Attaria | Penetration Tester & Ethical Hacker",
  description:
    "Learn about Ayesha Attaria's journey into cybersecurity, certifications, skills, experience, and approach to ethical hacking and penetration testing.",
  openGraph: {
    title: "About Me | Ayesha Attaria",
    description: "Certified Web Application & API Penetration Tester",
    url: "https://ayeshaattaria.site/about",
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

const ctfRankings = [
  {
    rank: "#5",
    icon: "Trophy",
    event: "Bugcrowd x Black Hat USA International CTF 2025",
    description:
      "Ranked among the top 5 teams globally in web security challenges.",
  },
  {
    rank: "#18",
    icon: "Trophy",
    event: "Iran Tech Olympics International CTF 2025",
    description:
      "Top-ranked performer in international cybersecurity competition.",
  },
  {
    rank: "Top Ranked",
    icon: "Trophy",
    event: "Multiple Public & Private Bug Bounty Programs",
    description:
      "Consistent top performer on Bugcrowd, YesWeHack, Intigriti, and Standoff365.",
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

async function getSkills(): Promise<Skill[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/skills`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) throw new Error("Failed to fetch skills");
    const data = await response.json();
    return Array.isArray(data) ? data.sort((a, b) => (a.order_index || 0) - (b.order_index || 0)) : [];
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

async function getCertifications(): Promise<Certification[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/certifications`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) throw new Error("Failed to fetch certifications");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

async function getExperiences(): Promise<Experience[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/experience`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) throw new Error("Failed to fetch experience");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching experiences:", error);
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

const getIconForType = (type: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    "bug-bounty": <Award className="w-6 h-6 text-[#4ddcd3]" />,
    employment: <Briefcase className="w-6 h-6 text-[#4ddcd3]" />,
    ctf: <Code2 className="w-6 h-6 text-[#4ddcd3]" />,
    other: <BookOpen className="w-6 h-6 text-[#4ddcd3]" />,
  };
  return icons[type] || icons["other"];
};

const tools = [
  { name: "Burp Suite", icon: "Search" },
  { name: "OWASP ZAP", icon: "Zap" },
  { name: "Postman", icon: "Mail" },
  { name: "ffuf", icon: "Zap" },
  { name: "Nuclei", icon: "Target" },
  { name: "SQLMap", icon: "Database" },
  { name: "Nmap", icon: "Map" },
  { name: "Subfinder", icon: "Search" },
  { name: "Metasploit", icon: "Flame" },
];

const platforms = [
  { name: "Bugcrowd", icon: "Trophy" },
  { name: "YesWeHack", icon: "Target" },
  { name: "Intigriti", icon: "Shield" },
  { name: "Standoff365", icon: "Swords" },
  { name: "HackerOne", icon: "AlertCircle" },
  { name: "Hack The Box", icon: "Package" },
  { name: "Portswigger", imageUrl: "/icons/portswigger.svg" },
  { name: "PentesterLab", imageUrl: "/icons/pentesterlab.svg" },
];

const methodology = [
  "OWASP Top 10 aligned testing",
  "OWASP API Top 10 for API security",
  "NIST Cybersecurity Framework principles",
  "CIS Controls implementation review",
  "CVSS v3.1 vulnerability scoring",
  "SANS Top 25 vulnerability focus",
  "Mitre ATT&CK Framework mapping",
];

export default async function AboutPage() {
  const skills = await getSkills();
  const certifications = await getCertifications();
  const experiences = await getExperiences();

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
      {/* Header */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="section-container relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            About Me
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            I&apos;m a Web Application Penetration Tester and Ethical Hacker
            dedicated to helping organizations discover and fix security
            vulnerabilities before attackers do.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <div className="glass-card p-8 md:p-12 prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              My journey in cybersecurity started with a passion for
              understanding how systems work and, more importantly, how they can
              be broken. I realized early that the best defense comes from
              thinking like an attacker—anticipating vulnerabilities before
              they&apos;re exploited.
            </p>

            <p>
              Over the years, I&apos;ve helped 25+ organizations across various
              industries—from fintech startups to established SaaS
              companies—identify and remediate critical vulnerabilities.
              I&apos;ve ranked in international CTF competitions (Black Hat USA,
              Iran Tech Olympics) and actively participate in bug bounty
              programs on platforms like Bugcrowd, YesWeHack, and Intigriti.
            </p>

            <p>
              What sets me apart is my commitment to going beyond automated
              scanners. I manually test every application, analyze business
              logic flaws, chain vulnerabilities to demonstrate real-world
              impact, and provide developer-friendly remediation guidance. My
              reports aren&apos;t just a list of problems—they&apos;re a roadmap
              to genuine security improvement.
            </p>

            <blockquote className="border-l-4 border-[#4ddcd3] pl-6 my-8">
              <p className="text-lg italic text-gray-700">
                "I don't just run scanners — I think like an attacker to find
                what others miss."
              </p>
            </blockquote>

            <p>
              Beyond my technical expertise, I believe in continuous learning. I
              hold multiple certifications, contribute to open-source security
              projects, and stay updated on emerging threats and methodologies.
              I&apos;m also passionate about sharing knowledge—through writeups,
              CTF solutions, and mentoring aspiring security professionals.
            </p>

            <p>
              When I&apos;m not testing applications, you&apos;ll find me
              exploring new attack vectors, contributing to the security
              community, or diving into classical Islamic studies (Dars e
              Nizami). I&apos;m multilingual—fluent in Urdu, Punjabi, and
              English—which helps me work effectively with diverse international
              clients.
            </p>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="Core Competencies"
            subtitle="The foundation of my security testing practice."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreCompetencies.map((skill, idx) => (
              <div
                key={idx}
                className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="font-serif font-bold text-lg text-black mb-2 group-hover:text-[#4ddcd3] transition-colors">
                  {skill.title}
                </h3>
                <p className="text-gray-700 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
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
                  className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start gap-4 mb-4">
                    {cert.badge_image_url ? (
                      <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-linear-to-br from-[#f5f5f5] to-[#e5e5e5] flex items-center justify-center">
                        <img
                          src={cert.badge_image_url}
                          alt={cert.badge_image_alt || cert.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="shrink-0 text-4xl">
                        <IconRenderer
                          name={getCertIcon(cert.title)}
                          className="w-12 h-12 text-[#4ddcd3]"
                        />
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
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="CTF Rankings & Achievements"
            subtitle="Competitive accomplishments in international cybersecurity competitions."
          />

          <div className="space-y-6">
            {ctfRankings.map((ranking, idx) => (
              <div key={idx} className="p-8 glass-card cyber-border">
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

      {/* Vulnerability Specializations */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="Vulnerability Specializations"
            subtitle="The attack vectors and vulnerabilities I specialize in finding and exploiting."
          />

          <div className="flex flex-wrap gap-3">
            {vulnerabilities.map((vuln, idx) => (
              <span
                key={idx}
                className="px-4 py-2 glass-card rounded-full text-sm font-medium text-gray-700 hover:border-[#4ddcd3] hover:text-[#4ddcd3] hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                {vuln}
              </span>
            ))}
          </div>
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

      {/* Methodology */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Methodologies & Frameworks"
            subtitle="Industry-standard approaches to comprehensive security testing"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {methodology.map((method, idx) => (
              <div
                key={idx}
                className="glass-card p-6 text-center hover:shadow-soft-md hover:-translate-y-1 transition-all duration-300"
              >
                <p className="font-semibold text-gray-800">{method}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="Tools & Technologies"
            subtitle="The instruments of my trade. I combine deep tool knowledge with manual analysis."
          />
          <ToolsGrid tools={tools} />
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="Key Achievements"
            subtitle="Notable accomplishments that demonstrate impact and expertise."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                className="flex items-start gap-4 p-4 glass-card hover:-translate-y-1 transition-all duration-300"
              >
                <IconRenderer
                  name="Star"
                  className="w-6 h-6 text-[#4ddcd3] shrink-0 mt-0.5"
                />
                <span className="text-gray-700 font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Learning */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Continuous Learning"
            subtitle="Commitment to staying current with evolving security threats."
          />

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The cybersecurity landscape evolves rapidly. I maintain my expertise
            through:
          </p>

          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <IconRenderer
                  name="Check"
                  className="w-6 h-6 text-[#4ddcd3] shrink-0 mt-0.5"
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills Section */}
      {Object.keys(skillsByCategory).length > 0 && (
        <section id="skills" className="py-12 md:py-20">
          <div className="section-container">
            <SectionHeading
              title="Skills & Expertise"
              subtitle="Technical skills and proficiencies organized by category."
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
                                className={`bg-[#4ddcd3] h-full transition-all duration-300`}
                                style={{ width: `${skill.proficiency || 0}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-600 w-12 text-right">
                              {skill.proficiency || 0}%
                            </span>
                          </div>
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

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section id="experience" className="py-12 md:py-20 relative">
          <div className="section-container max-w-4xl">
            <SectionHeading
              title="Professional Timeline"
              subtitle="A chronological overview of my journey in cybersecurity and bug bounty hunting."
            />

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-24 top-0 bottom-0 w-1 bg-linear-to-b from-[#4ddcd3] to-transparent"></div>

              {/* Experience items */}
              <div className="space-y-8">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative md:ml-56">
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute -left-32 top-6 w-12 h-12 rounded-2xl bg-off-white shadow-inner border-2 border-white items-center justify-center group-hover:bg-[#4ddcd3]/10 transition-colors duration-300">
                      {getIconForType(exp.type)}
                    </div>

                    {/* Content card */}
                    <div className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        {exp.organization_logo_url ? (
                          <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white border-2 border-[#4ddcd3] flex items-center justify-center">
                            <img
                              src={exp.organization_logo_url}
                              alt={
                                exp.organization_logo_alt || exp.organization
                              }
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div className="shrink-0">
                            {getIconForType(exp.type)}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-serif font-bold text-lg text-black">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {exp.organization}
                          </p>
                          <p className="text-xs text-gray-500">
                            {exp.start_date}{" "}
                            {exp.end_date && `- ${exp.end_date}`}
                          </p>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 text-sm">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section id="certifications" className="py-12 md:py-20">
          <div className="section-container">
            <SectionHeading
              title="Certifications & Achievements"
              subtitle="Professional certifications and credentials validating my expertise."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start gap-4 mb-4">
                    {cert.badge_image_url ? (
                      <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-linear-to-br from-[#f5f5f5] to-[#e5e5e5] flex items-center justify-center">
                        <img
                          src={cert.badge_image_url}
                          alt={cert.badge_image_alt || cert.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="shrink-0 text-4xl">
                        <IconRenderer
                          name={getCertIcon(cert.title)}
                          className="w-12 h-12 text-[#4ddcd3]"
                        />
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
                      className="inline-block mt-4 px-3 py-1.5 bg-[#4ddcd3] text-black text-xs font-medium rounded hover:bg-[#3db5a1] transition-colors"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="section-container text-center">
          <h2 className="text-4xl font-serif font-bold text-black mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how I can help secure your web application and
            APIs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-black text-white font-medium rounded-2xl hover:bg-[#4ddcd3] hover:text-black transition-all duration-300 shadow-soft-lg hover:-translate-y-1 hover:shadow-soft-xl"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
