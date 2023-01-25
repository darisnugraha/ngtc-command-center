import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ListsWidget3 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/List/List 3',
  component: ListsWidget3,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof ListsWidget3>;

const Template: ComponentStory<typeof ListsWidget3> = (args) => <ListsWidget3 {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  className: 'card-xl-stretch mb-xl-8',
};
