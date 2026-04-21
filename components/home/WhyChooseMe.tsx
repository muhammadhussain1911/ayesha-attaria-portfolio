import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  FlaskConical,
  Brain,
  Link2,
  Clipboard,
  Code2,
  RotateCw,
} from "lucide-react";

export function WhyChooseMe() {
  const reasons = [
    {
      icon: FlaskConical,
      title: "Manual Testing, Not Just Scanners",
      description:
        "Human expertise combined with strategic tool use to uncover vulnerabilities automated tools miss.",
    },
    {
      icon: Brain,
      title: "Business Logic & Auth Flow Analysis",
      description:
        "Deep dive into how your application works to find context-specific vulnerabilities.",
    },
    {
      icon: Link2,
      title: "Vulnerability Chaining",
      description:
        "Connecting low-severity findings to demonstrate high-impact attack scenarios.",
    },
    {
      icon: Clipboard,
      title: "CVSS-Scored & Reproducible Reports",
      description:
        "Clear, actionable reports with severity ratings and step-by-step reproduction steps.",
    },
    {
      icon: Code2,
      title: "Developer-Friendly Fix Guidance",
      description:
        "Not just problems—I provide clear solutions and best practices for remediation.",
    },
    {
      icon: RotateCw,
      title: "Free Retesting Included",
      description:
        "After you fix the vulnerabilities, I retest for free to confirm security improvements.",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#f5f5f5]">
      <div className="section-container">
        <SectionHeading
          title="Why Choose Me?"
          subtitle="I don't just run scanners. I think like an attacker to find what others miss."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="flex gap-4 p-6 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-black mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
