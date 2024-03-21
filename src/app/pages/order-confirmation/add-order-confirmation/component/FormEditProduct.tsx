import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { change, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask, NumberOnly } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as redux from '../redux/AddOrderConfirmationRedux';
import AddProductValidation from '../validasi/AddProductValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.listorderconfirmation.editProduct !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        product_code: state.listorderconfirmation.editProduct.product_code,
        product_name: state.listorderconfirmation.editProduct.product_name,
        product_type: state.listorderconfirmation.editProduct.product_type,
        qty: state.listorderconfirmation.editProduct.qty,
        unit: state.listorderconfirmation.editProduct.unit,
        price: state.listorderconfirmation.editProduct.price,
        sub_total: state.listorderconfirmation.editProduct.sub_total,
        discount_code: state.listorderconfirmation.editProduct.discount_code,
        discount_name: state.listorderconfirmation.editProduct.discount_name,
        discount_percentage: state.listorderconfirmation.editProduct.discount_percentage,
        sub_total_diskon: state.listorderconfirmation.editProduct.sub_total_diskon,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormEditProduct: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const bool = true;
  const dataDiscount: any = useSelector<RootState>(({ discount }) => discount.feedback);
  const [diskonType, setDiskonType] = useState('');
  const [diskonVal, setDiskonVal] = useState(0);

  function calculateDiscount(value: number, isPersentage: boolean = false) {
    dispatch(redux.actions.calculateDiscount(value, isPersentage));
  }

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
        <div className='col-lg-4'>
          <Field
            name='discount_code'
            type='text'
            component={RenderFieldSelect}
            options={dataDiscount.map((element: any) => {
              const row = {
                value: element.kode_diskon,
                label: element.nama_diskon,
              };
              return row;
            })}
            label='Discount Name'
            placeHolder='Select Discount Name'
            onChange={(e: any) => {
              dispatch(change('FormEditProduct', 'discount_name', e.label));
            }}
          />
        </div>
        <div className='col-lg-2'>
          <Field
            name='discount_name'
            type='text'
            component={RenderField}
            label='Discount Name'
            placeHolder='Insert Discount Name'
          />
        </div>
        <div className='col-lg-2'>
          <Field
            name='discount_percentage'
            type='text'
            component={RenderField}
            label='Discount %'
            placeHolder='Insert Discount %'
            isEdit={diskonType === 'RP' && diskonVal > 0}
            readOnly={diskonType === 'RP' && diskonVal > 0}
            onChange={(e: any) => {
              setDiskonType('PERCENTAGE');
              setDiskonVal(e.target.value);
              calculateDiscount(NumberOnly(e.target.value), true);
            }}
          />
        </div>
        <div className='col-lg-2'>
          <Field
            name='discount_rp'
            type='text'
            component={RenderField}
            label='Discount Rp'
            placeHolder='Insert Discount Rp'
            {...currencyMask}
            isEdit={diskonType === 'PERCENTAGE' && diskonVal > 0}
            readOnly={diskonType === 'PERCENTAGE' && diskonVal > 0}
            onChange={(e: any) => {
              setDiskonType('RP');
              setDiskonVal(NumberOnly(e.target.value));
              calculateDiscount(NumberOnly(e.target.value), false);
            }}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='sub_total_diskon'
            type='text'
            component={RenderField}
            label='Total Discount'
            {...currencyMask}
            isEdit={false}
            readOnly={false}
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
  form: 'FormEditProduct',
  touchOnChange: true,
  validate: AddProductValidation,
})(FormEditProduct);
export default connect(mapState, null)(form);
