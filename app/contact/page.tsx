import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Briefcase,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hire Ayesha Attaria | Web App Penetration Tester — Free Consultation",
  description:
    "Contact Ayesha Attaria to book a free 15-minute consultation for web application or API penetration testing. Serving clients in the USA, UK, Europe, Australia, and Canada.",
  openGraph: {
    title: "Hire Ayesha Attaria | Web App Penetration Tester",
    description:
      "Book a free consultation for web application and API penetration testing services.",
    url: "https://ayeshaattaria.site/contact",
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

export default function ContactPage() {
  return (
    <div className="bg-off-white min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-125 h-125 bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="section-container relative z-10">
          <div className="max-w-6xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
              Let&apos;s Secure Your Web Application
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Book a{" "}
              <span className="font-bold text-[#4ddcd3]">
                FREE 15-minute consultation
              </span>
              . I&apos;ll review your attack surface and tell you exactly where
              you&apos;re exposed before we discuss a contract.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container max-w-4xl">
          <SectionHeading
            title="Get in Touch"
            subtitle="Fill out the form below and I'll respond within 24 hours with a customized proposal tailored to your security needs."
          />
          <div className="glass-card p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Direct Contact Info */}
      <section className="py-12 md:py-20 relative">
        <div className="section-container">
          <SectionHeading
            title="Other Ways to Reach Me"
            subtitle="Prefer to connect directly? Here are my other contact channels."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-black mb-6">
                Social & Professional
              </h3>
              <a
                href="https://www.linkedin.com/in/ayeshaattaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#4ddcd3]/10 flex items-center justify-center group-hover:bg-[#4ddcd3]/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-[#4ddcd3]" />
                </div>
                <div>
                  <p className="font-medium text-black">LinkedIn</p>
                  <p className="text-sm text-gray-600">
                    Connect with me professionally
                  </p>
                </div>
              </a>

              <a
                href="https://x.com/Bug_blitzer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#4ddcd3]/10 flex items-center justify-center group-hover:bg-[#4ddcd3]/20 transition-colors">
                  <Twitter className="w-6 h-6 text-[#4ddcd3]" />
                </div>
                <div>
                  <p className="font-medium text-black">Twitter / X</p>
                  <p className="text-sm text-gray-600">
                    Follow for security insights
                  </p>
                </div>
              </a>
            </div>

            {/* Direct Contact */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-black mb-6">
                Direct Contact
              </h3>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ayeshaattaria9263@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#4ddcd3]/10 flex items-center justify-center group-hover:bg-[#4ddcd3]/20 transition-colors">
                  <Mail className="w-6 h-6 text-[#4ddcd3]" />
                </div>
                <div>
                  <p className="font-medium text-black">Email</p>
                  <p className="text-sm text-gray-600">
                    ayeshaattaria9263@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="section-container max-w-2xl">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about my services."
          />

          <div className="space-y-6">
            {[
              {
                question: "What is web application penetration testing?",
                answer:
                  "Web app pentesting is a comprehensive security assessment where I simulate real-world attacks to find vulnerabilities in your application before malicious actors do. This includes testing for OWASP Top 10 vulnerabilities, business logic flaws, and more.",
              },
              {
                question: "Do you work with clients outside Pakistan?",
                answer:
                  "Yes! I primarily serve clients from the USA, UK, Europe, Australia, and Canada. I work across time zones and provide detailed reports and support in English.",
              },
              {
                question: "What does a VAPT report include?",
                answer:
                  "My reports include a detailed vulnerability assessment, severity ratings, proof-of-concept exploits, business impact analysis, and actionable remediation guidance for your development team.",
              },
              {
                question: "Do you offer free retesting?",
                answer:
                  "Yes! Free retesting is included after you fix identified vulnerabilities. This ensures your application is truly secure before going to production.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="glass-card p-6 border-l-4 border-[#4ddcd3]"
              >
                <h3 className="font-serif font-bold text-lg text-black mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
