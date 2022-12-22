import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import apiUrl from '../../../config/api';
import { customRender } from '../../../utils/customRender';
import Home from '..';

export const images = [
  {
    original_name: 'image.png',
    file_name: '1666740784814_13887.png',
    contact_id: 1,
    url: `/images/tests/1666740784814_13887.png`,
  },
  {
    original_name: 'image.png',
    file_name: '1666740784814_13888.png',
    contact_id: 1,
    url: `/images/tests/1666740784814_13888.jpg`,
  },
  {
    original_name: 'image.png',
    file_name: '1666740784814_13889.png',
    contact_id: 1,
    url: `/images/tests/1666740784814_13889.png`,
  },
];

export const defaultSearch = [
  {
    id: 1,
    name: 'Niko Bellic',
    cell_number: '(15)98122-3119',
    phone_number: '(15)3227-5064',
    Files: [],
  },
  {
    id: 2,
    name: 'Carl Johnson',
    cell_number: '(15)98222-3118',
    phone_number: '(15)3227-5064',
    Files: [images[0]],
  },
  {
    id: 3,
    name: 'Giovanni Leite',
    cell_number: '(15)98322-3117',
    phone_number: '(15)3227-5064',
    Files: [images[2]],
  },
  {
    id: 4,
    name: 'Diego Venturelli',
    cell_number: '(15)98422-3116',
    phone_number: '(15)3227-5064',
    Files: [images[1]],
  },
  {
    id: 5,
    name: 'Leopoldo Ferreira',
    cell_number: '(15)98522-3115',
    phone_number: '(15)3227-5064',
    Files: [],
  },
  {
    id: 6,
    name: 'Marcopolo da Silva',
    cell_number: '(15)98622-3114',
    phone_number: '(15)3227-5064',
    Files: [],
  },
  {
    id: 7,
    name: 'Kratos Jr',
    cell_number: '(15)98722-3113',
    phone_number: '(15)3227-5064',
    Files: [images[0]],
  },
  {
    id: 8,
    name: 'Nicodemos',
    cell_number: '(15)98822-3112',
    phone_number: '(15)3227-5064',
    Files: [],
  },
  {
    id: 9,
    name: 'Laercio Oliveira',
    cell_number: '(15)98922-3111',
    phone_number: '(15)3227-5064',
    Files: [images[2]],
  },
  {
    id: 10,
    name: 'Audi Benz',
    cell_number: '(15)98022-3110',
    phone_number: '(15)3227-5064',
    Files: [images[1]],
  },
];

export const serachByName = [
  {
    id: 1,
    name: 'Search by Name 1',
    cell_number: '(99)99999-9999',
    phone_number: '(99)9999-9999',
    Files: [images[0]],
  },
  {
    id: 2,
    name: 'Search by Name 2',
    cell_number: '(99)99999-9999',
    phone_number: '(99)9999-9999',
    Files: [images[1]],
  },
];

export const searchById = {
  id: 1,
  name: 'Search by ID',
  cell_number: '(99)99999-9999',
  phone_number: '(99)9999-9999',
  Files: [images[2]],
};

export const handlers = [
  rest.get(`${apiUrl}/contacts/`, (req, res, ctx) => {
    return res(ctx.json(defaultSearch));
  }),
  rest.get(`${apiUrl}/contacts/:idUser`, (req, res, ctx) => {
    return res(ctx.json(searchById));
  }),
  rest.get(`${apiUrl}/contacts/name/:nameUser`, (req, res, ctx) => {
    return res(ctx.json(serachByName));
  }),
  rest.delete(`${apiUrl}/contacts/:idUser`, (req, res, ctx) => {
    return res(ctx.json({ deleted: true }));
  }),
];

export const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render <Home /> with contact list and pagination', async () => {
    const {
      getByPlaceholderText,
      getByTitle,
      getAllByTestId,
      getByTestId,
      unmount,
    } = customRender(<Home />);

    expect(getByPlaceholderText('Buscar ...')).toBeInTheDocument();
    expect(getByTitle('Novo Registro')).toBeInTheDocument();
    await waitFor(() => {
      expect(getAllByTestId('contactList')[0]).toBeInTheDocument();
      expect(getByTestId('pagination')).toBeInTheDocument();
    });

    unmount();
  });

  it('should change visible contact list', async () => {
    const { getByText, queryByText, unmount } = customRender(<Home />);

    await waitFor(() => {
      expect(getByText('Niko Bellic')).toBeInTheDocument();
      expect(getByText('Carl Johnson')).toBeInTheDocument();
      expect(queryByText('Leopoldo Ferreira')).not.toBeInTheDocument();
      expect(queryByText('Marcopolo da Silva')).not.toBeInTheDocument();
    });

    userEvent.click(getByText(/Próximo/));

    expect(queryByText('Niko Bellic')).not.toBeInTheDocument();
    expect(queryByText('Carl Johnson')).not.toBeInTheDocument();
    expect(getByText('Leopoldo Ferreira')).toBeInTheDocument();
    expect(getByText('Marcopolo da Silva')).toBeInTheDocument();

    unmount();
  });

  it('should search for contacts by name', async () => {
    const { getByText, getByPlaceholderText, getByTestId, unmount } =
      customRender(<Home />);

    userEvent.type(getByPlaceholderText('Buscar ...'), 'by Name');
    fireEvent.submit(getByTestId('searchForm'));

    await waitFor(() => {
      expect(getByText('Search by Name 1')).toBeInTheDocument();
      expect(getByText('Search by Name 2')).toBeInTheDocument();
    });

    unmount();
  });

  it('should search for contacts by id', async () => {
    const { getByText, getByPlaceholderText, getByTestId, unmount } =
      customRender(<Home />);

    userEvent.type(getByPlaceholderText('Buscar ...'), '1');
    fireEvent.submit(getByTestId('searchForm'));

    await waitFor(() => {
      expect(getByText('Search by ID')).toBeInTheDocument();
    });

    unmount();
  });

  it('should confirm the identity of the contact and then delete it', async () => {
    const { getAllByTitle, getByTestId, unmount, getByText, queryByText } =
      customRender(<Home />);

    await waitFor(() => {
      expect(getByText('Niko Bellic')).toBeInTheDocument();
      userEvent.click(getAllByTitle('Excluir Registro')[0]);
    });

    expect(getByTestId('contactInfo')).toHaveTextContent(/1/);
    expect(getByTestId('contactInfo')).toHaveTextContent(/Niko Bellic/);
    expect(getByTestId('contactInfo')).toHaveTextContent(/\(15\)(98122-3119)/);

    userEvent.click(getByText('Confirmar'));

    await waitFor(() => {
      expect(queryByText('Niko Bellic')).not.toBeInTheDocument();
      expect(getByText('Carl Johnson')).toBeInTheDocument();
    });

    unmount();
  });
});
