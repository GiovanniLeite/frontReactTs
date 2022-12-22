import '@testing-library/jest-dom/extend-expect';

import { customRender } from '../../../utils/customRender';
import Footer from '..';

describe('<Footer />', () => {
  it('should render <Footer />', () => {
    const { getByText } = customRender(<Footer />);

    expect(getByText(/Giovanni M. de O. Leite/)).toBeInTheDocument();
  });
});
