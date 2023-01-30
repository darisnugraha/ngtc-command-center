import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddUserValidation from '../validasi/AddUserValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.user.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.user.feedbackID._id,
        user_id: state.user.feedbackID.user_id,
        user_name: state.user.feedbackID.user_name,
        password: '-',
        level: state.user.feedbackID.level,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormUserComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit = useSelector<RootState>(({ user }) => user.isEdit);
  const dataEdit: any = useSelector<RootState>(({ user }) => user.feedbackID);
  const defaultLevel = [{ value: dataEdit?.level, label: dataEdit?.level }];
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12'>
          <Field
            name='user_id'
            type='text'
            component={RenderField}
            label='User Id'
            placeHolder='Insert User Id'
            isEdit={isEdit}
            readOnly={isEdit}
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='user_name'
            type='text'
            component={RenderField}
            label='User Name'
            placeHolder='Insert User Name'
          />
        </div>
        <div className={isEdit ? ' col-lg-12 d-none' : 'col-lg-12'}>
          <Field
            name='password'
            type='text'
            component={RenderField}
            label='Password'
            placeHolder='Insert Password'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='level'
            type='text'
            component={RenderFieldSelect}
            options={[
              {
                value: 'OWNER',
                label: 'OWNER',
              },
              {
                value: 'MANAGER',
                label: 'MANAGER',
              },
              {
                value: 'STAFF',
                label: 'STAFF',
              },
            ]}
            label='Level'
            placeHolder='Insert Level'
            defaultValue={isEdit ? defaultLevel : ''}
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
  form: 'FormUserComponent',
  touchOnChange: true,
  validate: AddUserValidation,
})(FormUserComponent);
export default connect(mapState, null)(form);
