import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import { ListInvoiceModel } from '../model/ListInvoiceModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import InvoicePDF from '../component/InvoicePDF.jsx';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetListInvoice: '[LISTINVOICE] Get Data List Invoice',
  GetListInvoiceByNo: '[LISTINVOICE] Get Data List Invoice By No',
};
export interface IListInvoiceState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackNo?: ListInvoiceModel;
}

const initialListInvoiceState: IListInvoiceState = {
  isSending: false,
  feedback: [],
  feedbackNo: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-list-invoice', whitelist: ['isSending'] },
  (
    state: IListInvoiceState = initialListInvoiceState,
    action: ActionWithPayload<IListInvoiceState>
  ) => {
    switch (action.type) {
      case actionTypes.GetListInvoice: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetListInvoiceByNo: {
        const data = action.payload?.feedbackNo;
        return { ...state, feedbackNo: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getListInvoice: () => {
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
        dispatch({ type: actionTypes.GetListInvoice, payload: { feedback: dataSave } });
      });
    };
  },
  getListInvoiceByNo: (no_invoice: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`invoice/by-kode/${no_invoice}`).then((res) => {
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
        dispatch({ type: actionTypes.GetListInvoiceByNo, payload: { feedbackNo: dataDecrypt } });
        dispatch(modal.actions.show());
      });
    };
  },
  printInvoice: (no_invoice: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`invoice/by-kode/${no_invoice}`).then((res) => {
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
        AxiosGet(
          `order-confirmation/by-no?no_order_konfirmasi=${dataDecrypt[0].no_order_konfirmasi}`
        ).then((resOK) => {
          const dataDecryptOK = doDecryptData(resOK.data, [
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
            'sisa_bayar',
          ]);

          dispatch({ type: actionTypes.GetListInvoiceByNo, payload: { feedbackNo: dataDecrypt } });
          InvoicePDF(dataDecrypt, dataDecryptOK);
        });
      });
    };
  },
};
