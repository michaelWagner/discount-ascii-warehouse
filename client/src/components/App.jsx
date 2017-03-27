import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ProductGrid from './ProductGrid';
import Loading from './Loading';
import Cart from './Cart';
import Advertisement from './Advertisement';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasProductGridLoaded: false,
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

  removeProductFromCart(product) {
    const newCart = this.state.cart.filter(
      (item, idx) => item.id !== product.id,
    );
    this.setState({ cart: newCart });
  }

  viewCart() {
  }

  generateRandomId() {
    // Make sure randomId is unique.
    let randomId = Math.floor(Math.random() * 1000);
    while(this.state.adList.indexOf(randomId) > 0) {
      randomId = Math.floor(Math.random() * 1000);
    }

    let newAdList = this.state.adList.concat(randomId);
    this.setState({adList: newAdList });

    return randomId;
  }

  hasLoaded() {
    this.setState({hasProductGridLoaded: true});

    return true;
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
          <div className="cart-btn" onClick={this.toggleCart}></div>
          { this.state.cartVisible ? <Cart products={this.state.cart} /> : ''}
        </header>

        <p className="tag-line">
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii
          faces in an exciting range of sizes and prices.
        </p>
        <p className="ad-tag-line">But first, a word from our sponsors:</p>

        <Advertisement key={0} generateRandomId={this.generateRandomId.bind(this)} componentName={this.defaultProps.componentName}/>

        <Loading hasLoaded={loadState} />
        <ProductGrid addProductToCart={this.addProductToCart.bind(this)} generateRandomId={this.generateRandomId.bind(this)} hasProductGridLoaded={this.hasLoaded.bind(this)}/>
      </div>
    );
  }
}

export default App;
