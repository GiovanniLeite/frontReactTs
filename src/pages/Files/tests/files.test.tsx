import userEvent from '@testing-library/user-event';
import { act, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import apiUrl from '../../../config/api';

import { customRender } from '../../../utils/customRender';
import Files from '..';

export const mockedContact = {
  id: 1,
  name: 'Giovanni Leite',
  cell_number: '(15)98128-3245',
  phone_number: '(15)3227-4021',
  Files: [],
};

export const handlers = [
  rest.get(`${apiUrl}/contacts/:id`, (req, res, ctx) => {
    return res(ctx.json(mockedContact));
  }),
  rest.post(`${apiUrl}/files/`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        original_name: 'image.png',
        file_name: '1666740784814_13887.png',
        contact_id: 1,
        url: `/images/tests/1666740784814_13887.png`,
      }),
    );
  }),
  rest.delete(`${apiUrl}/files/:idFile`, (req, res, ctx) => {
    return res(ctx.json({ deleted: true }));
  }),
];

export const server = setupServer(...handlers);

describe('<Files />', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render a form and a file input field', () => {
    const { queryByTestId, unmount } = customRender(<Files />);

    expect(queryByTestId('inputFileForm')).toBeInTheDocument();
    expect(queryByTestId('inputFile')).toBeInTheDocument();
    unmount();
  });

  it('should not show preview if no image has been added', () => {
    const { queryByTestId, unmount } = customRender(<Files />);

    expect(queryByTestId('fileDiv')).not.toBeInTheDocument();
    unmount();
  });

  it('should add and remove an image', async () => {
    const { getByTestId, getByText, queryByTestId } = customRender(<Files />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = getByTestId('inputFile');
    await act(() => {
      userEvent.upload(input, file);
    });

    expect(getByTestId('fileDiv')).toBeInTheDocument();

    const removeButton = getByText(/Remover/);
    userEvent.click(removeButton);

    await waitFor(() => {
      expect(queryByTestId('fileDiv')).not.toBeInTheDocument();
    });
  });
});
