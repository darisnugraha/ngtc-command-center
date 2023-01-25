import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import FormAddDiscount from './component/FormAddDiscount';
import FormAddProduct from './component/FormAddProductOC';
import TableListDiscount from './component/TableListDiscount';
import TableListProduct from './component/TableListProduct';
import * as reduxDiscount from '../../master/discount/redux/DiscountRedux';
import * as redux from './redux/AddOrderConfirmationRedux';
import * as reduxService from './redux/AddOrderConfirmationServiceRedux';
import { KTSVG } from '../../../../_metronic/helpers';
import FormAddSupportServiceOC from './component/FormAddSupportServiceOC';
import FormAddProductionServiceOC from './component/FormAddProductionServiceOC';
import TableSupportService from './component/TableSupportService';
import TableProductionService from './component/TableProductionService';
import GlobalModal from '../../../modules/modal/GlobalModal';
import FormAddDeskripsi from './component/FormAddDeskripsi';
import * as modal from '../../../modules/modal/GlobalModalRedux';

interface Props {
  prevStep: any;
}

const AddOrderConfirmationProduct: FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reduxDiscount.actions.getDiscount());
    dispatch(redux.actions.getDataProductLocal());
    dispatch(redux.actions.getDataDiscountLocal());
    dispatch(reduxService.actions.getSupportService());
    dispatch(reduxService.actions.getProductionService());
    dispatch(reduxService.actions.getSupportLocal());
    dispatch(reduxService.actions.getProductionLocal());
  }, [dispatch]);

  const isPackage = useSelector<RootState>(
    ({ addorderconfirmation }) => addorderconfirmation.isPackage
  );

  const handleClose = () => {
    dispatch(modal.actions.hide());
  };

  return (
    <>
      <GlobalModal title='Description' onClose={() => handleClose()}>
        <FormAddDeskripsi
          onSubmit={(data: any) => {
            dispatch(redux.actions.submitPostDataOC(data));
          }}
        />
      </GlobalModal>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Add Order Confirmation - Product</span>
          </h3>
        </div>
      </div>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-body py-3'>
          <div className='row'>
            <div className='col-lg-12'>
              <FormAddProduct
                onSubmit={(data: any) => {
                  dispatch(redux.actions.addDataProduct(data, data.oc_type));
                }}
              />
            </div>
            <div className='col-lg-12'>
              <hr />
              <h3>Add Discount</h3>
            </div>
            <div className='col-lg-12'>
              <FormAddDiscount
                onSubmit={(data: any) => {
                  // eslint-disable-next-line
                  dispatch(redux.actions.addDataDiscount(data));
                }}
              />
            </div>
            <div className='col-lg-12'>
              <hr />
              <h3>Add Support Service</h3>
            </div>
            <div className='col-lg-12'>
              <FormAddSupportServiceOC
                onSubmit={(data: any) => {
                  // eslint-disable-next-line
                  dispatch(reduxService.actions.addSupport(data));
                }}
              />
            </div>
            <div className='col-lg-12'>
              <hr />
              <h3>Add Production Service</h3>
            </div>
            <div className='col-lg-12'>
              <FormAddProductionServiceOC
                onSubmit={(data: any) => {
                  // eslint-disable-next-line
                  dispatch(reduxService.actions.addProduction(data));
                }}
              />
            </div>
            <div className='col-lg-12'>
              <hr />
              <h3>List Product</h3>
            </div>
            <div className='col-lg-12'>
              <TableListProduct />
            </div>
            <div className={isPackage === 'true' ? 'col-lg-12' : 'd-none'}>
              <div className='row justify-content-end mt-5'>
                <div className='col-lg-3 d-grid'>
                  <button
                    type='button'
                    onClick={() => {
                      // eslint-disable-next-line
                      dispatch(redux.actions.deleteProductPackage());
                    }}
                    className='btn btn-light-danger btn-sm'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-12'>
              <TableListDiscount />
            </div>
            <div className='col-lg-12'>
              <hr />
              <h3>List Service</h3>
            </div>
            <div className='col-lg-12'>
              <TableSupportService />
            </div>
            <div className='col-lg-12'>
              <TableProductionService />
            </div>
            <div className='col-lg-12'>
              <div className='row justify-content-end mt-5'>
                <div className='col-lg-3 d-grid'>
                  <button
                    type='button'
                    onClick={() => {
                      // eslint-disable-next-line
                      dispatch(redux.actions.cancelOC());
                    }}
                    className='btn btn-sm btn-danger'
                  >
                    Cancel
                  </button>
                </div>
                <div className='col-lg-3 d-grid'>
                  <button
                    type='button'
                    onClick={() => {
                      // eslint-disable-next-line
                      dispatch(redux.actions.postAddOC());
                    }}
                    className='btn btn-sm btn-primary'
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOrderConfirmationProduct;
