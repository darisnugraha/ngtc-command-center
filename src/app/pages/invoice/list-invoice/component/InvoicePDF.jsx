import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import angkaTerbilang from '@develoka/angka-terbilang-js';

const InvoicePDF = (data, head) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  doc.setProperties({
    title: 'Invoice',
  });
  doc.setFont(undefined, 'bold');
  doc.setFontSize(18);
  doc.text('Faktur Penjualan', 85, 10);
  doc.setFontSize(12);
  doc.text('No : ', 20, 20);
  doc.setFont(undefined, 'normal');
  doc.text(data[0].no_invoice, 31, 20);
  doc.setFont(undefined, 'bold');
  doc.text('Tanggal : ', 20, 28);
  doc.setFont(undefined, 'normal');
  doc.text(data[0].tanggal_invoice, 41, 28);
  doc.setFont(undefined, 'bold');
  doc.text('Kepada Yth, ', 110, 20);
  doc.text('Toko/Tn/Ny : ', 110, 28);
  doc.setFont(undefined, 'normal');
  doc.text(data[0].nama_toko, 138, 28);
  doc.setFont(undefined, 'bold');
  doc.text('Alamat : ', 110, 38);
  doc.setFont(undefined, 'normal');
  let finalAlamatY = 0;
  const alamat = data[0].alamat_cabang;
  const jml_alamat = alamat.length;
  if (jml_alamat > 10) {
    doc.text(alamat.slice(0, 45), 128, 38);
    finalAlamatY = 38;
  }
  if (jml_alamat > 50) {
    doc.text(alamat.slice(45, 92), 128, 48);
    finalAlamatY = 48;
  }
  if (jml_alamat > 70) {
    doc.text(alamat.slice(92, 135), 128, 58);
    finalAlamatY = 58;
  }
  doc.setFont(undefined, 'bold');
  doc.text('Telepon : ', 110, finalAlamatY + 10);
  doc.setFont(undefined, 'normal');
  doc.text(data[0].telepon, 130, finalAlamatY + 10);

  let tableRows = [];
  let tableColumn = [];

  let finalY = finalAlamatY + 30;

  tableColumn = [
    [
      { content: `No` },
      { content: `Nama Produk` },
      { content: `Qty` },
      { content: `Harga/Unit` },
      { content: `Total` },
    ],
  ];

  let no = 1;
  head[0].detail_produk.forEach((element) => {
    const row = [
      { content: no },
      { content: element.nama_produk },
      { content: `${element.qty} ${element.satuan}` },
      { content: 'Rp. ' + element.harga?.toLocaleString(), styles: { halign: 'right' } },
      {
        content: `Rp. ${element.sub_total?.toLocaleString()}`,
        styles: { halign: 'right' },
      },
    ];
    tableRows.push(row);
    no += 1;
  });

  const footerFirst = [
    {
      content: 'Grand Total : ',
      colSpan: 2,
      rowSpan: 8,
    },
  ];
  tableRows.push(footerFirst);

  const footer = [
    {
      content: 'Grand Total : ',
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content:
        'Rp. ' + head[0].detail_produk.reduce((a, b) => a + b.sub_total, 0)?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(footer);

  const dataDiscountSoftware = head[0].detail_diskon.find((element) =>
    element.nama_diskon.includes('SOFTWARE')
  );
  const softwarePercent = dataDiscountSoftware?.persentase || 0;
  let PersentaseSoftware = 0;
  const DiskonRp = dataDiscountSoftware?.sub_total || 0;
  let DiskonSubTotal = 0;

  if (softwarePercent === 0 && DiskonRp !== 0) {
    const dataProdSoftware = head[0].detail_produk.filter(
      (element) => element.jenis_produk === 'SOFTWARE'
    );
    const totalHargaSoftware = dataProdSoftware.reduce((a, b) => a + b.sub_total, 0);
    PersentaseSoftware = DiskonRp / totalHargaSoftware;
    DiskonSubTotal = DiskonRp;
    console.log(DiskonRp);
  } else if (softwarePercent !== 0 && DiskonRp === 0) {
    const dataProdSoftware = head[0].detail_produk.filter(
      (element) => element.jenis_produk === 'SOFTWARE'
    );
    const totalHargaSoftware = dataProdSoftware.reduce((a, b) => a + b.sub_total, 0);
    DiskonSubTotal = totalHargaSoftware * softwarePercent;
    PersentaseSoftware = softwarePercent;
  } else {
    PersentaseSoftware = 0;
    DiskonSubTotal = 0;
  }
  const discountSoftware = [
    {
      content: `Discount Software  ${PersentaseSoftware * 100} %`,
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ' + DiskonSubTotal?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(discountSoftware);

  const dataDiscountHardware = head[0].detail_diskon.find((element) =>
    element.nama_diskon.includes('HARDWARE')
  );
  const hardwarePercent = dataDiscountHardware?.persentase || 0;
  let PersentaseHardware = 0;
  const DiskonRpHardware = dataDiscountHardware?.sub_total || 0;
  let DiskonSubTotalHardware = 0;

  if (hardwarePercent === 0 && DiskonRpHardware !== 0) {
    const dataProdHardware = head[0].detail_produk.filter(
      (element) => element.jenis_produk === 'HARDWARE'
    );
    const totalHargaHardware = dataProdHardware.reduce((a, b) => a + b.sub_total, 0);
    PersentaseHardware = DiskonRpHardware / totalHargaHardware;
    DiskonSubTotalHardware = DiskonRpHardware;
  } else if (hardwarePercent !== 0 && DiskonRpHardware === 0) {
    const dataProdHardware = head[0].detail_produk.filter(
      (element) => element.jenis_produk === 'HARDWARE'
    );
    const totalHargaHardware = dataProdHardware.reduce((a, b) => a + b.sub_total, 0);
    DiskonSubTotalHardware = totalHargaHardware * hardwarePercent;
    PersentaseHardware = hardwarePercent;
  } else {
    PersentaseHardware = 0;
    DiskonSubTotalHardware = 0;
  }
  const discountHardware = [
    {
      content: `Discount Hardware  ${PersentaseHardware * 100} %`,
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ' + DiskonSubTotalHardware?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(discountHardware);

  const dataDiscountConsumable = head[0].detail_diskon.find((element) =>
    element.nama_diskon.includes('CONSUMABLE')
  );
  const ConsumablePercent = dataDiscountConsumable?.persentase || 0;
  let PersentaseConsumable = 0;
  const DiskonRpConsumable = dataDiscountConsumable?.sub_total || 0;
  let DiskonSubTotalConsumable = 0;

  if (ConsumablePercent === 0 && DiskonRpConsumable !== 0) {
    const dataProdConsumable = head[0].detail_produk.filter(
      (element) => element.jenis_produk === 'CONSUMABLE'
    );
    const totalHargaConsumable = dataProdConsumable.reduce((a, b) => a + b.sub_total, 0);
    PersentaseConsumable = DiskonRpConsumable / totalHargaConsumable;
    DiskonSubTotalConsumable = DiskonRpConsumable;
  } else if (ConsumablePercent !== 0 && DiskonRpConsumable === 0) {
    const dataProdConsumable = head[0].detail_produk.filter(
      (element) => element.jenis_produk === 'CONSUMABLE'
    );
    const totalHargaConsumable = dataProdConsumable.reduce((a, b) => a + b.sub_total, 0);
    DiskonSubTotalConsumable = totalHargaConsumable * ConsumablePercent;
    PersentaseConsumable = ConsumablePercent;
  } else {
    PersentaseConsumable = 0;
    DiskonSubTotalConsumable = 0;
  }

  const discountConsumable = [
    {
      content: `Discount Consumable  ${PersentaseConsumable * 100} %`,
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ' + DiskonSubTotalConsumable?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(discountConsumable);
  const total = [
    {
      content: 'Total',
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ' + head[0].total_harga?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(total);
  const dp = [
    {
      content: 'Dp',
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ' + (head[0].total_harga / 2)?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(dp);
  const sisa = [
    {
      content: 'Sisa',
      colSpan: 2,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ' + head[0].sisa_bayar?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(sisa);
  const terbilang = [
    {
      content: `Terbilang: #${angkaTerbilang(data[0].total_harga)}#`,
      colSpan: 5,
      styles: { halign: 'left', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(terbilang);

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

  const cek = data[0].detail_product_invoice.find((val) => val.type === 'ONLINE');

  if (cek !== undefined) {
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('Note : ', 20, finalY);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('- ', 24, finalY + 5);
    doc.text(
      'Biaya berlangganan Online dan Maintenance Nagagold Store Solution + Nagatech Member Rp. 900.000 (Sembilan Ratus Ribu)\nperbulan/toko, ditagihkan setelah 1 bulan dari pemasangan untuk 6 (Enam) bulan kedepan',
      26,
      finalY + 5
    );
    doc.text('- ', 24, finalY + 15);
    doc.text(
      'Biaya langganan Online dan Maintenance tidak mengikat,, sewaktu-waktu bisa berubah',
      26,
      finalY + 15
    );
    finalY = finalY + 15;
  }

  doc.setFont(undefined, 'normal');
  doc.setFontSize(12);
  doc.text('PEMBAYARAN DAPAT DITRANSFER MELALUI: ', 20, finalY + 5);

  let finalTableY = finalY + 10;

  let tableRowsBank = [];
  let tableColumnBank = [];

  tableColumnBank = [
    [{ content: `BCA` }, { content: `7405871688` }, { content: `PT. NAGATECH SISTEM INTEGRATOR` }],
    [
      { content: `BANK MANDIRI` },
      { content: `132.00.6260.1688` },
      { content: `PT. NAGATECH SISTEM INTEGRATOR` },
    ],
  ];
  tableRowsBank.push();

  doc.autoTable({
    head: tableColumnBank,
    body: tableRowsBank,
    startY: finalTableY,
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
      fillColor: '#fff',
      textColor: '#000',
      valign: 'middle',
      halign: 'center',
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
  });
  tableRowsBank = [];
  tableColumnBank = [];
  finalTableY = doc.lastAutoTable.finalY + 80;

  doc.text('-------------------THANK YOU FOR YOUR BUSINESS------------------', 43, finalTableY);

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

export default InvoicePDF;
