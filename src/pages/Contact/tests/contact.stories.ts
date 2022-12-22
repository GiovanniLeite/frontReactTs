import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';

import Contact from '..';
import apiUrl from '../../../config/api';

const mockedContact = {
  id: 1,
  name: 'Giovanni Leite',
  cell_number: '(15)98128-3245',
  phone_number: '(15)3227-4021',
  Files: [
    {
      original_name: 'image.png',
      file_name: '1666740784814_13887.png',
      url: `/images/tests/1666740784814_13887.png`,
    },
  ],
};

export default {
  title: 'pages/Contact',
  component: Contact,
  parameters: {
    msw: {
      handlers: [
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
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {};
