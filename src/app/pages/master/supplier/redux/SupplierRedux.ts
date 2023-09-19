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
import { FeedbackModelSupplier } from '../model/SupplierModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddSupplier: '[SUPPLIER] Add Data Supplier',
  GetSupplier: '[SUPPLIER] Get Data Supplier',
  GetSupplierByID: '[SUPPLIER] Get Data Supplier By ID',
  CloseModal: '[SUPPLIER] Close Modal Supplier',
};
export interface ISupplierState {
  isSending?: boolean;
  feedback?: Array<any>;
  isEdit?: boolean;
  feedbackID?: FeedbackModelSupplier;
}

const initialSupplierState: ISupplierState = {
  isSending: false,
  feedback: [],
  isEdit: false,
  feedbackID: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-supplier', whitelist: ['isSending'] },
  (state: ISupplierState = initialSupplierState, action: ActionWithPayload<ISupplierState>) => {
    switch (action.type) {
      case actionTypes.GetSupplier: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetSupplierByID: {
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
  addSupplier: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_supplier: data.supplier_code,
        nama_supplier: data.supplier_name,
        contact_person: data.contact_person,
        alamat: data.address,
        telepon: data.telephone,
        email: data.email,
      };

      AxiosPost('supplier', onSendData)
        .then(() => {
          Swal.fire('Success!', 'Success Add Data !', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          toast.error('Failed Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  getSupplier: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('supplier/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'status',
          '_id',
          'input_date',
          'kode_supplier',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetSupplier, payload: { feedback: dataSave } });
      });
    };
  },
  getSupplierByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`supplier/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'status',
          'input_date',
          'kode_supplier',
        ]);
        dispatch({
          type: actionTypes.GetSupplierByID,
          payload: { feedbackID: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteSupplier: (id: string) => {
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
          AxiosDelete(`supplier/${id}`)
            .then(() => {
              Swal.fire('Success!', 'Success Delete Data !', 'success').then(() => {
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
  updateSupplier: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_supplier: data.supplier_code,
        nama_supplier: data.supplier_name,
        contact_person: data.contact_person,
        alamat: data.address,
        telepon: data.telephone,
        email: data.email,
      };

      AxiosPut(`supplier/${data.id}`, onSendData)
        .then(() => {
          Swal.fire('Success!', 'Success Edit Data !', 'success').then(() => {
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
