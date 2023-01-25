import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsWidget5 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Statistic 5',
  component: StatisticsWidget5,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof StatisticsWidget5>;

const Template: ComponentStory<typeof StatisticsWidget5> = (args) => (
  <StatisticsWidget5 {...args} />
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'success',
  iconColor: 'white',
  title: 'Sales Stats',
  svgIcon: '/media/icons/duotune/ecommerce/ecm002.svg',
  description: 'Lands, Houses, Ranchos, Farms',
};

export const Style2 = Template.bind({});
Style2.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'danger',
  iconColor: 'white',
  title: 'Sales Stats',
  svgIcon: '/media/icons/duotune/ecommerce/ecm002.svg',
  description: 'Lands, Houses, Ranchos, Farms',
};

export const Style3 = Template.bind({});
Style3.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'primary',
  iconColor: 'white',
  title: 'Sales Stats',
  svgIcon: '/media/icons/duotune/ecommerce/ecm002.svg',
  description: 'Lands, Houses, Ranchos, Farms',
};
