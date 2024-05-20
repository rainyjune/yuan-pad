import renderer from 'react-test-renderer';
import SearchBar from '../src/front/searchBar';

it('SearchBar renders correctly', () => {
  const props = {
    onSubmit: (s) => {},
  };
  const component = renderer.create(<SearchBar {...props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // const component2 = renderer.create(<SearchBar {...props} />);
  // let tree2 = component2.toJSON();
  // expect(tree2).toMatchSnapshot();
});
