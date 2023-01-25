import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
import { change } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosGet, AxiosPost } from '../../../../setup';
import { getImage, postImage } from '../../../../setup/axios/Firebase';
import { doDecryptData } from '../../../../setup/encrypt.js';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as modalSecond from '../../../modules/modal/ModalSecondRedux';
import KwitansiPDF from '../component/KwitansiPDF.jsx';

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  GetDataReceivable: '[RECEIVABLE] Get Data Receivable',
  GetDataReceivableDetail: '[RECEIVABLE] Get Data Receivable Detail',
  ShowModalPayment: '[RECEIVABLE] Show Modal Payment Receivable',
  SetCamera: '[RECEIVABLE] Set Camera',
  GetListBank: '[RECEIVABLE] Get List Bank',
  GetProofOfPayment: '[RECEIVABLE] Get Image Proof Of Payment',
};
export interface IReceivableState {
  feedback?: Array<any>;
  feedbackDetail?: Array<any>;
  feedbackDetailOC?: any;
  setCameraVal?: String;
  listBank?: Array<any>;
  proofOfPaymentIMG?: any;
}

const initialReceivableState: IReceivableState = {
  feedback: [],
  feedbackDetail: [],
  feedbackDetailOC: undefined,
  setCameraVal: '-',
  listBank: [],
  proofOfPaymentIMG: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-receivable', whitelist: ['isSending'] },
  (
    state: IReceivableState = initialReceivableState,
    action: ActionWithPayload<IReceivableState>
  ) => {
    switch (action.type) {
      case actionTypes.GetDataReceivable: {
        const data = action.payload?.feedback;
        return { ...state, feedback: data };
      }
      case actionTypes.GetDataReceivableDetail: {
        const data = action.payload?.feedbackDetail;
        return { ...state, feedbackDetail: data };
      }
      case actionTypes.ShowModalPayment: {
        const data = action.payload?.feedbackDetailOC;
        return { ...state, feedbackDetailOC: data };
      }
      case actionTypes.SetCamera: {
        const data = action.payload?.setCameraVal;
        return { ...state, setCameraVal: data };
      }
      case actionTypes.GetListBank: {
        const data = action.payload?.listBank;
        return { ...state, listBank: data };
      }
      case actionTypes.GetProofOfPayment: {
        const data = action.payload?.proofOfPaymentIMG;
        return { ...state, proofOfPaymentIMG: data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setCameraAction: (data: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch({ type: actionTypes.SetCamera, payload: { setCameraVal: data } });
    };
  },
  getReceivable: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet('order-confirmation').then((res) => {
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
          'sisa_bayar',
        ]);
        const dataSave: any = [];
        let no = 1;
        dataDecrypt.forEach((element: any) => {
          // eslint-disable-next-line
          element.key = no;
          dataSave.push(element);
          no += 1;
        });
        dispatch({ type: actionTypes.GetDataReceivable, payload: { feedback: dataSave } });
      });
    };
  },
  getDetailOCByN0OC: (no_oc: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`order-confirmation/by-no?no_order_konfirmasi=${no_oc}`).then((res) => {
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
          'sisa_bayar',
        ]);
        dispatch({
          type: actionTypes.ShowModalPayment,
          payload: { feedbackDetailOC: dataDecrypt },
        });
        dispatch(modal.actions.show());
      });
    };
  },
  getReceivableByNoOC: (no_oc: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`receivable/by-no-ok?no_order_konfirmasi=${no_oc}`).then((res) => {
        const dataDecrypt = doDecryptData(res.data, [
          '_id',
          'no_piutang',
          'tanggal',
          'no_order_konfirmasi',
          'tanggal_order_konfirmasi',
          'no_sales_order',
          'tanggal_sales_order',
          'kode_toko',
          'kode_cabang',
          'total_tagihan',
          'bayar_rp',
          'sisa_tagihan',
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
        dispatch(modal.actions.show());
        dispatch({
          type: actionTypes.GetDataReceivableDetail,
          payload: { feedbackDetail: dataSave },
        });
      });
    };
  },
  setSisa: (value: any) => {
    return async (
      dispatch: ThunkDispatch<{}, {}, AnyAction>,
      getState: () => any
    ): Promise<void> => {
      const state = getState();
      const totalHarga = state.receivable.feedbackDetailOC[0].sisa_bayar;
      const sisa = totalHarga - value;
      dispatch(change('FormPaymentReceivable', 'remaining_payment', sisa));
    };
  },
  getListBank: () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const res = [
        {
          value: 'BRI',
          label: 'BRI',
          code: '002',
        },
        {
          value: 'EKSPOR INDONESIA',
          label: 'EKSPOR INDONESIA',
          code: '003',
        },
        {
          value: 'MANDIRI',
          label: 'MANDIRI',
          code: '008',
        },
        {
          value: 'BNI',
          label: 'BNI',
          code: '009',
        },
        {
          value: 'BNI SYARIAH',
          label: 'BNI SYARIAH',
          code: '427',
        },
        {
          value: 'DANAMON',
          label: 'DANAMON',
          code: '011',
        },
        {
          value: 'PERMATA BANK',
          label: 'PERMATA BANK',
          code: '013',
        },
        {
          value: 'BCA',
          label: 'BCA',
          code: '014',
        },
        {
          value: 'BII',
          label: 'BII',
          code: '016',
        },
        {
          value: 'PANIN',
          label: 'PANIN',
          code: '019',
        },
        {
          value: 'ARTA NIAGA KENCANA',
          label: 'ARTA NIAGA KENCANA',
          code: '020',
        },
        {
          value: 'NIAGA',
          label: 'NIAGA',
          code: '022',
        },
        {
          value: 'BUANA IND',
          label: 'BUANA IND',
          code: '023',
        },
        {
          value: 'LIPPO',
          label: 'LIPPO',
          code: '026',
        },
        {
          value: 'NISP',
          label: 'NISP',
          code: '028',
        },
        {
          value: 'AMERICAN EXPRESS BANK LTD',
          label: 'AMERICAN EXPRESS BANK LTD',
          code: '030',
        },
        {
          value: 'CITIBANK N.A.',
          label: 'CITIBANK N.A.',
          code: '031',
        },
        {
          value: 'JP. MORGAN CHASE BANK, N.A.',
          label: 'JP. MORGAN CHASE BANK, N.A.',
          code: '032',
        },
        {
          value: 'OF AMERICA, N.A',
          label: 'OF AMERICA, N.A',
          code: '033',
        },
        {
          value: 'ING INDONESIA BANK',
          label: 'ING INDONESIA BANK',
          code: '034',
        },
        {
          value: 'MULTICOR TBK.',
          label: 'MULTICOR TBK.',
          code: '036',
        },
        {
          value: 'ARTHA GRAHA',
          label: 'ARTHA GRAHA',
          code: '037',
        },
        {
          value: 'CREDIT AGRICOLE INDOSUEZ',
          label: 'CREDIT AGRICOLE INDOSUEZ',
          code: '039',
        },
        {
          value: 'THE BANGKOK BANK COMP. LTD',
          label: 'THE BANGKOK BANK COMP. LTD',
          code: '040',
        },
        {
          value: 'THE HONGKONG & SHANGHAI B.C.',
          label: 'THE HONGKONG & SHANGHAI B.C.',
          code: '041',
        },
        {
          value: 'THE BANK OF TOKYO MITSUBISHI UFJ LTD',
          label: 'THE BANK OF TOKYO MITSUBISHI UFJ LTD',
          code: '042',
        },
        {
          value: 'SUMITOMO MITSUI INDONESIA',
          label: 'SUMITOMO MITSUI INDONESIA',
          code: '045',
        },
        {
          value: 'DBS INDONESIA',
          label: 'DBS INDONESIA',
          code: '046',
        },
        {
          value: 'RESONA PERDANIA',
          label: 'RESONA PERDANIA',
          code: '047',
        },
        {
          value: 'MIZUHO INDONESIA',
          label: 'MIZUHO INDONESIA',
          code: '048',
        },
        {
          value: 'STANDARD CHARTERED BANK',
          label: 'STANDARD CHARTERED BANK',
          code: '050',
        },
        {
          value: 'ABN AMRO',
          label: 'ABN AMRO',
          code: '052',
        },
        {
          value: 'KEPPEL TATLEE BUANA',
          label: 'KEPPEL TATLEE BUANA',
          code: '053',
        },
        {
          value: 'CAPITAL INDONESIA, TBK.',
          label: 'CAPITAL INDONESIA, TBK.',
          code: '054',
        },
        {
          value: 'BNP PARIBAS INDONESIA',
          label: 'BNP PARIBAS INDONESIA',
          code: '057',
        },
        {
          value: 'UOB INDONESIA',
          label: 'UOB INDONESIA',
          code: '058',
        },
        {
          value: 'KOREA EXCHANGE BANK DANAMON',
          label: 'KOREA EXCHANGE BANK DANAMON',
          code: '059',
        },
        {
          value: 'RABOBANK INTERNASIONAL INDONESIA',
          label: 'RABOBANK INTERNASIONAL INDONESIA',
          code: '060',
        },
        {
          value: 'ANZ PANIN BANK',
          label: 'ANZ PANIN BANK',
          code: '061',
        },
        {
          value: 'DEUTSCHE BANK AG.',
          label: 'DEUTSCHE BANK AG.',
          code: '067',
        },
        {
          value: 'WOORI INDONESIA',
          label: 'WOORI INDONESIA',
          code: '068',
        },
        {
          value: 'OF CHINA LIMITED',
          label: 'OF CHINA LIMITED',
          code: '069',
        },
        {
          value: 'BUMI ARTA',
          label: 'BUMI ARTA',
          code: '076',
        },
        {
          value: 'EKONOMI',
          label: 'EKONOMI',
          code: '087',
        },
        {
          value: 'ANTARDAERAH',
          label: 'ANTARDAERAH',
          code: '088',
        },
        {
          value: 'HAGA',
          label: 'HAGA',
          code: '089',
        },
        {
          value: 'IFI',
          label: 'IFI',
          code: '093',
        },
        {
          value: 'CENTURY, TBK.',
          label: 'CENTURY, TBK.',
          code: '095',
        },
        {
          value: 'MAYAPADA',
          label: 'MAYAPADA',
          code: '097',
        },
        {
          value: 'JABAR',
          label: 'JABAR',
          code: '110',
        },
        {
          value: 'DKI',
          label: 'DKI',
          code: '111',
        },
        {
          value: 'BPD DIY',
          label: 'BPD DIY',
          code: '112',
        },
        {
          value: 'JATENG',
          label: 'JATENG',
          code: '113',
        },
        {
          value: 'JATIM',
          label: 'JATIM',
          code: '114',
        },
        {
          value: 'BPD JAMBI',
          label: 'BPD JAMBI',
          code: '115',
        },
        {
          value: 'BPD ACEH',
          label: 'BPD ACEH',
          code: '116',
        },
        {
          value: 'SUMUT',
          label: 'SUMUT',
          code: '117',
        },
        {
          value: 'NAGARI',
          label: 'NAGARI',
          code: '118',
        },
        {
          value: 'RIAU',
          label: 'RIAU',
          code: '119',
        },
        {
          value: 'SUMSEL',
          label: 'SUMSEL',
          code: '120',
        },
        {
          value: 'LAMPUNG',
          label: 'LAMPUNG',
          code: '121',
        },
        {
          value: 'BPD KALSEL',
          label: 'BPD KALSEL',
          code: '122',
        },
        {
          value: 'BPD KALIMANTAN BARAT',
          label: 'BPD KALIMANTAN BARAT',
          code: '123',
        },
        {
          value: 'BPD KALTIM',
          label: 'BPD KALTIM',
          code: '124',
        },
        {
          value: 'BPD KALTENG',
          label: 'BPD KALTENG',
          code: '125',
        },
        {
          value: 'BPD SULSEL',
          label: 'BPD SULSEL',
          code: '126',
        },
        {
          value: 'SULUT',
          label: 'SULUT',
          code: '127',
        },
        {
          value: 'BPD NTB',
          label: 'BPD NTB',
          code: '128',
        },
        {
          value: 'BPD BALI',
          label: 'BPD BALI',
          code: '129',
        },
        {
          value: 'NTT',
          label: 'NTT',
          code: '130',
        },
        {
          value: 'MALUKU',
          label: 'MALUKU',
          code: '131',
        },
        {
          value: 'BPD PAPUA',
          label: 'BPD PAPUA',
          code: '132',
        },
        {
          value: 'BENGKULU',
          label: 'BENGKULU',
          code: '133',
        },
        {
          value: 'BPD SULAWESI TENGAH',
          label: 'BPD SULAWESI TENGAH',
          code: '134',
        },
        {
          value: 'SULTRA',
          label: 'SULTRA',
          code: '135',
        },
        {
          value: 'NUSANTARA PARAHYANGAN',
          label: 'NUSANTARA PARAHYANGAN',
          code: '145',
        },
        {
          value: 'SWADESI',
          label: 'SWADESI',
          code: '146',
        },
        {
          value: 'MUAMALAT',
          label: 'MUAMALAT',
          code: '147',
        },
        {
          value: 'MESTIKA',
          label: 'MESTIKA',
          code: '151',
        },
        {
          value: 'METRO EXPRESS',
          label: 'METRO EXPRESS',
          code: '152',
        },
        {
          value: 'SHINTA INDONESIA',
          label: 'SHINTA INDONESIA',
          code: '153',
        },
        {
          value: 'MASPION',
          label: 'MASPION',
          code: '157',
        },
        {
          value: 'HAGAKITA',
          label: 'HAGAKITA',
          code: '159',
        },
        {
          value: 'GANESHA',
          label: 'GANESHA',
          code: '161',
        },
        {
          value: 'WINDU KENTJANA',
          label: 'WINDU KENTJANA',
          code: '162',
        },
        {
          value: 'HALIM INDONESIA BANK',
          label: 'HALIM INDONESIA BANK',
          code: '164',
        },
        {
          value: 'HARMONI INTERNATIONAL',
          label: 'HARMONI INTERNATIONAL',
          code: '166',
        },
        {
          value: 'KESAWAN',
          label: 'KESAWAN',
          code: '167',
        },
        {
          value: 'TABUNGAN NEGARA (PERSERO)',
          label: 'TABUNGAN NEGARA (PERSERO)',
          code: '200',
        },
        {
          value: 'HIMPUNAN SAUDARA 1906, TBK .',
          label: 'HIMPUNAN SAUDARA 1906, TBK .',
          code: '212',
        },
        {
          value: 'TABUNGAN PENSIUNAN NASIONAL',
          label: 'TABUNGAN PENSIUNAN NASIONAL',
          code: '213',
        },
        {
          value: 'SWAGUNA',
          label: 'SWAGUNA',
          code: '405',
        },
        {
          value: 'JASA ARTA',
          label: 'JASA ARTA',
          code: '422',
        },
        {
          value: 'MEGA',
          label: 'MEGA',
          code: '426',
        },
        {
          value: 'JASA JAKARTA',
          label: 'JASA JAKARTA',
          code: '427',
        },
        {
          value: 'BUKOPIN',
          label: 'BUKOPIN',
          code: '441',
        },
        {
          value: 'SYARIAH MANDIRI',
          label: 'SYARIAH MANDIRI',
          code: '451',
        },
        {
          value: 'BISNIS INTERNASIONAL',
          label: 'BISNIS INTERNASIONAL',
          code: '459',
        },
        {
          value: 'SRI PARTHA',
          label: 'SRI PARTHA',
          code: '466',
        },
        {
          value: 'JASA JAKARTA',
          label: 'JASA JAKARTA',
          code: '472',
        },
        {
          value: 'BINTANG MANUNGGAL',
          label: 'BINTANG MANUNGGAL',
          code: '484',
        },
        {
          value: 'BUMIPUTERA',
          label: 'BUMIPUTERA',
          code: '485',
        },
        {
          value: 'YUDHA BHAKTI',
          label: 'YUDHA BHAKTI',
          code: '490',
        },
        {
          value: 'MITRANIAGA',
          label: 'MITRANIAGA',
          code: '491',
        },
        {
          value: 'AGRO NIAGA',
          label: 'AGRO NIAGA',
          code: '494',
        },
        {
          value: 'INDOMONEX',
          label: 'INDOMONEX',
          code: '498',
        },
        {
          value: 'ROYAL INDONESIA',
          label: 'ROYAL INDONESIA',
          code: '501',
        },
        {
          value: 'ALFINDO',
          label: 'ALFINDO',
          code: '503',
        },
        {
          value: 'SYARIAH MEGA',
          label: 'SYARIAH MEGA',
          code: '506',
        },
        {
          value: 'INA PERDANA',
          label: 'INA PERDANA',
          code: '513',
        },
        {
          value: 'HARFA',
          label: 'HARFA',
          code: '517',
        },
        {
          value: 'PRIMA MASTER BANK',
          label: 'PRIMA MASTER BANK',
          code: '520',
        },
        {
          value: 'PERSYARIKATAN INDONESIA',
          label: 'PERSYARIKATAN INDONESIA',
          code: '521',
        },
        {
          value: 'AKITA',
          label: 'AKITA',
          code: '525',
        },
        {
          value: 'LIMAN INTERNATIONAL BANK',
          label: 'LIMAN INTERNATIONAL BANK',
          code: '526',
        },
        {
          value: 'ANGLOMAS INTERNASIONAL BANK',
          label: 'ANGLOMAS INTERNASIONAL BANK',
          code: '531',
        },
        {
          value: 'DIPO INTERNATIONAL',
          label: 'DIPO INTERNATIONAL',
          code: '523',
        },
        {
          value: 'KESEJAHTERAAN EKONOMI',
          label: 'KESEJAHTERAAN EKONOMI',
          code: '535',
        },
        {
          value: 'UIB',
          label: 'UIB',
          code: '536',
        },
        {
          value: 'ARTOS IND',
          label: 'ARTOS IND',
          code: '542',
        },
        {
          value: 'PURBA DANARTA',
          label: 'PURBA DANARTA',
          code: '547',
        },
        {
          value: 'MULTI ARTA SENTOSA',
          label: 'MULTI ARTA SENTOSA',
          code: '548',
        },
        {
          value: 'MAYORA',
          label: 'MAYORA',
          code: '553',
        },
        {
          value: 'INDEX SELINDO',
          label: 'INDEX SELINDO',
          code: '555',
        },
        {
          value: 'VICTORIA INTERNATIONAL',
          label: 'VICTORIA INTERNATIONAL',
          code: '566',
        },
        {
          value: 'EKSEKUTIF',
          label: 'EKSEKUTIF',
          code: '558',
        },
        {
          value: 'CENTRATAMA NASIONAL BANK',
          label: 'CENTRATAMA NASIONAL BANK',
          code: '559',
        },
        {
          value: 'FAMA INTERNASIONAL',
          label: 'FAMA INTERNASIONAL',
          code: '562',
        },
        {
          value: 'SINAR HARAPAN BALI',
          label: 'SINAR HARAPAN BALI',
          code: '564',
        },
        {
          value: 'HARDA',
          label: 'HARDA',
          code: '567',
        },
        {
          value: 'FINCONESIA',
          label: 'FINCONESIA',
          code: '945',
        },
        {
          value: 'MERINCORP',
          label: 'MERINCORP',
          code: '946',
        },
        {
          value: 'MAYBANK INDOCORP',
          label: 'MAYBANK INDOCORP',
          code: '947',
        },
        {
          value: 'OCBC – INDONESIA',
          label: 'OCBC – INDONESIA',
          code: '948',
        },
        {
          value: 'CHINA TRUST INDONESIA',
          label: 'CHINA TRUST INDONESIA',
          code: '949',
        },
        {
          value: 'COMMONWEALTH',
          label: 'COMMONWEALTH',
          code: '950',
        },
        {
          value: 'BJB SYARIAH',
          label: 'BJB SYARIAH',
          code: '425',
        },
        {
          value: 'BPR KS (KARYAJATNIKA SEDAYA)',
          label: 'BPR KS (KARYAJATNIKA SEDAYA)',
          code: '688',
        },
        {
          value: 'INDOSAT DOMPETKU',
          label: 'INDOSAT DOMPETKU',
          code: '789',
        },
        {
          value: 'TELKOMSEL TCASH',
          label: 'TELKOMSEL TCASH',
          code: '911',
        },
        {
          value: 'LINKAJA',
          label: 'LINKAJA',
          code: '911',
        },
      ];
      dispatch({ type: actionTypes.GetListBank, payload: { listBank: res } });
    };
  },
  addPayment: (data: any) => {
    // eslint-disable-next-line
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const onSendData = {
        tanggal: moment(data.date).format('yyyy-MM-DD'),
        no_order_konfirmasi: data.no_order_confirmation,
        tipe_pembayaran: data.payment_type,
        bank: data.bank_name,
        no_rekening: data.account_number,
        // eslint-disable-next-line
        bayar_rp: parseInt(data.nominal),
        deskripsi: data.description,
      };
      postImage(
        data.foto,
        `${onSendData.no_order_konfirmasi.replace(/\//g, '_')}-${onSendData.tanggal}`
      )
        .then(() => {
          AxiosPost('receivable', onSendData)
            .then((res) => {
              // eslint-disable-next-line
              console.log(res);
              toast.success('Success Add Data !');
              window.location.reload();
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(error);
              toast.error('Failed To Add Data !');
            });
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err);
          toast.error('Failed To Add Photo !');
        });
    };
  },
  getBuktiBayar: (noPiutang: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`receivable/by-no/${noPiutang}`).then((response: any) => {
        const nama_file = `${response.data[0].no_order_konfirmasi.replace(/\//g, '_')}-${
          response.data[0].tanggal
        }`;
        getImage(nama_file)
          .then((res) => {
            dispatch({ type: actionTypes.GetProofOfPayment, payload: { proofOfPaymentIMG: res } });
            dispatch(modalSecond.actions.show());
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.log(err);
            toast.error(err.message || 'Not Found !');
          });
      });
    };
  },
  printReceiptPDF: (noPiutang: any) => {
    // eslint-disable-next-line
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      AxiosGet(`receivable/by-no/${noPiutang}`).then((response: any) => {
        const dataDecrypt = doDecryptData(response.data, [
          '_id',
          'no_piutang',
          'tanggal',
          'no_order_konfirmasi',
          'tanggal_order_konfirmasi',
          'no_sales_order',
          'tanggal_sales_order',
          'kode_toko',
          'kode_cabang',
          'total_tagihan',
          'bayar_rp',
          'sisa_tagihan',
          'status',
          'input_date',
        ]);
        AxiosGet(`store/by-kode/${dataDecrypt[0].kode_toko}`).then((res) => {
          const dataDecryptStore = doDecryptData(res.data, [
            'kode_toko',
            'status',
            '_id',
            'input_date',
            'kode_cabang',
          ]);
          KwitansiPDF(dataDecrypt, dataDecryptStore);
        });
      });
    };
  },
};
