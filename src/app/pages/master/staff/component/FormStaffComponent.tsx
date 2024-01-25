import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { normalizeAlphaWithUpper, upper } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddStaffValidation from '../validasi/AddStaffValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.staff.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.staff.feedbackID._id,
        staff_code: state.staff.feedbackID.kode_staff,
        staff_name: state.staff.feedbackID.nama_staff,
        telephone: state.staff.feedbackID.telepon,
        division: state.staff.feedbackID.kode_divisi,
        bank: state.staff.feedbackID.nama_bank,
        account_number: state.staff.feedbackID.no_rekening,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormStaffComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit: any = useSelector<RootState>(({ staff }) => staff.isEdit);
  const dataEdit: any = useSelector<RootState>(({ staff }) => staff.feedbackID);
  const dataDivision: any = useSelector<RootState>(({ division }) => division.feedback);
  const defaultDivision = [{ value: dataEdit?.kode_divisi, label: dataEdit?.kode_divisi }];
  const defaultBank = [{ value: dataEdit?.nama_bank, label: dataEdit?.nama_bank }];

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='staff_code'
            type='text'
            component={RenderField}
            label='Staff Code'
            placeHolder='Insert Staff Code'
            normalize={normalizeAlphaWithUpper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='staff_name'
            type='text'
            component={RenderField}
            label='Staff Name'
            placeHolder='Insert Staff Name'
            normalize={upper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='telephone'
            type='text'
            component={RenderField}
            label='Telephone'
            placeHolder='Insert Telephone'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='division'
            type='text'
            component={RenderFieldSelect}
            options={dataDivision.map((element: any) => {
              return {
                value: element.kode_divisi,
                label: element.nama_divisi,
              };
            })}
            label='Division'
            placeHolder='Insert Division'
            defaultValue={isEdit ? defaultDivision : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='bank'
            type='text'
            component={RenderFieldSelect}
            options={[
              {
                value: 'BCA',
                label: 'BCA',
              },
              {
                value: 'BRI',
                label: 'BRI',
              },
            ]}
            label='Bank'
            placeHolder='Insert Bank'
            defaultValue={isEdit ? defaultBank : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='account_number'
            type='text'
            component={RenderField}
            label='Account Number'
            placeHolder='Insert Account Number'
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
  form: 'FormStaffComponent',
  touchOnChange: true,
  validate: AddStaffValidation,
})(FormStaffComponent);
export default connect(mapState, null)(form);
