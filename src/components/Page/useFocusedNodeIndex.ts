import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { NodeData } from "../../utils/types";

type UseFocusedNodeIndexProps = {
  nodes: NodeData[];
};

export const useFocusedNodeIndex = ({
  nodes,
}: UseFocusedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedNodeIndex((prev) => Math.max(0, prev - 1));
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedNodeIndex((prev) => Math.min(nodes.length - 1, prev + 1));
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
