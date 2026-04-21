'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Skills' },
    { href: '/experience', label: 'Experience' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="hidden md:block sticky top-0 z-40 bg-white border-b border-[#e5e5e5]">
      <div className="section-container flex items-center justify-between h-16">
        <Link href="/" className="font-serif font-bold text-xl text-black">
          Ayesha Attaria
        </Link>
        <div className="flex items-center gap-8">
          {links.map((link) => {
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
