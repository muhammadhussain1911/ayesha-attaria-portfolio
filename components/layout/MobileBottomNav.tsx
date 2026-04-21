'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function MobileBottomNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const mainLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '👩' },
    { href: '/skills', label: 'Skills', icon: '🛡️' },
    { href: '/certifications', label: 'Certs', icon: '🏆' },
    { href: '/contact', label: 'Contact', icon: '📬' },
  ];

  const allLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '👩' },
    { href: '/skills', label: 'Skills', icon: '🛡️' },
    { href: '/experience', label: 'Experience', icon: '💼' },
    { href: '/certifications', label: 'Certifications', icon: '🏆' },
    { href: '/projects', label: 'Projects', icon: '🗂️' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/contact', label: 'Contact', icon: '📬' },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e5e5]">
        <div className="flex items-center justify-around h-20">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors duration-300 ${
                  isActive ? 'text-[#4ddcd3]' : 'text-gray-600'
                }`}
                onClick={() => setShowMenu(false)}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-gray-600 hover:text-[#4ddcd3] transition-colors duration-300"
          >
            <span className="text-xl">☰</span>
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setShowMenu(false)}>
          <div
            className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              ✕
            </button>
            <div className="mt-8 flex flex-col gap-4">
              {allLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#4ddcd3] text-black font-medium'
                        : 'text-black hover:bg-[#f5f5f5]'
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
