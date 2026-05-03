"use client";

import { CountUpNumber } from "@/components/shared/CountUpNumber";

export function StatsStrip() {
  const stats = [
    { number: 30, label: "Organizations Secured", suffix: "+" },
    { number: 125, label: "Vulnerabilities Found", suffix: "+" },
    { number: 5, label: "Certifications", suffix: "+" },
    { number: 2, label: "Years Of Experience", suffix: "+" },
  ];

  return (
    <section className="bg-off-white pb-12 md:pb-20 pt-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 md:p-10 border-t-4 border-t-[#4ddcd3]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center pt-6 md:pt-0 group">
                <div className="text-4xl md:text-5xl font-serif font-bold text-black mb-2 group-hover:text-[#4ddcd3] transition-colors duration-300">
                  <CountUpNumber
                    end={stat.number}
                    duration={2000}
                    suffix={stat.suffix || ""}
                  />
                </div>
                <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
