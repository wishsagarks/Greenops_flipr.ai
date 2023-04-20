import React, { useState, useEffect } from 'react';

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('/api/stocks')
      .then((response) => response.json())
      .then((data) => {
        setStocks(data);
      });
  }, []);

  return (
    <div>
      <h2>Stock List</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.stock_name}>{stock.stock_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;
