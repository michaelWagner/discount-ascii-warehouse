import React, { Component } from 'react';
import ProductGrid from './ProductGrid';
import Loading from './Loading';
// import Product from './Product';
import Advertisement from './Advertisement';

class App extends Component {
  constructor() {
    super();
    this.state = { hasProductGridLoaded: false };
  }
  hasLoaded() {
    this.setState({hasProductGridLoaded: true});
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

          <p className="tag-line">
            Here you're sure to find a bargain on some of the finest ascii
            available to purchase. Be sure to peruse our selection of ascii
            faces in an exciting range of sizes and prices.
          </p>

        </header>
        <p className="ad-tag-line">But first, a word from our sponsors:</p>
        <Advertisement key={0} />

        <Loading hasLoaded={loadState} />
        <ProductGrid hasProductGridLoaded={this.hasLoaded.bind(this)}/>
      </div>
    );
  }
}

export default App;
