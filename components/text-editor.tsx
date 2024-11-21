"use client";

import HardBreak from "@tiptap/extension-hard-break";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { UseFormSetValue } from "react-hook-form";
import { CreatePostFormValues } from "./create-post";

const CustomHardBreak = HardBreak.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.setHardBreak(),
    };
  },
});

const extensions = [
  StarterKit.configure({ hardBreak: false }),
  CustomHardBreak,
];

export const TextEditor = ({
  setValue,
}: {
  setValue: UseFormSetValue<CreatePostFormValues>;
}) => {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setValue("body", editor.getHTML());
      setValue("body_json", editor.getJSON());
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
