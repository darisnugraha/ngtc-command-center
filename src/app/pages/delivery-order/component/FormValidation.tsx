import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import { RenderField } from '../../../modules/redux-form/BasicInput';
import SendProductValidation from '../validation/SendProductValidation';
import * as redux from '../redux/DeliveryNoteRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormValidation: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  // eslint-disable-next-line
  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-4 d-none'>
          <Field
            name='no_surat_jalan'
            type='text'
            label='No Surat Jalan'
            component={RenderField}
            className='form-item-group'
            placeholder='Masukkan No Surat Jalan'
          />
        </div>
        <div className='col-lg-4'>
          {' '}
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.validation('CANCELLED'));
            }}
            className='btn btn-danger btn-sm me-1'
          >
            Cancel
          </button>
        </div>
        <div className='col-lg-4'>
          {' '}
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.validation('LOST'));
            }}
            className='btn btn-warning btn-sm me-1'
          >
            Lost
          </button>
        </div>
        <div className='col-lg-4'>
          {' '}
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.validation('ACCEPTED'));
            }}
            className='btn btn-success btn-sm me-1'
          >
            Accept
          </button>
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormValidation',
  touchOnChange: true,
  validate: SendProductValidation,
})(FormValidation);
export default connect(mapState, null)(form);
