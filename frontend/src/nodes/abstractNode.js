import React from "react";
import { Handle, Position } from "reactflow";

export default function AbstractNode({
  id,
  title,
  description,
  inputs = [],
  outputs = [],
  containerStyle = {},
  children,
}) {
  return (
    <div className="rounded-2xl shadow-md bg-white border border-gray-300 w-[220px] p-2" style={containerStyle}>
      <div className="font-semibold text-gray-800">{title}</div>
      {description && <div className="text-xs text-gray-500">{description}</div>}

      <div className="mt-2">{children}</div>

      {inputs.map((input, i) => (
        <Handle
          key={i}
          type="target"
          position={Position.Left}
          id={`${id}-${input}`}
          style={{ top: 30 + i * 25 }}
        />
      ))}

      {outputs.map((output, i) => (
        <Handle
          key={i}
          type="source"
          position={Position.Right}
          id={`${id}-${output}`}
          style={{ top: 30 + i * 25 }}
        />
      ))}
    </div>
  );
}
