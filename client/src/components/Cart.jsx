import React from 'react';
import Product from './Product';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cartProducts = this.props.products.map((product, idx) => {
      return (
        <tbody key={idx}>
          <Product key={product.id} toggleCart={this.props.toggleCart}
                   product={product} formatPrice={this.props.formatPrice}
                   parentComponent={"Cart"}/>
        </tbody>
      );
    });

    return (
      <table className={ (this.props.cartVisible ? "cart-table" : "cart-hidden") + " product-grid-table"}>
        <tfoot className="cart-table-footer">
          <tr>
            <td colSpan="2">Total price: </td>
            <td colSpan="4">{this.props.formatPrice(this.props.totalPrice)}</td>
          </tr>
        </tfoot>
        {cartProducts}
      </table>
    );
  }
}
export default Cart;
