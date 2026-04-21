import Link from "next/link";
import { Briefcase, Twitter, MessageCircle, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/experience", label: "Experience" },
    { href: "/certifications", label: "Certifications" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const socials = [
    {
      icon: Briefcase,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ayeshaattaria",
    },
    { icon: Twitter, label: "Twitter", url: "https://twitter.com" },
    { icon: MessageCircle, label: "Discord", url: "https://discord.com" },
    { icon: Phone, label: "WhatsApp", url: "https://wa.me" },
    { icon: Mail, label: "Email", url: "mailto:hussainqadri9263@gmail.com" },
  ];

  return (
    <footer className="bg-[#f5f5f5] border-t border-[#e5e5e5] mt-20 mb-20 md:mb-0">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Branding */}
          <div>
            <h3 className="font-serif font-bold text-xl text-black mb-4">
              Ayesha Attaria
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Web Application & API Penetration Tester | Ethical Hacker
            </p>
            <p className="text-gray-600 text-xs">
              Serving clients in USA · UK · Europe · Australia · Canada
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-black mb-4">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 text-sm hover:text-[#4ddcd3] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-serif font-bold text-black mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#4ddcd3] hover:bg-[#4ddcd3] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-700 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e5e5] py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-700 text-sm">
              © {currentYear} Ayesha Attaria. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs italic">
              Securing the web, one vulnerability at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
