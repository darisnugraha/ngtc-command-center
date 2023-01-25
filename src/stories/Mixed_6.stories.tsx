import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget6 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 6',
  component: MixedWidget6,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget6>;

const Template: ComponentStory<typeof MixedWidget6> = (args) => <MixedWidget6 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'primary',
  chartHeight: '150px',
};
