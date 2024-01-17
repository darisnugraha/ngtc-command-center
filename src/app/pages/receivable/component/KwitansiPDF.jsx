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
  const moreSpace = 2;
  var imgData = toAbsoluteUrl('/media/kop/header.png');
  const y = 34;
  doc.addImage(imgData, 'PNG', 15, 10, 260, 30);
  doc.setFont(undefined, 'bold');
  doc.text('KWITANSI', 135, y + 15);
  doc.setFont(undefined, 'normal');

  doc.text('Sudah Terima Dari :', 15, y + 25 + moreSpace);
  doc.text(data[0].no_piutang, 195, y + 25 + moreSpace);
  doc.setFont(undefined, 'bold');
  doc.text(head[0].nama_toko, 68, y + 25 + moreSpace);
  doc.setFont(undefined, 'normal');
  const alamat = head[0].alamat;
  const jml_alamat = alamat.length;
  if (jml_alamat > 20) {
    doc.text(alamat.slice(0, 45), 68, y + 33 + moreSpace);
  }
  if (jml_alamat > 50) {
    doc.text(alamat.slice(45, 92), 68, y + 43 + moreSpace);
  }
  if (jml_alamat > 70) {
    doc.text(alamat.slice(92, 135), 68, y + 53 + moreSpace);
  }
  doc.text('Banyaknya Uang', 15, y + 63 + moreSpace);
  doc.text(':', 65, y + 63 + moreSpace);
  doc.text(angkaTerbilang(data[0].bayar_rp).toUpperCase() + " RUPIAH", 68, y + 63 + moreSpace);
  doc.text('Untuk Pembayaran', 15, y + 73 + moreSpace);
  doc.text(':', 65, y + 73 + moreSpace);
  // const desc = data[0].deskripsi;
  // const jml_desc = desc.length;
  // let finalY = y + 73 + moreSpace;
  // if (jml_desc > 0) {
  //   doc.text(desc.slice(0, 45), 68, finalY);
  // }
  // if (jml_desc > 50) {
  //   doc.text(desc.slice(45, 92), 68, finalY + 10);
  // }
  // if (jml_desc > 70) {
  //   doc.text(desc.slice(92, 135), 68, finalY + 20);
  //   finalY = finalY + 10;
  // }
  const desc = data[0].deskripsi;
  let finalY = y + 73 + moreSpace;

  function cutTextAtWordBoundary(text, maxLength) {
    if (text.length <= maxLength) return text;
    let cutOffIndex = text.lastIndexOf(' ', maxLength);
    return cutOffIndex > -1 ? text.slice(0, cutOffIndex) : text.slice(0, maxLength);
  }

  let remainingText = desc;
  let line = 0;

  while (remainingText.length > 0) {
    let textToDisplay = cutTextAtWordBoundary(remainingText, 58);
    doc.text(textToDisplay, 68, finalY + (line * 10));
    remainingText = remainingText.substring(textToDisplay.length).trim();
    line++;
  }
  finalY = finalY + 10
  doc.text(`Terbilang`, 15, finalY + 10);
  doc.text(':', 65, finalY + 10);
  doc.text(`Rp ${data[0].bayar_rp.toLocaleString()}`, 68, finalY + 10);
  const date = moment(data[0].tanggal).format('DD MMMM YYYY');
  doc.text(`Bandung, ${date}`, 174, finalY + 30);
  doc.text('Ismahria Sujana', 187, finalY + 70);

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
