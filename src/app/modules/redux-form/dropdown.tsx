/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
// import clsx from 'clsx';
import React, { FC } from 'react';
import Select from 'react-select';

export const RenderFieldSelect: FC = (field: any) => {
  return (
    <div className='row mb-6'>
      <label htmlFor='' className='text-black mb-3'>
        {field.label}
      </label>
      <div className='col-lg-12 fv-row'>
        <Select
          options={field.options}
          isSearchable
          id={field.label}
          openMenuOnFocus
          ref={field.defaultRef}
          placeholder={field.placeHolder}
          //   tabIndex={1}
          isDisabled={field.readOnly}
          onChange={(value) => field.input.onChange(value)}
          onBlur={() => field.input.onBlur(field.input.value?.value)}
          defaultValue={field.defaultValue}
          // className={
          //   field.isEdit
          //     ? clsx(
          //         'form-control ',
          //         { 'is-invalid': field.meta.touched && field.meta.error },
          //         {
          //           'is-valid': field.meta.touched && !field.meta.error,
          //         }
          //       )
          //     : clsx(
          //         'form-control ',
          //         { 'is-invalid': field.meta.touched && field.meta.error },
          //         {
          //           'is-valid': field.meta.touched && !field.meta.error,
          //         }
          //       )
          // }
        />
        {field.meta.touched &&
          ((field.meta.error && (
            <div className='fv-plugins-message-container mt-1'>
              <div className='fv-help-block text-danger'>{field.meta.error}</div>
            </div>
          )) ||
            (field.meta.warning && <p>{field.meta.warning}</p>))}
      </div>
    </div>
  );
};
