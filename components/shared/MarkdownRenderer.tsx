"use client";

import ReactMarkdown from "react-markdown";
import { ReactNode } from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        components={{
          // Headings with proper styling
          h1: ({ children }: { children: ReactNode }) => (
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6 mt-8 first:mt-0 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }: { children: ReactNode }) => (
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-5 mt-7 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }: { children: ReactNode }) => (
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-black mb-4 mt-6 leading-tight">
              {children}
            </h3>
          ),
          h4: ({ children }: { children: ReactNode }) => (
            <h4 className="text-xl md:text-2xl font-serif font-bold text-black mb-3 mt-5 leading-tight">
              {children}
            </h4>
          ),
          h5: ({ children }: { children: ReactNode }) => (
            <h5 className="text-lg md:text-xl font-serif font-bold text-black mb-3 mt-4 leading-tight">
              {children}
            </h5>
          ),
          h6: ({ children }: { children: ReactNode }) => (
            <h6 className="text-base md:text-lg font-serif font-bold text-black mb-3 mt-4 leading-tight">
              {children}
            </h6>
          ),

          // Paragraphs
          p: ({ children }: { children: ReactNode }) => (
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              {children}
            </p>
          ),

          // Emphasis
          em: ({ children }: { children: ReactNode }) => (
            <em className="italic text-gray-700">{children}</em>
          ),

          // Strong
          strong: ({ children }: { children: ReactNode }) => (
            <strong className="font-bold text-black">{children}</strong>
          ),

          // Lists
          ul: ({ children }: { children: ReactNode }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }: { children: ReactNode }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }: { children: ReactNode }) => (
            <li className="text-gray-700">{children}</li>
          ),

          // Blockquotes
          blockquote: ({ children }: { children: ReactNode }) => (
            <blockquote className="border-l-4 border-[#4ddcd3] bg-[#4ddcd3]/5 pl-4 py-2 mb-4 italic text-gray-700 my-4">
              {children}
            </blockquote>
          ),

          // Code
          code: ({
            children,
            inline,
          }: {
            children: ReactNode;
            inline?: boolean;
          }) => {
            if (inline) {
              return (
                <code className="bg-gray-100 text-[#ff6b6b] px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-800 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm">
                {children}
              </code>
            );
          },

          // Code block
          pre: ({ children }: { children: ReactNode }) => (
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm">
              {children}
            </pre>
          ),

          // Links
          a: ({ href, children }: { href?: string; children: ReactNode }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4ddcd3] hover:text-[#3db5a1] underline transition-colors"
            >
              {children}
            </a>
          ),

          // Horizontal rule
          hr: () => <hr className="my-8 border-t border-gray-200" />,

          // Images
          img: ({ src, alt }: { src?: string; alt?: string }) => (
            <img
              src={src}
              alt={alt || "Blog image"}
              className="max-w-full h-auto rounded-lg mb-4 shadow-md"
            />
          ),

          // Tables
          table: ({ children }: { children: ReactNode }) => (
            <table className="w-full border-collapse mb-4">{children}</table>
          ),
          thead: ({ children }: { children: ReactNode }) => (
            <thead className="bg-gray-100">{children}</thead>
          ),
          tbody: ({ children }: { children: ReactNode }) => (
            <tbody>{children}</tbody>
          ),
          tr: ({ children }: { children: ReactNode }) => (
            <tr className="border-b border-gray-200">{children}</tr>
          ),
          th: ({ children }: { children: ReactNode }) => (
            <th className="px-4 py-2 text-left font-bold text-black border-b-2 border-gray-300">
              {children}
            </th>
          ),
          td: ({ children }: { children: ReactNode }) => (
            <td className="px-4 py-2 text-gray-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
