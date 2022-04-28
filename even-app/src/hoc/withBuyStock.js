import React from 'react';

export const withBuyStockData = (WrappedComponent) => {
  return class NewComponent extends React.Component {
    state = {
      stockNum: 0,
    };

    handleAdd = () => {
      this.setState({ stockNum: this.state.stockNum + 1 });
    };
    handleSub = () => {
      this.setState({
        stockNum: this.state.stockNum - 1 < 0 ? 0 : this.state.stockNum - 1,
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          stockNum={this.state.stockNum}
          handleAdd={this.handleAdd}
          handleSub={this.handleSub}
        ></WrappedComponent>
      );
    }
  };
};
