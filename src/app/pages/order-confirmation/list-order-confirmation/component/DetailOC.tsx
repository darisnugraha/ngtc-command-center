import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
// import { KTSVG } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../../setup';

const DetailOC: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ listorderconfirmation }) => listorderconfirmation.feedbackNo
  );

  const columns: ColumnDescription[] = [
    {
      dataField: 'no_order_konfirmasi',
      text: 'No Order Confirmation',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'tanggal_order_konfirmasi',
      text: 'Date',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'jenis_ok',
      text: 'Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'kode_toko',
      text: 'Central Store Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'nama_toko',
      text: 'Central Store Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'total_harga',
      text: 'Total Price',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
  ];

  const columnsTwo: ColumnDescription[] = [
    {
      dataField: 'kode_cabang',
      text: 'Branch Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'nama_cabang',
      text: 'Branch Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'alamat_cabang',
      text: 'Address',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'alamat_korespondensi',
      text: 'Correspondence Address',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'email',
      text: 'Email',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'telepon',
      text: 'Telephone',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
  ];

  const columnsProduct: ColumnDescription[] = [
    {
      dataField: 'nama_produk',
      text: 'Product Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'qty',
      text: 'Qty',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'satuan',
      text: 'Unit',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'harga',
      text: 'Price',
      align: 'center',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString() || '-'}</p>
        );
      },
    },
    {
      dataField: 'sub_total',
      text: 'Sub Total',
      align: 'right',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString() || '-'}</p>
        );
      },
    },
  ];

  const columnsDiscount: ColumnDescription[] = [
    {
      dataField: 'nama_diskon',
      text: 'Discount Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
      footerAlign: 'center',
      footer: () => {
        return '';
      },
    },
    {
      dataField: 'persentase',
      text: 'Percentage',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell * 100 || '-'} %</p>;
      },
      footerAlign: 'right',
      footer: () => {
        return 'Grand Total';
      },
    },
    {
      dataField: 'sub_total',
      text: 'Diskon Rp',
      align: 'right',
      formatter: (cell) => {
        return (
          <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString() || '-'}</p>
        );
      },
      footerAlign: 'right',
      footer: () => {
        return `Rp. ${dataTab[0].total_harga.toLocaleString()}`;
      },
    },
  ];

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{dataTab[0].nama_toko}</h2>
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
      <hr />
      <BootstrapTable
        keyField='_id'
        columns={columnsTwo}
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
      <hr />
      <h3 style={{ textAlign: 'center' }}>Detail Product</h3>
      <BootstrapTable
        keyField='_id'
        columns={columnsProduct}
        data={dataTab[0].detail_produk}
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
      <BootstrapTable
        keyField='_id'
        columns={columnsDiscount}
        data={dataTab[0].detail_diskon}
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
    </>
  );
};

export default DetailOC;
