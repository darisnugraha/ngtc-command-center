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
import { FeedbackModelHardware } from '../model/HardwareModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddHardWare: '[HARDWARE] Add Data Hardware',
  GetHardWare: '[HARDWARE] Get Data Hardware',
  GetHardwareByID: '[HARDWARE] Get Data Hardware By ID',
  CloseModal: '[HARDWARE] Close Modal Hardware',
};
export interface IHardwareState {
  isSending?: boolean;
  isEdit?: boolean;
  feedback?: Array<any>;
  feedbackID?: FeedbackModelHardware;
}

const initialHardwareState: IHardwareState = {
  isSending: false,
  isEdit: false,
  feedback: [],
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-hardware', whitelist: ['isSending'] },
  (state: IHardwareState = initialHardwareState, action: ActionWithPayload<IHardwareState>) => {
    switch (action.type) {
      case actionTypes.GetHardWare: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetHardwareByID: {
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
  addHardware: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_hardware: data.hardware_code,
        nama_hardware: data.hardware_name,
        kode_supplier: data.supplier.value || data.supplier,
        satuan: data.unit,
        harga: data.price,
      };

      AxiosPost('hardware', onSendData)
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
  getHardware: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
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
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetHardWare, payload: { feedback: dataSave } });
      });
    };
  },
  getHardwareByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`hardware/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_hardware',
          'kode_supplier',
          'status',
          '_id',
          'input_date',
          'harga',
        ]);
        dispatch({
          type: actionTypes.GetHardwareByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  updateHardware: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_hardware: data.hardware_code,
        nama_hardware: data.hardware_name,
        kode_supplier: data.supplier.value || data.supplier,
        satuan: data.unit.value || data.unit,
        harga: data.price,
      };

      AxiosPut(`hardware/${data.id}`, onSendData)
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
  deleteHardware: (id: any) => {
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
          AxiosDelete(`hardware/${id}`)
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
