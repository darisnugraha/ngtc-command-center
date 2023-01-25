import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsWidget5, StatisticsWidget6 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Statistic 6',
  component: StatisticsWidget6,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof StatisticsWidget6>;

const Template: ComponentStory<typeof StatisticsWidget6> = (args) => (
  <StatisticsWidget6 {...args} />
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'success',
  title: 'Sales Stats',
  progress: '50%',
  description: 'Lands, Houses, Ranchos, Farms',
};

export const Style2 = Template.bind({});
Style2.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'warning',
  title: 'Sales Stats',
  progress: '10%',
  description: 'Lands, Houses, Ranchos, Farms',
};

export const Style3 = Template.bind({});
Style3.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'primary',
  title: 'Sales Stats',
  progress: '20%',
  description: 'Lands, Houses, Ranchos, Farms',
};
