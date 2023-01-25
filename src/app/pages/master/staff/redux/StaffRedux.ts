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
import { FeedbackModelStaff } from '../model/StaffModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddStaff: '[STAFF] Add Data Staff',
  GetStaff: '[STAFF] Get Data Staff',
  GetStaffByID: '[STAFF] Get Data Staff By ID',
  CloseModal: '[STAFF] Close Modal Staff',
};
export interface IStaffState {
  isSending?: boolean;
  isEdit?: boolean;
  feedback?: Array<any>;
  feedbackID?: FeedbackModelStaff;
}

const initialStaffState: IStaffState = {
  isSending: false,
  isEdit: false,
  feedback: [],
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-staff', whitelist: ['isSending'] },
  (state: IStaffState = initialStaffState, action: ActionWithPayload<IStaffState>) => {
    switch (action.type) {
      case actionTypes.GetStaff: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetStaffByID: {
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
  addStaff: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_staff: data.staff_code,
        nama_staff: data.staff_name,
        kode_divisi: data.division,
        nama_bank: data.bank || '-',
        telepon: data.telephone,
        no_rekening: data.account_number || '-',
      };

      AxiosPost('staff', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(actions.getStaff());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
        })
        .catch(() => {
          toast.error('Failed Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  getStaff: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('staff/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_staff',
          'status',
          '_id',
          'input_date',
          'kode_divisi',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetStaff, payload: { feedback: dataSave } });
      });
    };
  },
  getStaffByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`staff/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_staff',
          'status',
          '_id',
          'input_date',
          'kode_divisi',
        ]);
        dispatch({
          type: actionTypes.GetStaffByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteStaff: (id: string) => {
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
          AxiosDelete(`staff/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getStaff());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateStaff: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_staff: data.staff_code,
        nama_staff: data.staff_name,
        kode_divisi: data.division,
        nama_bank: data.bank || '-',
        telepon: data.telephone,
        no_rekening: data.account_number || '-',
      };
      AxiosPut(`staff/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data !');
          dispatch(actions.getStaff());
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
