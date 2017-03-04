import React, { Component } from 'react';
import ProductGrid from './ProductGrid';
import Product from './Product';

class App extends Component {
  state = {
    products: [],
    cart: []
  }

  removeProductItem = (itemIndex) => {
    const filteredProducts = this.state.products.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ products: filteredProducts });
  }

  addProductToCart = (product) => {
    const newCart = this.state.cart.concat(product);
    console.log('here: ' + product);
    this.setState({ cart: newCart });
  }

  viewProduct = (product) => {
    // const newProducts = this.state.products.concat(product);
    // this.setState({ products: newProducts });
  }

  render() {
    const { products, cart } = this.state;

    return (

      <div className='App'>
        <header>
          <h1>Discount Ascii Warehouse</h1>

          <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

          <p>But first, a word from our sponsors:</p>
            <img className="ad" src={"/ad/?r=' + Math.floor(Math.random()*1000) + '"}/>
        </header>

        <ProductGrid />
      </div>
    );
  }
}

export default App;
