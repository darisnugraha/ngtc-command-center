import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import { RenderField } from '../../../modules/redux-form/BasicInput';
import * as redux from '../redux/DeliveryNoteRedux';

interface Props {}

const TableDeliveryNote: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ deliverynote }) => deliverynote.dataProduct);

  const bool = true;

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
      dataField: 'nama_produk',
      text: 'Send Qty',
      align: 'center',
      formatter: (cell) => {
        return (
          <Field
            name={`qty_kirim_${cell}`}
            type='text'
            component={RenderField}
            placeHolder='Insert Send Qty'
            onChange={(e: any) => {
              dispatch(redux.actions.countQty(e.target.value, cell, dataTab));
            }}
          />
        );
      },
    },
    {
      dataField: 'nama_produk',
      text: 'Rest Of Qty',
      align: 'center',
      formatter: (cell) => {
        return (
          <Field
            isEdit={bool}
            readOnly={bool}
            name={`qty_sisa_${cell}`}
            type='text'
            component={RenderField}
            placeHolder='Insert Rest Of Qty'
          />
        );
      },
    },
  ];

  return (
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
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormDetailDeliveryNote',
  touchOnChange: true,
  //   validate: AddDeliveryNoteValidation,
})(TableDeliveryNote);
export default connect(null, null)(form);
