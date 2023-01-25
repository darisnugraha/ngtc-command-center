import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
// import { KTSVG } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../../setup';

const TableInquiry: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ productionservice }) => productionservice.inquiry);

  const columns: ColumnDescription[] = [
    {
      dataField: 'NO',
      text: 'No',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'MENU_FITUR',
      text: 'Menu/Fitur',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'REVISI',
      text: 'Revision',
      align: 'justify',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'DETAIL',
      text: 'Detail',
      align: 'justify',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'LAMA_PENGERJAAN',
      text: 'Processing Time',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    // {
    //   dataField: '',
    //   text: 'Action',
    //   align: 'center',
    //   headerClasses: 'ps-4 min-w-100px rounded-end',
    //   formatter: () => {
    //     return (
    //       <>
    //         <button
    //           type='button'
    //           onClick={() => {
    //             // eslint-disable-next-line
    //           }}
    //           className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
    //         >
    //           <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
    //         </button>
    //         <button
    //           type='button'
    //           onClick={() => {
    //             // eslint-disable-next-line
    //           }}
    //           className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
    //         >
    //           <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
    //         </button>
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <BootstrapTable
      keyField='_id'
      columns={columns}
      data={dataTab}
      wrapperClasses='table-responsive'
      classes='table align-middle gs-0 gy-2'
      headerClasses='fw-bolder text-center'
      noDataIndication={() => {
        return (
          <div className='row'>
            <div className='col-lg-12' style={{ textAlign: 'center' }}>
              No Data
            </div>
          </div>
        );
      }}
    />
  );
};

export default TableInquiry;
