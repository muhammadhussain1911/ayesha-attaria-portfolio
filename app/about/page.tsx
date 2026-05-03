import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolsGrid } from "@/components/shared/ToolsGrid";
import { IconRenderer } from "@/components/shared/IconRenderer";
import { supabaseAdmin } from "@/lib/supabase";
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
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-20 bg-linear-to-b from-[#f5f5f5] to-white">
        <div className="section-container">
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
      <section className="py-12 md:py-20">
        <div className="section-container max-w-3xl">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
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

      {/* Approach Section */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container max-w-3xl">
          <SectionHeading
            title="My Approach"
            subtitle="Core principles that guide my security testing methodology."
          />

          <ul className="space-y-4">
            {[
              "OWASP Top 10 and API Top 10 aligned testing",
              "Manual analysis with strategic tool assistance",
              "Business logic vulnerability identification",
              "Attack chain demonstration for maximum impact",
              "CVSS-scored, reproducible, actionable reports",
              "Developer-friendly remediation guidance",
              "Free retesting after fixes are implemented",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-700 text-lg"
              >
                <IconRenderer
                  name="Check"
                  className="w-6 h-6 text-[#4ddcd3] shrink-0 mt-0.5"
                />
                <span>{item}</span>
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
        <section id="experience" className="py-12 md:py-20 bg-[#f5f5f5]">
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
                    <div className="hidden md:flex absolute -left-32 top-6 w-12 h-12 rounded-full bg-white border-4 border-[#4ddcd3] items-center justify-center">
                      {getIconForType(exp.type)}
                    </div>

                    {/* Content card */}
                    <div className="p-6 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300">
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
                  className="p-6 rounded-lg bg-white border-2 border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
                >
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

      {/* Tools Section */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container">
          <SectionHeading
            title="Tools & Technologies"
            subtitle="The instruments of my trade. I combine deep tool knowledge with manual analysis."
          />
          <ToolsGrid tools={tools} />
        </div>
      </section>

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
            className="inline-block px-8 py-4 bg-[#4ddcd3] text-black font-bold rounded-lg hover:bg-[#3db5a1] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
