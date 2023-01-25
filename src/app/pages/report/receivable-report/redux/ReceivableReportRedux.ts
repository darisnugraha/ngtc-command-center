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
  GetReport: '[RECEIVABLEREPORT] Get Data Report Receivable',
  GetOC: '[RECEIVABLEREPORT] Get Data OC',
  GetStore: '[RECEIVABLEREPORT] Get Data Store',
  GetBranch: '[RECEIVABLEREPORT] Get Data Branch',
};
export interface IReceivableState {
  feedback?: Array<any>;
  listOC?: Array<any>;
  listStore?: Array<any>;
  listBranch?: Array<any>;
}

const initialReceivableState: IReceivableState = {
  feedback: [],
  listOC: [],
  listStore: [],
  listBranch: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-receivable', whitelist: ['isSending'] },
  (
    state: IReceivableState = initialReceivableState,
    action: ActionWithPayload<IReceivableState>
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
      case actionTypes.GetBranch: {
        const data = action.payload?.listBranch;
        return { ...state, listBranch: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getReportReceivable: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const startDate = moment(data.date[0]).format('yyyy-MM-DD');
      const endDate = moment(data.date[1]).format('yyyy-MM-DD');
      const dataHead = {
        tgl_awal: startDate,
        tgl_akhir: endDate,
        no_order_konfirmasi: data.no_oc,
        kode_toko: data.central_store,
        kode_cabang: data.branch_store,
      };

      AxiosGet(
        `receivable/report?startDate=${startDate}&endDate=${endDate}&no_order_konfirmasi=${data.no_oc}&kode_toko=${data.central_store}&kode_cabang=${data.branch_store}`
      ).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'bayar',
          'jenis_ok',
          'kode_toko',
          'no_order_konfirmasi',
          'sisa_tagihan',
          'status',
          'tanggal_bayar',
          'total_harga',
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
  getListBranch: (store: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      if (store === 'all') {
        AxiosGet('branch/open').then((res) => {
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
          dispatch({ type: actionTypes.GetBranch, payload: { listBranch: dataSave } });
        });
      } else {
        AxiosGet(`branch/by-kode-toko/${store}`).then((res) => {
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
          dispatch({ type: actionTypes.GetBranch, payload: { listBranch: dataSave } });
        });
      }
    };
  },
};
