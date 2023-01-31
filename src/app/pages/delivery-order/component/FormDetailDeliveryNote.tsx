import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import SubmitButton from '../../../modules/button';
import { RenderField, RenderTextArea } from '../../../modules/redux-form/BasicInput';
import * as redux from '../redux/DeliveryNoteRedux';
import TableDeliveryNote from './TableDeliveryNote';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormDetailDeliveryNote: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();

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
      <div className='col-lg-12'>
        <Field
          name='keterangan'
          type='textarea'
          component={RenderTextArea}
          label='Description'
          placeHolder='Insert Description'
        />
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.setStepPrev());
            }}
            className='btn btn-warning btn-lg me-1'
          >
            Previous Form
          </button>
        </div>
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
  form: 'FormDetailDeliveryNote',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormDetailDeliveryNote);
export default connect(mapState, null)(form);
