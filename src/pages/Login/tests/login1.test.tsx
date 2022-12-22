import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import Login from '../index';
import { customRender } from '../../../utils/customRender';
import { mockStore, mockedStateNoUser } from '../../../utils/redux/mockStore';

describe('<Login /> 1', () => {
  it('should render <Login />', () => {
    const { getByTitle, getByText, unmount } = customRender(
      <Provider store={mockStore(mockedStateNoUser)}>
        <Login />
      </Provider>,
    );

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByTitle('Email - Login')).toBeInTheDocument();
    expect(getByTitle('Senha - Login')).toBeInTheDocument();
    expect(getByText('Entrar')).toBeInTheDocument();
    expect(getByText('Registro')).toBeInTheDocument();
    expect(getByTitle('Nome - Registro')).toBeInTheDocument();
    expect(getByTitle('Email - Registro')).toBeInTheDocument();
    expect(getByTitle('Senha - Registro')).toBeInTheDocument();
    expect(getByTitle('Cofirmação de senha - Registro')).toBeInTheDocument();
    expect(getByText('Registrar-se')).toBeInTheDocument();

    unmount();
  });

  it('should not be able to log in', () => {
    const { getByTitle, getByText, unmount } = customRender(
      <Provider store={mockStore(mockedStateNoUser)}>
        <Login />
      </Provider>,
    );

    userEvent.click(getByText('Entrar'));

    expect(getByTitle('Email - Login')).toHaveStyle(
      'border: 1px solid #ff0000',
    );
    expect(getByTitle('Senha - Login')).toHaveStyle(
      'border: 1px solid #ff0000',
    );

    unmount();
  });

  it('should not be able to register', () => {
    const { getByTitle, getByText, unmount } = customRender(
      <Provider store={mockStore(mockedStateNoUser)}>
        <Login />
      </Provider>,
    );

    userEvent.click(getByText('Registrar-se'));

    expect(getByTitle('Nome - Registro')).toHaveStyle(
      'border: 1px solid #ff0000',
    );
    expect(getByTitle('Email - Registro')).toHaveStyle(
      'border: 1px solid #ff0000',
    );
    expect(getByTitle('Senha - Registro')).toHaveStyle(
      'border: 1px solid #ff0000',
    );
    expect(getByTitle('Cofirmação de senha - Registro')).toHaveStyle(
      'border: 1px solid #ff0000',
    );

    unmount();
  });
});
