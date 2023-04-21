const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.get("/", (req, res) => {
  res.send("Stocks API");
});

router.post("/predict", (req, res) => {
  const pythonProcess = spawn("python", ["../../scripts/knn_mom.py"]);

  pythonProcess.stdout.on("data", (data) => {
    try {
      const predictionData = JSON.parse(data.toString());
      res.json(predictionData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
});

module.exports = router;
