import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData, saveLocal } from '../../../../../setup/encrypt.js';
import * as utility from '../../../../../setup/redux/UtilityRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetReport: '[RESELLERPAYMENTREPORT] Get Data Report Reseller Payment',
  GetOC: '[RESELLERPAYMENTREPORT] Get Data OC',
  GetStore: '[RESELLERPAYMENTREPORT] Get Data Store',
};
export interface IResellerPaymentState {
  feedback?: Array<any>;
  listOC?: Array<any>;
  listStore?: Array<any>;
}

const initialResellerPaymentState: IResellerPaymentState = {
  feedback: [],
  listOC: [],
  listStore: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-reseller-payment', whitelist: ['isSending'] },
  (
    state: IResellerPaymentState = initialResellerPaymentState,
    action: ActionWithPayload<IResellerPaymentState>
  ) => {
    switch (action.type) {
      case actionTypes.GetReport: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetOC: {
        const data = action.payload?.listOC;
        return { ...state, listOC: data };
      }
      case actionTypes.GetStore: {
        const data = action.payload?.listStore;
        return { ...state, listStore: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getReportResellerPayment: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const dataHead = {
        startDate: moment(data.date[0]).format('yyyy-MM-DD'),
        endDate: moment(data.date[1]).format('yyyy-MM-DD'),
        no_order_konfirmasi: data.no_order_confirmation,
        kode_toko: data.central_store,
        kode_reseller: data.reseller_code,
        status: data.status,
      };

      AxiosGet(`reseller/report?startDate=${dataHead.startDate}&endDate=${dataHead.endDate}&no_order_konfirmasi=${dataHead.no_order_konfirmasi}&kode_toko=${dataHead.kode_toko}&kode_reseller=${dataHead.kode_reseller}&status=${dataHead.status}
      `).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_reseller',
          'no_sales_order',
          'no_order_konfirmasi',
          'tanggal_bayar',
          'kode_reseller',
          'biaya_reseller',
          'bayar_rp',
          'status',
          'tanggal_sales_order',
          'tanggal_order_konfirmasi',
          'kode_toko',
          'kode_cabang',
          'kode_produk',
          'jenis_produk',
          'satuan',
          'qty',
          'harga',
          'sub_total',
          'type',
          'total_harga',
          'no_implementasi',
          'status_implementasi',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetReport, payload: { feedback: dataSave } });
        saveLocal('headDataReport', dataHead).then(() => {
          toast.success('Get Data Success !');
          dispatch(utility.actions.hideLoading());
        });
      });
    };
  },
  getListOC: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('order-confirmation').then((res) => {
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
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetOC, payload: { listOC: dataSave } });
      });
    };
  },
  getListStore: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('store/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetStore, payload: { listStore: dataSave } });
      });
    };
  },
};
