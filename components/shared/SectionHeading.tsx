interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">
        {title}
        <span className="block h-1 w-20 bg-[#4ddcd3] mt-4 rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
