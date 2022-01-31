import { useEffect, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Editor as EditorType } from "@tiptap/core";
import { Box } from "@chakra-ui/react";
import CodeBlock from "~/components/CodeBlock";
import EditorMenu from "~/components/EditorMenu";

type TProps = {
  isViewer?: boolean;
  content?: string;
  setEditor?: (edtior: EditorType) => void;
};

const Editor = ({ isViewer, content, setEditor }: TProps) => {
  const [lowlight, setLowlight] = useState<any>();
  console.log(lowlight);
  const editor = useEditor(
    {
      editable: !isViewer,
      content,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "글을 작성해보세요.",
        }),
        Image,
        lowlight &&
          CodeBlockLowlight.extend({
            addNodeView() {
              return ReactNodeViewRenderer(CodeBlock);
            },
          }).configure({ lowlight }),
      ].filter(Boolean),
    },
    [lowlight]
  );

  useEffect(() => {
    import("lowlight").then((module) => {
      setLowlight((module as any).lowlight);
    });
  }, []);

  useEffect(() => {
    editor && setEditor?.(editor);
  }, [editor]);

  return (
    <Box
      minH="300px"
      sx={{
        ".ProseMirror": {
          minH: "300px",
          py: 2,
          outline: "none",
        },
        "p.is-editor-empty:first-child::before": {
          color: "#adb5bd",
          content: "attr(data-placeholder)",
          float: "left",
          height: 0,
          pointerEvents: "none",
        },
        "* + *": {
          marginTop: 0.75,
        },
        "ul, ol": {
          padding: "0 1rem",
        },
        h1: {
          fontSize: "3xl",
        },
        h2: {
          fontSize: "2xl",
        },
        h3: {
          fontSize: "xl",
        },
        code: {
          backgroundColor: "gray.300",
          color: "black",
          padding: "0.2em 0.4em",
          borderRadius: "md",
        },
        pre: {
          background: "#0d0d0d",
          color: "#fff",
          fontFamily: '"JetBrainsMono", monospace',
          padding: "0.75rem 1rem",
          borderRadius: "0.5rem",
        },
        "pre code": {
          color: "inherit",
          padding: "0",
          background: "none",
          fontSize: "0.8rem",
        },
        img: {
          maxWidth: "100%",
          height: "auto",
        },
        blockquote: {
          paddingLeft: "1rem",
          color: "white",
          borderLeft: "5px solid",
          borderColor: "gray.300",
          bg: "#2d303d",
          fontStyle: "italic",
          padding: "1em",
        },
        hr: {
          border: "none",
          borderTop: "2px solid rgba(#0d0d0d, 0.1)",
          margin: "2rem 0",
        },
      }}
    >
      {editor && !isViewer && <EditorMenu editor={editor} />}
      <EditorContent editor={editor} />
    </Box>
  );
};

export default Editor;
