import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChartsWidget2, ChartsWidget5 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Chart/Chart 5',
  component: ChartsWidget5,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
} as ComponentMeta<typeof ChartsWidget5>;

const Template: ComponentStory<typeof ChartsWidget5> = (args) => <ChartsWidget5 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
};
