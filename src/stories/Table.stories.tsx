import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DefaultTable from '../app/modules/custom-table';
import { KTSVG } from '../_metronic/helpers';

export default {
  title: 'Design System/Table',
  component: DefaultTable,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof DefaultTable>;

const Template: ComponentStory<typeof DefaultTable> = (args) => (
  <div style={{ width: '80vw' }} id='JANGAN DI COPY DIV INI'>
    <DefaultTable {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  className: 'mb-5 mb-xl-8',
  // buttonText: 'Tambah Data',
  columns: [
    {
      dataField: 'id',
      text: 'id',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell, row, rowIndex, colIndex) => {
        return (
          <p className='ps-4 text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>
        );
      },
    },
    {
      dataField: 'example',
      text: 'example',
      formatter: (cell, row, rowIndex, colIndex) => {
        return <p className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'example2',
      text: 'example',
      formatter: (cell, row, rowIndex, colIndex) => {
        return <p className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'example3',
      text: 'example',
      formatter: (cell, row, rowIndex, colIndex) => {
        return <p className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },

    {
      dataField: '',
      text: '',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: (cell, row, rowIndex, colIndex) => {
        return (
          <>
            <button
              onClick={() => console.log()}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              onClick={() => console.log()}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ],
  data: [
    {
      id: 1,
      example: 'Example',
      example2: 'Example 2',
      example3: 'Example 3',
    },
  ],
  // handleButton: () => {},
  // subtitle: 'Subtitle',
  // title: 'Title',
};
