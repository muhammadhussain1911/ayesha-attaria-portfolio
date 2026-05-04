"use client";

import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";

interface Tool {
  name: string;
  icon?: LucideIcon | string;
  imageUrl?: string;
}

interface ToolsGridProps {
  tools: Tool[];
  className?: string;
}

// Map of icon names to lucide-react icon components
const iconMap: Record<string, LucideIcon> = {
  Search: LucideIcons.Search,
  Zap: LucideIcons.Zap,
  Mail: LucideIcons.Mail,
  Target: LucideIcons.Target,
  Database: LucideIcons.Database,
  Map: LucideIcons.Map,
  Flame: LucideIcons.Flame,
  AlertTriangle: LucideIcons.AlertTriangle,
  Scissors: LucideIcons.Scissors,
  Swords: LucideIcons.Swords,
  Waves: LucideIcons.Waves,
  Lock: LucideIcons.Lock,
  Trophy: LucideIcons.Trophy,
  Shield: LucideIcons.Shield,
  AlertCircle: LucideIcons.AlertCircle,
  Package: LucideIcons.Package,
  GraduationCap: LucideIcons.GraduationCap,
  Smartphone: LucideIcons.Smartphone,
  Pin: LucideIcons.Pin,
  Star: LucideIcons.Star,
  Check: LucideIcons.Check,
  Code2: LucideIcons.Code2,
  BookOpen: LucideIcons.BookOpen,
};

export function ToolsGrid({ tools, className = "" }: ToolsGridProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
    >
      {tools.map((tool) => {
        const hasImageUrl = !!tool.imageUrl;
        const isComponent = typeof tool.icon !== "string" && !hasImageUrl;
        const isIconName =
          typeof tool.icon === "string" && iconMap[tool.icon] && !hasImageUrl;
        const isEmoji =
          typeof tool.icon === "string" && !isIconName && !hasImageUrl;

        let IconComponent: LucideIcon | null = null;

        if (isComponent) {
          IconComponent = tool.icon as LucideIcon;
        } else if (isIconName) {
          IconComponent = iconMap[tool.icon as string];
        }

        return (
          <div
            key={tool.name}
            className="flex flex-col items-center justify-center p-6 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
          >
            {hasImageUrl && tool.imageUrl ? (
              <Image
                src={tool.imageUrl}
                alt={tool.name}
                width={48}
                height={48}
                className="mb-2 object-contain"
              />
            ) : isEmoji && typeof tool.icon === "string" ? (
              <span className="text-4xl mb-2">{tool.icon}</span>
            ) : IconComponent ? (
              <IconComponent className="w-12 h-12 text-[#4ddcd3] mb-2" />
            ) : null}
            <p className="text-center font-medium text-sm text-black">
              {tool.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
