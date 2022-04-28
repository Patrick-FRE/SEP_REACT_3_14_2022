import React from 'react';

export const useBuyStock = (initStock) => {
  const [stockNum, setStockNum] = React.useState(initStock);
  const hanldeAdd = () => setStockNum(stockNum + 1);
  const hanldeSub = () => setStockNum(stockNum - 1);
  return [stockNum, hanldeAdd, hanldeSub];
};
