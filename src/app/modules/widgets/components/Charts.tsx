import React, { FC } from 'react';
import {
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3,
  ChartsWidget4,
  ChartsWidget5,
  ChartsWidget6,
  ChartsWidget7,
  ChartsWidget8,
} from '../../../../_metronic/partials/widgets';

const Charts: FC = () => {
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget1
            className='card-xl-stretch mb-xl-8'
            title='Title'
            subtitle='Subtitle'
            data={{
              data: [
                {
                  name: 'Pendapatan',
                  data: [23, 42, 15, 62, 45, 23],
                },
                {
                  name: 'Pengeluaran',
                  data: [33, 52, 44, 34, 21, 22],
                },
              ],
              label: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
              fillColor: [],
              strokeColor: [],
              type: 'bar',
              hoverDetail: (value: number) => {
                return `Rp.${value}`;
              },
            }}
            yearlyCallback={() => {}}
            monthlyCallback={() => {}}
            weeklyCallback={() => {}}
          />
        </div>
        <div className='col-xl-6'>
          <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget3 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-6'>
          <ChartsWidget4 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget5 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-6'>
          <ChartsWidget6 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget7 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-6'>
          <ChartsWidget8 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
      {/* end::Row */}
    </>
  );
};

export { Charts };
