/* eslint-disable no-unused-vars */
import React from 'react';
import Select from 'react-select';

type Props = {
  data: any[];
  label: string;
  defaultRef?: any;
  readOnly: boolean;
  onChange?: (value: any) => any;
  onBlur?: (value: any) => any;
};

const DefaultSelect: React.FC<Props> = ({
  data,
  label,
  defaultRef,
  readOnly = false,
  onChange,
  onBlur,
}) => {
  return (
    <Select
      options={data}
      isSearchable
      id={label}
      openMenuOnFocus
      ref={defaultRef}
      isDisabled={readOnly}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
export default DefaultSelect;
