
import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

class ProductSearch extends React.Component {
  state = {
    products: [],
    showRemoveIcon: false,
    searchValue: '',
  };

  componentDidMount() {
    console.log('here')
    fetch(`api/products?`, {
      headers: {
        'Content-Type': 'application/x-json-stream',
        'Accept': 'application/x-json-stream'
      }
    }).then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => {
      console.log(response);
      this.setState({
        products: response
      });
    });
  };

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        products: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

        // Client.search(value, (products) => {
        //   console.log(products);
        //   this.setState({
        //     products: products,
        //   });
        // });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      products: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };

  render() {
    const { showRemoveIcon, products } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

    const productRows = products.map((product, idx) => (
      <tr key={idx}>
        <td>{product}</td>
      </tr>
    ));

    return (
      <div id='product-search'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th colSpan='5'>
                <div className='ui fluid search'>
                  <div className='ui icon input'>
                    <input
                      className='prompt'
                      type='text'
                      placeholder='Search products...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className='search icon' />
                  </div>
                  <i
                    className='remove icon'
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className='eight wide'>Description</th>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductSearch;
