/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Dropdown1 } from '../../content/dropdown/Dropdown1';
import { KTSVG } from '../../../helpers';

interface headerInfo {
  title: string;
  subtitle: string;
}

interface suffixData {
  title: string;
  imagePath: string;
}
interface data {
  title: string;
  subtitle: string;
  suffix?: suffixData;
  prefix?: string;
}

type Props = {
  className: string;
  color: string;
  title: string;
  headerInfo: headerInfo;
  data: data[];
};

const MixedWidget1: React.FC<Props> = ({ className, color, data, headerInfo, title }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bolder fs-3'>{title}</h3>
            <div className='ms-1'>
              {/* begin::Menu */}
              <button
                type='button'
                className={`btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color-${color} border-0 me-n3`}
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
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-bold fs-7'>{headerInfo.subtitle}</span>
            <span className='fw-bolder fs-2x pt-1'>{headerInfo.title}</span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Items */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-white'
          style={{ marginTop: '-100px' }}
        >
          {data.map((x, index) => {
            return (
              <div className='d-flex align-items-center mb-6'>
                {x.prefix !== null ? (
                  <div className='symbol symbol-45px w-40px me-5'>
                    <span className='symbol-label bg-lighten'>
                      <KTSVG path={x.prefix!} className='svg-icon-1' />
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                {/* end::Symbol */}
                {/* begin::Description */}
                <div className='d-flex align-items-center flex-wrap w-100'>
                  {/* begin::Title */}
                  <div className='mb-1 pe-3 flex-grow-1'>
                    <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                      {x.title}
                    </a>
                    <div className='text-gray-400 fw-bold fs-7'>{x.subtitle}</div>
                  </div>
                  {/* end::Title */}
                  {/* begin::Label */}
                  {x.suffix !== null ? (
                    <div className='d-flex align-items-center'>
                      <div className='fw-bolder fs-5 text-gray-800 pe-1'>{x.suffix?.title}</div>
                      <KTSVG
                        path={x.suffix?.imagePath!}
                        className='svg-icon-5 svg-icon-success ms-1'
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* end::Label */}
                </div>
                {/* end::Description */}
              </div>
            );
          })}
        </div>
        {/* end::Items */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { MixedWidget1 };
