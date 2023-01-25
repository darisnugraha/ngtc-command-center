import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChartsWidget6 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Chart/Chart 6',
  component: ChartsWidget6,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
} as ComponentMeta<typeof ChartsWidget6>;

const Template: ComponentStory<typeof ChartsWidget6> = (args) => <ChartsWidget6 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
};
