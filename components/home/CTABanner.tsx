import Link from 'next/link';

export function CTABanner() {
  return (
    <section className="py-16 md:py-24 bg-[#4ddcd3]">
      <div className="section-container text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6 text-balance">
          Ready to Secure Your Web App?
        </h2>
        <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
          Let&apos;s schedule a free consultation. I&apos;ll review your attack surface and show you exactly where you&apos;re vulnerable.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Book Your Free Consultation
        </Link>
      </div>
    </section>
  );
}
