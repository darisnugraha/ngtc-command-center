import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import AddDivisionValidation from '../validasi/AddDivisionValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.division.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.division.feedbackID._id,
        division_code: state.division.feedbackID.kode_divisi,
        division_name: state.division.feedbackID.nama_divisi,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormDivisionComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit: any = useSelector<RootState>(({ division }) => division.isEdit);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='division_code'
            type='text'
            component={RenderField}
            label='Division Code'
            placeHolder='Insert Division Code'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='division_name'
            type='text'
            component={RenderField}
            label='Division Name'
            placeHolder='Insert Division Name'
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
  form: 'FormDivisionComponent',
  touchOnChange: true,
  validate: AddDivisionValidation,
})(FormDivisionComponent);
export default connect(mapState, null)(form);
