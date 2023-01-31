import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import * as redux from '../redux/SerialNumberRedux';
import { KTSVG } from '../../../../_metronic/helpers';
import ModalSecond from '../../../modules/modal/ModalSecond';
import * as modal from '../../../modules/modal/ModalSecondRedux';
import FormAddSerialNumber from './FormAddSerialNumber';

interface Props {}

const TableSerialNumber: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ serialnumber }) => serialnumber.feedbackNo);

  const columns: ColumnDescription[] = [
    {
      dataField: 'jenis_produk',
      text: 'Product Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_produk',
      text: 'Product Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'type',
      text: 'Type',
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
      dataField: '',
      text: 'Add Serial Number',
      align: 'center',
      formatter: (cell, row) => {
        return (
          <button
            type='button'
            onClick={() => {
              // eslint-disable-next-line
              dispatch(redux.actions.showModalAddSerialNumber(row._id, row.serial_number));
            }}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </button>
        );
      },
    },
  ];

  const handleClose = () => {
    dispatch(modal.actions.hide());
  };

  return (
    <>
      <ModalSecond title='Add Serial Number' onClose={() => handleClose()}>
        <FormAddSerialNumber
          onSubmit={(data: any) => {
            dispatch(redux.actions.postSerialNumber(data));
          }}
        />
      </ModalSecond>
      <form onSubmit={handleSubmit}>
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
      </form>
    </>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormDetailSerialNumber',
  touchOnChange: true,
  //   validate: AddDeliveryNoteValidation,
})(TableSerialNumber);
export default connect(null, null)(form);
