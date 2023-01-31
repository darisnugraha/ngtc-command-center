import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import { RenderField } from '../../../modules/redux-form/BasicInput';
import TableDeliveryNote from './TableSerialNumber';

interface Props {}
// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormDetailSerialNumber: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
      </div>
      <div className='col-lg-12'>
        <TableDeliveryNote />
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormDetailSerialNumber',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormDetailSerialNumber);
export default connect(mapState, null)(form);
