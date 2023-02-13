import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet } from '../../../../setup';
import { doDecryptData } from '../../../../setup/encrypt.js';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  getDataRating: '[RATING] Get Data Rating',
};
export interface IRatingState {
  feedback?: Array<any>;
}

const initialRatingState: IRatingState = {
  feedback: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-rating', whitelist: ['isSending'] },
  (state: IRatingState = initialRatingState, action: ActionWithPayload<IRatingState>) => {
    switch (action.type) {
      case actionTypes.getDataRating: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getRating: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('rating/done').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_rating',
          'tanggal_rating',
          'no_sales_order',
          'no_order_konfirmasi',
          'jenis_ok',
          'kode_marketing',
          'rating_marketing',
          'kode_helpdesk',
          'rating_helpdesk',
          'rating_program',
          'rating_hardware',
          'rating_delivery',
          'tanggal_sales_order',
          'tanggal_order_konfirmasi',
          'kode_toko',
          'kode_cabang',
          'no_implementasi',
          'status_implementasi',
          'status',
          'tanggal_implementasi',
          'tanggal_realisasi',
          'lama_implementasi',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.getDataRating, payload: { feedback: dataSave } });
      });
    };
  },
};
