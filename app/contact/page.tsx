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
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-linear-to-b from-white to-[#f5f5f5]">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
              Let&apos;s Secure Your Web Application
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Book a{" "}
              <span className="font-bold text-[#4ddcd3]">
                FREE 15-minute consultation
              </span>
              . I&apos;ll review your attack surface and tell you exactly where
              you&apos;re exposed — before we discuss a contract.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20">
        <div className="section-container max-w-2xl">
          <SectionHeading
            title="Get in Touch"
            subtitle="Fill out the form below and I'll respond within 24 hours with a customized proposal tailored to your security needs."
          />
          <ContactForm />
        </div>
      </section>

      {/* Direct Contact Info */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
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
                className="flex items-center gap-4 p-4 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
              >
                <Briefcase className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="font-medium text-black">LinkedIn</p>
                  <p className="text-sm text-gray-600">
                    Connect with me professionally
                  </p>
                </div>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
              >
                <Twitter className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="font-medium text-black">Twitter / X</p>
                  <p className="text-sm text-gray-600">
                    Follow for security insights
                  </p>
                </div>
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="font-medium text-black">Discord</p>
                  <p className="text-sm text-gray-600">
                    Join the security community
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
                href="mailto:hussainqadri9263@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
              >
                <Mail className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="font-medium text-black">Email</p>
                  <p className="text-sm text-gray-600">
                    hussainqadri9263@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="font-medium text-black">WhatsApp</p>
                  <p className="text-sm text-gray-600">Quick messages</p>
                </div>
              </a>

              {/* Availability Status */}
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">
                      Currently Accepting New Clients
                    </p>
                    <p className="text-sm text-green-700">
                      Limited slots available for Q2 2025
                    </p>
                  </div>
                </div>
              </div>
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
              <div key={idx} className="border-l-4 border-[#4ddcd3] pl-6 py-4">
                <h3 className="font-serif font-bold text-lg text-black mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
