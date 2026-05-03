"use client";

import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState("");

  const insertMarkdown = (before: string, after: string = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end) || "text";

    const newText =
      text.substring(0, start) +
      before +
      selectedText +
      after +
      text.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertBlock = (block: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const isNewLine = start === 0 || text[start - 1] === "\n";

    const newText = isNewLine
      ? text.substring(0, start) + block + text.substring(start)
      : text.substring(0, start) + "\n" + block + text.substring(start);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        insertMarkdown(`![alt text](${base64})`, "");
      };
      reader.readAsDataURL(file);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    const text = prompt("Enter link text:") || "link";
    if (url) {
      insertMarkdown(`[${text}](${url})`, "");
    }
  };

  const toolbar = [
    {
      label: "H2",
      icon: Heading2,
      onClick: () => insertBlock("## Heading 2\n"),
      tooltip: "Heading 2",
    },
    {
      label: "H3",
      icon: Heading3,
      onClick: () => insertBlock("### Heading 3\n"),
      tooltip: "Heading 3",
    },
    { type: "divider" },
    {
      label: "B",
      icon: Bold,
      onClick: () => insertMarkdown("**", "**"),
      tooltip: "Bold",
    },
    {
      label: "I",
      icon: Italic,
      onClick: () => insertMarkdown("*", "*"),
      tooltip: "Italic",
    },
    {
      label: "U",
      icon: Underline,
      onClick: () => insertMarkdown("<u>", "</u>"),
      tooltip: "Underline",
    },
    { type: "divider" },
    {
      label: "Bullet List",
      icon: List,
      onClick: () => insertBlock("- Item 1\n- Item 2\n- Item 3\n"),
      tooltip: "Bullet List",
    },
    {
      label: "Numbered List",
      icon: ListOrdered,
      onClick: () => insertBlock("1. Item 1\n2. Item 2\n3. Item 3\n"),
      tooltip: "Numbered List",
    },
    { type: "divider" },
    {
      label: "Blockquote",
      icon: Quote,
      onClick: () => insertBlock("> Quote here\n"),
      tooltip: "Quote",
    },
    {
      label: "Code",
      icon: Code,
      onClick: () => insertBlock("```\ncode here\n```\n"),
      tooltip: "Code Block",
    },
    { type: "divider" },
    {
      label: "Link",
      icon: Link,
      onClick: insertLink,
      tooltip: "Insert Link",
    },
    {
      label: "Image",
      icon: ImageIcon,
      onClick: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => handleImageUpload(e as any);
        input.click();
      },
      tooltip: "Insert Image",
    },
  ];

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 bg-off-white border border-gray-200 border-b-0 rounded-t-xl">
        {toolbar.map((item, idx) => {
          if (item.type === "divider") {
            return (
              <div key={`divider-${idx}`} className="w-px bg-gray-300 mx-1" />
            );
          }

          const IconComponent = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              title={item.tooltip}
              className="p-2 rounded hover:bg-[#4ddcd3]/10 transition-colors text-gray-600 hover:text-[#4ddcd3]"
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`# Your Blog Title

Write your content here. You can use markdown formatting:

## Headings
Use ## for H2, ### for H3

**Bold text** and *italic text*

- Bullet points
1. Numbered lists

\`\`\`
code blocks
\`\`\`

> Blockquotes

[Links](https://example.com)

![Images](image-url-or-base64)`}
        rows={15}
        className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-b-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent outline-none font-mono text-sm resize-vertical"
      />

      {/* Preview Note */}
      <p className="text-xs text-gray-500">
        💡 Supports Markdown formatting. Preview will render on the live page.
      </p>
    </div>
  );
}
