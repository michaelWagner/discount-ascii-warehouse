import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Loading from '../components/Loading';

describe(Loading, () => {

  const parentComponentName = 'ProductGrid';
  const loadState = 'loading-bar';
  const component = shallow(
    <Loading hasLoaded={loadState}/>
  );

  it('renders and matches our snapshot', () => {
    const component = renderer.create(
      <Loading hasLoaded={loadState}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
