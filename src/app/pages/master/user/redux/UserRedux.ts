import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as utility from '../../../../../setup/redux/UtilityRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  AddUser: '[USER] Add Data User',
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
      case actionTypes.AddUser: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  addUser: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      // eslint-disable-next-line
      console.log(data);
      dispatch(utility.actions.hideLoading());
    };
  },
};
