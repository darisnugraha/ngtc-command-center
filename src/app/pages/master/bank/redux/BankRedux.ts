import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import { FeedbackModelBank } from '../model/BankModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddBank: '[BANK] Add Data Bank',
  GetBank: '[BANK] Get Data Bank',
  GetBankByID: '[BANK] Get Data Bank By ID',
  CloseModal: '[BANK] Close Modal Bank',
};
export interface IBankState {
  isSending?: boolean;
  feedback?: Array<any>;
  isEdit?: boolean;
  feedbackID?: FeedbackModelBank;
}

const initialBankState: IBankState = {
  isSending: false,
  feedback: [],
  isEdit: false,
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-bank', whitelist: ['isSending'] },
  (state: IBankState = initialBankState, action: ActionWithPayload<IBankState>) => {
    switch (action.type) {
      case actionTypes.GetBank: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetBankByID: {
        const data = action.payload?.feedbackID;
        const edit = action.payload?.isEdit;
        return { ...state, feedbackID: data, isEdit: edit };
      }
      case actionTypes.CloseModal: {
        return { ...state, feedbackID: undefined, isEdit: false };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  addBank: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        nama_bank: data.bank_name,
        no_rekening: data.account_number,
        nama_nasabah: data.account_name,
      };

      AxiosPost('bank', onSendData)
        .then(() => {
          Swal.fire('Good job!', 'Success Add Data !', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          toast.error('Failed Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  getBank: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('bank/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, ['kode_bank', 'status', '_id', 'input_date']);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetBank, payload: { feedback: dataSave } });
      });
    };
  },
  getBankByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`bank/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, ['kode_bank', 'status', '_id', 'input_date']);
        dispatch({
          type: actionTypes.GetBankByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteBank: (id: string) => {
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
          AxiosDelete(`bank/${id}`)
            .then(() => {
              Swal.fire('Good job!', 'Success Delete Data !', 'success').then(() => {
                window.location.reload();
              });
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateBank: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        nama_bank: data.bank_name,
        no_rekening: data.account_number,
        nama_nasabah: data.account_name,
      };
      AxiosPut(`bank/${data.id}`, onSendData)
        .then(() => {
          Swal.fire('Good job!', 'Success Edit Data !', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          toast.error('Failed Edit Data !');
          dispatch(utility.actions.hideLoading());
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
