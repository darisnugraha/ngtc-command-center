import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget3 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 3',
  component: MixedWidget3,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget3>;

const Template: ComponentStory<typeof MixedWidget3> = (args) => <MixedWidget3 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'danger',
  chartHeight: '200px',
};
