import { Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  ShowLoadingButton: '[Utility] Show Loading Button',
  ShowLoadingContent: '[Utility] Show Loading Content',
  HideLoading: '[Utility] Hide Loading',
  SetStartDate: '[Utility] Set Start Date',
  SetEndDate: '[Utility] Set End Date',
};

export interface IUtility {
  isLoadingButton: boolean;
  isLoadingContent: boolean;
  startDate?: String;
  endDate?: String;
}

const initialUtilityState: IUtility = {
  isLoadingButton: false,
  isLoadingContent: false,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
};

const key = process.env.REACT_APP_STORAGE_KEY || 'key-nagatech-storage';
export const reducer = persistReducer(
  { storage, key, whitelist: ['isLoadingButton', 'isLoadingContent'] },
  (state: IUtility = initialUtilityState, action: ActionWithPayload<IUtility>) => {
    switch (action.type) {
      case actionTypes.ShowLoadingButton: {
        return {
          isLoadingButton: true,
          isLoadingContent: false,
          endDate: new Date().toISOString(),
          startDate: new Date().toISOString(),
        };
      }
      case actionTypes.ShowLoadingContent: {
        return {
          isLoadingButton: false,
          isLoadingContent: true.valueOf(),
          endDate: new Date().toISOString(),
          startDate: new Date().toISOString(),
        };
      }
      case actionTypes.HideLoading: {
        return {
          isLoadingButton: false,
          isLoadingContent: false,
          endDate: new Date().toISOString(),
          startDate: new Date().toISOString(),
        };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  showLoadingButton: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.ShowLoadingButton });
    };
  },
  showLoadingContent: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.ShowLoadingContent });
    };
  },
  hideLoading: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.HideLoading });
    };
  },
};
