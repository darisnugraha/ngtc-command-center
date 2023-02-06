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
import { FeedbackModelDiscount } from '../model/DiscountModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddDiscount: '[DISCOUNT] Add Data Discount',
  GetDiscount: '[DISCOUNT] Get Data Discount',
  GetDiscountByID: '[DISCOUNT] Get Data Discount By ID',
  CloseModal: '[DISCOUNT] Close Modal Discount',
};
export interface IDiscountState {
  isSending?: boolean;
  feedback?: Array<any>;
  isEdit?: boolean;
  feedbackID?: FeedbackModelDiscount;
}

const initialDiscountState: IDiscountState = {
  isSending: false,
  feedback: [],
  isEdit: false,
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-discount', whitelist: ['isSending'] },
  (state: IDiscountState = initialDiscountState, action: ActionWithPayload<IDiscountState>) => {
    switch (action.type) {
      case actionTypes.GetDiscount: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetDiscountByID: {
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
  addDiscount: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_diskon: data.discount_code,
        nama_diskon: data.discount_name,
      };

      AxiosPost('discount', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(actions.getDiscount());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
          window.location.reload();
        })
        .catch(() => {
          toast.error('Failed Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  getDiscount: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('discount/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, ['kode_diskon', 'status', '_id', 'input_date']);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetDiscount, payload: { feedback: dataSave } });
      });
    };
  },
  getDiscountByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`discount/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, ['kode_diskon', 'status', '_id', 'input_date']);
        dispatch({
          type: actionTypes.GetDiscountByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteDiscount: (id: string) => {
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
          AxiosDelete(`discount/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getDiscount());
              window.location.reload();
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateDiscount: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_diskon: data.discount_code,
        nama_diskon: data.discount_name,
      };
      AxiosPut(`discount/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data !');
          dispatch(actions.getDiscount());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
          window.location.reload();
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
