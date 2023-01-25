import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import SubmitButton from '../../../modules/button';
import { RenderField } from '../../../modules/redux-form/BasicInput';
import { SelectDate } from '../../../modules/redux-form/DatePicker';
import { RenderFieldSelect } from '../../../modules/redux-form/dropdown';
import TableStaff from './TableStaff';
import * as redux from '../redux/ImplementationRedux';
import AddImplementationValidate from '../validation/ImplementationValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.implementation.feedbackID !== undefined) {
    return {
      initialValues: {
        implementation_date: state.implementation.feedbackID.tanggal_implementasi,
        realization_date: state.implementation.feedbackID.tanggal_realisasi,
        implementation_type: state.implementation.feedbackID.tipe_implementasi,
        duration: state.implementation.feedbackID.lama_implementasi,
      },
    };
  }
};

const FormImplementation: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const [implementationDate, setImplementationDate] = useState(new Date());
  const [realizationDate, setRealizationDate] = useState(new Date());

  const dataOC: any = useSelector<RootState>(({ implementation }) => implementation.feedbackOC);
  const dataDivision: any = useSelector<RootState>(({ division }) => division.feedback);
  const dataStaff: any = useSelector<RootState>(
    ({ implementation }) => implementation.feedbackStaff
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            id='implementation_date'
            name='implementation_date'
            type='date'
            component={SelectDate}
            label='Implementation Date'
            placeHolder='Select Date'
            startDate={implementationDate}
            onChange={(e: any) => {
              setImplementationDate(e);
            }}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            id='realization_date'
            name='realization_date'
            type='date'
            component={SelectDate}
            label='Realization date'
            placeHolder='Select Date'
            startDate={realizationDate}
            onChange={(e: any) => {
              setRealizationDate(e);
            }}
          />
        </div>
        <div className='col-lg-12'>
          <hr />
        </div>
        <div className='col-lg-6'>
          <Field
            name='no_oc'
            type='text'
            component={RenderFieldSelect}
            options={dataOC.map((element: any) => {
              const option = {
                label: element.no_order_konfirmasi,
                value: element.no_order_konfirmasi,
              };
              return option;
            })}
            label='No OC'
            placeHolder='Select No OC'
          />
        </div>
        <div className='col-lg-6' />
        <div className='col-lg-6'>
          <Field
            name='implementation_type'
            type='text'
            component={RenderField}
            label='Implementation Type'
            placeHolder='Insert Implementation Type'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='duration'
            type='number'
            component={RenderField}
            label='Duration'
            placeHolder='Insert Duration'
          />
        </div>
        <div className='col-lg-12'>
          <hr />
        </div>
        <div className='col-lg-6'>
          <Field
            name='division'
            type='text'
            component={RenderFieldSelect}
            options={dataDivision.map((element: any) => {
              const option = {
                value: element.kode_divisi,
                label: element.nama_divisi,
              };
              return option;
            })}
            label='Division'
            placeHolder='Select Division'
            onChange={(e: any) => {
              dispatch(redux.actions.getStaffByDivisi(e.value));
            }}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='staff'
            type='text'
            component={RenderFieldSelect}
            options={dataStaff.map((element: any) => {
              const row = {
                value: element.kode_staff,
                label: element.nama_staff,
              };
              return row;
            })}
            label='Staff'
            placeHolder='Select Staff'
          />
        </div>
        <div className='col-lg-12'>
          <div className='row justify-content-end mt-5 mb-5'>
            <div className='col-lg-3 d-grid'>
              <button
                type='button'
                className='btn btn-sm btn-primary'
                onClick={() => {
                  dispatch(redux.actions.addStaffToLocal());
                }}
              >
                Add Staff
              </button>
            </div>
          </div>
        </div>
        <TableStaff />
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
  form: 'FormImplementation',
  touchOnChange: true,
  validate: AddImplementationValidate,
})(FormImplementation);
export default connect(mapState, null)(form);
