import type { Editor } from "@tiptap/core";
import type { Level } from "@tiptap/extension-heading";
import {
  GrBold,
  GrItalic,
  GrStrikeThrough,
  GrBlockQuote,
} from "react-icons/gr";
import { BiCodeBlock, BiCode, BiImage } from "react-icons/bi";

export enum Menu {
  Heading1 = "heading1",
  Heading2 = "heading2",
  Heading3 = "heading3",
  Bold = "bold",
  Italic = "italic",
  Strike = "strike",
  Blockquote = "blockquote",
  Code = "code",
  CodeBlock = "codeBlock",
  Image = "image",
}

const createHeadingOption = (editor: Editor, level: Level) => ({
  isActive: () => editor.isActive("heading", { level }),
  activate: () => editor.chain().focus().toggleHeading({ level }).run(),
  Toolbar: () => <>H{level}</>,
});

export const initMenuOptions = (editor: Editor) => ({
  [Menu.Heading1]: createHeadingOption(editor, 1),
  [Menu.Heading2]: createHeadingOption(editor, 2),
  [Menu.Heading3]: createHeadingOption(editor, 3),
  [Menu.Bold]: {
    isActive: () => editor.isActive(Menu.Bold),
    activate: () => editor.chain().focus().toggleBold().run(),
    Toolbar: GrBold,
  },
  [Menu.Italic]: {
    isActive: () => editor.isActive(Menu.Italic),
    activate: () => editor.chain().focus().toggleItalic().run(),
    Toolbar: GrItalic,
  },
  [Menu.Strike]: {
    isActive: () => editor.isActive(Menu.Strike),
    activate: () => editor.chain().focus().toggleStrike().run(),
    Toolbar: GrStrikeThrough,
  },
  [Menu.Blockquote]: {
    isActive: () => editor.isActive(Menu.Blockquote),
    activate: () => editor.chain().focus().toggleBlockquote().run(),
    Toolbar: GrBlockQuote,
  },
  [Menu.Code]: {
    isActive: () => editor.isActive(Menu.Code),
    activate: () => editor.chain().focus().toggleCode().run(),
    Toolbar: BiCode,
  },
  [Menu.CodeBlock]: {
    isActive: () => editor.isActive(Menu.CodeBlock),
    activate: () => editor.chain().focus().toggleCodeBlock().run(),
    Toolbar: BiCodeBlock,
  },
  [Menu.Image]: {
    isActive: () => editor.isActive(Menu.Image),
    activate: (src: string) => editor.chain().focus().setImage({ src }),
    Toolbar: BiImage,
  },
});

export const highlightCSS = {
  rel: "stylesheet",
  href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github-dark.min.css",
};
