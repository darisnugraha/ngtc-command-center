import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import SubmitButton from '../../../modules/button';
import { RenderField, RenderTextArea } from '../../../modules/redux-form/BasicInput';
import { SelectDate } from '../../../modules/redux-form/DatePicker';
import { RenderFieldSelect } from '../../../modules/redux-form/dropdown';
import AddDeliveryNoteValidation from '../validation/DeliveryNoteValidation';
import * as redux from '../redux/DeliveryNoteRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.deliverynote.dataOC !== undefined) {
    return {
      initialValues: {
        date: state.deliverynote.date,
        no_oc: state.deliverynote.dataOC[0].no_order_konfirmasi,
        kode_toko: state.deliverynote.dataOC[0].kode_toko,
        toko: state.deliverynote.dataOC[0].nama_toko,
        kode_cabang: state.deliverynote.dataOC[0].kode_cabang,
        cabang: state.deliverynote.dataOC[0].nama_cabang,
        alamat_cabang: state.deliverynote.dataOC[0].alamat_cabang,
        nama_customer: state.deliverynote.dataOC[0].nama_customer,
        telepon: state.deliverynote.dataOC[0].telepon,
      },
    };
  }
};

const FormDeliveryNote: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const [StartDate, setStartDate] = useState(new Date());
  const bool = true;
  const listOC: any = useSelector<RootState>(({ deliverynote }) => deliverynote.listOC);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6'>
          <Field
            id='date'
            name='date'
            type='date'
            component={SelectDate}
            label='Date'
            placeHolder='Select Date'
            startDate={StartDate}
            onChange={(e: any) => {
              setStartDate(e);
              dispatch(redux.actions.setDate(e));
            }}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='no_oc'
            type='text'
            component={RenderFieldSelect}
            options={listOC.map((element: any) => {
              return {
                value: element.no_order_konfirmasi,
                label: element.no_order_konfirmasi,
              };
            })}
            label='No OC'
            placeHolder='Select No OC'
            onChange={(e: any) => {
              dispatch(redux.actions.getDataOC(e.value));
            }}
          />
        </div>
        <div className='col-lg-6 d-none'>
          <Field
            name='kode_toko'
            type='text'
            component={RenderField}
            label='Store'
            placeHolder='Insert Store'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='toko'
            type='text'
            component={RenderField}
            label='Store'
            placeHolder='Insert Store'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6 d-none'>
          <Field
            name='kode_cabang'
            type='text'
            component={RenderField}
            label='Branch'
            placeHolder='Insert Branch'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='cabang'
            type='text'
            component={RenderField}
            label='Branch'
            placeHolder='Insert Branch'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='alamat_cabang'
            type='textarea'
            component={RenderTextArea}
            label='Address'
            placeHolder='Insert Address'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='nama_customer'
            type='text'
            component={RenderField}
            label='Customer Name'
            placeHolder='Insert Customer Name'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='telepon'
            type='text'
            component={RenderField}
            label='Telephone'
            placeHolder='Insert Telephone'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Add Data' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormDeliveryNote',
  touchOnChange: true,
  validate: AddDeliveryNoteValidation,
})(FormDeliveryNote);
export default connect(mapState, null)(form);
