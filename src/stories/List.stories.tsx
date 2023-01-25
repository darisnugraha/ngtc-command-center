import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ListsWidget1 } from '../_metronic/partials/widgets';

export default {
  title: 'Design System/List/List 1',
  component: ListsWidget1,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof ListsWidget1>;

const Template: ComponentStory<typeof ListsWidget1> = (args) => (
  <div style={{ width: '20vw' }}>
    <ListsWidget1 {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  className: 'card-xl-stretch mb-xl-8',
  title: 'Title',
  subtitle: 'Subtitle',
  data: [
    {
      title: 'Title 1',
      subtitle: 'Subtitle 2',
    },
    {
      title: 'Title 1',
      subtitle: 'Subtitle 2',
    },
    {
      title: 'Title 1',
      subtitle: 'Subtitle 2',
    },
    {
      title: 'Title 1',
      subtitle: 'Subtitle 2',
    },
    {
      title: 'Title 1',
      subtitle: 'Subtitle 2',
    },
    {
      title: 'Title 1',
      subtitle: 'Subtitle 2',
    },
    {
      title: 'Title 1',
      subtitle: 'Subtitle 2',
    },
  ],
};
