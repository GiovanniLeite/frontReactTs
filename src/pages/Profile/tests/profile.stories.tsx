import { ComponentStory, Meta } from '@storybook/react';
import { rest } from 'msw';
import { Provider } from 'react-redux';

import Profile from '..';
import apiUrl from '../../../config/api';
import { mockedStateUser, mockStore } from '../../../utils/redux/mockStore';

export default {
  title: 'pages/Profile',
  component: Profile,
  parameters: {
    msw: {
      handlers: [
        rest.put(`${apiUrl}/users`, (req, res, ctx) => {
          return res(ctx.json(req));
        }),
      ],
    },
  },
} as Meta;

const Template: ComponentStory<typeof Profile> = () => <Profile />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => <Provider store={mockStore(mockedStateUser)}>{story()}</Provider>,
];
