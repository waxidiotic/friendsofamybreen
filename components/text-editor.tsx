"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { UseFormSetValue } from "react-hook-form";

export const TextEditor = ({
  setValue,
}: {
  setValue: UseFormSetValue<{ title: string; body: string }>;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setValue("body", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "px-3 py-2 rounded-md border-[1px] border-input cursor-text min-h-64 text-sm",
      },
    },
  });

  return <EditorContent editor={editor} />;
};
