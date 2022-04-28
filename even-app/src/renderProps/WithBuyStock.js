import React from 'react';

class WithBuyStock extends React.Component {
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
    return this.props.children(
      this.state.stockNum,
      this.handleAdd,
      this.handleSub
    );
  }
}

export default WithBuyStock;
