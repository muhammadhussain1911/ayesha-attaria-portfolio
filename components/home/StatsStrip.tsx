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
    <section className="bg-[#f5f5f5] border-y border-[#e5e5e5] py-12 md:py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-[#4ddcd3] mb-2">
                <CountUpNumber
                  end={stat.number}
                  duration={2000}
                  suffix={stat.suffix || ""}
                />
              </div>
              <p className="text-sm md:text-base text-gray-700 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
