import type { Editor } from "@tiptap/core";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { initMenuOptions, Menu } from "~/utils/editor";

type TProps = {
  editor: Editor;
};

const EditorMenu = ({ editor }: TProps) => {
  const options = initMenuOptions(editor);

  return (
    <ButtonGroup spacing={1} w="full" overflowX="auto">
      {Object.values(Menu).map((menu) => {
        const option = options[menu];

        return (
          <Button
            variant="unstyled"
            display="flex"
            alignItems="center"
            key={menu}
            onClick={() => option.activate("")}
            {...(option.isActive() && {
              color: "blue.500",
            })}
          >
            {<option.Toolbar />}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default EditorMenu;
