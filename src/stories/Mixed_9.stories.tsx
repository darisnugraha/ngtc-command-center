import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget8, MixedWidget9 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 9',
  component: MixedWidget9,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget9>;

const Template: ComponentStory<typeof MixedWidget9> = (args) => <MixedWidget9 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'primary',
  chartHeight: '150px',
};
