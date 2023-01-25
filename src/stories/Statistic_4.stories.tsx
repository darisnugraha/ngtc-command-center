import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsWidget4 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Statistic 4',
  component: StatisticsWidget4,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof StatisticsWidget4>;

const Template: ComponentStory<typeof StatisticsWidget4> = (args) => (
  <StatisticsWidget4 {...args} />
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'success',
  change: '+100',
  svgIcon: '/media/icons/duotune/ecommerce/ecm002.svg',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style2 = Template.bind({});
Style2.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'danger',
  change: '+100',
  svgIcon: '/media/icons/duotune/general/gen025.svg',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style3 = Template.bind({});
Style3.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'primary',
  change: '+100',
  svgIcon: '/media/icons/duotune/finance/fin006.svg',
  description: 'Create a headline that is informative<br/>and will capture readers',
};
