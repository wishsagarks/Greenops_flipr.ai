import React, { useState, useEffect } from 'react';
import StockList from './components/StockList';
import StockDetail from './components/StockDetail';

function App() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    fetch('/api/stocks')
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="App">
      <h1>Stock Market App</h1>
      <StockList stocks={stocks} onStockClick={handleStockClick} />
      {selectedStock && <StockDetail stock={selectedStock} />}
    </div>
  );
}

export default App;
