import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { AxiosGet } from '../../../../../setup';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { AxiosPostLogin } from '../../../../../setup/axios/AxiosPost';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import * as modal from '../../../../modules/modal/GlobalModalRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddUser: '[USER] Add Data User',
  GetUser: '[USER] Get Data User',
};
export interface IUserState {
  isSending?: boolean;
  feedback?: Array<any>;
}

const initialUserState: IUserState = {
  isSending: false,
  feedback: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-user', whitelist: ['isSending'] },
  (state: IUserState = initialUserState, action: ActionWithPayload<IUserState>) => {
    switch (action.type) {
      case actionTypes.GetUser: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
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
  addUser: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        user_name: data.user_name,
        user_id: data.user_id,
        password: data.password,
        level: data.level,
      };
      AxiosPostLogin('auth/register', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(utility.actions.hideLoading());
          dispatch(modal.actions.hide());
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
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getUser());
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
