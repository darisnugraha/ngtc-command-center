import {Action, AnyAction} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'

// 1 : Buat Action Type Sebagai Perintah Dari Layout Ke ActionType
export const actionTypes = {
  Show: '[Modal] Showing',
}

// 2 : Buat Interface Untuk State Redux
export interface IModalState {
  isShowing?: boolean
  data?: string
}

// 3 : buat initialstate dan referensikan modelnya ke interface yang dibuat pada step sebelumnya
const initialModalState: IModalState = {
  isShowing: false,
  data: '',
}

// 4 : buat Interface untuk Data parameter Yang Dikirimkan Dari Action
export interface IPayload {
    isShowing?: boolean
}

// 5 : Buat Wrapper untuk Interface yang dibuat pada step sebelumnya agar payload bertype object : IPayload
export interface ActionWithPayload<T> extends Action {
    payload?: T
  }

// 6 : buat reducer untuk redux , reducer berfungsi untuk komunikasi antara action yang di panggil dengan state redux
const key = process.env.REACT_APP_STORAGE_KEY ?? "key-nagatech-storage";
export const reducer = persistReducer(
    //Sesuaikan Array whitelist dengan state redux yang anda buat
  {storage, key: key, whitelist: ['isShowing']},
  (state: IModalState = initialModalState, action: ActionWithPayload<IPayload>) => {
    switch (action.type) {
      case actionTypes.Show: {
        const isShowing = true
        return {isShowing, data: ''}
      }
      default:
        return state
    }
  }
)


// 7 : buat list action yang nantinya dipanggil di layout page
export const actions = {
  show: () : ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState): Promise<void> => {
      dispatch({type: actionTypes.Show, payload: {isShowing: true}})
    }
  },
}
