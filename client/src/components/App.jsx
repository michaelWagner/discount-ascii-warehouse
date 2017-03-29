import React, { Component } from 'react';
import Cart from './Cart';
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
    });
  }

  formatPriceFromCentsToDollars(price) {
    if (price) {
      // Convert price to Dollar and cents notation in the format of '$1.50'.
      return '$' + (parseInt(price, 10) / 100).toFixed(2);
    } else {
      return '$0.00';
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

  removeProductFromCart(product) {
    const newCart = this.state.cart.filter(
      (item, idx) => item.id !== product.id
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

    const totalPrice = this.state.cart.reduce((total, product) => {
      return total + product.price
    }, 0);

    return (
      <div className='App'>
        <header>
          <h1>Discount Ascii Warehouse</h1>
          <div className="cart-btn-wrapper">
            <div className="cart-total-price">{this.formatPriceFromCentsToDollars(totalPrice)}</div>
            <div className="cart-btn" onClick={this.toggleCartVisiblity.bind(this)}></div>
          </div>
        </header>
        <Cart products={this.state.cart}
              totalPrice={totalPrice}
              toggleProductInCart={this.removeProductFromCart.bind(this)}
              formatPriceFromCentsToDollars={this.formatPriceFromCentsToDollars}
              cartVisible={this.state.cartVisible}/>
        <div className="key-visual-wrapper">
          <div className="key-visual">
            <div className="tag-line-wrapper">
              <p className="tag-line">
                Here you're sure to find a bargain on some of the finest ascii
                available to purchase. Be sure to peruse our selection of ascii
                faces in an exciting range of sizes and prices.
              </p>
            </div>
            <div className="key-visual-img"></div>
          </div>
        </div>

        <p className="ad-tag-line">But first, a word from our sponsors:</p>

        <Advertisement key={0} generateRandomId={this.generateRandomId.bind(this)}
                       componentName={this.defaultProps.componentName}/>

        <Loading hasLoaded={loadState} />

        <p className="product-grid-guide">Click column header to sort. Click on product to add to cart.</p>
        <ProductGrid toggleProductInCart={this.addProductToCart.bind(this)}
                     generateRandomId={this.generateRandomId.bind(this)}
                     formatPriceFromCentsToDollars={this.formatPriceFromCentsToDollars}
                     hasProductGridLoaded={this.hasLoaded.bind(this)}/>
      </div>
    );
  }
}

export default App;
