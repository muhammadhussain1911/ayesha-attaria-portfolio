"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconRendererProps {
  name: string;
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
};

export function IconRenderer({ name, className = "w-6 h-6" }: IconRendererProps) {
  const Icon = iconMap[name];
  
  if (!Icon) {
    return null;
  }
  
  return <Icon className={className} />;
}
