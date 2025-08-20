import AbstractNode from "./abstractNode";
export const KnowledgeBaseNode = ({ id }) => {
  return (
    <AbstractNode
      id={id}
      title="Knowledge Base"
      description="Retrieve docs by semantic search"
      inputs={["question"]}
      outputs={["docs"]}
    >
      <div className="text-xs text-gray-500 italic">
        Expects query from InputNode/TextNode
      </div>
    </AbstractNode>
  );
};
