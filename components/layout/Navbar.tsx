"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isAboutHovered, setIsAboutHovered] = useState(false);

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
    <nav className="hidden md:block sticky top-0 z-40 bg-white border-b border-[#e5e5e5]">
      <div className="section-container flex items-center justify-between h-16">
        <Link href="/" className="font-serif font-bold text-xl text-black">
          Ayesha Attaria
        </Link>
        <div className="flex items-center gap-8">
          {/* Home Link */}
          <Link
            href="/"
            className={`relative text-sm font-medium transition-colors duration-300 ${
              pathname === "/"
                ? "text-[#4ddcd3]"
                : "text-black hover:text-[#4ddcd3]"
            }`}
          >
            Home
            {pathname === "/" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ddcd3]"></span>
            )}
          </Link>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                isAboutHovered || pathname === "/about"
                  ? "text-[#4ddcd3]"
                  : "text-black hover:text-[#4ddcd3]"
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
              <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-[#e5e5e5] rounded-lg shadow-lg overflow-hidden">
                {aboutDropdownLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2 text-sm transition-colors duration-300 ${
                        index === 0 ? "border-b border-[#e5e5e5]" : ""
                      } ${
                        isActive
                          ? "bg-[#4ddcd3] text-white font-medium"
                          : "text-black hover:bg-[#e8f7f5] hover:text-[#4ddcd3]"
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
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#4ddcd3]"
                    : "text-black hover:text-[#4ddcd3]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ddcd3]"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
