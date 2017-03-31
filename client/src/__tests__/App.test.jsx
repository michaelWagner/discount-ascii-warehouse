import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import App from '../components/App';

describe(App, () => {

  const component = shallow(
    <App />
  );

  it('renders and matches our snapshot', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('doesn\'t load ProductGrid initially', () => {
    expect(component.state('hasProductGridLoaded')).toBeFalsy();
  });
});
