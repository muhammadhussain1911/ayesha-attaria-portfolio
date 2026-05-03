import { SectionHeading } from "@/components/shared/SectionHeading";
import { Quote } from "lucide-react";

export function Testimonials() {
  // TODO: Replace with real testimonials from actual clients
  const testimonials = [
    {
      quote:
        "Ayesha found critical vulnerabilities in our API that would have exposed user data. Her detailed reports and remediation guidance made it easy for our team to fix issues quickly.",
      author: "John Smith",
      role: "CTO",
      company: "TechStartup Inc",
    },
    {
      quote:
        "Professional, thorough, and results-driven. Unlike generic penetration testing, Ayesha took time to understand our business logic and found real attack vectors specific to our application.",
      author: "Sarah Johnson",
      role: "Security Lead",
      company: "FinTech Co",
    },
    {
      quote:
        "The level of detail in the report was exceptional. Every finding included clear steps to reproduce, CVSS scoring, and specific remediation advice. Highly recommended for any serious security assessment.",
      author: "Mike Chen",
      role: "Engineering Manager",
      company: "SaaS Platform",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-off-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#4ddcd3]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="section-container relative z-10">
        <SectionHeading
          title="Client Testimonials"
          subtitle="What clients have to say about working with me."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#4ddcd3]/20 group-hover:text-[#4ddcd3]/40 transition-colors duration-300" />
              
              <p className="text-gray-700 text-sm leading-relaxed mb-8 grow relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="pt-6 border-t border-gray-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-[#4ddcd3] font-serif font-bold text-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-serif font-bold text-black group-hover:text-[#4ddcd3] transition-colors duration-300">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {testimonial.role} <span className="text-[#4ddcd3]">@</span> {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 rounded-xl glass-card flex items-center justify-center gap-2 border-[#4ddcd3]/20 border w-fit mx-auto">
          <div className="w-2 h-2 rounded-full bg-[#4ddcd3] animate-pulse-dot"></div>
          <p className="text-xs text-gray-500 font-mono tracking-wide uppercase">
            Placeholder Data - Real client feedback pending
          </p>
        </div>
      </div>
    </section>
  );
}
