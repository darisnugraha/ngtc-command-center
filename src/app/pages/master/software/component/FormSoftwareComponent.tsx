import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask, normalizeAlphaWithUpper, upper } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddSoftwareValidation from '../validasi/AddSoftwareValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.software.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.software.feedbackID._id,
        product_code: state.software.feedbackID.kode_produk,
        product_name: state.software.feedbackID.nama_produk,
        price: state.software.feedbackID.harga,
        unit: state.software.feedbackID.satuan,
        type: state.software.feedbackID.type,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormSoftwareComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit: any = useSelector<RootState>(({ software }) => software.isEdit);
  const dataEdit: any = useSelector<RootState>(({ software }) => software.feedbackID);
  const dataUnit: any = useSelector<RootState>(({ unit }) => unit.feedback);
  const defaultUnit = [{ value: dataEdit?.satuan, label: dataEdit?.satuan }];
  const dataType = [
    {
      value: 'ONLINE',
      label: 'ONLINE',
    },
    {
      value: 'OFFLINE',
      label: 'OFFLINE',
    },
  ];
  const defaultType = [{ value: dataEdit?.type, label: dataEdit?.type }];

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field
            name='id'
            type='text'
            component={RenderField}
            label='Product ID'
            placeHolder='Insert Product ID'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            // eslint-disable-next-line
            readOnly={isEdit ? true : false}
            isEdit={isEdit}
            name='product_code'
            type='text'
            component={RenderField}
            label='Product Code'
            placeHolder='Insert Product Code'
            normalize={normalizeAlphaWithUpper}
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='product_name'
            type='text'
            component={RenderField}
            label='Product Name'
            placeHolder='Insert Product Name'
            normalize={upper}
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='type'
            type='text'
            component={RenderFieldSelect}
            options={dataType}
            label='Type'
            placeHolder='Select Type'
            defaultValue={isEdit ? defaultType : ''}
          />
        </div>
        <div className='col-lg-12'>
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
  form: 'FormSoftwareComponent',
  touchOnChange: true,
  validate: AddSoftwareValidation,
})(FormSoftwareComponent);
export default connect(mapState, null)(form);
