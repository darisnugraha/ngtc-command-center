import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { change, getFormValues } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData, getLocal, saveLocal } from '../../../../../setup/encrypt.js';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddDataSupportService: '[ADDOCSERVICE] Add Data Support Service OC',
  AddDataProductionService: '[ADDOCSERVICE] Add Data Production Service OC',
  GetDataSupportService: '[ADDOCSERVICE] Get Data Support Service OC',
  GetDataProductionService: '[ADDOCSERVICE] Get Data Production Service OC',
  GetDetailSupportByID: '[ADDOCSERVICE] Get Data Support Detail OC',
  GetDetailProductionByID: '[ADDOCSERVICE] Get Data Detail Production OC',
  GetLocalSupport: '[ADDOCSERVICE] Get Data Support Local OC',
  GetLocalProduction: '[ADDOCSERVICE] Get Data Local Production OC',
};
export interface IAddOCState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackProduction?: Array<any>;
  supportData?: any;
  productionData?: any;
  listSupport?: Array<any>;
  listProduction?: Array<any>;
}

const initialAddOCState: IAddOCState = {
  isSending: false,
  feedback: [],
  feedbackProduction: [],
  supportData: undefined,
  productionData: undefined,
  listSupport: [],
  listProduction: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-add-order-confirmation-service', whitelist: ['isSending'] },
  (state: IAddOCState = initialAddOCState, action: ActionWithPayload<IAddOCState>) => {
    switch (action.type) {
      case actionTypes.GetDataSupportService: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetDataProductionService: {
        const data = action.payload?.feedbackProduction;
        return { ...state, feedbackProduction: data };
      }
      case actionTypes.GetDetailSupportByID: {
        const data = action.payload?.supportData;
        return { ...state, supportData: data };
      }
      case actionTypes.GetDetailProductionByID: {
        const data = action.payload?.productionData;
        return { ...state, productionData: data };
      }
      case actionTypes.GetLocalSupport: {
        const data = action.payload?.listSupport;
        return { ...state, listSupport: data };
      }
      case actionTypes.GetLocalProduction: {
        const data = action.payload?.listProduction;
        return { ...state, listProduction: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  calculateDiscount: (value: number, isPercentage: boolean = false) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const payload: any = getFormValues('FormAddSupportServiceOC')(state);
      dispatch(
        change(
          'FormAddSupportServiceOC',
          'total_harga_diskon',
          isPercentage ? (value / 100) * payload.total_price : value
        )
      );
    };
  },
  calculateDiscountProduction: (value: number, isPercentage: boolean = false) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const payload: any = getFormValues('FormAddProductionServiceOC')(state);
      dispatch(
        change(
          'FormAddProductionServiceOC',
          'total_harga_diskon',
          isPercentage ? (value / 100) * payload.total_price : value
        )
      );
    };
  },
  getSupportService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataCustomer').then((val) => {
        AxiosGet(
          `support-service/by-kode/${val.central_store_code.value || val.central_store_code}/${
            val.branch_store_code.value || val.branch_store_code
          }`
        ).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'no_support_service',
            'kode_cabang',
            'kode_satuan',
            'kode_toko',
            'qty',
            'status',
            '_id',
            'input_date',
            'tanggal',
            'harga',
            'total_harga',
          ]);
          dispatch({
            type: actionTypes.GetDataSupportService,
            payload: { feedback: dataDecrypt },
          });
        });
      });
    };
  },
  getProductionService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataCustomer').then((val) => {
        AxiosGet(
          `production-service/by-kode/${val.central_store_code.value || val.central_store_code}/${
            val.branch_store_code.value || val.branch_store_code
          }`
        ).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'no_production_service',
            'tanggal',
            'kode_toko',
            'kode_cabang',
            'kode_satuan',
            'lama_pengerjaan',
            'qc',
            'total_pengerjaan',
            'qty',
            'harga',
            'total_harga',
            'status',
            '_id',
            'input_date',
            'no_inquiry',
          ]);
          dispatch({
            type: actionTypes.GetDataProductionService,
            payload: { feedbackProduction: dataDecrypt },
          });
        });
      });
    };
  },
  getSupportDetail: (no: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const supportservice: any[] = state.supportservice.feedback;
      const selectedData = supportservice.find((find: any) => find.no_support_service === no);
      if (selectedData !== null) {
        dispatch(
          change(
            'FormAddSupportServiceOC',
            'support_service_name',
            selectedData.nama_support_service
          )
        );
        dispatch(change('FormAddSupportServiceOC', 'price', selectedData.harga));
        dispatch(change('FormAddSupportServiceOC', 'qty', selectedData.qty));
        dispatch(change('FormAddSupportServiceOC', 'unit', selectedData.kode_satuan));
        dispatch(
          change('FormAddSupportServiceOC', 'total_price', selectedData.qty * selectedData.harga)
        );
      }
    };
  },
  getProductionDetail: (no: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const productionservice: any[] = state.productionservice.feedback;
      const selectedData = productionservice.find((find: any) => find.no_production_service === no);
      if (selectedData !== null) {
        dispatch(
          change(
            'FormAddProductionServiceOC',
            'production_service_name',
            selectedData.nama_production_service
          )
        );
        dispatch(change('FormAddProductionServiceOC', 'qty', selectedData.qty));
        dispatch(change('FormAddProductionServiceOC', 'unit', selectedData.kode_satuan));
        dispatch(change('FormAddProductionServiceOC', 'total_price', selectedData.total_harga));
      }
    };
  },
  addSupport: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listSupport', [
        'qty',
        'harga',
        'total_harga',
        'persentase',
        'total_harga_diskon',
      ]).then((res) => {
        if (res.length === 0) {
          const dataArr = [];
          const row = {
            key: 1,
            no_support_service: data.no_support_service,
            nama_support_service: data.support_service_name,
            harga: data.price,
            qty: data.qty,
            satuan: data.unit,
            total_harga: data.total_price,
            kode_diskon: data.discount_code || '-',
            nama_diskon: data.discount_name || '-',
            persentase: Number(data.discount_percentage || 0),
            total_harga_diskon: Number(data.total_harga_diskon || 0),
          };
          dataArr.push(row);
          saveLocal('listSupport', dataArr, [
            'qty',
            'harga',
            'total_harga',
            'persentase',
            'total_harga_diskon',
          ]).then(() => {
            toast.success('Success Add Data !');
            dispatch({
              type: actionTypes.GetDetailSupportByID,
              payload: { supportData: [] },
            });
            dispatch(actions.getSupportLocal());
            dispatch(actions.discountManual());
          });
        } else {
          const dataArr = res;
          const no = dataArr.length + 1;
          const row = {
            key: no,
            no_support_service: data.no_support_service,
            nama_support_service: data.support_service_name,
            harga: data.price,
            qty: data.qty,
            satuan: data.unit,
            total_harga: data.total_price,
            kode_diskon: data.discount_code || '-',
            nama_diskon: data.discount_name || '-',
            persentase: Number(data.discount_percentage || 0),
            total_harga_diskon: Number(data.total_harga_diskon || 0),
          };
          dataArr.push(row);
          saveLocal('listSupport', dataArr, [
            'qty',
            'harga',
            'total_harga',
            'persentase',
            'total_harga_diskon',
          ]).then(() => {
            toast.success('Success Add Data !');
            dispatch({
              type: actionTypes.GetDetailSupportByID,
              payload: { supportData: [] },
            });
            dispatch(actions.getSupportLocal());
            dispatch(actions.discountManual());
          });
        }
      });
    };
  },
  addProduction: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduction', ['qty', 'total_harga', 'persentase', 'total_harga_diskon']).then(
        (res) => {
          if (res.length === 0) {
            const dataArr = [];
            const row = {
              key: 1,
              no_production_service: data.no_production_service,
              nama_production_service: data.production_service_name,
              qty: data.qty,
              satuan: data.unit,
              total_harga: data.total_price,
              kode_diskon: data.discount_code || '-',
              nama_diskon: data.discount_name || '-',
              persentase: Number(data.discount_percentage || 0),
              total_harga_diskon: Number(data.total_harga_diskon || 0),
            };
            dataArr.push(row);
            saveLocal('listProduction', dataArr, [
              'qty',
              'total_harga',
              'persentase',
              'total_harga_diskon',
            ]).then(() => {
              toast.success('Success Add Data !');
              dispatch({
                type: actionTypes.GetDetailProductionByID,
                payload: { productionData: [] },
              });
              dispatch(actions.getProductionLocal());
              dispatch(actions.discountManual());
            });
          } else {
            const dataArr = res;
            const no = dataArr.length + 1;
            const row = {
              key: no,
              no_production_service: data.no_production_service,
              nama_production_service: data.production_service_name,
              qty: data.qty,
              satuan: data.unit,
              total_harga: data.total_price,
              kode_diskon: data.discount_code || '-',
              nama_diskon: data.discount_name || '-',
              persentase: Number(data.discount_percentage || 0),
              total_harga_diskon: Number(data.total_harga_diskon || 0),
            };
            dataArr.push(row);
            saveLocal('listProduction', dataArr, [
              'qty',
              'total_harga',
              'persentase',
              'total_harga_diskon',
            ]).then(() => {
              toast.success('Success Add Data !');
              dispatch({
                type: actionTypes.GetDetailProductionByID,
                payload: { productionData: [] },
              });
              dispatch(actions.getProductionLocal());
              dispatch(actions.discountManual());
            });
          }
        }
      );
    };
  },
  getSupportLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listSupport', [
        'qty',
        'harga',
        'total_harga',
        'persentase',
        'total_harga_diskon',
      ]).then((res) => {
        dispatch({ type: actionTypes.GetLocalSupport, payload: { listSupport: res } });
      });
    };
  },
  getProductionLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduction', ['qty', 'total_harga', 'persentase', 'total_harga_diskon']).then(
        (res) => {
          dispatch({ type: actionTypes.GetLocalProduction, payload: { listProduction: res } });
        }
      );
    };
  },
  deleteSupportLocal: (key: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listSupport', ['qty', 'harga', 'total_harga']).then((res) => {
        const newData = res.filter((element: any) => element.key !== key);
        saveLocal('listSupport', newData, ['qty', 'harga', 'total_harga']).then(() => {
          dispatch(actions.getSupportLocal());
          toast.success('Success Delete Data !');
          dispatch(actions.discountManual());
        });
      });
    };
  },
  deleteProductionLocal: (key: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduction', ['qty', 'total_harga', 'persentase', 'total_harga_diskon']).then(
        (res) => {
          const newData = res.filter((element: any) => element.key !== key);
          saveLocal('listProduction', newData, [
            'qty',
            'total_harga',
            'persentase',
            'total_harga_diskon',
          ]).then(() => {
            dispatch(actions.getProductionLocal());
            toast.success('Success Delete Data !');
            dispatch(actions.discountManual());
          });
        }
      );
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
};
