import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../../setup';
import GlobalModal from '../../../modules/modal/GlobalModal';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import FormBankComponent from './component/FormBankComponent';
import { KTSVG } from '../../../../_metronic/helpers';
import DefaultTable from '../../../modules/custom-table';
import * as redux from './redux/BankRedux';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const BankPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getBank());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ bank }) => bank.feedback);
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
      dataField: 'nama_bank',
      text: 'Bank Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'no_rekening',
      text: 'Account Number',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_nasabah',
      text: 'Account Name',
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
      formatter: (cell, row) => {
        return (
          <>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.getBankByID(row._id));
              }}
              className='btn btn-icon btn-active-color-dark btn-color-warning btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.deleteBank(row._id));
              }}
              className='btn btn-icon btn-active-color-dark btn-color-danger btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ];

  const handleClickBank = () => {
    dispatch(modal.actions.show());
  };

  const handleCloseBank = () => {
    dispatch(redux.actions.closeModal());
  };

  const isEdit: any = useSelector<RootState>(({ bank }) => bank.isEdit);

  return (
    <>
      <GlobalModal title={`${isEdit ? 'Edit' : 'Add'} Bank`} onClose={() => handleCloseBank()}>
        <FormBankComponent
          onSubmit={(data: any) => {
            if (isEdit) {
              dispatch(redux.actions.updateBank(data));
            } else {
              dispatch(redux.actions.addBank(data));
            }
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Master Bank</span>
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
                        entry.nama_bank?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.no_rekening?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.kode_bank?.toUpperCase().includes(currValue?.toUpperCase()) ||
                        entry.nama_nasabah?.toUpperCase().includes(currValue?.toUpperCase())
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
                  onClick={() => handleClickBank()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Bank
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

export default connector(BankPage);
