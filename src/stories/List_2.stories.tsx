import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { ListsWidget2 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/List/List 2',
  component: ListsWidget2,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof ListsWidget2>;

const Template: ComponentStory<typeof ListsWidget2> = (args) => <ListsWidget2 {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  className: 'card-xl-stretch mb-xl-8',
};
