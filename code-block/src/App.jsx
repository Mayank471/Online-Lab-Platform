import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import "./App.css"; // Custom styles

const App = () => {
  const [script, setCode] = useState(
    'print("Hello")'
  );
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");
  const versionIndex =3;
  const compileOnly = true;

  const handleRun = async () => {
    console.log("Language sent:", language); // Debugging line
  
    try {
      const response = await fetch("http://localhost:5001/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, language, versionIndex }), 
      });
      // console.log(response);
  
      if (!response.ok) {
        console.log(response);
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.json();

      setOutput(data.output || "No output received");
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput(error.message);
    }
  };
  

  return (
    <div className="container">
      {/* Code Editor */}
      <div className="editor-container">
        <CodeMirror
          value={script}
          height="400px"
          extensions={[cpp()]} // Syntax highlighting for C
          theme={oneDark}
          onChange={(value) => setCode(value)}
        />

        <div className="bottom-bar">
          <button className="run-button" onClick={handleRun}>
            Run
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python3">python3</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>

      {/* Output Panel */}
      <div className="output-container">
        <h3>Results:</h3>
        <pre className="output-box">{output}</pre>
      </div>
    </div>
  );
};

export default App;
