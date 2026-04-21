import { SectionHeading } from "@/components/shared/SectionHeading";
import { Search, AlertTriangle, FileText } from "lucide-react";

export function Methodology() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Scoping & Recon",
      description:
        "Define testing scope, identify assets, and gather intelligence about the target application.",
    },
    {
      number: 2,
      icon: Search,
      title: "Vulnerability Discovery",
      description:
        "Systematic testing for OWASP Top 10 vulnerabilities, business logic flaws, and misconfigurations.",
    },
    {
      number: 3,
      icon: AlertTriangle,
      title: "Exploitation & Chaining",
      description:
        "Demonstrate impact by exploiting vulnerabilities and chaining multiple findings together.",
    },
    {
      number: 4,
      icon: FileText,
      title: "Reporting & Retesting",
      description:
        "Comprehensive report with CVSS scores, remediation guidance, and free retesting of fixes.",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="section-container">
        <SectionHeading
          title="My Methodology"
          subtitle="A proven, structured approach to web application security testing aligned with industry standards."
        />

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4ddcd3] to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  {/* Step card */}
                  <div className="relative z-10 p-6 rounded-lg bg-white border-2 border-[#e5e5e5] hover:border-[#4ddcd3] transition-all duration-300 text-center">
                    {/* Step number circle */}
                    <div className="w-12 h-12 rounded-full bg-[#4ddcd3] text-white font-serif font-bold text-lg flex items-center justify-center mx-auto mb-4">
                      {step.number}
                    </div>

                    <Icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />

                    <h3 className="font-serif font-bold text-lg text-black mb-2">
                      {step.title}
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector arrow (desktop only) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-20 text-[#4ddcd3] text-2xl">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
