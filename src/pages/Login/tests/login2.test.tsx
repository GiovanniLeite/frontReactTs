import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import Login from '..';
import { customRender } from '../../../utils/customRender';
import { mockStore, mockedStateNoUser } from '../../../utils/redux/mockStore';
import apiUrl from '../../../config/api';

const handlers = [
  rest.post(`${apiUrl}/users`, (req, res, ctx) => {
    return res(ctx.json(req));
  }),
];
const server = setupServer(...handlers);

// separate documents because the first tests were interfering here
describe('<Login /> 2', () => {
  it('should create a register', async () => {
    server.listen({ onUnhandledRequest: 'error' });

    const { getByTitle, getByText, unmount } = customRender(
      <Provider store={mockStore(mockedStateNoUser)}>
        <Login />
      </Provider>,
    );

    userEvent.type(getByTitle('Nome - Registro'), 'Tobias Leite');
    userEvent.type(getByTitle('Email - Registro'), 'tobias.leite@outlook.com');
    userEvent.type(getByTitle('Senha - Registro'), '123456789');
    userEvent.type(getByTitle('Cofirmação de senha - Registro'), '123456789');
    userEvent.click(getByText('Registrar-se'));

    await waitFor(() => {
      expect(getByText('Conta criada com sucesso!')).toBeInTheDocument();
    });

    unmount();
    server.close();
  });
});
