import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { change, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import SubmitButton from '../../../modules/button';
import { RenderField } from '../../../modules/redux-form/BasicInput';
import { SelectDate } from '../../../modules/redux-form/DatePicker';
import { RenderFieldSelect } from '../../../modules/redux-form/dropdown';
import * as redux from '../redux/DeliveryNoteRedux';
import { convertBase64, currencyMask } from '../../../../setup/function.js';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import SendProductValidation from '../validation/SendProductValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormSendProduct: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const [StartDate, setStartDate] = useState(new Date());
  const bool = true;

  const dataDitagihkan = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  const getValue = async (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    dispatch(change('FormSendProduct', 'foto', base64));
    dispatch(redux.actions.setCameraAction(base64));
  };
  const image: any = useSelector<RootState>(({ receivable }) => receivable.setCameraVal);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6'>
          <Field
            id='date'
            name='date'
            type='date'
            component={SelectDate}
            label='Date'
            placeHolder='Select Date'
            startDate={StartDate}
            onChange={(e: any) => {
              setStartDate(e);
            }}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='nama_ekspedisi'
            type='text'
            component={RenderField}
            label='Expedition Name'
            placeHolder='Insert Expedition Name'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='no_surat_jalan'
            type='text'
            component={RenderField}
            label='No Delivery Order'
            placeHolder='Insert No Delivery Order'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='ongkos_kirim'
            type='text'
            component={RenderField}
            label='Shipping Costs'
            placeHolder='Insert Shipping Costs'
            {...currencyMask}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='no_resi'
            type='text'
            component={RenderField}
            label='No Receipt'
            placeHolder='Insert No Receipt'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='nama_toko'
            type='text'
            component={RenderField}
            label='Store'
            placeHolder='Insert Store'
            isEdit={bool}
            readOnly={bool}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='ditagihkan'
            type='text'
            component={RenderFieldSelect}
            options={dataDitagihkan}
            label='Billed'
            placeHolder='Select Billed'
          />
        </div>
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
        <div className='col-lg-6'>
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
                        Receipt
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
  form: 'FormSendProduct',
  touchOnChange: true,
  validate: SendProductValidation,
})(FormSendProduct);
export default connect(mapState, null)(form);
