import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChartsWidget6, ChartsWidget7, ChartsWidget8 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Chart/Chart 8',
  component: ChartsWidget8,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
} as ComponentMeta<typeof ChartsWidget8>;

const Template: ComponentStory<typeof ChartsWidget8> = (args) => <ChartsWidget8 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
};
