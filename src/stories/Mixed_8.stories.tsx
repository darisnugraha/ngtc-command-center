import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget8 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 8',
  component: MixedWidget8,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget8>;

const Template: ComponentStory<typeof MixedWidget8> = (args) => <MixedWidget8 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'primary',
  chartHeight: '150px',
};
