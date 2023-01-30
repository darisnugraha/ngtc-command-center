import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import { change } from 'redux-form';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';
import { doDecryptData, getLocal, saveLocal } from '../../../../../setup/encrypt.js';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import { FeedbackModelBundle, DetailProduk } from '../model/BundleModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddBundle: '[BUNDLE] Add Data Bundle',
  GetBundle: '[BUNDLE] Get Data Bundle',
  GetBundleByID: '[BUNDLE] Get Data Bundle By ID',
  ShowModalProduct: '[BUNDLE] Show Modal Product Bundle',
  CloseModalProduct: '[BUNDLE] Close Modal Product Bundle',
  CloseModal: '[BUNDLE] Close Modal Bundle',
  GetProductByType: '[BUNDLE] Get Product By Type',
  GetProductDetail: '[BUNDLE] Get Product Detail',
  GetProductLocal: '[BUNDLE] Get Product Detail Local',
};
export interface IBundleState {
  isSending?: boolean;
  feedback?: Array<any>;
  isShowing?: boolean;
  isEdit?: boolean;
  feedbackID?: FeedbackModelBundle;
  feedbackProduct?: Array<any>;
  feedbackProductDetail?: DetailProduk;
  feedbackProductDetailLocal?: Array<any>;
}

const initialBundleState: IBundleState = {
  isSending: false,
  feedback: [],
  isShowing: false,
  isEdit: false,
  feedbackID: undefined,
  feedbackProduct: [],
  feedbackProductDetail: undefined,
  feedbackProductDetailLocal: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-bundle', whitelist: ['isSending'] },
  (state: IBundleState = initialBundleState, action: ActionWithPayload<IBundleState>) => {
    switch (action.type) {
      case actionTypes.GetBundle: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetBundleByID: {
        const data = action.payload?.feedbackID;
        const edit = action.payload?.isEdit;
        return { ...state, feedbackID: data, isEdit: edit };
      }
      case actionTypes.CloseModal: {
        return { ...state, feedbackID: undefined, isEdit: false, feedbackProductDetailLocal: [] };
      }
      case actionTypes.ShowModalProduct: {
        return { ...state, isShowing: true };
      }
      case actionTypes.CloseModalProduct: {
        return { ...state, isShowing: false };
      }
      case actionTypes.GetProductByType: {
        const data = action.payload?.feedbackProduct;
        return { ...state, feedbackProduct: data };
      }
      case actionTypes.GetProductDetail: {
        const data = action.payload?.feedbackProductDetail;
        return { ...state, feedbackProductDetail: data };
      }
      case actionTypes.GetProductLocal: {
        const data = action.payload?.feedbackProductDetailLocal;
        return { ...state, feedbackProductDetailLocal: data };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  addBundle: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('detailProduct').then((res) => {
        if (res.length === 0) {
          toast.info('Add Product First !');
          dispatch(utility.actions.hideLoading());
        } else {
          const dataArrnew: any = [];
          res.forEach((element: any) => {
            const row: DetailProduk = {
              harga: element.price,
              jenis_produk: element.product_type,
              kode_produk: element.product_code,
              nama_produk: element.product_name,
              satuan: element.unit,
              type: element.type,
            };
            dataArrnew.push(row);
          });
          const onSendData = {
            kode_paket: data.bundle_code,
            nama_paket: data.bundle_name,
            detail_produk: dataArrnew,
            // eslint-disable-next-line
            total_harga: res?.reduce((a: any, b: any) => a + parseInt(b.price), 0),
          };
          AxiosPost('bundle', onSendData)
            .then(() => {
              toast.success('Success Add Data !');
              dispatch(actions.getBundle());
              dispatch(utility.actions.hideLoading());
              dispatch(actions.closeModal());
              localStorage.removeItem('detailProduct');
            })
            .catch(() => {
              toast.error('Failed Add Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  getBundle: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
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
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetBundle, payload: { feedback: dataSave } });
      });
    };
  },
  getBundleByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`bundle/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_paket',
          'status',
          '_id',
          'input_date',
          'kode_produk',
          'jenis_produk',
          'harga',
        ]);
        dispatch({
          type: actionTypes.GetBundleByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        // eslint-disable-next-line
        dispatch(change('FormBundleComponent', 'id', dataDecrypt._id));
        dispatch(change('FormBundleComponent', 'bundle_code', dataDecrypt.kode_paket));
        dispatch(change('FormBundleComponent', 'bundle_name', dataDecrypt.nama_paket));
        const datanewArr: any = [];
        dataDecrypt.detail_produk.forEach((element: any) => {
          const row = {
            product_code: element.kode_produk,
            product_name: element.nama_produk,
            product_type: element.jenis_produk,
            unit: element.satuan,
            price: element.harga,
            type: element.type,
            // eslint-disable-next-line
            id: element._id,
          };
          datanewArr.push(row);
        });
        saveLocal('detailProduct', datanewArr).then(() => {
          dispatch(modal.actions.show());
          dispatch(actions.getDataDetailProduct());
        });
      });
    };
  },
  deleteBundle: (id: string) => {
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
          AxiosDelete(`bundle/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getBundle());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateBundle: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('detailProduct').then((res) => {
        if (res.length === 0) {
          toast.info('Add Product First !');
          dispatch(utility.actions.hideLoading());
        } else {
          const dataArrnew: any = [];
          res.forEach((element: any) => {
            const row: DetailProduk = {
              harga: element.price,
              jenis_produk: element.product_type,
              kode_produk: element.product_code,
              nama_produk: element.product_name,
              satuan: element.unit,
              type: element.type,
            };
            dataArrnew.push(row);
          });
          const onSendData = {
            kode_paket: data.bundle_code,
            nama_paket: data.bundle_name,
            detail_produk: dataArrnew,
            // eslint-disable-next-line
            total_harga: res?.reduce((a: any, b: any) => a + parseInt(b.price), 0),
          };
          AxiosPut(`bundle/${data.id}`, onSendData)
            .then(() => {
              toast.success('Success Edit Data !');
              dispatch(actions.getBundle());
              dispatch(utility.actions.hideLoading());
              dispatch(actions.closeModal());
            })
            .catch(() => {
              toast.error('Failed Edit Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  closeModal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.CloseModal });
      localStorage.removeItem('detailProduct');
      dispatch(modal.actions.hide());
    };
  },
  showModalProduct: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.ShowModalProduct });
    };
  },
  closeModalProduct: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.CloseModalProduct });
    };
  },
  handleGetproduct: (type: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({
        type: actionTypes.GetProductDetail,
        payload: { feedbackProductDetail: undefined },
      });
      dispatch(change('FormAddProductComponent', 'unit', ''));
      dispatch(change('FormAddProductComponent', 'price', ''));
      dispatch(change('FormAddProductComponent', 'product_name', ''));

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
            const row = {
              key: no,
              kode_produk: element.kode_produk,
              nama_produk: element.nama_produk,
            };
            dataSave.push(row);
            no += 1;
          });
          dispatch({ type: actionTypes.GetProductByType, payload: { feedbackProduct: dataSave } });
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
            const row = {
              key: no,
              kode_produk: element.kode_hardware,
              nama_produk: element.nama_hardware,
            };
            dataSave.push(row);
            no += 1;
          });
          dispatch({ type: actionTypes.GetProductByType, payload: { feedbackProduct: dataSave } });
        });
      } else {
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
            const row = {
              key: no,
              kode_produk: element.kode_consumable,
              nama_produk: element.nama_consumable,
            };
            dataSave.push(row);
            no += 1;
          });
          dispatch({ type: actionTypes.GetProductByType, payload: { feedbackProduct: dataSave } });
        });
      }
    };
  },
  handleGetDetailProduct: (id: string) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      dispatch({
        type: actionTypes.GetProductDetail,
        payload: { feedbackProductDetail: undefined },
      });
      const state = getState();
      const data = state.form.FormAddProductComponent.values.product_type;

      if (data === 'SOFTWARE') {
        AxiosGet(`product/by-kode/${id}`).then((res: any) => {
          const dataDecrypt = doDecryptData(res.data[0], [
            'kode_produk',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
          ]);
          dispatch({
            type: actionTypes.GetProductDetail,
            payload: { feedbackProductDetail: dataDecrypt },
          });
          // eslint-disable-next-line
          dispatch(change('FormAddProductComponent', 'id', dataDecrypt._id));
          dispatch(change('FormAddProductComponent', 'product_name', dataDecrypt.nama_produk));
          dispatch(change('FormAddProductComponent', 'unit', dataDecrypt.satuan));
          dispatch(change('FormAddProductComponent', 'price', dataDecrypt.harga));
          dispatch(change('FormAddProductComponent', 'type', dataDecrypt.type));
        });
      } else if (data === 'HARDWARE') {
        AxiosGet(`hardware/by-kode/${id}`).then((res: any) => {
          const dataDecrypt = doDecryptData(res.data[0], [
            'kode_hardware',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          dispatch({
            type: actionTypes.GetProductDetail,
            payload: { feedbackProductDetail: dataDecrypt },
          });
          // eslint-disable-next-line
          dispatch(change('FormAddProductComponent', 'id', dataDecrypt._id));
          dispatch(change('FormAddProductComponent', 'product_name', dataDecrypt.nama_hardware));
          dispatch(change('FormAddProductComponent', 'unit', dataDecrypt.satuan));
          dispatch(change('FormAddProductComponent', 'price', dataDecrypt.harga));
          dispatch(change('FormAddProductComponent', 'type', '-'));
        });
      } else {
        AxiosGet(`consumable/by-kode/${id}`).then((res: any) => {
          const dataDecrypt = doDecryptData(res.data[0], [
            'kode_consumable',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          dispatch({
            type: actionTypes.GetProductDetail,
            payload: { feedbackProductDetail: dataDecrypt },
          });
          // eslint-disable-next-line
          dispatch(change('FormAddProductComponent', 'id', dataDecrypt._id));
          dispatch(change('FormAddProductComponent', 'product_name', dataDecrypt.nama_consumable));
          dispatch(change('FormAddProductComponent', 'unit', dataDecrypt.satuan));
          dispatch(change('FormAddProductComponent', 'price', dataDecrypt.harga));
          dispatch(change('FormAddProductComponent', 'type', '-'));
        });
      }
    };
  },
  addProduct: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      // eslint-disable-next-line
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormAddProductComponent.values;
      if (data === undefined) {
        toast.info('Fill The Form First !');
      } else {
        // eslint-disable-next-line
        if (
          data.product_type === undefined ||
          data.product_name === undefined ||
          data.unit === undefined ||
          data.price === undefined ||
          data.type === undefined
        ) {
          toast.info('Fill The Form First !');
        } else {
          getLocal('detailProduct').then(async (res) => {
            if (res.length === 0) {
              const dataDetail: any = [];
              dataDetail.push(data);
              await saveLocal('detailProduct', dataDetail);
              toast.success('Success Add Data !');
              dispatch(actions.getDataDetailProduct());
              dispatch(actions.closeModalProduct());
            } else {
              const dataDetail: any = res;
              dataDetail.push(data);
              await saveLocal('detailProduct', dataDetail);
              toast.success('Success Add Data !');
              dispatch(actions.getDataDetailProduct());
              dispatch(actions.closeModalProduct());
            }
          });
        }
      }
    };
  },
  getDataDetailProduct: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('detailProduct').then((res) => {
        dispatch({
          type: actionTypes.GetProductLocal,
          payload: { feedbackProductDetailLocal: res },
        });
      });
    };
  },
  deleteDetailProduct: (id: string) => {
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
          getLocal('detailProduct').then((res) => {
            const dataFill = res.filter((element: any) => element.id !== id);
            saveLocal('detailProduct', dataFill).then(() => {
              toast.success('Success Delete Data !');
              dispatch(actions.getDataDetailProduct());
            });
          });
        }
      });
    };
  },
};
