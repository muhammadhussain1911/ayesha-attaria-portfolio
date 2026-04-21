import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { StatsStrip } from '@/components/home/StatsStrip';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { WhyChooseMe } from '@/components/home/WhyChooseMe';
import { Methodology } from '@/components/home/Methodology';
import { Testimonials } from '@/components/home/Testimonials';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Ayesha Attaria | Web App & API Penetration Tester | Ethical Hacker',
  description:
    'Ayesha Attaria is a certified Web Application & API Penetration Tester helping companies in the USA, UK, Europe, Australia & Canada secure their systems. OWASP Top 10 aligned VAPT services.',
  openGraph: {
    title: 'Ayesha Attaria | Web App & API Penetration Tester',
    description:
      'Certified ethical hacker and penetration tester helping global companies secure their web applications.',
    url: 'https://ayeshaattaria.com',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <StatsStrip />
      <ServicesOverview />
      <WhyChooseMe />
      <Methodology />
      <Testimonials />
      <CTABanner />
    </div>
  );
}
