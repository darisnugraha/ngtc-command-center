import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import AddDiscountValidation from '../validasi/AddDiscountValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.discount.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.discount.feedbackID._id,
        discount_code: state.discount.feedbackID.kode_diskon,
        discount_name: state.discount.feedbackID.nama_diskon,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormDiscountComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit: any = useSelector<RootState>(({ discount }) => discount.isEdit);
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='discount_code'
            type='text'
            component={RenderField}
            label='Discount Code'
            placeHolder='Insert Discount Code'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='discount_name'
            type='text'
            component={RenderField}
            label='Discount Name'
            placeHolder='Insert Discount Name'
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
  form: 'FormDiscountComponent',
  touchOnChange: true,
  validate: AddDiscountValidation,
})(FormDiscountComponent);
export default connect(mapState, null)(form);
