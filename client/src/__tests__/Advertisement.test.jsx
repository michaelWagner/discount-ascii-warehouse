import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Advertisement from '../components/Advertisement';

describe(Advertisement, () => {

  const parentComponentName = "ProductGrid";
  const mockGenerateRandomId = jest.fn(() => (325));
  const component = shallow(
    <Advertisement generateRandomId={mockGenerateRandomId}
                   componentName={parentComponentName}/>
  );

  it('renders and matches our snapshot', () => {
    const component = renderer.create(
      <Advertisement generateRandomId={mockGenerateRandomId}
                   componentName={parentComponentName}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('generates a random id', () => {
    expect(mockGenerateRandomId).toBeCalled();
  });

  it('updates the Advertisement\'s state with it\'s randomId', () => {
    mockGenerateRandomId()
    expect(component.state('randomId')).not.toEqual(undefined);
  });
});
