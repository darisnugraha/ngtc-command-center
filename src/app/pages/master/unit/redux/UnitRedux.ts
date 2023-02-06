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
import { FeedbackModelUnit } from '../model/UnitModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddUnit: '[UNIT] Add Data Unit',
  GetUnit: '[UNIT] Get Data Unit',
  GetUnitByID: '[UNIT] Get Data Unit By ID',
  CloseModal: '[UNIT] Close Modal Unit',
};
export interface IUnitState {
  isSending?: boolean;
  isEdit?: boolean;
  feedback?: Array<any>;
  feedbackID?: FeedbackModelUnit;
}

const initialUnitState: IUnitState = {
  isSending: false,
  isEdit: false,
  feedback: [],
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-unit', whitelist: ['isSending'] },
  (state: IUnitState = initialUnitState, action: ActionWithPayload<IUnitState>) => {
    switch (action.type) {
      case actionTypes.GetUnit: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetUnitByID: {
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
  addUnit: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_satuan: data.unit_code,
        nama_satuan: data.unit_name,
      };

      AxiosPost('unit', onSendData)
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
  updateUnit: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_satuan: data.unit_code,
        nama_satuan: data.unit_name,
      };

      AxiosPut(`unit/${data.id}`, onSendData)
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
  getUnit: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('unit/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, ['kode_satuan', 'status', '_id', 'input_date']);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetUnit, payload: { feedback: dataSave } });
      });
    };
  },
  getUnitByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`unit/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, ['kode_satuan', 'status', '_id', 'input_date']);
        dispatch({
          type: actionTypes.GetUnitByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteUnit: (id: any) => {
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
          AxiosDelete(`unit/${id}`)
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
  closeModal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.CloseModal });
      dispatch(modal.actions.hide());
    };
  },
};
