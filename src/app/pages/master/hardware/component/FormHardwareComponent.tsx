import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask, upper } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddHardwareValidation from '../validasi/AddHardwareValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.hardware.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.hardware.feedbackID._id,
        hardware_code: state.hardware.feedbackID.kode_hardware,
        hardware_name: state.hardware.feedbackID.nama_hardware,
        price: state.hardware.feedbackID.harga,
        unit: state.hardware.feedbackID.satuan,
        supplier: state.hardware.feedbackID.kode_supplier,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormHardwareComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit: any = useSelector<RootState>(({ hardware }) => hardware.isEdit);
  const dataEdit: any = useSelector<RootState>(({ hardware }) => hardware.feedbackID);
  const defaultUnit = [{ value: dataEdit?.satuan, label: dataEdit?.satuan }];
  const defaultSupplier = [{ value: dataEdit?.kode_supplier, label: dataEdit?.kode_supplier }];
  const dataUnit: any = useSelector<RootState>(({ unit }) => unit.feedback);
  const dataSupplier: any = useSelector<RootState>(({ supplier }) => supplier.feedback);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='hardware_code'
            type='text'
            component={RenderField}
            label='Hardware Code'
            placeHolder='Insert Hardware Code'
            normalize={upper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='hardware_name'
            type='text'
            component={RenderField}
            label='Hardware Name'
            placeHolder='Insert Hardware Name'
            normalize={upper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='unit'
            type='text'
            component={RenderFieldSelect}
            options={dataUnit.map((element: any) => {
              return {
                value: element.kode_satuan,
                label: element.nama_satuan,
              };
            })}
            label='Unit'
            placeHolder='Select Unit'
            defaultValue={isEdit ? defaultUnit : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='supplier'
            type='text'
            component={RenderFieldSelect}
            options={dataSupplier.map((element: any) => {
              return {
                value: element.kode_supplier,
                label: element.nama_supplier,
              };
            })}
            label='Supplier'
            placeHolder='Select Supplier'
            defaultValue={isEdit ? defaultSupplier : ''}
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='price'
            type='text'
            component={RenderField}
            label='Price'
            placeHolder='Insert Price'
            {...currencyMask}
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
  form: 'FormHardwareComponent',
  touchOnChange: true,
  validate: AddHardwareValidation,
})(FormHardwareComponent);
export default connect(mapState, null)(form);
