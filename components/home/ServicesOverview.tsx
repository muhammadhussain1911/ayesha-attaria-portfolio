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
      title: "Attack Surface Assessment",
      description:
        "Discover hidden endpoints, unused API routes, exposed subdomains, misconfigured services, and overlooked attack paths across your infrastructure.",
      link: "/skills",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-off-white relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="section-container relative z-10">
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
                className="glass-card p-8 group relative overflow-hidden"
              >
                {/* Tech hover overlay */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-[#4ddcd3]/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>

                <div className="w-16 h-16 bg-off-white rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-[#4ddcd3]/10 transition-colors duration-500">
                  <Icon className="w-8 h-8 text-black group-hover:text-[#4ddcd3] transition-colors duration-500" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-black mb-4 group-hover:text-[#4ddcd3] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-black font-semibold hover:text-[#4ddcd3] transition-colors group/link"
                >
                  Learn More{" "}
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>

                {/* Tech bottom border */}
                <div className="absolute bottom-0 left-0 h-1 bg-[#4ddcd3] w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
