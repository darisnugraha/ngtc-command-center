/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { KTSVG } from '../../../helpers';
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { AsideMenuItem } from './AsideMenuItem';

export default function AsideMenuMain() {
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen001.svg'
        title='Dashboard'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItemWithSub
        to='/master'
        title='Masterdata'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem to='/master/software' title='Master Software' hasBullet />
        <AsideMenuItem to='/master/hardware' title='Master Hardware' hasBullet />
        <AsideMenuItem to='/master/consumable' title='Master Consumable' hasBullet />
        <AsideMenuItem to='/master/unit' title='Master Unit' hasBullet />
        <AsideMenuItem to='/master/customer' title='Customer Master' hasBullet />
        <AsideMenuItem to='/master/staff' title='Master Staff' hasBullet />
        <AsideMenuItem to='/master/bank' title='Master Bank' hasBullet />
        <AsideMenuItem to='/master/supplier' title='Master Supplier' hasBullet />
        <AsideMenuItem to='/master/user' title='Master User' hasBullet />
        <AsideMenuItem to='/master/division' title='Master Division' hasBullet />
        <AsideMenuItem to='/master/bundle' title='Master Bundle' hasBullet />
        <AsideMenuItem to='/master/discount' title='Master Discount' hasBullet />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/potential-customer'
        icon='/media/icons/duotune/communication/com006.svg'
        title='Potential Customer'
        fontIcon='bi-app-indicator'
      />
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
      <AsideMenuItem
        to='/receivable'
        icon='/media/icons/duotune/finance/fin002.svg'
        title='Receivable'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItemWithSub
        to='/sales-order'
        title='Sales Order'
        icon='/media/icons/duotune/ecommerce/ecm002.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem to='/sales-order/list-sales-order' title='List Sales Order' hasBullet />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/implementation'
        icon='/media/icons/duotune/general/gen016.svg'
        title='Implementation'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/delivery-note'
        icon='/media/icons/duotune/ecommerce/ecm006.svg'
        title='Delivery Note'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItemWithSub
        to='/invoice'
        title='Invoice'
        icon='/media/icons/duotune/general/gen032.svg'
        fontIcon='bi-archive'
      >
        <AsideMenuItem to='/invoice/list-invoice' title='List Invoice' hasBullet />
        <AsideMenuItem to='/invoice/serial-number' title='Serial Number' hasBullet />
      </AsideMenuItemWithSub>
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
        <AsideMenuItem to='/report/report-receivable' title='Report Receivable' hasBullet />
        <AsideMenuItem to='/report/report-implementation' title='Report Implementation' hasBullet />
      </AsideMenuItemWithSub>
      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet />
          <AsideMenuItem to='/crafted/pages/profile/connections' title='Connections' hasBullet />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet>
          <AsideMenuItem to='/crafted/pages/wizards/horizontal' title='Horizontal' hasBullet />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4' />
        </div>
      </div>
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={`${process.env.REACT_APP_PREVIEW_DOCS_URL}/docs/changelog`}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  );
}
