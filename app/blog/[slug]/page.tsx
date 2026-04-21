import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog Post | Ayesha Attaria",
  description: "Security research and vulnerability writeup.",
  openGraph: {
    type: "article",
    url: "https://ayeshaattaria.com/blog",
  },
};

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) throw error;
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
    const { data, error } = await supabase
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
  params: { slug: string };
}) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogs(post.category, post.id);

  return (
    <article className="bg-white">
      {/* Post Header */}
      <header className="py-12 md:py-20 bg-gradient-to-b from-[#f5f5f5] to-white border-b border-[#e5e5e5]">
        <div className="section-container max-w-3xl">
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
        <div className="py-12 md:py-20 bg-[#f5f5f5]">
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
          {/* Post body - Markdown content */}
          <div className="prose prose-lg max-w-none mb-12 text-gray-700 space-y-6">
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="py-8 border-t border-b border-[#e5e5e5]">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#f5f5f5] border border-[#e5e5e5] rounded-full text-xs font-medium text-gray-700 hover:border-[#4ddcd3] transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="py-8">
            <div className="p-6 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5]">
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
      <section className="py-12 md:py-20 bg-[#4ddcd3]">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
            Need a Security Assessment?
          </h2>
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
            If this post highlights vulnerabilities you&apos;re concerned about,
            let&apos;s discuss how I can help secure your application.
          </p>
          <Link href="/contact" className="inline-block btn-secondary">
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
                  className="rounded-lg overflow-hidden border border-[#e5e5e5] hover:border-[#4ddcd3] hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full"
                >
                  {relatedPost.image_url && (
                    <img
                      src={relatedPost.image_url}
                      alt={relatedPost.image_alt || relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#4ddcd3] text-black text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-black mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
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
