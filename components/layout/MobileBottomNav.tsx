"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  User,
  FolderOpen,
  BookOpen,
  Mail,
  Menu as MenuIcon,
  X,
  Briefcase,
} from "lucide-react";

const IconRenderer = ({
  iconName,
  className = "w-6 h-6",
}: {
  iconName: string;
  className?: string;
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    home: <Home className={className} />,
    user: <User className={className} />,
    folderopen: <FolderOpen className={className} />,
    bookopen: <BookOpen className={className} />,
    mail: <Mail className={className} />,
    menu: <MenuIcon className={className} />,
    x: <X className={className} />,
    briefcase: <Briefcase className={className} />,
  };

  return <>{iconMap[iconName.toLowerCase()] || iconName}</>;
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const navTabLinks = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/projects", label: "Projects", icon: "folderopen" },
    { href: "/services", label: "Services", icon: "briefcase" },
    { href: "/contact", label: "Contact", icon: "mail" },
  ];

  const menuLinks = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about", label: "About", icon: "user" },
    { href: "/portfolio", label: "Portfolio", icon: "folderopen" },
    { href: "/projects", label: "Projects", icon: "folderopen" },
    { href: "/services", label: "Services", icon: "briefcase" },
    { href: "/blog", label: "Blog", icon: "bookopen" },
    { href: "/contact", label: "Contact", icon: "mail" },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="glass-card flex items-center justify-around h-16 px-2 mx-auto max-w-sm rounded-full">
          {navTabLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 group`}
                onClick={() => setShowMenu(false)}
              >
                <div
                  className={`flex flex-col items-center transition-transform duration-300 ${isActive ? "-translate-y-1" : "group-hover:-translate-y-1"}`}
                >
                  <IconRenderer
                    iconName={link.icon}
                    className={`w-5 h-5 mb-1 ${isActive ? "text-[#4ddcd3]" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-[10px] font-medium ${isActive ? "text-[#4ddcd3]" : "text-gray-500"}`}
                  >
                    {link.label}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4ddcd3] shadow-[0_0_8px_rgba(77,220,211,0.8)]"></div>
                )}
              </Link>
            );
          })}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 group"
            aria-label="Toggle navigation menu"
          >
            <div
              className={`flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-1`}
            >
              <IconRenderer
                iconName="menu"
                className={`w-5 h-5 mb-1 ${showMenu ? "text-[#4ddcd3]" : "text-gray-500"}`}
              />
              <span
                className={`text-[10px] font-medium ${showMenu ? "text-[#4ddcd3]" : "text-gray-500"}`}
              >
                Menu
              </span>
            </div>
            {showMenu && (
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4ddcd3] shadow-[0_0_8px_rgba(77,220,211,0.8)]"></div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="fixed right-0 top-0 bottom-0 w-72 bg-off-white shadow-2xl overflow-y-auto pb-32 transition-transform duration-300 transform translate-x-0 border-l border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-white sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
              <span className="font-serif font-bold text-lg">Menu</span>
              <button
                onClick={() => setShowMenu(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-[#4ddcd3] hover:bg-[#4ddcd3]/10 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-2">
              {menuLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-sm text-[#4ddcd3] font-semibold border border-white"
                        : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-black border border-transparent"
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    <div
                      className={`p-2 rounded-xl ${isActive ? "bg-[#4ddcd3]/10" : "bg-gray-100"}`}
                    >
                      <IconRenderer iconName={link.icon} className="w-4 h-4" />
                    </div>
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
