import { Action, AnyAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  Show: '[Modal] Showing',
  Hide: '[Modal] Hided',
  Testing: '[Modal] testing',
};
export interface IModalState {
  isShowing?: boolean;
  data?: string;
}

const initialModalState: IModalState = {
  isShowing: false,
  data: '',
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-modal', whitelist: ['isShowing'] },
  (state: IModalState = initialModalState, action: ActionWithPayload<IModalState>) => {
    switch (action.type) {
      case actionTypes.Show: {
        const isShowing = true;
        return { isShowing, data: '' };
      }
      case actionTypes.Hide: {
        const isShowing = false;
        return { isShowing, data: '' };
      }
      case actionTypes.Testing: {
        const isShowing = false;
        const data = action.payload?.data;
        return { isShowing, data };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  show: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.Show, payload: { isShowing: true } });
    };
  },
  hide: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.Hide, payload: { isShowing: false } });
    };
  },
};
