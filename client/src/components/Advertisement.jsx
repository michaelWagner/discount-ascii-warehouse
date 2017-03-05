import React from 'react';

class Advertisement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr key={this.props.idx}>
        <img className="ad" src={"/ad/?r=" + Math.floor(Math.random()*1000)}/>
      </tr>
    );
  }
}
export default Advertisement;
