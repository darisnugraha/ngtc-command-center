import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { change } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import { AxiosGet, AxiosPost } from '../../../../setup';
import { doDecryptData } from '../../../../setup/encrypt.js';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as modalSecond from '../../../modules/modal/ModalSecondRedux';
import * as utility from '../../../../setup/redux/UtilityRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  getDataInvoice: '[SERIALNUMBER] Get Data Invoice',
  getInvoiceDataByNo: '[SERIALNUMBER] Get Data Invoice By No',
};
export interface IDeliveryNoteState {
  feedback?: Array<any>;
  feedbackNo?: Array<any>;
  noInvoice?: String;
}

const initialDeliveryNoteState: IDeliveryNoteState = {
  feedback: [],
  feedbackNo: [],
  noInvoice: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-serial-number', whitelist: ['isSending'] },
  (
    state: IDeliveryNoteState = initialDeliveryNoteState,
    action: ActionWithPayload<IDeliveryNoteState>
  ) => {
    switch (action.type) {
      case actionTypes.getDataInvoice: {
        return { ...state, feedback: action.payload?.feedback };
      }
      case actionTypes.getInvoiceDataByNo: {
        return {
          ...state,
          feedbackNo: action.payload?.feedbackNo,
          noInvoice: action.payload?.noInvoice,
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getDataInvoice: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('invoice').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'status',
          '_id',
          'input_date',
          'no_order_konfirmasi',
          'kode_toko',
          'kode_cabang',
          'tanggal_order_konfirmasi',
          'total_harga',
          'kode_produk',
          'satuan',
          'harga',
          'sub_total',
          'qty',
          'kode_diskon',
          'nama_diskon',
          'persentase',
          'jenis_ok',
          'no_invoice',
          'total_ongkos_kirim',
          'tanggal_invoice',
          'serial_number',
          'jenis_produk',
          'type',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.getDataInvoice, payload: { feedback: dataSave } });
      });
    };
  },
  getDataInvoiceByNo: (no: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`invoice/by-kode/${no}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'status',
          '_id',
          'input_date',
          'no_order_konfirmasi',
          'kode_toko',
          'kode_cabang',
          'tanggal_order_konfirmasi',
          'total_harga',
          'kode_produk',
          'satuan',
          'harga',
          'sub_total',
          'qty',
          'kode_diskon',
          'nama_diskon',
          'persentase',
          'jenis_ok',
          'no_invoice',
          'total_ongkos_kirim',
          'tanggal_invoice',
          'serial_number',
          'jenis_produk',
          'type',
        ]);
        dispatch(modal.actions.show());
        const product = dataDecrypt[0].detail_product_invoice;
        const productFill = product.filter((element: any) => element.jenis_produk !== 'SOFTWARE');
        dispatch({
          type: actionTypes.getInvoiceDataByNo,
          payload: { feedbackNo: productFill, noInvoice: no },
        });
      });
    };
  },
  showModalAddSerialNumber: (id: any, serialNumber: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const noInvo = state.serialnumber.noInvoice;
      dispatch(change('FormAddSerialNumber', 'id', id));
      dispatch(change('FormAddSerialNumber', 'no_invoice', noInvo));
      dispatch(change('FormAddSerialNumber', 'serial_number', serialNumber));
      dispatch(modalSecond.actions.show());
    };
  },
  postSerialNumber: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      AxiosPost('invoice/add-serial-number', data)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(actions.getDataInvoice());
          dispatch(utility.actions.hideLoading());
          dispatch(modalSecond.actions.hide());
          dispatch(modal.actions.hide());
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
        });
    };
  },
};
