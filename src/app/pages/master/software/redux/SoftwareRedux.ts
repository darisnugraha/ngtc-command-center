import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import { FeedbackModelSoftware } from '../model/SoftwareModel';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddSoftware: '[SOFTWARE] Add Data Software',
  GetSoftware: '[SOFTWARE] Get Data Software',
  GetSoftwareByID: '[SOFTWARE] Get Data Software By ID',
  CloseModal: '[SOFTWARE] Close Modal Software',
};
export interface ISoftwareState {
  isSending?: boolean;
  isEdit?: boolean;
  feedback?: Array<any>;
  feedbackID?: FeedbackModelSoftware;
}

const initialSoftwareState: ISoftwareState = {
  isSending: false,
  isEdit: false,
  feedback: [],
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-software', whitelist: ['isSending'] },
  (state: ISoftwareState = initialSoftwareState, action: ActionWithPayload<ISoftwareState>) => {
    switch (action.type) {
      case actionTypes.GetSoftware: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetSoftwareByID: {
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
  addSoftware: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_produk: data.product_code,
        nama_produk: data.product_name,
        satuan: data.unit,
        harga: data.price,
        type: data.type,
      };

      AxiosPost('product', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(actions.getSoftware());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
        })
        .catch(() => {
          toast.error('Failed Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  getSoftware: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('product/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_produk',
          'status',
          '_id',
          'input_date',
          'harga',
          'type',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetSoftware, payload: { feedback: dataSave } });
      });
    };
  },
  getSoftwareByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`product/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_produk',
          'status',
          '_id',
          'input_date',
          'harga',
          'type',
        ]);
        dispatch({
          type: actionTypes.GetSoftwareByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteSoftware: (id: string) => {
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
          AxiosDelete(`product/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getSoftware());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateSoftware: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_produk: data.product_code,
        nama_produk: data.product_name,
        satuan: data.unit,
        type: data.type,
        harga: data.price,
      };
      AxiosPut(`product/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data !');
          dispatch(actions.getSoftware());
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
