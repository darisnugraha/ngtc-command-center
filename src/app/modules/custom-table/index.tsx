/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

type Props = {
  className: string;
  columns: ColumnDescription[];
  data: any[];
  expandRow?: any;
};
const DefaultTable: React.FC<Props> = ({ className, columns, data, expandRow }) => {
  return (
    <div className={`card ${className}`}>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <BootstrapTable
          keyField='_id'
          columns={columns}
          data={data}
          wrapperClasses='table-responsive'
          classes='table align-middle gs-0 gy-4'
          headerClasses='fw-bolder text-center'
          rowStyle={{ borderBottom: '1pt solid black' }}
          noDataIndication={() => {
            return (
              <div className='row'>
                <div className='col-lg-12' style={{ textAlign: 'center' }}>
                  No Data
                </div>
              </div>
            );
          }}
          expandRow={expandRow}
          hover
          pagination={paginationFactory({})}
        />
      </div>
      {/* begin::Body */}
    </div>
  );
};

export default DefaultTable;
