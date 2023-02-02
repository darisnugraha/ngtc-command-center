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
  GetReport: '[DELIVERYREPORT] Get Data Report Delivery',
  GetSJ: '[DELIVERYREPORT] Get Data SJ',
  GetStore: '[DELIVERYREPORT] Get Data Store',
};
export interface IDeliveryState {
  feedback?: Array<any>;
  listSJ?: Array<any>;
  listStore?: Array<any>;
}

const initialDeliveryState: IDeliveryState = {
  feedback: [],
  listSJ: [],
  listStore: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-delivery', whitelist: ['isSending'] },
  (state: IDeliveryState = initialDeliveryState, action: ActionWithPayload<IDeliveryState>) => {
    switch (action.type) {
      case actionTypes.GetReport: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetSJ: {
        const data = action.payload?.listSJ;
        return { ...state, listSJ: data };
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
  getReportDelivery: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const dataHead = {
        startDate: moment(data.date[0]).format('yyyy-MM-DD'),
        endDate: moment(data.date[1]).format('yyyy-MM-DD'),
        no_surat_jalan: data.no_sj,
        kode_toko: data.central_store,
        status: data.status_validation,
      };

      AxiosGet(`delivery-order/report?startDate=${dataHead.startDate}&endDate=${dataHead.endDate}&no_surat_jalan=${dataHead.no_surat_jalan}&kode_toko=${dataHead.kode_toko}&status=${dataHead.status}
      `).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'input_date',
          'status',
          'no_surat_jalan',
          'kode_surat_jalan',
          'kode_toko',
          'tanggal_surat_jalan',
          'kode_cabang',
          'jenis_produk',
          'nama_produk',
          'unit',
          'jumlah_kirim',
          'jumlah_hilang',
          'no_resi',
          'nama_ekspedisi',
          'tanggal_kirim',
          'tanggal_terima',
          'tanggal_batal',
          'tanggal_hilang',
          'ditagihkan',
          'ongkos_kirim',
          'no_order_konfirmasi',
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
  getListSJ: () => {
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
        dispatch({ type: actionTypes.GetSJ, payload: { listSJ: dataSave } });
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
