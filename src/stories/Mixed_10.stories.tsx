import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget10 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 10',
  component: MixedWidget10,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget10>;

const Template: ComponentStory<typeof MixedWidget10> = (args) => (
  <div
    style={{ width: '100vw' }}
    className='row justify-content-center'
    id='DONT COPY ME , JUST COPY COMPONENT'
  >
    <div className='col-xl-4'>
      <MixedWidget10 {...args} />
    </div>
  </div>
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'primary',
  chartHeight: '150px',
  title: 'Title',
  subtitle: 'Subtitle',
  value: 'Rp.250.000',
  data: {
    data: [
      {
        name: 'Pendapatan',
        data: [23, 42, 15, 62, 45, 23],
      },
    ],
    label: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    fillColor: ['#248FFB13'],
    strokeColor: ['#248FFB'],
    type: 'bar',
    hoverDetail: (value: number) => {
      return `Rp.${value}`;
    },
  },
};
