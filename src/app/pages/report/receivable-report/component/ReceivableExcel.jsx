import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getLocal } from '../../../../../setup/encrypt';

class ReceivableReportExcel extends Component {
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
          filename='Receivable Report'
          sheet='Receivable Report'
          buttonText='Export Exel'
        />

        <table rowkey='kode_member' id='table-to-xls' style={{ display: 'none' }}>
          <thead>
            <tr>
              <th colSpan='12'>Receivable Report</th>
            </tr>
            <tr>
              <th colSpan='12'> Periode </th>
            </tr>
            <tr>
              <th colSpan='12'>
                {this.state.headLaporan.tgl_awal} s/d {this.state.headLaporan.tgl_akhir}
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
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No Order Confirmation</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>OC Type</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Store</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Branch</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Customer Name</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Price Total</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Payment Date</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Payment</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Payment Type</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Rest Of The Bill</th>
            </tr>
          </thead>

          {this.props.data?.map((item, index) => (
            <>
              <tbody>
                <>
                  <tr>
                    <td> {item.key}</td>
                    <td> {item.no_order_konfirmasi}</td>
                    <td> {item.jenis_ok}</td>
                    <td> {item.kode_toko}</td>
                    <td> {item.nama_cabang}</td>
                    <td> {item.nama_customer}</td>
                    <td align='right'> Rp. {item.total_harga.toLocaleString()}</td>
                    <td> {item.tanggal_bayar}</td>
                    <td align='right'> Rp. {item.bayar.toLocaleString()}</td>
                    <td> {item.jenis_pembayaran}</td>
                    <td align='right'> Rp. {item.sisa_tagihan.toLocaleString()}</td>
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
                Rp. {this.props.data?.reduce((a, b) => a + b.total_harga, 0).toLocaleString()}
              </th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}></th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                Rp. {this.props.data?.reduce((a, b) => a + b.bayar, 0).toLocaleString()}
              </th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}></th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                Rp. {this.props.data?.reduce((a, b) => a + b.sisa_tagihan, 0).toLocaleString()}
              </th>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}
export default ReceivableReportExcel;
