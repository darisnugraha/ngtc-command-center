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
  const moreSpace = 12;
  var imgData = toAbsoluteUrl('/media/kop/header.png');
  const y = 34;
  doc.addImage(imgData, 'PNG', 15, 10, 260, 30);
  doc.setFont(undefined, 'bold');
  doc.text('KWITANSI', 135, y + 15);
  doc.setFont(undefined, 'normal');

  doc.text('Sudah Terima Dari :', 15, y + 25 + moreSpace);
  doc.text(data[0].no_piutang, 210, y + 25 + moreSpace);
  doc.setFont(undefined, 'bold');
  doc.text(head[0].nama_toko, 68, y + 25 + moreSpace);
  doc.setFont(undefined, 'normal');
  const alamat = data[0].alamat_cabang ?? '';
  let initY = y + 33 + moreSpace;

  function cutTextAtWordBoundary(text, maxLength) {
    if (text.length <= maxLength) return text;
    let cutOffIndex = text.lastIndexOf(' ', maxLength);
    return cutOffIndex > -1 ? text.slice(0, cutOffIndex) : text.slice(0, maxLength);
  }

  let remainingAlamat = alamat;
  let lineAlamat = 0;

  while (remainingAlamat.length > 0) {
    let textToDisplay = cutTextAtWordBoundary(remainingAlamat, 48);
    doc.text(textToDisplay, 68, initY + lineAlamat * 7);
    remainingAlamat = remainingAlamat.substring(textToDisplay.length).trim();
    lineAlamat++;
  }

  doc.text('Banyaknya Uang', 15, y + 63 + moreSpace - 5);
  doc.text(':', 65, y + 63 + moreSpace - 5);
  doc.text(`Rp. ${data[0].bayar_rp.toLocaleString()}`, 68, y + 63 + moreSpace - 5);
  doc.text('Untuk Pembayaran', 15, y + 73 + moreSpace - 5);
  doc.text(':', 65, y + 73 + moreSpace - 5);
  const desc = data[0].deskripsi;
  let finalY = y + 73 + moreSpace - 5;

  function cutTextAtWordBoundary(text, maxLength) {
    if (text.length <= maxLength) return text;
    let cutOffIndex = text.lastIndexOf(' ', maxLength);
    return cutOffIndex > -1 ? text.slice(0, cutOffIndex) : text.slice(0, maxLength);
  }

  let remainingText = desc;
  let line = 0;

  while (remainingText.length > 0) {
    let textToDisplay = cutTextAtWordBoundary(remainingText, 58);
    doc.text(textToDisplay, 68, finalY + line * 7);
    remainingText = remainingText.substring(textToDisplay.length).trim();
    line++;
  }
  finalY = finalY + line * 8;
  doc.text(`Terbilang`, 15, finalY);
  doc.text(':', 65, finalY);
  const terbilang = angkaTerbilang(data[0].bayar_rp).toUpperCase() + ' RUPIAH';

  let remainingTerbilang = terbilang;
  let lineTerbilang = 0;

  while (remainingTerbilang.length > 0) {
    let textToDisplay = cutTextAtWordBoundary(remainingTerbilang, 58);
    doc.text(textToDisplay, 68, finalY + lineTerbilang * 7);
    remainingTerbilang = remainingTerbilang.substring(textToDisplay.length).trim();
    lineTerbilang++;
  }
  const date = moment(data[0].tanggal).format('DD MMMM YYYY');
  doc.text(`Bandung, ${date}`, 174, finalY + 22);
  doc.text('Ismahria Sujana', 187, finalY + 55);

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
