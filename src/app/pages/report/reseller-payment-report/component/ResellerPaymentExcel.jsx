import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getLocal } from '../../../../../setup/encrypt';

class DeliveryReportExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headLaporan: {},
    };
  }

  componentDidMount() {
    getLocal('headDataReport').then((res) => {
      this.setState({
        headLaporan: res,
      });
    });
  }

  render() {
    return (
      <>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-success btn-block'
          table='table-to-xls'
          filename='Reseller Payment'
          sheet='Reseller Payment'
          buttonText='Export Exel'
        />

        <table rowkey='kode_member' id='table-to-xls' style={{ display: 'none' }}>
          <thead>
            <tr>
              <th colSpan='12'>Reseller Payment</th>
            </tr>
            <tr>
              <th colSpan='12'> Periode </th>
            </tr>
            <tr>
              <th colSpan='12'>
                {this.state.headLaporan.startDate} s/d {this.state.headLaporan.endDate}
              </th>
            </tr>
            <tr>
              <th colSpan='12'> TOKO : {this.state.headLaporan.kode_toko} </th>
            </tr>
            <tr>
              <th colSpan='12'></th>
            </tr>
            <tr>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No Reseller</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No Order Confirmation</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Store Name</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Branch Name</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Reseller Name</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Reseller Fee</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Payment Type</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Bank</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Already Paid</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Payment Status</th>
            </tr>
          </thead>

          {this.props.data?.map((item, index) => (
            <>
              <tbody>
                <>
                  <tr>
                    <td> {item.key}</td>
                    <td> {item.no_reseller}</td>
                    <td> {item.no_order_konfirmasi}</td>
                    <td> {item.sales_order.nama_toko}</td>
                    <td> {item.sales_order.nama_cabang}</td>
                    <td> {item.nama_reseller}</td>
                    <td align='right'> Rp. {item.biaya_reseller?.toLocaleString()}</td>
                    <td> {item.tipe_pembayaran}</td>
                    <td> {item.nama_bank}</td>
                    <td align='right'> Rp. {item.bayar_rp?.toLocaleString()}</td>
                    <td> {item.status}</td>
                  </tr>
                </>
              </tbody>
            </>
          ))}
          <tfoot>
            <tr>
              <th
                style={{
                  backgroundColor: '#E8E5E5',
                  color: '#000',
                  textAlign: 'right',
                }}
                colSpan='6'
              >
                Grand Total
              </th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                Rp. {this.props.data?.reduce((a, b) => a + b.biaya_reseller, 0)?.toLocaleString()}
              </th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}></th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}></th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                Rp. {this.props.data?.reduce((a, b) => a + b.bayar_rp, 0)?.toLocaleString()}
              </th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}></th>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}
export default DeliveryReportExcel;
