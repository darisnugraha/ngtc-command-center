import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubmitButton from '../app/modules/button';

export default {
  title: 'Design System/Button',
  component: SubmitButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['lg', 'sm'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'warning', 'danger', 'info'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => <SubmitButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  title: 'Simpan',
  imagePath: '/media/icons/duotune/arrows/arr075.svg',
  // handleClick: () => {
  //   alert('CLICKED');
  // },
  size: 'lg',
};
