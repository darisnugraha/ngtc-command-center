import React from 'react';
import { Modal } from 'react-bootstrap-v5';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import { KTSVG } from '../../../../../_metronic/helpers';
import * as redux from '../redux/BundleRedux';
import DefaultTable from '../../../../modules/custom-table';
import FormAddProduct from './FormAddProduct';
import { RootState } from '../../../../../setup';

interface Props {}

const TableBundleComponent: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const columns: ColumnDescription[] = [
    {
      dataField: 'product_name',
      text: 'Product Name',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'product_type',
      text: 'Product Type',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'unit',
      text: 'Unit',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>{cell}</p>;
      },
    },
    {
      dataField: 'price',
      text: 'Price',
      align: 'center',
      formatter: (cell) => {
        return <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {cell?.toLocaleString()}</p>;
      },
    },
    {
      dataField: '',
      text: 'Action',
      align: 'center',
      headerClasses: 'ps-4 min-w-100px rounded-end',
      formatter: (cell, row) => {
        return (
          <>
            <button
              type='button'
              onClick={() => {
                // eslint-disable-next-line
                dispatch(redux.actions.getBundleByID(row._id));
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 d-none'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            <button
              type='button'
              onClick={() => {
                dispatch(
                  // eslint-disable-next-line
                  redux.actions.deleteDetailProduct(row._id !== undefined ? row._id : row.id)
                );
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
          </>
        );
      },
    },
  ];

  const dataTab: any = useSelector<RootState>(({ bundle }) => bundle.feedbackProductDetailLocal);
  const isShowing: any = useSelector<RootState>(({ bundle }) => bundle.isShowing);
  const onClose = () => {
    dispatch(redux.actions.closeModalProduct());
  };
  const handleClickBundle = () => {
    dispatch(redux.actions.showModalProduct());
  };
  return (
    <>
      <Modal
        className='modal fade'
        id='kt_modal_select_location'
        data-backdrop='static'
        tabIndex={-1}
        role='dialog'
        show={isShowing}
        dialogClassName='modal-l'
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Add Product</h5>
            <button
              type='button'
              onClick={() => onClose()}
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
            </button>
          </div>
          <div className='modal-body'>
            <FormAddProduct />
          </div>
        </div>
      </Modal>
      <div className='row'>
        <div className='col-lg-12'>
          <div style={{ float: 'right' }}>
            <button
              type='button'
              className='btn btn-sm btn-light-primary'
              onClick={() => handleClickBundle()}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add Product
            </button>
          </div>
        </div>
        <div className='col-lg-12'>
          <DefaultTable className='mb-5 mb-xl-8' data={dataTab} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default TableBundleComponent;
