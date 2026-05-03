import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-16 md:py-24 bg-off-white relative px-4">
      <div className="max-w-5xl mx-auto glass-card relative cyber-border group/cta">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4ddcd3]/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4ddcd3] to-transparent opacity-50 animate-scan"></div>
        </div>
        
        <div className="relative z-10 p-12 md:p-20 text-center">
          <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center mb-8 relative group">
            <div className="absolute inset-0 rounded-full bg-[#4ddcd3] animate-pulse-glow opacity-50"></div>
            <ShieldAlert className="w-10 h-10 text-[#4ddcd3] relative z-10" />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6 text-balance">
            Ready to Secure Your Web App?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s schedule a free consultation. I&apos;ll review your attack surface and show you exactly where you&apos;re vulnerable.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-black text-white font-medium rounded-2xl hover:bg-[#4ddcd3] hover:text-black transition-all duration-300 shadow-soft-lg hover:-translate-y-1 hover:shadow-soft-xl"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
