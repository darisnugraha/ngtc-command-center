import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// import { toAbsoluteUrl } from '../../../../../_metronic/helpers';
import angkaTerbilang from '@develoka/angka-terbilang-js';
import moment from 'moment';

const KwitansiPDF = (data, head) => {
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setProperties({
    title: 'Kwitansi',
  });
  doc.text('Kwitansi', 135, 15);
  doc.text('Sudah Terima Dari :', 15, 25);
  doc.setFont(undefined, 'bold');
  doc.text(head[0].nama_toko, 68, 25);
  doc.setFont(undefined, 'normal');
  const alamat = head[0].alamat;
  const jml_alamat = alamat.length;
  if (jml_alamat > 20) {
    doc.text(alamat.slice(0, 45), 68, 33);
  }
  if (jml_alamat > 50) {
    doc.text(alamat.slice(45, 92), 68, 43);
  }
  if (jml_alamat > 70) {
    doc.text(alamat.slice(92, 135), 68, 53);
  }
  doc.text('Banyaknya Uang   :', 15, 63);
  doc.text(angkaTerbilang(data[0].bayar_rp).toUpperCase(), 68, 63);
  doc.text('Untuk Pembayaran :', 15, 73);
  const desc =
    'Pelunasan pembelian Paket Software Nagagold Store Solution (Online Web Based Full Version)';
  const jml_desc = desc.length;
  if (jml_desc > 20) {
    doc.text(desc.slice(0, 45), 68, 73);
  }
  if (jml_desc > 50) {
    doc.text(desc.slice(45, 92), 68, 83);
  }
  if (jml_desc > 70) {
    doc.text(desc.slice(92, 135), 68, 93);
  }
  doc.text(`Terbilang Rp ${data[0].bayar_rp.toLocaleString()}`, 15, 103);
  const date = moment(data[0].tanggal).format('DD MMMM YYYY');
  doc.text(`Bandung, ${date}`, 174, 103);
  doc.text('Dudih Heryadi', 187, 143);

  const pages = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  for (let j = 1; j < pages + 1; j += 1) {
    const horizontalPos = pageWidth / 2;
    const verticalPos = pageHeight - 10;
    doc.setPage(j);
    doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
      align: 'center',
    });
  }
  const string = doc.output('bloburl');
  const x = window.open();
  x.document.open();
  x.document.write(
    `<html>
    <head>
    <title>Kwitansi</title>
    </head>
    <body style='margin:0 !important'>
    <embed width='100%' height='100%'src='${string}'></embed>
    </body>
    </html>`
  );
};

export default KwitansiPDF;
