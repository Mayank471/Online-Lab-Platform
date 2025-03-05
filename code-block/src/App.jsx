import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import "./App.css"; // Custom styles

const App = () => {
  const [code, setCode] = useState(
    `#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char s[100];\n  scanf("%[^\n]%*c", s);\n  printf("Hello, World!\\n");\n  printf("%s", s);\n  return 0;\n}`
  );
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("C");

  const handleRun = async () => {
    try {
      const response = await fetch("http://localhost:5001/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }), // Send selected language
      });

      if (!response.ok) {
        throw new Error(`Server error: ${respoclearnse.statusText}`);
      }

      const data = await response.json();
      setOutput(data.output || "No output received");
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing the code. Please check your server.");
    }
  };

  return (
    <div className="container">
      {/* Code Editor */}
      <div className="editor-container">
        <CodeMirror
          value={code}
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
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
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
