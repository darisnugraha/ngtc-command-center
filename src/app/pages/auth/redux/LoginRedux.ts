import { Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getFormValues } from 'redux-form';
import { toast } from 'react-toastify';
import { ILoginFeedback } from '../model/LoginModel';
import { getLocal, saveLocal } from '../../../../setup/encrypt.js';
import { AxiosPostLogin } from '../../../../setup/axios/AxiosPost';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Doing Logout',
};

const initialAuthState: IAuthState = {
  user: undefined,
  isLogin: false,
};

export interface IAuthState {
  user?: ILoginFeedback;
  isLogin?: boolean;
}
const key = process.env.REACT_APP_STORAGE_KEY || 'key-nagatech-storage';
export const reducer = persistReducer(
  { storage, key, whitelist: ['user', 'accessToken'] },
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const isLogin = true;
        const userData = action.payload?.user;
        return { isLogin, user: userData };
      }
      case actionTypes.Logout: {
        return { user: {}, accessToken: false };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  login: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState): Promise<void> => {
      const state = getState();
      const payload: any = getFormValues('LoginForm')(state);
      AxiosPostLogin<ILoginFeedback>('auth/login', payload)
        .then((res: any) => {
          saveLocal('isLogin', 'true').then(() => {
            saveLocal('userData', res).then(() => {
              saveLocal('token', res.access_token).then(() => {
                dispatch({ type: actionTypes.Login, payload: { res } });
                toast.success('Login Success');
              });
            });
          });
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
        });
    };
  },
  logout: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('userData').then((res) => {
        const onSendData = {
          user_id: res.user_id,
          refresh_token: res.refresh_token,
        };
        AxiosPostLogin('auth/logout', onSendData)
          .then(() => {
            toast.success('Success Logout');
            localStorage.clear();
            dispatch({ type: actionTypes.Logout, payload: {} });
          })
          .catch((err) => {
            const dataErr = err.response.data;
            console.log(dataErr);
            toast.success('Success Logout');
            localStorage.clear();
            dispatch({ type: actionTypes.Logout, payload: {} });
          });
      });
    };
  },
  isLogin: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('isLogin').then((res) => {
        if (res === 'true') {
          getLocal('userData').then((resUser) => {
            const dataUser = {
              user_id: resUser.user_id,
              refresh_token: resUser.refresh_token,
            };
            AxiosPostLogin('auth/token', dataUser)
              .then((resToken: any) => {
                saveLocal('token', resToken.access_token).then(() => {
                  dispatch({ type: actionTypes.Login, payload: { resUser } });
                });
              })
              .catch((err) => {
                const dataErr = err.response.data;
                toast.error(dataErr.message);
                localStorage.clear();
              });
          });
        } else {
          dispatch({ type: actionTypes.Logout, payload: {} });
          localStorage.clear();
        }
      });
    };
  },
};
