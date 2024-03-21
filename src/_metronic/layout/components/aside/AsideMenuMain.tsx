/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { KTSVG } from '../../../helpers';
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { AsideMenuItem } from './AsideMenuItem';

export default function AsideMenuMain() {
  return (
    <>
      {/* <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen001.svg'
        title='Dashboard'
        fontIcon='bi-app-indicator'
      /> */}
      <AsideMenuItem
        to='/potential-customer'
        icon='/media/icons/duotune/communication/com006.svg'
        title='Potential Customer'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItemWithSub
        to='/master'
        title='Master Data'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem to='/master/unit' title='Master Unit' hasBullet />
        <AsideMenuItem to='/master/software' title='Master Software' hasBullet />
        <AsideMenuItem to='/master/hardware' title='Master Hardware' hasBullet />
        <AsideMenuItem to='/master/consumable' title='Master Consumable' hasBullet />
        <AsideMenuItem to='/master/bundle' title='Master Bundle' hasBullet />
        <AsideMenuItem to='/master/customer' title='Master Customer' hasBullet />
        <AsideMenuItem to='/master/staff' title='Master Staff' hasBullet />
        <AsideMenuItem to='/master/bank' title='Master Bank' hasBullet />
        <AsideMenuItem to='/master/supplier' title='Master Supplier' hasBullet />
        <AsideMenuItem to='/master/user' title='Master User' hasBullet />
        <AsideMenuItem to='/master/division' title='Master Division' hasBullet />
        <AsideMenuItem to='/master/discount' title='Master Discount' hasBullet />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/service'
        title='Service'
        icon='/media/icons/duotune/coding/cod009.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem to='/service/support' title='Support Service' hasBullet />
        <AsideMenuItem to='/service/production' title='Production Service' hasBullet />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/order-confirmation'
        title='Order Confirmation'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem
          to='/order-confirmation/add-order-confirmation'
          title='Add Order Confirmation'
          hasBullet
        />
        <AsideMenuItem
          to='/order-confirmation/list-order-confirmation'
          title='List Order Confirmation'
          hasBullet
        />
        <AsideMenuItem
          to='/order-confirmation/payment-order-confirmation'
          title='Payment Order Confirmation'
          hasBullet
        />
      </AsideMenuItemWithSub>
      {/* <AsideMenuItem
        to='/receivable'
        icon='/media/icons/duotune/finance/fin002.svg'
        title='Receivable'
        fontIcon='bi-app-indicator'
      /> */}
      <AsideMenuItem
        to='/validation-payment'
        icon='/media/icons/duotune/general/gen048.svg'
        title='Validation Payment'
        fontIcon='bi-app-indicator'
      />
      {/* <AsideMenuItemWithSub
        to='/sales-order'
        title='Sales Order'
        icon='/media/icons/duotune/ecommerce/ecm002.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem to='/sales-order/list-sales-order' title='List Sales Order' hasBullet />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItem
        to='/implementation'
        icon='/media/icons/duotune/general/gen016.svg'
        title='Implementation'
        fontIcon='bi-app-indicator'
      /> */}
      {/* <AsideMenuItem
        to='/delivery-order'
        icon='/media/icons/duotune/ecommerce/ecm006.svg'
        title='Delivery Order'
        fontIcon='bi-app-indicator'
      /> */}
      {/* <AsideMenuItemWithSub
        to='/invoice'
        title='Invoice'
        icon='/media/icons/duotune/general/gen032.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem to='/invoice/list-invoice' title='List Invoice' hasBullet />
        <AsideMenuItem to='/invoice/serial-number' title='Serial Number' hasBullet />
      </AsideMenuItemWithSub> */}
      <AsideMenuItemWithSub
        to='/report'
        title='Report'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem
          to='/report/report-order-confirmation'
          title='Report Order Confirmation'
          hasBullet
        />
        {/* <AsideMenuItem to='/report/report-receivable' title='Report Receivable' hasBullet />
        <AsideMenuItem to='/report/report-implementation' title='Report Implementation' hasBullet />
        <AsideMenuItem to='/report/report-delivery' title='Report Delivery Order' hasBullet /> */}
      </AsideMenuItemWithSub>
    </>
  );
}
