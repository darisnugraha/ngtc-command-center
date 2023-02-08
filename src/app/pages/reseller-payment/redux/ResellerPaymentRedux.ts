import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { change, reset } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import moment from 'moment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AxiosGet, AxiosPost } from '../../../../setup';
import { doDecryptData } from '../../../../setup/encrypt.js';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as utility from '../../../../setup/redux/UtilityRedux';
import { getImageResellerPayment, postImageBayarReseller } from '../../../../setup/axios/Firebase';
import { dataURLtoFile } from '../../../../setup/function.js';
import { AxiosDelete } from '../../../../setup/axios/AxiosDelete';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  getDataReseller: '[RESELLERPAYMENT] Get Data Reseller Payment',
  getDataResellerByNo: '[RESELLERPAYMENT] Get Data Reseller Payment By No',
  SetCamera: '[RESELLERPAYMENT] Set Camera',
  GetListBank: '[RESELLERPAYMENT] Get List Bank',
  getBuktiIMG: '[RESELLERPAYMENT] Get Bukti Image',
};
export interface IResellerPaymentState {
  feedback?: Array<any>;
  detailFeedback?: any;
  setCameraVal?: String;
  listBank?: Array<any>;
  buktiImg?: any;
}

const initialResellerPaymentState: IResellerPaymentState = {
  feedback: [],
  detailFeedback: undefined,
  setCameraVal: '-',
  listBank: [],
  buktiImg: '-',
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-reseller-payment', whitelist: ['isSending'] },
  (
    state: IResellerPaymentState = initialResellerPaymentState,
    action: ActionWithPayload<IResellerPaymentState>
  ) => {
    switch (action.type) {
      case actionTypes.getDataReseller: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.getDataResellerByNo: {
        const data = action.payload?.detailFeedback;
        return { ...state, detailFeedback: data };
      }
      case actionTypes.SetCamera: {
        const data = action.payload?.setCameraVal;
        return { ...state, setCameraVal: data };
      }
      case actionTypes.GetListBank: {
        const data = action.payload?.listBank;
        return { ...state, listBank: data };
      }
      case actionTypes.getBuktiIMG: {
        const data = action.payload?.buktiImg;
        return { ...state, buktiImg: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setCameraAction: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.SetCamera, payload: { setCameraVal: data } });
    };
  },
  getReseller: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('reseller').then((res) => {
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
        dispatch({ type: actionTypes.getDataReseller, payload: { feedback: dataSave } });
      });
    };
  },
  getResellerByNo: (no: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`reseller/by-no/${no}`).then((res) => {
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

        dispatch({
          type: actionTypes.getDataResellerByNo,
          payload: { detailFeedback: dataDecrypt },
        });
        dispatch(change('FormPaymentReseller', 'biaya_reseller', dataDecrypt[0]?.biaya_reseller));
        dispatch(change('FormPaymentReseller', 'no_reseller', dataDecrypt[0]?.no_reseller));
        dispatch(change('FormPaymentReseller', 'nama_reseller', dataDecrypt[0]?.nama_reseller));
        dispatch(actions.getListBank(dataDecrypt[0]?.sales_order.kode_reseller));
        dispatch(actions.setSisa(0));
      });
    };
  },
  getIMG: (no: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`reseller/by-no/${no}`).then((res) => {
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

        getImageResellerPayment(`${dataDecrypt[0].no_reseller}-${dataDecrypt[0].tanggal_bayar}`)
          .then((resIMG) => {
            dispatch({ type: actionTypes.getBuktiIMG, payload: { buktiImg: resIMG } });
            dispatch(modal.actions.show());
          })
          .catch(() => {
            toast.error('Error Get Image !');
          });
      });
    };
  },
  getListBank: (kode: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`staff/by-kode/${kode}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_staff',
          'status',
          '_id',
          'input_date',
          'kode_divisi',
        ]);
        dispatch(change('FormPaymentReseller', 'bank_name', dataDecrypt[0]?.nama_bank));
        dispatch(change('FormPaymentReseller', 'account_number', dataDecrypt[0]?.no_rekening));
        dispatch({ type: actionTypes.GetListBank, payload: { listBank: dataDecrypt } });
        dispatch(modal.actions.show());
      });
    };
  },
  setSisa: (value: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const totalHarga = state.resellerpayment.detailFeedback[0].biaya_reseller;
      const sisa = totalHarga - value;
      dispatch(change('FormPaymentReseller', 'remaining_payment', sisa));
    };
  },
  postPayment: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        no_reseller: data.no_reseller,
        tanggal_bayar: moment(data.date).format('YYYY-MM-DD'),
        tipe_pembayaran: data.payment_type,
        nama_bank: data.bank_name,
        no_rekening: data.account_number,
        // eslint-disable-next-line
        bayar_rp: parseInt(data.nominal),
      };
      AxiosPost('reseller/pay', onSendData)
        .then(() => {
          const foto = dataURLtoFile(data.foto, `${data.no_reseller}-${onSendData.tanggal_bayar}`);
          postImageBayarReseller(foto, `${data.no_reseller}-${onSendData.tanggal_bayar}`).finally(
            () => {
              toast.success('Success Add Data !');
              dispatch(actions.getReseller());
              dispatch(reset('FormPaymentReseller'));
              dispatch(modal.actions.hide());
              dispatch(utility.actions.hideLoading());
            }
          );
        })
        .catch((err) => {
          const dataErr = err.response?.data;
          toast.error(dataErr.message || 'Error');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  deleteResellerPayment: (id: string) => {
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
          AxiosDelete(`reseller/${id}`)
            .then(() => {
              Swal.fire('Good job!', 'Success Delete Data !', 'success').then(() => {
                window.location.reload();
              });
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
};
