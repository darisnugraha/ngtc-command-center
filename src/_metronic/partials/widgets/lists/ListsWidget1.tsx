/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { KTSVG } from '../../../helpers';
import { Dropdown1 } from '../../content/dropdown/Dropdown1';

interface DetailItem {
  title: string;
  subtitle: string;
}

type Props = {
  className: string;
  title: string;
  subtitle: string;
  data: DetailItem[];
};

const ListsWidget1: React.FC<Props> = ({ className, title, subtitle, data }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder text-dark'>{title}</span>
          <span className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span>
        </h3>

        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown1 />
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body pt-5'>
        {data.map((x, index) => {
          return (
            <div className='d-flex align-items-center mb-7'>
              {/* begin::Symbol */}
              <div className='symbol symbol-50px me-5'>
                <span className='symbol-label bg-light-success'>
                  <KTSVG
                    path='/media/icons/duotune/abstract/abs027.svg'
                    className='svg-icon-2x svg-icon-success'
                  />
                </span>
              </div>
              {/* end::Symbol */}
              {/* begin::Text */}
              <div className='d-flex flex-column'>
                <a href='#' className='text-dark text-hover-primary fs-6 fw-bolder'>
                  {x.title}
                </a>
                <span className='text-muted fw-bold'>{x.subtitle}</span>
              </div>
              {/* end::Text */}
            </div>
          );
        })}
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ListsWidget1 };
