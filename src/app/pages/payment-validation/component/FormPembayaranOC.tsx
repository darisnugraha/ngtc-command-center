import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { change, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import { convertBase64, currencyMask, NumberOnly } from '../../../../setup/function.js';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import SubmitButton from '../../../modules/button';
import { RenderField, RenderTextArea } from '../../../modules/redux-form/BasicInput';
import { SelectDate } from '../../../modules/redux-form/DatePicker';
import { RenderFieldSelect } from '../../../modules/redux-form/dropdown';
import * as redux from '../redux/ValidationPaymentRedux';
import PaymentValidation from '../validasi/PaymentValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.paymentorderconfirmation.feedbackDetail !== undefined) {
    return {
      initialValues: {
        no_order_confirmation: state.paymentorderconfirmation.feedbackDetail[0].no_order_konfirmasi,
        total_price: state.paymentorderconfirmation.feedbackDetail[0].total_harga,
        down_payment: state.paymentorderconfirmation.feedbackDetail[0].total_harga / 2,
        remaining_payment: state.paymentorderconfirmation.feedbackDetail[0].total_harga,
      },
    };
  }
};

const FormPembayaranOC: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const getValue = async (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    dispatch(change('FormPembayaranOC', 'foto', base64));
    dispatch(redux.actions.setCameraAction(base64));
  };
  const image: any = useSelector<RootState>(
    ({ paymentorderconfirmation }) => paymentorderconfirmation.setCameraVal
  );
  const PaymentType = [{ value: 'TRANSFER', label: 'Transfer' }];
  const Bank = useSelector<RootState>(
    ({ paymentorderconfirmation }) => paymentorderconfirmation.listBank
  );

  const disable = true;

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-4'>
          <Field
            id='date'
            name='date'
            type='date'
            component={SelectDate}
            label='Date'
            placeHolder='Select Date'
            startDate={date}
            onChange={(e: any) => {
              setDate(e);
            }}
          />
        </div>
        <div className='col-lg-4 d-none'>
          <Field
            name='no_order_confirmation'
            type='text'
            component={RenderField}
            label='No Order Confirmation'
            placeHolder='Insert No Order Confirmation'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='total_price'
            type='text'
            component={RenderField}
            label='Total Price'
            placeHolder='Insert Total Price'
            {...currencyMask}
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='down_payment'
            type='text'
            component={RenderField}
            label='Down Payment'
            placeHolder='Insert Down Payment'
            {...currencyMask}
            isEdit={disable}
            readOnly={disable}
            onFocus={(e: any) => {
              dispatch(redux.actions.setNominal(NumberOnly(e.target.value)));
            }}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='payment_type'
            type='text'
            component={RenderFieldSelect}
            options={PaymentType}
            label='Payment Type'
            placeHolder='Select Payment Type'
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='bank_name'
            type='text'
            component={RenderFieldSelect}
            options={Bank}
            label='Bank Name'
            placeHolder='Select Bank Name'
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='account_number'
            type='text'
            component={RenderField}
            label='Account Number'
            placeHolder='Insert Account Number'
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='nominal'
            type='text'
            component={RenderField}
            label='Nominal'
            placeHolder='Insert Nominal'
            {...currencyMask}
            onChange={(e: any) => {
              dispatch(redux.actions.setSisa(NumberOnly(e.target.value)));
            }}
          />
        </div>
        <div className='col-lg-4'>
          <Field
            name='remaining_payment'
            type='text'
            component={RenderField}
            label='Remaining Payment'
            placeHolder='Insert Remaining Payment'
            {...currencyMask}
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-4' />
        <div className='col-lg-4 d-none'>
          <Field
            name='foto'
            type='text'
            label='Imgbase64'
            component={RenderField}
            className='form-item-group'
            placeholder='Masukkan Imgbase64'
          />
        </div>
        <div className='col-lg-4'>
          <div className='row'>
            <div className='col-lg-4'>
              <img
                src={
                  image === '-'
                    ? toAbsoluteUrl('/media/illustrations/new/clip-add-image.png')
                    : image
                }
                alt='img'
                height='265px'
                width='325px'
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12 mb-8'>
              <br />
              <label> &nbsp; </label>
              <div className='row'>
                <div className='col-8'>
                  <div className='input-group'>
                    <div className='custom-file'>
                      <input
                        type='file'
                        name='photo'
                        autoComplete='off'
                        className='custom-file-input'
                        id='exampleInputFile'
                        onChange={(e: any) => getValue(e)}
                      />
                      <label className='custom-file-label' htmlFor='exampleInputFile'>
                        Proof Of Payment
                      </label>
                    </div>
                  </div>
                </div>
                {/* <div className='col-4'>
                  <button
                    className='btn btn-block btn-primary'
                    onClick={() => this.showModalWebcam()}
                  >
                    {' '}
                    WebCam{' '}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <Field
            name='description'
            type='textarea'
            component={RenderTextArea}
            label='Description'
            placeHolder='Insert Description'
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
  form: 'FormPembayaranOC',
  touchOnChange: true,
  validate: PaymentValidation,
})(FormPembayaranOC);
export default connect(mapState, null)(form);
