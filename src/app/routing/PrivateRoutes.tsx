import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FallbackView } from '../../_metronic/partials';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';

export const PrivateRoutes = () => {
  const CustomerPage = lazy(() => import('../pages/master/customer/CustomerPage'));
  const SoftwarePage = lazy(() => import('../pages/master/software/SoftwarePage'));
  const HardwarePage = lazy(() => import('../pages/master/hardware/HardwarePage'));
  const ConsumablePage = lazy(() => import('../pages/master/consumable/ConsumablePage'));
  const StaffPage = lazy(() => import('../pages/master/staff/StaffPage'));
  const BankPage = lazy(() => import('../pages/master/bank/BankPage'));
  const SupplierPage = lazy(() => import('../pages/master/supplier/SupplierPage'));
  const DivisionPage = lazy(() => import('../pages/master/division/DivisionPage'));
  const UserPage = lazy(() => import('../pages/master/user/UserPage'));
  const UnitPage = lazy(() => import('../pages/master/unit/UnitPage'));
  const BundlePage = lazy(() => import('../pages/master/bundle/BundlePage'));
  const DiscountPage = lazy(() => import('../pages/master/discount/DiscountPage'));
  const PotentialCustomerPage = lazy(
    () => import('../pages/potential-customer/PotentialCustomerPage')
  );
  const SupportServicePage = lazy(
    () => import('../pages/service/support-service/SupportServicePage')
  );
  const ProductionServicePage = lazy(
    () => import('../pages/service/production-service/ProductionServicePage')
  );
  const ListOrderConfirmationPage = lazy(
    () => import('../pages/order-confirmation/list-order-confirmation/ListOrderConfirmationPage')
  );
  const AddOrderConfirmationPage = lazy(
    () => import('../pages/order-confirmation/add-order-confirmation/AddOrderConfimationWrapper')
  );
  const PaymentOrderConfirmationPage = lazy(
    () =>
      import('../pages/order-confirmation/payment-order-confirmation/PaymentOrderConfirmationPage')
  );
  const ReceivablePage = lazy(() => import('../pages/receivable/ReceivablePage'));
  const ListSalesOrderPage = lazy(
    () => import('../pages/sales-order/list-sales-order/ListSalesOrderPage')
  );
  const ImplementationPage = lazy(() => import('../pages/implementation/ImplementationPage'));
  const DeliveryNotePage = lazy(() => import('../pages/delivery-order/DeliveryNotePage'));
  const ListInvoicePage = lazy(() => import('../pages/invoice/list-invoice/ListInvoicePage'));
  const SerialNumberPage = lazy(() => import('../pages/serial-number/SerialNumberPage'));
  // Report
  const ReceivableReportPage = lazy(
    () => import('../pages/report/receivable-report/ReceivableReport')
  );
  const OCReportPage = lazy(() => import('../pages/report/oc-report/OCReport'));
  const ImplementationReportPage = lazy(
    () => import('../pages/report/implementation-report/ImplementationReport')
  );

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/master/customer' component={CustomerPage} />
        <Route path='/master/software' component={SoftwarePage} />
        <Route path='/master/hardware' component={HardwarePage} />
        <Route path='/master/consumable' component={ConsumablePage} />
        <Route path='/master/staff' component={StaffPage} />
        <Route path='/master/bank' component={BankPage} />
        <Route path='/master/supplier' component={SupplierPage} />
        <Route path='/master/division' component={DivisionPage} />
        <Route path='/master/user' component={UserPage} />
        <Route path='/master/unit' component={UnitPage} />
        <Route path='/master/bundle' component={BundlePage} />
        <Route path='/master/discount' component={DiscountPage} />
        <Route path='/potential-customer' component={PotentialCustomerPage} />
        <Route path='/service/support' component={SupportServicePage} />
        <Route path='/service/production' component={ProductionServicePage} />
        <Route
          path='/order-confirmation/list-order-confirmation'
          component={ListOrderConfirmationPage}
        />
        <Route
          path='/order-confirmation/add-order-confirmation'
          component={AddOrderConfirmationPage}
        />
        <Route
          path='/order-confirmation/payment-order-confirmation'
          component={PaymentOrderConfirmationPage}
        />
        <Route path='/receivable' component={ReceivablePage} />
        <Route path='/sales-order/list-sales-order' component={ListSalesOrderPage} />
        <Route path='/implementation' component={ImplementationPage} />
        <Route path='/delivery-order' component={DeliveryNotePage} />
        <Route path='/invoice/list-invoice' component={ListInvoicePage} />
        <Route path='/invoice/serial-number' component={SerialNumberPage} />
        {/* report */}
        <Route path='/report/report-receivable' component={ReceivableReportPage} />
        <Route path='/report/report-order-confirmation' component={OCReportPage} />
        <Route path='/report/report-implementation' component={ImplementationReportPage} />
        {/* end report */}
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  );
};
