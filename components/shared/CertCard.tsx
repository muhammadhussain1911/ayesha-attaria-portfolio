interface CertCardProps {
  name: string;
  issuer: string;
  year: string;
  description: string;
  icon: string;
}

export function CertCard({
  name,
  issuer,
  year,
  description,
  icon,
}: CertCardProps) {
  return (
    <div className="border-2 border-[#e5e5e5] rounded-lg p-6 hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300 bg-white">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1">
          <h3 className="font-serif font-bold text-lg text-black mb-1">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{issuer}</p>
          <span className="inline-block px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
            {year}
          </span>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
