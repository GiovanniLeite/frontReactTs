import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { waitFor } from '@testing-library/react';

import Profile from '..';
import { customRender } from '../../../utils/customRender';
import { mockStore, mockedStateUser } from '../../../utils/redux/mockStore';
import apiUrl from '../../../config/api';

export const handlers = [
  rest.put(`${apiUrl}/users`, (req, res, ctx) => {
    return res(ctx.json(req));
  }),
];
export const server = setupServer(...handlers);

// separate documents because the first tests were interfering here
describe('<Profile /> 2', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should update the profile', async () => {
    const { getByPlaceholderText, getByText, unmount } = customRender(
      <Provider store={mockStore(mockedStateUser)}>
        <Profile />
      </Provider>,
    );

    const inputName = getByPlaceholderText('Nome');
    const inputEmail = getByPlaceholderText('exemplo@outlook.com');
    const inputPassword = getByPlaceholderText('Senha');
    const inputPassword2 = getByPlaceholderText('Cofirmação de senha');

    userEvent.clear(inputName);
    userEvent.type(inputName, 'Tobias Leite');
    userEvent.clear(inputEmail);
    userEvent.type(inputEmail, 'tobias.leite@outlook.com');
    userEvent.clear(inputPassword);
    userEvent.type(inputPassword, '123456789');
    userEvent.clear(inputPassword2);
    userEvent.type(inputPassword2, '123456789');
    userEvent.click(getByText('Salvar'));

    await waitFor(() => {
      expect(getByText('Conta alterada com sucesso!')).toBeInTheDocument();
      expect(
        getByText('Você precisa fazer login novamente.'),
      ).toBeInTheDocument();
    });

    unmount();
  });
});
