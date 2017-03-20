import React from 'react';
import App from './App';
import Client from './Client';
import Product from './Product';
import Advertisement from './Advertisement';

class ProductGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      adList: [],
      isProductGridVisible: false,
      componentName: 'ProductGrid',
      sortBy: null,
      descending: false
    };
  }

  componentDidMount() {
    this.loadProducts('limit=100');
  }

  addProductToCart(product, cart) {
    const newCart = this.state.cart.concat(product);
    this.setState({cart: newCart}, () => console.log(this.state.cart));
  }

  removeProductFromCart(itemId) {
    const newCart = this.state.cart.filter(
      (item, idx) => item.id !== this.state.cart[idx].id,
    );
    this.setState({ cart: newCart });
  }

  viewProduct(product) {
  }

  loadProducts(query) {
    Client.loadProducts(query, (products) => {
      for (var i = 0; i < products.length; i++) {
        if (products[i] === null || products[i] === undefined || products[i] === '') {
          // Remove trailing newlines or empty nodes.
          delete products[i];
        } else {
          products[i] = JSON.parse(products[i]);
        }
      }
      this.setState({products: products});
      this.setState({isProductGridVisible: true});
      this.props.hasProductGridLoaded();
    });
  }

  _sort(event) {
    // Make column lowercase and then
    // remove the sort arrows before checking column name.
    var column = event.target.innerHTML.toLowerCase().split(" ")[0];
    var products = this.state.products.slice();
    var descending = this.state.sortBy === column && !this.state.descending;

    products.sort((a, b) => {

      switch(column) {
        case 'id':
          // Sorts by index which prefixes the id string.
          // Separate index from id, then convert index to int before sorting.
          let idA = parseInt(a[column].split('-')[0], 10);
          let idB = parseInt(b[column].split('-')[0], 10);
          return descending
          ? idB - idA
          : idA - idB;
        case 'price':
          return descending
            ? b[column] - a[column]
            : a[column] - b[column];
        case 'face':
          return descending
            ? b['size'] - a['size']
            : a['size'] - b['size'];
        case 'size':
          return descending
            ? b[column] - a[column]
            : a[column] - b[column];
        case 'date':
          return descending
            ? new Date(b[column]) - new Date(a[column])
            : new Date(a[column]) - new Date(b[column]);
        default:
          throw new Error('Column is not valid');
      }
    });

    this.setState({
      products: products,
      sortBy: column,
      descending: descending
    });
  }

  render() {
    const { products, cart, adList, isProductGridVisible, componentName, sortBy, descending } = this.state;

    const productRows = products.map((product, idx) => (
      ((idx % 20 === 0 && idx !== 0)
        ? <Advertisement key={idx} componentName={componentName} />
        : <Product key={product.id}
                   product={product}
                   cart={cart}
                   addProductToCart={this.addProductToCart.bind(this)} />
      )
    ));

    const headers = ["ID", "Price", "Size", "Face", "Date"];

    const productHeaders = headers.map((title, idx) => (
      ((sortBy === title.toLowerCase())
        ? <th key={idx} onClick={this._sort.bind(this)}>{title += descending ? ' \u2191' : ' \u2193'}</th>
        : <th key={idx} onClick={this._sort.bind(this)}>{title}</th>
      )
    ));

    let grid = null;

    if (isProductGridVisible) {
      grid = (
        <div id='product-grid'>
          <table className='ui selectable structured large table'>
            <thead>
              <tr className="product-attribute-header">
                {productHeaders}
              </tr>
            </thead>
            <tbody>{productRows}</tbody>
          </table>
        </div>
      );
    } else {
      grid = <div id='product-grid'></div>;
    }

    return grid;
  }
}

export default ProductGrid;
