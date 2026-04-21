import { SectionHeading } from '@/components/shared/SectionHeading';

export function Testimonials() {
  // TODO: Replace with real testimonials from actual clients
  const testimonials = [
    {
      quote:
        'Ayesha found critical vulnerabilities in our API that would have exposed user data. Her detailed reports and remediation guidance made it easy for our team to fix issues quickly.',
      author: 'John Smith',
      role: 'CTO, TechStartup Inc',
      company: 'TechStartup Inc',
    },
    {
      quote:
        'Professional, thorough, and results-driven. Unlike generic penetration testing, Ayesha took time to understand our business logic and found real attack vectors specific to our application.',
      author: 'Sarah Johnson',
      role: 'Security Lead, FinTech Co',
      company: 'FinTech Co',
    },
    {
      quote:
        'The level of detail in the report was exceptional. Every finding included clear steps to reproduce, CVSS scoring, and specific remediation advice. Highly recommended for any serious security assessment.',
      author: 'Mike Chen',
      role: 'Engineering Manager, SaaS Platform',
      company: 'SaaS Platform',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#f5f5f5]">
      <div className="section-container">
        <SectionHeading
          title="Client Testimonials"
          subtitle="What clients have to say about working with me."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="border-t border-[#e5e5e5] pt-4">
                <p className="font-serif font-bold text-black">
                  {testimonial.author}
                </p>
                <p className="text-xs text-gray-600">
                  {testimonial.role}
                </p>
                <p className="text-xs text-gray-600 font-medium text-[#4ddcd3]">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-white border-l-4 border-[#4ddcd3]">
          <p className="text-sm text-gray-600 italic">
            Note: These are placeholder testimonials. Real client testimonials coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
