import React from 'react';

class Advertisement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const advertisement = (
      this.props.componentName === 'ProductGrid'
      ? (<tr>
          <td colSpan="5">
            <div>
              <img className="ad" alt="" src={"/ad/?r=" + Math.floor(Math.random()*1000)} />
            </div>
          </td>
        </tr>)
      : <img className="ad" alt="" src={"/ad/?r=" + Math.floor(Math.random()*1000)} />
    );
    
    return advertisement;
  }
}
export default Advertisement;
