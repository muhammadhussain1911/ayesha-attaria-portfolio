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
} from "lucide-react";

const IconRenderer = ({ iconName }: { iconName: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    home: <Home className="w-6 h-6" />,
    user: <User className="w-6 h-6" />,
    folderopen: <FolderOpen className="w-6 h-6" />,
    bookopen: <BookOpen className="w-6 h-6" />,
    mail: <Mail className="w-6 h-6" />,
    menu: <MenuIcon className="w-6 h-6" />,
    x: <X className="w-6 h-6" />,
  };

  return <>{iconMap[iconName.toLowerCase()] || iconName}</>;
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const navTabLinks = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/projects", label: "Projects", icon: "folderopen" },
    { href: "/services", label: "Services", icon: "user" },
    { href: "/blog", label: "Blog", icon: "bookopen" },
    { href: "/contact", label: "Contact", icon: "mail" },
  ];

  const menuLinks = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about", label: "About", icon: "user" },
    { href: "/projects", label: "Projects", icon: "folderopen" },
    { href: "/services", label: "Services", icon: "user" },
    { href: "/blog", label: "Blog", icon: "bookopen" },
    { href: "/contact", label: "Contact", icon: "mail" },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e5e5]">
        <div className="flex items-center justify-around h-20">
          {navTabLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors duration-300 ${
                  isActive ? "text-[#4ddcd3]" : "text-gray-600"
                }`}
                onClick={() => setShowMenu(false)}
              >
                <IconRenderer iconName={link.icon} />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-gray-600 hover:text-[#4ddcd3] transition-colors duration-300"
            aria-label="Toggle navigation menu"
          >
            <IconRenderer iconName="menu" />
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg p-6 overflow-y-auto pb-32"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-[#4ddcd3]"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mt-8 flex flex-col gap-2">
              {menuLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-[#4ddcd3] text-white font-medium"
                        : "text-black hover:bg-[#f5f5f5]"
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    <div
                      className={`${isActive ? "text-white" : "text-gray-600"}`}
                    >
                      <IconRenderer iconName={link.icon} />
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
