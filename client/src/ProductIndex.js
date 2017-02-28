
import React from 'react';
import Client from './Client';

class ProductIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentWillMount() {
    // Remove the 'www.' to cause a CORS error (and see the error state)
    axios.get(`/api/products`), {
      headers : {
        'Content-Type': 'application/x-json-stream',
        'Accept': 'application/x-json-stream'
      }
    }
    .then(res => {
      // Transform the raw data by extracting the nested products
      console.log('res: ', res);
      const products = res.data.data.children.map(obj => obj.data);

      // Update state to trigger a re-render.
      // Clear any errors, and turn off the loading indiciator.
      this.setState({
        products: products
      });
    })
    .catch(err => {
      // Something went wrong. Save the error in state and re-render.
      this.setState({
      });
    });
  }

  render() {
    const { products } = this.state;
    console.log(products);

    const productRows = products.map((product, idx) => (
      <tr key={idx}>
        {idx}
        <td>{product}</td>
      </tr>
    ));

    return (
      <div id='product-index'>
        <table className='ui selectable structured large table'>
          <thead>
          </thead>
          <tbody>
            {productRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductIndex;
