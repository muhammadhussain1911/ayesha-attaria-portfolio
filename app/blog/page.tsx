import type { Metadata } from "next";
import { BlogCard } from "@/components/shared/BlogCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Blog } from "@/lib/supabase";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Blog & Writeups | Ayesha Attaria — Ethical Hacker",
  description:
    "Read Ayesha Attaria's cybersecurity blog — featuring vulnerability writeups, CTF solutions, OWASP Top 10 guides, and API security research for developers and security teams.",
  openGraph: {
    title: "Security Blog & Writeups | Ayesha Attaria",
    url: "https://ayeshaattaria.site/blog",
    type: "website",
    images: [
      {
        url: "/ayeshaattaria.jpeg",
        width: 1200,
        height: 630,
        alt: "Ayesha Attaria - Web App & API Penetration Tester",
      },
    ],
  },
};

async function getBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/blogs?published=true`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("Failed to fetch blogs");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();

  // Extract unique categories from posts
  const categories =
    posts
      .flatMap((post) => post.category)
      .filter((cat, idx, arr) => arr.indexOf(cat) === idx)
      .slice(0, 6) || [];

  const allCategories = ["All", ...categories];

  return (
    <div className="bg-off-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="section-container relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            Security Blog
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Vulnerability writeups, CTF solutions, OWASP guides, and API
            security research. Learn from my real-world security assessments and
            research.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 md:py-12 border-b border-[#e5e5e5]">
        <div className="section-container">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  category === "All"
                    ? "bg-[#4ddcd3] text-black shadow-md -translate-y-1"
                    : "glass-card shadow-none hover:shadow-soft-sm hover:-translate-y-1 text-gray-700 hover:text-[#4ddcd3]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <SectionHeading
            title="Latest Articles"
            subtitle="Recent security research, writeups, and technical guides."
          />

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="glass-card group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  {post.image_url && (
                    <div className="relative w-full h-48 overflow-hidden bg-off-white">
                      <img
                        src={post.image_url}
                        alt={post.image_alt || post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-black mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 grow line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                      <span className="text-xs text-gray-600">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-[#4ddcd3] text-sm font-medium hover:text-[#2ec4bb] transition-colors"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No blog posts published yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe section */}
      {posts.length > 0 && (
        <section className="py-12 md:py-20 relative">
          <div className="section-container max-w-2xl">
            <div className="glass-card p-8 border-l-4 border-[#4ddcd3] flex items-center justify-between">
              <p className="text-gray-700">
                <span className="font-bold">Subscribe to updates</span> to be
                notified when new articles are published.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
