import React from 'react';
import ProductGrid from './ProductGrid';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<tr>
      {this.props.products.map((product, idx) => (
        this.renderProduct(product)
      ))}
    </tr>);
  }

  renderProduct(product) {
    return (
      <td> {product} </td>
    )
  }
}
export default Product;
