import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
import { change } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet, AxiosPost } from '../../../../setup';
import { doDecryptData, getLocal, saveLocal } from '../../../../setup/encrypt.js';
import { DeliveryNoteLocalModel } from '../model/DeliveryNoteModel';
import * as utility from '../../../../setup/redux/UtilityRedux';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import PDFDeliveryOrder from '../component/PDFDeliveryOrder.jsx';
import { postImageResi } from '../../../../setup/axios/Firebase';
import { dataURLtoFile } from '../../../../setup/function.js';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  getDataDelivery: '[DELIVERYNOTE] Get Data Delivery Note',
  setStepForm: '[DELIVERYNOTE] Set Step Form',
  setDeliveryNoteLocal: '[DELIVERYNOTE] Set Delivery Note Local',
  getListOC: '[DELIVERYNOTE] Get List OC',
  getDataOC: '[DELIVERYNOTE] Get Data OC',
  setDate: '[DELIVERYNOTE] Set Date',
  setProduct: '[DELIVERYNOTE] Set Product',
  getDataDeliveryByNO: '[DELIVERYNOTE] Get Data Delivery By No',
  SetCamera: '[DELIVERYNOTE] Set Camera',
};
export interface IDeliveryNoteState {
  feedback?: Array<any>;
  step?: Number;
  deliveryNoteLocal?: DeliveryNoteLocalModel;
  listOC?: Array<any>;
  dataOC?: any;
  date?: any;
  dataProduct?: Array<any>;
  feedbackNo?: any;
  setCameraVal?: String;
}

const initialDeliveryNoteState: IDeliveryNoteState = {
  feedback: [],
  step: 1,
  deliveryNoteLocal: undefined,
  listOC: [],
  dataOC: undefined,
  date: undefined,
  dataProduct: [],
  feedbackNo: undefined,
  setCameraVal: '-',
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-delivery-note', whitelist: ['isSending'] },
  (
    state: IDeliveryNoteState = initialDeliveryNoteState,
    action: ActionWithPayload<IDeliveryNoteState>
  ) => {
    switch (action.type) {
      case actionTypes.getDataDelivery: {
        return { ...state, feedback: action.payload?.feedback };
      }
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
      case actionTypes.setProduct: {
        const data = action.payload?.dataProduct;
        return { ...state, dataProduct: data };
      }
      case actionTypes.getDataDeliveryByNO: {
        const data = action.payload?.feedbackNo;
        return { ...state, feedbackNo: data };
      }
      case actionTypes.SetCamera: {
        const data = action.payload?.setCameraVal;
        return { ...state, setCameraVal: data };
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
  getDataDelivery: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('delivery-order').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_surat_jalan',
          'tanggal_surat_jalan',
          'kode_surat_jalan',
          'kode_toko',
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
          'status',
          'input_date',
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
        dispatch({ type: actionTypes.getDataDelivery, payload: { feedback: dataSave } });
      });
    };
  },
  setDate: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.setDate, payload: { date: data } });
    };
  },
  countQty: (qty: any, namaProduk: any, data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const dataFil = data.find((element: any) => element.nama_produk === namaProduk);
      const qtysisa = dataFil.qty - qty;

      // eslint-disable-next-line
      if (!Number.isNaN(parseInt(qty))) {
        // eslint-disable-next-line
        if (parseInt(qty) === 0) {
          toast.error('Send Qty Must Bigger Than 0 !');
          // eslint-disable-next-line
        } else if (parseInt(qty) > parseInt(dataFil.qty)) {
          toast.error('Qty More Than Stock !');
        } else {
          getLocal('dataProductSend').then((res) => {
            if (res.length === 0) {
              const dataArr = [];
              const row = {
                jenis_produk: dataFil.jenis_produk,
                nama_produk: dataFil.nama_produk,
                qty: dataFil.qty,
                unit: dataFil.satuan,
                // eslint-disable-next-line
                jumlah_kirim: parseInt(qty),
              };
              dataArr.push(row);
              saveLocal('dataProductSend', dataArr).then(() => {
                dispatch(change('FormDetailDeliveryNote', `qty_sisa_${namaProduk}`, qtysisa));
              });
            } else {
              const cek = res.find((val: any) => val.nama_produk === namaProduk);
              if (cek) {
                const dataFilUpdate = res.filter(
                  (element: any) => element.nama_produk !== namaProduk
                );
                const dataArr = dataFilUpdate;
                const row = {
                  jenis_produk: dataFil.jenis_produk,
                  nama_produk: dataFil.nama_produk,
                  qty: dataFil.qty,
                  unit: dataFil.satuan,
                  // eslint-disable-next-line
                  jumlah_kirim: parseInt(qty),
                };
                dataArr.push(row);
                saveLocal('dataProductSend', dataArr).then(() => {
                  dispatch(change('FormDetailDeliveryNote', `qty_sisa_${namaProduk}`, qtysisa));
                });
              } else {
                const dataArr = res;
                const row = {
                  jenis_produk: dataFil.jenis_produk,
                  nama_produk: dataFil.nama_produk,
                  qty: dataFil.qty,
                  unit: dataFil.satuan,
                  // eslint-disable-next-line
                  jumlah_kirim: parseInt(qty),
                };
                dataArr.push(row);
                saveLocal('dataProductSend', dataArr).then(() => {
                  dispatch(change('FormDetailDeliveryNote', `qty_sisa_${namaProduk}`, qtysisa));
                });
              }
            }
          });
        }
      }
    };
  },
  setStepNext: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const dataLocal: DeliveryNoteLocalModel = {
        no_order_konfirmasi: data.no_oc,
        kode_toko: data.kode_toko,
        kode_cabang: data.kode_cabang,
        alamat: data.alamat_cabang,
        nama_toko: data.toko,
        nama_customer: data.nama_customer,
        tanggal: moment(data.date).format('YYYY-MM-DD'),
        telepon: data.telepon,
      };
      AxiosGet(`sales-order/by-no-ok?no_order_konfirmasi=${data.no_oc}`).then((res) => {
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
        const datafil = dataDecrypt[0].detail_produk.filter(
          (val: any) => val.jenis_produk !== 'SOFTWARE'
        );
        dispatch({
          type: actionTypes.setProduct,
          payload: { dataProduct: datafil },
        });
        dataDecrypt[0].detail_produk.forEach((element: any) => {
          dispatch(
            change('FormDetailDeliveryNote', `qty_sisa_${element.nama_produk}`, element.qty)
          );
        });
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
  postDeliveryData: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('deliveryNoteData').then((res) => {
        getLocal('dataProductSend').then((resProd) => {
          const onSendData = {
            tanggal: res.tanggal,
            no_order_konfirmasi: res.no_order_konfirmasi,
            kode_toko: res.kode_toko,
            nama_toko: res.nama_toko,
            kode_cabang: res.kode_cabang,
            nama_customer: res.nama_customer,
            telepon: res.telepon,
            alamat: res.alamat,
            detail_surat_jalan: resProd,
            keterangan: data.keterangan,
          };
          AxiosPost('delivery-order', onSendData)
            .then(() => {
              toast.success('Success Add Data !');
              localStorage.removeItem('deliveryNoteData');
              localStorage.removeItem('dataProductSend');
              dispatch(actions.getDataDelivery());
              dispatch(utility.actions.hideLoading());
              dispatch(modal.actions.hide());
            })
            .catch((err) => {
              const dataErr = err.response.data;
              toast.error(dataErr.message || 'Failed Add Data !');
              dispatch(utility.actions.hideLoading());
            });
        });
      });
    };
  },
  printDeliveryOrder: (no_surat_jalan: string) => {
    // eslint-disable-next-line
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`delivery-order/by-no/${no_surat_jalan}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_surat_jalan',
          'tanggal_surat_jalan',
          'kode_surat_jalan',
          'kode_toko',
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
          'status',
          'input_date',
          'no_order_konfirmasi',
        ]);
        PDFDeliveryOrder(dataDecrypt, []);
      });
    };
  },
  getDataDeliveryByNo: (no_surat_jalan: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`delivery-order/by-no/${no_surat_jalan}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_surat_jalan',
          'tanggal_surat_jalan',
          'kode_surat_jalan',
          'kode_toko',
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
          'status',
          'input_date',
          'no_order_konfirmasi',
        ]);
        dispatch({ type: actionTypes.getDataDeliveryByNO, payload: { feedbackNo: dataDecrypt } });
        dispatch(change('FormSendProduct', 'no_surat_jalan', no_surat_jalan));
        dispatch(change('FormSendProduct', 'nama_toko', dataDecrypt[0].nama_toko));
        dispatch(modal.actions.show());
      });
    };
  },
  sendProductPost: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        no_surat_jalan: data.no_surat_jalan,
        tanggal_kirim: moment(data.date).format('YYYY-MM-DD'),
        no_resi: data.no_resi,
        nama_ekspedisi: data.nama_ekspedisi,
        // eslint-disable-next-line
        ongkos_kirim: parseInt(data.ongkos_kirim),
        ditagihkan: data.ditagihkan,
      };
      const foto = dataURLtoFile(data.foto, data.no_surat_jalan);
      postImageResi(foto, data.no_surat_jalan)
        .then(() => {
          AxiosPost('delivery-order/send-product', onSendData)
            .then(() => {
              toast.success('Success Add Data !');
              dispatch(modal.actions.hide());
              dispatch(utility.actions.hideLoading());
            })
            .catch((err) => {
              const dataErr = err.response.data;
              toast.error(dataErr.message);
              dispatch(utility.actions.hideLoading());
            });
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  showValidation: (noSuratJalan: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(change('FormValidation', 'no_surat_jalan', noSuratJalan));
      dispatch(modal.actions.show());
    };
  },
  validation: (type: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const dataForm = state.form.FormValidation.values;
      const suratJalan = dataForm.no_surat_jalan;
      const onSendData = { no_surat_jalan: suratJalan, status_validasi: type };
      AxiosPost('delivery-order/validation', onSendData)
        .then(() => {
          toast.success('Success Validate Data !');
          dispatch(actions.getDataDelivery());
          dispatch(modal.actions.hide());
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
        });
    };
  },
};
