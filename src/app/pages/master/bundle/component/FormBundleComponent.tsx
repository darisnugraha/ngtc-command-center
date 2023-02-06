import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { upper } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import AddBundleValidation from '../validasi/AddBundleValidation';
import TableBundleComponent from './TableBundleComponent';

interface Props {}

const FormBundleComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit = useSelector<RootState>(({ bundle }) => bundle.isEdit);
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            name='bundle_code'
            type='text'
            component={RenderField}
            label='Bundle Code'
            placeHolder='Insert Bundle Code'
            isEdit={isEdit}
            readOnly={isEdit}
            normalize={upper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='bundle_name'
            type='text'
            component={RenderField}
            label='Bundle Name'
            placeHolder='Insert Bundle Name'
            normalize={upper}
          />
        </div>
        <div className='col-lg-12'>
          <TableBundleComponent />
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
  form: 'FormBundleComponent',
  touchOnChange: true,
  validate: AddBundleValidation,
})(FormBundleComponent);
export default connect()(form);
