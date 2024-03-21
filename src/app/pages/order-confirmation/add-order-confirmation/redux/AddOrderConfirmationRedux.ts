/* eslint-disable */

import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { change, getFormValues, reset } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { doDecryptData, getLocal, saveLocal } from '../../../../../setup/encrypt.js';
import { listProductModel } from '../model/AddOrderConfirmationModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import * as modalSecond from '../../../../modules/modal/ModalSecondRedux';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import * as customerRedux from './AddOrderConfirmationCustomerRedux';
import { dataURLtoPDFFile, NumberOnly } from '../../../../../setup/function.js';
import OC from '../component/OC.jsx';
import { postPDF } from '../../../../../setup/axios/Firebase';
import OCPDF from '../../list-order-confirmation/component/OCPDF.jsx';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddAddOC: '[ADDOC] Add Data Add OC',
  GetAddOC: '[ADDOC] Get Data Add OC',
  SetTypeProduct: '[ADDOC] Set Type Product',
  GetDetailDataProduct: '[ADDOC] Get Detail Data Product',
  SetTypeOC: '[ADDOC] Set Type OC',
  GetListProduct: '[ADDOC] Get List Product',
  GetListDiscount: '[ADDOC] Get List Discount',
  SaveData: '[ADDOC] Save Data',
  setIsSending: '[ADDOC] Set Is Sending',
};
export interface IAddOCState {
  isSending?: boolean;
  dataProduct?: Array<any>;
  typeProduct?: String;
  detailDataProduct?: any;
  typeOC?: String;
  listProduct?: Array<any>;
  listDiscount?: Array<any>;
  isPackage?: boolean;
  dataSend?: any;
}

const initialAddOCState: IAddOCState = {
  isSending: false,
  dataProduct: [],
  typeProduct: undefined,
  detailDataProduct: undefined,
  typeOC: undefined,
  listProduct: [],
  listDiscount: [],
  isPackage: false,
  dataSend: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-add-order-confirmation', whitelist: ['isSending'] },
  (state: IAddOCState = initialAddOCState, action: ActionWithPayload<IAddOCState>) => {
    switch (action.type) {
      case actionTypes.GetAddOC: {
        const data = action.payload?.dataProduct;
        return { ...state, dataProduct: data };
      }
      case actionTypes.SetTypeProduct: {
        const type = action.payload?.typeProduct;
        return { ...state, typeProduct: type };
      }
      case actionTypes.GetDetailDataProduct: {
        const data = action.payload?.detailDataProduct;
        return { ...state, detailDataProduct: data };
      }
      case actionTypes.SetTypeOC: {
        const type = action.payload?.typeOC;
        return { ...state, typeOC: type };
      }
      case actionTypes.GetListProduct: {
        const data = action.payload?.listProduct;
        const paket = action.payload?.isPackage;
        return { ...state, listProduct: data, isPackage: paket };
      }
      case actionTypes.GetListDiscount: {
        const data = action.payload?.listDiscount;
        return { ...state, listDiscount: data };
      }
      case actionTypes.SaveData: {
        const data = action.payload?.dataSend;
        return { ...state, dataSend: data };
      }
      case actionTypes.setIsSending: {
        const data = action.payload?.isSending;
        return { ...state, isSending: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setTypeOC: (type: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.SetTypeOC, payload: { typeOC: type } });
    };
  },
  getTypeOC: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('type_oc').then((type) => {
        dispatch(actions.setTypeOC(type[0]));
      });
    };
  },
  getProduct: (type: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.SetTypeProduct, payload: { typeProduct: type } });
      if (type === 'SOFTWARE') {
        AxiosGet('product/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_produk',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
            'persentase',
            'sub_total_diskon',
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
          dispatch({ type: actionTypes.GetAddOC, payload: { dataProduct: dataSave } });
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
            'type',
            'persentase',
            'sub_total_diskon',
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
          dispatch({ type: actionTypes.GetAddOC, payload: { dataProduct: dataSave } });
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
            'type',
            'persentase',
            'sub_total_diskon',
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
          dispatch({ type: actionTypes.GetAddOC, payload: { dataProduct: dataSave } });
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
            'type',
            'persentase',
            'sub_total_diskon',
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
          dispatch({ type: actionTypes.GetAddOC, payload: { dataProduct: dataSave } });
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
      const type = state.addorderconfirmation.typeProduct;
      if (type === 'SOFTWARE') {
        AxiosGet(`product/by-kode`, { params: { kode_produk: code } }).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_produk',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
            'persentase',
            'sub_total_diskon',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { dataProduct: dataDecrypt[0] },
          });
          dispatch(change('FormAddProductOC', 'qty', 1));
          dispatch(change('FormAddProductOC', 'product_name', dataDecrypt[0].nama_produk));
          dispatch(change('FormAddProductOC', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormAddProductOC', 'price', dataDecrypt[0].harga));
          dispatch(change('FormAddProductOC', 'type', dataDecrypt[0].type || '-'));
          dispatch(change('FormAddProductOC', 'sub_total', dataDecrypt[0].harga * 1));
        });
      } else if (type === 'CONSUMABLE') {
        AxiosGet(`consumable/by-kode`, { params: { kode_consumable: code } }).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_consumable',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
            'persentase',
            'sub_total_diskon',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { dataProduct: dataDecrypt[0] },
          });
          dispatch(change('FormAddProductOC', 'qty', 1));
          dispatch(change('FormAddProductOC', 'product_name', dataDecrypt[0].nama_consumable));
          dispatch(change('FormAddProductOC', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormAddProductOC', 'price', dataDecrypt[0].harga));
          dispatch(change('FormAddProductOC', 'type', dataDecrypt[0].type || '-'));
          dispatch(change('FormAddProductOC', 'sub_total', dataDecrypt[0].harga * 1));
        });
      } else if (type === 'HARDWARE') {
        AxiosGet(`hardware/by-kode`, { params: { kode_hardware: code } }).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_hardware',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
            'persentase',
            'sub_total_diskon',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { dataProduct: dataDecrypt[0] },
          });
          dispatch(change('FormAddProductOC', 'qty', 1));
          dispatch(change('FormAddProductOC', 'product_name', dataDecrypt[0].nama_hardware));
          dispatch(change('FormAddProductOC', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormAddProductOC', 'price', dataDecrypt[0].harga));
          dispatch(change('FormAddProductOC', 'type', dataDecrypt[0].type || '-'));
          dispatch(change('FormAddProductOC', 'sub_total', dataDecrypt[0].harga * 1));
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
            'type',
            'persentase',
            'sub_total_diskon',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { dataProduct: dataDecrypt[0] },
          });
          dispatch(change('FormAddProductOC', 'qty', 1));
          dispatch(change('FormAddProductOC', 'unit', 'PACKAGE'));
          dispatch(change('FormAddProductOC', 'product_name', dataDecrypt[0].nama_paket));
          dispatch(change('FormAddProductOC', 'price', dataDecrypt[0].total_harga));
          dispatch(change('FormAddProductOC', 'type', dataDecrypt[0].type || '-'));
          dispatch(change('FormAddProductOC', 'sub_total', dataDecrypt[0].total_harga * 1));
        });
      }
    };
  },
  addDataProduct: (data: any, oc_type: any) => {
    // eslint-disable-next-line
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const typeProd =
        state.addorderconfirmation.typeProduct.value || state.addorderconfirmation.typeProduct;
      getLocal('type_oc').then((resType) => {
        if (resType.length === 0) {
          const type = [];
          type.push(oc_type.value || oc_type);
          saveLocal('type_oc', type).then(() => {
            if (data.product_type === 'PACKAGE') {
              AxiosGet(`bundle/by-kode/${data.product}`).then((response: any) => {
                const dataDecrypt = doDecryptData(response.data[0], [
                  'kode_paket',
                  'status',
                  '_id',
                  'input_date',
                  'kode_produk',
                  'jenis_produk',
                  'harga',
                  'type',
                  'qty',
                  'sub_total',
                ]);
                getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((res) => {
                  if (res.length === 0) {
                    const dataArr: listProductModel[] = [];
                    let no = 1;
                    dataDecrypt.detail_produk.forEach((element: any) => {
                      const row: listProductModel = {
                        // eslint-disable-next-line
                        key: no,
                        harga: element.harga,
                        kode_produk: element.kode_produk.value || element.kode_produk,
                        nama_produk: element.nama_produk,
                        qty: element.qty || 1,
                        satuan: element.satuan,
                        sub_total: element.sub_total,
                        tipe_produk: element.jenis_produk || typeProd,
                        type: element.type || '-',
                      };
                      dataArr.push(row);
                      no += 1;
                    });

                    saveLocal('listProduct', dataArr, ['sub_total', 'qty', 'harga']).then(() => {
                      saveLocal('dataPackage', true).then(() => {
                        toast.success('Success Add Data !');
                        dispatch(reset('FormAddProductOC'));
                        dispatch(actions.getDataProductLocal());
                        dispatch(actions.discountManual());
                      });
                    });
                  } else {
                    const dataArr: listProductModel[] = res;
                    let no = res.length + 1;
                    dataDecrypt.detail_produk.forEach((element: any) => {
                      const row: listProductModel = {
                        // eslint-disable-next-line
                        key: no,
                        harga: element.harga,
                        kode_produk: element.kode_produk.value || element.kode_produk,
                        nama_produk: element.nama_produk,
                        qty: element.qty || 1,
                        satuan: element.satuan,
                        sub_total: element.harga,
                        tipe_produk: element.jenis_produk || typeProd,
                        type: element.type || '-',
                      };
                      dataArr.push(row);
                      no += 1;
                    });
                    saveLocal('listProduct', dataArr, ['sub_total', 'qty', 'harga']).then(() => {
                      saveLocal('dataPackage', true).then(() => {
                        toast.success('Success Add Data !');
                        dispatch(reset('FormAddProductOC'));
                        dispatch(actions.getDataProductLocal());
                        dispatch(actions.discountManual());
                      });
                    });
                  }
                });
              });
            } else {
              getLocal('listProduct', [
                'sub_total',
                'qty',
                'harga',
                'sub_total_diskon',
                'persentase',
              ]).then((res) => {
                if (res.length === 0) {
                  console.log('INI DI SINI A');

                  const dataArr = [];
                  const row: any = {
                    key: 1,
                    harga: data.price,
                    kode_produk: data.product.value || data.product,
                    nama_produk: data.product_name,
                    qty: data.qty || 1,
                    satuan: data.unit,
                    sub_total: data.sub_total,
                    tipe_produk: data.product_type.value || data.product_type || typeProd,
                    type: data.type || '-',
                    kode_diskon: data.discount_code || '-',
                    nama_diskon: data.discount_name || '-',
                    persentase: data.discount_percentage || 0,
                    sub_total_diskon: Number(data.sub_total_diskon || 0),
                  };
                  dataArr.push(row);
                  saveLocal('listProduct', dataArr, [
                    'sub_total',
                    'qty',
                    'harga',
                    'sub_total_diskon',
                    'persentase',
                  ]).then(() => {
                    saveLocal('dataPackage', false).then(() => {
                      toast.success('Success Add Data !');
                      dispatch(reset('FormAddProductOC'));
                      dispatch(actions.getDataProductLocal());
                      dispatch(actions.discountManual());
                    });
                  });
                } else {
                  console.log('INI DI SINI B');
                  const dataArr = res;
                  const no = res.length + 1;
                  const row: any = {
                    // eslint-disable-next-line
                    key: no,
                    harga: data.price,
                    kode_produk: data.product.value || data.product,
                    nama_produk: data.product_name,
                    qty: data.qty || 1,
                    satuan: data.unit,
                    sub_total: data.sub_total,
                    tipe_produk: data.product_type.value || data.product_type || typeProd,
                    type: data.type || '-',
                    kode_diskon: data.discount_code || '-',
                    nama_diskon: data.discount_name || '-',
                    persentase: data.discount_percentage || 0,
                    sub_total_diskon: Number(data.sub_total_diskon || 0),
                  };
                  dataArr.push(row);
                  saveLocal('listProduct', dataArr, [
                    'sub_total',
                    'qty',
                    'harga',
                    'sub_total_diskon',
                    'persentase',
                  ]).then(() => {
                    saveLocal('dataPackage', false).then(() => {
                      toast.success('Success Add Data !');
                      dispatch(reset('FormAddProductOC'));
                      dispatch(actions.getDataProductLocal());
                      dispatch(actions.discountManual());
                    });
                  });
                }
              });
            }
          });
        } else {
          // eslint-disable-next-line
          if (data.product_type === 'PACKAGE') {
            AxiosGet(`bundle/by-kode/${data.product}`).then((response: any) => {
              const dataDecrypt = doDecryptData(response.data[0], [
                'kode_paket',
                'status',
                '_id',
                'input_date',
                'kode_produk',
                'jenis_produk',
                'harga',
                'type',
                'qty',
                'sub_total',
              ]);
              getLocal('listProduct', [
                'sub_total',
                'qty',
                'harga',
                'sub_total_diskon',
                'persentase',
              ]).then((res) => {
                if (res.length === 0) {
                  const dataArr: listProductModel[] = [];
                  let no = 1;
                  dataDecrypt.detail_produk.forEach((element: any) => {
                    console.log('INI DI SINI C');
                    const row: listProductModel = {
                      // eslint-disable-next-line
                      key: no,
                      harga: element.harga,
                      kode_produk: element.kode_produk.value || element.kode_produk,
                      nama_produk: element.nama_produk,
                      qty: element.qty || 1,
                      satuan: element.satuan,
                      sub_total: element.sub_total,
                      tipe_produk: element.jenis_produk || typeProd,
                      type: element.type || '-',
                    };
                    dataArr.push(row);
                    no += 1;
                  });
                  saveLocal('listProduct', dataArr, [
                    'sub_total',
                    'qty',
                    'harga',
                    'sub_total_diskon',
                    'persentase',
                  ]).then(() => {
                    saveLocal('dataPackage', true).then(() => {
                      toast.success('Success Add Data !');
                      dispatch(reset('FormAddProductOC'));
                      dispatch(actions.getDataProductLocal());
                      dispatch(actions.discountManual());
                    });
                  });
                } else {
                  const dataArr: listProductModel[] = res;
                  let no = res.length + 1;
                  console.log('INI DI SINI D');
                  dataDecrypt.detail_produk.forEach((element: any) => {
                    const row: listProductModel = {
                      // eslint-disable-next-line
                      key: no,
                      harga: element.harga,
                      kode_produk: element.kode_produk.value || element.kode_produk,
                      nama_produk: element.nama_produk,
                      qty: element.qty || 1,
                      satuan: element.satuan,
                      sub_total: element.harga,
                      tipe_produk: element.jenis_produk || typeProd,
                      type: element.type || '-',
                    };
                    dataArr.push(row);
                    no += 1;
                  });
                  saveLocal('listProduct', dataArr, [
                    'sub_total',
                    'qty',
                    'harga',
                    'sub_total_diskon',
                    'persentase',
                  ]).then(() => {
                    saveLocal('dataPackage', true).then(() => {
                      toast.success('Success Add Data !');
                      dispatch(reset('FormAddProductOC'));
                      dispatch(actions.getDataProductLocal());
                      dispatch(actions.discountManual());
                    });
                  });
                }
              });
            });
          } else {
            getLocal('listProduct', [
              'sub_total',
              'qty',
              'harga',
              'sub_total_diskon',
              'persentase',
            ]).then((res) => {
              if (res.length === 0) {
                console.log('INI DI SINI E');
                const dataArr = [];
                const row: any = {
                  key: 1,
                  harga: data.price,
                  kode_produk: data.product.value || data.product,
                  nama_produk: data.product_name,
                  qty: data.qty || 1,
                  satuan: data.unit,
                  sub_total: data.sub_total,
                  tipe_produk: data.product_type.value || data.product_type || typeProd,
                  type: data.type || '-',
                  kode_diskon: data.discount_code,
                  nama_diskon: data.discount_name,
                  persentase: data.discount_percentage || 0,
                  sub_total_diskon: Number(data.sub_total_diskon),
                };
                dataArr.push(row);
                saveLocal('listProduct', dataArr, [
                  'sub_total',
                  'qty',
                  'harga',
                  'sub_total_diskon',
                  'persentase',
                ]).then(() => {
                  saveLocal('dataPackage', false).then(() => {
                    toast.success('Success Add Data !');
                    dispatch(reset('FormAddProductOC'));
                    dispatch(actions.getDataProductLocal());
                    dispatch(actions.discountManual());
                  });
                });
              } else {
                console.log('INI DI SINI F');
                const dataArr = res;
                const no = res.length + 1;
                const row: any = {
                  // eslint-disable-next-line
                  key: no,
                  harga: data.price,
                  kode_produk: data.product.value || data.product,
                  nama_produk: data.product_name,
                  qty: data.qty || 1,
                  satuan: data.unit,
                  sub_total: data.sub_total,
                  tipe_produk: data.product_type.value || data.product_type || typeProd,
                  type: data.type || '-',
                  kode_diskon: data.discount_code,
                  nama_diskon: data.discount_name,
                  persentase: data.discount_percentage || 0,
                  sub_total_diskon: Number(data.sub_total_diskon),
                };
                dataArr.push(row);
                saveLocal('listProduct', dataArr, [
                  'sub_total',
                  'qty',
                  'harga',
                  'sub_total_diskon',
                  'persentase',
                ]).then(() => {
                  saveLocal('dataPackage', false).then(() => {
                    toast.success('Success Add Data !');
                    dispatch(reset('FormAddProductOC'));
                    dispatch(actions.getDataProductLocal());
                    dispatch(actions.discountManual());
                  });
                });
              }
            });
          }
        }
      });
      dispatch(actions.discountManual());
    };
  },
  getDataProductLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduct', ['sub_total', 'qty', 'harga', 'persentase', 'sub_total_diskon']).then(
        (res) => {
          const respon = localStorage.getItem('dataPackage');
          dispatch({
            type: actionTypes.GetListProduct,
            payload: { listProduct: res, isPackage: respon },
          });
        }
      );
    };
  },
  deleteProductPackage: () => {
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
          saveLocal('dataPackage', false).then(() => {
            localStorage.removeItem('listProduct');
            dispatch({
              type: actionTypes.GetListProduct,
              payload: { listProduct: [], isPackage: false },
            });
            toast.success('Success Delete Data !');
            dispatch(actions.discountManual());
          });
        }
      });
    };
  },
  deleteProduct: (id: String) => {
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
          getLocal('listProduct', [
            'sub_total',
            'qty',
            'harga',
            'sub_total_diskon',
            'persentase',
          ]).then((res) => {
            const newArr = res.filter((object: any) => {
              // eslint-disable-next-line
              return object.key !== id;
            });
            saveLocal('listProduct', newArr, [
              'sub_total',
              'qty',
              'harga',
              'sub_total_diskon',
              'persentase',
            ]).then(() => {
              toast.success('Success Delete Data !');
              dispatch(actions.getDataProductLocal());
              dispatch(actions.discountManual());
            });
          });
        }
      });
    };
  },
  editProduct: (id: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduct', ['sub_total', 'qty', 'harga', 'sub_total_diskon', 'persentase']).then(
        (res) => {
          const dataFind = res.find((element: any) => element.key === id);
          dispatch(change('FormEditProduct', 'product_code', dataFind.kode_produk));
          dispatch(change('FormEditProduct', 'product_name', dataFind.nama_produk));
          dispatch(change('FormEditProduct', 'product_type', dataFind.tipe_produk));
          dispatch(change('FormEditProduct', 'qty', dataFind.qty || 1));
          dispatch(change('FormEditProduct', 'unit', dataFind.satuan));
          dispatch(change('FormEditProduct', 'price', dataFind.harga));
          dispatch(change('FormEditProduct', 'sub_total', dataFind.sub_total));
          dispatch(modalSecond.actions.show());
          dispatch(actions.discountManual());
        }
      );
    };
  },
  saveEditProduct: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('listProduct', ['sub_total', 'qty', 'harga', 'sub_total_diskon', 'persentase']).then(
        (res) => {
          const dataFind = res.filter((element: any) => element.kode_produk !== data.product_code);
          const dataArr: listProductModel[] = [];
          let no = 1;
          dataFind.forEach((element: any) => {
            const row: listProductModel = {
              // eslint-disable-next-line
              key: no,
              harga: element.harga,
              kode_produk: element.kode_produk,
              nama_produk: element.nama_produk,
              qty: element.qty || 1,
              satuan: element.satuan,
              sub_total: element.sub_total,
              tipe_produk: element.jenis_produk || element.tipe_produk,
              type: element.type || '-',
            };
            dataArr.push(row);
            no += 1;
          });
          const row: listProductModel = {
            // eslint-disable-next-line
            key: dataArr.length + 1,
            harga: data.price,
            kode_produk: data.product_code,
            nama_produk: data.product_name,
            qty: data.qty || 1,
            satuan: data.unit,
            sub_total: data.sub_total,
            tipe_produk: data.product_type.value || data.product_type,
            type: data.type || '-',
          };
          dataArr.push(row);
          saveLocal('listProduct', dataArr, [
            'sub_total',
            'qty',
            'harga',
            'sub_total_diskon',
            'persentase',
          ]).then(() => {
            toast.success('Success Add Data !');
            dispatch(reset('FormEditProduct'));
            dispatch(actions.getDataProductLocal());
            dispatch(utility.actions.hideLoading());
            dispatch(modalSecond.actions.hide());
            dispatch(actions.discountManual());
          });
        }
      );
    };
  },
  deleteDiscount: (id: String) => {
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
          getLocal('listDiscount', [
            'persentase',
            'diskon_rp',
            'final_price_after_discount',
            'nominal_diskon',
            'no_urut',
            'harga_sebelum_diskon',
            'harga_setelah_diskon',
          ]).then((res) => {
            const newArr = res.filter((object: any) => {
              return object.key !== id;
            });
            saveLocal('listDiscount', newArr, [
              'persentase',
              'diskon_rp',
              'final_price_after_discount',
              'nominal_diskon',
              'no_urut',
              'harga_sebelum_diskon',
              'harga_setelah_diskon',
            ]).then(() => {
              toast.success('Success Delete Data !');
              dispatch(actions.getDataDiscountLocal());
              dispatch(actions.discountManual());
            });
          });
        }
      });
    };
  },
  addDataDiscount: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listDiscount', [
        'persentase',
        'diskon_rp',
        'final_price_after_discount',
        'nominal_diskon',
        'no_urut',
        'harga_sebelum_diskon',
        'harga_setelah_diskon',
      ]).then((res) => {
        if (res.length === 0) {
          const dataArr = [];
          const row = {
            key: 1,
            no_urut: 1,
            kode_diskon: data.discount_code.value || data.discount_code,
            nama_diskon: data.discount_name,
            persentase: data.discount_percentage || 0,
            diskon_rp: data.discount_rp || 0,
            nominal_diskon: Number(data.nominal_discount) || 0,
            final_price_after_discount: data.final_price_after_discount || 0,
            harga_sebelum_diskon: data.final_price_before_discount || 0,
            harga_setelah_diskon: data.final_price_after_discount || 0,
          };
          dataArr.push(row);
          saveLocal('listDiscount', dataArr, [
            'persentase',
            'diskon_rp',
            'final_price_after_discount',
            'nominal_diskon',
            'no_urut',
            'harga_sebelum_diskon',
            'harga_setelah_diskon',
          ]).then(() => {
            toast.success('Success Add Data !');
            dispatch(reset('FormAddDiscount'));
            dispatch(actions.getDataDiscountLocal());
          });
        } else {
          const dataArr = res;
          const no = dataArr.length + 1;
          const row = {
            // eslint-disable-next-line
            key: no,
            no_urut: no,
            kode_diskon: data.discount_code,
            nama_diskon: data.discount_name,
            persentase: data.discount_percentage || 0,
            diskon_rp: data.discount_rp || 0,
            nominal_diskon: Number(data.nominal_discount) || 0,
            final_price_after_discount: data.final_price_after_discount || 0,
            harga_sebelum_diskon: data.final_price_before_discount || 0,
            harga_setelah_diskon: data.final_price_after_discount || 0,
          };
          dataArr.push(row);
          saveLocal('listDiscount', dataArr, [
            'persentase',
            'diskon_rp',
            'final_price_after_discount',
            'nominal_diskon',
            'no_urut',
            'harga_sebelum_diskon',
            'harga_setelah_diskon',
          ]).then(() => {
            toast.success('Success Add Data !');
            dispatch(reset('FormAddDiscount'));
            dispatch(actions.getDataDiscountLocal());
          });
          dispatch(actions.discountManual());
        }
      });
    };
  },
  getDataDiscountLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listDiscount', [
        'persentase',
        'diskon_rp',
        'final_price_after_discount',
        'nominal_diskon',
        'no_urut',
        'harga_sebelum_diskon',
        'harga_setelah_diskon',
      ]).then((res) => {
        dispatch({ type: actionTypes.GetListDiscount, payload: { listDiscount: res } });
      });
    };
  },
  calculateDiscount: (value: number, isPercentage: boolean = false) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const payload: any = getFormValues('FormAddProductOC')(state);
      dispatch(
        change(
          'FormAddProductOC',
          'sub_total_diskon',
          isPercentage ? (value / 100) * payload.sub_total : value
        )
      );
    };
  },
  calculateGlobalDiscount: (value: number, isPercentage: boolean = false) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const localData: any = await getLocal('listProduct', [
        'sub_total',
        'qty',
        'harga',
        'persentase',
        'sub_total_diskon',
      ]);
      const discountData: any = await getLocal('listDiscount', [
        'persentase',
        'diskon_rp',
        'final_price_after_discount',
        'nominal_diskon',
        'no_urut',
        'harga_sebelum_diskon',
        'harga_setelah_diskon',
      ]);
      const listSupport: any = await getLocal('listSupport', [
        'qty',
        'harga',
        'total_harga',
        'persentase',
        'total_harga_diskon',
      ]);
      const listProduction: any = await getLocal('listProduction', [
        'qty',
        'total_harga',
        'harga',
        'persentase',
        'total_harga_diskon',
      ]);
      let grandTotal = 0;
      const sub_total = localData.reduce((a: any, b: any) => a + b.sub_total, 0);
      const sub_total_diskon = localData.reduce((a: any, b: any) => a + b.sub_total_diskon, 0);
      const sub_total_supp = listSupport.reduce((a: any, b: any) => a + b.total_harga, 0);
      const sub_total_supp_diskon = listSupport.reduce(
        (a: any, b: any) => a + b.total_harga_diskon,
        0
      );
      const sub_total_production = listProduction.reduce((a: any, b: any) => a + b.total_harga, 0);
      const sub_total_production_diskon = listProduction.reduce(
        (a: any, b: any) => a + b.total_harga_diskon,
        0
      );
      if (discountData.length > 0) {
        let lastDiscountData = discountData[discountData.length - 1];
        grandTotal = lastDiscountData.final_price_after_discount;
      } else {
        grandTotal =
          sub_total -
          sub_total_diskon +
          (sub_total_supp - sub_total_supp_diskon) +
          (sub_total_production - sub_total_production_diskon);
      }

      dispatch(
        change(
          'FormAddDiscount',
          'final_price_after_discount',
          parseInt((grandTotal - (isPercentage ? (value / 100) * grandTotal : value)).toString())
        )
      );
      dispatch(change('FormAddDiscount', 'final_price_before_discount', Number(grandTotal)));
      dispatch(
        change(
          'FormAddDiscount',
          'nominal_discount',
          isPercentage ? (value / 100) * grandTotal : value
        )
      );
    };
  },
  postAddOC: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state = getState();
      dispatch(utility.actions.showLoadingButton());
      getLocal('dataCustomer').then((resCust) => {
        if (resCust.length === 0) {
          toast.error('Fill Customer Data First !');
          dispatch(utility.actions.hideLoading());
        } else {
          getLocal('listProduct', [
            'sub_total',
            'qty',
            'harga',
            'persentase',
            'sub_total_diskon',
          ]).then((resProd) => {
            if (resProd.length === 0) {
              toast.error('Fill The Product First !');
              dispatch(utility.actions.hideLoading());
            } else {
              getLocal('listDiscount', [
                'persentase',
                'diskon_rp',
                'final_price_after_discount',
                'nominal_diskon',
                'no_urut',
                'harga_sebelum_diskon',
                'harga_setelah_diskon',
              ]).then((resDisc) => {
                getLocal('type_oc').then((resType) => {
                  if (resType.length === 0) {
                    toast.error('Fill Product Data First !');
                    dispatch(utility.actions.hideLoading());
                  } else {
                    getLocal('listSupport', [
                      'qty',
                      'harga',
                      'total_harga',
                      'persentase',
                      'total_harga_diskon',
                      'kode_satuan',
                    ]).then((resSupp) => {
                      const dataSupportService = resSupp.map((support: any) => {
                        return {
                          nama_support_service: support.nama_support_service,
                          no_support_service: support.no_support_service,
                          kode_satuan: support.satuan,
                          qty: support.qty,
                          harga: support.harga,
                          total_harga: support.total_harga,
                          kode_diskon: support.kode_diskon,
                          nama_diskon: support.nama_diskon,
                          persentase: Number(support.persentase),
                          total_harga_diskon: support.total_harga_diskon,
                        };
                      });
                      getLocal('listProduction', [
                        'qty',
                        'total_harga',
                        'harga',
                        'persentase',
                        'total_harga_diskon',
                        'kode_satuan',
                      ]).then((resProdServ) => {
                        const dataProdService = resProdServ.map((prod: any) => {
                          return {
                            nama_production_service: prod.nama_production_service,
                            no_production_service: prod.no_production_service,
                            kode_satuan: prod.satuan,
                            qty: prod.qty,
                            total_harga: prod.total_harga,
                            kode_diskon: prod.kode_diskon,
                            nama_diskon: prod.nama_diskon,
                            persentase: Number(prod.persentase),
                            total_harga_diskon: prod.total_harga_diskon,
                          };
                        });

                        const dataProd = resProd.map((element: any) => {
                          return {
                            kode_produk: element.kode_produk.value || element.kode_produk,
                            nama_produk: element.nama_produk,
                            jenis_produk: element.tipe_produk,
                            satuan: element.satuan,
                            // eslint-disable-next-line
                            qty: parseInt(element.qty) || 1,
                            harga: element.harga,
                            sub_total: element.sub_total,
                            type: element.type || '-',
                            kode_diskon: element.kode_diskon,
                            nama_diskon: element.nama_diskon,
                            persentase: Number(element.persentase),
                            sub_total_diskon: element.sub_total_diskon,
                          };
                        });
                        const dataDisc = resDisc.map((element: any) => {
                          return {
                            kode_diskon: element.kode_diskon,
                            nama_diskon: element.nama_diskon,
                            persentase: element.persentase / 100,
                            nominal_diskon: element.nominal_diskon,
                            sub_total: element.diskon_rp,
                            no_urut: element.no_urut,
                            harga_setelah_diskon: element.harga_setelah_diskon,
                            harga_sebelum_diskon: element.harga_sebelum_diskon,
                          };
                        });
                        let formDiscountManual: any = getFormValues('FormAddDiscountManual')(state);
                        const onSendData = {
                          kode_toko: resCust.central_store_code.value || resCust.central_store_code,
                          nama_toko: resCust.central_store_name,
                          kode_cabang: resCust.branch_store_code.value || resCust.branch_store_code,
                          nama_cabang: resCust.branch_store_name,
                          nama_customer: resCust.customer_name || '-',
                          alamat_cabang: resCust.address,
                          alamat_korespondensi: resCust.correspondence_address,
                          kota: resCust.city || '-',
                          telepon: resCust.telephone || '-',
                          email: resCust.email || '-',
                          kode_staff: resCust.staff,
                          kode_reseller: resCust.referral || '-',
                          biaya_reseller: resCust.reseller_fee || 0,
                          jenis_ok: resType[0],
                          detail_produk: dataProd,
                          detail_diskon: dataDisc,
                          detail_support_service: dataSupportService,
                          detail_production_service: dataProdService,
                          // eslint-disable-next-line
                          total_harga: Math.ceil(formDiscountManual.grand_total),
                          deskripsi_header: '-',
                          waktu_pengiriman: '-',
                          sistem_pembayaran: '-',
                          deskripsi_footer: '-',
                          keterangan: '-',
                          diskon_manual: formDiscountManual?.manual_discount ?? 0,
                        };
                        console.log(onSendData);
                        AxiosPost('order-confirmation', onSendData)
                          .then((res: any) => {
                            AxiosGet(
                              // eslint-disable-next-line
                              `order-confirmation/by-id/${res._id}`
                            ).then((resDetail) => {
                              const dataDecrypt = doDecryptData(resDetail.data, [
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
                                'sub_total_diskon',
                                'nominal_diskon',
                                'diskon_manual',
                                'total_harga_diskon',
                                'kode_satuan',
                                'harga_setelah_diskon',
                                'harga_sebelum_diskon',
                                'no_urut',
                              ]);
                              const desc = {
                                header_desc:
                                  'Sebelumnya kami ucapkan terima kasih atas kerjasama yang telah terjalin selama ini. Bersama ini kami sampaikan Order Konfirmasi Harga Software Nagatech Gold Store Solution web based (Online) dengan kondisi sbb :',
                                waktu_pengiriman: '... Hari setelah order konfirmasi disetujui',
                                sistem_pembayaran: '...% pada saat order konfirmasi disetujui',
                                keterangan:
                                  'Harga tersebut termasuk:\nBiaya garansi software selama berlangganan online/cloud & maintenance\nBiaya instalasi software\nBiaya pelatihan User\nHarga tersebut belum termasuk:\nBiaya langganan online/cloud & maintenance \nNagagold+ Member + Accessories Rp.900.000 (Sembilan Ratus Ribu Rupiah) perbulan.\nBiaya langganan online/cloud & maintenance \nsoftware cucian Rp. 400.000 ( Empat Ratus Ribu Rupiah) perbulan',
                                footer_desc:
                                  'Demikianlah Order Konfirmasi ini kami sampaikan. Apabila setuju dengan kondisi tersebut diatas, mohon Order Konfirmasi ini ditandatangani dan dikirimkan kembali kepada kami.',
                              };
                              console.log(dataDecrypt);
                              console.log(desc);
                              const pdf64 = OC(dataDecrypt, desc);
                              const file = dataURLtoPDFFile(
                                pdf64,
                                `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`
                              );
                              postPDF(
                                file,
                                `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`
                              )
                                .then(() => {
                                  Swal.fire('Success!', 'Success Add Data !', 'success').then(
                                    () => {
                                      OCPDF(dataDecrypt, desc);
                                      localStorage.removeItem('dataCustomer');
                                      localStorage.removeItem('listProduct');
                                      localStorage.removeItem('listDiscount');
                                      localStorage.removeItem('type_oc');
                                      localStorage.removeItem('listSupport');
                                      localStorage.removeItem('listProduction');
                                      dispatch(modal.actions.hide());
                                      dispatch(utility.actions.hideLoading());
                                      dispatch(customerRedux.actions.PrevCustomer());
                                      window.location.reload();
                                    }
                                  );
                                })
                                .catch(() => {
                                  Swal.fire().then(() => {
                                    OCPDF(dataDecrypt, desc);
                                    localStorage.removeItem('dataCustomer');
                                    localStorage.removeItem('listProduct');
                                    localStorage.removeItem('listDiscount');
                                    localStorage.removeItem('type_oc');
                                    localStorage.removeItem('listSupport');
                                    localStorage.removeItem('listProduction');
                                    dispatch(modal.actions.hide());
                                    dispatch(utility.actions.hideLoading());
                                    dispatch(customerRedux.actions.PrevCustomer());
                                    window.location.reload();
                                  });
                                });
                            });
                          })
                          .catch((error) => {
                            dispatch(utility.actions.hideLoading());
                            const dataErr = error.response?.data;
                            toast.error(dataErr.message || 'Failed Add Data !');
                          });
                        dispatch({
                          type: actionTypes.SaveData,
                          payload: { dataSend: onSendData },
                        });
                        dispatch(modal.actions.show());
                      });
                    });
                  }
                });
              });
            }
          });
        }
      });
    };
  },
  cancelOC: () => {
    return async (): Promise<void> => {
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
          localStorage.removeItem('dataCustomer');
          localStorage.removeItem('listProduct');
          localStorage.removeItem('listDiscount');
          localStorage.removeItem('type_oc');
          localStorage.removeItem('listSupport');
          localStorage.removeItem('listProduction');
          window.location.reload();
        }
      });
    };
  },
  submitPostDataOC: (data: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const state = getState();
      const sendData = state.addorderconfirmation.dataSend;
      sendData.deskripsi_header = data.description_header;
      sendData.deskripsi_footer = data.description_footer;
      sendData.waktu_pengiriman = data.waktu_pengiriman;
      sendData.sistem_pembayaran = data.sistem_pembayaran;
      sendData.keterangan = data.keterangan;
      AxiosPost('order-confirmation', sendData)
        .then(() => {
          localStorage.removeItem('dataCustomer');
          localStorage.removeItem('listProduct');
          localStorage.removeItem('listDiscount');
          localStorage.removeItem('type_oc');
          localStorage.removeItem('listSupport');
          localStorage.removeItem('listProduction');
          dispatch(modal.actions.hide());
          dispatch(utility.actions.hideLoading());
          toast.success('Success Add Data !');
          window.location.reload();
        })
        .catch((error) => {
          dispatch(utility.actions.hideLoading());
          const dataErr = error.response?.data;
          toast.error(dataErr.message || 'Failed Add Data !');
        });
    };
  },
  setSubTotal: (qty: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormAddProductOC.values;
      // eslint-disable-next-line
      const price = data.price;
      // eslint-disable-next-line
      const total = parseInt(qty) * parseInt(price);
      dispatch(change('FormAddProductOC', 'sub_total', total));
    };
  },
  setSubTotalEdit: (qty: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormEditProduct.values;
      // eslint-disable-next-line
      const price = data.price;
      // eslint-disable-next-line
      const total = parseInt(qty) * parseInt(price);
      dispatch(change('FormEditProduct', 'sub_total', total));
    };
  },
  setSubTotalRp: (harga: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormAddProductOC.values;
      // eslint-disable-next-line
      const qty = data.qty;
      // eslint-disable-next-line
      const total = parseInt(qty) * NumberOnly(harga);
      dispatch(change('FormAddProductOC', 'sub_total', total));
    };
  },
  setSubTotalRpEdit: (harga: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormEditProduct.values;
      // eslint-disable-next-line
      const qty = data.qty;
      // eslint-disable-next-line
      const total = parseInt(qty) * NumberOnly(harga);
      dispatch(change('FormEditProduct', 'sub_total', total));
    };
  },
  discountManual: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const listProduct: any = await getLocal('listProduct', [
        'sub_total',
        'qty',
        'harga',
        'persentase',
        'sub_total_diskon',
      ]);
      const discountData: any = await getLocal('listDiscount', [
        'persentase',
        'diskon_rp',
        'final_price_after_discount',
        'nominal_diskon',
        'no_urut',
        'harga_sebelum_diskon',
        'harga_setelah_diskon',
      ]);
      const listSupport: any = await getLocal('listSupport', [
        'qty',
        'harga',
        'total_harga',
        'persentase',
        'total_harga_diskon',
      ]);
      const listProduction: any = await getLocal('listProduction', [
        'qty',
        'total_harga',
        'harga',
        'persentase',
        'total_harga_diskon',
      ]);
      const sub_total_product = listProduct.reduce((a: any, b: any) => a + b.sub_total, 0);
      const sub_total_product_diskon = listProduct.reduce(
        (a: any, b: any) => a + b.sub_total_diskon,
        0
      );
      const sub_total_supp = listSupport.reduce((a: any, b: any) => a + b.total_harga, 0);
      const sub_total_supp_diskon = listSupport.reduce(
        (a: any, b: any) => a + b.total_harga_diskon,
        0
      );
      const sub_total_production = listProduction.reduce((a: any, b: any) => a + b.total_harga, 0);
      const sub_total_production_diskon = listProduction.reduce(
        (a: any, b: any) => a + b.total_harga_diskon,
        0
      );
      const sub_total =
        sub_total_product -
        sub_total_product_diskon +
        (sub_total_production - sub_total_supp_diskon) +
        (sub_total_supp - sub_total_production_diskon);
      const formState: any = getFormValues('FormAddDiscountManual')(state);
      console.log(formState);

      if (discountData.length > 0) {
        const lastDiscountData = discountData[discountData.length - 1];
        dispatch(
          change('FormAddDiscountManual', 'sub_total', lastDiscountData.final_price_after_discount)
        );
        dispatch(
          change(
            'FormAddDiscountManual',
            'grand_total',
            lastDiscountData.final_price_after_discount - (formState?.manual_discount ?? 0)
          )
        );
      } else {
        dispatch(change('FormAddDiscountManual', 'sub_total', sub_total));
        dispatch(
          change(
            'FormAddDiscountManual',
            'grand_total',
            sub_total - (formState?.manual_discount ?? 0)
          )
        );
      }
    };
  },
  changeDiscountManual: (data: number) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const listProduct: any = await getLocal('listProduct', [
        'sub_total',
        'qty',
        'harga',
        'persentase',
        'sub_total_diskon',
      ]);
      const discountData: any = await getLocal('listDiscount', [
        'persentase',
        'diskon_rp',
        'final_price_after_discount',
        'nominal_diskon',
        'no_urut',
        'harga_sebelum_diskon',
        'harga_setelah_diskon',
      ]);
      const listSupport: any = await getLocal('listSupport', [
        'qty',
        'harga',
        'total_harga',
        'persentase',
        'total_harga_diskon',
      ]);
      const listProduction: any = await getLocal('listProduction', [
        'qty',
        'total_harga',
        'harga',
        'persentase',
        'total_harga_diskon',
      ]);
      const sub_total_product = listProduct.reduce((a: any, b: any) => a + b.sub_total, 0);
      const sub_total_product_diskon = listProduct.reduce(
        (a: any, b: any) => a + b.sub_total_diskon,
        0
      );
      const sub_total_supp = listSupport.reduce((a: any, b: any) => a + b.total_harga, 0);
      const sub_total_supp_diskon = listSupport.reduce(
        (a: any, b: any) => a + b.total_harga_diskon,
        0
      );
      const sub_total_production = listProduction.reduce((a: any, b: any) => a + b.total_harga, 0);
      const sub_total_production_diskon = listProduction.reduce(
        (a: any, b: any) => a + b.total_harga_diskon,
        0
      );
      const sub_total =
        sub_total_product -
        sub_total_product_diskon +
        (sub_total_production - sub_total_supp_diskon) +
        (sub_total_supp - sub_total_production_diskon);

      if (discountData.length > 0) {
        const lastDiscountData = discountData[discountData.length - 1];
        dispatch(
          change(
            'FormAddDiscountManual',
            'sub_total',
            parseInt(lastDiscountData.final_price_after_discount)
          )
        );
        dispatch(
          change(
            'FormAddDiscountManual',
            'grand_total',
            parseInt(lastDiscountData.final_price_after_discount) - data
          )
        );
      } else {
        dispatch(change('FormAddDiscountManual', 'sub_total', parseInt(sub_total.toString())));
        dispatch(
          change('FormAddDiscountManual', 'grand_total', parseInt(sub_total.toString()) - data)
        );
      }
    };
  },

  dummyPrint: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const data = {
        kode_toko: 'TESTINGNEW',
        nama_toko: 'TESTING NEW',
        kode_cabang: 'PUSAT',
        nama_cabang: 'PUSAT',
        nama_customer: 'TESTING NEW',
        alamat_cabang: 'Jl. Testing',
        alamat_korespondensi: 'Jl. Testing',
        kota: 'BANDUNG',
        telepon: '085923192389',
        email: 'TESTING@gmail.com',
        kode_staff: 'CC',
        kode_reseller: '-',
        biaya_reseller: 0,
        jenis_ok: 'INCLUDE SOFTWARE',
        detail_produk: [
          {
            kode_produk: 'NGSSOF',
            nama_produk: 'NAGATECH GOLD STORE SOLUTION OFFLINE FULL DESKTOP VERSION',
            jenis_produk: 'SOFTWARE',
            satuan: 'PACKET',
            qty: 1,
            harga: 35000000,
            sub_total: 35000000,
            type: 'OFFLINE',
            kode_diskon: '-',
            nama_diskon: '-',
            persentase: 0,
            sub_total_diskon: 0,
          },
          {
            kode_produk: 'NGSWB',
            nama_produk: 'NAGATECH GROCERY SOLUTION FULL ONLINE WEB BASED',
            jenis_produk: 'SOFTWARE',
            satuan: 'PACKET',
            qty: 1,
            harga: 250000000,
            sub_total: 250000000,
            type: 'ONLINE',
            kode_diskon: 'DHS',
            nama_diskon: 'DISKON KHUSUS SOFTWARE',
            persentase: 4,
            sub_total_diskon: 10000000,
          },
          {
            kode_produk: 'NMOFF',
            nama_produk: 'NAGATECH MEMBER SOLUTION DESKTOP BASED',
            jenis_produk: 'SOFTWARE',
            satuan: 'UNIT',
            qty: 1,
            harga: 17000000,
            sub_total: 17000000,
            type: 'OFFLINE',
            kode_diskon: 'SOFTWARE',
            nama_diskon: 'SOFTWARE',
            persentase: 0,
            sub_total_diskon: 2000000,
          },
        ],
        detail_diskon: [
          {
            kode_diskon: 'DHS',
            nama_diskon: 'DISKON KHUSUS SOFTWARE',
            persentase: 0.05,
            nominal_diskon: 14667000,
            sub_total: 0,
            no_urut: 1,
            harga_setelah_diskon: 278673000,
            harga_sebelum_diskon: 293340000,
          },
          {
            kode_diskon: 'DK',
            nama_diskon: 'DISCOUNT KHUSUS',
            persentase: 0,
            nominal_diskon: 2000000,
            sub_total: 2000000,
            no_urut: 2,
            harga_setelah_diskon: 276673000,
            harga_sebelum_diskon: 278673000,
          },
          {
            kode_diskon: 'SOFTWARE',
            nama_diskon: 'SOFTWARE',
            persentase: 0.03,
            nominal_diskon: 8300190,
            sub_total: 0,
            no_urut: 3,
            harga_setelah_diskon: 268372810,
            harga_sebelum_diskon: 276673000,
          },
        ],
        detail_support_service: [
          {
            nama_support_service: 'pelatihan',
            no_support_service: 'SPS-190324-0001',
            kode_satuan: 'DYS',
            qty: 3,
            harga: 0,
            total_harga: 0,
            kode_diskon: '-',
            nama_diskon: '-',
            persentase: 0,
            total_harga_diskon: 0,
          },
          {
            nama_support_service: 'EXTEND PELATIHAN',
            no_support_service: 'SPS-190324-0002',
            kode_satuan: 'DYS',
            qty: 2,
            harga: 500000,
            total_harga: 1000000,
            kode_diskon: 'DHS',
            nama_diskon: 'DISKON KHUSUS SOFTWARE',
            persentase: 3,
            total_harga_diskon: 30000,
          },
        ],
        detail_production_service: [
          {
            nama_production_service: 'perubahan domain',
            no_production_service: 'PDS-190324-0001',
            kode_satuan: 'DYS',
            qty: 2,
            total_harga: 1000000,
            kode_diskon: 'DK',
            nama_diskon: 'DISCOUNT KHUSUS',
            persentase: 0,
            total_harga_diskon: 100000,
          },
          {
            nama_production_service: 'SISTEM PEMBAYARAN BARU',
            no_production_service: 'PDS-190324-0002',
            kode_satuan: 'DYS',
            qty: 3,
            total_harga: 1500000,
            kode_diskon: 'DHS',
            nama_diskon: 'DISKON KHUSUS SOFTWARE',
            persentase: 2,
            total_harga_diskon: 30000,
          },
        ],
        total_harga: 268000000,
        deskripsi_header: '-',
        waktu_pengiriman: '-',
        sistem_pembayaran: '-',
        deskripsi_footer: '-',
        keterangan: '-',
        diskon_manual: 372810,
      };
      const desc = {
        header_desc:
          'Sebelumnya kami ucapkan terima kasih atas kerjasama yang telah terjalin selama ini. Bersama ini kami sampaikan Order Konfirmasi Harga Software Nagatech Gold Store Solution web based (Online) dengan kondisi sbb :',
        waktu_pengiriman: '... Hari setelah order konfirmasi disetujui',
        sistem_pembayaran: '...% pada saat order konfirmasi disetujui',
        keterangan:
          'Harga tersebut termasuk:\nBiaya garansi software selama berlangganan online/cloud & maintenance\nBiaya instalasi software\nBiaya pelatihan User\nHarga tersebut belum termasuk:\nBiaya langganan online/cloud & maintenance \nNagagold+ Member + Accessories Rp.900.000 (Sembilan Ratus Ribu Rupiah) perbulan.\nBiaya langganan online/cloud & maintenance \nsoftware cucian Rp. 400.000 ( Empat Ratus Ribu Rupiah) perbulan',
        footer_desc:
          'Demikianlah Order Konfirmasi ini kami sampaikan. Apabila setuju dengan kondisi tersebut diatas, mohon Order Konfirmasi ini ditandatangani dan dikirimkan kembali kepada kami.',
      };
      OCPDF(data, desc);
    };
  },
};
