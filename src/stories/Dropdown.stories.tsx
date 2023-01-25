import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListsWidget2 } from '../_metronic/partials/widgets';
import { Dropdown1 } from '../_metronic/partials/content/dropdown/Dropdown1';
import DefaultSelect from '../app/modules/dropdown';

export default {
  title: 'Design System/Dropdown',
  component: DefaultSelect,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof DefaultSelect>;

const Template: ComponentStory<typeof DefaultSelect> = (args) => (
  <div
    style={{
      width: '50vw',
    }}
  >
    <DefaultSelect {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  data: [
    {
      value: 'DATA 1',
      label: 'DATA 1',
    },
  ],
  label: 'Selector',
  onChange: (value) => {
    alert(value);
  },
};
