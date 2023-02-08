import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// import { toAbsoluteUrl } from '../../../../../_metronic/helpers';
import moment from 'moment';

const ResellerPaymentReportPDF = (data, head) => {
  const doc = new jsPDF('l', 'mm', 'a4');
  let tableRows = [];
  let tableColumn = [];

  let finalY = 30;
  doc.setFontSize(10);
  doc.text('Reseller Payment Report', 14, 15);
  doc.text('Nagatech SI', 180, 15);
  // var imgData = toAbsoluteUrl('/media/logos/nsi-logo.png');
  // doc.addImage(imgData, 'png', 250, 5, 30, 26);

  doc.setProperties({
    title: 'Reseller Payment',
  });
  doc.setFontSize(9);
  doc.text(
    `Period : ${moment(head.tgl_awal).format('DD-MM-YYYY')} s/d ${moment(head.tgl_akhir).format(
      'DD-MM-YYYY'
    )}`,
    14,
    25
  );

  tableColumn = [
    [
      { content: `No` },
      { content: `No Reseller` },
      { content: `No Order Confirmation` },
      { content: `Store Name` },
      { content: `Branch Name` },
      { content: `Reseller Name` },
      { content: `Reseller Fee` },
      { content: `Payment Type` },
      { content: `Bank` },
      { content: `Already Paid` },
      { content: `Payment Status` },
    ],
  ];

  let no = 1;
  data.forEach((element) => {
    const row = [
      { content: no++ },
      { content: element.no_reseller },
      { content: element.no_order_konfirmasi },
      { content: element.sales_order.nama_toko },
      { content: element.sales_order.nama_cabang },
      { content: element.nama_reseller },
      {
        content: `Rp. ${element.biaya_reseller?.toLocaleString()}`,
        styles: { halign: 'right' },
      },
      { content: element.tipe_pembayaran },
      { content: element.nama_bank },
      { content: `Rp. ${element.bayar_rp?.toLocaleString()}`, styles: { halign: 'right' } },
      { content: element.status },
    ];
    tableRows.push(row);
  });

  const footer = [
    {
      content: 'Grand Total : ',
      colSpan: 6,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: `Rp. ${data.reduce((a, b) => a + b.biaya_reseller, 0).toLocaleString()}`,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: '',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: '',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: `Rp. ${data.reduce((a, b) => a + b.bayar_rp, 0).toLocaleString()}`,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: '',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
  ];
  tableRows.push(footer);

  const printed = [
    {
      content: `Printed By Admin`,
      colSpan: 11,
      styles: {
        fontStyle: 'italic',
        textColor: '#000',
        halign: 'left',
      },
    },
  ];
  tableRows.push(printed);

  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    startY: finalY,
    theme: 'plain',
    pageBreak: 'auto',
    rowPageBreak: 'avoid',
    margin: { top: 10 },
    bodyStyles: {
      fontSize: 7,
      halign: 'center',
      valign: 'middle',
    },
    headStyles: {
      fontSize: 7,
      fillColor: '#E8E5E5',
      textColor: '#000',
      valign: 'middle',
      halign: 'center',
    },
  });
  tableRows = [];
  tableColumn = [];
  finalY = doc.lastAutoTable.finalY + 20;

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
    <title>Reseller Payment</title>
    </head>
    <body style='margin:0 !important'>
    <embed width='100%' height='100%'src='${string}'></embed>
    </body>
    </html>`
  );
};

export default ResellerPaymentReportPDF;
