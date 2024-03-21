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
const mapState = (state: RootState) => {};

const FormAddProductOC: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const dataDiscount: any = useSelector<RootState>(({ discount }) => discount.feedback);
  const [diskonType, setDiskonType] = useState('');
  const [diskonVal, setDiskonVal] = useState(0);
  const dataOCType = [
    { value: 'INCLUDE SOFTWARE', label: 'INCLUDE SOFTWARE' },
    { value: 'NOT INCLUDE SOFTWARE', label: 'NOT INCLUDE SOFTWARE' },
  ];

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

  const typeOC = useSelector<RootState>(({ addorderconfirmation }) => addorderconfirmation.typeOC);

  const defaultType = [];
  if (typeOC !== undefined) {
    defaultType.push({ value: typeOC, label: typeOC });
  }

  const dataProduct: any = useSelector<RootState>(
    ({ addorderconfirmation }) => addorderconfirmation.dataProduct
  );

  const typeProduct = useSelector<RootState>(
    ({ addorderconfirmation }) => addorderconfirmation.typeProduct
  );

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
            name='oc_type'
            type='text'
            component={RenderFieldSelect}
            options={dataOCType}
            label='OC Type'
            placeHolder='Select OC Type'
            onChange={(e: any) => dispatch(redux.actions.setTypeOC(e.value))}
            defaultValue={typeOC !== undefined ? defaultType : ''}
          />
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
            onChange={(e: any) => dispatch(redux.actions.getProduct(e.value))}
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
        <div className='col-lg-2 d-none'>
          <Field
            name='type'
            type='text'
            component={RenderField}
            label='Type'
            placeHolder='Insert Type'
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
            onChange={(e: any) => {
              dispatch(redux.actions.setSubTotal(e.target.value));
            }}
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
            onChange={(e: any) => dispatch(redux.actions.setSubTotalRp(e.target.value))}
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
        <div className='col-lg-4' />
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
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
              dispatch(change('FormAddProductOC', 'discount_name', e.label));
            }}
          />
        </div>
        <div className='col-lg-2 d-none'>
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
  forceUnregisterOnUnmount: true,
  form: 'FormAddProductOC',
  touchOnChange: true,
  validate: AddProductValidation,
})(FormAddProductOC);
export default connect(mapState, null)(form);
