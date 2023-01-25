import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as reduxStore from '../../master/customer/redux/CustomerRedux';
import * as reduxStaff from '../../master/staff/redux/StaffRedux';
import FormAddCustomer from './component/FormAddCustomer';
import * as redux from './redux/AddOrderConfirmationCustomerRedux';

type Props = {
  nextStep?: any;
};

const AddOrderConfirmationCustomer: FC<Props> = ({ nextStep }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reduxStore.actions.getStore());
    dispatch(reduxStaff.actions.getStaff());
  }, [dispatch]);

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>
              Add Order Confirmation - Customer
            </span>
          </h3>
        </div>
      </div>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-body py-3'>
          <FormAddCustomer
            onSubmit={(data: any) => {
              // eslint-disable-next-line
              dispatch(redux.actions.addCustomer(data))
              nextStep();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AddOrderConfirmationCustomer;
