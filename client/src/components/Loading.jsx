import React from 'react';

class Loading extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={this.props.hasLoaded}>
        <span className="loader">
          <div className="loader-indicator" >
            <h1>
              <span>Loading</span>
              <span className="loader-ellipsis" >
                <span className="loader-ellipsisDot">.</span>
                <span className="loader-ellipsisDot">.</span>
                <span className="loader-ellipsisDot">.</span>
              </span>
            </h1>
          </div>
        </span>
      </div>
    );
  }
}

export default Loading;
