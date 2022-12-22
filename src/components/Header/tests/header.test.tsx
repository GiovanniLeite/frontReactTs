import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import Header from '..';
import { customRender } from '../../../utils/customRender';
import {
  mockStore,
  mockedStateNoUser,
  mockedStateUser,
} from '../../../utils/redux/mockStore';

describe('<Header />', () => {
  it('should render <Header /> with user offline', () => {
    const { getByText, queryByText } = customRender(
      <Provider store={mockStore(mockedStateNoUser)}>
        <Header />
      </Provider>,
    );

    expect(getByText('Agenda')).toBeInTheDocument();
    expect(getByText('MENU')).toBeInTheDocument();
    expect(getByText('acesse sua conta')).toBeInTheDocument();
    expect(queryByText('Sair')).not.toBeInTheDocument();
  });

  it('should render <Header /> with user online', () => {
    const { getByText, queryByText } = customRender(
      <Provider store={mockStore(mockedStateUser)}>
        <Header />
      </Provider>,
    );

    expect(queryByText('acesse sua conta')).not.toBeInTheDocument();
    expect(getByText('Sair')).toBeInTheDocument();
  });

  it('should log out the user', async () => {
    const { getByText, queryByText, getByTestId, queryByTestId } = customRender(
      <Provider store={mockStore(mockedStateUser)}>
        <Header />
      </Provider>,
    );

    expect(queryByText('acesse sua conta')).not.toBeInTheDocument();
    expect(getByText('Sair')).toBeInTheDocument();

    userEvent.click(getByTestId('logout'));

    await waitFor(() => {
      expect(getByText('acesse sua conta')).toBeInTheDocument();
      expect(queryByTestId('logout')).not.toBeInTheDocument();
    });
  });
});
