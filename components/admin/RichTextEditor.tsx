"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo2,
  Redo2,
  Link as LinkIcon,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          languageClassPrefix: "language-",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] px-4 py-3 w-full",
      },
    },
  });

  if (!editor) {
    return <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />;
  }

  const handleLinkClick = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const ToolbarButton = ({
    onClick,
    active,
    Icon,
    title,
  }: {
    onClick: () => void;
    active: boolean;
    Icon: React.FC<{ className: string }>;
    title: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-colors ${
        active
          ? "bg-[#4ddcd3] text-black"
          : "text-gray-600 hover:bg-gray-100 hover:text-[#4ddcd3]"
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  return (
    <div className="space-y-2 border border-gray-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 bg-off-white border-b border-gray-200">
        {/* Heading levels */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
            Icon={Heading1}
            title="Heading 1"
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            Icon={Heading2}
            title="Heading 2"
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            Icon={Heading3}
            title="Heading 3"
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            active={editor.isActive("heading", { level: 4 })}
            Icon={Heading4}
            title="Heading 4"
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            active={editor.isActive("heading", { level: 5 })}
            Icon={Heading5}
            title="Heading 5"
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            active={editor.isActive("heading", { level: 6 })}
            Icon={Heading6}
            title="Heading 6"
          />
        </div>

        {/* Text formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            Icon={Bold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            Icon={Italic}
            title="Italic"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            Icon={Strikethrough}
            title="Strike"
          />
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            Icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            Icon={ListOrdered}
            title="Ordered List"
          />
        </div>

        {/* Blocks */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            Icon={Quote}
            title="Quote"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            Icon={Code2}
            title="Code Block"
          />
        </div>

        {/* Link */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={handleLinkClick}
            active={editor.isActive("link")}
            Icon={LinkIcon}
            title="Add Link (select text first, then click to add URL)"
          />
        </div>

        {/* History */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            active={false}
            Icon={Undo2}
            title="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            active={false}
            Icon={Redo2}
            title="Redo"
          />
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white">
        <EditorContent editor={editor} className="tiptap-editor prose-editor" />
      </div>

      {/* Styling */}
      <style jsx global>{`
        .tiptap-editor .ProseMirror {
          min-height: 300px;
          padding: 16px;
          font-family: inherit;
          outline: none;
        }

        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: #d1d5db;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .tiptap-editor .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        .tiptap-editor .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }

        .tiptap-editor .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.83em 0;
        }

        .tiptap-editor .ProseMirror h4 {
          font-size: 1.1em;
          font-weight: bold;
          margin: 1em 0;
        }

        .tiptap-editor .ProseMirror h5 {
          font-size: 0.95em;
          font-weight: bold;
          margin: 1.17em 0;
        }

        .tiptap-editor .ProseMirror h6 {
          font-size: 0.85em;
          font-weight: bold;
          margin: 1.33em 0;
        }

        .tiptap-editor .ProseMirror ul {
          padding-left: 1.5em;
          margin: 1em 0;
          list-style-type: disc;
        }

        .tiptap-editor .ProseMirror ol {
          padding-left: 1.5em;
          margin: 1em 0;
          list-style-type: decimal;
        }

        .tiptap-editor .ProseMirror li {
          margin: 0.25em 0;
        }

        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid #4ddcd3;
          padding-left: 1em;
          margin: 1em 0;
          background: #f0fffe;
          color: #374151;
        }

        .tiptap-editor .ProseMirror pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1em;
          border-radius: 0.5em;
          margin: 1em 0;
          overflow-x: auto;
        }

        .tiptap-editor .ProseMirror code {
          background: #f3f4f6;
          color: #ef4444;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-family: monospace;
          font-size: 0.9em;
        }

        .tiptap-editor .ProseMirror pre code {
          background: none;
          color: inherit;
          padding: 0;
          border-radius: 0;
          font-size: 1em;
        }

        .tiptap-editor .ProseMirror a {
          color: #4ddcd3;
          text-decoration: underline;
          cursor: pointer;
        }

        .tiptap-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
          margin: 1em 0;
        }

        .tiptap-editor .ProseMirror p {
          margin: 0.5em 0;
          line-height: 1.6;
        }

        .tiptap-editor .ProseMirror {
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}
