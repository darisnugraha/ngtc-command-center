import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget5 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 5',
  component: MixedWidget5,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget5>;

const Template: ComponentStory<typeof MixedWidget5> = (args) => <MixedWidget5 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  image: '/media/svg/brand-logos/plurk.svg',
  time: '7 hours ago',
  title: 'Monthly Subscription',
  description:
    'Pitstop creates quick email campaigns.<br/>We help to strengthen your brand<br/>for your every purpose.',
};
