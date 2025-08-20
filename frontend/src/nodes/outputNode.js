import { useState } from "react";
import AbstractNode from "./abstractNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <AbstractNode
      id={id}
      title="Output"
      description="Display results"
      inputs={["value"]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          className="border p-1 text-sm w-full rounded"
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </AbstractNode>
  );
};