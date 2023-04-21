import React from 'react';

const StockDetail = ({ stock }) => {
  return (
    <div>
      <h2>{stock.stock_name}</h2>
      <p>Next Close: {stock.next_close}</p>
      <p>Next Percentage Change: {stock.next_pct_change}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default StockDetail;
