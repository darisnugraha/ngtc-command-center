import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { currencyMask } from '../../../../../setup/function.js';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as redux from '../redux/ListOCRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormEditProduct: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();

  const typeOC = useSelector<RootState>(
    ({ listorderconfirmation }) => listorderconfirmation.typeOC
  );

  const dataProductType = [
    { value: 'PACKAGE', label: 'PACKAGE' },
    { value: 'SOFTWARE', label: 'SOFTWARE' },
    { value: 'HARDWARE', label: 'HARDWARE' },
    { value: 'CONSUMABLE', label: 'CONSUMABLE' },
  ];

  const dataProductTypeSecond = [
    { value: 'HARDWARE', label: 'HARDWARE' },
    { value: 'CONSUMABLE', label: 'CONSUMABLE' },
  ];

  const dataProduct: any = useSelector<RootState>(
    ({ listorderconfirmation }) => listorderconfirmation.dataProduct
  );

  const typeProduct = 'PACKAGE';

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-4'>
          <Field
            name='product_type'
            type='text'
            component={RenderFieldSelect}
            options={
              // eslint-disable-next-line
              typeOC === 'INCLUDE SOFTWARE'
                ? dataProductType
                : typeOC === 'NOT INCLUDE SOFTWARE'
                ? dataProductTypeSecond
                : []
            }
            label='Product Type'
            placeHolder='Select Product Type'
            onChange={(e: any) => dispatch(redux.actions.setTypeProduct(e.value))}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='product'
            type='text'
            component={RenderFieldSelect}
            options={dataProduct.map((element: any) => {
              const row = {
                value: element.product_code,
                label: element.product_name,
              };
              return row;
            })}
            label='Product'
            placeHolder='Select Product'
            onChange={(e: any) => dispatch(redux.actions.getDetailProduct(e.value))}
          />
        </div>
        <div className='col-lg-2 d-none'>
          <Field
            name='product_name'
            type='text'
            component={RenderField}
            label='Product Name'
            placeHolder='Insert Product Name'
          />
        </div>
        <div className='col-lg-2'>
          <Field
            name='type'
            type='text'
            component={RenderField}
            label='Type'
            placeHolder='Insert Type'
            isEdit={typeProduct === 'PACKAGE'}
            readOnly={typeProduct === 'PACKAGE'}
          />
        </div>
        <div className='col-lg-2'>
          <Field
            isEdit={typeProduct === 'PACKAGE'}
            readOnly={typeProduct === 'PACKAGE'}
            name='qty'
            type='text'
            component={RenderField}
            label='Qty'
            placeHolder='Insert Qty'
          />
        </div>
        <div className='col-lg-2'>
          <Field
            isEdit={typeProduct === 'PACKAGE'}
            readOnly={typeProduct === 'PACKAGE'}
            name='unit'
            type='text'
            component={RenderField}
            label='Unit'
            placeHolder='Insert Unit'
          />
        </div>
        <div className='col-lg-2'>
          <Field
            isEdit={typeProduct === 'PACKAGE'}
            readOnly={typeProduct === 'PACKAGE'}
            name='price'
            type='text'
            component={RenderField}
            label='Price'
            placeHolder='Insert Price'
            {...currencyMask}
          />
        </div>
        <div className='col-lg-2'>
          <Field
            isEdit={typeProduct === 'PACKAGE'}
            readOnly={typeProduct === 'PACKAGE'}
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
          <SubmitButton title='Add Product' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormEditProduct',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormEditProduct);
export default connect(mapState, null)(form);
