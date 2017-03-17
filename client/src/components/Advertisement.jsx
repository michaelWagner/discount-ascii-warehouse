import React from 'react';

class Advertisement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img className="ad" src={"/ad/?r=" + Math.floor(Math.random()*1000)} />
    );
  }
}
export default Advertisement;
