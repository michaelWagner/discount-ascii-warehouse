import React from 'react';

class Advertisement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let random = Math.floor(Math.random() * 1000);
    const advertisement = (
      this.props.componentName === 'ProductGrid'
      ? (<tr>
          <td colSpan="5">
            <div>
              <img className="ad" alt="in" src={"/ad/?r=" + random} />
            </div>
          </td>
        </tr>)
      : <img className="ad" alt="out" src={"/ad/?r=" + random} />
    );

    return advertisement;
  }
}
export default Advertisement;
