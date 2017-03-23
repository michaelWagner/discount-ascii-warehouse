import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
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
      isProductGridVisible: false,
      allProductsLoaded: false,
      nextProducts: [],
      componentName: 'ProductGrid',
      sortBy: null,
      descending: false,
      numProductsVisible: 25
    };
  }

  componentDidMount() {
    this.loadProducts(this.state.numProductsVisible);
  }

  addProductToCart(product, cart) {
    const newCart = this.state.cart.concat(product);
    this.setState({cart: newCart}, () => console.log(this.state.cart));
  }

  hasMoreProducts() {
    return (this.state.allProductsLoaded) ? false : true;
  }
  removeProductFromCart(itemId) {
    const newCart = this.state.cart.filter(
      (item, idx) => item.id !== this.state.cart[idx].id,
    );
    this.setState({ cart: newCart });
  }

  viewProduct(product) {
  }

  loadProducts(numProducts=25) {
    const query = 'limit=' + (this.state.numProductsVisible + numProducts);
    if (this.state.nextProducts.length > 0) {
      this.state.products = this.state.nextProducts;
    }

    Client.loadProducts(query, (products) => {
      for (var i = 0; i < products.length; i++) {
        if (products[i] === null || products[i] === undefined || products[i] === '') {
          // Remove trailing newlines or empty nodes.
          delete products[i];
        } else {
          products[i] = JSON.parse(products[i]);
        }
      }
      const numProductsVisible = this.state.numProductsVisible + numProducts;

      console.log(numProductsVisible);

      if (this.state.numProductsVisible === products.length) {
        console.log('you made it to the end')
        this.setState({allProductsLoaded: true});
        return false;
      } else {
        this.setState({
          nextProducts: products,
          isProductGridVisible: true,
          numProductsVisible: numProductsVisible
        });
        this.props.hasProductGridLoaded();
      }
    });
  }

  shouldComponentUpdate( newProps, newState ) {
    // console.log('newProps: ' +  JSON.stringify(newProps))
    // console.log('newState: ' +  JSON.stringify(newState))
    if (this.state.allProductsLoaded) {
      return false
    } else {
      return true;
    }
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
    const {
      products,
      cart,
      isProductGridVisible,
      componentName,
      sortBy,
      descending
     } = this.state;

    const productRows = products.map(function(product, idx) {
      // Show an Advertisement every 20 Products.
      if (idx % 20 === 0 && idx !== 0) {
        // If there is an Advertisement, render both Advertisement and Product.
        return (
                <tbody>
                  <Advertisement key={idx} adList={this.props.adList}
                                 generateRandomAd={this.props.generateRandomAd}
                                 randomAd={this.props.randomAd}
                                 componentName={componentName} />
                  <Product key={product.id}
                                      product={product}
                                      cart={cart}
                                      addProductToCart={this.addProductToCart.bind(this)} />
                </tbody>)
      } else {
        // If there is no Advertisement, just render Product.
        return (<tbody>
                  <Product key={product.id}
                            product={product}
                            cart={cart}
                            addProductToCart={this.addProductToCart.bind(this)} />
                </tbody>)
      }
    }.bind(this));

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
        <div id='product-grid-wrapper'>
          <InfiniteScroll className={'product-grid'}
            pageStart={0}
            loadMore={this.loadProducts.bind(this)}
            hasMore={!this.state.allProductsLoaded}>
            <table className='ui selectable structured large table'>
              <thead>
                <tr className="product-attribute-header">
                  {productHeaders}
                </tr>
              </thead>
              {productRows}
            </table>
          </InfiniteScroll>
        </div>
      );
    } else {
      grid = <div id='product-grid'></div>;
    }

    return grid;
  }
}

export default ProductGrid;
