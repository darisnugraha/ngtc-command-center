import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { normalizeAlphaWithUpper, upper } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import AddUnitValidation from '../validasi/AddUnitValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.unit.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.unit.feedbackID._id,
        unit_code: state.unit.feedbackID.kode_satuan,
        unit_name: state.unit.feedbackID.nama_satuan,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormUnitComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit: any = useSelector<RootState>(({ unit }) => unit.isEdit);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6 d-none'>
          <Field
            name='id'
            type='text'
            component={RenderField}
            label='Unit ID'
            placeHolder='Insert Unit ID'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='unit_code'
            type='text'
            component={RenderField}
            label='Unit Code'
            placeHolder='Insert Unit Code'
            normalize={normalizeAlphaWithUpper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='unit_name'
            type='text'
            component={RenderField}
            label='Unit Name'
            placeHolder='Insert Unit Name'
            normalize={upper}
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
  form: 'FormUnitComponent',
  touchOnChange: true,
  validate: AddUnitValidation,
})(FormUnitComponent);
export default connect(mapState, null)(form);
