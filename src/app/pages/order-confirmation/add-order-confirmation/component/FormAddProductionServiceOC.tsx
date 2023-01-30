import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as redux from '../redux/AddOrderConfirmationServiceRedux';
import AddProductionServiceValidation from '../validasi/AddProductionServiceValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.addorderconfirmationservice.productionData !== undefined) {
    return {
      initialValues: {
        no_production_service:
          state.addorderconfirmationservice.productionData.no_production_service,
        production_service_name:
          state.addorderconfirmationservice.productionData.nama_production_service,
        qty: state.addorderconfirmationservice.productionData.qty,
        unit: state.addorderconfirmationservice.productionData.kode_satuan,
        total_price: state.addorderconfirmationservice.productionData.total_harga,
      },
    };
  }
};

const FormAddProductionServiceOC: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const disable = true;
  const dataProd: any =
    useSelector<RootState>(
      ({ addorderconfirmationservice }) => addorderconfirmationservice.feedbackProduction
    ) || [];

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-4'>
          <Field
            name='no_production_service'
            type='text'
            component={RenderFieldSelect}
            options={dataProd.map((res: any) => {
              const row = {
                value: res.no_production_service,
                label: res.no_production_service,
              };
              return row;
            })}
            label='No Production Service'
            placeHolder='Select No Production Service'
            onChange={(e: any) => {
              dispatch(redux.actions.getProductionDetail(e.value));
            }}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='production_service_name'
            type='text'
            component={RenderField}
            label='Production Service Name'
            placeHolder='Insert Production Service Name'
            readOnly={disable}
            isEdit={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='qty'
            type='text'
            component={RenderField}
            label='Qty'
            placeHolder='Insert Qty'
            readOnly={disable}
            isEdit={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='unit'
            type='text'
            component={RenderField}
            label='Unit'
            placeHolder='Insert Unit'
            readOnly={disable}
            isEdit={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='total_price'
            type='text'
            component={RenderField}
            label='Total Price'
            placeHolder='Insert Total Price'
            readOnly={disable}
            isEdit={disable}
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'FormAddProductionServiceOC',
  touchOnChange: true,
  validate: AddProductionServiceValidation,
})(FormAddProductionServiceOC);
export default connect(mapState, null)(form);
