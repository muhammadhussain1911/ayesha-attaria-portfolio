import Link from "next/link";
import { Briefcase, Twitter, MessageCircle, Phone, Mail, ShieldCheck } from "lucide-react";

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
  // when someone click on
  const socials = [
    {
      icon: Briefcase,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ayeshaattaria",
    },
    { icon: Twitter, label: "Twitter", url: "https://x.com/Bug_blitzer" },
    {
      icon: MessageCircle,
      label: "Discord",
      url: "https://discord.com/users/1238975366186405948",
    },
    { icon: Phone, label: "WhatsApp", url: "https://wa.me/923175779263" },
    {
      icon: Mail,
      label: "Email",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=ayeshaattaria9263@gmail.com",
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-20 mb-20 md:mb-0 relative overflow-hidden rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.02)]">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#4ddcd3]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#4ddcd3]/10 flex items-center justify-center group-hover:bg-[#4ddcd3]/20 transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#4ddcd3]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-black">
                Ayesha Attaria
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Web Application & API Penetration Tester | Ethical Hacker
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-off-white border border-gray-100">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ddcd3] animate-pulse-dot"></div>
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Serving Globally
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-black mb-6">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-[#4ddcd3] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4ddcd3] transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-serif font-bold text-black mb-6">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-off-white border border-transparent hover:border-[#4ddcd3]/30 hover:bg-[#4ddcd3]/10 hover:-translate-y-1 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-[#4ddcd3]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Ayesha Attaria. All rights reserved.
            </p>

            <p className="text-gray-500 text-sm italic">
              Securing the web, one vulnerability at a time.
            </p>
            <p className="text-[#4ddcd3] text-sm font-medium">
              Made by{" "}
              <a
                href="https://www.hussainappdeveloper.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#4ddcd3] transition-colors"
              >
                Muhammad Hussain
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
