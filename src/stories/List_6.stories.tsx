import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ListsWidget5, ListsWidget6 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/List/List 6',
  component: ListsWidget6,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof ListsWidget6>;

const Template: ComponentStory<typeof ListsWidget6> = (args) => <ListsWidget6 {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  className: 'card-xl-stretch mb-xl-8',
};
