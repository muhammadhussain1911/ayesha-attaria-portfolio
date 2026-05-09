"use client";

import DOMPurify from "isomorphic-dompurify";
import { ReactNode } from "react";

interface HTMLRendererProps {
  content: string;
  className?: string;
}

export function HTMLRenderer({ content, className = "" }: HTMLRendererProps) {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "strike",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "span",
      "div",
    ],
    ALLOWED_ATTR: [
      "href",
      "title",
      "target",
      "rel",
      "src",
      "alt",
      "width",
      "height",
      "style",
      "class",
      "data-*",
    ],
    ALLOW_DATA_ATTR: true,
  });

  return (
    <div
      className={`html-content prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      style={
        {
          "--tw-prose-headings": "var(--color-black)",
          "--tw-prose-body": "var(--color-gray-700)",
          "--tw-prose-links": "var(--color-teal)",
        } as React.CSSProperties
      }
    />
  );
}
