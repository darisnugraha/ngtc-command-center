/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { KTSVG } from '../../../helpers';

type Props = {
  className: string;
  title: string;
  subtitle: string;
  buttonText: string;
  columns: ColumnDescription[];
};
const TablesWidget11: React.FC<Props> = ({ className, title, buttonText, subtitle, columns }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{title}</span>
          <span className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span>
        </h3>
        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            {buttonText}
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <BootstrapTable
          keyField='id'
          columns={columns}
          data={[
            {
              id: '1234',
              name: 'CObain',
              price: 1000,
            },
            {
              id: '1234',
              name: 'CObain',
              price: 1000,
            },
            {
              id: '1234',
              name: 'CObain',
              price: 1000,
            },
            {
              id: '1234',
              name: 'CObain',
              price: 1000,
            },
            {
              id: '1234',
              name: 'CObain',
              price: 1000,
            },
            {
              id: '1234',
              name: 'CObain',
              price: 1000,
            },
          ]}
          wrapperClasses='table-responsive'
          classes='table align-middle gs-0 gy-4'
          headerClasses='fw-bolder text-muted bg-light'
        />
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { TablesWidget11 };
