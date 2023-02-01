import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import GlobalModal from '../../../modules/modal/GlobalModal';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import FormConsumableComponent from './component/FormConsumableComponent';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import * as redux from './redux/ConsumableRedux';
import * as reduxUnit from '../unit/redux/UnitRedux';
import * as reduxSupplier from '../supplier/redux/SupplierRedux';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConsumablePage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getConsumable());
    dispatch(reduxUnit.actions.getUnit());
    dispatch(reduxSupplier.actions.getSupplier());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ consumable }) => consumable.feedback);
  const [dataSource, setDataSource] = useState(dataTab);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(false);

  // eslint-disable-next-line
  const dataTable = dataSource.length === 0 ? (search ? dataSource : dataTab) : dataSource;

  const columns: ColumnDescription[] = [
    {
      dataField: 'key',
      text: 'No',
      headerClasses: 'ps-4 min-w-100px rounded-start',
      align: 'center',
      formatter: (cell) => {
        return <p className='ps-4 text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'kode_consumable',
      text: 'Consumable Code',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_consumable',
      text: 'Consumable Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'satuan',
      text: 'Unit',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'harga',
      text: 'Price',
      align: 'right',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
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
                dispatch(redux.actions.getConsumableByID(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.deleteConsumable(row._id));
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

  const handleClickConsumable = () => {
    dispatch(modal.actions.show());
  };

  const handleCloseConsumable = () => {
    dispatch(redux.actions.closeModal());
  };

  const isEdit: any = useSelector<RootState>(({ consumable }) => consumable.isEdit);

  return (
    <>
      <GlobalModal
        title={`${isEdit ? 'Edit' : 'Add'} Consumable`}
        onClose={() => handleCloseConsumable()}
      >
        <FormConsumableComponent
          onSubmit={(data: any) => {
            if (isEdit) {
              dispatch(redux.actions.updateConsumable(data));
            } else {
              dispatch(redux.actions.addConsumable(data));
            }
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Master Consumable</span>
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
                        entry.kode_consumable?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.kode_supplier?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.satuan?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.harga?.toString()?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.nama_consumable?.toUpperCase().includes(currValue?.toUpperCase())
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
                  onClick={() => handleClickConsumable()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Consumable
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* begin::Body */}
      </div>
      <DefaultTable className='mb-5 mb-xl-8' data={dataTable} columns={columns} />
    </>
  );
};

export default connector(ConsumablePage);
