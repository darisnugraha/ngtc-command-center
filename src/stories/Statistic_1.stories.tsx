import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsWidget1 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Statistic/Statistic 1',
  component: StatisticsWidget1,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof StatisticsWidget1>;

const Template: ComponentStory<typeof StatisticsWidget1> = (args) => (
  <StatisticsWidget1 {...args} />
);

export const Style1 = Template.bind({});

Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  image: 'abstract-4.svg',
  title: 'Meeting Schedule',
  time: '3:30PM - 4:20PM',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style2 = Template.bind({});

Style2.args = {
  className: 'card-xl-stretch mb-xl-8',
  image: 'abstract-2.svg',
  title: 'Meeting Schedule',
  time: '3:30PM - 4:20PM',
  description: 'Create a headline that is informative<br/>and will capture readers',
};

export const Style3 = Template.bind({});

Style3.args = {
  className: 'card-xl-stretch mb-xl-8',
  image: 'abstract-1.svg',
  title: 'Meeting Schedule',
  time: '3:30PM - 4:20PM',
  description: 'Create a headline that is informative<br/>and will capture readers',
};
