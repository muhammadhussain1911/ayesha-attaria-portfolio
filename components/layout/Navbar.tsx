"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    // { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`hidden md:block sticky top-0 z-50 pt-4 px-4 transition-all duration-300`}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-3xl glass-card ${scrolled ? "py-2 px-8 shadow-soft-lg" : "py-3 px-6"}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#4ddcd3]/10 flex items-center justify-center group-hover:bg-[#4ddcd3]/20 transition-colors">
              <Shield className="w-5 h-5 text-[#4ddcd3] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-serif font-bold text-xl text-black tracking-tight group-hover:text-[#4ddcd3] transition-colors">
              Ayesha Attaria
            </span>
          </Link>

          <div className="flex items-center gap-1 bg-off-white p-1.5 rounded-2xl border border-gray-100 shadow-inner">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-white text-[#4ddcd3] shadow-sm"
                      : "text-gray-600 hover:text-black hover:bg-white/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-[#4ddcd3] hover:text-black hover:shadow-soft transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
