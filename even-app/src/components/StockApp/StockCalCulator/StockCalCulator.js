import React from 'react';
import { withBuyStockData } from '../../../hoc/withBuyStock';
import WithBuyStock from '../../../renderProps/WithBuyStock';
import { useBuyStock } from '../../../hooks/useBuyStock';
import { BuyStockContext } from '../../../context/BuyStock.context';
//MVC vs  MVVM
//Data binding:
//from model to view : attrbute Or children JSX binding
//from view to model : event binding
//Controlled Component | UnControlled Component
// HOC : Pro Con
// Render props : pro con
// Hooks : pro con

const StockCalCulatorFn = () => {
  const [currentStock, setCurrentStock] = React.useState(0);
  const hanldeCurrentStock = (e) => setCurrentStock(+e.target.value);
  const [stockNum, hanldeAdd, hanldeSub] = React.useContext(BuyStockContext);

  return (
    <section>
      <header>StockCalCulator!!!</header>
      <h1
        onClick={(e) => {
          e.target.innerHTML = 'Changed';
          e.target.style.color = 'red';
        }}
      >
        How Many Stock do you have?
      </h1>
      <input type="number" onChange={hanldeCurrentStock} value={currentStock} />
      <h1>
        How Many Stock you want to buy!!!!!
        <button onClick={hanldeAdd}>+</button>
        <span>{stockNum}</span>
        <button onClick={hanldeSub}> -</button>
      </h1>
      <p>You have {currentStock + stockNum} stock </p>
    </section>
  );
};

class StockCalCulator extends React.Component {
  state = {
    currentStock: 11,
  };

  render() {
    return (
      <section>
        <header>StockCalCulator!!!</header>
        <h1
          onClick={(e) => {
            e.target.innerHTML = 'Changed';
            e.target.style.color = 'red';
          }}
        >
          How Many Stock do you have?
        </h1>
        <input
          type="number"
          onChange={(e) => this.setState({ currentStock: +e.target.value })}
          value={this.state.currentStock}
        />

        <h1>
          How Many Stock you want to buy
          <button onClick={this.props.handleAdd}>+</button>
          <span>{this.props.stockNum}</span>
          <button onClick={this.props.handleSub}> -</button>
        </h1>
        <p>You have {this.state.currentStock + this.props.stockNum} stock </p>
      </section>
    );
  }
}

//const StockCalCulatorContainer = withBuyStockData(StockCalCulator);

const StockCalCulatorContainer = () => (
  <WithBuyStock>
    {(stockNum, handleAdd, hanldeSub) => {
      return (
        <StockCalCulator
          stockNum={stockNum}
          handleAdd={handleAdd}
          handleSub={hanldeSub}
        ></StockCalCulator>
      );
    }}
  </WithBuyStock>
);

export default StockCalCulatorFn;
