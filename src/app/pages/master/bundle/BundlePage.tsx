import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import GlobalModal from '../../../modules/modal/GlobalModal';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import FormBundleComponent from './component/FormBundleComponent';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import * as redux from './redux/BundleRedux';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const BundlePage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getBundle());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ bundle }) => bundle.feedback);
  const [dataSource, setDataSource] = useState(dataTab);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(false);

  // eslint-disable-next-line
  const dataTable = dataSource.length === 0 ? (search ? dataSource : dataTab) : dataSource;

  const columns: ColumnDescription[] = [
    {
      dataField: 'key',
      text: 'No',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_paket',
      text: 'Bundle Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_paket',
      text: 'Bundle Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'total_harga',
      text: 'Bundle Price',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell.toLocaleString()}</p>;
      },
    },
    {
      dataField: '',
      text: 'Action',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: (cell, row) => {
        return (
          <>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.getBundleByID(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.deleteBundle(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ];

  const handleClickBundle = (e: any) => {
    e.preventDefault();
    dispatch(modal.actions.show());
    dispatch(redux.actions.getDataDetailProduct());
  };

  const handleCloseBundle = () => {
    dispatch(redux.actions.closeModal());
  };

  const expandRow = {
    // eslint-disable-next-line
    renderer: (row: any, rowIndex: any) => {
      const columExpand: ColumnDescription[] = [
        {
          dataField: 'kode_produk',
          text: 'Product Code',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'nama_produk',
          text: 'Product Name',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'jenis_produk',
          text: 'Product Type',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'satuan',
          text: 'Unit',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
          },
        },
        {
          dataField: 'harga',
          text: 'Price',
          align: 'right',
          formatter: (cell) => {
            return (
              <p className='text-hover-primary d-block mb-1 fs-6 pe-2'>
                Rp. {cell.toLocaleString()}
              </p>
            );
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
        //           onClick={() => {}}
        //           className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        //         >
        //           <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        //         </button>
        //         <button
        //           type='button'
        //           onClick={() => {}}
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
          columns={columExpand}
          data={row.detail_produk}
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

  const isEdit: any = useSelector<RootState>(({ bundle }) => bundle.isEdit);

  return (
    <>
      <GlobalModal title={`${isEdit ? 'Edit' : 'Add'} Bundle`} onClose={() => handleCloseBundle()}>
        <FormBundleComponent
          onSubmit={(data: any) => {
            if (isEdit) {
              dispatch(redux.actions.updateBundle(data));
            } else {
              dispatch(redux.actions.addBundle(data));
            }
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Master Bundle</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span> */}
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='w-100 position-relative mb-3'>
                <KTSVG
                  path='/media/icons/duotune/general/gen021.svg'
                  className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-4'
                />
                <input
                  type='text'
                  className='form-control form-control-solid ps-15'
                  name='search'
                  placeholder='Search...'
                  data-kt-search-element='input'
                  value={value}
                  onChange={(e) => {
                    const currValue = e.target.value;
                    setValue(currValue);
                    const filteredData = dataTab.filter(
                      (entry: any) =>
                        entry.kode_paket?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.nama_paket?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.harga?.toString()?.toUpperCase().includes(currValue?.toUpperCase())
                    );
                    setDataSource(filteredData);
                    setSearch(true);
                  }}
                />
              </div>
            </div>
            <div className='col-lg-6'>
              <div style={{ float: 'right' }}>
                <button
                  type='button'
                  className='btn btn-sm btn-light-primary'
                  onClick={(e) => handleClickBundle(e)}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Bundle
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* begin::Body */}
      </div>
      <DefaultTable
        className='mb-5 mb-xl-8'
        data={dataTable}
        columns={columns}
        expandRow={expandRow}
      />
    </>
  );
};

export default connector(BundlePage);
