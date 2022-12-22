import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import apiUrl from '../../../config/api';
import { customRender } from '../../../utils/customRender';
import Contact from '..';

export const mockedContact = {
  id: 1,
  name: 'Giovanni Leite',
  cell_number: '(15)98128-3245',
  phone_number: '(15)3227-4021',
  Files: [
    {
      original_name: 'image.png',
      file_name: '1666740784814_13887.png',
      url: `/images/storybook/1666740784814_13887.png`,
    },
  ],
};

export const contactHandlers = [
  // useEffect
  rest.get(`${apiUrl}/contacts/:id`, (req, res, ctx) => {
    return res(ctx.json(mockedContact));
  }),
  // new
  rest.post(`${apiUrl}/contacts/`, (req, res, ctx) => {
    const { name, cell_number, phone_number } = req.params;
    return res(
      ctx.json({
        id: 1,
        name,
        cell_number,
        phone_number,
        Files: [],
      }),
    );
  }),
  // update
  rest.put(`${apiUrl}/contacts/:id`, (req, res, ctx) => {
    const { name, cell_number, phone_number } = req.params;
    return res(
      ctx.json({
        id: mockedContact.id,
        name,
        cell_number,
        phone_number,
        Files: mockedContact.Files,
      }),
    );
  }),
];

const server = setupServer(...contactHandlers);

describe('<Contact />', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render an image, name and cellphone number', async () => {
    const { getByTestId, queryByTestId, getByDisplayValue, unmount } =
      customRender(<Contact />);

    await waitFor(() => {
      expect(getByTestId('hasImage')).toBeInTheDocument();
      expect(queryByTestId('hasNoImage')).not.toBeInTheDocument();
      expect(getByDisplayValue('Giovanni Leite')).toBeInTheDocument();
      expect(getByDisplayValue('(15)98128-3245')).toBeInTheDocument();
    });

    unmount();
  });

  it('should not be able to save/update a contact', async () => {
    const { getByText, getByPlaceholderText, unmount } = customRender(
      <Contact />,
    );

    const inputName = getByPlaceholderText('Ex. João Oliveira');
    const inputCell = getByPlaceholderText('Ex. (15)98128-2325');
    const saveButton = getByText('Salvar');

    userEvent.clear(inputName);
    userEvent.clear(inputCell);
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(inputName).toHaveStyle('border: 1px solid #ff0000');
      expect(inputCell).toHaveStyle('border: 1px solid #ff0000');
      expect(
        getByText('Nome deve ter entre 3 e 50 caracteres'),
      ).toBeInTheDocument();
      expect(
        getByText('Campo Celular não deve estar vazio'),
      ).toBeInTheDocument();
    });

    unmount();
  });

  it('should update a contact', async () => {
    const { getByText, getByPlaceholderText, unmount, getByTestId } =
      customRender(<Contact />);

    await waitFor(() => {
      expect(getByTestId('hasImage')).toBeInTheDocument();
    });

    const inputName = getByPlaceholderText('Ex. João Oliveira');
    const inputCell = getByPlaceholderText('Ex. (15)98128-2325');

    userEvent.clear(inputName);
    userEvent.type(inputName, 'Osvaldo Moraes');
    userEvent.clear(inputCell);
    userEvent.type(inputCell, '(15)98128-2322');
    userEvent.click(getByText('Salvar'));

    await waitFor(() => {
      expect(getByText('Editado com sucesso!')).toBeInTheDocument();
    });

    unmount();
  });
});
