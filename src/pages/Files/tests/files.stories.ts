import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';

import Files from '..';
import apiUrl from '../../../config/api';

const mockedContact = {
  id: 1,
  name: 'Giovanni Leite',
  cell_number: '(15)98128-3245',
  phone_number: '(15)3227-4021',
  Files: [],
};

export default {
  title: 'pages/Files',
  component: Files,
  parameters: {
    msw: {
      handlers: [
        rest.get(`${apiUrl}/contacts/:id`, (req, res, ctx) => {
          return res(ctx.json(mockedContact));
        }),
        rest.post(`${apiUrl}/files/`, (req, res, ctx) => {
          return res(
            ctx.json({
              id: Math.floor(Math.random() * 20),
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
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {};
