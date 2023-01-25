import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget4 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 4',
  component: MixedWidget4,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget4>;

const Template: ComponentStory<typeof MixedWidget4> = (args) => <MixedWidget4 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  image: '/media/svg/brand-logos/plurk.svg',
  color: 'danger',
  title: 'Monthly Subscription',
  date: 'Due: 27 Apr 2020',
  progress: '75%',
};
