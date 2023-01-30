import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import * as auth from '../../app/pages/auth/redux/LoginRedux';
import * as modal from '../../app/modules/modal/GlobalModalRedux';
import * as modalSecond from '../../app/modules/modal/ModalSecondRedux';
import * as customer from '../../app/pages/master/customer/redux/CustomerRedux';
import * as software from '../../app/pages/master/software/redux/SoftwareRedux';
import * as hardware from '../../app/pages/master/hardware/redux/HardwareRedux';
import * as consumable from '../../app/pages/master/consumable/redux/ConsumableRedux';
import * as staff from '../../app/pages/master/staff/redux/StaffRedux';
import * as bank from '../../app/pages/master/bank/redux/BankRedux';
import * as supplier from '../../app/pages/master/supplier/redux/SupplierRedux';
import * as division from '../../app/pages/master/division/redux/DivisionRedux';
import * as user from '../../app/pages/master/user/redux/UserRedux';
import * as unit from '../../app/pages/master/unit/redux/UnitRedux';
import * as bundle from '../../app/pages/master/bundle/redux/BundleRedux';
import * as discount from '../../app/pages/master/discount/redux/DiscountRedux';
import * as potentialcustomer from '../../app/pages/potential-customer/redux/PotentialCustomerRedux';
import * as supportservice from '../../app/pages/service/support-service/redux/SupportServiceRedux';
import * as productionservice from '../../app/pages/service/production-service/redux/ProductionServiceRedux';
import * as listorderconfirmation from '../../app/pages/order-confirmation/list-order-confirmation/redux/ListOCRedux';
import * as addorderconfirmation from '../../app/pages/order-confirmation/add-order-confirmation/redux/AddOrderConfirmationRedux';
import * as addorderconfirmationcustomer from '../../app/pages/order-confirmation/add-order-confirmation/redux/AddOrderConfirmationCustomerRedux';
import * as addorderconfirmationservice from '../../app/pages/order-confirmation/add-order-confirmation/redux/AddOrderConfirmationServiceRedux';
import * as paymentorderconfirmation from '../../app/pages/order-confirmation/payment-order-confirmation/redux/PaymentOrderConfirmationRedux';
import * as receivable from '../../app/pages/receivable/redux/ReceivableRedux';
import * as listso from '../../app/pages/sales-order/list-sales-order/redux/ListSORedux';
import * as implementation from '../../app/pages/implementation/redux/ImplementationRedux';
import * as deliverynote from '../../app/pages/delivery-order/redux/DeliveryNoteRedux';
import * as listinvoice from '../../app/pages/invoice/list-invoice/redux/ListInvoiceRedux';
import * as reportreceivable from '../../app/pages/report/receivable-report/redux/ReceivableReportRedux';
import * as reportoc from '../../app/pages/report/oc-report/redux/OCReportRedux';
import * as reportimplementation from '../../app/pages/report/implementation-report/redux/ImplementationReportRedux';
import * as utility from './UtilityRedux';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  modal: modal.reducer,
  modalSecond: modalSecond.reducer,
  customer: customer.reducer,
  software: software.reducer,
  hardware: hardware.reducer,
  consumable: consumable.reducer,
  staff: staff.reducer,
  bank: bank.reducer,
  supplier: supplier.reducer,
  division: division.reducer,
  user: user.reducer,
  unit: unit.reducer,
  bundle: bundle.reducer,
  discount: discount.reducer,
  potentialcustomer: potentialcustomer.reducer,
  supportservice: supportservice.reducer,
  productionservice: productionservice.reducer,
  listorderconfirmation: listorderconfirmation.reducer,
  addorderconfirmation: addorderconfirmation.reducer,
  addorderconfirmationcustomer: addorderconfirmationcustomer.reducer,
  addorderconfirmationservice: addorderconfirmationservice.reducer,
  paymentorderconfirmation: paymentorderconfirmation.reducer,
  receivable: receivable.reducer,
  listso: listso.reducer,
  implementation: implementation.reducer,
  deliverynote: deliverynote.reducer,
  listinvoice: listinvoice.reducer,
  reportreceivable: reportreceivable.reducer,
  reportoc: reportoc.reducer,
  reportimplementation: reportimplementation.reducer,
  utility: utility.reducer,
  form: reducerForm,
});

export type RootState = ReturnType<typeof rootReducer>;
