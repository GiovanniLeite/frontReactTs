import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';

import Home from '..';
import apiUrl from '../../../config/api';

const images = [
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

const defaultSearch = [
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
const serachByName = [
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
const searchById = {
  id: 1,
  name: 'Search by ID',
  cell_number: '(99)99999-9999',
  phone_number: '(99)9999-9999',
  Files: [images[2]],
};

export default {
  title: 'pages/Home',
  component: Home,
  parameters: {
    msw: {
      handlers: [
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
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {};

// const Template = () => <Home />;

// export const Default = Template.bind({});
// Default.parameters = {
//   msw: {
//     handlers: [
//       rest.get(`${apiUrl}/contacts/`, (req, res, ctx) => {
//         return res(ctx.json(defaultSearch));
//       }),
//       rest.get(`${apiUrl}/contacts/:idUser`, (req, res, ctx) => {
//         return res(ctx.json(searchById));
//       }),
//       rest.get(`${apiUrl}/contacts/name/:nameUser`, (req, res, ctx) => {
//         return res(ctx.json(serachByName));
//       }),
//     ],
//   },
// };
