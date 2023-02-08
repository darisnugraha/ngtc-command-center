import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
import { reset } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { AxiosGet, AxiosPost, RootState } from '../../../../setup';
import { AxiosDelete } from '../../../../setup/axios/AxiosDelete';
import { AxiosPut } from '../../../../setup/axios/AxiosPut';
import { doDecryptData, getLocal, saveLocal } from '../../../../setup/encrypt.js';
import * as utility from '../../../../setup/redux/UtilityRedux';
import * as modal from '../../../modules/modal/GlobalModalRedux';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetImplementation: '[IMPLEMENTATION] Get Data Implementation',
  GetOC: '[IMPLEMENTATION] Get Data OC',
  GetStaffByDivisi: '[IMPLEMENTATION] Get Staff By Divisi',
  GetStaffLocal: '[IMPLEMENATATION] Get Staff From Local',
  GetImplementationByID: '[IMPLEMENTATION] Get Data Implementation By ID',
};
export interface IImplementationState {
  feedback?: Array<any>;
  feedbackOC?: Array<any>;
  feedbackStaff?: Array<any>;
  localStaff?: Array<any>;
  feedbackID?: any;
  isEdit?: boolean;
}

const initialImplementationState: IImplementationState = {
  feedback: [],
  feedbackOC: [],
  feedbackStaff: [],
  localStaff: [],
  feedbackID: undefined,
  isEdit: false,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-implementation', whitelist: ['isSending'] },
  (
    state: IImplementationState = initialImplementationState,
    action: ActionWithPayload<IImplementationState>
  ) => {
    switch (action.type) {
      case actionTypes.GetImplementation: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetOC: {
        const data = action.payload?.feedbackOC;
        return { ...state, feedbackOC: data };
      }
      case actionTypes.GetStaffByDivisi: {
        const data = action.payload?.feedbackStaff;
        return { ...state, feedbackStaff: data };
      }
      case actionTypes.GetStaffLocal: {
        const data = action.payload?.localStaff;
        return { ...state, localStaff: data };
      }
      case actionTypes.GetImplementationByID: {
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
  getImplementation: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('implementation').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_implementasi',
          'tanggal_implementasi',
          'tanggal_realisasi',
          'kode_helpdesk',
          'tipe_implementasi',
          'lama_implementasi',
          'status',
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

        dispatch({ type: actionTypes.GetImplementation, payload: { feedback: dataSave } });
      });
    };
  },
  getOC: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('sales-order/unimplemented').then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          'status',
          '_id',
          'input_date',
          'no_order_konfirmasi',
          'kode_toko',
          'kode_cabang',
          'tanggal_order_konfirmasi',
          'total_harga',
          'kode_produk',
          'satuan',
          'harga',
          'sub_total',
          'qty',
          'kode_diskon',
          'nama_diskon',
          'persentase',
          'jenis_ok',
          'no_implementasi',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetOC, payload: { feedbackOC: dataSave } });
      });
    };
  },
  getStaffByDivisi: (divisi: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`staff/by-divisi/${divisi}`).then((res) => {
        const decryptData = doDecryptData(res.data, [
          '_id',
          'kode_staff',
          'kode_divisi',
          'status',
          'input_date',
          'edit_by',
          'edit_date',
        ]);
        dispatch({ type: actionTypes.GetStaffByDivisi, payload: { feedbackStaff: decryptData } });
      });
    };
  },
  addStaffToLocal: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => RootState
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormImplementation.values;
      if (data?.division === undefined || data?.staff === undefined) {
        toast.error('Fill The Staff Form First !');
      } else {
        getLocal('dataStaff').then((res) => {
          AxiosGet(`staff/by-kode/${data.staff}`).then((resStaff) => {
            const decryptData = doDecryptData(resStaff.data, [
              'kode_staff',
              '_id',
              'status',
              'input_date',
            ]);
            if (res.length === 0) {
              const saveData: any = [];
              const dataObject = {
                key: 1,
                kode_helpdesk: decryptData[0].kode_staff,
                nama_helpdesk: decryptData[0].nama_staff,
              };
              saveData.push(dataObject);
              saveLocal('dataStaff', saveData).then(() => {
                dispatch(actions.getStaffLocal());
                toast.success('Add Data Staff Success !');
              });
            } else {
              const cek = res.find((element: any) => element.kode_helpdesk === data.staff);
              if (cek) {
                toast.error('Data Already In Table !');
              } else {
                const saveData: any = res;
                const dataObject = {
                  key: res.length + 1,
                  kode_helpdesk: decryptData[0].kode_staff,
                  nama_helpdesk: decryptData[0].nama_staff,
                };
                saveData.push(dataObject);
                saveLocal('dataStaff', saveData).then(() => {
                  dispatch(actions.getStaffLocal());
                  toast.success('Add Data Staff Success !');
                });
              }
            }
          });
        });
      }
    };
  },
  getStaffLocal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataStaff').then((res) => {
        dispatch({ type: actionTypes.GetStaffLocal, payload: { localStaff: res } });
      });
    };
  },
  addImplementation: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('dataStaff').then((res) => {
        if (res.length === 0) {
          toast.error('Fill The Staff First !');
          dispatch(utility.actions.hideLoading());
        } else {
          const detailStaff: any = [];
          res.forEach((element: any) => {
            const row = {
              kode_helpdesk: element.kode_helpdesk,
              nama_helpdesk: element.nama_helpdesk,
            };
            detailStaff.push(row);
          });
          const onSendData = {
            no_order_konfirmasi: data.no_oc,
            tanggal_implementasi: moment(data.implementation_date).format('YYYY-MM-DD'),
            tanggal_realisasi: moment(data.realization_date).format('YYYY-MM-DD'),
            detail_staff: detailStaff,
            tipe_implementasi: data.implementation_type,
            // eslint-disable-next-line
            lama_implementasi: parseInt(data.duration),
          };
          AxiosPost('implementation', onSendData)
            .then((resPost) => {
              // eslint-disable-next-line
              console.log(resPost);
              localStorage.removeItem('dataStaff');
              toast.success('Success Add Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(modal.actions.hide());
              dispatch(actions.getImplementation());
              dispatch(reset('FormImplementation'));
              dispatch(actions.getStaffLocal);
            })
            .catch((err) => {
              // eslint-disable-next-line
              console.log(err);
              toast.error('Failed Add Data !');
            });
        }
      });
    };
  },
  deleteStaffLocal: (staffCode: string) => {
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
          getLocal('dataStaff').then((res) => {
            const dataFill = res.filter((element: any) => element.kode_helpdesk !== staffCode);
            const newArr: any = [];
            let no = 1;
            if (dataFill.length === 0) {
              saveLocal('dataStaff', []).then(() => {
                dispatch(actions.getStaffLocal());
                toast.success('Success Delete Data !');
              });
            } else {
              dataFill.forEach((val: any) => {
                const row = {
                  key: no,
                  kode_helpdesk: val.kode_helpdesk,
                  nama_helpdesk: val.nama_helpdesk,
                };
                no += 1;
                newArr.push(row);
              });
              saveLocal('dataStaff', newArr).then(() => {
                dispatch(actions.getStaffLocal());
                toast.success('Success Delete Data !');
              });
            }
          });
        }
      });
    };
  },
  deleteImplementation: (id: string) => {
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
          AxiosDelete(`implementation/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(actions.getImplementation());
            })
            .catch((err) => {
              // eslint-disable-next-line
              console.log(err);
              toast.error('Failed Delete Data !');
            });
        }
      });
    };
  },
  getDataImplementationByID: (id: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`implementation/by-id/${id}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_implementasi',
          'tanggal_implementasi',
          'tanggal_realisasi',
          'kode_helpdesk',
          'tipe_implementasi',
          'lama_implementasi',
          'status',
          'input_date',
        ]);
        const dataStaff: any = [];
        let no = 1;
        dataDecrypt.staff_implementasi.forEach((element: any) => {
          const row = {
            key: no,
            kode_helpdesk: element.kode_helpdesk,
            nama_helpdesk: element.nama_helpdesk,
          };
          dataStaff.push(row);
          no += 1;
        });
        AxiosGet(
          `sales-order/by-no-implementasi/?no_implementasi=${dataDecrypt.no_implementasi}`
        ).then((ressales) => {
          const dataDecryptSales = doDecryptData(ressales.data, ['no_order_konfirmasi']);
          dataDecrypt.no_order_konfirmasi = dataDecryptSales[0]?.no_order_konfirmasi;

          saveLocal('dataStaff', dataStaff).then(() => {
            dispatch({
              type: actionTypes.GetImplementationByID,
              payload: { feedbackID: dataDecrypt, isEdit: true },
            });
            dispatch(actions.getStaffLocal());
            dispatch(modal.actions.show());
          });
        });
      });
    };
  },
  closeModal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({
        type: actionTypes.GetImplementationByID,
        payload: { feedbackID: undefined, isEdit: false },
      });
      localStorage.removeItem('dataStaff');
      dispatch(modal.actions.hide());
    };
  },
  updateImplementation: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      getLocal('dataStaff').then((res) => {
        const detailStaff: any = [];
        res.forEach((element: any) => {
          const row = {
            kode_helpdesk: element.kode_helpdesk,
            nama_helpdesk: element.nama_helpdesk,
          };
          detailStaff.push(row);
        });
        const onSendData = {
          tanggal_implementasi: moment(data.implementation_date).format('YYYY-MM-DD'),
          tanggal_realisasi: moment(data.realization_date).format('YYYY-MM-DD'),
          detail_staff: detailStaff,
          tipe_implementasi: data.implementation_type,
          // eslint-disable-next-line
          lama_implementasi: parseInt(data.duration),
        };
        AxiosPut(`implementation/${data.id}`, onSendData)
          .then(() => {
            toast.success('Success Edit Data !');
            dispatch(actions.getImplementation());
            dispatch(utility.actions.hideLoading());
            dispatch(actions.closeModal());
          })
          .catch((err) => {
            const dataErr = err.response?.data;
            dispatch(utility.actions.hideLoading());
            toast.error(dataErr.message || 'Error');
          });
      });
    };
  },
  // eslint-disable-next-line
  validateImplementation: (no_implementasi: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      // eslint-disable-next-line
      const onSendData = { no_implementasi: no_implementasi };
      AxiosPost('implementation/validate', onSendData)
        .then(() => {
          toast.success('Success Validate Data !');
          dispatch(actions.getImplementation());
        })
        .catch((err) => {
          const dataErr = err.response?.data;
          toast.error(dataErr.message || 'Error');
        });
    };
  },
};
