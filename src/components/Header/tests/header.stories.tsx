import { ComponentStory, Meta } from '@storybook/react';
import { Provider } from 'react-redux';

import Header from '..';
import {
  mockStore,
  mockedStateUser,
  mockedStateNoUser,
} from '../../../utils/redux/mockStore';

export default {
  title: 'components/Header',
  component: Header,
} as Meta;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => (
    <Provider store={mockStore(mockedStateNoUser)}>{story()}</Provider>
  ),
];

export const UserOnline = Template.bind({});
UserOnline.decorators = [
  (story) => <Provider store={mockStore(mockedStateUser)}>{story()}</Provider>,
];
