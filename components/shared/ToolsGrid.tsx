"use client";

import type { LucideIcon } from "lucide-react";

interface Tool {
  name: string;
  icon: LucideIcon | string;
}

interface ToolsGridProps {
  tools: Tool[];
  className?: string;
}

export function ToolsGrid({ tools, className = "" }: ToolsGridProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
    >
      {tools.map((tool) => {
        const isEmoji = typeof tool.icon === "string";
        const Icon = !isEmoji ? tool.icon : null;

        return (
          <div
            key={tool.name}
            className="flex flex-col items-center justify-center p-6 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300"
          >
            {isEmoji ? (
              <span className="text-4xl mb-2">{tool.icon}</span>
            ) : (
              <Icon className="w-12 h-12 text-teal-600 mb-2" />
            )}
            <p className="text-center font-medium text-sm text-black">
              {tool.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
