import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import * as redux from '../redux/AddOrderConfirmationRedux';
import AddProductValidation from '../validasi/AddProductValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormEditProduct: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const bool = true;

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-4'>
          <Field
            name='product_code'
            type='text'
            component={RenderField}
            label='Product Name'
            placeHolder='Insert Product Name'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='product_name'
            type='text'
            component={RenderField}
            label='Product Name'
            placeHolder='Insert Product Name'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='product_type'
            type='text'
            component={RenderField}
            label='Product Type'
            placeHolder='Insert Product Type'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='qty'
            type='text'
            component={RenderField}
            label='Qty'
            placeHolder='Insert Qty'
            onChange={(e: any) => {
              dispatch(redux.actions.setSubTotalEdit(e.target.value));
            }}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='unit'
            type='text'
            component={RenderField}
            label='Unit'
            placeHolder='Insert Unit'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='price'
            type='text'
            component={RenderField}
            label='Price'
            placeHolder='Insert Price'
            {...currencyMask}
            onChange={(e: any) => dispatch(redux.actions.setSubTotalRpEdit(e.target.value))}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='sub_total'
            type='text'
            component={RenderField}
            label='Sub Total'
            placeHolder='Insert Sub Total'
            {...currencyMask}
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          {/* <SubmitButton title='Add Data' imagePath='' disable={typeProductList === 'true'} /> */}
          <SubmitButton title='Add Data' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'FormEditProduct',
  touchOnChange: true,
  validate: AddProductValidation,
})(FormEditProduct);
export default connect(mapState, null)(form);
