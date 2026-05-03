'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mainLinks = [
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const aboutDropdownLinks = [
    { href: '/about', label: 'About Me' },
    { href: '/skills', label: 'Skills' },
    { href: '/experience', label: 'Experience' },
    { href: '/certifications', label: 'Certifications' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when pathname changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const isAboutActive = aboutDropdownLinks.some(link => pathname === link.href);

  return (
    <nav className="hidden md:block sticky top-0 z-40 bg-white border-b border-[#e5e5e5]">
      <div className="section-container flex items-center justify-between h-16">
        <Link href="/" className="font-serif font-bold text-xl text-black">
          Ayesha Attaria
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`relative text-sm font-medium transition-colors duration-300 ${
              pathname === '/' ? 'text-[#4ddcd3]' : 'text-black hover:text-[#4ddcd3]'
            }`}
          >
            Home
            {pathname === '/' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ddcd3]"></span>
            )}
          </Link>

          {/* About Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                isAboutActive ? 'text-[#4ddcd3]' : 'text-black hover:text-[#4ddcd3]'
              }`}
            >
              About
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
              {isAboutActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ddcd3]"></span>
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg border border-[#e5e5e5] shadow-lg overflow-hidden">
                {aboutDropdownLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-[#4ddcd3] text-white'
                          : 'text-gray-700 hover:bg-[#e8f7f5] hover:text-[#4ddcd3]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Remaining Main Links */}
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-[#4ddcd3]' : 'text-black hover:text-[#4ddcd3]'
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
