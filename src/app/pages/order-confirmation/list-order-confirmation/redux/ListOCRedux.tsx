import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { change } from 'redux-form';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData, getLocal, saveLocal } from '../../../../../setup/encrypt.js';
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
  setTypeOC: '[LISTOC] Set Type OC',
  setProduct: '[LISTOC] Set Product',
  GetDetailDataProduct: '[LISTOC] Get Detail Product',
  setLocalProduct: '[LISTOC] Save Local Product',
};

export interface IListOCState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackNo?: Array<ListOCModel>;
  typeOC?: String;
  typeProduct?: String;
  dataProduct?: Array<any>;
  detailProduct?: any;
  feedbackProduct?: Array<any>;
}

const initialListOCState: IListOCState = {
  isSending: false,
  feedback: [],
  feedbackNo: undefined,
  typeOC: undefined,
  typeProduct: undefined,
  dataProduct: [],
  detailProduct: undefined,
  feedbackProduct: [],
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
      case actionTypes.setTypeOC: {
        const data = action.payload?.typeOC;
        return { ...state, typeOC: data };
      }
      case actionTypes.setProduct: {
        const data = action.payload?.dataProduct;
        const type = action.payload?.typeProduct;
        return { ...state, dataProduct: data, typeProduct: type };
      }
      case actionTypes.GetDetailDataProduct: {
        const data = action.payload?.detailProduct;
        return { ...state, detailProduct: data };
      }
      case actionTypes.setLocalProduct: {
        const data = action.payload?.feedbackProduct;
        return { ...state, feedbackProduct: data };
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
          dispatch({ type: actionTypes.setTypeOC, payload: { typeOC: dataDecrypt[0].jenis_ok } });
          dispatch(actions.setLocalProd(no_order_konfirmasi));
          dispatch(modal.actions.show());
        }
      );
    };
  },
  setLocalProd: (no_order_konfirmasi: any) => {
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
          saveLocal('dataProduct', dataDecrypt[0].detail_produk).then(() => {
            dispatch(actions.getLocalProd());
          });
        }
      );
    };
  },
  saveLocal: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProduct').then((res) => {
        let newArrData = [];
        const row = {
          harga: data.price,
          nama_produk: data.product_name,
          qty: data.qty,
          satuan: data.unit,
          sub_total: data.sub_total,
          tipe_produk: data.product_type,
        };
        const cek = res.find((el: any) => el.nama_produk === data.product_name);

        if (cek !== undefined) {
          toast.error('Data Already In Table');
        } else {
          // eslint-disable-next-line
          if (res.length === 0) {
            newArrData.push(row);
            saveLocal('dataProduct', newArrData).then(() => {
              toast.success('Success Add Product !');
              dispatch(actions.getLocalProd());
            });
          } else {
            newArrData = res;
            newArrData.push(row);
            saveLocal('dataProduct', newArrData).then(() => {
              toast.success('Success Add Product !');
              dispatch(actions.getLocalProd());
            });
          }
        }
      });
    };
  },
  // postProduct: () => {
  //   return async (
  //     dispatch: ThunkDispatch<{}, {}, AnyAction>,
  //     getState: () => any
  //   ): Promise<void> => {
  //     getLocal('dataProduct').then((res) => {
  //       const state = getState();
  //       const dataOK = state.listorderconfirmation.feedbackNo[0];
  //       const onSendData = {
  //         kode_toko: dataOK.kode_toko,
  //         nama_toko: dataOK.nama_toko,
  //         kode_cabang: dataOK.kode_cabang,
  //         nama_cabang: dataOK.nama_cabang,
  //         nama_customer: dataOK.nama_customer,
  //         alamat_cabang: dataOK.alamat_cabang,
  //         alamat_korespondensi: dataOK.alamat_korespondensi,
  //         kota: dataOK.kota,
  //         telepon: dataOK.telepon,
  //         email: dataOK.email,
  //         kode_staff: dataOK.kode_staff,
  //         biaya_reseller: dataOK.biaya_reseller,
  //         jenis_ok: dataOK.jenis_ok,
  //         detail_produk: res,
  //         detail_diskon: dataOK.detail_diskon,
  //         no_support_service: dataOK.no_support_service,
  //         no_production_service: dataOK.no_production_service,
  //         total_harga: dataOK.total_harga,
  //         deskripsi: dataOK.deskripsi,
  //       };
  //     });
  //   };
  // },
  getLocalProd: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProduct').then((res) => {
        dispatch({ type: actionTypes.setLocalProduct, payload: { feedbackProduct: res } });
      });
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
  setTypeProduct: (type: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      if (type === 'SOFTWARE') {
        AxiosGet('product/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_produk',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_produk;
            // eslint-disable-next-line
            element.product_name = element.nama_produk;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      } else if (type === 'CONSUMABLE') {
        AxiosGet('consumable/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_consumable',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_consumable;
            // eslint-disable-next-line
            element.product_name = element.nama_consumable;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      } else if (type === 'HARDWARE') {
        AxiosGet('hardware/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_hardware',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_hardware;
            // eslint-disable-next-line
            element.product_name = element.nama_hardware;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      } else {
        AxiosGet('bundle/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_paket',
            'status',
            '_id',
            'input_date',
            'kode_produk',
            'jenis_produk',
            'harga',
            'total_harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_paket;
            // eslint-disable-next-line
            element.product_name = element.nama_paket;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      }
    };
  },
  getDetailProduct: (code: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const type = state.listorderconfirmation.typeProduct;
      if (type === 'SOFTWARE') {
        AxiosGet(`product/by-kode/${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_produk',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProduct', 'qty', 1));
          dispatch(change('FormEditProduct', 'product_name', dataDecrypt[0].nama_produk));
          dispatch(change('FormEditProduct', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProduct', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProduct', 'sub_total', dataDecrypt[0].harga * 1));
        });
      } else if (type === 'CONSUMABLE') {
        AxiosGet(`consumable/by-kode/${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_consumable',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProduct', 'qty', 1));
          dispatch(change('FormEditProduct', 'product_name', dataDecrypt[0].nama_consumable));
          dispatch(change('FormEditProduct', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProduct', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProduct', 'sub_total', dataDecrypt[0].harga * 1));
        });
      } else if (type === 'HARDWARE') {
        AxiosGet(`hardware/by-kode/${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_hardware',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProduct', 'qty', 1));
          dispatch(change('FormEditProduct', 'product_name', dataDecrypt[0].nama_hardware));
          dispatch(change('FormEditProduct', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProduct', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProduct', 'sub_total', dataDecrypt[0].harga * 1));
        });
      } else {
        AxiosGet(`bundle/by-kode/${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_paket',
            'status',
            '_id',
            'input_date',
            'kode_produk',
            'jenis_produk',
            'harga',
            'total_harga',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProduct', 'qty', 1));
          dispatch(change('FormEditProduct', 'unit', 'PACKAGE'));
          dispatch(change('FormEditProduct', 'product_name', dataDecrypt[0].nama_paket));
          dispatch(change('FormEditProduct', 'price', dataDecrypt[0].total_harga));
          dispatch(change('FormEditProduct', 'sub_total', dataDecrypt[0].total_harga * 1));
        });
      }
    };
  },
};
