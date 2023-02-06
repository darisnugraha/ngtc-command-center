import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { change, reset } from 'redux-form';
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
  addDataProduct: (data: any, oc_type: String) => {
    // eslint-disable-next-line
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const typeProd = state.addorderconfirmation.typeProduct;
      getLocal('type_oc').then((resType) => {
        if (resType.length === 0) {
          const type = [];
          type.push(oc_type);
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
                        kode_produk: element.kode_produk,
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
                        kode_produk: element.kode_produk,
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
                      });
                    });
                  }
                });
              });
            } else {
              getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((res) => {
                if (res.length === 0) {
                  const dataArr = [];
                  const row: listProductModel = {
                    key: 1,
                    harga: data.price,
                    kode_produk: data.product,
                    nama_produk: data.product_name,
                    qty: data.qty || 1,
                    satuan: data.unit,
                    sub_total: data.sub_total,
                    tipe_produk: data.product_type || typeProd,
                    type: data.type || '-',
                  };
                  dataArr.push(row);
                  saveLocal('listProduct', dataArr, ['sub_total', 'qty', 'harga']).then(() => {
                    saveLocal('dataPackage', false).then(() => {
                      toast.success('Success Add Data !');
                      dispatch(reset('FormAddProductOC'));
                      dispatch(actions.getDataProductLocal());
                    });
                  });
                } else {
                  const dataArr = res;
                  const no = res.length + 1;
                  const row: listProductModel = {
                    // eslint-disable-next-line
                    key: no,
                    harga: data.price,
                    kode_produk: data.product,
                    nama_produk: data.product_name,
                    qty: data.qty || 1,
                    satuan: data.unit,
                    sub_total: data.sub_total,
                    tipe_produk: data.product_type || typeProd,
                    type: data.type || '-',
                  };
                  dataArr.push(row);
                  saveLocal('listProduct', dataArr, ['sub_total', 'qty', 'harga']).then(() => {
                    saveLocal('dataPackage', false).then(() => {
                      toast.success('Success Add Data !');
                      dispatch(reset('FormAddProductOC'));
                      dispatch(actions.getDataProductLocal());
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
                      kode_produk: element.kode_produk,
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
                      kode_produk: element.kode_produk,
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
                    });
                  });
                }
              });
            });
          } else {
            getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((res) => {
              if (res.length === 0) {
                const dataArr = [];
                const row: listProductModel = {
                  key: 1,
                  harga: data.price,
                  kode_produk: data.product,
                  nama_produk: data.product_name,
                  qty: data.qty || 1,
                  satuan: data.unit,
                  sub_total: data.sub_total,
                  tipe_produk: data.product_type || typeProd,
                  type: data.type || '-',
                };
                dataArr.push(row);
                saveLocal('listProduct', dataArr, ['sub_total', 'qty', 'harga']).then(() => {
                  saveLocal('dataPackage', false).then(() => {
                    toast.success('Success Add Data !');
                    dispatch(reset('FormAddProductOC'));
                    dispatch(actions.getDataProductLocal());
                  });
                });
              } else {
                const dataArr = res;
                const no = res.length + 1;
                const row: listProductModel = {
                  // eslint-disable-next-line
                  key: no,
                  harga: data.price,
                  kode_produk: data.product,
                  nama_produk: data.product_name,
                  qty: data.qty || 1,
                  satuan: data.unit,
                  sub_total: data.sub_total,
                  tipe_produk: data.product_type || typeProd,
                  type: data.type || '-',
                };
                dataArr.push(row);
                saveLocal('listProduct', dataArr, ['sub_total', 'qty', 'harga']).then(() => {
                  saveLocal('dataPackage', false).then(() => {
                    toast.success('Success Add Data !');
                    dispatch(reset('FormAddProductOC'));
                    dispatch(actions.getDataProductLocal());
                  });
                });
              }
            });
          }
        }
      });
    };
  },
  getDataProductLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((res) => {
        const respon = localStorage.getItem('dataPackage');
        dispatch({
          type: actionTypes.GetListProduct,
          payload: { listProduct: res, isPackage: respon },
        });
      });
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
          getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((res) => {
            const newArr = res.filter((object: any) => {
              // eslint-disable-next-line
              return object.key !== id;
            });
            saveLocal('listProduct', newArr, ['sub_total', 'qty', 'harga']).then(() => {
              toast.success('Success Delete Data !');
              dispatch(actions.getDataProductLocal());
            });
          });
        }
      });
    };
  },
  editProduct: (id: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((res) => {
        const dataFind = res.find((element: any) => element.key === id);
        dispatch(change('FormEditProduct', 'product_code', dataFind.kode_produk));
        dispatch(change('FormEditProduct', 'product_name', dataFind.nama_produk));
        dispatch(change('FormEditProduct', 'product_type', dataFind.tipe_produk));
        dispatch(change('FormEditProduct', 'qty', dataFind.qty || 1));
        dispatch(change('FormEditProduct', 'unit', dataFind.satuan));
        dispatch(change('FormEditProduct', 'price', dataFind.harga));
        dispatch(change('FormEditProduct', 'sub_total', dataFind.sub_total));
        dispatch(modalSecond.actions.show());
      });
    };
  },
  saveEditProduct: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((res) => {
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
            sub_total: element.harga,
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
          tipe_produk: data.product_type,
          type: data.type || '-',
        };
        dataArr.push(row);
        saveLocal('listProduct', dataArr, ['sub_total', 'qty', 'harga']).then(() => {
          toast.success('Success Add Data !');
          dispatch(reset('FormEditProduct'));
          dispatch(actions.getDataProductLocal());
          dispatch(utility.actions.hideLoading());
          dispatch(modalSecond.actions.hide());
        });
      });
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
          getLocal('listDiscount', ['persentase', 'diskon_rp']).then((res) => {
            const newArr = res.filter((object: any) => {
              return object.key !== id;
            });
            saveLocal('listDiscount', newArr, ['persentase', 'diskon_rp']).then(() => {
              toast.success('Success Delete Data !');
              dispatch(actions.getDataDiscountLocal());
            });
          });
        }
      });
    };
  },
  addDataDiscount: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listDiscount', ['persentase', 'diskon_rp']).then((res) => {
        if (res.length === 0) {
          const dataArr = [];
          const row = {
            key: 1,
            kode_diskon: data.discount_code,
            nama_diskon: data.discount_name,
            persentase: data.discount_percentage || 0,
            diskon_rp: data.discount_rp || 0,
          };
          dataArr.push(row);
          saveLocal('listDiscount', dataArr, ['persentase', 'diskon_rp']).then(() => {
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
            nama_diskon: data.discount_name,
            persentase: data.percentage || 0,
            diskon_rp: data.discount_rp || 0,
          };
          dataArr.push(row);
          saveLocal('listDiscount', dataArr, ['persentase', 'diskon_rp']).then(() => {
            toast.success('Success Add Data !');
            dispatch(reset('FormAddDiscount'));
            dispatch(actions.getDataDiscountLocal());
          });
        }
      });
    };
  },
  getDataDiscountLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listDiscount', ['persentase', 'diskon_rp']).then((res) => {
        dispatch({ type: actionTypes.GetListDiscount, payload: { listDiscount: res } });
      });
    };
  },
  postAddOC: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('dataCustomer').then((resCust) => {
        if (resCust.length === 0) {
          toast.error('Fill Customer Data First !');
          dispatch(utility.actions.hideLoading());
        } else {
          getLocal('listProduct', ['sub_total', 'qty', 'harga']).then((resProd) => {
            if (resProd.length === 0) {
              toast.error('Fill The Product First !');
              dispatch(utility.actions.hideLoading());
            } else {
              getLocal('listDiscount', ['persentase', 'diskon_rp']).then((resDisc) => {
                getLocal('type_oc').then((resType) => {
                  if (resType.length === 0) {
                    toast.error('Fill Product Data First !');
                    dispatch(utility.actions.hideLoading());
                  } else {
                    getLocal('listSupport', ['qty', 'harga', 'total_harga']).then((resSupp) => {
                      getLocal('listProduction', ['qty', 'total_harga']).then((resProdServ) => {
                        const ProductSoftware = resProd.filter(
                          (value: any) => value.tipe_produk === 'SOFTWARE'
                        );
                        const ProductHardware = resProd.filter(
                          (value: any) => value.tipe_produk === 'HARDWARE'
                        );
                        const ProductConsumable = resProd.filter(
                          (value: any) => value.tipe_produk === 'CONSUMABLE'
                        );
                        const DiscountSoftware = resDisc.filter((value: any) =>
                          value.nama_diskon.includes('SOFTWARE')
                        );
                        const DiscountHardware = resDisc.filter((value: any) =>
                          value.nama_diskon.includes('HARDWARE')
                        );
                        const DiscountConsumable = resDisc.filter((value: any) =>
                          value.nama_diskon.includes('CONSUMABLE')
                        );
                        const totalSoftware = ProductSoftware.reduce(
                          (a: any, b: any) => a + b.harga * b.qty,
                          0
                        );
                        const totalHardware = ProductHardware.reduce(
                          (a: any, b: any) => a + b.harga * b.qty,
                          0
                        );
                        const totalConsumable = ProductConsumable.reduce(
                          (a: any, b: any) => a + b.harga * b.qty,
                          0
                        );

                        const totalDiscountSoftwareRp = DiscountSoftware.reduce(
                          (a: any, b: any) => a + b.diskon_rp,
                          0
                        );
                        const totalDiscountHardwareRp = DiscountHardware.reduce(
                          (a: any, b: any) => a + b.diskon_rp,
                          0
                        );
                        const totalDiscountConsumableRp = DiscountConsumable.reduce(
                          (a: any, b: any) => a + b.diskon_rp,
                          0
                        );
                        const SoftwarePersen = DiscountSoftware.reduce(
                          (a: any, b: any) => a + b.persentase,
                          0
                        );
                        const HardwarePersen = DiscountHardware.reduce(
                          (a: any, b: any) => a + b.persentase,
                          0
                        );
                        const ConsumablePersen = DiscountConsumable.reduce(
                          (a: any, b: any) => a + b.persentase,
                          0
                        );

                        const subTotalSoftware =
                          totalSoftware -
                            (totalDiscountSoftwareRp + totalSoftware * (SoftwarePersen / 100)) || 0;
                        const subTotalHardware =
                          totalHardware -
                            (totalDiscountHardwareRp + totalHardware * (HardwarePersen / 100)) || 0;
                        const subTotalConsumable =
                          totalConsumable -
                            (totalDiscountConsumableRp +
                              totalConsumable * (ConsumablePersen / 100)) || 0;

                        const grandTotal =
                          subTotalSoftware +
                          subTotalHardware +
                          subTotalConsumable +
                          (resSupp[0]?.total_harga || 0) +
                          (resProdServ[0]?.total_harga || 0);

                        const dataProd: {
                          kode_produk: any;
                          nama_produk: any;
                          jenis_produk: any;
                          satuan: any;
                          qty: any;
                          harga: any;
                          sub_total: any;
                          type: any;
                        }[] = [];
                        resProd.forEach((element: any) => {
                          const row = {
                            kode_produk: element.kode_produk,
                            nama_produk: element.nama_produk,
                            jenis_produk: element.tipe_produk,
                            satuan: element.satuan,
                            // eslint-disable-next-line
                            qty: parseInt(element.qty) || 1,
                            harga: element.harga,
                            sub_total: element.sub_total,
                            type: element.type || '-',
                          };
                          dataProd.push(row);
                        });
                        const dataDisc: {
                          kode_diskon: any;
                          nama_diskon: any;
                          persentase: any;
                          sub_total: any;
                        }[] = [];
                        resDisc.forEach((element: any) => {
                          const row = {
                            kode_diskon: element.kode_diskon,
                            nama_diskon: element.nama_diskon,
                            persentase: element.persentase / 100,
                            sub_total: element.diskon_rp,
                          };
                          dataDisc.push(row);
                        });
                        const onSendData = {
                          kode_toko: resCust.central_store_code,
                          nama_toko: resCust.central_store_name,
                          kode_cabang: resCust.branch_store_code,
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
                          no_support_service: resSupp[0]?.no_support_service || '-',
                          no_production_service: resProdServ[0]?.no_production_service || '-',
                          total_harga: grandTotal,
                          deskripsi_header: '-',
                          deskripsi_footer: '-',
                        };
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
                              ]);
                              const desc = {
                                header_desc:
                                  'Sebelumnya kami ucapkan terima kasih atas kerjasama yang telah terjalin selama ini. Bersama ini kami sampaikan Order Konfirmasi Harga Software Nagatech Gold Store Solution web based (Online) dengan kondisi sbb :',
                                footer_desc:
                                  'Harga tersebut termasuk:\nBiaya garansi software selama berlangganan online/cloud & maintenance\nBiaya instalasi software\nBiaya pelatihan User\nHarga tersebut belum termasuk:\nBiaya langganan online/cloud & maintenance \nNagagold+ Member + Accessories Rp.900.000 (Sembilan Ratus Ribu Rupiah) perbulan.\nBiaya langganan online/cloud & maintenance \nsoftware cucian Rp. 400.000 ( Empat Ratus Ribu Rupiah) perbulan',
                              };
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
                                  Swal.fire('Good job!', 'Success Add Data !', 'success').then(
                                    () => {
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
                            const dataErr = error.response.data;
                            toast.error(dataErr.message || 'Failed Add Data !');
                          });
                        // dispatch({
                        //   type: actionTypes.SaveData,
                        //   payload: { dataSend: onSendData },
                        // });
                        // dispatch(modal.actions.show());
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
          const dataErr = error.response.data;
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
};
