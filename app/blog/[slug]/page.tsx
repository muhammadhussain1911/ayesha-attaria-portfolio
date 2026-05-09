import type { Metadata } from "next";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { Blog } from "@/lib/supabase";
import { HTMLRenderer } from "@/components/shared/HTMLRenderer";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog Post | Ayesha Attaria",
  description: "Security research and vulnerability writeup.",
  openGraph: {
    type: "article",
    url: "https://ayeshaattaria.site/blog",
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

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) throw error;

    // Increment view count
    await supabaseAdmin
      .from("blogs")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", data.id);

    return data || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getRelatedBlogs(
  category: string,
  currentId: string,
): Promise<Blog[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .eq("category", category)
      .eq("published", true)
      .neq("id", currentId)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogs(post.category, post.id);

  return (
    <article className="bg-off-white min-h-screen">
      {/* Post Header */}
      <header className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="section-container max-w-3xl relative z-10">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#4ddcd3] flex items-center justify-center text-black font-bold">
                {post.author?.charAt(0).toUpperCase() || "AA"}
              </div>
              <div>
                <p className="font-medium text-black text-sm">
                  {post.author || "Ayesha Attaria"}
                </p>
                <p className="text-xs">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className="hidden md:block text-[#e5e5e5]">•</span>
            <span className="text-sm">
              {Math.ceil(post.content.split(" ").length / 200)} min read
            </span>
          </div>
        </div>
      </header>

      {/* Post Image */}
      {post.image_url && (
        <div className="py-12 relative">
          <div className="section-container max-w-3xl">
            <img
              src={post.image_url}
              alt={post.image_alt || post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Post Content */}
      <section className="py-12 md:py-20">
        <div className="section-container max-w-3xl">
          {/* Post body - HTML content rendered */}
          <div className="mb-12">
            <HTMLRenderer content={post.content} className="text-gray-700" />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="py-8 border-t border-b border-[#e5e5e5]">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 glass-card shadow-none rounded-full text-xs font-medium text-gray-700 hover:text-[#4ddcd3] hover:-translate-y-1 transition-all"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="py-8">
            <div className="glass-card p-6 md:p-8">
              <p className="text-gray-700">
                <span className="font-bold text-black">About the Author:</span>{" "}
                Ayesha Attaria is a Web Application Penetration Tester and
                Ethical Hacker helping organizations secure their digital
                assets. She specializes in VAPT, API security, and bug bounty
                hunting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4ddcd3]/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4ddcd3] to-transparent opacity-50 animate-scan"></div>
        <div className="section-container text-center relative z-10 glass-card p-12 md:p-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
            Need a Security Assessment?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            If this post highlights vulnerabilities you&apos;re concerned about,
            let&apos;s discuss how I can help secure your application.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-black text-white font-medium rounded-2xl hover:bg-[#4ddcd3] hover:text-black transition-all duration-300 shadow-soft-lg hover:-translate-y-1 hover:shadow-soft-xl"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <h2 className="text-4xl font-serif font-bold text-black mb-12">
            Related Articles
            <span className="block h-1 w-20 bg-[#4ddcd3] mt-4 rounded-full"></span>
          </h2>

          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="glass-card group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  {relatedPost.image_url && (
                    <div className="relative w-full h-48 overflow-hidden bg-off-white">
                      <img
                        src={relatedPost.image_url}
                        alt={relatedPost.image_alt || relatedPost.title}
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-black mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 grow line-clamp-3">
                      {relatedPost.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                      <span className="text-xs text-gray-600">
                        {new Date(relatedPost.created_at).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-[#4ddcd3] text-sm font-medium hover:text-[#2ec4bb] transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No related articles found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#4ddcd3] font-medium hover:text-[#2ec4bb] transition-colors text-lg"
        >
          ← Back to Blog
        </Link>
      </section>
    </article>
  );
}
