import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// import angkaTerbilang from '@develoka/angka-terbilang-js';

const PDFDeliveryOrder = (data, head) => {
  const doc = new jsPDF('p', 'mm', 'letter');
  doc.setProperties({
    title: 'Invoice',
  });
  doc.setFont(undefined, 'bold');
  doc.setFontSize(16);
  doc.text('SURAT JALAN', 85, 15);
  doc.setFontSize(10);
  doc.text(data[0].no_surat_jalan, 92, 20);
  doc.setFont(undefined, 'normal');
  doc.text('Kepada Yth, : ', 15, 25);
  doc.text('Tanggal, 20 Desember 2022', 145, 25);
  doc.setFont(undefined, 'bold');
  doc.text(data[0].nama_toko, 15, 30);
  doc.text('Telp.', 15, 40);

  let tableRows = [];
  let tableColumn = [];

  let finalY = 50;

  tableColumn = [
    [
      { content: `No` },
      { content: `Nama Barang` },
      { content: `Jumlah` },
      { content: `Satuan` },
      { content: `Ceklis` },
    ],
  ];

  let no = 1;
  data[0].detail_kirim_barang.forEach((element) => {
    const row = [
      { content: no },
      { content: element.nama_produk },
      { content: element.jumlah_kirim },
      { content: element.unit },
      { content: '' },
    ];
    tableRows.push(row);
    no += 1;
  });

  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    startY: finalY,
    theme: 'grid',
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
  finalY = doc.lastAutoTable.finalY + 10;

  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  doc.text('Keterangan : ', 15, finalY);
  doc.setFont(undefined, 'normal');
  doc.text(data[0].keterangan, 20, finalY + 5);
  doc.text('Mohon diterima dan dicek.', 15, finalY + 25);
  doc.text('Penerima', 35, finalY + 45);
  doc.text('Checker', 95, finalY + 45);
  doc.text('Hormat Kami', 165, finalY + 45);
  doc.text('(.............................)', 30, finalY + 75);
  doc.text('(.............................)', 90, finalY + 75);
  doc.text('( DUDIH HERYADI )', 160, finalY + 75);

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
    <title>Invoice</title>
    </head>
    <body style='margin:0 !important'>
    <embed width='100%' height='100%'src='${string}'></embed>
    </body>
    </html>`
  );
};

export default PDFDeliveryOrder;
