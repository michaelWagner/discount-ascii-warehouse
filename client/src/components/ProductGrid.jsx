import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import App from './App';
import Client from './Client';
import Product from './Product';
import Advertisement from './Advertisement';

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      nextProducts: [],
      isProductGridVisible: false,
      allProductsLoaded: false,
      sortBy: null,
      descending: false,
      page: 0,
      numProductsVisible: 0,
    };

    this.defaultProps = {
      numProductsPerPage: 25,
      componentName: 'ProductGrid'
    };
  }

  componentDidMount() {
    // Initially load first batch of products.
    const query = (
      'limit=' + this.defaultProps.numProductsPerPage +
      '&skip=' + this.state.page * this.defaultProps.numProductsPerPage
    );

    this.loadProducts(query, (products) => {
      const numProductsVisible = products.length;
      const initialProducts = products;
      const nextPage = this.state.page + 1;

      this.setState({
        products: initialProducts,
        numProductsVisible: numProductsVisible,
        isProductGridVisible: true,
        page: nextPage
      },
        () =>  {
          // Pre-fetch next batch of products and cache them.
          const nextQuery = (
            'limit=' + this.defaultProps.numProductsPerPage +
            '&skip=' + (this.state.page * this.defaultProps.numProductsPerPage)
          );
          this.loadProducts(nextQuery, (nextProducts) => {
            this.setState({nextProducts: nextProducts});
          });
        }
      );
    });
    // Show ProductGrid now that it has loaded.
    this.props.hasProductGridLoaded();
  }

  hasMoreProducts() {
    return (this.state.allProductsLoaded) ? false : true;
  }

  loadProducts(query, callback) {
    // Creates an array of products in JSON format.
    Client.loadProducts(query, (products) => {
      for (var i = 0; i < products.length; i++) {
        if (products[i] === null || products[i] === undefined || products[i] === '') {
          // Remove trailing newlines or empty nodes.
          products.splice(i, 1);
        } else {
          products[i] = JSON.parse(products[i]);
        }
      }
      callback(products);
    });
  }

  loadNextProducts() {
    // Render the page with the previously cached nextProducts and update state.
    const newProducts = this.state.products.concat(this.state.nextProducts);
    const numProductsVisible = newProducts.length;
    const nextPage = this.state.page + 1;
    const query = (
      'limit=' + this.defaultProps.numProductsPerPage +
      '&skip=' + numProductsVisible
    );

    // Update products with cached next page.
    this.setState({
      products: newProducts,
      numProductsVisible: numProductsVisible,
      page: nextPage
    },
      this.loadProducts(query, (nextProducts) => {
        if (nextProducts.length < this.defaultProps.numProductsPerPage) {
          // TODO - Add footer component.
          this.setState({
            allProductsLoaded: true,
            nextProducts: nextProducts
          });
        } else {
          // Pre-fetch next products and cache.
          this.setState({nextProducts: nextProducts});
        }
      })
    )
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
      isProductGridVisible,
      sortBy,
      descending,
      allProductsLoaded
     } = this.state;

    const productRows = products.map(function(product, idx) {
      // Show an Advertisement every 20 Products.
      if (idx % 20 === 0 && idx !== 0) {
        // If there is an Advertisement, render both Advertisement and Product.
        return (
                <tbody key={idx}>
                  <Advertisement key={idx}
                                 generateRandomId={this.props.generateRandomId}
                                 componentName={this.defaultProps.componentName} />
                  <Product key={product.id}
                                      product={product}
                                      toggleCart={this.props.addProductToCart} />
                </tbody>)
      } else {
        // If there is no Advertisement, just render Product.
        return (<tbody key={idx}>
                  <Product key={product.id}
                            product={product}
                            toggleCart={this.props.addProductToCart} />
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
            loadMore={this.loadNextProducts.bind(this)}
            hasMore={!allProductsLoaded}>
            <table className='ui selectable structured large table'>
              <thead>
                <tr className="product-attribute-header">
                  {productHeaders}
                </tr>
              </thead>
              <tfoot className={(allProductsLoaded ? 'product-grid-footer' : 'hidden-product-grid-footer')}>
                <tr>
                  <td colSpan="5">
                    <div>
                      {"~ end of catalogue ~"}
                    </div>
                  </td>
                </tr>
              </tfoot>
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
