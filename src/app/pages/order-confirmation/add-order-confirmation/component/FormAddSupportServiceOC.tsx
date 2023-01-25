import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as redux from '../redux/AddOrderConfirmationServiceRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.addorderconfirmationservice.supportData !== undefined) {
    return {
      initialValues: {
        no_support_service: state.addorderconfirmationservice.supportData.no_support_service,
        support_service_name: state.addorderconfirmationservice.supportData.nama_support_service,
        price: state.addorderconfirmationservice.supportData.harga,
        qty: state.addorderconfirmationservice.supportData.qty,
        unit: state.addorderconfirmationservice.supportData.kode_satuan,
        total_price: state.addorderconfirmationservice.supportData.total_harga,
      },
    };
  }
};

const FormAddSupportServiceOC: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const disable = true;
  // eslint-disable-next-line
  const dataSupport: any =
    useSelector<RootState>(
      ({ addorderconfirmationservice }) => addorderconfirmationservice.feedback
    ) || [];

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-4'>
          <Field
            name='no_support_service'
            type='text'
            component={RenderFieldSelect}
            options={dataSupport.map((element: any) => {
              const row = {
                value: element.no_support_service,
                label: element.no_support_service,
              };
              return row;
            })}
            label='No Support Service'
            placeHolder='Select No Support Service'
            onChange={(e: any) => {
              dispatch(redux.actions.getSupportDetail(e.value));
            }}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='support_service_name'
            type='text'
            component={RenderField}
            label='Support Service Name'
            placeHolder='Insert Support Service Name'
            readOnly={disable}
            isEdit={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='price'
            type='text'
            component={RenderField}
            label='Price'
            placeHolder='Insert Price'
            readOnly={disable}
            isEdit={disable}
            {...currencyMask}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='qty'
            type='text'
            component={RenderField}
            label='Qty'
            placeHolder='Insert Qty'
            readOnly={disable}
            isEdit={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='unit'
            type='text'
            component={RenderField}
            label='Unit'
            placeHolder='Insert Unit'
            readOnly={disable}
            isEdit={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='total_price'
            type='text'
            component={RenderField}
            label='Total Price'
            placeHolder='Insert Total Price'
            readOnly={disable}
            isEdit={disable}
            {...currencyMask}
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'FormAddSupportServiceOC',
  touchOnChange: true,
  //   validate: AddBankValidation,
})(FormAddSupportServiceOC);
export default connect(mapState, null)(form);
