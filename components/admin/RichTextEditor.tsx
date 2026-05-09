"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return RQ;
  },
  { ssr: false, loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse" /> }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "blockquote",
    "code-block",
    "list",
    "link",
    "image",
  ];

  return (
    <div className="space-y-2">
      <style jsx global>{`
        .ql-container {
          font-size: 16px;
          border: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 0.75rem 0.75rem;
          background: white;
        }

        .ql-toolbar {
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem 0.75rem 0 0;
          background: #f9fafb;
        }

        .ql-toolbar button:hover,
        .ql-toolbar button.ql-active,
        .ql-toolbar button:focus {
          color: #4ddcd3;
        }

        .ql-toolbar button svg {
          stroke: currentColor;
        }

        .ql-editor {
          min-height: 300px;
          padding: 16px;
          font-family: inherit;
        }

        .ql-editor.ql-blank::before {
          color: #d1d5db;
          font-style: italic;
        }

        .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }

        .ql-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.83em 0;
        }

        .ql-editor h4 {
          font-size: 1.1em;
          font-weight: bold;
          margin: 1em 0;
        }

        .ql-editor h5 {
          font-size: 0.95em;
          font-weight: bold;
          margin: 1.17em 0;
        }

        .ql-editor h6 {
          font-size: 0.85em;
          font-weight: bold;
          margin: 1.33em 0;
        }

        .ql-editor ul,
        .ql-editor ol {
          padding-left: 1.5em;
          margin: 1em 0;
        }

        .ql-editor blockquote {
          border-left: 4px solid #4ddcd3;
          padding-left: 1em;
          margin: 1em 0;
          background: #f0fffe;
        }

        .ql-editor pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1em;
          border-radius: 0.5em;
          margin: 1em 0;
        }

        .ql-editor code {
          background: #f3f4f6;
          color: #ef4444;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-family: monospace;
        }

        .ql-editor a {
          color: #4ddcd3;
          text-decoration: underline;
        }

        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
          margin: 1em 0;
        }
      `}</style>

      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Start writing your blog post here..."
        theme="snow"
      />
    </div>
  );
}
