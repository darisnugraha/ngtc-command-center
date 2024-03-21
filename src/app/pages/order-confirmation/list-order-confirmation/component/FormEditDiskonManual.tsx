import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { currencyMask, NumberOnly } from '../../../../../setup/function.js';
import { RootState } from '../../../../../setup/index.js';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import * as redux from '../redux/ListOCRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormEditDiskonManual: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(redux.actions.getDiscountManual());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-4'>
          <Field
            name='sub_total'
            type='text'
            component={RenderField}
            label='Sub Total'
            placeHolder='Insert Sub Total'
            readOnly
            {...currencyMask}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='discount_manual'
            type='text'
            component={RenderField}
            label='Sub Total'
            placeHolder='Insert Sub Total'
            {...currencyMask}
            onChange={(e: any) => {
              dispatch(redux.actions.changeDiscountManual(NumberOnly(e.target.value)));
            }}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='grand_total'
            type='text'
            component={RenderField}
            label='Discount Rp'
            placeHolder='Insert Discount Rp'
            {...currencyMask}
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormEditDiskonManual',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormEditDiskonManual);
export default connect(mapState, null)(form);
