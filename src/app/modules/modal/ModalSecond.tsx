import React, { FC } from 'react';
import { Modal } from 'react-bootstrap-v5';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../setup';
import { KTSVG } from '../../../_metronic/helpers';
import * as modalSecondRedux from './ModalSecondRedux';

export interface Props {
  title: string;
  onClose: () => void;
  typeModal?: string;
}

const ModalSecond: FC<Props> = ({ children, title, typeModal, onClose }) => {
  const isShowing = useSelector<RootState>(
    ({ modalSecond }) => modalSecond.isShowing,
    shallowEqual
  );
  const dispatch = useDispatch();
  return (
    <Modal
      className='modal fade'
      id='kt_modal_select_location'
      data-backdrop='static'
      tabIndex={-1}
      role='dialog'
      show={isShowing}
      onHide={() => dispatch(modalSecondRedux.actions.hide())}
      dialogClassName={
        title.includes('Bundle') ||
        title.includes('Potential Customer') ||
        title.includes('Receivable') ||
        typeModal === 'DETAIL'
          ? 'modal-xl'
          : 'modal-lg'
      }
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>{title}</h5>
          <button
            type='button'
            onClick={() => onClose()}
            className='btn btn-icon btn-sm btn-active-light-primary ms-2'
          >
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
          </button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </Modal>
  );
};

export default ModalSecond;
