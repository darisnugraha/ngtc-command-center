import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import GlobalModal from '../../../modules/modal/GlobalModal';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import FormStoreComponent from './component/FormStoreComponent';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import * as redux from './redux/CustomerRedux';
import FormBranchComponent from './component/FormBranchComponent';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const CustomerPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getStore());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ customer }) => customer.feedback);
  const [dataSource, setDataSource] = useState(dataTab);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(false);

  // eslint-disable-next-line
  const dataTable = dataSource.length === 0 ? (search ? dataSource : dataTab) : dataSource;

  const [typeModal, setTypeModal] = useState('');

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
      dataField: 'kode_toko',
      text: 'Store Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_toko',
      text: 'Store Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_customer',
      text: 'Customer Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kota',
      text: 'City',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
      },
    },
    {
      dataField: 'alamat',
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
      dataField: 'tipe_toko',
      text: 'Store Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
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
                dispatch(redux.actions.getStoreByID(row._id));
                setTypeModal('STORE');
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.deleteStore(row._id));
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

  const handleClickStore = () => {
    setTypeModal('STORE');
    dispatch(modal.actions.show());
  };

  const handleClickBranch = () => {
    setTypeModal('BRANCH');
    dispatch(modal.actions.show());
  };

  const handleCloseCustomer = () => {
    dispatch(redux.actions.closeModal());
  };

  const expandRow = {
    // eslint-disable-next-line
    renderer: (row: any, rowIndex: any) => {
      const columExpand: ColumnDescription[] = [
        {
          dataField: 'kode_cabang',
          text: 'Branch Code',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'nama_cabang',
          text: 'Branch Name',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'nama_customer',
          text: 'Customer Name',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'kota',
          text: 'City',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell || '-'}</p>;
          },
        },
        {
          dataField: 'alamat_cabang',
          text: 'Address',
          align: 'center',
          formatter: (cell) => {
            return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'alamat_korespondensi',
          text: 'Correspondence Address',
          align: 'center',
          formatter: (cell) => {
            return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'telepon',
          text: 'Telephone',
          align: 'center',
          formatter: (cell) => {
            return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'email',
          text: 'Email',
          align: 'center',
          formatter: (cell) => {
            return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: 'tipe_cabang',
          text: 'Branch Type',
          align: 'center',
          formatter: (cell) => {
            return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
        },
        {
          dataField: '',
          text: 'Action',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-end',
          formatter: (cell, rowdata) => {
            return (
              <>
                <button
                  type='button'
                  onClick={() => {
                    // eslint-disable-next-line
                    dispatch(redux.actions.getBranchByID(rowdata._id));
                    setTypeModal('BRANCH');
                  }}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                </button>
                <button
                  type='button'
                  onClick={() => {
                    // eslint-disable-next-line
                    dispatch(redux.actions.deleteBranch(rowdata._id));
                  }}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  disabled={rowdata.kode_cabang === 'PUSAT'}
                >
                  <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                </button>
              </>
            );
          },
        },
      ];
      return (
        <BootstrapTable
          keyField='_id'
          columns={columExpand}
          data={row.cabang}
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

  const isEdit: any = useSelector<RootState>(({ customer }) => customer.isEdit);

  return (
    <>
      <GlobalModal
        title={`${isEdit ? 'Edit' : 'Add'} Customer`}
        onClose={() => handleCloseCustomer()}
      >
        {typeModal === 'STORE' ? (
          <FormStoreComponent
            onSubmit={(data: any) => {
              if (isEdit) {
                dispatch(redux.actions.updateStore(data));
              } else {
                dispatch(redux.actions.addStore(data));
              }
            }}
          />
        ) : (
          <FormBranchComponent
            onSubmit={(data: any) => {
              if (isEdit) {
                dispatch(redux.actions.updateBranch(data));
              } else {
                dispatch(redux.actions.addBranch(data));
              }
            }}
          />
        )}
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Master Customer</span>
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
                        entry.kode_toko?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.nama_toko?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.alamat?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.alamat_korespondensi
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.kota?.toUpperCase().includes(currValue?.toUpperCase())
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
                  className='btn btn-sm btn-light-warning'
                  style={{ marginRight: '5px' }}
                  onClick={() => handleClickStore()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Store
                </button>
                <button
                  type='button'
                  className='btn btn-sm btn-light-primary'
                  onClick={() => handleClickBranch()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Branch
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

export default connector(CustomerPage);
