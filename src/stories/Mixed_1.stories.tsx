import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChartsWidget6, ChartsWidget7, MixedWidget1 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 1',
  component: MixedWidget1,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget1>;

const Template: ComponentStory<typeof MixedWidget1> = (args) => (
  <div style={{ width: '30vw' }}>
    <MixedWidget1 {...args} />
  </div>
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  color: 'primary',
  title: 'Saldo',
  headerInfo: { subtitle: 'Your Balance', title: 'Rp. 1.000.000.000' },
  data: [
    {
      subtitle: '81002341',
      title: 'Bank BCA',
      prefix: '/media/icons/duotune/maps/map004.svg',
      suffix: {
        title: 'Rp. 250.000.000',
        imagePath: '/media/icons/duotune/arrows/arr066.svg',
      },
    },
  ],
};
