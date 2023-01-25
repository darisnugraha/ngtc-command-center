import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../setup';
import { KTSVG } from '../../../_metronic/helpers';

type Props = {
  handleClick?: any;
  title: string;
  imagePath: string;
  size?: 'lg' | 'sm' | 'xs';
  color?: 'primary' | 'warning' | 'danger' | 'info';
  disable?: boolean;
};

const SubmitButton: React.FC<Props> = ({
  handleClick,
  title,
  imagePath,
  size = 'sm',
  color = 'primary',
  disable,
}) => {
  const isLoading = useSelector<RootState, boolean>(({ utility }) => utility.isLoadingButton);
  return (
    <button
      type='submit'
      className={`btn btn-${size} btn-${color}`}
      onClick={handleClick}
      disabled={isLoading || disable}
    >
      <KTSVG path={imagePath} className='svg-icon-2' />
      {isLoading ? (
        <span
          className='spinner-border spinner-border-sm'
          style={{ marginRight: '10px' }}
          role='status'
          aria-hidden='true'
        />
      ) : null}
      {title}
    </button>
  );
};
export default SubmitButton;
