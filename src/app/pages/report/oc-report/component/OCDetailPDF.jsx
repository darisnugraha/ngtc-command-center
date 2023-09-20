import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// import { toAbsoluteUrl } from '../../../../../_metronic/helpers';
import moment from 'moment';
import { isPos } from '../../../../../setup/function';

const OCDetailPDF = (data, head) => {
  const doc = new jsPDF('l', 'mm', 'a4');

  let finalY = 30;
  doc.setFontSize(10);
  doc.text('Order Confirmation Report', 14, 15);
  doc.text('Nagatech SI', 180, 15);
  // var imgData = toAbsoluteUrl('/media/logos/nsi-logo.png');
  // doc.addImage(imgData, 'png', 250, 5, 30, 26);

  doc.setProperties({
    title: 'Order Confirmation',
  });
  doc.setFontSize(9);
  doc.text(
    `Period : ${moment(head.tgl_awal).format('DD-MM-YYYY')} s/d ${moment(head.tgl_akhir).format(
      'DD-MM-YYYY'
    )}`,
    14,
    25
  );

  let tableRows = [];
  let tableColumn = [];

  tableColumn = [
    [
      { content: `No` },
      { content: `No Order Confirmation` },
      { content: `OC Type` },
      { content: `Store` },
      { content: `Branch` },
      { content: `Customer Name` },
      { content: `Email` },
      { content: `Telephone` },
      { content: `City` },
      { content: `Address` },
      { content: `Correspondence Address` },
      { content: `Status` },
    ],
  ];

  data.forEach((element) => {
    const row = [
      { content: element.key },
      { content: element.no_order_konfirmasi },
      { content: element.jenis_ok },
      { content: element.nama_toko },
      { content: element.nama_cabang },
      { content: element.nama_customer },
      { content: element.email },
      { content: element.telepon },
      { content: element.kota },
      { content: element.alamat_cabang },
      { content: element.alamat_korespondensi },
      { content: element.status },
    ];
    tableRows.push(row);
  });

  //   const footer = [
  //     {
  //       content: 'Grand Total : ',
  //       colSpan: 6,
  //       styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
  //     },
  //     {
  //       content: 'Rp. ' + data.reduce((a, b) => a + b.total_harga, 0).toLocaleString(),
  //       styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
  //     },
  //     {
  //       content: '',
  //       styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
  //     },
  //   ];
  //   tableRows.push(footer);

  //   const printed = [
  //     {
  //       content: `Printed By Admin`,
  //       colSpan: 8,
  //       styles: {
  //         fontStyle: 'italic',
  //         textColor: '#000',
  //         halign: 'left',
  //       },
  //     },
  //   ];
  //   tableRows.push(printed);

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

  let tableRowsProduct = [];
  let tableColumnProduct = [];

  tableColumnProduct = [
    [
      { content: `Product Name` },
      { content: `Product Type` },
      { content: `Qty` },
      { content: `Unit` },
      { content: `Price` },
      { content: `Price Total` },
    ],
  ];

  data[0].detail_produk.forEach((element) => {
    const row = [
      { content: element.nama_produk },
      { content: element.jenis_produk },
      { content: element.qty, styles: { halign: 'right' } },
      { content: element.satuan },
      { content: `Rp. ${element.harga.toLocaleString()}`, styles: { halign: 'right' } },
      { content: `Rp. ${element.sub_total.toLocaleString()}`, styles: { halign: 'right' } },
    ];
    tableRowsProduct.push(row);
  });

  const footerProduct = [
    {
      content: 'Grand Total Product : ',
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: data[0].detail_produk.reduce((a, b) => a + b.qty, 0),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: '',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: 'Rp. ' + data[0].detail_produk.reduce((a, b) => a + b.harga, 0).toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: 'Rp. ' + data[0].detail_produk.reduce((a, b) => a + b.sub_total, 0).toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
  ];
  tableRowsProduct.push(footerProduct);

  const footerSupportService = [
    {
      content: `No Support Service`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Support Service Name`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Qty`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Unit`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Price`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Total Price`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
  ];
  tableRowsProduct.push(footerSupportService);

  data[0].support_service.forEach((element) => {
    const footerListSupportService = [
      { content: element.no_support_service },
      { content: element.nama_support_service },
      { content: element.qty },
      {
        content: element.kode_satuan,
      },
      {
        content: `Rp. ${element.harga.toLocaleString()}`,
        styles: { halign: 'right' },
      },
      {
        content: `Rp. ${element.total_harga.toLocaleString()}`,
        styles: { halign: 'right' },
      },
    ];
    tableRowsProduct.push(footerListSupportService);
  });

  const footerProductionService = [
    {
      content: `No Production Service`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Production Service Name`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Qty`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Unit`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Date`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Total Price`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
  ];
  tableRowsProduct.push(footerProductionService);

  data[0].production_service.forEach((element) => {
    const footerListProductionService = [
      { content: element.no_production_service },
      { content: element.nama_production_service },
      { content: element.qty },
      {
        content: element.kode_satuan,
      },
      { content: element.tanggal },
      {
        content: `Rp. ${element.total_harga.toLocaleString()}`,
        styles: { halign: 'right' },
      },
    ];
    tableRowsProduct.push(footerListProductionService);
  });

  const footerProductDiscountHead = [
    {
      content: ``,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: ``,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: ``,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Discount Name`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Percentage`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
    {
      content: `Rupiah Discount`,
      styles: {
        fontSize: 7,
        fillColor: '#E8E5E5',
        textColor: '#000',
        valign: 'middle',
        halign: 'center',
        fontStyle: 'bold',
      },
    },
  ];
  tableRowsProduct.push(footerProductDiscountHead);

  data[0].detail_diskon.forEach((element) => {
    const footerProductDiscount = [
      { content: `` },
      { content: `` },
      { content: `` },
      {
        content: `Discount ${element.nama_diskon} : `,
      },
      {
        content: `${element.persentase || 0} %`,
        styles: { halign: 'right' },
      },
      {
        content: `Rp. ${element.sub_total.toLocaleString()}`,
        styles: { halign: 'right' },
      },
    ];
    tableRowsProduct.push(footerProductDiscount);
  });
  const footer = [
    {
      content: 'Grand Total : ',
      colSpan: 5,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
    {
      content: `Rp. ${data[0].total_harga.toLocaleString()}`,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000' },
    },
  ];
  tableRowsProduct.push(footer);

  doc.autoTable({
    head: tableColumnProduct,
    body: tableRowsProduct,
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
  tableRowsProduct = [];
  tableColumnProduct = [];
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
  if (isPos()) {
    doc.save('ORDER_CONFIRMATION_REPORT_DETAIL.pdf');
  } else {
    const string = doc.output('bloburl');
    const x = window.open();
    x.document.open();
    x.document.write(
      `<html>
      <head>
      <title>Order Confirmation</title>
      </head>
      <body style='margin:0 !important'>
      <embed width='100%' height='100%'src='${string}'></embed>
      </body>
      </html>`
    );
  }
};

export default OCDetailPDF;
