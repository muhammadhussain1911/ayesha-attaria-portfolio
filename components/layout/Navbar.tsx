"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Shield } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isAboutHovered, setIsAboutHovered] = useState(false);
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
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const aboutDropdownLinks = [
    { href: "/about", label: "About Me" },
    { href: "/skills", label: "Skills" },
    { href: "/experience", label: "Experience" },
    { href: "/certifications", label: "Certifications" },
  ];

  return (
    <nav className={`hidden md:block sticky top-0 z-50 pt-4 px-4 transition-all duration-300`}>
      <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-3xl ${scrolled ? 'glass-card py-2 px-8' : 'bg-transparent py-4'}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#4ddcd3]/10 flex items-center justify-center group-hover:bg-[#4ddcd3]/20 transition-colors">
              <Shield className="w-5 h-5 text-[#4ddcd3] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-serif font-bold text-xl text-black tracking-tight group-hover:text-[#4ddcd3] transition-colors">
              Ayesha Attaria
            </span>
          </Link>
          
          <div className="flex items-center gap-1 bg-off-white/50 p-1.5 rounded-2xl border border-white/50 shadow-inner">
            {/* Home Link */}
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                pathname === "/"
                  ? "bg-white text-[#4ddcd3] shadow-sm"
                  : "text-gray-600 hover:text-black hover:bg-white/50"
              }`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutHovered(true)}
              onMouseLeave={() => setIsAboutHovered(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isAboutHovered || pathname === "/about"
                    ? "bg-white text-[#4ddcd3] shadow-sm"
                    : "text-gray-600 hover:text-black hover:bg-white/50"
                }`}
              >
                About
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isAboutHovered ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isAboutHovered && (
                <div className="absolute top-full left-0 mt-2 w-48 glass-card border border-white p-2">
                  {aboutDropdownLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2.5 text-sm rounded-xl transition-all duration-300 mb-1 last:mb-0 ${
                          isActive
                            ? "bg-[#4ddcd3]/10 text-[#4ddcd3] font-semibold"
                            : "text-gray-600 hover:bg-off-white hover:text-black"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Remaining Links */}
            {mainLinks.slice(1).map((link) => {
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
            <Link href="/contact" className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-[#4ddcd3] hover:text-black hover:shadow-soft transition-all duration-300">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
