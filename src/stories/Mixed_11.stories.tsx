import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget11 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Mixed/Mixed 11',
  component: MixedWidget11,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget11>;

const Template: ComponentStory<typeof MixedWidget11> = (args) => (
  <div
    style={{ width: '100vw' }}
    className='row justify-content-center'
    id='DONT COPY ME , JUST COPY COMPONENT'
  >
    <div className='col-xl-4'>
      <MixedWidget11 {...args} />
    </div>
  </div>
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'primary',
  chartHeight: '150px',
  value: 'Rp. 50.000',
  subtitle: 'Subtitle',
  title: 'Title',
  data: {
    data: [
      {
        name: 'Pendapatan',
        data: [23, 42, 15, 62, 45, 23],
      },
      {
        name: 'Pendapatan',
        data: [23, 42, 15, 62, 45, 23],
      },
    ],
    label: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    fillColor: ['#248FFB', '#248FFB13'],
    strokeColor: ['#248FFB'],
    type: 'bar',
    hoverDetail: (value: number) => {
      return `Rp.${value}`;
    },
  },
};
