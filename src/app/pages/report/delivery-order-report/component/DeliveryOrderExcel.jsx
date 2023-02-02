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
          filename='Delivery Report'
          sheet='Delivery Report'
          buttonText='Export Exel'
        />

        <table rowkey='kode_member' id='table-to-xls' style={{ display: 'none' }}>
          <thead>
            <tr>
              <th colSpan='12'>Delivery Report</th>
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
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No Delivery Order</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No Order Confirmation</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Delivery Order Date</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Store Code</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Branch Code</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Validation Status</th>
            </tr>
          </thead>

          {this.props.data?.map((item, index) => (
            <>
              <tbody>
                <>
                  <tr>
                    <td> {item.key}</td>
                    <td> {item.no_surat_jalan}</td>
                    <td> {item.no_order_konfirmasi}</td>
                    <td> {item.tanggal_surat_jalan}</td>
                    <td> {item.kode_toko}</td>
                    <td> {item.kode_cabang}</td>
                    <td> {item.status}</td>
                  </tr>
                </>
              </tbody>
            </>
          ))}
          {/* <tfoot>
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
                Rp. {this.props.data?.reduce((a, b) => a + b.total_harga, 0)?.toLocaleString()}
              </th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}></th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                Rp. {this.props.data?.reduce((a, b) => a + b.bayar, 0)?.toLocaleString()}
              </th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}></th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                Rp. {this.props.data?.reduce((a, b) => a + b.sisa_tagihan, 0)?.toLocaleString()}
              </th>
            </tr>
          </tfoot> */}
        </table>
      </>
    );
  }
}
export default DeliveryReportExcel;
