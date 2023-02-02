import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import { ListSOModel } from '../model/ListSOModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import * as utility from '../../../../../setup/redux/UtilityRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetListSO: '[LISTSO] Get Data List SO',
  GetDataListSO: '[LISTSO] Get List SO',
  GetListSOByNo: '[LISTSO] Get Data List SO By No',
  GetImplementation: '[LISTSO] Get Data Implementation',
};
export interface IListSOState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackData?: Array<any>;
  feedbackNo?: ListSOModel;
  feedbackImplementation?: Array<any>;
}

const initialListSOState: IListSOState = {
  isSending: false,
  feedback: [],
  feedbackData: [],
  feedbackNo: undefined,
  feedbackImplementation: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-list-order-confirmation', whitelist: ['isSending'] },
  (state: IListSOState = initialListSOState, action: ActionWithPayload<IListSOState>) => {
    switch (action.type) {
      case actionTypes.GetListSO: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetListSOByNo: {
        const data = action.payload?.feedbackNo;
        return { ...state, feedbackNo: data };
      }
      case actionTypes.GetImplementation: {
        const data = action.payload?.feedbackImplementation;
        return { ...state, feedbackImplementation: data };
      }
      case actionTypes.GetDataListSO: {
        const data = action.payload?.feedbackData;
        return { ...state, feedbackData: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getDataListSO: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('sales-order').then((res) => {
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
          'status_implementasi',
          'no_sales_order',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetDataListSO, payload: { feedbackData: dataSave } });
      });
    };
  },
  getListSO: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('sales-order').then((res) => {
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
          'status_implementasi',
          'no_sales_order',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetListSO, payload: { feedback: dataSave } });
      });
    };
  },
  getListSOByNo: (no_order_konfirmasi: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`sales-order/by-no-ok?no_order_konfirmasi=${no_order_konfirmasi}`).then((res) => {
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
          'no_implementasi',
          'status_implementasi',
        ]);
        AxiosGet(`implementation/by-no/${dataDecrypt[0].no_implementasi}`).then((resIm) => {
          const dataDecryptImplement = doDecryptData(resIm.data, [
            '_id',
            'no_implementasi',
            'tanggal_implementasi',
            'tanggal_realisasi',
            'kode_helpdesk',
            'tipe_implementasi',
            'lama_implementasi',
            'status',
            'input_date',
          ]);
          dispatch({ type: actionTypes.GetListSOByNo, payload: { feedbackNo: dataDecrypt } });
          dispatch({
            type: actionTypes.GetImplementation,
            payload: { feedbackImplementation: dataDecryptImplement },
          });
          dispatch(modal.actions.show());
        });
      });
    };
  },
  deleteSO: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result: any) => {
        if (result.isConfirmed) {
          AxiosDelete(`order-confirmation/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getListSO());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  searchSO: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const sendData = {
        startDate: moment(data.date[0]).format('yyyy-MM-DD'),
        endDate: moment(data.date[1]).format('yyyy-MM-DD'),
        kode_staff: data.staff_name,
        no_order_konfirmasi: data.no_oc,
        kode_toko: data.central_store_name,
        status: data.status_payment,
        no_sales_order: data.no_so,
      };
      AxiosGet(`sales-order/filter?startDate=${sendData.startDate}&endDate=${sendData.endDate}&no_sales_order=${sendData.no_sales_order}&no_order_konfirmasi=${sendData.no_order_konfirmasi}&kode_toko=${sendData.kode_toko}&kode_staff=${sendData.kode_staff}&status=${sendData.status}
      `)
        .then((res) => {
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
          dispatch({ type: actionTypes.GetListSO, payload: { feedback: dataSave } });
        })
        .catch((err) => {
          const dataErr = err.response?.data;
          toast.error(dataErr.message || 'Error');
        });
    };
  },
};
