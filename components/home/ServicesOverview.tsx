import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Search, Plug, Map } from "lucide-react";

export function ServicesOverview() {
  const services = [
    {
      icon: Search,
      title: "Web App Penetration Testing",
      description:
        "Comprehensive security assessment of web applications, from front-end vulnerabilities to backend API flaws.",
      link: "/skills",
    },
    {
      icon: Plug,
      title: "API Security Testing",
      description:
        "Specialized testing for REST & GraphQL APIs, including authentication bypass, IDOR, and injection attacks.",
      link: "/skills",
    },
    {
      icon: Map,
      title: "Attack Surface Analysis",
      description:
        "Reconnaissance and asset discovery to identify all potential entry points before conducting deep testing.",
      link: "/skills",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="section-container">
        <SectionHeading
          title="Services"
          subtitle="Manual penetration testing that goes beyond automated scanners to find real vulnerabilities in your systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-lg border border-[#e5e5e5] bg-white hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="font-serif font-bold text-2xl text-black mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-[#4ddcd3] font-medium hover:text-[#2ec4bb] transition-colors"
                >
                  Learn More <span>→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
