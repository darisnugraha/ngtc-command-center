import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet } from '../../../../setup';
import { doDecryptData, saveLocal } from '../../../../setup/encrypt.js';
import { DeliveryNoteLocalModel } from '../model/DeliveryNoteModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  setStepForm: '[DELIVERYNOTE] Set Step Form',
  setDeliveryNoteLocal: '[DELIVERYNOTE] Set Delivery Note Local',
  getListOC: '[DELIVERYNOTE] Get List OC',
  getDataOC: '[DELIVERYNOTE] Get Data OC',
  setDate: '[DELIVERYNOTE] Set Date',
};
export interface IDeliveryNoteState {
  step?: Number;
  deliveryNoteLocal?: DeliveryNoteLocalModel;
  listOC?: Array<any>;
  dataOC?: any;
  date?: any;
}

const initialDeliveryNoteState: IDeliveryNoteState = {
  step: 1,
  deliveryNoteLocal: undefined,
  listOC: [],
  dataOC: undefined,
  date: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-delivery-note', whitelist: ['isSending'] },
  (
    state: IDeliveryNoteState = initialDeliveryNoteState,
    action: ActionWithPayload<IDeliveryNoteState>
  ) => {
    switch (action.type) {
      case actionTypes.setDate: {
        return { ...state, date: action.payload?.date };
      }
      case actionTypes.setStepForm: {
        const datastep = action.payload?.step;
        const data = action.payload?.deliveryNoteLocal;
        return { ...state, step: datastep, deliveryNoteLocal: data };
      }
      case actionTypes.getListOC: {
        const data = action.payload?.listOC;
        return { ...state, listOC: data };
      }
      case actionTypes.getDataOC: {
        const data = action.payload?.dataOC;
        return { ...state, dataOC: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setDate: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.setDate, payload: { date: data } });
    };
  },
  setStepNext: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const dataLocal: DeliveryNoteLocalModel = {
        no_order_konfirmasi: data.no_oc,
        kode_toko: data.kode_toko,
        kode_cabang: data.kode_cabang,
        alamat: data.alamat_cabang,
        nama_toko: data.nama_toko,
        nama_customer: data.nama_customer,
        tanggal: moment(data.date).format('YYYY-MM-DD'),
        telepon: data.telepon,
      };
      saveLocal('deliveryNoteData', dataLocal)
        .then(() => {
          dispatch({
            type: actionTypes.setStepForm,
            payload: { step: 2, deliveryNoteLocal: dataLocal },
          });
        })
        .catch(() => {
          toast.error('Failed Add Data !');
        });
    };
  },
  setStepPrev: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.setStepForm, payload: { step: 1 } });
    };
  },
  getDataListOC: () => {
    return async (disptch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('sales-order').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_order_konfirmasi',
          'no_sales_order',
          'tanggal_sales_order',
          'tanggal_order_konfirmasi',
          'kode_toko',
          'kode_cabang',
          'kode_staff',
          'biaya_reseller',
          'jenis_ok',
          'jenis_produk',
          'satuan',
          'qty',
          'harga',
          'sub_total',
          'kode_diskon',
          'nama_diskon',
          'persentase',
          'no_support_service',
          'no_production_service',
          'total_harga',
          'sisa_bayar',
          'no_implementasi',
          'status_implementasi',
          'status',
          'input_date',
        ]);
        disptch({ type: actionTypes.getListOC, payload: { listOC: dataDecrypt } });
      });
    };
  },
  getDataOC: (noOC: string) => {
    return async (disptch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`sales-order/by-no-ok?no_order_konfirmasi=${noOC}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_order_konfirmasi',
          'no_sales_order',
          'tanggal_sales_order',
          'tanggal_order_konfirmasi',
          'kode_toko',
          'kode_cabang',
          'kode_staff',
          'biaya_reseller',
          'jenis_ok',
          'jenis_produk',
          'satuan',
          'qty',
          'harga',
          'sub_total',
          'kode_diskon',
          'nama_diskon',
          'persentase',
          'no_support_service',
          'no_production_service',
          'total_harga',
          'sisa_bayar',
          'no_implementasi',
          'status_implementasi',
          'status',
          'input_date',
        ]);
        disptch({ type: actionTypes.getDataOC, payload: { dataOC: dataDecrypt } });
      });
    };
  },
};
