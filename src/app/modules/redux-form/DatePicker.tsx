/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import clsx from 'clsx';
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';

export const SelectDateRange: FC = (field: any) => {
  const bool = true;

  return (
    <div className='row mb-6'>
      <label htmlFor='' className='text-black mb-3'>
        {field.label}
      </label>
      <div className='col-lg-12 fv-row customDatePickerWidth'>
        <DatePicker
          id={field.id}
          maxDate={field.maxDate}
          todayButton='Hari Ini'
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          selectsRange={bool}
          startDate={field.startDate}
          endDate={field.endDate}
          dropdownMode='select'
          placeholderText={field.placeHolder}
          dateFormat='dd/MM/yyyy'
          autoComplete='off'
          minDate={field.minDate}
          {...field.input}
          onKeyDown={(event) => {
            event.preventDefault();
            return false;
          }}
          disabledKeyboardNavigation={bool}
          className={clsx(
            'form-control form-control-sm',
            { 'is-invalid': field.meta.touched && field.meta.error },
            {
              'is-valid': field.meta.touched && !field.meta.error,
            }
          )}
          readOnly={field.readOnly}
          placeholder={field.placeholder}
          customInput={field.customInput}
        />
        {field.meta.touched &&
          ((field.meta.error && (
            <ul className='parsley-errors-list filled'>
              <li className='parsley-required'> {field.meta.error}.</li>
            </ul>
          )) ||
            (field.meta.warning && <p>{field.meta.warning}</p>))}
      </div>
    </div>
  );
};

export const SelectDate: FC = (field: any) => {
  const bool = true;

  return (
    <div className='row mb-6'>
      <label htmlFor='' className='text-black mb-3'>
        {field.label}
      </label>
      <div className='col-lg-12 fv-row customDatePickerWidth'>
        <DatePicker
          id={field.id}
          maxDate={field.maxDate}
          todayButton='Hari Ini'
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          placeholderText={field.placeHolder}
          dateFormat='dd/MM/yyyy'
          autoComplete='off'
          minDate={field.minDate}
          {...field.input}
          onKeyDown={(event) => {
            event.preventDefault();
            return false;
          }}
          selected={field.startDate}
          disabledKeyboardNavigation={bool}
          className={clsx(
            'form-control form-control-sm',
            { 'is-invalid': field.meta.touched && field.meta.error },
            {
              'is-valid': field.meta.touched && !field.meta.error,
            }
          )}
          readOnly={field.readOnly}
          placeholder={field.placeholder}
          customInput={field.customInput}
        />
        {field.meta.touched &&
          ((field.meta.error && (
            <ul className='parsley-errors-list filled'>
              <li className='parsley-required'> {field.meta.error}.</li>
            </ul>
          )) ||
            (field.meta.warning && <p>{field.meta.warning}</p>))}
      </div>
    </div>
  );
};
