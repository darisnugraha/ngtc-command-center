/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { KTSVG } from '../../../helpers';
import { Dropdown1 } from '../../content/dropdown/Dropdown1';
import { getCSS, getCSSVariableValue } from '../../../assets/ts/_utils';

export interface IChartData {
  fillColor: string[];
  strokeColor: string[];
  type: 'bar' | 'area';
  data: ApexAxisChartSeries;
  label: string[];
  hoverDetail: (value: number, opts: any) => string;
}

type Props = {
  className: string;
  title: string;
  subtitle: string;
  yearlyCallback: () => void;
  monthlyCallback: () => void;
  weeklyCallback: () => void;
  data: IChartData;
};

const ChartsWidget1: React.FC<Props> = ({
  className,
  title,
  subtitle,
  data,
  yearlyCallback,
  monthlyCallback,
  weeklyCallback,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, 'height'));

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, data));
    if (chart) {
      chart.render();
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{title}</span>

          <span className='text-muted fw-bold fs-7'>{subtitle}</span>
        </h3>
        {/* end::Title */}

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <button
            onClick={yearlyCallback}
            className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
            id='kt_charts_widget_2_year_btn'
          >
            Year
          </button>

          <button
            onClick={monthlyCallback}
            className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1'
            id='kt_charts_widget_2_month_btn'
          >
            Month
          </button>

          <button
            onClick={weeklyCallback}
            className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'
            id='kt_charts_widget_2_week_btn'
          >
            Week
          </button>
        </div>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown1 />
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_1_chart' style={{ height: '350px' }} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ChartsWidget1 };

function getChartOptions(height: number, data: IChartData): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-primary');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');
  const lightColor = getCSSVariableValue('--bs-light-info');
  return {
    series: data.data,
    chart: {
      fontFamily: 'inherit',
      type: data.type,
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: 'smooth',
      show: data.type === 'area' ? true : false,
      width: 2,
      colors: data.strokeColor,
    },
    xaxis: {
      categories: data.label,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: data.hoverDetail,
      },
    },
    colors: data.fillColor,
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}
