'use client';

import { CountUpNumber } from '@/components/shared/CountUpNumber';

export function StatsStrip() {
  const stats = [
    { number: 25, label: 'Organizations Secured', suffix: '+' },
    { number: 5, label: 'Bugcrowd x Black Hat USA CTF', prefix: '#' },
    { number: 18, label: 'Iran Tech Olympics CTF', prefix: '#' },
    { number: 5, label: 'Certifications', suffix: '+' },
    { number: 2, label: 'Years Active Bug Bounty', suffix: '+' },
  ];

  return (
    <section className="bg-[#f5f5f5] border-y border-[#e5e5e5] py-12 md:py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-[#4ddcd3] mb-2">
                <CountUpNumber
                  end={stat.number}
                  duration={2000}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
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
