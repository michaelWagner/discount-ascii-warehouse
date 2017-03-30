import React from 'react';
import Product from './Product';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      windowWidth: '0',
      colSpanWidth: 4
    };
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  // Dynamically resize the cart depending on window width.
  updateWindowWidth() {
    let colSpanWidth = 4;
    const windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
      colSpanWidth = 2;
    }

    this.setState({
      windowWidth: window.innerWidth,
      colSpanWidth: colSpanWidth
    });
  }

  render() {
    const cartProducts = this.props.products.map((product, idx) => {
      return (
        <tbody key={idx}>
          <Product key={product.id} toggleProductInCart={this.props.toggleProductInCart}
                   product={product} formatPriceFromCentsToDollars={this.props.formatPriceFromCentsToDollars}
                   parentComponent={"Cart"}/>
        </tbody>
      );
    });

    return (
      <table className={ (this.props.cartVisible ? "cart-table" : "cart-hidden") + " product-grid-table"}>
        <tfoot className="cart-table-footer">
          <tr className="table-footer">
            <td colSpan="2">Total price: </td>
            <td className="table-footer-price" colSpan={this.state.colSpanWidth}>{this.props.formatPriceFromCentsToDollars(this.props.totalPrice)}</td>
          </tr>
        </tfoot>
        {cartProducts}
      </table>
    );
  }
}
export default Cart;
