import '@testing-library/jest-dom/extend-expect';

import { customRender } from '../../../utils/customRender';
import Loading from '..';

describe('<Loading />', () => {
  it('should render <Loading /> according to isLoading', () => {
    const { getByText, queryByText, rerender } = customRender(
      <Loading isLoading />,
    );
    expect(getByText(/Carregando.../)).toBeInTheDocument();

    rerender(<Loading isLoading={false} />);
    expect(queryByText(/Carregando.../)).not.toBeInTheDocument();
  });
});
