import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedWidget2 } from '../_metronic/partials/widgets';
import { Normal } from './Dropdown.stories';

export default {
  title: 'Design System/Mixed/Mixed 2',
  subcomponents: { Normal },
  component: MixedWidget2,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof MixedWidget2>;

const Template: ComponentStory<typeof MixedWidget2> = (args) => (
  <div
    style={{ width: '100vw' }}
    className='row justify-content-center'
    id='DONT COPY ME , JUST COPY COMPONENT'
  >
    <div className='col-xl-3'>
      <MixedWidget2 {...args} />;
    </div>
  </div>
);

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  chartColor: 'danger',
  chartHeight: '200px',
  strokeColor: '#cb1e46',
  title: 'TITLE',
  data: {
    data: [
      {
        name: 'Pendapatan',
        data: [200000, 250000, 190000, 190000, 230000, 500000],
      },
    ],
    label: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    fillColor: ['#248FFB00'],
    strokeColor: ['#B92D2D'],
    type: 'bar',
    hoverDetail: (value: number) => {
      return `Rp.${value}`;
    },
  },
};
