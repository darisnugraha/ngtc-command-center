import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ListsWidget7 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/List/List 7',
  component: ListsWidget7,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof ListsWidget7>;

const Template: ComponentStory<typeof ListsWidget7> = (args) => <ListsWidget7 {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  className: 'card-xl-stretch mb-xl-8',
};
