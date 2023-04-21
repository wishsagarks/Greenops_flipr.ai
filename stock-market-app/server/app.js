const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const stocksRouter = require('./api/stocks');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Register the stock routes
app.use('/api/stocks', stocksRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
