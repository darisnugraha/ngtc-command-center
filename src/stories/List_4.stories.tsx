import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ListsWidget4 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/List/List 4',
  component: ListsWidget4,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof ListsWidget4>;

const Template: ComponentStory<typeof ListsWidget4> = (args) => <ListsWidget4 {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  className: 'card-xl-stretch mb-xl-8',
};
