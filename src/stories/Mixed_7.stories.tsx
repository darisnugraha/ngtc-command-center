import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget7 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 7',
  component: MixedWidget7,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget7>;

const Template: ComponentStory<typeof MixedWidget7> = (args) => <MixedWidget7 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'primary',
  chartHeight: '150px',
};
