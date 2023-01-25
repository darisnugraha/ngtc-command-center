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
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import { FeedbackModelDivision } from '../model/DivisionModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddDivision: '[DIVISION] Add Data Division',
  GetDivision: '[DIVISION] Get Data Division',
  GetDivisionByID: '[DIVISION] Get Data Division By ID',
  CloseModal: '[DIVISION] Close Modal Division',
};
export interface IDivisionState {
  isSending?: boolean;
  feedback?: Array<any>;
  isEdit?: boolean;
  feedbackID?: FeedbackModelDivision;
}

const initialDivisionState: IDivisionState = {
  isSending: false,
  feedback: [],
  isEdit: false,
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-division', whitelist: ['isSending'] },
  (state: IDivisionState = initialDivisionState, action: ActionWithPayload<IDivisionState>) => {
    switch (action.type) {
      case actionTypes.GetDivision: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetDivisionByID: {
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
  addDivision: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_divisi: data.division_code,
        nama_divisi: data.division_name,
      };

      AxiosPost('division', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(actions.getDivision());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
        })
        .catch(() => {
          toast.error('Failed Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  getDivision: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('division/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, ['status', '_id', 'input_date', 'kode_divisi']);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetDivision, payload: { feedback: dataSave } });
      });
    };
  },
  getDivisionByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`division/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, ['kode_divisi', 'status', '_id', 'input_date']);
        dispatch({
          type: actionTypes.GetDivisionByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteDivision: (id: string) => {
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
          AxiosDelete(`division/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getDivision());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateDivision: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_divisi: data.division_code,
        nama_divisi: data.division_name,
      };
      AxiosPut(`division/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data !');
          dispatch(actions.getDivision());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
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
