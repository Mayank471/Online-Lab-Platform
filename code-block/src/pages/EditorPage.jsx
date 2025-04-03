import React, { useState, useEffect } from "react";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import { useClassroomStore } from "../store/useClassroomStore.js";
import { useParams } from "react-router-dom";

const languageExtensions = {
  c: cpp(),
  cpp: cpp(),
  python3: python(),
  java: java(),
};

let testCasesList = [];

const EditorPage = () => {
  const [script, setCode] = useState('print("Hello")');
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");
  const [selectedTestCase, setSelectedTestCase] = useState("");
  const [assignment, setAssignment] = useState(null); // State to store the fetched assignment
  const [showInput, setShowInput] = useState(true); // State to toggle between input and output

  // Get the assignment ID from the URL params
  const { assignmentId } = useParams();
  //console.log("Fetching assignment with ID:", assignmentId);
  // Load the assignment using the store
  const { getAssignment } = useClassroomStore();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        
        const fetchedAssignment = await getAssignment(assignmentId); // Call the store function
        setAssignment(fetchedAssignment); // Store the assignment in state
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };

    if (assignmentId) {
      fetchAssignment();
    }
  }, [assignmentId, getAssignment]);

  // Fetch test cases from the assignment description
  testCasesList = assignment?.testCases || [];
  console.log("Test cases list:", testCasesList);
  
  const handleRun = async () => {
    console.log("Language sent:", language);
    try {
      const response = await fetch("http://localhost:5000/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          language,
          versionIndex: 3,
          stdin: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setOutput(data.output || "No output received");
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput(error.message);
    }
  };

  const submit = () => {
    // Define the submit function logic here
    console.log("Submit button clicked");
  };

  return (
    <div className="h-screen pt-16 w-screen bg-gray-900 text-white flex ">
      {/* Left Panel */}
      <div className="w-1/3 flex flex-col py-2 px-4 my-0 space-y-4">
        {/* Problem Description */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md h-1/2 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">
            {assignment ? assignment.assignmentName : "Loading..."}
          </h2>
          <p className="text-sm">
            {assignment ? assignment.description : "Fetching assignment details..."}
          </p>
          {/* <pre className="text-xs mt-2 bg-gray-700 p-2 rounded">
            Example 1:  
            Input: [1, 2, 3]  
            Output: 6  

            Example 2:  
            Input: [-1, 0, 1]  
            Output: 0  
          </pre> */}
        </div>

        {/* Test Cases Selector */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md h-1/2">
          <h3 className="text-md font-semibold mb-2">Test Cases</h3>
          <select
            className="w-full p-2 bg-gray-700 text-white rounded"
            onChange={(e) => {
              const testCase = testCasesList.find(tc => tc._id === e.target.value);
              setSelectedTestCase(testCase?.input || "");
              setInput(testCase?.input || "");
            }}
          >
            <option value="">Select a test case</option>
            {testCasesList.map((test) => (
              <option key={test._id} value={test._id}>
                Test {test.input}
              </option>
            ))}
          </select>

          <textarea
            value={selectedTestCase}
            readOnly
            className="w-full h-20 bg-gray-700 text-white mt-2 p-2 rounded resize-none"
          />
        </div>
      </div>

      {/* Right Panel (Split Editor + Output) */}
      <Split
        className="flex-1 flex flex-col pt-4 "
        sizes={[65, 35]}
        minSize={200}
        direction="vertical"
      >
        {/* Code Editor */}
        <div className="bg-gray-800 p-2 flex flex-col h-full">
          <CodeMirror
            value={script}
            height="100%"
            width="100%"
            extensions={[languageExtensions[language]]}
            theme={oneDark}
            onChange={(value) => setCode(value)}
            className="flex-1"
          />

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between p-2 bg-gray-700 rounded-lg mt-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-0.5 bg-gray-600 text-white rounded"
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="python3">Python</option>
              <option value="java">Java</option>
            </select>

            <div className="flex items-center gap-2">
              {/* Submit Button */}
              <button
                className="bg-green-500 px-4 py-0.5 rounded text-white hover:bg-green-600"
                onClick={() => submit()} // Call the submit function (to be defined later)
              >
                Submit
              </button>

              {/* Run Code Button */}
              <button
                className="bg-blue-500 px-4 py-0.5 rounded text-white hover:bg-blue-600"
                onClick={handleRun}
              >
                Run Code
              </button>
            </div>
          </div>
        </div>
 
         {/* Input/Output Toggle Section */}
         <div className="bg-gray-800 p-4 rounded-lg h-full">
          <div className="flex justify-between mb-2">
            {/* Toggle Buttons */}
            <button
              className={`px-4 py-1 rounded ${
                showInput ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setShowInput(true)}
            >
              Input
            </button>
            <button
              className={`px-4 py-1 rounded ${
                !showInput ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setShowInput(false)}
            >
              Output
            </button>
          </div>

          {/* Input Field */}
          {showInput && (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full bg-gray-700 text-white p-2 rounded resize-none"
              placeholder="Enter input here..."
            />
          )}

          {/* Output Field */}
          {!showInput && (
            <pre className="bg-gray-700 p-2 rounded h-full overflow-auto">{output}</pre>
          )}
        </div>
      </Split>
    </div>
  );
};

export default EditorPage;
