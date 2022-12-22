import { ComponentStory, Meta } from '@storybook/react';
import { rest } from 'msw';
import { Provider } from 'react-redux';

import Login from '..';
import apiUrl from '../../../config/api';
import {
  mockedStateNoUser,
  mockedStateUser,
  mockStore,
} from '../../../utils/redux/mockStore';

export default {
  title: 'pages/Login',
  component: Login,
  parameters: {
    msw: {
      handlers: [
        rest.post(`${apiUrl}/tokens`, (req, res, ctx) => {
          return res(
            ctx.json({
              token: '',
              user: mockedStateUser.user,
            }),
          );
        }),
        rest.post(`${apiUrl}/users`, (req, res, ctx) => {
          return res(ctx.json(req));
        }),
      ],
    },
  },
} as Meta;

const Template: ComponentStory<typeof Login> = () => <Login />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => (
    <Provider store={mockStore(mockedStateNoUser)}>{story()}</Provider>
  ),
];
