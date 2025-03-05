import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { exec } from "child_process";
import fs from "fs";

const app = express();
const PORT = 5001;

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Enable JSON parsing

// Route to handle code execution
app.post("/run", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  const filename = language === "C++" ? "temp.cpp" : "temp.c";
  const outputFile = "temp.out";

  try {
    fs.writeFileSync(filename, code);

    let compileCmd, runCmd;

    if (language === "C++") {
      compileCmd = `g++ ${filename} -o ${outputFile}`;
      runCmd = `./${outputFile}`;
    } else if (language === "C") {
      compileCmd = `gcc ${filename} -o ${outputFile}`;
      runCmd = `./${outputFile}`;
    } else {
      return res.status(400).json({ error: "Unsupported language" });
    }

    // Compile the code
    exec(compileCmd, (compileErr, _, compileStderr) => {
      if (compileErr) {
        return res.json({ error: "Compilation Error", details: compileStderr });
      }

      // Run the compiled program
      exec(runCmd, (runErr, runStdout, runStderr) => {
        if (runErr) {
          return res.json({ error: "Runtime Error", details: runStderr });
        }

        res.json({ output: runStdout });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
