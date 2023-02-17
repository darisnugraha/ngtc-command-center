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
import { FeedbackModelConsumable } from '../model/ConsumableModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddConsumable: '[CONSUMABLE] Add Data Consumable',
  GetConsumable: '[CONSUMABLE] Get Data Consumable',
  GetConsumableByID: '[CONSUMABLE] Get Data Consumable By ID',
  CloseModal: '[CONSUMABLE] Close Modal Consumable',
};
export interface IConsumableState {
  isSending?: boolean;
  isEdit?: boolean;
  feedback?: Array<any>;
  feedbackID?: FeedbackModelConsumable;
}

const initialConsumableState: IConsumableState = {
  isSending: false,
  isEdit: false,
  feedback: [],
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-consumable', whitelist: ['isSending'] },
  (
    state: IConsumableState = initialConsumableState,
    action: ActionWithPayload<IConsumableState>
  ) => {
    switch (action.type) {
      case actionTypes.GetConsumable: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetConsumableByID: {
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
  addConsumable: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_consumable: data.consumable_code,
        nama_consumable: data.consumable_name,
        kode_supplier: data.supplier.value || data.supplier,
        satuan: data.unit.value || data.unit,
        harga: data.price,
      };

      AxiosPost('consumable', onSendData)
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
  updateConsumable: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_consumable: data.consumable_code,
        nama_consumable: data.consumable_name,
        kode_supplier: data.supplier.value || data.supplier,
        satuan: data.unit,
        harga: data.price,
      };

      AxiosPut(`consumable/${data.id}`, onSendData)
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
  getConsumable: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
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
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetConsumable, payload: { feedback: dataSave } });
      });
    };
  },
  getConsumableByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`consumable/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_consumable',
          'kode_supplier',
          'status',
          '_id',
          'input_date',
          'harga',
        ]);
        dispatch({
          type: actionTypes.GetConsumableByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  closeModal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.CloseModal });
      dispatch(modal.actions.hide());
    };
  },
  deleteConsumable: (id: any) => {
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
          AxiosDelete(`consumable/${id}`)
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
};
