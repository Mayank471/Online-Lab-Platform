import React, { useState } from "react";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import "./EditorPage.css";

const languageExtensions = {
  c: cpp(),
  cpp: cpp(),
  python3: python(),
  java: java(),
};

const EditorPage = () => {
  const [script, setCode] = useState('print("Hello")');
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");
  const versionIndex = 3;
  const compileOnly = true;

  const handleRun = async () => {
    console.log("Language sent:", language);

    try {
      const response = await fetch("http://localhost:5001/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          language,
          versionIndex,
          stdin: input,
        }),
      });

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
    <Split
      sizes={[35, 65]}
      minSize={200}
      direction="horizontal"
      className="split-pane"
    >
      <div className="left-panel">
        
        <div className="problem-description">
          <h2>Problem Title</h2>
          <p>
            Write a function that takes an array of integers and returns the sum of all elements.
            
            Example 1:
            Input: [1, 2, 3]
            Output: 6
            
            Example 2:
            Input: [-1, 0, 1]
            Output: 0
            
            Constraints:
            • Array length is between 1 and 10^5
            • Each element is between -10^9 and 10^9
          </p>
        </div>
        <div className="output-container">
          <h3>Output:</h3>
          <pre className="output-box">{output}</pre>
        </div>
      </div>
  
      <div className="right-panel">
        <div className="editor-container">
          <CodeMirror
            value={script}
            height="100%"
            width="100%"
            extensions={[languageExtensions[language]]}
            theme={oneDark}
            onChange={(value) => setCode(value)}
            style={{ flex: 1, overflowY: "auto" }}
          />
  
          <div className="bottom-bar">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="python3">Python</option>
              <option value="java">Java</option>
            </select>
            <button className="run-button" onClick={handleRun}>
              Run Code
            </button>
          </div>
        </div>
  
        <div className="testcases-container">
          <h3>Test Cases</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your test cases here..."
            style={{
              width: "100%",
              height: "calc(100% - 60px)",
              background: "#333333",
              color: "white",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "2px",
              resize: "none"
            }}
          />
        </div>
      </div>
    </Split>
  );
};

export default EditorPage;