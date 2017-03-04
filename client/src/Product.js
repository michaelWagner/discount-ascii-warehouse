import React from 'react';
import ProductGrid from './ProductGrid';
import ProductAttribute from './ProductAttribute';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<tr>
      {this.props.product.map((productAttribute, idx) => (
        <ProductAttribute productAttribute={productAttribute} />
      ))}
    </tr>);
  }
}
export default Product;
