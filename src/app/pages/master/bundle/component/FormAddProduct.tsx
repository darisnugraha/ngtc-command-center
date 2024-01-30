import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask } from '../../../../../setup/function.js';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddProductValidation from '../validasi/AddProductValidation';
import * as redux from '../redux/BundleRedux';
import SubmitButton from '../../../../modules/button';

interface Props {}

const FormAddProductComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const dataTypeProduct: any = [
    {
      value: 'SOFTWARE',
      label: 'SOFTWARE',
    },
    {
      value: 'HARDWARE',
      label: 'HARDWARE',
    },
    {
      value: 'CONSUMABLE',
      label: 'CONSUMABLE',
    },
  ];
  const dataProduct: any = useSelector<RootState>(({ bundle }) => bundle.feedbackProduct);
  const disable = true;

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(redux.actions.addProduct());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-12'>
          <Field
            name='product_type'
            type='text'
            component={RenderFieldSelect}
            options={dataTypeProduct}
            label='Product Type'
            placeHolder='Select Product Type'
            onChange={(e: any) => {
              dispatch(redux.actions.handleGetproduct(e.value));
            }}
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='product_code'
            type='text'
            component={RenderFieldSelect}
            options={dataProduct.map((element: any) => {
              return {
                value: element.kode_produk,
                label: element.nama_produk,
              };
            })}
            label='Product Name'
            placeHolder='Select Product Name'
            onChange={(e: any) => {
              dispatch(redux.actions.handleGetDetailProduct(e.value));
            }}
          />
        </div>
        <div className='col-lg-6 d-none'>
          <Field
            readOnly
            isEdit={disable}
            name='product_name'
            type='text'
            component={RenderField}
            label='Product Name'
            placeHolder='Insert Product Name'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly
            isEdit={disable}
            name='type'
            type='text'
            component={RenderField}
            label='Type'
            placeHolder='Insert Type'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly
            isEdit={disable}
            name='unit'
            type='text'
            component={RenderField}
            label='Unit'
            placeHolder='Insert Unit'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='qty'
            type='number'
            component={RenderField}
            label='Quantity'
            placeHolder='Insert Quantity'
            onChange={(e: any) => {
              dispatch(redux.actions.handleChangeQty(e.target.value));
            }}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly
            isEdit={disable}
            name='price'
            type='text'
            component={RenderField}
            label='Price'
            placeHolder='Insert Price'
            {...currencyMask}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly
            isEdit={disable}
            name='sub_total'
            type='text'
            component={RenderField}
            label='Sub Total'
            placeHolder='Sub Total'
            {...currencyMask}
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Add Data' imagePath='' handleClick={handleClick} />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormAddProductComponent',
  touchOnChange: true,
  validate: AddProductValidation,
})(FormAddProductComponent);
export default connect()(form);
