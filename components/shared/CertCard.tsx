import { Trophy, Sword, GraduationCap, Shield } from "lucide-react";

interface CertCardProps {
  title: string;
  issuer: string;
  issue_date?: string;
  expiry_date?: string;
  description?: string;
  badge_image_url?: string;
  badge_image_alt?: string;
  credential_url?: string;
  icon?: string;
}

const getCertIcon = (title: string) => {
  if (title.toLowerCase().includes("bug bounty"))
    return <Trophy className="w-8 h-8 text-teal-600" />;
  if (title.toLowerCase().includes("red team"))
    return <Sword className="w-8 h-8 text-teal-600" />;
  if (
    title.toLowerCase().includes("educator") ||
    title.toLowerCase().includes("education")
  )
    return <GraduationCap className="w-8 h-8 text-teal-600" />;
  return <Shield className="w-8 h-8 text-teal-600" />;
};

export function CertCard({
  title,
  issuer,
  issue_date,
  expiry_date,
  description,
  badge_image_url,
  badge_image_alt,
  credential_url,
  icon,
}: CertCardProps) {
  return (
    <div className="border-2 border-[#e5e5e5] rounded-lg p-6 hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300 bg-white h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        {badge_image_url ? (
          <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-linear-to-br from-[#f5f5f5] to-[#e5e5e5] flex items-center justify-center">
            <img
              src={badge_image_url}
              alt={badge_image_alt || title}
              className="w-full h-full object-contain p-2"
            />
          </div>
        ) : (
          <span className="shrink-0">{getCertIcon(title)}</span>
        )}
        <div className="flex-1">
          <h3 className="font-serif font-bold text-lg text-black mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{issuer}</p>
          {issue_date && (
            <span className="inline-block px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
              {issue_date}
            </span>
          )}
        </div>
      </div>
      {description && (
        <p className="text-gray-700 text-sm leading-relaxed mb-4 grow">
          {description}
        </p>
      )}
      {credential_url && (
        <a
          href={credential_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ddcd3] text-sm font-medium hover:text-[#2ec4bb] transition-colors inline-block mt-auto"
        >
          View Credential →
        </a>
      )}
    </div>
  );
}
