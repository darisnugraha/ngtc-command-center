import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsWidget2 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Statistic 2',
  component: StatisticsWidget2,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof StatisticsWidget2>;

const Template: ComponentStory<typeof StatisticsWidget2> = (args) => (
  <StatisticsWidget2 {...args} />
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  avatar: '/media/svg/avatars/029-boy-11.svg',
  title: 'Meeting Schedule',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style2 = Template.bind({});
Style2.args = {
  className: 'card-xl-stretch mb-xl-8',
  avatar: '/media/svg/avatars/014-girl-7.svg',
  title: 'Meeting Schedule',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style3 = Template.bind({});
Style3.args = {
  className: 'card-xl-stretch mb-xl-8',
  avatar: '/media/svg/avatars/004-boy-1.svg',
  title: 'Meeting Schedule',
  description: 'Create a headline that is informative<br/>and will capture readers',
};
