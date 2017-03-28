import React from 'react';

class Advertisement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      randomId: null
    };
  }

  componentWillMount() {
    let randomId = this.props.generateRandomId();
    this.setState({randomId: randomId});
  }

  render() {
    const random = this.state.randomId;

    const advertisement = (
      this.props.componentName === 'ProductGrid'
      ? (<tr>
          <td colSpan="6">
            <div>
              <img key={random} className="ad" alt="" src={"/ad/?r=" + random} />
            </div>
          </td>
        </tr>)
      : <img key={random} className="ad" alt="" src={"/ad/?r=" + random} />
    );

    return advertisement;
  }
}
export default Advertisement;
