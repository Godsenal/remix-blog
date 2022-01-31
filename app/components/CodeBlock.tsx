import { Box, Select } from "@chakra-ui/react";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";

const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
  editor,
}: NodeViewProps) => {
  const isEditable = editor.isEditable;

  return (
    <Box as={NodeViewWrapper} position="relative">
      {isEditable && (
        <Box position="absolute" top={2} right={2}>
          <Select
            size="xs"
            color="white"
            userSelect="none"
            display="inline-block"
            contentEditable={false}
            defaultValue={defaultLanguage}
            onChange={(event) =>
              updateAttributes({ language: event.target.value })
            }
            sx={{
              option: {
                color: "black",
              },
            }}
          >
            <option value="null">auto</option>
            <option disabled>—</option>
            {extension.options.lowlight
              .listLanguages()
              .map((lang: string, index: number) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
          </Select>
        </Box>
      )}
      <Box as="pre">
        <NodeViewContent as="code" />
      </Box>
    </Box>
  );
};

export default CodeBlock;
