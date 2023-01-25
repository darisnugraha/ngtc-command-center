import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChartsWidget1, StatisticsWidget5, StatisticsWidget6 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/Chart/Chart 1',
  component: ChartsWidget1,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
} as ComponentMeta<typeof ChartsWidget1>;

const Template: ComponentStory<typeof ChartsWidget1> = (args) => <ChartsWidget1 {...args} />;

export const Style1 = Template.bind({});
Style1.args = {
  className: 'card-xl-stretch mb-xl-8',
  subtitle: 'Subtitle',
  title: 'Title',
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

  yearlyCallback: () => {
    alert('FETCHING YEARLY DATA');
  },
  monthlyCallback: () => {
    alert('FETCHING MONTLY');
  },
  weeklyCallback: () => {
    alert('FETCHING WEEKLY');
  },
};
