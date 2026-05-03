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
    <section className="py-12 md:py-20 bg-off-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4ddcd3]/30 to-transparent"></div>
      
      <div className="section-container relative z-10">
        <SectionHeading
          title="Why Choose Me?"
          subtitle="I don't just run scanners. I think like an attacker to find what others miss."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="glass-card flex flex-col gap-4 p-6 md:p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-off-white flex items-center justify-center shadow-inner group-hover:bg-[#4ddcd3]/10 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-black group-hover:text-[#4ddcd3] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-black mb-3 group-hover:text-[#4ddcd3] transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
