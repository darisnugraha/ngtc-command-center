import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getLocal } from '../../../../../setup/encrypt';

class OCDetailReportExcel extends Component {
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
    var grandTotal = 0;
    return (
      <>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-success btn-block'
          table='table-to-xls'
          filename='Order Confirmation Detail Report'
          sheet='Order Confirmation Detail Report'
          buttonText='Export Exel'
        />

        <table rowkey='kode_member' id='table-to-xls' style={{ display: 'none' }}>
          <thead>
            <tr>
              <th colSpan='12'>Order Confirmation Detail Report</th>
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
              <th colSpan='12'></th>
            </tr>
            <tr>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>No Order Confirmation</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>OC Type</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Store</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Branch</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Customer Name</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Email</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Telephone</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>City</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Address</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Correspondence Address</th>
              <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Status</th>
            </tr>
          </thead>

          <>
            <tbody>
              {this.props.data?.map((item, index) => (
                <>
                  <tr>
                    <td> {item.key}</td>
                    <td> {item.no_order_konfirmasi}</td>
                    <td> {item.jenis_ok}</td>
                    <td> {item.nama_toko}</td>
                    <td> {item.nama_cabang}</td>
                    <td> {item.nama_customer}</td>
                    <td> {item.email}</td>
                    <td> {item.telephone}</td>
                    <td> {item.kota}</td>
                    <td> {item.alamat_cabang}</td>
                    <td> {item.alamat_korespondensi}</td>
                    <td> {item.status}</td>
                  </tr>
                </>
              ))}
              <tr>
                <td></td>
              </tr>
              {this.props.data?.map((headDetail) => (
                <>
                  <tr>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }} colSpan={3}>
                      No Order Confirmation : {headDetail.no_order_konfirmasi}
                    </th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }} colSpan={3}>
                      Customer Name : {headDetail.nama_customer}
                    </th>
                  </tr>
                  <tr>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Product Name</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Product Type</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Qty</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Unit</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Price</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Total Price</th>
                  </tr>
                  {headDetail?.detail_produk.map((item, index) => (
                    <>
                      <tr>
                        <td>{item.nama_produk}</td>
                        <td>{item.jenis_produk}</td>
                        <td align='right'>{item.qty}</td>
                        <td>{item.satuan}</td>
                        <td align='right'>Rp. {item.harga.toLocaleString()}</td>
                        <td align='right'>Rp. {item.sub_total.toLocaleString()}</td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <th
                      style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}
                      colSpan={4}
                    >
                      Grand Total Product :{' '}
                    </th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                      Rp.{' '}
                      {headDetail?.detail_produk?.reduce((a, b) => a + b.harga, 0).toLocaleString()}
                    </th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000', textAlign: 'right' }}>
                      Rp.{' '}
                      {headDetail?.detail_produk
                        ?.reduce((a, b) => a + b.sub_total, 0)
                        .toLocaleString()}
                    </th>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>
                      No Support Service
                    </th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>
                      Support Service Name
                    </th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Qty</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Unit</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Price</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Total Price</th>
                  </tr>
                  {headDetail?.support_service.map((item, index) => (
                    <>
                      <tr>
                        <td>{item.no_support_service}</td>
                        <td>{item.nama_support_service}</td>
                        <td align='right'>{item.qty}</td>
                        <td>{item.kode_satuan}</td>
                        <td align='right'>Rp. {item.harga.toLocaleString()}</td>
                        <td align='right'>Rp. {item.total_harga.toLocaleString()}</td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>
                      No Production Service
                    </th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>
                      Production Service Name
                    </th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Qty</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Unit</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Date</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Total Price</th>
                  </tr>
                  {headDetail?.production_service.map((item, index) => (
                    <>
                      <tr>
                        <td>{item.no_production_service}</td>
                        <td>{item.nama_production_service}</td>
                        <td align='right'>{item.qty}</td>
                        <td>{item.kode_satuan}</td>
                        <td>{item.tanggal}</td>
                        <td align='right'>Rp. {item.total_harga.toLocaleString()}</td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}></th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}></th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}></th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Discount Name</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Percentage</th>
                    <th style={{ backgroundColor: '#E8E5E5', color: '#000' }}>Rupiah Discount</th>
                  </tr>
                  {headDetail?.detail_diskon.map((item, index) => (
                    <>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{item.nama_diskon}</td>
                        <td>{item.persentase}</td>
                        <td align='right'>Rp. {item?.sub_total?.toLocaleString()}</td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <th colSpan='6'></th>
                  </tr>
                  <tr>
                    <th colSpan='6'></th>
                  </tr>
                </>
              ))}
            </tbody>
          </>
        </table>
      </>
    );
  }
}
export default OCDetailReportExcel;
