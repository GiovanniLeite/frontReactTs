import '@testing-library/jest-dom/extend-expect';

import { customRender } from '../../../utils/customRender';
import Page404 from '..';

describe('<Page404 />', () => {
  it('should render <Page404 />', () => {
    const { getByText } = customRender(<Page404 />);
    expect(getByText(/Página não encontrada/)).toBeInTheDocument();
  });
});
