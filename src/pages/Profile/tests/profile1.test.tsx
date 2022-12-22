import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Profile from '../index';
import { customRender } from '../../../utils/customRender';
import { mockStore, mockedStateUser } from '../../../utils/redux/mockStore';

describe('<Profile /> 1', () => {
  it('should render <Profile /> with user online', () => {
    const { getByDisplayValue, unmount } = customRender(
      <Provider store={mockStore(mockedStateUser)}>
        <Profile />
      </Provider>,
    );
    expect(getByDisplayValue('Niko Bellic')).toBeInTheDocument();
    expect(getByDisplayValue('niko.bellic@outlook.com')).toBeInTheDocument();
    unmount();
  });

  it('should not be able to update', () => {
    const { getByPlaceholderText, getByText, unmount } = customRender(
      <Provider store={mockStore(mockedStateUser)}>
        <Profile />
      </Provider>,
    );

    const inputName = getByPlaceholderText('Nome');
    const inputEmail = getByPlaceholderText('exemplo@outlook.com');
    const inputPassword = getByPlaceholderText('Senha');
    const inputPassword2 = getByPlaceholderText('Cofirmação de senha');
    const saveButton = getByText('Salvar');

    userEvent.clear(inputName);
    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.clear(inputPassword2);
    userEvent.click(saveButton);

    expect(inputName).toHaveStyle('border: 1px solid #ff0000');
    expect(inputEmail).toHaveStyle('border: 1px solid #ff0000');
    expect(inputPassword).toHaveStyle('border: 1px solid #ff0000');
    expect(inputPassword2).toHaveStyle('border: 1px solid #ff0000');

    unmount();
  });
});
