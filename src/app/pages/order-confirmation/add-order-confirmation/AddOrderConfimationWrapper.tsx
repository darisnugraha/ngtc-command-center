import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import AddOrderConfirmationCustomer from './AddOrderConfirmationCustomer';
import AddOrderConfirmationProduct from './AddOrderConfirmationProduct';
import * as reduxCustomer from './redux/AddOrderConfirmationCustomerRedux';

const mapState = (state: RootState) => ({ auth: state.modal });
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AddOrderConfirmation: FC<PropsFromRedux> = () => {
  const dispatch = useDispatch();

  const step = useSelector<RootState>(
    ({ addorderconfirmationcustomer }) => addorderconfirmationcustomer.step
  );

  useEffect(() => {
    dispatch(reduxCustomer.actions.getCustomerLocal());
  }, [dispatch]);

  const dataCustomer = useSelector<RootState>(
    ({ addorderconfirmationcustomer }) => addorderconfirmationcustomer.feedback
  );

  switch (step) {
    case 1:
      return (
        <>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bolder fs-3 mb-1'>Add Order Confirmation</span>
              </h3>
            </div>
          </div>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-body py-3'>
              {dataCustomer !== undefined ? (
                <AddOrderConfirmationProduct />
              ) : (
                <AddOrderConfirmationCustomer />
              )}
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bolder fs-3 mb-1'>Add Order Confirmation</span>
              </h3>
            </div>
          </div>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-body py-3'>
              <AddOrderConfirmationProduct />
            </div>
          </div>
        </>
      );

    default:
      return (
        <>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bolder fs-3 mb-1'>Add Order Confirmation</span>
              </h3>
            </div>
          </div>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-body py-3'>
              {dataCustomer !== undefined ? (
                <AddOrderConfirmationProduct />
              ) : (
                <AddOrderConfirmationCustomer />
              )}
            </div>
          </div>
        </>
      );
  }
};

export default connector(AddOrderConfirmation);
