import { useMemo, useRef, useLayoutEffect } from "react";
import { useStore } from "../store";
import AbstractNode from "./abstractNode";

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variable names inside {{ }}
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\}\}/g;
    const matches = [...(data.text || "").matchAll(regex)];
    return [...new Set(matches.map((m) => m[1]))];
  }, [data.text]);

  // Auto-resize height up to maxHeight
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      const maxHeight = 200;
      el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
    }
  }, [data.text]);

  const handleChange = (e) => {
    updateNodeField(id, "text", e.target.value);
  };

  return (
    <AbstractNode
      id={id}
      title="Text"
      description="Write text with {{variables}}"
      inputs={variables}
      outputs={["text"]}
    >
      <textarea
        ref={textareaRef}
        value={data.text || ""}
        onChange={handleChange}
        className="border rounded-md p-2 text-sm"
        style={{
          width: 220,
          minWidth: 120,
          maxWidth: 400,
          minHeight: 60,
          maxHeight: 200,
          overflowY: "auto",
          resize: "horizontal",
          margin: "0 auto",
          display: "block",
        }}
        placeholder="Type something like: Hello {{name}}"
      />
    </AbstractNode>
  );
}