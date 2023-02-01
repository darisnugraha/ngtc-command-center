import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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
  getSupportService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataCustomer').then((val) => {
        AxiosGet(`support-service/by-kode/${val.central_store_code}/${val.branch_store_code}`).then(
          (res) => {
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
          }
        );
      });
    };
  },
  getProductionService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataCustomer').then((val) => {
        AxiosGet(
          `production-service/by-kode/${val.central_store_code}/${val.branch_store_code}`
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
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`support-service/by-no/${no}`).then((res) => {
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
          type: actionTypes.GetDetailSupportByID,
          payload: { supportData: dataDecrypt[0] },
        });
      });
    };
  },
  getProductionDetail: (no: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`production-service/by-no/${no}`).then((res) => {
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
          type: actionTypes.GetDetailProductionByID,
          payload: { productionData: dataDecrypt[0] },
        });
      });
    };
  },
  addSupport: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listSupport', ['qty', 'harga', 'total_harga']).then((res) => {
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
          };
          dataArr.push(row);
          saveLocal('listSupport', dataArr, ['qty', 'harga', 'total_harga']).then(() => {
            toast.success('Success Add Data !');
            dispatch({
              type: actionTypes.GetDetailSupportByID,
              payload: { supportData: [] },
            });
            dispatch(actions.getSupportLocal());
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
          };
          dataArr.push(row);
          saveLocal('listSupport', dataArr, ['qty', 'harga', 'total_harga']).then(() => {
            toast.success('Success Add Data !');
            dispatch({
              type: actionTypes.GetDetailSupportByID,
              payload: { supportData: [] },
            });
            dispatch(actions.getSupportLocal());
          });
        }
      });
    };
  },
  addProduction: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduction', ['qty', 'total_harga']).then((res) => {
        if (res.length === 0) {
          const dataArr = [];
          const row = {
            key: 1,
            no_production_service: data.no_production_service,
            nama_production_service: data.production_service_name,
            qty: data.qty,
            satuan: data.unit,
            total_harga: data.total_price,
          };
          dataArr.push(row);
          saveLocal('listProduction', dataArr, ['qty', 'total_harga']).then(() => {
            toast.success('Success Add Data !');
            dispatch({
              type: actionTypes.GetDetailProductionByID,
              payload: { productionData: [] },
            });
            dispatch(actions.getProductionLocal());
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
          };
          dataArr.push(row);
          saveLocal('listProduction', dataArr, ['qty', 'total_harga']).then(() => {
            toast.success('Success Add Data !');
            dispatch({
              type: actionTypes.GetDetailProductionByID,
              payload: { productionData: [] },
            });
            dispatch(actions.getProductionLocal());
          });
        }
      });
    };
  },
  getSupportLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listSupport', ['qty', 'harga', 'total_harga']).then((res) => {
        dispatch({ type: actionTypes.GetLocalSupport, payload: { listSupport: res } });
      });
    };
  },
  getProductionLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduction', ['qty', 'total_harga']).then((res) => {
        dispatch({ type: actionTypes.GetLocalProduction, payload: { listProduction: res } });
      });
    };
  },
  deleteSupportLocal: (key: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listSupport', ['qty', 'harga', 'total_harga']).then((res) => {
        const newData = res.filter((element: any) => element.key !== key);
        saveLocal('listSupport', newData, ['qty', 'harga', 'total_harga']).then(() => {
          dispatch(actions.getSupportLocal());
          toast.success('Success Delete Data !');
        });
      });
    };
  },
  deleteProductionLocal: (key: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('listProduction', ['qty', 'total_harga']).then((res) => {
        const newData = res.filter((element: any) => element.key !== key);
        saveLocal('listProduction', newData, ['qty', 'total_harga']).then(() => {
          dispatch(actions.getProductionLocal());
          toast.success('Success Delete Data !');
        });
      });
    };
  },
};
