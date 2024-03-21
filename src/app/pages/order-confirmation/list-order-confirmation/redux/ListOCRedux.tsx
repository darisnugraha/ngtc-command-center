/* eslint-disable*/
import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { change, getFormValues } from 'redux-form';
import moment from 'moment';
import { AxiosGet, AxiosPost, RootState } from '../../../../../setup';
import { doDecryptData, getLocal, saveLocal } from '../../../../../setup/encrypt.js';
import { ListOCModel } from '../model/ListOCModel';
import * as modal from '../../../../modules/modal/GlobalModalRedux';
import { AxiosDelete } from '../../../../../setup/axios/AxiosDelete';
import * as utility from '../../../../../setup/redux/UtilityRedux';
import OCPDF from '../component/OCPDF.jsx';
import { AxiosPut } from '../../../../../setup/axios/AxiosPut';
import OC from '../../add-order-confirmation/component/OC.jsx';
import {
  changeDateIndoToGlobal,
  dataURLtoPDFFile,
  NumberOnly,
} from '../../../../../setup/function.js';
import { postPDF } from '../../../../../setup/axios/Firebase';
import * as modalSecond from '../../../../modules/modal/ModalSecondRedux';

const ignoredListOrderConfirmation = [
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
  'sub_total_diskon',
  'qty',
  'kode_diskon',
  'nama_diskon',
  'persentase',
  'jenis_ok',
  'jenis_produk',
  'no_support_service',
  'no_production_service',
  'kode_satuan',
  'total_harga_diskon',
  'kode_staff',
  'nominal_diskon',
  'no_urut',
  'harga_sebelum_diskon',
  'harga_setelah_diskon',
  'diskon_manual',
  'type',
];
const ignoredListProduct = [
  'qty',
  'sub_total',
  'harga',
  'sub_total_diskon',
  'persentase',
  'no_support_service',
  'no_production_service',
  'kode_satuan',
];
const ignoredListDiskon = [
  'kode_diskon',
  'nama_diskon',
  'persentase',
  'diskon_rp',
  'sub_total_diskon',
  'persentase',
  'sub_total',
  'nominal_diskon',
  'harga_sebelum_diskon',
  'harga_setelah_diskon',
  'no_urut',
];
const ignoredListSupportService = [
  'qty',
  'sub_total',
  'harga',
  'sub_total_diskon',
  'persentase',
  'total_harga',
  'total_harga_diskon',
];

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetListOC: '[LISTOC] Get Data List OC',
  GetListOCByNo: '[LISTOC] Get Data List OC By No',
  setTypeOC: '[LISTOC] Set Type OC',
  setProduct: '[LISTOC] Set Product',
  GetDetailDataProduct: '[LISTOC] Get Detail Product',
  setLocalProduct: '[LISTOC] Save Local Product',
  setLocalDiskon: '[LISTOC] Save Local Diskon',
  setLocalProductionService: '[LISTOC] Save Local Production Service',
  setLocalSupportService: '[LISTOC] Save Local Support Service',
  setEditProduct: '[LISTOC] Save Edit Product',
  clearDetailData: '[LISTOC] Clear Detail Data',
};

export interface IListOCState {
  isSending?: boolean;
  feedback?: Array<any>;
  feedbackNo?: Array<ListOCModel>;
  typeOC?: String;
  typeProduct?: String;
  dataProduct?: Array<any>;
  detailProduct?: any;
  feedbackProduct?: Array<any>;
  feedbackDiskon?: Array<any>;
  feedbackProductionService?: Array<any>;
  feedbackSupportService?: Array<any>;
  editProduct?: any;
}

const initialListOCState: IListOCState = {
  isSending: false,
  feedback: [],
  feedbackNo: undefined,
  typeOC: undefined,
  typeProduct: undefined,
  dataProduct: [],
  detailProduct: undefined,
  feedbackProduct: [],
  feedbackDiskon: [],
  feedbackSupportService: [],
  feedbackProductionService: [],
  editProduct: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-list-order-confirmation', whitelist: ['isSending'] },
  (state: IListOCState = initialListOCState, action: ActionWithPayload<IListOCState>) => {
    switch (action.type) {
      case actionTypes.GetListOC: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetListOCByNo: {
        const data = action.payload?.feedbackNo;
        return { ...state, feedbackNo: data };
      }
      case actionTypes.setTypeOC: {
        const data = action.payload?.typeOC;
        return { ...state, typeOC: data };
      }
      case actionTypes.setProduct: {
        const data = action.payload?.dataProduct;
        const type = action.payload?.typeProduct;
        return { ...state, dataProduct: data, typeProduct: type };
      }
      case actionTypes.GetDetailDataProduct: {
        const data = action.payload?.detailProduct;
        return { ...state, detailProduct: data };
      }
      case actionTypes.setLocalProduct: {
        const data = action.payload?.feedbackProduct;
        return { ...state, feedbackProduct: data };
      }
      case actionTypes.setLocalDiskon: {
        const data = action.payload?.feedbackDiskon;
        return { ...state, feedbackDiskon: data };
      }
      case actionTypes.setLocalProductionService: {
        const data = action.payload?.feedbackProductionService;
        return { ...state, feedbackProductionService: data };
      }
      case actionTypes.setLocalSupportService: {
        const data = action.payload?.feedbackSupportService;
        return { ...state, feedbackSupportService: data };
      }
      case actionTypes.setEditProduct: {
        const data = action.payload?.editProduct;
        return { ...state, editProduct: data };
      }
      case actionTypes.clearDetailData: {
        return {
          ...state,
          feedbackProduct: [],
          feedbackDiskon: [],
          feedbackProductionService: [],
          feedbackSupportService: [],
          editProduct: undefined,
          feedbackNo: undefined,
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  clearDetailData: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.clearDetailData });
    };
  },
  reCalculateDiscountGlobal: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const localData: any = await getLocal('dataProduct', [
        'sub_total',
        'qty',
        'harga',
        'persentase',
        'sub_total_diskon',
      ]);
      const discountData: any = await getLocal('dataDiskon', [
        'persentase',
        'diskon_rp',
        'final_price_after_discount',
        'nominal_diskon',
        'no_urut',
        'harga_sebelum_diskon',
        'harga_setelah_diskon',
        'nama_diskon',
        'kode_diskon',
        'sub_total',
      ]);
      const listSupport: any = await getLocal('dataSupportService', [
        'qty',
        'harga',
        'total_harga',
        'persentase',
        'total_harga_diskon',
      ]);
      const listProduction: any = await getLocal('dataProductionService', [
        'qty',
        'total_harga',
        'harga',
        'persentase',
        'total_harga_diskon',
      ]);

      const sub_total_produk = localData.reduce(
        (a: any, b: any) => a + (b.sub_total - b.sub_total_diskon),
        0
      );
      const sub_total_supp = listSupport.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );
      const sub_total_production = listProduction.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );
      let grandTotal = sub_total_produk + sub_total_supp + sub_total_production;
      const listDiskon: any[] = discountData;
      listDiskon.sort((a: any, b: any) => a.no_urut - b.no_urut);
      const newDiscountList = listDiskon.map((data: any) => {
        var nominalDiscount = 0;
        if (data.persentase == 0 && data.sub_total != 0) {
          nominalDiscount = data.sub_total;
        } else {
          nominalDiscount = (data.persentase / 100) * grandTotal;
        }
        data.harga_sebelum_diskon = grandTotal;
        data.harga_setelah_diskon = grandTotal - nominalDiscount;
        data.nominal_diskon = nominalDiscount;
        grandTotal = grandTotal - nominalDiscount;
        return data;
      });
      dispatch({ type: actionTypes.setLocalDiskon, payload: { feedbackDiskon: newDiscountList } });
      saveLocal('dataDiskon', newDiscountList, ignoredListDiskon).then(() => {
        toast.success('Success Add Discount !');
        dispatch(actions.getLocalDiskon());
      });
      dispatch(actions.getDiscountManual);
    };
  },
  getDiscountManual: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const selectedData: any[] = state.listorderconfirmation.feedbackNo;
      const listProduk: any[] = state.listorderconfirmation.feedbackProduct;
      const listSupportService: any[] = state.listorderconfirmation.feedbackSupportService;
      const listProductionService: any[] = state.listorderconfirmation.feedbackProductionService;
      const listDiskon: any[] = state.listorderconfirmation.feedbackDiskon;
      listDiskon.sort((a: any, b: any) => a.no_urut - b.no_urut);
      const totalProduct = listProduk.reduce(
        (a: any, b: any) => a + (b.sub_total - b.sub_total_diskon),
        0
      );
      const totalSupportService = listSupportService.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );
      const totalProductionService = listProductionService.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );
      const grandTotal = totalProduct + totalSupportService + totalProductionService;
      let lastGrandTotalAfterDiscount = grandTotal;
      listDiskon.forEach((data: any) => {
        if (data.persentase == 0 && data.sub_total != 0) {
          lastGrandTotalAfterDiscount = lastGrandTotalAfterDiscount - data.sub_total;
        } else if (data.persentase != 0 && data.sub_total == 0) {
          lastGrandTotalAfterDiscount =
            lastGrandTotalAfterDiscount - (data.persentase / 100) * lastGrandTotalAfterDiscount;
        } else {
          lastGrandTotalAfterDiscount = lastGrandTotalAfterDiscount;
        }
      });
      const lastPriceAfterDicount = lastGrandTotalAfterDiscount;
      let diskonManual = selectedData[0].diskon_manual;
      if (localStorage.getItem('lastDiscountManual') !== null) {
        diskonManual = localStorage.getItem('lastDiscountManual');
      }
      dispatch(change('FormEditDiskonManual', 'discount_manual', diskonManual));
      dispatch(change('FormEditDiskonManual', 'sub_total', lastPriceAfterDicount));
      dispatch(change('FormEditDiskonManual', 'grand_total', lastPriceAfterDicount - diskonManual));
    };
  },
  changeDiscountManual: (data: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const selectedData = state.listorderconfirmation.feedbackNo;
      const listProduk: any[] = state.listorderconfirmation.feedbackProduct;
      const listSupportService: any[] = state.listorderconfirmation.feedbackSupportService;
      const listProductionService: any[] = state.listorderconfirmation.feedbackProductionService;
      const listDiskon: any[] = state.listorderconfirmation.feedbackDiskon;
      listDiskon.sort((a: any, b: any) => a.no_urut - b.no_urut);
      const totalProduct = listProduk.reduce(
        (a: any, b: any) => a + (b.sub_total - b.sub_total_diskon),
        0
      );
      const totalSupportService = listSupportService.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );
      const totalProductionService = listProductionService.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );
      const grandTotal = totalProduct + totalSupportService + totalProductionService;
      let lastGrandTotalAfterDiscount = grandTotal;
      listDiskon.forEach((data: any) => {
        if (data.persentase == 0 && data.sub_total != 0) {
          lastGrandTotalAfterDiscount = lastGrandTotalAfterDiscount - data.sub_total;
        } else if (data.persentase != 0 && data.sub_total == 0) {
          lastGrandTotalAfterDiscount =
            lastGrandTotalAfterDiscount - (data.persentase / 100) * lastGrandTotalAfterDiscount;
        } else {
          lastGrandTotalAfterDiscount = lastGrandTotalAfterDiscount;
        }
      });
      const lastPriceAfterDicount = lastGrandTotalAfterDiscount;
      localStorage.setItem('lastDiscountManual', data);
      dispatch(change('FormEditDiskonManual', 'discount_manual', data));
      dispatch(change('FormEditDiskonManual', 'sub_total', lastPriceAfterDicount));
      dispatch(change('FormEditDiskonManual', 'grand_total', lastPriceAfterDicount - data));
    };
  },
  calculateGlobalDiscount: (value: number, isPercentage: boolean = false) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const localData: any = await getLocal('dataProduct', [
        'sub_total',
        'qty',
        'harga',
        'persentase',
        'sub_total_diskon',
      ]);
      const discountData: any = await getLocal('dataDiskon', [
        'persentase',
        'diskon_rp',
        'final_price_after_discount',
        'nominal_diskon',
        'no_urut',
        'harga_sebelum_diskon',
        'harga_setelah_diskon',
      ]);
      const listSupport: any = await getLocal('dataSupportService', [
        'qty',
        'harga',
        'total_harga',
        'persentase',
        'total_harga_diskon',
      ]);
      const listProduction: any = await getLocal('dataProductionService', [
        'qty',
        'total_harga',
        'harga',
        'persentase',
        'total_harga_diskon',
      ]);
      let grandTotal = 0;
      const sub_total_produk = localData.reduce(
        (a: any, b: any) => a + (b.sub_total - b.sub_total_diskon),
        0
      );
      const sub_total_supp = listSupport.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );
      const sub_total_production = listProduction.reduce(
        (a: any, b: any) => a + (b.total_harga - b.total_harga_diskon),
        0
      );

      if (discountData.length > 0) {
        let lastDiscountData = discountData[discountData.length - 1];
        grandTotal = lastDiscountData.harga_setelah_diskon;
      } else {
        grandTotal = sub_total_produk + sub_total_supp + sub_total_production;
      }
      console.log('INI DI DISKON GLOBAL', grandTotal);

      dispatch(
        change(
          'FormEditDiskon',
          'final_price_after_discount',
          parseInt((grandTotal - (isPercentage ? (value / 100) * grandTotal : value)).toString())
        )
      );
      dispatch(change('FormEditDiskon', 'final_price_before_discount', Number(grandTotal)));
      dispatch(
        change(
          'FormEditDiskon',
          'nominal_discount',
          isPercentage ? (value / 100) * grandTotal : value
        )
      );
    };
  },
  getListOC: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('order-confirmation').then((res) => {
        const dataDecrypt = doDecryptData(res.data, ignoredListOrderConfirmation);

        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetListOC, payload: { feedback: dataSave } });
      });
    };
  },
  getListOCByNo: (no_order_konfirmasi: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`order-confirmation/by-no?no_order_konfirmasi=${no_order_konfirmasi}`).then(
        (res) => {
          const dataDecrypt = doDecryptData(res.data, ignoredListOrderConfirmation);

          dispatch({ type: actionTypes.GetListOCByNo, payload: { feedbackNo: dataDecrypt } });
          dispatch({ type: actionTypes.setTypeOC, payload: { typeOC: dataDecrypt[0].jenis_ok } });
          dispatch(actions.setLocalProd(no_order_konfirmasi));
          dispatch(actions.setLocalDiskon(no_order_konfirmasi));
          dispatch(actions.setLocalSupportService(no_order_konfirmasi));
          dispatch(actions.setLocalProductionService(no_order_konfirmasi));
          dispatch(modal.actions.show());
        }
      );
    };
  },
  setLocalProd: (no_order_konfirmasi: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const selectedData = state.listorderconfirmation.feedbackNo;
      const dataDecrypt = { ...selectedData[0] };

      saveLocal('dataProduct', dataDecrypt.detail_produk, ignoredListProduct).then(() => {
        dispatch(actions.getLocalProd());
      });
    };
  },
  setLocalSupportService: (no_order_konfirmasi: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const selectedData = state.listorderconfirmation.feedbackNo;
      const dataDecrypt = { ...selectedData[0] };
      saveLocal(
        'dataSupportService',
        dataDecrypt.detail_support_service,
        ignoredListSupportService
      ).then(() => {
        dispatch(actions.getLocalSupportService());
      });
    };
  },
  setLocalProductionService: (no_order_konfirmasi: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const selectedData = state.listorderconfirmation.feedbackNo;
      const dataDecrypt = { ...selectedData[0] };
      saveLocal(
        'dataProductionService',
        dataDecrypt.detail_production_service,
        ignoredListSupportService
      ).then(() => {
        dispatch(actions.getLocalProductionService());
      });
    };
  },
  setLocalDiskon: (no_order_konfirmasi: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const selectedData = state.listorderconfirmation.feedbackNo;
      const dataDecrypt = { ...selectedData[0] };
      const dataDiskon: any[] = dataDecrypt.detail_diskon.map((element: any) => {
        return {
          kode_diskon: element.kode_diskon,
          nama_diskon: element.nama_diskon,
          persentase: element.persentase * 100 || 0,
          sub_total: element.sub_total || 0,
          nominal_diskon: element.nominal_diskon || 0,
          no_urut: Number(element.no_urut) || 0,
          harga_sebelum_diskon: parseInt(element.harga_sebelum_diskon) || 0,
          harga_setelah_diskon: parseInt(element.harga_setelah_diskon) || 0,
        };
      });
      dataDiskon.sort((a: any, b: any) => a.no_urut - b.no_urut);
      saveLocal('dataDiskon', dataDiskon, ignoredListDiskon).then(() => {
        dispatch(actions.getLocalDiskon());
      });
    };
  },
  saveLocal: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProduct', ignoredListProduct).then((res) => {
        let newArrData = [];
        const row = {
          harga: data.price,
          kode_produk: data.product.value || data.product,
          nama_produk: data.product_name,
          // eslint-disable-next-line
          qty: parseInt(data.qty),
          satuan: data.unit,
          sub_total: data.sub_total,
          jenis_produk: data.product_type.value || data.product_type,
          type: data.type || '-',
          kode_diskon: data.discount_code || '-',
          nama_diskon: data.discount_name || '-',
          persentase: data.discount_percentage || 0,
          sub_total_diskon: data.sub_total_diskon || 0,
        };
        const cek = res.find((el: any) => el.nama_produk === data.product_name);

        if (cek !== undefined) {
          toast.error('Data Already In Table');
        } else {
          // eslint-disable-next-line
          if (res.length === 0) {
            newArrData.push(row);
            saveLocal('dataProduct', newArrData, ignoredListProduct).then(() => {
              toast.success('Success Add Product !');
              dispatch(actions.getLocalProd());
            });
          } else {
            newArrData = res;
            newArrData.push(row);
            dispatch({
              type: actionTypes.setLocalProduct,
              payload: { feedbackProduct: newArrData },
            });
            saveLocal('dataProduct', newArrData, ignoredListProduct).then(() => {
              toast.success('Success Add Product !');
              dispatch(actions.getLocalProd());
            });
          }
        }
        dispatch(actions.getDiscountManual());
        dispatch(actions.reCalculateDiscountGlobal());
      });
    };
  },
  saveLocalDiskon: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataDiskon', ignoredListDiskon).then((res) => {
        let newArrData = [];
        let lastDiscount = 0;
        if (res.length > 1) {
          lastDiscount = res[res.length - 1]?.no_urut;
        }
        const row = {
          kode_diskon: data.discount_code.value || data.discount_code,
          nama_diskon: data.discount_name,
          persentase: data.discount_percentage || 0,
          sub_total: Number(data.discount_rp) || 0,
          nominal_diskon: Number(data.nominal_discount) || 0,
          no_urut: lastDiscount + 1 || 0,
          harga_sebelum_diskon: Number(data.final_price_before_discount) || 0,
          harga_setelah_diskon: Number(data.final_price_after_discount) || 0,
        };
        const cek = res.find((el: any) => el.kode_diskon === row.kode_diskon);

        if (cek !== undefined) {
          toast.error('Data Already In Table');
        } else {
          // eslint-disable-next-line
          if (res.length === 0) {
            newArrData.push(row);
            saveLocal('dataDiskon', newArrData, ignoredListDiskon).then(() => {
              toast.success('Success Add Discount !');
              dispatch(actions.getLocalDiskon());
            });
          } else {
            newArrData = res;
            newArrData.push(row);
            dispatch({ type: actionTypes.setLocalDiskon, payload: { feedbackDiskon: newArrData } });
            saveLocal('dataDiskon', newArrData, ignoredListDiskon).then(() => {
              toast.success('Success Add Discount !');
              dispatch(actions.getLocalDiskon());
            });
          }
        }
        dispatch(actions.getDiscountManual());
        dispatch(actions.reCalculateDiscountGlobal());
      });
    };
  },
  saveLocalSupportService: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataSupportService', ignoredListSupportService).then((res) => {
        let newArrData = [];
        const row = {
          no_support_service: data.no_support_service,
          nama_support_service: data.support_service_name,
          harga: data.price,
          qty: data.qty,
          kode_satuan: data.unit,
          total_harga: data.total_price,
          kode_diskon: data.discount_code || '-',
          nama_diskon: data.discount_name || '-',
          persentase: Number(data.discount_percentage || '0'),
          total_harga_diskon: data.total_harga_diskon || 0,
        };
        const cek = res.find((el: any) => el.no_support_service === row.no_support_service);

        if (cek !== undefined) {
          toast.error('Data Already In Table');
        } else {
          // eslint-disable-next-line
          if (res.length === 0) {
            newArrData.push(row);
            saveLocal('dataSupportService', newArrData, ignoredListSupportService).then(() => {
              toast.success('Success Add Support Service !');
              dispatch(actions.getLocalSupportService());
            });
          } else {
            newArrData = res;
            newArrData.push(row);
            dispatch({
              type: actionTypes.setLocalSupportService,
              payload: { feedbackSupportService: newArrData },
            });
            saveLocal('dataSupportService', newArrData, ignoredListSupportService).then(() => {
              toast.success('Success Add Support Service !');
              dispatch(actions.getLocalSupportService());
            });
          }
        }
        dispatch(actions.getDiscountManual());
        dispatch(actions.reCalculateDiscountGlobal());
      });
    };
  },
  saveLocalProductionService: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProductionService', ignoredListSupportService).then((res) => {
        let newArrData = [];
        const row = {
          no_production_service: data.no_production_service,
          nama_production_service: data.production_service_name,
          qty: data.qty,
          kode_satuan: data.unit,
          total_harga: data.total_price,
          kode_diskon: data.discount_code || '-',
          nama_diskon: data.discount_name || '-',
          persentase: Number(data.discount_percentage || '0'),
          total_harga_diskon: data.total_harga_diskon || 0,
        };
        const cek = res.find((el: any) => el.no_production_service === row.no_production_service);

        if (cek !== undefined) {
          toast.error('Data Already In Table');
        } else {
          // eslint-disable-next-line
          if (res.length === 0) {
            newArrData.push(row);
            saveLocal('dataProductionService', newArrData, ignoredListSupportService).then(() => {
              toast.success('Success Add Production Service !');
              dispatch(actions.getLocalProductionService());
            });
          } else {
            newArrData = res;
            newArrData.push(row);
            dispatch({
              type: actionTypes.setLocalProductionService,
              payload: { feedbackProductionService: newArrData },
            });
            saveLocal('dataProductionService', newArrData, ignoredListSupportService).then(() => {
              toast.success('Success Add Production Service !');
              dispatch(actions.getLocalProductionService());
            });
          }
        }
        dispatch(actions.getDiscountManual());
        dispatch(actions.reCalculateDiscountGlobal());
      });
    };
  },
  postProduct: () => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const state = getState();
      const dataOK = state.listorderconfirmation.feedbackNo[0];
      const dataProduct = await getLocal('dataProduct', ignoredListProduct);
      const dataDiscount = await getLocal('dataDiskon', ignoredListDiskon);
      const dataSupportService = await getLocal('dataSupportService', ignoredListSupportService);
      const dataProductionService = await getLocal(
        'dataProductionService',
        ignoredListSupportService
      );
      let diskonManual = dataOK.diskon_manual;
      if (localStorage.getItem('lastDiscountManual') !== null) {
        diskonManual = localStorage.getItem('lastDiscountManual');
      }
      const discountManualForm: any = getFormValues('FormEditDiskonManual')(state);
      console.log(discountManualForm);

      const onSendData = {
        no_order_konfirmasi: dataOK.no_order_konfirmasi,
        detail_produk: dataProduct.map(({ _id, ...rest }: any) => {
          return rest;
        }),
        detail_diskon: dataDiscount,
        detail_support_service: dataSupportService.map(({ _id, ...rest }: any) => {
          return rest;
        }),
        detail_production_service: dataProductionService.map(({ _id, ...rest }: any) => {
          return rest;
        }),
        diskon_manual: Number(diskonManual),
        total_harga: discountManualForm?.grand_total || 0,
      };
      console.log(onSendData);

      AxiosPut('order-confirmation/update/product', onSendData)
        .then(() => {
          toast.success('Success Edit Data !');
          localStorage.removeItem('dataDiskon');
          localStorage.removeItem('dataProduct');
          localStorage.removeItem('dataSupportService');
          localStorage.removeItem('dataProductionService');
          localStorage.removeItem('lastDiscountManual');
          dispatch(actions.getListOC());
          dispatch(utility.actions.hideLoading());
          dispatch(modal.actions.hide());
        })
        .catch((err: any) => {
          dispatch(utility.actions.hideLoading());
          const dataErr = err.response.data;
          toast.error(dataErr.message);
        });
    };
  },
  getLocalProd: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProduct', ignoredListProduct).then((res) => {
        dispatch({ type: actionTypes.setLocalProduct, payload: { feedbackProduct: res } });
        dispatch(actions.getDiscountManual());
      });
    };
  },
  getLocalDiskon: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataDiskon', ignoredListDiskon).then((res) => {
        dispatch({ type: actionTypes.setLocalDiskon, payload: { feedbackDiskon: res } });
        dispatch(actions.getDiscountManual());
      });
    };
  },
  getLocalSupportService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataSupportService', ignoredListSupportService).then((res) => {
        dispatch({
          type: actionTypes.setLocalSupportService,
          payload: { feedbackSupportService: res },
        });
        dispatch(actions.getDiscountManual());
      });
    };
  },
  getLocalProductionService: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProductionService', ignoredListSupportService).then((res) => {
        dispatch({
          type: actionTypes.setLocalProductionService,
          payload: { feedbackProductionService: res },
        });
        dispatch(actions.getDiscountManual());
      });
    };
  },
  deleteOC: (id: string) => {
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
          AxiosDelete(`order-confirmation/${id}`)
            .then(() => {
              toast.success('Success Delete Data !');
              dispatch(utility.actions.hideLoading());
              dispatch(actions.getListOC());
              dispatch(actions.getDiscountManual());
            })
            .catch(() => {
              toast.error('Failed Delete Data !');
              dispatch(utility.actions.hideLoading());
            });
        }
      });
    };
  },
  deleteProduct: (kode: string) => {
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
          getLocal('dataProduct', ignoredListProduct).then((res) => {
            const dataFill = res.filter((element: any) => element.kode_produk !== kode);
            saveLocal('dataProduct', dataFill, ignoredListProduct)
              .then(() => {
                toast.success('Success Delete Data !');
                dispatch(actions.getLocalProd());
                dispatch(actions.getDiscountManual());
              })
              .catch(() => {
                toast.error('Failed Delete Data !');
              });
          });
        }
      });
    };
  },
  editProduct: (kode_produk: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      getLocal('dataProduct', ignoredListProduct).then((res) => {
        const dataFind = res.find((element: any) => element.kode_produk === kode_produk);
        dispatch({
          type: actionTypes.setEditProduct,
          payload: {
            editProduct: {
              product_code: dataFind.kode_produk,
              product_name: dataFind.nama_produk,
              qty: dataFind.qty,
              unit: dataFind.satuan,
              price: dataFind.harga,
              sub_total: dataFind.sub_total,
              _id: dataFind._id,
              discount_code: dataFind.kode_diskon,
              discount_name: dataFind.nama_diskon,
              discount_percentage: dataFind.persentase,
              sub_total_diskon: dataFind.sub_total_diskon,
            },
          },
        });
        dispatch(change('FormEditProduct', 'product_code', dataFind.kode_produk));
        dispatch(change('FormEditProduct', 'product_name', dataFind.nama_produk));
        dispatch(change('FormEditProduct', 'product_type', dataFind.jenis_produk));
        dispatch(change('FormEditProduct', 'qty', dataFind.qty || 1));
        dispatch(change('FormEditProduct', 'unit', dataFind.satuan));
        dispatch(change('FormEditProduct', 'price', dataFind.harga));
        dispatch(change('FormEditProduct', 'sub_total', dataFind.sub_total));
        dispatch(change('FormEditProduct', '_id', dataFind._id));
        dispatch(change('FormEditProduct', 'discount_code', 'HRDW'));
        dispatch(change('FormEditProduct', 'discount_name', dataFind.nama_diskon));
        dispatch(change('FormEditProduct', 'discount_percentage', dataFind.persentase));
        dispatch(change('FormEditProduct', 'sub_total_diskon', dataFind.sub_total_diskon));
        dispatch(modalSecond.actions.show());
      });
    };
  },
  saveEditProduct: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const listProduct: any[] = await getLocal('dataProduct', ignoredListProduct);

      const indexEdited = listProduct.findIndex(
        (element: any) => element.kode_produk == data.product_code
      );

      listProduct.splice(indexEdited, 1, {
        harga: data.price,
        satuan: data.unit,
        jenis_produk: data.product_type,
        kode_produk: data.product_code,
        nama_produk: data.product_name,
        qty: Number(data.qty),
        sub_total: Number(data.sub_total),
        type: '-',
        _id: data._id,
      });
      await saveLocal('dataProduct', listProduct, ['sub_total', 'qty', 'harga']);
      dispatch(actions.getLocalProd());
      dispatch(modalSecond.actions.hide());
    };
  },
  deleteDiscount: (kode: string) => {
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
          getLocal('dataDiskon', ignoredListDiskon).then((res) => {
            const dataFill = res.filter((element: any) => element.kode_diskon !== kode);
            saveLocal('dataDiskon', dataFill, ignoredListDiskon)
              .then(() => {
                toast.success('Success Delete Data !');
                dispatch(actions.getLocalDiskon());
                dispatch(actions.getDiscountManual());
              })
              .catch(() => {
                toast.error('Failed Delete Data !');
              });
          });
        }
      });
    };
  },
  showModalPrint: (id: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(change('FormPrintPDF', 'id', id));
      AxiosGet(`order-confirmation/by-no?no_order_konfirmasi=${id}`)
        .then((res) => {
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
            'jenis_produk',
            'sub_total_diskon',
            'persentase',
          ]);
          if (dataDecrypt[0]?.deskripsi_header !== '-') {
            dispatch(change('FormPrintPDF', 'header_desc', dataDecrypt[0]?.deskripsi_header));
          } else {
            dispatch(
              change(
                'FormPrintPDF',
                'header_desc',
                'Sebelumnya kami ucapkan terima kasih atas kerjasama yang telah terjalin selama ini. Bersama ini kami sampaikan Order Konfirmasi Harga Software Nagatech Gold Store Solution web based (Online) dengan kondisi sbb :'
              )
            );
          }
          if (dataDecrypt[0]?.waktu_pengiriman !== '-') {
            dispatch(change('FormPrintPDF', 'waktu_pengiriman', dataDecrypt[0]?.waktu_pengiriman));
          } else {
            dispatch(
              change(
                'FormPrintPDF',
                'waktu_pengiriman',
                '... Hari setelah order konfirmasi disetujui'
              )
            );
          }
          if (dataDecrypt[0]?.sistem_pembayaran !== '-') {
            dispatch(
              change('FormPrintPDF', 'sistem_pembayaran', dataDecrypt[0]?.sistem_pembayaran)
            );
          } else {
            dispatch(
              change(
                'FormPrintPDF',
                'sistem_pembayaran',
                '...% pada saat order konfirmasi disetujui'
              )
            );
          }
          if (dataDecrypt[0]?.keterangan !== '-') {
            dispatch(change('FormPrintPDF', 'keterangan', dataDecrypt[0]?.keterangan));
          } else {
            dispatch(
              change(
                'FormPrintPDF',
                'keterangan',
                'Harga tersebut termasuk:\nBiaya garansi software selama berlangganan online/cloud & maintenance\nBiaya instalasi software\nBiaya pelatihan User\nHarga tersebut belum termasuk:\nBiaya langganan online/cloud & maintenance \nNagagold+ Member + Accessories Rp.900.000 (Sembilan Ratus Ribu Rupiah) perbulan.\nBiaya langganan online/cloud & maintenance \nsoftware cucian Rp. 400.000 ( Empat Ratus Ribu Rupiah) perbulan'
              )
            );
          }
          if (dataDecrypt[0]?.deskripsi_footer !== '-') {
            dispatch(change('FormPrintPDF', 'footer_desc', dataDecrypt[0]?.deskripsi_footer));
          } else {
            dispatch(
              change(
                'FormPrintPDF',
                'footer_desc',
                'Demikianlah Order Konfirmasi ini kami sampaikan. Apabila setuju dengan kondisi tersebut diatas, mohon Order Konfirmasi ini ditandatangani dan dikirimkan kembali kepada kami.'
              )
            );
          }
          dispatch(modal.actions.show());
        })
        .catch(() => {
          dispatch(
            change(
              'FormPrintPDF',
              'header_desc',
              'Sebelumnya kami ucapkan terima kasih atas kerjasama yang telah terjalin selama ini. Bersama ini kami sampaikan Order Konfirmasi Harga Software Nagatech Gold Store Solution web based (Online) dengan kondisi sbb :'
            )
          );
          dispatch(
            change('FormPrintPDF', 'waktu_pengiriman', '60 Hari setelah order konfirmasi disetujui')
          );
          dispatch(
            change('FormPrintPDF', 'sistem_pembayaran', '60% pada saat order konfirmasi disetujui')
          );
          dispatch(
            change(
              'FormPrintPDF',
              'keterangan',
              'Harga tersebut termasuk:\nBiaya garansi software selama berlangganan online/cloud & maintenance\nBiaya instalasi software\nBiaya pelatihan User\nHarga tersebut belum termasuk:\nBiaya langganan online/cloud & maintenance \nNagagold+ Member + Accessories Rp.900.000 (Sembilan Ratus Ribu Rupiah) perbulan.\nBiaya langganan online/cloud & maintenance \nsoftware cucian Rp. 400.000 ( Empat Ratus Ribu Rupiah) perbulan'
            )
          );
          dispatch(
            change(
              'FormPrintPDF',
              'footer_desc',
              'Demikianlah Order Konfirmasi ini kami sampaikan. Apabila setuju dengan kondisi tersebut diatas, mohon Order Konfirmasi ini ditandatangani dan dikirimkan kembali kepada kami.'
            )
          );
          dispatch(modal.actions.show());
        });
    };
  },
  printPDF: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      AxiosGet(`order-confirmation/by-no?no_order_konfirmasi=${data.id}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, ignoredListOrderConfirmation);
        const pdf64 = OC(dataDecrypt, data);
        const file = dataURLtoPDFFile(
          pdf64,
          `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`
        );
        const onsend = {
          no_order_konfirmasi: dataDecrypt[0]?.no_order_konfirmasi,
          deskripsi_header: data.header_desc,
          waktu_pengiriman: data.waktu_pengiriman,
          sistem_pembayaran: data.sistem_pembayaran,
          keterangan: data.keterangan,
          deskripsi_footer: data.footer_desc,
        };
        AxiosPost('order-confirmation/save-desc', onsend)
          .then(() => {
            postPDF(file, `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`)
              .then(() => {
                OCPDF(dataDecrypt, data);
                dispatch(utility.actions.hideLoading());
              })
              .catch(() => {
                OCPDF(dataDecrypt, data);
                dispatch(utility.actions.hideLoading());
              });
          })
          .catch((err) => {
            const dataErr = err.response.data;
            toast.error(dataErr.message);
            dispatch(utility.actions.hideLoading());
          });
      });
    };
  },
  sendPDF: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      AxiosGet(`order-confirmation/by-no?no_order_konfirmasi=${data.id}`).then((res) => {
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
          'jenis_produk',
          'sub_total_diskon',
          'persentase',
        ]);
        const pdf64 = OC(dataDecrypt, data);
        const file = dataURLtoPDFFile(
          pdf64,
          `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`
        );
        postPDF(file, `${dataDecrypt[0]?.no_order_konfirmasi.replace(/\//g, '_')}`)
          .then(() => {
            const send = {
              no_order_konfirmasi: data.id,
            };
            AxiosPost('order-confirmation/send-ok', send).finally(() => {
              OCPDF(dataDecrypt, data);
              dispatch(utility.actions.hideLoading());
            });
          })
          .catch(() => {
            OCPDF(dataDecrypt, data);
            dispatch(utility.actions.hideLoading());
          });
      });
    };
  },
  putEditCustomer: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData = {
        alamat_cabang: data.alamat_cabang,
        alamat_korespondensi: data.alamat_korespondensi,
        kota: data.kota,
        email: data.email,
      };
      AxiosPut(`order-confirmation/information/${data.id}`, onSendData)
        .then(() => {
          toast.success('Success Edit Data Customer !');
          dispatch(modal.actions.hide());
          dispatch(actions.getListOC());
          dispatch(utility.actions.hideLoading());
        })
        .catch((err) => {
          const dataErr = err.response.data;
          toast.error(dataErr.message);
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  setTypeProduct: (type: String) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      if (type === 'SOFTWARE') {
        AxiosGet('product/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_produk',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_produk;
            // eslint-disable-next-line
            element.product_name = element.nama_produk;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      } else if (type === 'CONSUMABLE') {
        AxiosGet('consumable/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_consumable',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_consumable;
            // eslint-disable-next-line
            element.product_name = element.nama_consumable;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      } else if (type === 'HARDWARE') {
        AxiosGet('hardware/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_hardware',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_hardware;
            // eslint-disable-next-line
            element.product_name = element.nama_hardware;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      } else {
        AxiosGet('bundle/open').then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_paket',
            'status',
            '_id',
            'input_date',
            'kode_produk',
            'jenis_produk',
            'harga',
            'total_harga',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            // eslint-disable-next-line
            element.product_code = element.kode_paket;
            // eslint-disable-next-line
            element.product_name = element.nama_paket;
            dataSave.push(element);
            no += 1;
          });
          dispatch({
            type: actionTypes.setProduct,
            payload: { dataProduct: dataSave, typeProduct: type },
          });
        });
      }
    };
  },
  getDetailProduct: (code: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const type = state.listorderconfirmation.typeProduct;
      if (type === 'SOFTWARE') {
        AxiosGet(`product/by-kode?kode_produk=${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_produk',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_produk));
          dispatch(change('FormEditProductList', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
        });
      } else if (type === 'CONSUMABLE') {
        AxiosGet(`consumable/by-kode?kode_consumable=${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_consumable',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_consumable));
          dispatch(change('FormEditProductList', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
        });
      } else if (type === 'HARDWARE') {
        AxiosGet(`hardware/by-kode?kode_hardware=${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_hardware',
            'kode_supplier',
            'status',
            '_id',
            'input_date',
            'harga',
            'type',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_hardware));
          dispatch(change('FormEditProductList', 'unit', dataDecrypt[0].satuan));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
        });
      } else {
        AxiosGet(`bundle/by-kode/${code}`).then((res) => {
          const dataDecrypt = doDecryptData(res.data, [
            'kode_paket',
            'status',
            '_id',
            'input_date',
            'kode_produk',
            'jenis_produk',
            'harga',
            'type',
            'total_harga',
          ]);
          dispatch({
            type: actionTypes.GetDetailDataProduct,
            payload: { detailProduct: dataDecrypt[0] },
          });
          dispatch(change('FormEditProductList', 'qty', 1));
          dispatch(change('FormEditProductList', 'unit', 'PACKAGE'));
          dispatch(change('FormEditProductList', 'product_name', dataDecrypt[0].nama_paket));
          dispatch(change('FormEditProductList', 'price', dataDecrypt[0].total_harga));
          dispatch(change('FormEditProductList', 'sub_total', dataDecrypt[0].total_harga * 1));
          dispatch(change('FormEditProductList', 'type', dataDecrypt[0].type || '-'));
        });
      }
    };
  },
  searchAction: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      dispatch(utility.actions.showLoadingButton());
      const onSendData: any = {
        kode_staff: data.staff_name,
        no_order_konfirmasi: data.no_oc,
        kode_toko: data.central_store_name,
        status: data.status_payment,
      };
      if (Array.isArray(data.date)) {
        onSendData.startDate = moment(data.date[0]).format('yyyy-MM-DD');
        onSendData.endDate = moment(data.date[1]).format('yyyy-MM-DD');
      } else {
        const date = data.date.split('-');

        onSendData.startDate = changeDateIndoToGlobal(date[0].trim());
        onSendData.endDate = changeDateIndoToGlobal(date[1].trim());
      }
      AxiosGet('order-confirmation/filter', { params: onSendData })
        .then((res) => {
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
            'jenis_produk',
            'sub_total_diskon',
            'persentase',
          ]);
          const dataSave: any = [];
          let no = 1;
          dataDecrypt.forEach((element: any) => {
            // eslint-disable-next-line
            element.key = no;
            dataSave.push(element);
            no += 1;
          });
          dispatch({ type: actionTypes.GetListOC, payload: { feedback: dataSave } });
          dispatch(utility.actions.hideLoading());
        })
        .catch((err) => {
          const dataErr = err.response?.data;
          toast.error(dataErr?.message || 'Error');
          dispatch(utility.actions.hideLoading());
        });
    };
  },
  setSubTotal: (qty: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormEditProductList.values;
      // eslint-disable-next-line
      const price = data.price;
      // eslint-disable-next-line
      const total = parseInt(qty) * parseInt(price);
      dispatch(change('FormEditProductList', 'sub_total', total));
    };
  },
  setSubTotalRp: (harga: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const data = state.form.FormEditProductList.values;
      // eslint-disable-next-line
      const qty = data.qty;
      // eslint-disable-next-line
      const total = parseInt(qty) * NumberOnly(harga);
      dispatch(change('FormEditProductList', 'sub_total', total));
    };
  },
  calculateDiscount: (value: number, isPercentage: boolean = false) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const payload: any = getFormValues('FormEditSupportServiceOC')(state);
      dispatch(
        change(
          'FormEditSupportServiceOC',
          'total_harga_diskon',
          isPercentage ? (value / 100) * payload.total_price : value
        )
      );
    };
  },
  calculateDiscountProduction: (value: number, isPercentage: boolean = false) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const payload: any = getFormValues('FormEditProductionServiceOC')(state);
      dispatch(
        change(
          'FormEditProductionServiceOC',
          'total_harga_diskon',
          isPercentage ? (value / 100) * payload.total_price : value
        )
      );
    };
  },
  getSupportDetail: (no: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const supportservice: any[] = state.supportservice.feedback;
      const selectedData = supportservice.find((find: any) => find.no_support_service === no);
      if (selectedData !== null) {
        dispatch(
          change(
            'FormEditSupportServiceOC',
            'support_service_name',
            selectedData.nama_support_service
          )
        );
        dispatch(change('FormEditSupportServiceOC', 'price', selectedData.harga));
        dispatch(change('FormEditSupportServiceOC', 'qty', selectedData.qty));
        dispatch(change('FormEditSupportServiceOC', 'unit', selectedData.kode_satuan));
        dispatch(
          change('FormEditSupportServiceOC', 'total_price', selectedData.qty * selectedData.harga)
        );
      }
    };
  },
  getProductionDetail: (no: String) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => {}
    ): Promise<void> => {
      const state: any = getState();
      const productionservice: any[] = state.productionservice.feedback;
      const selectedData = productionservice.find((find: any) => find.no_production_service === no);
      if (selectedData !== null) {
        dispatch(
          change(
            'FormEditProductionServiceOC',
            'production_service_name',
            selectedData.nama_production_service
          )
        );
        dispatch(change('FormEditProductionServiceOC', 'qty', selectedData.qty));
        dispatch(change('FormEditProductionServiceOC', 'unit', selectedData.kode_satuan));
        dispatch(change('FormEditProductionServiceOC', 'total_price', selectedData.total_harga));
      }
    };
  },
};
