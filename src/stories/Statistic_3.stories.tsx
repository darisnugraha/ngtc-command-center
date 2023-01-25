import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsWidget3 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Statistic 3',
  component: StatisticsWidget3,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof StatisticsWidget3>;

const Template: ComponentStory<typeof StatisticsWidget3> = (args) => (
  <StatisticsWidget3 {...args} />
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'success',
  change: '+100',
  title: 'Meeting Schedule',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style2 = Template.bind({});
Style2.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'danger',
  change: '+100',
  title: 'Meeting Schedule',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style3 = Template.bind({});
Style3.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'primary',
  change: '+100',
  title: 'Meeting Schedule',
  description: 'Create a headline that is informative<br/>and will capture readers',
};
