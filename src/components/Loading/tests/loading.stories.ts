import { Meta, StoryObj } from '@storybook/react';
import Loading from '..';

export default {
  title: 'components/Loading',
  component: Loading,
  args: {
    isLoading: true,
  },
} as Meta;

// occupies the whole screen
export const Default: StoryObj = {};
