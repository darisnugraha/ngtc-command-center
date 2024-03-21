import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, change, reduxForm } from 'redux-form';
import { NumberOnly, currencyMask } from '../../../../../setup/function.js';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
// import * as redux from '../redux/ListOCRedux';
import * as reduxDiscount from '../../../master/discount/redux/DiscountRedux';
import * as redux from '../redux/ListOCRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormEditDiskon: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reduxDiscount.actions.getDiscount());
  }, [dispatch]);

  const dataDiscount: any = useSelector<RootState>(({ discount }) => discount.feedback);
  const [diskonType, setDiskonType] = useState('');
  const [diskonVal, setDiskonVal] = useState(0);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
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
              dispatch(change('FormEditDiskon', 'discount_name', e.label));
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
              dispatch(redux.actions.calculateGlobalDiscount(NumberOnly(e.target.value), true));
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
              dispatch(redux.actions.calculateGlobalDiscount(NumberOnly(e.target.value), false));
            }}
          />
        </div>
        <div className='col-lg-2 '>
          <Field
            name='nominal_discount'
            type='text'
            component={RenderField}
            label='Discount Rp'
            placeHolder='Insert Discount Rp'
            {...currencyMask}
          />
        </div>
        <div className='col-lg-4 '>
          <Field
            name='final_price_before_discount'
            type='text'
            component={RenderField}
            label='Total Before Discount'
            placeHolder='Insert Total Before Discount'
            {...currencyMask}
            isEdit={false}
            readOnly={false}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='final_price_after_discount'
            type='text'
            component={RenderField}
            label='Total After Discount'
            placeHolder='Insert Total After Discount'
            {...currencyMask}
            isEdit={false}
            readOnly={false}
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Add Diskon' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormEditDiskon',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormEditDiskon);
export default connect(mapState, null)(form);
