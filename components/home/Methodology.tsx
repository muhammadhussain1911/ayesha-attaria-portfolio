import { SectionHeading } from "@/components/shared/SectionHeading";
import { Search, AlertTriangle, FileText, Zap } from "lucide-react";

export function Methodology() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Scoping & Recon",
      description:
        "Define testing scope, identify assets, and gather intelligence about the target application.",
    },
    {
      number: "02",
      icon: Zap,
      title: "Vulnerability Discovery",
      description:
        "Systematic testing for OWASP Top 10 vulnerabilities, business logic flaws, and misconfigurations.",
    },
    {
      number: "03",
      icon: AlertTriangle,
      title: "Exploitation & Chaining",
      description:
        "Demonstrate impact by exploiting vulnerabilities and chaining multiple findings together.",
    },
    {
      number: "04",
      icon: FileText,
      title: "Reporting & Retesting",
      description:
        "Comprehensive report with CVSS scores, remediation guidance, and free retesting of fixes.",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-off-white relative">
      <div className="section-container relative z-10">
        <SectionHeading
          title="My Methodology"
          subtitle="A proven, structured approach to web application security testing aligned with industry standards."
        />

        <div className="relative mt-12">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-10 right-10 h-0.5 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-[#4ddcd3] to-[#4ddcd3]/10 w-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Step card */}
                  <div className="relative z-10 glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-soft-xl text-center h-full">
                    
                    {/* Step number watermark */}
                    <div className="absolute top-2 right-4 text-6xl font-serif font-black text-black/5 group-hover:text-[#4ddcd3]/10 transition-colors duration-300 pointer-events-none select-none">
                      {step.number}
                    </div>

                    {/* Step number circle */}
                    <div className="w-16 h-16 rounded-2xl bg-black text-[#4ddcd3] font-serif font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:bg-[#4ddcd3] group-hover:text-black transition-colors duration-500 relative">
                      <Icon className="w-7 h-7" />
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-2xl bg-[#4ddcd3] opacity-0 group-hover:animate-ping -z-10"></div>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-black mb-3 group-hover:text-[#4ddcd3] transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
