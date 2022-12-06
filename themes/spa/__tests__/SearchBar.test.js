import renderer from 'react-test-renderer';
import SearchBar from '../src/searchBar';

it('SearchBar renders correctly', () => {
  const component = renderer.create(<SearchBar 
    searchText="Keyword"
  />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const component2 = renderer.create(<SearchBar 
    searchText="Keyword 2"
  />);
  let tree2 = component2.toJSON();
  expect(tree2).toMatchSnapshot();
});