"use client";

import { HTMLRenderer } from "@/components/shared/HTMLRenderer";

interface BlogPreviewProps {
  content: string;
  title: string;
}

export function BlogPreview({ content, title }: BlogPreviewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6">
        {title || "Blog Preview"}
      </h1>
      <div className="text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
        Live Preview
      </div>
      {content ? (
        <div className="prose-content space-y-4 text-gray-700">
          <HTMLRenderer content={content} />
        </div>
      ) : (
        <p className="text-gray-400 italic">Start writing to see preview...</p>
      )}
    </div>
  );
}
