import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  readTime?: string;
  image_url?: string;
  image_alt?: string;
}

export function BlogCard({
  title,
  excerpt,
  category,
  date,
  slug,
  readTime = "5 min read",
  image_url,
  image_alt,
}: BlogCardProps) {
  return (
    <article className="border border-[#e5e5e5] rounded-lg overflow-hidden hover:shadow-lg hover:border-[#4ddcd3] transition-all duration-300 bg-white flex flex-col h-full">
      {image_url && (
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#f5f5f5] to-[#e5e5e5]">
          <img
            src={image_url}
            alt={image_alt || title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
            {category}
          </span>
          <span className="text-xs text-gray-600">{readTime}</span>
        </div>
        <h3 className="font-serif font-bold text-xl text-black mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <span className="text-xs text-gray-600">{date}</span>
          <Link
            href={`/blog/${slug}`}
            className="text-[#4ddcd3] font-medium text-sm hover:text-[#2ec4bb] transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
