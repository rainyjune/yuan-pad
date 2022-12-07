import renderer from 'react-test-renderer';
import Progress from '../src/progress';

it('Progress bar renders correctly', () => {
  const tree = renderer.create(<Progress loadingModalIsOpen={true} />).toJSON();
  expect(tree).toMatchSnapshot();

  const tree2 = renderer.create(<Progress loadingModalIsOpen={false} />).toJSON();
  expect(tree2).toMatchSnapshot();
});