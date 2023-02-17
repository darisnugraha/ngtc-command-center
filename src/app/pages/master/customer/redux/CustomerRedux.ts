import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddStore: '[CUSTOMER] Add Data Store Customer',
  AddBranch: '[CUSTOMER] Add Data Branch Customer',
  GetStore: '[CUSTOMER] Get Data Store',
  GetStoreByID: '[CUSTOMER] Get Data Store By ID',
  GetBranchByID: '[CUSTOMER] Get Data Branch By ID',
  CloseModal: '[CUSTOMER] Close Modal Customer',
};
export interface ICustomerState {
  isSending?: boolean;
  isEdit?: boolean;
  feedbackIDStore?: any;
  feedbackIDBranch?: any;
  feedback?: Array<any>;
}

const initialCustomerState: ICustomerState = {
  isSending: false,
  isEdit: false,
  feedbackIDStore: undefined,
  feedbackIDBranch: undefined,
  feedback: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-customer', whitelist: ['isSending'] },
  (state: ICustomerState = initialCustomerState, action: ActionWithPayload<ICustomerState>) => {
    switch (action.type) {
      case actionTypes.GetStore: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetStoreByID: {
        const data = action.payload?.feedbackIDStore;
        const edit = action.payload?.isEdit;
        return { ...state, feedbackIDStore: data, isEdit: edit };
      }
      case actionTypes.GetBranchByID: {
        const data = action.payload?.feedbackIDBranch;
        const edit = action.payload?.isEdit;
        return { ...state, feedbackIDBranch: data, isEdit: edit };
      }
      case actionTypes.CloseModal: {
        return { ...state, feedbackIDStore: undefined, isEdit: false, feedbackIDBranch: undefined };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  addStore: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_toko: data.store_code || '-',
        nama_toko: data.store_name || '-',
        nama_customer: data.customer_name || '-',
        kota: data.city || '-',
        alamat: data.address || '-',
        alamat_korespondensi: data.correspondence_address || '-',
        telepon: data.telephone || '-',
        email: data.email || '-',
        tipe_toko: data.type_store.value || data.type_store || '-',
      };

      AxiosPost('store', onSendData)
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
  updateStore: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_toko: data.store_code,
        nama_toko: data.store_name,
        nama_customer: data.customer_name,
        kota: data.city,
        alamat: data.address,
        alamat_korespondensi: data.correspondence_address,
        telepon: data.telephone || '-',
        email: data.email || '-',
        tipe_toko: data.type_store.value || data.type_store || '-',
      };

      AxiosPut(`store/${data.id}`, onSendData)
        .then(() => {
          Swal.fire('Good job!', 'Success Edit Data !', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          toast.error('Failed Add Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  addBranch: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        cabang_detail: [
          {
            kode_cabang: data.branch_store_code || '-',
            nama_cabang: data.branch_store_name || '-',
            nama_customer: data.customer_name || '-',
            kode_toko: data.central_store_code.value || data.central_store_code || '-',
            email: data.email || '-',
            telepon: data.telephone || '-',
            kota: data.city || '-',
            alamat_cabang: data.address || '-',
            alamat_korespondensi: data.correspondence_address || '-',
            tipe_cabang: data.type_branch.value || data.type_branch || '-',
          },
        ],
      };

      AxiosPost('branch', onSendData)
        .then(() => {
          Swal.fire('Good job!', 'Success Add Data !', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          toast.error('Failed Edit Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  updateBranch: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        kode_cabang: data.branch_store_code,
        nama_cabang: data.branch_store_name,
        nama_customer: data.customer_name,
        kode_toko: data.central_store_code.value || data.central_store_code || '-',
        email: data.email,
        telepon: data.telephone,
        kota: data.city,
        alamat_cabang: data.address,
        alamat_korespondensi: data.correspondence_address,
        tipe_cabang: data.type_branch.value || data.type_branch || '-',
      };

      AxiosPut(`branch/${data.id}`, onSendData)
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
  getStore: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('store/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
          'tipe_toko',
          'tipe_cabang',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetStore, payload: { feedback: dataSave } });
      });
    };
  },
  getStoreByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`store/by-id/${id}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
          'tipe_toko',
        ]);

        dispatch({
          type: actionTypes.GetStoreByID,
          payload: { feedbackIDStore: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  getBranchByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`branch/by-id/${id}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
          'tipe_cabang',
        ]);

        dispatch({
          type: actionTypes.GetBranchByID,
          payload: { feedbackIDBranch: dataDecrypt, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  deleteStore: (id: any) => {
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
          AxiosDelete(`store/${id}`)
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
  deleteBranch: (id: any) => {
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
          AxiosDelete(`branch/${id}`)
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
