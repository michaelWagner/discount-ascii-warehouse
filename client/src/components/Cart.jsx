import React from 'react';
import Product from './Product';

class Cart extends React.Component {

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
            <td colSpan="4">{this.props.formatPriceFromCentsToDollars(this.props.totalPrice)}</td>
          </tr>
        </tfoot>
        {cartProducts}
      </table>
    );
  }
}
export default Cart;
