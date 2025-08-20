import AbstractNode from "./abstractNode";

export const LLMNode = ({ id }) => {
  return (
    <AbstractNode
      id={id}
      title="LLM"
      description="Large Language Model"
      inputs={["system", "prompt"]}
      outputs={["response"]}
    />
  );
};