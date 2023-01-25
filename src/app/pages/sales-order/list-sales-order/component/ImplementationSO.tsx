import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
// import { KTSVG } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../../setup';

const ImplementationSO: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ listso }) => listso.feedbackImplementation);

  const columns: ColumnDescription[] = [
    {
      dataField: 'no_implementasi',
      text: 'No Implementation',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tanggal_implementasi',
      text: 'Implementation Date',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tanggal_realisasi',
      text: 'Realization Date',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tipe_implementasi',
      text: 'Implementation Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'lama_implementasi',
      text: 'Implementation Time',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
  ];

  const expandRow = {
    // eslint-disable-next-line
    renderer: (row: any, rowIndex: any) => {
      const columExpand: ColumnDescription[] = [
        {
          dataField: 'kode_helpdesk',
          text: 'Helpdesk Code',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'nama_helpdesk',
          text: 'Helpdesk Name',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
      ];
      return (
        <BootstrapTable
          keyField='_id'
          columns={columExpand}
          data={row.staff_implementasi}
          wrapperClasses='table-responsive'
          classes='table align-middle gs-0 gy-2'
          headerClasses='fw-bolder text-center'
          noDataIndication={() => {
            return <span>No Data</span>;
          }}
        />
      );
    },
  };

  return (
    <BootstrapTable
      keyField='_id'
      columns={columns}
      data={dataTab}
      wrapperClasses='table-responsive'
      classes='table align-middle gs-0 gy-2'
      headerClasses='fw-bolder text-center'
      expandRow={expandRow}
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

export default ImplementationSO;
