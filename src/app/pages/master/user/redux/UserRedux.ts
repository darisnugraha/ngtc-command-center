import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { AxiosGet } from '../../../../../setup';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { AxiosPostLogin } from '../../../../../setup/axios/AxiosPost';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import * as modal from '../../../../modules/modal/GlobalModalRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddUser: '[USER] Add Data User',
  GetUser: '[USER] Get Data User',
  GetUserByID: '[USER] Get Data Detail User',
};
export interface IUserState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackID?: any;
  isEdit?: boolean;
}

const initialUserState: IUserState = {
  isSending: false,
  feedback: [],
  feedbackID: undefined,
  isEdit: false,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-user', whitelist: ['isSending'] },
  (state: IUserState = initialUserState, action: ActionWithPayload<IUserState>) => {
    switch (action.type) {
      case actionTypes.GetUser: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetUserByID: {
        const data = action.payload?.feedbackID;
        const edit = action.payload?.isEdit;
        return { ...state, feedbackID: data, isEdit: edit };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getUser: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('users').then((res) => {
        const decryptData = doDecryptData(res.data, ['_id', 'user_id', 'level']);
        const dataSave: any = [];
        let no = 1;
        decryptData.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetUser, payload: { feedback: dataSave } });
      });
    };
  },
  getUserID: (id: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`users/${id}`).then((res) => {
        const decryptData = doDecryptData(res.data, ['_id', 'user_id', 'level']);
        dispatch({
          type: actionTypes.GetUserByID,
          payload: { feedbackID: decryptData, isEdit: true },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  closeModal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({
        type: actionTypes.GetUserByID,
        payload: { feedbackID: undefined, isEdit: false },
      });
      dispatch(modal.actions.hide());
    };
  },
  addUser: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        user_name: data.user_name,
        user_id: data.user_id,
        password: data.password,
        level: data.level.value || data.level,
      };
      AxiosPostLogin('auth/register', onSendData)
        .then(() => {
          Swal.fire('Success!', 'Success Add Data !', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  editUser: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        user_name: data.user_name,
        level: data.level.value || data.level,
      };
      AxiosPut(`users/${data.id}`, onSendData)
        .then(() => {
          dispatch(actions.getUser());
          Swal.fire('Success!', 'Success Edit Data !', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  deleteUser: (id: String) => {
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
          AxiosDelete(`users/${id}`)
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
};
