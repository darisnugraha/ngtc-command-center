import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';

import { currencyMask, NumberOnly } from '../../../../../setup/function.js';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import AddDiscountValidation from '../validasi/AddDiscountValidation';
import * as redux from '../redux/AddOrderConfirmationRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {},
  };
};

const FormAddDiscountManual: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;

  useEffect(() => {
    dispatch(redux.actions.discountManual());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-4'>
          <Field
            name='sub_total'
            type='text'
            component={RenderField}
            label='Sub Total'
            placeHolder='Insert Sub Total'
            {...currencyMask}
            isEdit
            readOnly
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='manual_discount'
            type='text'
            component={RenderField}
            label='Manual Discount'
            placeHolder='Insert Manual Discount'
            {...currencyMask}
            isEdit={false}
            readOnly={false}
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
            label='Grand Total'
            placeHolder='Insert Grand Total'
            {...currencyMask}
            isEdit
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'FormAddDiscountManual',
  touchOnChange: true,
  validate: AddDiscountValidation,
})(FormAddDiscountManual);
export default connect(mapState, null)(form);
