import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { change } from 'redux-form';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import { ListOCModel } from '../model/ListOCModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import OCPDF from '../component/OCPDF.jsx';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetListOC: '[LISTOC] Get Data List OC',
  GetListOCByNo: '[LISTOC] Get Data List OC By No',
};
export interface IListOCState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackNo?: Array<ListOCModel>;
}

const initialListOCState: IListOCState = {
  isSending: false,
  feedback: [],
  feedbackNo: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-list-order-confirmation', whitelist: ['isSending'] },
  (state: IListOCState = initialListOCState, action: ActionWithPayload<IListOCState>) => {
    switch (action.type) {
      case actionTypes.GetListOC: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetListOCByNo: {
        const data = action.payload?.feedbackNo;
        return { ...state, feedbackNo: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getListOC: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('order-confirmation/open').then((res) => {
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
        dispatch({ type: actionTypes.GetListOC, payload: { feedback: dataSave } });
      });
    };
  },
  getListOCByNo: (no_order_konfirmasi: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`order-confirmation/by-no?no_order_konfirmasi=${no_order_konfirmasi}`).then(
        (res) => {
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
          dispatch({ type: actionTypes.GetListOCByNo, payload: { feedbackNo: dataDecrypt } });
          dispatch(modal.actions.show());
        }
      );
    };
  },
  deleteOC: (id: string) => {
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
              dispatch(actions.getListOC());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  showModalPrint: (id: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(change('FormPrintPDF', 'id', id));
      dispatch(
        change(
          'FormPrintPDF',
          'header_desc',
          'Sebelumnya kami ucapkan terima kasih atas kerjasama yang telah terjalin selama ini. Bersama ini kami sampaikan Order Konfirmasi Harga Software Nagatech Gold Store Solution web based (Online) dengan kondisi sbb :'
        )
      );
      dispatch(
        change(
          'FormPrintPDF',
          'footer_desc',
          'Harga tersebut termasuk:\nBiaya garansi software selama berlangganan online/cloud & maintenance\nBiaya instalasi software\nBiaya pelatihan User\nHarga tersebut belum termasuk:\nBiaya langganan online/cloud & maintenance \nNagagold+ Member + Accessories Rp.900.000 (Sembilan Ratus Ribu Rupiah) perbulan.\nBiaya langganan online/cloud & maintenance \nsoftware cucian Rp. 400.000 ( Empat Ratus Ribu Rupiah) perbulan'
        )
      );
      dispatch(modal.actions.show());
    };
  },
  printPDF: (data: any) => {
    // eslint-disable-next-line
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`order-confirmation/by-no?no_order_konfirmasi=${data.id}`).then((res) => {
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
        OCPDF(dataDecrypt, data);
      });
    };
  },
  putEditCustomer: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        alamat_cabang: data.alamat_cabang,
        alamat_korespondensi: data.alamat_korespondensi,
        kota: data.kota,
        email: data.email,
      };
      AxiosPut(`order-confirmation/information/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data Customer !');
          dispatch(modal.actions.hide());
          dispatch(actions.getListOC());
          dispatch(utility.actions.hideLoading());
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
          dispatch(utility.actions.hideLoading());
        });
    };
  },
};
