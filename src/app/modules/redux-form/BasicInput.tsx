/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import clsx from 'clsx';
import React, { FC } from 'react';

export const RenderField: FC = (field: any) => {
  return (
    <div className='row mb-6'>
      <label htmlFor='' className='text-black mb-3'>
        {field.label}
      </label>
      <div className='col-lg-12 fv-row'>
        <input
          {...field.input}
          type={field.type}
          id={field.label}
          className={
            field.isEdit
              ? clsx(
                  'form-control form-control-sm form-control-solid',
                  { 'is-invalid': field.meta.touched && field.meta.error },
                  {
                    'is-valid': field.meta.touched && !field.meta.error,
                  }
                )
              : clsx(
                  'form-control form-control-sm',
                  { 'is-invalid': field.meta.touched && field.meta.error },
                  {
                    'is-valid': field.meta.touched && !field.meta.error,
                  }
                )
          }
          readOnly={field.readOnly}
          placeholder={field.placeHolder}
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
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

export const RenderTextArea = (field: any) => (
  <div className='row mb-6'>
    <label htmlFor='' className='text-black mb-3'>
      {field.label}
    </label>
    <div className='col-lg-12 fv-row'>
      <textarea
        {...field.input}
        type={field.type}
        id={field.label}
        className={clsx(
          'form-control ',
          { 'is-invalid': field.meta.touched && field.meta.error },
          {
            'is-valid': field.meta.touched && !field.meta.error,
          }
        )}
        placeholder={field.placeholder}
        rows={4}
        readOnly={field.readOnly}
        onKeyPress={(e) => {
          const keyCode = e.which || e.keyCode;
          if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
          }
        }}
        defaultValue={field.defaultValue}
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
