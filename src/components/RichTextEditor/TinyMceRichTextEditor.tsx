import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

interface TinyMceRichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

export interface TinyMceRichTextEditorRef {
  getEditor: () => TinyMCEEditor | undefined;
}

export const TinyMceRichTextEditor = forwardRef<
  TinyMceRichTextEditorRef,
  TinyMceRichTextEditorProps
>(({ value, onChange, readOnly }, ref) => {
  const editorRef = useRef<Editor | null>(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => editorRef.current?.editor as TinyMCEEditor | undefined,
  }));

  const handleEditorChange = (content: string, _editor: TinyMCEEditor) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="w8uy4o7h9z7wetqtop15b04dzsgsc8tcikmdzlvg6543f631" // Replace with your TinyMCE API key
      value={value}
      onEditorChange={handleEditorChange}
      init={{
        branding: false, // Removes the "Built with TinyMCE" branding
        readOnly: readOnly, // Set read-only mode
        plugins: [
          "image",
          "link",
          "lists",
          "table",
          "wordcount",
          "emoticons",
          "anchor",
          "code",
          "media",
          "fullscreen",
          
        ],
        toolbar:
          "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | outdent indent | link image media table | code fullscreen",
        automatic_uploads: false, // Enable auto uploads for images if needed
        // images_upload_handler: () => {}, // No upload logic
        // @ts-ignore
        file_picker_callback: (callback: (url: string | ArrayBuffer | null, meta?: { alt: string }) => void) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement | null;
            const file = target?.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => callback(reader.result, { alt: file.name });
            reader.readAsDataURL(file);
          };
          input.click();
        },
        height: 800, // Set height of the editor (adjust as needed)
      }}
      ref={editorRef}
    />
  );
});

TinyMceRichTextEditor.displayName = "TinyMceRichTextEditor";

export default TinyMceRichTextEditor;
