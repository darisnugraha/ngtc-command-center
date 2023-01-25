import React, { FC } from 'react';

interface Props {}

const BaseCard: FC<Props> = ({ children }) => {
  return (
    <div className='card card-custom'>
      <div className='card-body'>{children}</div>
    </div>
  );
};

export default BaseCard;
