const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const Stock = require('../models/stock');


router.get('/:stock_name', async (req, res) => {
  const stock_name = req.params.stock_name;
  try {
    const stock = await Stock.findOne({ stock_name });
    if (!stock) {
      const pythonProcess = spawn('python', ['./scripts/knn_mom.py', stock_name]);
      pythonProcess.stdout.on('data', async (data) => {
        const stockData = JSON.parse(data.toString());
        const newStock = new Stock(stockData);
        await newStock.save();
        res.send(stockData);
      });
    } else {
      res.send(stock);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
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
