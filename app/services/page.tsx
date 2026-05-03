import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Shield,
  Bug,
  GitBranch,
  Target,
  FileText,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Services | Ayesha Attaria — Penetration Testing & Security Assessment",
  description:
    "Professional cybersecurity services including web app penetration testing, API security testing, vulnerability assessment (VAPT), and security consulting from certified ethical hacker Ayesha Attaria.",
  openGraph: {
    title: "Services | Ayesha Attaria",
    description:
      "Expert penetration testing and vulnerability assessment services",
    url: "https://ayeshaattaria.site/services",
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

const coreServices = [
  {
    icon: Shield,
    title: "Web Application Penetration Testing",
    shortDesc: "Comprehensive security assessment of web applications",
    description:
      "In-depth manual testing of web applications to identify vulnerabilities in front-end, backend, and API layers. I go beyond automated scanners to discover business logic flaws, authentication bypass, and exploitation chains that could impact your users.",
    includes: [
      "Front-end vulnerability scanning (XSS, CSRF, DOM-based issues)",
      "Backend testing (SQL injection, insecure deserialization)",
      "Authentication & authorization testing",
      "Session management analysis",
      "Business logic vulnerability identification",
      "Attack chain demonstration with real-world impact",
      "CVSS v3.1 scored, reproducible vulnerabilities",
      "Developer-friendly remediation guidance",
      "Free retesting after fixes",
    ],
    timeline: "5-10 business days",
    ideal:
      "SaaS applications, fintech platforms, internal tools, e-commerce sites",
  },
  {
    icon: Plug,
    title: "API Security Testing",
    shortDesc: "Specialized testing for REST, GraphQL & SOAP APIs",
    description:
      "APIs are often overlooked in security testing, yet they're a prime target for attackers. I perform comprehensive testing of all API types to identify authentication bypass, IDOR, rate-limiting issues, and GraphQL-specific vulnerabilities.",
    includes: [
      "REST API endpoint assessment",
      "GraphQL security testing",
      "SOAP/XML API analysis",
      "Authentication & API key validation",
      "Rate limiting & throttling bypass attempts",
      "Insecure Direct Object References (IDOR)",
      "API versioning vulnerabilities",
      "Webhook security assessment",
      "API documentation review",
      "JWT token analysis",
    ],
    timeline: "5-8 business days",
    ideal:
      "Mobile app backends, microservices, SaaS platforms, third-party integrations",
  },
  {
    icon: Target,
    title: "Vulnerability Assessment & Penetration Testing (VAPT)",
    shortDesc: "Full-cycle vulnerability discovery and exploitation",
    description:
      "A complete vulnerability assessment that combines automated scanning with manual testing to identify all security issues. This includes vulnerability chaining to demonstrate real-world attack scenarios and business impact.",
    includes: [
      "Reconnaissance & asset discovery",
      "Vulnerability scanning (infrastructure & application)",
      "Manual exploitation & verification",
      "Attack chain demonstration",
      "Business impact analysis",
      "Risk scoring using CVSS framework",
      "Detailed vulnerability documentation",
      "Executive summary report",
      "Technical deep-dive report",
      "Remediation roadmap & timelines",
    ],
    timeline: "10-20 business days",
    ideal:
      "Pre-deployment security checks, compliance requirements, security baselines",
  },
  {
    icon: Bug,
    title: "Bug Bounty Program Support",
    shortDesc: "Maximize bug bounty program effectiveness",
    description:
      "Looking to monetize your hacking skills? I provide guidance on identifying vulnerabilities in bug bounty programs, crafting effective reports, and maximizing your bounty earnings through strategic hunting.",
    includes: [
      "Program target evaluation",
      "Reconnaissance strategy coaching",
      "Vulnerability hunting consultation",
      "Report writing best practices",
      "Proof of concept (PoC) development",
      "Escalation techniques",
      "Duplicate management strategies",
      "Negotiation support",
      "Portfolio building guidance",
    ],
    timeline: "Ongoing consultation",
    ideal: "Security researchers, aspiring ethical hackers, bounty hunters",
  },
];

const specializedServices = [
  {
    icon: GitBranch,
    title: "Attack Surface Analysis",
    description:
      "Comprehensive reconnaissance to identify all potential entry points before conducting in-depth testing. Includes subdomain enumeration, technology stack identification, and asset discovery.",
  },
  {
    icon: FileText,
    title: "Security Report Writing",
    description:
      "Professional vulnerability reports with technical depth for developers and executive summaries for management. CVSS-scored, reproducible, and actionable.",
  },
  {
    icon: Users,
    title: "Security Consulting",
    description:
      "One-on-one consultation on security best practices, secure coding, API security architecture, and vulnerability remediation strategies.",
  },
  {
    icon: Zap,
    title: "Post-Assessment Retesting",
    description:
      "Free retesting of previously identified vulnerabilities after your team implements fixes to verify remediation effectiveness.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Scoping & Planning",
    description:
      "We define the scope, testing objectives, timeframe, and success criteria. Understanding your business context ensures targeted testing.",
  },
  {
    number: "02",
    title: "Reconnaissance",
    description:
      "Systematic information gathering to map the attack surface, identify technologies, and discover potential vulnerabilities.",
  },
  {
    number: "03",
    title: "Vulnerability Scanning",
    description:
      "Automated scanning combined with manual analysis to identify potential security issues across the application.",
  },
  {
    number: "04",
    title: "Manual Testing & Exploitation",
    description:
      "Deep-dive manual testing to find logic flaws, chain vulnerabilities, and demonstrate real-world attack scenarios.",
  },
  {
    number: "05",
    title: "Verification & Documentation",
    description:
      "Reproducing each finding, gathering evidence, and documenting vulnerabilities with step-by-step reproduction steps.",
  },
  {
    number: "06",
    title: "Reporting & Consultation",
    description:
      "Comprehensive report with technical details, risk scoring, remediation guidance, and post-assessment consultation.",
  },
];

const whyChoose = [
  {
    icon: CheckCircle,
    title: "Manual, Not Just Automated",
    description:
      "I don't rely on scanners alone. Every finding is manually verified and exploited to demonstrate real-world impact.",
  },
  {
    icon: CheckCircle,
    title: "Business Logic Focus",
    description:
      "Beyond OWASP Top 10, I identify vulnerabilities in business logic that automated tools miss.",
  },
  {
    icon: CheckCircle,
    title: "Developer-Friendly Reports",
    description:
      "Actionable remediation guidance that developers actually use, not just a list of problems.",
  },
  {
    icon: CheckCircle,
    title: "Real-World Exploitation",
    description:
      "I demonstrate actual attack chains showing how vulnerabilities can be chained for maximum impact.",
  },
  {
    icon: CheckCircle,
    title: "Continuous Learning",
    description:
      "Certified with multiple credentials and staying updated on emerging threats and methodologies.",
  },
  {
    icon: CheckCircle,
    title: "International Experience",
    description:
      "Worked with 25+ organizations globally across fintech, SaaS, healthcare, and enterprise sectors.",
  },
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

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-20 bg-linear-to-b from-[#f5f5f5] to-white">
        <div className="section-container">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            Services
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Comprehensive penetration testing and security assessment services
            designed to help your organization identify and fix vulnerabilities
            before attackers do.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Core Services"
            subtitle="Enterprise-grade security testing tailored to your needs"
          />

          <div className="space-y-12">
            {coreServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-8 md:p-10">
                    {/* Service Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <Icon className="w-10 h-10 text-[#4ddcd3] shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-black mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Two Column Layout */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Includes */}
                      <div>
                        <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#4ddcd3]" />
                          What&apos;s Included
                        </h4>
                        <ul className="space-y-3">
                          {service.includes.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-2 text-gray-700 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4ddcd3] shrink-0 mt-2"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Meta Info */}
                      <div className="space-y-6">
                        <div className="p-4 bg-[#f5f5f5] rounded-lg">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                            Timeline
                          </p>
                          <p className="text-lg font-semibold text-black">
                            {service.timeline}
                          </p>
                        </div>
                        <div className="p-4 bg-[#f5f5f5] rounded-lg">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                            Ideal For
                          </p>
                          <p className="text-sm text-gray-700">
                            {service.ideal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container">
          <SectionHeading
            title="Specialized Services"
            subtitle="Additional support to maximize your security posture"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specializedServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-white rounded-lg border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-[#4ddcd3] mb-4" />
                  <h3 className="font-serif font-bold text-xl text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Our Testing Process"
            subtitle="A systematic, methodical approach to comprehensive security assessment"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-[#e5e5e5] bg-white hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl font-serif font-bold text-[#4ddcd3] mb-4">
                  {step.number}
                </div>
                <h3 className="font-serif font-bold text-xl text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="section-container">
          <SectionHeading
            title="Why Choose Me"
            subtitle="What sets my penetration testing services apart"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChoose.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <Icon className="w-6 h-6 text-[#4ddcd3] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-black mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
                className="p-6 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] text-center"
              >
                <p className="font-semibold text-gray-800">{method}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-[#4ddcd3]">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            Ready to Secure Your Application?
          </h2>
          <p className="text-lg text-black opacity-90 mb-8 max-w-2xl mx-auto">
            Let&apos;s schedule a consultation to discuss your security needs
            and find the right testing approach for your organization.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
