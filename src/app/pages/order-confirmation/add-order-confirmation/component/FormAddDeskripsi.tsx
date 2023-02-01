import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderTextArea } from '../../../../modules/redux-form/BasicInput';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {},
  };
};

const FormAddDescription: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12'>
          <Field
            name='description_header'
            type='textarea'
            component={RenderTextArea}
            label='Description Header'
            placeHolder='Insert Description Header'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='description_footer'
            type='textarea'
            component={RenderTextArea}
            label='Description Footer'
            placeHolder='Insert Description Footer'
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
  form: 'FormAddDescription',
  touchOnChange: true,
  //   validate: AddBankValidation,
})(FormAddDescription);
export default connect(mapState, null)(form);
