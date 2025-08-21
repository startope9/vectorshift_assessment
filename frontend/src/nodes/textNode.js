import { useMemo, useRef, useLayoutEffect, useState, useEffect } from "react";
import { useStore } from "../store";
import AbstractNode from "./abstractNode";

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [containerWidth, setContainerWidth] = useState(220);
  const [textareaWidth, setTextareawWidth] = useState(220);

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

  // Auto-resize width based on longest line
useEffect(() => {
  const text = data.text || "";
  const lines = text.split("\n");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    const style = window.getComputedStyle(textareaRef.current || document.body);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    context.font = font;
    const paddingX = 16; // p-2~0.5rem each side in Tailwind
    const scrollbarAllowance = 20;
    let maxLineWidth = 0;
    for (const line of lines) {
      const metrics = context.measureText (line || " ");
      maxLineWidth = Math.max(maxLineWidth, metrics.width);
    }

    const desiredwidth = Math.ceil(maxLineWidth) + paddingX * 2 + scrollbarAllowance;
    const min = 120;
    const max = 400;
    const clamped = Math.max(min, Math.min(desiredwidth, max));
    setTextareawWidth(clamped);
    // container a bit wider to fit padding and handles comfortably
    setContainerWidth (Math.max(220, clamped + 20));
  }
}, [data.text] );

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
      containerStyle={{ width: containerWidth }}
    >
      <textarea
        ref={textareaRef}
        value={data.text || ""}
        onChange={handleChange}
        className="border rounded-md p-2 text-sm"
        style={{
          width: textareaWidth,
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