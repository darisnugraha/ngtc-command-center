import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import angkaTerbilang from '@develoka/angka-terbilang-js';
import moment from 'moment';
import { isPos } from '../../../../setup/function';

const KwitansiPDF = (data, head) => {
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setProperties({
    title: 'Kwitansi',
  });
  var imgData = toAbsoluteUrl('/media/kop/header.png');
  const y = 34;
  doc.addImage(imgData, 'PNG', 15, 10, 260, 30);
  doc.text('Kwitansi', 135, y + 15);
  doc.text('Sudah Terima Dari :', 15, y + 25);
  doc.text(data[0].no_piutang, 195, y + 25);
  doc.setFont(undefined, 'bold');
  doc.text(head[0].nama_toko, 68, y + 25);
  doc.setFont(undefined, 'normal');
  const alamat = head[0].alamat;
  const jml_alamat = alamat.length;
  if (jml_alamat > 20) {
    doc.text(alamat.slice(0, 45), 68, y + 33);
  }
  if (jml_alamat > 50) {
    doc.text(alamat.slice(45, 92), 68, y + 43);
  }
  if (jml_alamat > 70) {
    doc.text(alamat.slice(92, 135), 68, y + 53);
  }
  doc.text('Banyaknya Uang   :', 15, y + 63);
  doc.text(angkaTerbilang(data[0].bayar_rp).toUpperCase(), 68, y + 63);
  doc.text('Untuk Pembayaran :', 15, y + 73);
  const desc = data[0].deskripsi;
  const jml_desc = desc.length;
  let finalY = y + 73;
  if (jml_desc > 0) {
    doc.text(desc.slice(0, 45), 68, finalY);
  }
  if (jml_desc > 50) {
    doc.text(desc.slice(45, 92), 68, finalY + 10);
    finalY = finalY + 10;
  }
  if (jml_desc > 70) {
    doc.text(desc.slice(92, 135), 68, finalY + 20);
    finalY = finalY + 20;
  }
  doc.text(`Terbilang Rp ${data[0].bayar_rp.toLocaleString()}`, 15, finalY + 10);
  const date = moment(data[0].tanggal).format('DD MMMM YYYY');
  doc.text(`Bandung, ${date}`, 174, finalY + 10);
  doc.text('Dudih Heryadi', 187, finalY + 40);

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
  if (isPos()) {
    doc.save(`${data[0].bayar_rp}.pdf`);
  } else {
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
  }
};

export default KwitansiPDF;
