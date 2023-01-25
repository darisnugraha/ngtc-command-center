import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChartsWidget6, ChartsWidget7 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Chart/Chart 7',
  component: ChartsWidget7,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
} as ComponentMeta<typeof ChartsWidget7>;

const Template: ComponentStory<typeof ChartsWidget7> = (args) => <ChartsWidget7 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
};
