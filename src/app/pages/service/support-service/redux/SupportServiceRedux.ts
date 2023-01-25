import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import Swal from 'sweetalert2';
import storage from 'redux-persist/lib/storage';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import { FeedbackSupportServiceModel } from '../model/SupportServiceModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetSupportService: '[SUPPORTSERVICE] Get Data Support Service',
  CloseModal: '[SUPPORTSERVICE] Close Modal Support Service',
  GetStoreByCode: '[SUPPORTSERVICE] Get Store By Code Support Service',
  GetSupportServiceByID: '[SUPPORTSERVICE] Get Data By ID Code Support Service',
};
export interface ISupportServiceState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackStoreDetail?: any;
  feedbackBranchList?: Array<any>;
  isEdit?: boolean;
  feedbackID?: FeedbackSupportServiceModel;
  detailBranch?: any;
}

const initialSupportServiceState: ISupportServiceState = {
  isSending: false,
  feedback: [],
  feedbackStoreDetail: undefined,
  feedbackBranchList: [],
  isEdit: false,
  feedbackID: undefined,
  detailBranch: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-support-service', whitelist: ['isSending'] },
  (
    state: ISupportServiceState = initialSupportServiceState,
    action: ActionWithPayload<ISupportServiceState>
  ) => {
    switch (action.type) {
      case actionTypes.GetSupportService: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.CloseModal: {
        return { ...state, feedbackID: undefined, isEdit: false, detailBranch: undefined };
      }
      case actionTypes.GetStoreByCode: {
        const data = action.payload?.feedbackStoreDetail;
        const listbranch = action.payload?.feedbackBranchList;
        return { ...state, feedbackStoreDetail: data, feedbackBranchList: listbranch };
      }
      case actionTypes.GetSupportServiceByID: {
        const data = action.payload?.feedbackID;
        const dataDetail = action.payload?.detailBranch;
        const edit = action.payload?.isEdit;
        return { ...state, feedbackID: data, isEdit: edit, detailBranch: dataDetail };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getSupportService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      //   dispatch(utility.actions.showLoadingButton());
      AxiosGet('support-service/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'no_support_service',
          'tanggal',
          'kode_toko',
          'kode_cabang',
          'kode_satuan',
          'qty',
          'harga',
          'total_harga',
          'status',
          '_id',
          'input_date',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetSupportService, payload: { feedback: dataSave } });
      });
    };
  },
  addSupportService: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        detail_support_service: [
          {
            nama_support_service: data.support_service_name,
            kode_toko: data.store_code,
            kode_cabang: data.branch_code,
            kode_satuan: data.unit,
            // eslint-disable-next-line
            qty: parseInt(data.qty),
            harga: data.price,
            total_harga: data.total_price,
          },
        ],
      };
      AxiosPost('support-service', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(actions.getSupportService());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
        })
        .catch(() => {
          toast.error('Failed Add Data !');
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
  getStoreDetailDataByCode: (code: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      //   dispatch(utility.actions.showLoadingButton());
      AxiosGet(`store/by-kode/${code}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data[0], [
          'kode_toko',
          'status',
          '_id',
          'input_date',
          'kode_cabang',
        ]);
        AxiosGet(`branch/by-kode-toko/${code}`).then((resbranch) => {
          const dataDecryptBranch = doDecryptData(resbranch.data, [
            'kode_toko',
            'status',
            '_id',
            'input_date',
            'kode_cabang',
          ]);
          dispatch({
            type: actionTypes.GetStoreByCode,
            payload: { feedbackStoreDetail: dataDecrypt, feedbackBranchList: dataDecryptBranch },
          });
        });
      });
    };
  },
  getSupportServiceByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`support-service/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          'no_support_service',
          'kode_cabang',
          'kode_satuan',
          'kode_toko',
          'qty',
          'status',
          '_id',
          'input_date',
          'tanggal',
          'harga',
          'total_harga',
        ]);
        AxiosGet(`store/by-kode/${dataDecrypt.kode_toko}`).then((resToko: any) => {
          const dataDecryptToko = doDecryptData(resToko.data[0], [
            'kode_toko',
            'status',
            '_id',
            'input_date',
            'kode_cabang',
          ]);
          AxiosGet(`branch/by-kode-toko/${dataDecrypt.kode_toko}`).then((resbranch) => {
            const dataDecryptBranch = doDecryptData(resbranch.data, [
              'kode_toko',
              'status',
              '_id',
              'input_date',
              'kode_cabang',
            ]);
            AxiosGet(`branch/by-kode-cabang/${dataDecrypt.kode_cabang}`).then((resdetailbranch) => {
              const dataDecryptBranchDetail = doDecryptData(resdetailbranch.data, [
                'kode_toko',
                'status',
                '_id',
                'input_date',
                'kode_cabang',
              ]);
              dispatch({
                type: actionTypes.GetStoreByCode,
                payload: {
                  feedbackStoreDetail: dataDecryptToko,
                  feedbackBranchList: dataDecryptBranch,
                },
              });
              dispatch({
                type: actionTypes.GetSupportServiceByID,
                payload: {
                  feedbackID: dataDecrypt,
                  isEdit: true,
                  detailBranch: dataDecryptBranchDetail[0],
                },
              });
              dispatch(modal.actions.show());
            });
          });
        });
      });
    };
  },
  deleteSupportService: (id: string) => {
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
          AxiosDelete(`support-service/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getSupportService());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateSupportService: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        nama_support_service: data.support_service_name,
        kode_toko: data.store_code,
        kode_cabang: data.branch_code,
        kode_satuan: data.unit,
        // eslint-disable-next-line
        qty: parseInt(data.qty),
        harga: data.price,
        total_harga: data.total_price,
      };
      AxiosPut(`support-service/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data !');
          dispatch(actions.getSupportService());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
        })
        .catch(() => {
          toast.error('Failed Edit Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
};
