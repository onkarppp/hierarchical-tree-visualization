import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Custom CSS to include styles

function App() {
  const [data, setData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Fetch hierarchical data on component mount
  useEffect(() => {
    axios.get("/data.json")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the hierarchical data:", error);
      });
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleDeselectNode = () => {
    setSelectedNode(null);
  };

  const renderTree = (node, level = 0) => {
    const children = data.filter((n) => n.parent === node.name);
    
    return (
      <div className="node-container" key={node.name}>
        <div className="node" onClick={() => handleNodeClick(node)}>
          {node.name}
        </div>
        {children.length > 0 && (
          <div className="children">
            {children.map((child) => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app">
      <div className="tree">
        {data.filter((node) => !node.parent).map((rootNode) => renderTree(rootNode))}
      </div>
      {selectedNode && (
        <div className="sidebar">
          <div className="close-btn" onClick={handleDeselectNode}>X</div>
          <h2>{selectedNode.name}</h2>
          <p>{selectedNode.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
