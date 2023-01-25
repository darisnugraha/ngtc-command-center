import React, { FC } from 'react';
import {
  MixedWidget1,
  MixedWidget2,
  MixedWidget3,
  MixedWidget4,
  MixedWidget5,
  MixedWidget6,
  MixedWidget7,
  MixedWidget8,
  MixedWidget9,
  MixedWidget10,
  MixedWidget11,
} from '../../../../_metronic/partials/widgets';

const Mixed: FC = () => {
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget1
            className='card-xl-stretch mb-xl-8'
            color='primary'
            title=''
            headerInfo={{ subtitle: 'Your Balance', title: 'Rp. 1.000.000.000' }}
            data={[]}
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget1
            className='card-xl-stretch mb-xl-8'
            color='danger'
            title=''
            headerInfo={{ subtitle: 'Your Balance', title: 'Rp. 1.000.000.000' }}
            data={[]}
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget1
            className='card-xl-stretch mb-5 mb-xl-8'
            color='success'
            title=''
            headerInfo={{ subtitle: 'Your Balance', title: 'Rp. 1.000.000.000' }}
            data={[]}
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget2
            className='card-xl-stretch mb-xl-8'
            chartColor='info'
            chartHeight='200px'
            strokeColor='#4e12c4'
            title='TITLE'
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
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget2
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
            title='TITLE'
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
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget2
            className='card-xl-stretch mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='200px'
            strokeColor='#0078d0'
            title='TITLE'
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
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget3 className='card-xl-stretch mb-xl-8' chartColor='info' chartHeight='250px' />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget3
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget3
            className='card-xl-stretch mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget4
            className='card-xl-stretch mb-xl-8'
            image='/media/svg/brand-logos/plurk.svg'
            color='danger'
            title='Monthly Subscription'
            date='Due: 27 Apr 2020'
            progress='75%'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget4
            className='card-xl-stretch mb-xl-8'
            image='/media/svg/brand-logos/vimeo.svg'
            color='primary'
            title='Monthly Subscription'
            date='Due: 27 Apr 2020'
            progress='75%'
          />
          {/* ))?> */}
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget4
            className='card-xl-stretch mb-5 mb-xl-8'
            image='/media/svg/brand-logos/kickstarter.svg'
            color='success'
            title='Monthly Subscription'
            date='Due: 27 Apr 2020'
            progress='75%'
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget5
            className='card-xl-stretch mb-xl-8'
            image='/media/svg/brand-logos/plurk.svg'
            time='7 hours ago'
            title='PitStop - Multiple Email Generator'
            description='Pitstop creates quick email campaigns.<br/>We help to strengthen your brand<br/>for your every purpose.'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget5
            className='card-xl-stretch mb-xl-8'
            image='/media/svg/brand-logos/telegram.svg'
            time='10 days ago'
            title='ReactJS Admin Theme'
            description='Keenthemes uses the latest and greatest frameworks<br/>with ReactJS for complete modernization and<br/>future.'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget5
            className='card-xl-stretch mb-5 mb-xl-8'
            image='/media/svg/brand-logos/vimeo.svg'
            time='2 weeks ago'
            title='KT.com - High Quality Templates'
            description='Easy to use, incredibly flexible and secure<br/>with in-depth documentation that outlines<br/>everything for you'
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget6
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget6
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget6
            className='card-xl-stretch mb-5 mb-xl-8'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget7
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='200px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget7
            className='card-xl-stretch mb-xl-8'
            chartColor='success'
            chartHeight='200px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget7
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget8
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget8
            className='card-xl-stretch mb-xl-8'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget8
            className='card-xl-stretch mb-5 mb-xl-8'
            chartColor='danger'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget9
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget9
            className='card-xl-stretch mb-xl-8'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget9
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='150px'
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget10
            className='card-xl-stretch mb-xl-8'
            chartColor='info'
            chartHeight='150px'
            title='TItle'
            subtitle='Subtitle'
            value='Rp.250.000'
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
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget10
            className='card-xl-stretch mb-xl-8'
            chartColor='warning'
            chartHeight='150px'
            title='TItle'
            subtitle='Subtitle'
            value='Rp.250.000'
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
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget10
            className='card-xl-stretch mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='150px'
            title='TItle'
            subtitle='Subtitle'
            value='Rp.250.000'
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
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget11
            className='card-xl-stretch mb-xl-8'
            chartColor='info'
            chartHeight='200px'
            title='TItle'
            subtitle='Subtitle'
            value='Rp.250.000'
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
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget11
            className='card-xl-stretch mb-xl-8'
            chartColor='warning'
            chartHeight='200px'
            title='TItle'
            subtitle='Subtitle'
            value='Rp.250.000'
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
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget11
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='200px'
            title='TItle'
            subtitle='Subtitle'
            value='Rp.250.000'
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
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}
    </>
  );
};

export { Mixed };
