import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Image } from 'react-bootstrap-v5';
import { RootState } from '../../../../setup';
import { KTSVG } from '../../../../_metronic/helpers';
import * as redux from '../redux/DeliveryNoteRedux';
import ModalSecond from '../../../modules/modal/ModalSecond';
import * as modalsecond from '../../../modules/modal/ModalSecondRedux';

interface Props {}

const TableDetailDelivery: React.FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const dataTab: any = useSelector<RootState>(({ deliverynote }) => deliverynote.feedbackNo);

  const columns: ColumnDescription[] = [
    {
      dataField: 'no_resi',
      text: 'Receipt Number',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'nama_ekspedisi',
      text: 'Expedition Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tanggal_kirim',
      text: 'Date Send',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tanggal_terima',
      text: 'Date Accept',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tanggal_batal',
      text: 'Date Canceled',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'tanggal_hilang',
      text: 'Date Lost',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: '',
      text: 'Receipt',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: (cell, row) => {
        return (
          <button
            type='button'
            onClick={() => {
              dispatch(redux.actions.getResi(row.no_resi));
            }}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-3' />
          </button>
        );
      },
    },
  ];

  const handleCloseModal = () => {
    dispatch(modalsecond.actions.hide());
  };

  const img: any = useSelector<RootState>(({ deliverynote }) => deliverynote.ResiIMG);

  return (
    <>
      <ModalSecond title='Receipt' onClose={() => handleCloseModal()}>
        <Image src={img} fluid />
      </ModalSecond>
      <BootstrapTable
        keyField='_id'
        columns={columns}
        data={dataTab}
        wrapperClasses='table-responsive'
        classes='table align-middle gs-0 gy-2'
        headerClasses='fw-bolder text-center'
        noDataIndication={() => {
          return (
            <div className='row'>
              <div className='col-lg-12' style={{ textAlign: 'center' }}>
                No Data
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default TableDetailDelivery;
