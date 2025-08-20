import { useState } from "react";
import AbstractNode from "./abstractNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <AbstractNode
      id={id}
      title="Input"
      description="User-provided input"
      outputs={["value"]}
    >
      <label className="block text-xs text-gray-600">
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="border p-1 text-sm w-full rounded"
        />
      </label>
      <label className="block text-xs text-gray-600 mt-1">
        Type:
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          className="border p-1 text-sm w-full rounded"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </AbstractNode>
  );
};