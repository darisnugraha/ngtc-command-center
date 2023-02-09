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
import * as reduxCustomer from './redux/AddOrderConfirmationCustomerRedux';
import { KTSVG } from '../../../../_metronic/helpers';
import FormAddSupportServiceOC from './component/FormAddSupportServiceOC';
import FormAddProductionServiceOC from './component/FormAddProductionServiceOC';
import TableSupportService from './component/TableSupportService';
import TableProductionService from './component/TableProductionService';
import GlobalModal from '../../../modules/modal/GlobalModal';
import FormAddDeskripsi from './component/FormAddDeskripsi';
import * as modal from '../../../modules/modal/GlobalModalRedux';
import * as modalsecond from '../../../modules/modal/ModalSecondRedux';
import ModalSecond from '../../../modules/modal/ModalSecond';
import FormEditProduct from './component/FormEditProduct';

interface Props {}

const AddOrderConfirmationProduct: FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redux.actions.getTypeOC());
    dispatch(reduxDiscount.actions.getDiscount());
    dispatch(redux.actions.getDataProductLocal());
    dispatch(redux.actions.getDataDiscountLocal());
    dispatch(reduxService.actions.getSupportService());
    dispatch(reduxService.actions.getProductionService());
    dispatch(reduxService.actions.getSupportLocal());
    dispatch(reduxService.actions.getProductionLocal());
    dispatch(reduxCustomer.actions.getCustomerLocal());
  }, [dispatch]);

  const isPackage = useSelector<RootState>(
    ({ addorderconfirmation }) => addorderconfirmation.isPackage
  );

  const handleClose = () => {
    dispatch(modal.actions.hide());
  };

  const handleCloseEdit = () => {
    dispatch(modalsecond.actions.hide());
  };

  const isLoading = useSelector<RootState, boolean>(({ utility }) => utility.isLoadingButton);
  const typeOC = useSelector<RootState>(({ addorderconfirmation }) => addorderconfirmation.typeOC);

  return (
    <>
      <GlobalModal title='Description' onClose={() => handleClose()}>
        <FormAddDeskripsi
          onSubmit={(data: any) => {
            dispatch(redux.actions.submitPostDataOC(data));
          }}
        />
      </GlobalModal>
      <ModalSecond title='Edit Product' onClose={() => handleCloseEdit()}>
        <FormEditProduct
          onSubmit={(data: any) => {
            dispatch(redux.actions.saveEditProduct(data));
          }}
        />
      </ModalSecond>
      <div className='accordion' id='kt_accordion_1'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_product'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_product_body_1'
              aria-expanded='false'
              aria-controls='kt_accordion_1_product_body_1'
            >
              Add Order Confirmation - Product
            </button>
          </h2>
          <div
            id='kt_accordion_1_product_body_1'
            className='accordion-collapse collapse show'
            aria-labelledby='kt_accordion_1_product'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <FormAddProduct
                onSubmit={(data: any) => {
                  dispatch(redux.actions.addDataProduct(data, data.oc_type));
                }}
              />
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_discount'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_discount'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_discount'
            >
              Add Discount
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_discount'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_discount'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <FormAddDiscount
                onSubmit={(data: any) => {
                  dispatch(redux.actions.addDataDiscount(data));
                }}
              />
            </div>
          </div>
        </div>
        <div className={typeOC === 'SUPPORT SERVICE' ? 'accordion-item' : 'accordion-item d-none'}>
          <h2 className='accordion-header' id='kt_accordion_1_support'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_support'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_support'
            >
              Add Support Service
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_support'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_support'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <FormAddSupportServiceOC
                onSubmit={(data: any) => {
                  // eslint-disable-next-line
                  dispatch(reduxService.actions.addSupport(data));
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={typeOC === 'PRODUCTION SERVICE' ? 'accordion-item' : 'accordion-item d-none'}
        >
          <h2 className='accordion-header' id='kt_accordion_1_support'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_production'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_production'
            >
              Add Production Service
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_production'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_support'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <FormAddProductionServiceOC
                onSubmit={(data: any) => {
                  // eslint-disable-next-line
                  dispatch(reduxService.actions.addProduction(data));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          typeOC === 'SUPPORT SERVICE' || typeOC === 'PRODUCTION SERVICE'
            ? 'd-none'
            : 'card mb-5 mb-xl-8 mt-10'
        }
      >
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>List Product</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='row'>
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
          </div>
        </div>
      </div>
      <div className='card mb-5 mb-xl-8 mt-10'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>List Service</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='row'>
            <div className={typeOC === 'SUPPORT SERVICE' ? 'col-lg-12' : 'd-none'}>
              <TableSupportService />
            </div>
            <div className={typeOC === 'PRODUCTION SERVICE' ? 'col-lg-12' : 'd-none'}>
              <TableProductionService />
            </div>
            <div
              className={
                typeOC === 'SUPPORT SERVICE' || typeOC === 'PRODUCTION SERVICE'
                  ? 'col-lg-12'
                  : 'd-none'
              }
            >
              <TableListDiscount />
            </div>
            <div className='col-lg-12'>
              <div className='row justify-content-end mt-5'>
                <div className='col-lg-3 d-grid'>
                  <button
                    type='button'
                    onClick={() => {
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
                      dispatch(redux.actions.postAddOC());
                    }}
                    className='btn btn-sm btn-primary'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span
                        className='spinner-border spinner-border-sm'
                        style={{ marginRight: '10px' }}
                        role='status'
                        aria-hidden='true'
                      />
                    ) : null}
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
