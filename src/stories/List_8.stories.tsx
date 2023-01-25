import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ListsWidget7, ListsWidget8 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/List/List 8',
  component: ListsWidget8,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof ListsWidget8>;

const Template: ComponentStory<typeof ListsWidget8> = (args) => <ListsWidget8 {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  className: 'card-xl-stretch mb-xl-8',
};
