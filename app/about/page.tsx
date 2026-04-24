import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolsGrid } from "@/components/shared/ToolsGrid";

export default function AboutPage() {
  const tools = [
    { name: "Burp Suite", icon: "🔍" },
    { name: "OWASP ZAP", icon: "⚡" },
    { name: "Postman", icon: "📬" },
    { name: "ffuf", icon: "⚡" },
    { name: "Nuclei", icon: "🎯" },
    { name: "SQLMap", icon: "💉" },
    { name: "Nmap", icon: "🗺️" },
    { name: "Subfinder", icon: "🔎" },
    { name: "Metasploit", icon: "💥" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#f5f5f5] to-white">
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
              industries—from fintech startups to established SaaS companies—
              identify and remediate critical vulnerabilities. I&apos;ve ranked
              in international CTF competitions (Black Hat USA, Iran Tech
              Olympics) and actively participate in bug bounty programs on
              platforms like Bugcrowd, YesWeHack, and Intigriti.
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
                <span className="text-[#4ddcd3] font-bold mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Tools & Technologies"
            subtitle="The instruments of my trade. I combine deep tool knowledge with manual analysis."
          />
          <ToolsGrid tools={tools} />
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container max-w-3xl">
          <SectionHeading
            title="Beyond Security"
            subtitle="Because I'm more than just a pentester."
          />

          <div className="space-y-6 text-gray-700">
            <p>
              <span className="font-bold text-black">
                Islamic Scholar in Training:
              </span>{" "}
              I&apos;m pursuing classical Islamic education (Dars e Nizami),
              which teaches me discipline, critical thinking, and deep
              understanding. These principles directly enhance my security
              research.
            </p>

            <p>
              <span className="font-bold text-black">Multilingual:</span> Fluent
              in Urdu, Punjabi, and English. This helps me communicate
              effectively with global clients and understand diverse cultural
              contexts in security practices.
            </p>

            <p>
              <span className="font-bold text-black">
                Community Contributor:
              </span>{" "}
              I actively share knowledge through CTF writeups, vulnerability
              disclosures, and mentoring aspiring security professionals. I
              believe in lifting others as I climb.
            </p>

            <p>
              <span className="font-bold text-black">Continuous Learner:</span>{" "}
              The security landscape evolves constantly. I stay current through
              certifications, research, and hands-on experimentation with
              emerging technologies and attack vectors.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="section-container text-center">
          <h2 className="text-4xl font-serif font-bold text-black mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help secure your web application and APIs.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
