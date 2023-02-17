import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
import { change } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData, saveLocal } from '../../../../../setup/encrypt.js';
import * as utility from '../../../../../setup/redux/UtilityRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetReport: '[OCREPORT] Get Data Report OC',
  GetOC: '[OCREPORT] Get Data OC',
  GetStore: '[OCREPORT] Get Data Store',
  GetBranch: '[OCREPORT] Get Data Branch',
  setTypeReport: '[OCREPORT] Set Type Report',
};
export interface IOCState {
  feedback?: Array<any>;
  listOC?: Array<any>;
  listStore?: Array<any>;
  listBranch?: Array<any>;
  typeReport?: String;
}

const initialOCState: IOCState = {
  feedback: [],
  listOC: [],
  listStore: [],
  listBranch: [],
  typeReport: '',
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-order-confirmation', whitelist: ['isSending'] },
  (state: IOCState = initialOCState, action: ActionWithPayload<IOCState>) => {
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
      case actionTypes.setTypeReport: {
        const data = action.payload?.typeReport;
        return { ...state, typeReport: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getReportOC: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const startDate = moment(data.date[0]).format('yyyy-MM-DD');
      const endDate = moment(data.date[1]).format('yyyy-MM-DD');
      const dataHead = {
        tgl_awal: startDate,
        tgl_akhir: endDate,
        no_order_konfirmasi: data.no_oc.value || data.no_oc,
        kode_toko: data.central_store.value || data.central_store,
        kode_cabang: data.branch_store || data.branch_store,
      };

      AxiosGet(
        `order-confirmation/report?startDate=${startDate}&endDate=${endDate}&no_order_konfirmasi=${data.no_oc}&kode_toko=${data.central_store}&kode_cabang=${data.branch_store}`
      ).then((res) => {
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
          'jenis_produk',
          'no_support_service',
          'kode_satuan',
          'no_production_service',
          'tanggal',
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
          'jenis_produk',
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
  setTypeReport: (type: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      if (type === 'DETAIL') {
        dispatch(change('FormOCReport', 'central_store', 'all'));
        dispatch(change('FormOCReport', 'branch_store', 'all'));
        dispatch({ type: actionTypes.setTypeReport, payload: { typeReport: type } });
      } else {
        dispatch(change('FormOCReport', 'central_store', ''));
        dispatch(change('FormOCReport', 'branch_store', ''));
        dispatch({ type: actionTypes.setTypeReport, payload: { typeReport: type } });
      }
    };
  },
};
