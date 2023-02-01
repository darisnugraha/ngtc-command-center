import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { change } from 'redux-form';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet, AxiosPost } from '../../../../setup';
import { doDecryptData } from '../../../../setup/encrypt.js';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as utility from '../../../../setup/redux/UtilityRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetPotentialCustomer: '[POTENTIALCUSTOMER] Get Data Potential Customer',
  GetStoreByCode: '[POTENTIALCUSTOMER] Get Data Store By Code Potential Customer',
  GetBranchByCode: '[POTENTIALCUSTOMER] Get Data Branch By Code Potential Customer',
  CloseModal: '[POTENTIALCUSTOMER] Close Modal Potential Customer',
};
export interface IPotentialCustomerState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackStoreDetail?: any;
  feedbackBranchList?: Array<any>;
  feedbackBranchDetail?: any;
}

const initialPotentialCustomerState: IPotentialCustomerState = {
  isSending: false,
  feedback: [],
  feedbackStoreDetail: undefined,
  feedbackBranchList: [],
  feedbackBranchDetail: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-potential-customer', whitelist: ['isSending'] },
  (
    state: IPotentialCustomerState = initialPotentialCustomerState,
    action: ActionWithPayload<IPotentialCustomerState>
  ) => {
    switch (action.type) {
      case actionTypes.GetPotentialCustomer: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetStoreByCode: {
        const data = action.payload?.feedbackStoreDetail;
        const listbranch = action.payload?.feedbackBranchList;
        return { ...state, feedbackStoreDetail: data, feedbackBranchList: listbranch };
      }
      case actionTypes.GetBranchByCode: {
        const data = action.payload?.feedbackBranchDetail;
        return { ...state, feedbackBranchDetail: data };
      }
      case actionTypes.CloseModal: {
        return {
          ...state,
          feedbackBranchDetail: undefined,
          feedbackStoreDetail: undefined,
          feedbackBranchList: [],
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getPotentialCustomer: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      //   dispatch(utility.actions.showLoadingButton());
      AxiosGet('applicant').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
          'tanggal',
          'no_calon_customer',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetPotentialCustomer, payload: { feedback: dataSave } });
      });
    };
  },
  getStoreDetailDataByCode: (code: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      //   dispatch(utility.actions.showLoadingButton());
      AxiosGet(`store/by-kode/${code}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
        ]);
        AxiosGet(`branch/by-kode-toko/${code}`).then((resbranch) => {
          const dataDecryptBranch = doDecryptData(resbranch.data, [
            'kode_toko',
            'status',
            '_id',
            'input_date',
            'kode_cabang',
          ]);
          dispatch({
            type: actionTypes.GetStoreByCode,
            payload: { feedbackStoreDetail: dataDecrypt, feedbackBranchList: dataDecryptBranch },
          });
        });
      });
    };
  },
  getBranchDetailDataByCode: (code: string) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.potentialcustomer.feedbackStoreDetail[0];
      if (code === 'PUSAT') {
        dispatch(change('FormPotentialCustomer', 'branch_name', 'PUSAT'));
        dispatch(change('FormPotentialCustomer', 'store_name', data.nama_toko));
        dispatch(change('FormPotentialCustomer', 'customer_name', data.nama_customer));
        dispatch(change('FormPotentialCustomer', 'city', data.kota));
        dispatch(change('FormPotentialCustomer', 'telephone', data.telepon || '-'));
        dispatch(change('FormPotentialCustomer', 'email', data.email || '-'));
        dispatch(change('FormPotentialCustomer', 'address', data.alamat));
        dispatch(
          change('FormPotentialCustomer', 'correspondence_address', data.alamat_korespondensi)
        );
        dispatch({
          type: actionTypes.GetBranchByCode,
          payload: { feedbackBranchDetail: data },
        });
      } else {
        AxiosGet(`branch/by-kode-cabang/${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_toko',
            'status',
            '_id',
            'input_date',
            'kode_cabang',
          ]);
          dispatch(change('FormPotentialCustomer', 'branch_name', dataDecrypt[0].nama_cabang));
          dispatch(change('FormPotentialCustomer', 'store_name', data.nama_toko));
          dispatch(change('FormPotentialCustomer', 'customer_name', data.nama_customer || '-'));
          dispatch(change('FormPotentialCustomer', 'city', dataDecrypt[0].kota));
          dispatch(change('FormPotentialCustomer', 'telephone', dataDecrypt[0].telepon || '-'));
          dispatch(change('FormPotentialCustomer', 'email', dataDecrypt[0].email || '-'));
          dispatch(change('FormPotentialCustomer', 'address', dataDecrypt[0].alamat_cabang));
          dispatch(
            change(
              'FormPotentialCustomer',
              'correspondence_address',
              dataDecrypt[0].alamat_korespondensi
            )
          );
          dispatch({
            type: actionTypes.GetBranchByCode,
            payload: { feedbackBranchDetail: dataDecrypt },
          });
        });
      }
    };
  },
  addPotentialCustomer: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_toko: data.store_code,
        nama_toko: data.store_name,
        kode_cabang: 'PUSAT',
        nama_cabang: 'PUSAT',
        nama_customer: data.customer_name,
        alamat: data.address,
        alamat_korespondensi: data.correspondence_address,
        kota: data.city,
        telepon: data.telephone,
        email: data.email,
      };
      AxiosPost('applicant', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(utility.actions.hideLoading());
          dispatch(actions.getPotentialCustomer());
          dispatch(modal.actions.hide());
        })
        .catch(() => {
          toast.error('Error Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  handleValidation: (no_trx: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const onSendData = {
        no_calon_customer: no_trx,
      };
      AxiosPost('applicant/validate', onSendData)
        .then(() => {
          toast.success('Validation Data Success!');
          dispatch(actions.getPotentialCustomer());
        })
        .catch(() => {
          toast.error('Error Validation Data !');
        });
    };
  },
  closeModal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.CloseModal });
      dispatch(modal.actions.hide());
    };
  },
};
