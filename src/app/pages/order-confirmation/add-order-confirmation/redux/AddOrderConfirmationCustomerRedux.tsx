import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { change } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet } from '../../../../../setup';
import { doDecryptData, getLocal, saveLocal } from '../../../../../setup/encrypt.js';
import { branchModel, staffModel } from '../model/AddOrderConfirmationModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetAddOCCustomer: '[ADDOCCUSTOMER] Get Data Add OC Customer',
  GetBranchStore: '[ADDOCCUSTOMER] Get Data Branch Store',
  GetBranchStoreDetail: '[ADDOCCUSTOMER] Get Data Branch Store Detail',
  GetDetailStaff: '[ADDOCCUSTOMER] Get Data Staff Detail',
  setStep: '[ADDOC] Set Step',
};
export interface IAddOCState {
  isSending?: boolean;
  feedback?: any;
  branchList?: Array<any>;
  branchDetail?: branchModel;
  staffDetail?: staffModel;
  step?: Number;
}

const initialAddOCState: IAddOCState = {
  isSending: false,
  feedback: undefined,
  branchList: [],
  branchDetail: undefined,
  staffDetail: undefined,
  step: 1,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-add-order-confirmation-customer', whitelist: ['isSending'] },
  (state: IAddOCState = initialAddOCState, action: ActionWithPayload<IAddOCState>) => {
    switch (action.type) {
      case actionTypes.GetAddOCCustomer: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetBranchStore: {
        const data = action.payload?.branchList;
        return { ...state, branchList: data };
      }
      case actionTypes.GetBranchStoreDetail: {
        const data = action.payload?.branchDetail;
        return { ...state, branchDetail: data };
      }
      case actionTypes.GetDetailStaff: {
        const data = action.payload?.staffDetail;
        return { ...state, staffDetail: data };
      }
      case actionTypes.setStep: {
        const data = action.payload?.step;
        return { ...state, step: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getBranchByStoreCode: (code: String, name: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`store/by-kode/${code}`).then((resStore) => {
        const dataStore = doDecryptData(resStore.data, [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
        ]);
        AxiosGet(`branch/by-kode-toko/${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_toko',
            'status',
            '_id',
            'input_date',
            'kode_cabang',
          ]);
          dispatch({ type: actionTypes.GetBranchStore, payload: { branchList: dataDecrypt } });
          dispatch(change('FormAddCustomerOC', 'central_store_name', name));
          dispatch(change('FormAddCustomerOC', 'customer_name', dataStore[0].nama_customer));
        });
      });
    };
  },
  getBranchDetailByCode: (code: String, name: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const storeCode = state.form.FormAddCustomerOC.values.central_store_code;
      AxiosGet(`branch/by-kode-cabang-kode-toko?kode_cabang=${code}&kode_toko=${storeCode}`).then(
        (res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_toko',
            'status',
            '_id',
            'input_date',
            'kode_cabang',
          ]);
          dispatch({
            type: actionTypes.GetBranchStoreDetail,
            payload: { branchDetail: dataDecrypt },
          });
          dispatch(change('FormAddCustomerOC', 'customer_name', dataDecrypt[0]?.nama_customer));
          dispatch(change('FormAddCustomerOC', 'branch_store_name', name));
          dispatch(change('FormAddCustomerOC', 'address', dataDecrypt[0]?.alamat_cabang));
          dispatch(change('FormAddCustomerOC', 'city', dataDecrypt[0]?.kota));
          dispatch(
            change(
              'FormAddCustomerOC',
              'correspondence_address',
              dataDecrypt[0]?.alamat_korespondensi
            )
          );
          dispatch(change('FormAddCustomerOC', 'email', dataDecrypt[0]?.email));
          dispatch(change('FormAddCustomerOC', 'telephone', dataDecrypt[0]?.telepon));
        }
      );
    };
  },
  getStaffDetailByCode: (code: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`staff/by-kode/${code}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_staff',
          'status',
          '_id',
          'input_date',
          'kode_divisi',
        ]);
        AxiosGet(`division/by-kode/${dataDecrypt[0].kode_divisi}`).then((resDivisi) => {
          const dataDecryptDivision = doDecryptData(resDivisi.data, [
            'kode_divisi',
            'status',
            '_id',
            'input_date',
          ]);
          dispatch({ type: actionTypes.GetDetailStaff, payload: { staffDetail: dataDecrypt } });
          dispatch(
            change('FormAddCustomerOC', 'division_name', dataDecryptDivision[0].nama_divisi)
          );
          dispatch(
            change('FormAddCustomerOC', 'division_code', dataDecryptDivision[0].kode_divisi)
          );
        });
      });
    };
  },
  addCustomer: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      saveLocal('dataCustomer', data).then(() => {
        dispatch({ type: actionTypes.setStep, payload: { step: 2 } });
      });
    };
  },
  PrevCustomer: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.setStep, payload: { step: 1 } });
    };
  },
  getCustomerLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataCustomer').then((res) => {
        if (res.length === 0) {
          dispatch({ type: actionTypes.GetAddOCCustomer, payload: { feedback: undefined } });
        } else {
          dispatch({ type: actionTypes.GetAddOCCustomer, payload: { feedback: res } });
        }
      });
    };
  },
};
