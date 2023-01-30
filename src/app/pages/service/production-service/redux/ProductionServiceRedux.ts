import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import Swal from 'sweetalert2';
import { change } from 'redux-form';
import storage from 'redux-persist/lib/storage';
import { AxiosGet, AxiosPost } from '../../../../../setup';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';
import { doDecryptData } from '../../../../../setup/encrypt.js';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import {
  FeedbackProductionServiceModel,
  inquiryModel,
  inquiryModelTable,
} from '../model/ProductionServiceModel';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetProductionService: '[PRODUCTIONSERVICE] Get Data Production Service',
  CloseModal: '[PRODUCTIONSERVICE] Close Modal Production Service',
  GetStoreByCode: '[PRODUCTIONSERVICE] Get Store By Code Production Service',
  GetProductionServiceByID: '[PRODUCTIONSERVICE] Get Data By ID Code Production Service',
  SaveInquiry: '[PRODUCTIONSERVICE] Save Inquiry',
  GetInquiry: '[PRODUCTIONSERVICE] Get Inquiry',
};
export interface IProductionServiceState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackStoreDetail?: any;
  feedbackBranchList?: Array<any>;
  isEdit?: boolean;
  feedbackID?: FeedbackProductionServiceModel;
  detailBranch?: any;
  inquiry?: Array<inquiryModel>;
  inquiryDetail?: Array<any>;
}

const initialProductionServiceState: IProductionServiceState = {
  isSending: false,
  feedback: [],
  feedbackStoreDetail: undefined,
  feedbackBranchList: [],
  isEdit: false,
  feedbackID: undefined,
  detailBranch: undefined,
  inquiry: [],
  inquiryDetail: [],
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-production-service', whitelist: ['isSending'] },
  (
    state: IProductionServiceState = initialProductionServiceState,
    action: ActionWithPayload<IProductionServiceState>
  ) => {
    switch (action.type) {
      case actionTypes.GetProductionService: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.CloseModal: {
        return {
          ...state,
          feedbackID: undefined,
          isEdit: false,
          detailBranch: undefined,
          inquiry: [],
        };
      }
      case actionTypes.GetStoreByCode: {
        const data = action.payload?.feedbackStoreDetail;
        const listbranch = action.payload?.feedbackBranchList;
        return { ...state, feedbackStoreDetail: data, feedbackBranchList: listbranch };
      }
      case actionTypes.GetProductionServiceByID: {
        const data = action.payload?.feedbackID;
        const dataDetail = action.payload?.detailBranch;
        const edit = action.payload?.isEdit;
        return { ...state, feedbackID: data, isEdit: edit, detailBranch: dataDetail };
      }
      case actionTypes.SaveInquiry: {
        const data = action.payload?.inquiry;
        return { ...state, inquiry: data };
      }
      case actionTypes.GetInquiry: {
        const data = action.payload?.inquiryDetail;
        return { ...state, inquiryDetail: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getProductionService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      //   dispatch(utility.actions.showLoadingButton());
      AxiosGet('production-service/open').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'no_production_service',
          'tanggal',
          'kode_toko',
          'kode_cabang',
          'kode_satuan',
          'lama_pengerjaan',
          'qc',
          'total_pengerjaan',
          'qty',
          'harga',
          'total_harga',
          'status',
          '_id',
          'input_date',
          'no_inquiry',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetProductionService, payload: { feedback: dataSave } });
      });
    };
  },
  getDetailInquiry: (no_inquiry: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`inquiry/by-no/${no_inquiry}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'lama_pengerjaan',
          'status',
          '_id',
          'input_date',
          'no_inquiry',
        ]);
        dispatch({ type: actionTypes.GetInquiry, payload: { inquiryDetail: dataDecrypt } });
      });
    };
  },
  addProductionService: (data: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const state = getState();
      // eslint-disable-next-line
      const inquiry = state.productionservice.inquiry;
      const detailInquiry: any = [];
      inquiry.forEach((element: inquiryModel) => {
        const row = {
          fitur: element.MENU_FITUR,
          revisi: element.REVISI,
          detail: element.DETAIL,
          lama_pengerjaan: element.LAMA_PENGERJAAN,
        };
        detailInquiry.push(row);
      });
      const onSendData = {
        nama_production_service: data.production_service_name,
        kode_toko: data.store_code,
        kode_cabang: data.branch_code,
        kode_satuan: data.unit,
        // eslint-disable-next-line
        qty: parseInt(data.qty),
        total_harga: data.total_price,
        inquiry: {
          detail_inquiry: detailInquiry,
          qc: data.qc,
          total_pengerjaan: data.total_processing_time,
        },
      };
      AxiosPost('production-service', onSendData)
        .then(() => {
          toast.success('Success Add Data !');
          dispatch(actions.getProductionService());
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
  getProductionServiceByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`production-service/by-id/${id}`).then((res: any) => {
        const dataDecrypt = doDecryptData(res.data, [
          'no_production_service',
          'tanggal',
          'kode_toko',
          'kode_cabang',
          'kode_satuan',
          'lama_pengerjaan',
          'qc',
          'total_pengerjaan',
          'qty',
          'harga',
          'total_harga',
          'status',
          '_id',
          'input_date',
          'no_inquiry',
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
              AxiosGet(`inquiry/by-no/${dataDecrypt.inquiry.no_inquiry}`).then((resIn: any) => {
                const dataDecryptInq = doDecryptData(resIn.data, [
                  'lama_pengerjaan',
                  'status',
                  '_id',
                  'input_date',
                  'no_inquiry',
                ]);
                const detailInquiry: Array<inquiryModelTable> = [];
                let no = 1;
                dataDecryptInq.forEach((element: any) => {
                  const row: inquiryModelTable = {
                    // eslint-disable-next-line
                    ID: element._id,
                    DETAIL: element.detail,
                    LAMA_PENGERJAAN: element.lama_pengerjaan,
                    MENU_FITUR: element.fitur,
                    NO: no,
                    REVISI: element.revisi,
                  };
                  detailInquiry.push(row);
                  no += 1;
                });
                dispatch({
                  type: actionTypes.GetStoreByCode,
                  payload: {
                    feedbackStoreDetail: dataDecryptToko,
                    feedbackBranchList: dataDecryptBranch,
                  },
                });
                dispatch({
                  type: actionTypes.GetProductionServiceByID,
                  payload: {
                    feedbackID: dataDecrypt,
                    isEdit: true,
                    detailBranch: dataDecryptBranchDetail[0],
                  },
                });

                dispatch({
                  type: actionTypes.SaveInquiry,
                  payload: { inquiry: detailInquiry },
                });
                dispatch(modal.actions.show());
              });
            });
          });
        });
      });
    };
  },
  deleteProductionService: (id: string) => {
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
          AxiosDelete(`production-service/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getProductionService());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  updateProductionService: (data: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const state = getState();
      // eslint-disable-next-line
      const inquiry = state.productionservice.inquiry;
      const detailInquiry: any = [];
      inquiry.forEach((element: inquiryModel) => {
        const row = {
          fitur: element.MENU_FITUR,
          revisi: element.REVISI,
          detail: element.DETAIL,
          lama_pengerjaan: element.LAMA_PENGERJAAN,
        };
        detailInquiry.push(row);
      });
      const onSendData = {
        nama_production_service: data.production_service_name,
        kode_toko: data.store_code,
        kode_cabang: data.branch_code,
        kode_satuan: data.unit,
        // eslint-disable-next-line
        qty: parseInt(data.qty),
        harga: data.price,
        total_harga: data.total_price,
        no_inquiry: data.no_inquiry,
        inquiry: {
          detail_inquiry: inquiry,
          // eslint-disable-next-line
          qc: parseInt(data.qc),
          // eslint-disable-next-line
          total_pengerjaan: parseInt(data.total_processing_time),
        },
      };
      AxiosPut(`production-service/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data !');
          dispatch(actions.getProductionService());
          dispatch(utility.actions.hideLoading());
          dispatch(actions.closeModal());
        })
        .catch(() => {
          toast.error('Failed Edit Data !');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  addInquiry: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.SaveInquiry, payload: { inquiry: data } });
      dispatch(change('FormProductionService', 'qc', data[0].QC));
      dispatch(change('FormProductionService', 'total_processing_time', data[0].TOTAL_PENGERJAAN));
    };
  },
};
