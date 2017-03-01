import React from 'react';
import Client from './Client';

export default function SelectedProducts(props) {
  const { products } = props;
  // Client.search('', (products) => {
  //   this.setState({
  //     products: products,
  //   });
  // });
  const productRows = products.map((product, idx) => (
    <tr
      key={idx}
      onClick={() => props.onProductClick(idx)}
    >
      <td>{product}</td>
    </tr>
  ));

  return (
    <table className='ui selectable structured large table'>
      <thead>
        <tr>
          <th colSpan='5'>
            <h3>Selected products</h3>
          </th>
        </tr>
        <tr>
          <th className='eight wide'>Description</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
      <tfoot>
        <tr>
        </tr>
      </tfoot>
    </table>
  );
}

function sum(products, prop) {
  return products.reduce((memo, product) => (
    parseInt(product[prop], 10) + memo
  ), 0.0).toFixed(2);
}
