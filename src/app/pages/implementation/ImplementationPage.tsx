import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RootState } from '../../../setup';
import GlobalModal from '../../modules/modal/GlobalModal';
import * as modal from '../../modules/modal/GlobalModalRedux';
import { KTSVG } from '../../../_metronic/helpers';
import DefaultTable from '../../modules/custom-table';
import * as redux from './redux/ImplementationRedux';
import * as reduxDivision from '../master/division/redux/DivisionRedux';
import FormImplementation from './component/FormImplementation';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ImplementationPage: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getImplementation());
    dispatch(redux.actions.getOC());
    dispatch(reduxDivision.actions.getDivision());
  }, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ implementation }) => implementation.feedback);

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
      dataField: 'no_implementasi',
      text: 'No Implementation',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
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
                dispatch(redux.actions.getDataImplementationByID(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.deleteImplementation(row._id));
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

  const handleClick = () => {
    dispatch(redux.actions.getStaffLocal());
    dispatch(modal.actions.show());
  };

  const handleClose = () => {
    dispatch(redux.actions.closeModal());
  };

  const isEdit: any = useSelector<RootState>(({ implementation }) => implementation.isEdit);

  return (
    <>
      <GlobalModal
        title={`${isEdit ? 'Edit' : 'Add'} Implementation`}
        onClose={() => handleClose()}
      >
        <FormImplementation
          onSubmit={(data: any) => {
            // eslint-disable-next-line
            dispatch(redux.actions.addImplementation(data));
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Implementation Schedule</span>
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
                />
              </div>
            </div>
            <div className='col-lg-6'>
              <div style={{ float: 'right' }}>
                <button
                  type='button'
                  className='btn btn-sm btn-light-primary'
                  onClick={() => handleClick()}
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Implementation Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* begin::Body */}
      </div>
      <DefaultTable
        className='mb-5 mb-xl-8'
        data={dataTab}
        columns={columns}
        expandRow={expandRow}
      />
    </>
  );
};

export default connector(ImplementationPage);
