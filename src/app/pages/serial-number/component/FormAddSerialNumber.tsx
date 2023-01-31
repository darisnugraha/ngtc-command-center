import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import SubmitButton from '../../../modules/button';
import { RenderField } from '../../../modules/redux-form/BasicInput';
// eslint-disable-next-line
import * as redux from '../redux/SerialNumberRedux';

interface Props {}
// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormAddSerialNumber: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  // eslint-disable-next-line
  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-12 d-none'>
          <Field
            name='no_invoice'
            type='text'
            component={RenderField}
            label='No Invoice'
            placeHolder='Insert No Invoice'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='serial_number'
            type='text'
            component={RenderField}
            label='Serial Number'
            placeHolder='Insert Serial Number'
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
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormAddSerialNumber',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormAddSerialNumber);
export default connect(mapState, null)(form);
