import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Cart from './Cart';
import Product from './Product';
import ProductGrid from './ProductGrid';
import Loading from './Loading';
import Advertisement from './Advertisement';

class App extends Component {
  constructor() {
    super();

    this.state = {
      hasProductGridLoaded: false,
      cartVisible: false,
      cart: [],
      adList: []
    };

    this.defaultProps = {componentName: 'App'}
  }

  addProductToCart(product) {
    const newCart = this.state.cart.concat(product);
    this.setState({cart: newCart}, () => {
      console.log(product.id, "has been added to cart.")
    });
  }

  formatPrice(price) {
    if (price) {
      // Convert price to Dollar and cents notation in the format of '$1.50'.
      return '$' + (parseInt(price, 10) / 100).toFixed(2);
    } else {
      return 'Price Unavailable';
    }
  }

  generateRandomId() {
    // Make sure randomId is unique.
    let randomId = Math.floor(Math.random() * 1000);
    while(this.state.adList.indexOf(randomId) > 0) {
      randomId = Math.floor(Math.random() * 1000);
    }

    const newAdList = this.state.adList.concat(randomId);
    this.setState({adList: newAdList });

    return randomId;
  }

  hasLoaded() {
    this.setState({hasProductGridLoaded: true});
    return true;
  }

  removeProductFromCart() {
    // TODO remove only one product.
    const newCart = this.state.cart.filter(
      (item, idx) => item.id !== item.id,
    );
    this.setState({ cart: newCart });
  }

  toggleCartVisiblity() {
    const cartVisible = (this.state.cartVisible ? false : true);
    this.setState({cartVisible: cartVisible});
  }

  render() {
    const loadState = (
      this.state.hasProductGridLoaded
      ? "hide-loading-bar"
      : "loading-bar"
    );

    return (
      <div className='App'>
        <header>
          <h1>Discount Ascii Warehouse</h1>
          <div className="cart-btn" onClick={this.toggleCartVisiblity.bind(this)}></div>
        </header>
        <Cart products={this.state.cart}
              toggleCart={this.removeProductFromCart.bind(this)}
              formatPrice={this.formatPrice}
              cartVisible={this.state.cartVisible}/>

        <p className="tag-line">
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii
          faces in an exciting range of sizes and prices.
        </p>
        <p className="ad-tag-line">But first, a word from our sponsors:</p>

        <Advertisement key={0} generateRandomId={this.generateRandomId.bind(this)}
                       componentName={this.defaultProps.componentName}/>

        <Loading hasLoaded={loadState} />
        <ProductGrid toggleCart={this.addProductToCart.bind(this)}
                     generateRandomId={this.generateRandomId.bind(this)}
                     formatPrice={this.formatPrice}
                     hasProductGridLoaded={this.hasLoaded.bind(this)}/>
      </div>
    );
  }
}

export default App;
