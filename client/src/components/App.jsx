import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ProductGrid from './ProductGrid';
import Loading from './Loading';
import Advertisement from './Advertisement';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasProductGridLoaded: false,
      componentName: 'App',
      randomAd: null,
      adList: []
    };
  }

  addAdtoAdList(ad) {
    let newAdList = this.state.adList.concat(ad);
    this.setState({randomAd: ad, adList: newAdList });
  }

  // loadMore() {
  //   ProductGrid.loadProducts('limit=400');
  // }

  generateRandomAd() {
    let random = Math.floor(Math.random() * 1000);
    if (this.state.adList.length > 1) {
      while (random === this.state.adList[-1]) {
        random = Math.floor(Math.random() * 1000);
      }
    }
    this.addAdtoAdList(random)
    return random;
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
        <Advertisement key={0} adList={this.state.adList} randomAd={this.randomAd} generateRandomAd={this.generateRandomAd.bind(this)} componentName={this.state.componentName}/>

        <Loading hasLoaded={loadState} />
        <ProductGrid adList={this.state.adList} randomAd={this.randomAd} generateRandomAd={this.generateRandomAd.bind(this)} hasProductGridLoaded={this.hasLoaded.bind(this)}/>
      </div>
    );
  }
}

export default App;
