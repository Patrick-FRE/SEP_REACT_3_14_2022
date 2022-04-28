import React from 'react';
import { useBuyStock } from '../hooks/useBuyStock';

export const BuyStockContext = React.createContext(null);

// export const useBuyStock = (initStock) => {
//   const [stockNum, setStockNum] = React.useState(initStock);
//   const hanldeAdd = () => setStockNum(stockNum + 1);
//   const hanldeSub = () => setStockNum(stockNum - 1);
//   return [stockNum, hanldeAdd, hanldeSub];
// };

export const BuyStockPrvider = (props) => {
  const [stockNum, hanldeAdd, hanldeSub] = useBuyStock(0);
  console.log('BuyStockPrvider update');
  return (
    <BuyStockContext.Provider value={[stockNum, hanldeAdd, hanldeSub]}>
      {props.children}
    </BuyStockContext.Provider>
  );
};
