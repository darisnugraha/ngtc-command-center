import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { change } from 'redux-form';
import moment from 'moment';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { doDecryptData, getLocal, saveLocal } from '../../../../../setup/encrypt.js';
import { ListOCModel } from '../model/ListOCModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import OCPDF from '../component/OCPDF.jsx';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';
import OC from '../../add-order-confirmation/component/OC.jsx';
import { dataURLtoPDFFile, NumberOnly } from '../../../../../setup/function.js';
import { postPDF } from '../../../../../setup/axios/Firebase';

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
            'kode_diskon',
            'nama_diskon',
            'persentase',
            'jenis_ok',
            'jenis_produk',
            'qty',
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
            'type',
          ]);
          saveLocal('dataProduct', dataDecrypt[0].detail_produk, [
            'qty',
            'sub_total',
            'harga',
          ]).then(() => {
            dispatch(actions.getLocalProd());
          });
        }
      );
    };
  },
  saveLocal: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProduct', ['qty', 'sub_total', 'harga']).then((res) => {
        let newArrData = [];
        const row = {
          harga: data.price,
          kode_produk: data.product,
          nama_produk: data.product_name,
          // eslint-disable-next-line
          qty: parseInt(data.qty),
          satuan: data.unit,
          sub_total: data.sub_total,
          jenis_produk: data.product_type,
          type: data.type || '-',
        };
        const cek = res.find((el: any) => el.nama_produk === data.product_name);

        if (cek !== undefined) {
          toast.error('Data Already In Table');
        } else {
          // eslint-disable-next-line
          if (res.length === 0) {
            newArrData.push(row);
            saveLocal('dataProduct', newArrData, ['qty', 'sub_total', 'harga']).then(() => {
              toast.success('Success Add Product !');
              dispatch(actions.getLocalProd());
            });
          } else {
            newArrData = res;
            newArrData.push(row);
            saveLocal('dataProduct', newArrData, ['qty', 'sub_total', 'harga']).then(() => {
              toast.success('Success Add Product !');
              dispatch(actions.getLocalProd());
            });
          }
        }
      });
    };
  },
  postProduct: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('dataProduct', ['qty', 'sub_total', 'harga']).then((res) => {
        const state = getState();
        const dataOK = state.listorderconfirmation.feedbackNo[0];
        const onSendData = {
          no_order_konfirmasi: dataOK.no_order_konfirmasi,
          detail_produk: res,
        };
        AxiosPut('order-confirmation/update/product', onSendData)
          .then(() => {
            toast.success('Success Edit Data !');
            localStorage.removeItem('dataProduct');
            dispatch(actions.getListOC());
            dispatch(utility.actions.hideLoading());
            dispatch(modal.actions.hide());
          })
          .catch((err: any) => {
            dispatch(utility.actions.hideLoading());
            const dataErr = err.response.data;
            toast.error(dataErr.message);
          });
      });
    };
  },
  getLocalProd: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProduct', ['qty', 'sub_total', 'harga']).then((res) => {
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
  deleteProduct: (kode: string) => {
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
          getLocal('dataProduct', ['qty', 'sub_total', 'harga']).then((res) => {
            const dataFill = res.filter((element: any) => element.kode_produk !== kode);
            saveLocal('dataProduct', dataFill, ['qty', 'sub_total', 'harga'])
              .then(() => {
                toast.success('Success Delete Data !');
                dispatch(actions.getLocalProd());
              })
              .catch(() => {
                toast.error('Failed Delete Data !');
              });
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
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
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
        const pdf64 = OC(dataDecrypt, data);
        const file = dataURLtoPDFFile(
          pdf64,
          `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`
        );
        postPDF(file, `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`)
          .then(() => {
            OCPDF(dataDecrypt, data);
            dispatch(utility.actions.hideLoading());
            // const send = {
            //   no_order_konfirmasi: data.id,
            // };
            // AxiosPost('order-confirmation/send-ok', send).finally(() => {
            //   OCPDF(dataDecrypt, data);
            //   dispatch(utility.actions.hideLoading());
            // });
          })
          .catch(() => {
            OCPDF(dataDecrypt, data);
            dispatch(utility.actions.hideLoading());
          });
      });
    };
  },
  sendPDF: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
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
        const pdf64 = OC(dataDecrypt, data);
        const file = dataURLtoPDFFile(
          pdf64,
          `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`
        );
        postPDF(file, `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`)
          .then(() => {
            const send = {
              no_order_konfirmasi: data.id,
            };
            AxiosPost('order-confirmation/send-ok', send).finally(() => {
              OCPDF(dataDecrypt, data);
              dispatch(utility.actions.hideLoading());
            });
          })
          .catch(() => {
            OCPDF(dataDecrypt, data);
            dispatch(utility.actions.hideLoading());
          });
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
            'type',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_produk));
          dispatch(change('FormEditProductList', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
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
            'type',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_consumable));
          dispatch(change('FormEditProductList', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
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
            'type',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_hardware));
          dispatch(change('FormEditProductList', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
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
            'type',
            'total_harga',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'unit', 'PACKAGE'));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_paket));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].total_harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].total_harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
        });
      }
    };
  },
  searchAction: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      dispatch(utility.actions.showLoadingButton());

      const onSendData = {
        startDate: moment(data.date[0]).format('yyyy-MM-DD'),
        endDate: moment(data.date[1]).format('yyyy-MM-DD'),
        kode_staff: data.staff_name,
        no_order_konfirmasi: data.no_oc,
        kode_toko: data.central_store_name,
        status: data.status_payment,
      };
      AxiosGet(
        `order-confirmation/filter?startDate=${onSendData.startDate}&endDate=${onSendData.endDate}&no_order_konfirmasi=${onSendData.no_order_konfirmasi}&kode_toko=${onSendData.kode_toko}&kode_staff=${onSendData.kode_staff}&status=${onSendData.status}`
      )
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
          dispatch(utility.actions.hideLoading());
        })
        .catch((err) => {
          const dataErr = err.response?.data;
          toast.error(dataErr.message || 'Error');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  setSubTotal: (qty: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormEditProductList.values;
      // eslint-disable-next-line
      const price = data.price;
      // eslint-disable-next-line
      const total = parseInt(qty) * parseInt(price);
      dispatch(change('FormEditProductList', 'sub_total', total));
    };
  },
  setSubTotalRp: (harga: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormEditProductList.values;
      // eslint-disable-next-line
      const qty = data.qty;
      // eslint-disable-next-line
      const total = parseInt(qty) * NumberOnly(harga);
      dispatch(change('FormEditProductList', 'sub_total', total));
    };
  },
};
