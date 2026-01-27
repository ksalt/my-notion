import { useRef, useEffect } from "react";
import type { FormEventHandler, KeyboardEventHandler } from "react";
import type { NodeData, NodeType } from "../../utils/types";
import styles from "./Node.module.css";
import { nanoid } from "nanoid";
import { useAppState } from "../../state/AppStateContext";
import { CommandPanel } from "./CommandPanel";
import cx from "classnames";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) => {
  const { addNode, removeNodeByIndex, changeNodeValue, changeNodeType } =
    useAppState();

  const nodeRef = useRef<HTMLDivElement>(null);

  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent);
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (e.key === "Enter") {
      e.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (e.key === "Backspace") {
      if (target.textContent?.length === 0) {
        e.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window.getSelection()?.anchorOffset === 0) {
        e.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPanel selectItem={parseCommand} nodeText={node.value} />
      )}
      <div
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={nodeRef}
        contentEditable
        suppressContentEditableWarning
        className={cx(styles.node, styles[node.type])}
      />
    </>
  );
};
