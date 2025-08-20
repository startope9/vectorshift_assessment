import { useState } from "react";
import AbstractNode from "./abstractNode";

export const ReRankerNode = ({ id, data }) => {
  const [topK, setTopK] = useState(data?.topK || 3);

  return (
    <AbstractNode
      id={id}
      title="Re-Ranker"
      description="Re-rank candidate results"
      inputs={["candidates"]}
      outputs={["best"]}
    >
      <label className="block text-xs text-gray-600 mb-1">Top-K</label>
      <input
        type="number"
        min={1}
        max={10}
        className="w-full border rounded-md p-1 text-sm"
        value={topK}
        onChange={(e) => setTopK(Number(e.target.value))}
      />
    </AbstractNode>
  );
};
