import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import GlobalModal from '../../../modules/modal/GlobalModal';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as redux from './redux/ProductionServiceRedux';
import * as reduxStore from '../../master/customer/redux/CustomerRedux';
import * as reduxUnit from '../../master/unit/redux/UnitRedux';
import FormProductionService from './component/FormProductionService';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ProductionServicePage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getProductionService());
    dispatch(reduxStore.actions.getStore());
    dispatch(reduxUnit.actions.getUnit());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(
    ({ productionservice }) => productionservice.feedback
  );
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
      dataField: 'no_production_service',
      text: 'Production Service Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_production_service',
      text: 'Production Service Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
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
      dataField: 'kode_cabang',
      text: 'Branch Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'qty',
      text: 'Qty',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_satuan',
      text: 'Unit',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'total_harga',
      text: 'Subtotal',
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
                dispatch(redux.actions.getProductionServiceByID(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.deleteProductionService(row._id));
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

  const handleClickProductionService = () => {
    dispatch(modal.actions.show());
  };

  const handleCloseProductionService = () => {
    dispatch(redux.actions.closeModal());
  };

  const isEdit: any = useSelector<RootState>(({ productionservice }) => productionservice.isEdit);

  const dataExpand: any = useSelector<RootState>(
    ({ productionservice }) => productionservice.inquiryDetail
  );

  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: true,
    // eslint-disable-next-line
    renderer: (row: any, rowIndex: any) => {
      const columExpand: ColumnDescription[] = [
        {
          dataField: 'fitur',
          text: 'Feature',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
          footerAlign: 'center',
          footer: () => {
            return '';
          },
        },
        {
          dataField: 'revisi',
          text: 'Revision',
          align: 'center',
          headerClasses: 'ps-4 min-w-100px rounded-start',
          formatter: (cell) => {
            return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
          footerAlign: 'center',
          footer: () => {
            return '';
          },
        },
        {
          dataField: 'detail',
          text: 'Detail',
          align: 'center',
          formatter: (cell) => {
            return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
          footerAlign: 'center',
          footerStyle: { fontWeight: 'bold' },
          footer: () => {
            return 'QC';
          },
        },
        {
          dataField: 'lama_pengerjaan',
          text: 'Processing Time',
          align: 'center',
          formatter: (cell) => {
            return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
          },
          footerAlign: 'center',
          footer: () => {
            return row.inquiry.qc;
          },
        },
      ];
      return (
        <BootstrapTable
          keyField='_id'
          columns={columExpand}
          data={dataExpand}
          wrapperClasses='table-responsive'
          classes='table align-middle gs-0 gy-2'
          headerClasses='fw-bolder text-center'
          noDataIndication={() => {
            return <span>No Data</span>;
          }}
        />
      );
    },
    // eslint-disable-next-line
    onExpand: (row: any, isExpand: any, rowIndex: any, e: any) => {
      dispatch(redux.actions.getDetailInquiry(row.inquiry.no_inquiry));
    },
  };

  return (
    <>
      <GlobalModal
        title={`${isEdit ? 'Edit' : 'Add'} Production Service`}
        onClose={() => handleCloseProductionService()}
      >
        <FormProductionService
          onSubmit={(data: any) => {
            if (isEdit) {
              dispatch(redux.actions.updateProductionService(data));
            } else {
              dispatch(redux.actions.addProductionService(data));
            }
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>List Production Service</span>
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
                        entry.nama_production_service
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.no_production_service
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.kode_toko?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.kode_satuan?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.tanggal?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.qty?.toString()?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.harga?.toString()?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.total_harga
                          ?.toString()
                          ?.toUpperCase()
                          .includes(currValue?.toUpperCase()) ||
                        entry.kode_cabang?.toUpperCase().includes(currValue?.toUpperCase())
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
                  onClick={() => handleClickProductionService()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Production Service
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

export default connector(ProductionServicePage);
