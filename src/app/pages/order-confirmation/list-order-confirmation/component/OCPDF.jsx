import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import { toAbsoluteUrl } from '../../../../../_metronic/helpers';
import { isPos } from '../../../../../setup/function';

const OCPDF = (data, head) => {
  let topFooterRekening = 0;
  let heightFooterRekening = 0;
  let lastPositionTableItem = 0;
  let heightDetailItemTable = 0;
  let heightDescriptionTable = 0;
  let heightFooterFollowUpTable = 0;
  let grandTotalSoftware = 0;
  let PersentaseSoftware = 0;
  let DiskonSubTotal = 0;
  const doc = new jsPDF('p', 'mm', [210, 297]);
  doc.setProperties({
    title: 'Order Confirmation',
  });
  let final = 20;
  doc.setFontSize(8);
  doc.text(
    `Bandung, ${moment(data[0].tanggal_order_konfirmasi).format('DD MMMM YYYY')}`,
    155,
    final + 15
  );
  doc.text('Kepada Yth : ', 15, final + 15);
  doc.setFont(undefined, 'bold');
  let toko = '';
  if (data[0].nama_cabang === 'PUSAT') {
    toko = data[0].nama_toko.split(' ');
    let tokobarisSatu = '';
    let tokobarisDua = '';
    if (toko.length > 4) {
      for (let index = 0; index < toko.length; index++) {
        if (index > 2) {
          tokobarisDua += toko[index] + ' ';
        } else {
          tokobarisSatu += toko[index] + ' ';
        }
      }
      doc.text(tokobarisSatu, 15, final + 20);
      doc.text(tokobarisDua, 15, final + 24);
    } else {
      doc.text(data[0].nama_toko, 15, final + 20);
    }
  } else {
    toko = data[0].nama_cabang.split(' ');
    let tokobarisSatu = '';
    let tokobarisDua = '';
    if (toko.length > 4) {
      for (let index = 0; index < toko.length; index++) {
        if (index > 2) {
          tokobarisDua += toko[index] + ' ';
        } else {
          tokobarisSatu += toko[index] + ' ';
        }
      }
      doc.text(tokobarisSatu, 15, final + 20);
      doc.text(tokobarisDua, 15, final + 25);
    } else {
      doc.text(data[0].nama_cabang, 15, final + 20);
    }
  }

  doc.setFont(undefined, 'normal');
  let tambahanY = 0;
  const alamat = data[0].alamat_cabang.split(' ');
  let alamatbarissatu = '';
  let alamatbarisdua = '';
  let alamatbaristiga = '';
  if (alamat.length > 5) {
    for (let index = 0; index < alamat.length; index++) {
      if (index < 4) {
        alamatbarissatu += alamat[index] + ' ';
      } else if (index < 8) {
        alamatbarisdua += alamat[index] + ' ';
      } else {
        alamatbaristiga += alamat[index] + ' ';
      }
    }
    doc.text(alamatbarissatu, 15, final + 30);
    doc.text(alamatbarisdua, 15, final + 34);
    if (alamatbaristiga !== '' || alamatbaristiga !== ' ') {
      tambahanY = 5;
      doc.text(alamatbaristiga, 15, final + 38);
    }
    doc.text(data[0].kota, 15, final + 42 + tambahanY);
    doc.text('Telp : ', 15, final + 47 + tambahanY);
    doc.text(data[0].telepon, 23, final + 47 + tambahanY);
  } else {
    if (data[0].alamat_cabang.length > 55) {
      doc.text(data[0].alamat_cabang.slice(0, 56), 15, final + 30);
      doc.text(data[0].alamat_cabang.slice(56, data[0].alamat_cabang.length), 15, final + 35);
      doc.text(data[0].kota, 15, final + 42);
      doc.text('Telp : ', 15, final + 47);
      doc.text(data[0].telepon, 23, final + 47);
    } else {
      doc.text(data[0].alamat_cabang, 15, final + 25);
      doc.text(data[0].kota, 15, final + 35);
      doc.text('Telp : ', 15, final + 40);
      doc.text(data[0].telepon, 23, final + 40);
      tambahanY = -5;
    }
  }
  doc.setFont(undefined, 'bold');
  doc.text('UP : ', 15, final + 55 + tambahanY);
  doc.text(data[0].nama_customer, 23, final + 55 + tambahanY);
  doc.text('Order Konfirmasi', 93, final + 60 + tambahanY);
  doc.line(92, final + 61 + tambahanY, 118, final + 61 + tambahanY);
  doc.setFont(undefined, 'normal');
  if (data[0].no_order_konfirmasi.includes('REVISI')) {
    doc.text(data[0].no_order_konfirmasi, 85, final + 65 + tambahanY);
  } else {
    doc.text(data[0].no_order_konfirmasi, 90, final + 65 + tambahanY);
  }
  doc.text('Dengan Hormat ,', 23, final + 70 + tambahanY);
  const headerDesc = head.header_desc;
  const jumlah_header_desc = headerDesc.length;
  if (jumlah_header_desc > 0) {
    doc.text(headerDesc.slice(0, 127), 26, final + 75 + tambahanY);
  }
  if (jumlah_header_desc > 157) {
    doc.text(headerDesc.slice(127, 254), 15, final + 80 + tambahanY);
  }
  // doc.text(head.header_desc, 26, 70);

  let tableRows = [];
  let tableColumn = [];

  let finalY = final + 85 + tambahanY;

  tableColumn = [
    [
      { content: `No` },
      { content: `Product Name` },
      { content: `Qty` },
      { content: `Unit` },
      { content: `Price`, colSpan: 2 },
      { content: `Sub Total`, colSpan: 2 },
    ],
  ];

  let no = 1;
  data[0].detail_produk.forEach((element) => {
    const row = [
      { content: no },
      { content: element.nama_produk, styles: { halign: 'left' } },
      { content: element.qty },
      { content: element.satuan },
      { content: 'Rp. ', styles: { halign: 'right' } },
      { content: element.harga?.toLocaleString(), styles: { halign: 'right' } },
      { content: 'Rp. ', styles: { halign: 'right' } },
      {
        content: element.sub_total?.toLocaleString(),
        styles: { halign: 'right' },
      },
    ];
    tableRows.push(row);
    no += 1;
  });
  const footer = [
    {
      content: 'Grand Total : ',
      colSpan: 6,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: data[0].detail_produk.reduce((a, b) => a + b.sub_total, 0)?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(footer);

  const dataDiscountSoftware = data[0].detail_diskon.find((element) =>
    element.nama_diskon.includes('SOFTWARE')
  );
  const softwarePercent = dataDiscountSoftware?.persentase || 0;
  const DiskonRp = dataDiscountSoftware?.sub_total || 0;

  if (softwarePercent === 0 && DiskonRp !== 0) {
    const dataProdSoftware = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'SOFTWARE'
    );
    const totalHargaSoftware = dataProdSoftware.reduce((a, b) => a + b.sub_total, 0);
    PersentaseSoftware = DiskonRp / totalHargaSoftware;
    DiskonSubTotal = DiskonRp;
    console.log(DiskonRp);
  } else if (softwarePercent !== 0 && DiskonRp === 0) {
    const dataProdSoftware = data[0].detail_produk.filter(
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
      colSpan: 6,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: DiskonSubTotal?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  if (PersentaseSoftware !== 0 || DiskonSubTotal !== 0) {
    tableRows.push(discountSoftware);
    const dataProdSoftware = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'SOFTWARE'
    );
    const totalHargaSoftware = dataProdSoftware.reduce((a, b) => a + b.sub_total, 0);
    grandTotalSoftware = totalHargaSoftware - DiskonSubTotal;
  } else {
    const dataProdSoftware = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'SOFTWARE'
    );
    const totalHargaSoftware = dataProdSoftware.reduce((a, b) => a + b.sub_total, 0);
    grandTotalSoftware = totalHargaSoftware;
  }

  let grandTotalHardware = 0;
  const dataDiscountHardware = data[0].detail_diskon.find((element) =>
    element.nama_diskon.includes('HARDWARE')
  );
  const hardwarePercent = dataDiscountHardware?.persentase || 0;
  let PersentaseHardware = 0;
  const DiskonRpHardware = dataDiscountHardware?.sub_total || 0;
  let DiskonSubTotalHardware = 0;

  if (hardwarePercent === 0 && DiskonRpHardware !== 0) {
    const dataProdHardware = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'HARDWARE'
    );
    const totalHargaHardware = dataProdHardware.reduce((a, b) => a + b.sub_total, 0);
    PersentaseHardware = DiskonRpHardware / totalHargaHardware;
    DiskonSubTotalHardware = DiskonRpHardware;
  } else if (hardwarePercent !== 0 && DiskonRpHardware === 0) {
    const dataProdHardware = data[0].detail_produk.filter(
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
      colSpan: 6,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: DiskonSubTotalHardware?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  if (PersentaseHardware !== 0 || DiskonSubTotalHardware !== 0) {
    tableRows.push(discountHardware);
    const dataProdHardware = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'HARDWARE'
    );
    const totalHargaHardware = dataProdHardware.reduce((a, b) => a + b.sub_total, 0);
    grandTotalHardware = totalHargaHardware - DiskonSubTotalHardware;
  } else {
    const dataProdHardware = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'HARDWARE'
    );
    const totalHargaHardware = dataProdHardware.reduce((a, b) => a + b.sub_total, 0);
    grandTotalHardware = totalHargaHardware;
  }

  let grandTotalConsumable = 0;
  const dataDiscountConsumable = data[0].detail_diskon.find((element) =>
    element.nama_diskon.includes('CONSUMABLE')
  );
  const ConsumablePercent = dataDiscountConsumable?.persentase || 0;
  let PersentaseConsumable = 0;
  const DiskonRpConsumable = dataDiscountConsumable?.sub_total || 0;
  let DiskonSubTotalConsumable = 0;

  if (ConsumablePercent === 0 && DiskonRpConsumable !== 0) {
    const dataProdConsumable = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'CONSUMABLE'
    );
    const totalHargaConsumable = dataProdConsumable.reduce((a, b) => a + b.sub_total, 0);
    PersentaseConsumable = DiskonRpConsumable / totalHargaConsumable;
    DiskonSubTotalConsumable = DiskonRpConsumable;
  } else if (ConsumablePercent !== 0 && DiskonRpConsumable === 0) {
    const dataProdConsumable = data[0].detail_produk.filter(
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
      colSpan: 6,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: DiskonSubTotalConsumable?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  if (PersentaseConsumable !== 0 || DiskonSubTotalConsumable !== 0) {
    tableRows.push(discountConsumable);
    const dataProdConsumable = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'CONSUMABLE'
    );
    const totalHargaConsumable = dataProdConsumable.reduce((a, b) => a + b.sub_total, 0);
    grandTotalConsumable = totalHargaConsumable - DiskonSubTotalConsumable;
  } else {
    const dataProdConsumable = data[0].detail_produk.filter(
      (element) => element.jenis_produk === 'CONSUMABLE'
    );
    const totalHargaConsumable = dataProdConsumable.reduce((a, b) => a + b.sub_total, 0);
    grandTotalConsumable = totalHargaConsumable;
  }

  data[0].detail_diskon.forEach((res) => {
    if (
      !res.nama_diskon.includes('SOFTWARE') &&
      !res.nama_diskon.includes('HARDWARE') &&
      !res.nama_diskon.includes('CONSUMABLE')
    ) {
      let DiscTot = 0;
      let PersenTot = 0;
      const total = grandTotalSoftware + grandTotalHardware + grandTotalConsumable;
      if (res.persentase === 0 && res.sub_total !== 0) {
        PersenTot = res.sub_total / total;
        DiscTot = res.sub_total;
        const footerDiscountAll = [
          {
            content: `Diskon ${res.nama_diskon} ${PersenTot} %`,
            colSpan: 6,
            styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
          },
          {
            content: 'Rp. ',
            styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
          },
          {
            content: DiscTot?.toLocaleString(),
            styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
          },
        ];
        tableRows.push(footerDiscountAll);
      } else if (res.persentase !== 0 && res.sub_total === 0) {
        PersenTot = res.persentase * 100;
        DiscTot = total * res.persentase;
        const footerDiscountAll = [
          {
            content: `Diskon ${res.nama_diskon} ${PersenTot} %`,
            colSpan: 6,
            styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
          },
          {
            content: 'Rp. ',
            styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
          },
          {
            content: DiscTot?.toLocaleString(),
            styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
          },
        ];
        tableRows.push(footerDiscountAll);
      }
    }
  });

  const total = [
    {
      content: 'Total',
      colSpan: 6,
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: 'Rp. ',
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
    {
      content: data[0].total_harga?.toLocaleString(),
      styles: { halign: 'right', fillColor: '#E8E5E5', textColor: '#000', fontStyle: 'bold' },
    },
  ];
  tableRows.push(total);

  //START calculate Height Table Item
  var initHeightItem = 0;
  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    startY: -999999,
    theme: 'plain',
    pageBreak: 'auto',
    rowPageBreak: 'avoid',
    margin: { top: 10, bottom: 30 },
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
    didParseCell: function (HookData) {
      initHeightItem = HookData.settings.startY;
    },
    willDrawCell: function (data) {
      // add borders around the head cells
      if (data.row.section === 'body' && data.column.index != 4 && data.column.index != 6) {
        if (data.row.section === 'body' && data.column.index == 5) {
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw bottom border
          doc.line(
            data.cell.x + data.cell.width,
            data.cell.y,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        } else if (data.row.section === 'body' && data.column.index == 7) {
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw bottom border
          doc.line(
            data.cell.x + data.cell.width,
            data.cell.y,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        } else {
          // draw bottom border
          doc.line(
            data.cell.x + data.cell.width,
            data.cell.y,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw left border
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y);
        }
      } else {
        if (data.row.section === 'body' && data.column.index == 4) {
          // draw bottom border
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw left border
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y);
        }
        if (data.row.section === 'body' && data.column.index == 6) {
          // draw bottom border
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw left border
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y);
        }
      }
    },
  });
  heightDetailItemTable = doc.lastAutoTable.finalY - initHeightItem;
  //END calculate Height Table Item

  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    startY: finalY,
    theme: 'plain',
    pageBreak: 'auto',
    rowPageBreak: 'avoid',
    margin: { top: 10, bottom: 30 },
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
    willDrawCell: function (data) {
      // add borders around the head cells
      if (data.row.section === 'body' && data.column.index != 4 && data.column.index != 6) {
        if (data.row.section === 'body' && data.column.index == 5) {
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw bottom border
          doc.line(
            data.cell.x + data.cell.width,
            data.cell.y,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        } else if (data.row.section === 'body' && data.column.index == 7) {
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw bottom border
          doc.line(
            data.cell.x + data.cell.width,
            data.cell.y,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        } else {
          // draw bottom border
          doc.line(
            data.cell.x + data.cell.width,
            data.cell.y,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw left border
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y);
        }
      } else {
        if (data.row.section === 'body' && data.column.index == 4) {
          // draw bottom border
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw left border
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y);
        }
        if (data.row.section === 'body' && data.column.index == 6) {
          // draw bottom border
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
          // draw top border
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x, data.cell.y);
          // draw left border
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y);
        }
      }
    },
  });
  tableRows = [];
  tableColumn = [];
  finalY = doc.lastAutoTable.finalY + 5;

  let rowDesc = [
    [{ content: `2. Waktu Pengiriman` }, { content: head.waktu_pengiriman || '-' }],
    [{ content: `3. Sistem Pembayaran` }, { content: head.sistem_pembayaran || '-' }],
    [{ content: `4. Keterangan` }, { content: head.keterangan || '-' }],
  ];
  rowDesc.push();
  lastPositionTableItem = doc.lastAutoTable.finalY;
  var initHeightDesc = 0;
  //START calculate Height Table Description
  doc.autoTable({
    head: [],
    body: rowDesc,
    startY: -9999999,
    theme: 'plain',
    pageBreak: 'auto',
    rowPageBreak: 'avoid',
    margin: { top: 10, bottom: 30 },
    bodyStyles: {
      fontSize: 7,
      halign: 'left',
      valign: 'top',
    },
    headStyles: {
      fontSize: 7,
      fillColor: '#fff',
      textColor: '#000',
      valign: 'middle',
      halign: 'left',
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    didParseCell: function (HookData) {
      initHeightDesc = HookData.settings.startY;
    },
  });
  heightDescriptionTable = doc.lastAutoTable.finalY - initHeightDesc;
  console.log('[HEIGHT] DESCRIPTION:' + heightDescriptionTable);
  console.log('[HEIGHT] ITEM:' + heightDetailItemTable);
  //END calculate Height Table Description
  doc.autoTable({
    head: [],
    body: rowDesc,
    startY: finalY,
    theme: 'plain',
    pageBreak: 'auto',
    rowPageBreak: 'avoid',
    margin: { top: 30, bottom: 30 },
    bodyStyles: {
      fontSize: 7,
      halign: 'left',
      valign: 'top',
    },
    headStyles: {
      fontSize: 7,
      fillColor: '#fff',
      textColor: '#000',
      valign: 'middle',
      halign: 'left',
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    addPageContent: (pageContent) => {
      calculateFooterFollowUP(doc, head);
      calculateFooterRekening(doc, data);
      let totalHeightTable = heightDescriptionTable + heightDetailItemTable;
      console.log(totalHeightTable);
      console.log(lastPositionTableItem);
      console.log(heightDescriptionTable);
      if (lastPositionTableItem > 195) {
        console.log('[GENERATOR] Ini didalam lastPositionTableItem > 195');
        if (pageContent.pageCount > 1) {
          console.log(
            '[GENERATOR] Ini didalam lastPositionTableItem > 195 && pageContent.pageCount > 1'
          );
          printFooterRekening(doc, data);
          printFooterFollowUP(doc, head);
          const pageWidth = doc.internal.pageSize.width;
          var imgData = toAbsoluteUrl('/media/kop/footer.png');
          doc.addImage(imgData, 'PNG', 14, doc.internal.pageSize.height - 27, pageWidth - 28, 25);
          var imgData = toAbsoluteUrl('/media/kop/header.png');
          doc.addImage(imgData, 'PNG', 15, 10, 180, 20);
        } else {
          console.log(
            '[GENERATOR] Ini didalam lastPositionTableItem > 195 && pageContent.pageCount <= 1'
          );
          var imgData = toAbsoluteUrl('/media/kop/header.png');
          doc.addImage(imgData, 'PNG', 15, 10, 180, 20);
          const pageWidth = doc.internal.pageSize.width;
          var imgData = toAbsoluteUrl('/media/kop/footer.png');
          doc.addImage(imgData, 'PNG', 14, doc.internal.pageSize.height - 27, pageWidth - 28, 25);
          if (
            lastPositionTableItem + heightDescriptionTable > 235 &&
            lastPositionTableItem + heightDescriptionTable < 275
          ) {
            doc.addPage();
            printFooterRekening(doc, data);
            printFooterFollowUP(doc, head);
            var imgData = toAbsoluteUrl('/media/kop/header.png');
            doc.addImage(imgData, 'PNG', 15, 10, 180, 20);
            var imgData = toAbsoluteUrl('/media/kop/footer.png');
            doc.addImage(imgData, 'PNG', 14, doc.internal.pageSize.height - 27, pageWidth - 28, 25);
          }
        }
      } else {
        console.log('[GENERATOR] Ini didalam lastPositionTableItem < 195');
        console.log(totalHeightTable + heightFooterFollowUpTable);
        if (pageContent.pageCount === 1) {
          if (totalHeightTable + heightFooterFollowUpTable < 144) {
            console.log(
              '[GENERATOR] Ini didalam lastPositionTableItem > 195 && totalHeightTable < 110'
            );
            printFooterRekening(doc, data);
            printFooterFollowUP(doc, head);
            const pageWidth = doc.internal.pageSize.width;
            var imgData = toAbsoluteUrl('/media/kop/footer.png');
            doc.addImage(imgData, 'PNG', 14, doc.internal.pageSize.height - 27, pageWidth - 28, 25);
          } else {
            const pageWidth = doc.internal.pageSize.width;
            var imgData = toAbsoluteUrl('/media/kop/footer.png');
            doc.addImage(imgData, 'PNG', 14, doc.internal.pageSize.height - 27, pageWidth - 28, 25);
            var imgData = toAbsoluteUrl('/media/kop/header.png');
            doc.addImage(imgData, 'PNG', 15, 10, 180, 20);
            console.log(
              '[GENERATOR] Ini didalam lastPositionTableItem > 195 && totalHeightTable > 110'
            );
            doc.addPage();
            printFooterRekening(doc, data);
            printFooterFollowUP(doc, head);
            var imgData = toAbsoluteUrl('/media/kop/footer.png');
            doc.addImage(imgData, 'PNG', 14, doc.internal.pageSize.height - 27, pageWidth - 28, 25);
          }
          var imgData = toAbsoluteUrl('/media/kop/header.png');
          doc.addImage(imgData, 'PNG', 15, 10, 180, 20);
        }
      }
    },
  });
  console.log('[HEIGHT] FU:' + heightFooterFollowUpTable);
  console.log('[HEIGHT] REKENING:' + heightFooterRekening);

  // const pages = doc.internal.getNumberOfPages();
  // const pageWidth = doc.internal.pageSize.width;
  // const pageHeight = doc.internal.pageSize.height;
  // const verticalPos = pageHeight - 32;
  // var imgData = toAbsoluteUrl('/media/kop/footer.png');
  // doc.addImage(imgData, 'PNG', 14, finalTableY + 5, pageWidth - 28, 25);

  // doc.addPage();
  // doc.text(
  //   'Demikianlah Order Konfirmasi ini kami sampaikan, Apabila Ibu setuju dengan kondisi tersebut di atas, mohon Order Konfirmasi ini ditandangani \ndan dikirimkan kembali kepada kami',
  //   15,
  //   finalY + 38
  // );
  // doc.text('Hormat Kami, ', 50, finalY + 49);
  // doc.text('Menyetujui, ', 140, finalY + 49);

  // doc.text('Budi Kristiyanto', 48, finalY + 65);
  // if (data[0].nama_customer.length > 9) {
  //   doc.text(data[0].nama_customer, 138, finalY + 65);
  // } else if (data[0].nama_customer.length > 15) {
  //   doc.text(data[0].nama_customer, 135, finalY + 65);
  // } else {
  //   doc.text(data[0].nama_customer, 142, finalY + 65);
  // }

  // doc.setFontSize(10);
  // doc.setFont(undefined, 'bold');
  // doc.text('* Pembayaran dapat di transfer melalui rekening *', 15, finalY + 75);
  // let finalTableY = finalY + 80;

  // let tableRowsBank = [];
  // let tableColumnBank = [];

  // if (data[0].jenis_ok === 'INCLUDE SOFTWARE') {
  //   tableColumnBank = [
  //     [
  //       { content: `BCA` },
  //       { content: `7405 8716 88` },
  //       { content: `PT. NAGATECH SISTEM INTEGRATOR` },
  //     ],
  //     [
  //       { content: `BANK MANDIRI` },
  //       { content: `132-00-6260-1688` },
  //       { content: `PT. NAGATECH SISTEM INTEGRATOR` },
  //     ],
  //   ];
  //   tableRowsBank.push();
  // } else {
  //   tableColumnBank = [
  //     [{ content: `BCA` }, { content: `7405557878` }, { content: `BUDI KRISTIYANTO SH` }],
  //   ];
  //   tableRowsBank.push();
  // }

  // doc.autoTable({
  //   head: tableColumnBank,
  //   body: tableRowsBank,
  //   startY: finalTableY,
  //   theme: 'grid',
  //   pageBreak: 'auto',
  //   rowPageBreak: 'avoid',
  //   margin: { top: 10 },
  //   bodyStyles: {
  //     fontSize: 7,
  //     halign: 'center',
  //     valign: 'middle',
  //   },
  //   headStyles: {
  //     fontSize: 7,
  //     fillColor: '#fff',
  //     textColor: '#000',
  //     valign: 'middle',
  //     halign: 'center',
  //     lineWidth: 0.5,
  //     lineColor: [0, 0, 0],
  //   },
  // });
  // tableRowsBank = [];
  // tableColumnBank = [];
  // finalTableY = doc.lastAutoTable.finalY + 5;

  // for (let j = 1; j < pages + 1; j += 1) {
  //   const horizontalPos = pageWidth / 2;
  //   const verticalPos = pageHeight - 32;
  //   doc.setPage(j);
  //   // doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
  //   //   align: 'center',
  //   // });
  //   var imgData = toAbsoluteUrl('/media/kop/footer.png');
  //   doc.addImage(imgData, 'PNG', 14, verticalPos, pageWidth - 28, 25);
  // }
  if (isPos()) {
    doc.save(`${data[0].no_order_konfirmasi}.pdf`);
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

  function printFooterRekening(doc, data) {
    doc.setFont(undefined, 'bold');
    doc.setFontSize(6);

    let tableRowsBank = [];
    let tableColumnBank = [];

    if (data[0].jenis_ok === 'INCLUDE SOFTWARE') {
      tableColumnBank = [
        [
          { content: `BCA` },
          { content: `7405 8716 88` },
          { content: `PT. NAGATECH SISTEM INTEGRATOR` },
        ],
        [
          { content: `BANK MANDIRI` },
          { content: `132-00-6260-1688` },
          { content: `PT. NAGATECH SISTEM INTEGRATOR` },
        ],
      ];
      tableRowsBank.push();
    } else {
      tableColumnBank = [
        [{ content: `BCA` }, { content: `7405557878` }, { content: `BUDI KRISTIYANTO SH` }],
      ];
      tableRowsBank.push();
    }
    var height = 0;

    doc.autoTable({
      head: tableColumnBank,
      body: tableRowsBank,
      startY: -999999,
      theme: 'grid',
      pageBreak: 'auto',
      rowPageBreak: 'avoid',
      margin: { top: 10 },
      bodyStyles: {
        fontSize: 7,
        halign: 'center',
        valign: 'middle',
        textColor: '#fff',
      },
      headStyles: {
        fontSize: 7,
        fillColor: '#fff',
        textColor: '#fff',
        valign: 'middle',
        halign: 'center',
        lineWidth: 0.5,
        lineColor: '#fff',
      },
      didParseCell: function (HookData) {
        height = HookData.settings.startY;
      },
    });
    height = doc.lastAutoTable.finalY - height;
    topFooterRekening = doc.internal.pageSize.height - 32 - height;
    heightFooterRekening = height;
    doc.text(
      '* Pembayaran dapat di transfer melalui rekening *',
      15,
      doc.internal.pageSize.height - 29 - height
    );

    doc.autoTable({
      head: tableColumnBank,
      body: tableRowsBank,
      startY: doc.internal.pageSize.height - 27 - height,
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
  }

  function calculateFooterRekening(doc, data) {
    doc.setFont(undefined, 'bold');
    doc.setFontSize(6);

    let tableRowsBank = [];
    let tableColumnBank = [];

    if (data[0].jenis_ok === 'INCLUDE SOFTWARE') {
      tableColumnBank = [
        [
          { content: `BCA` },
          { content: `7405 8716 88` },
          { content: `PT. NAGATECH SISTEM INTEGRATOR` },
        ],
        [
          { content: `BANK MANDIRI` },
          { content: `132-00-6260-1688` },
          { content: `PT. NAGATECH SISTEM INTEGRATOR` },
        ],
      ];
      tableRowsBank.push();
    } else {
      tableColumnBank = [
        [{ content: `BCA` }, { content: `7405557878` }, { content: `BUDI KRISTIYANTO SH` }],
      ];
      tableRowsBank.push();
    }
    var height = 0;

    doc.autoTable({
      head: tableColumnBank,
      body: tableRowsBank,
      startY: -999999,
      theme: 'grid',
      pageBreak: 'auto',
      rowPageBreak: 'avoid',
      margin: { top: 10 },
      bodyStyles: {
        fontSize: 7,
        halign: 'center',
        valign: 'middle',
        textColor: '#fff',
      },
      headStyles: {
        fontSize: 7,
        fillColor: '#fff',
        textColor: '#fff',
        valign: 'middle',
        halign: 'center',
        lineWidth: 0.5,
        lineColor: '#fff',
      },
      didParseCell: function (HookData) {
        height = HookData.settings.startY;
      },
    });
    height = doc.lastAutoTable.finalY - height;
    topFooterRekening = doc.internal.pageSize.height - 32 - height;
    heightFooterRekening = height;
  }

  function printFooterFollowUP(doc, head) {
    let rowFo = [
      [
        {
          content: head.footer_desc,
          colSpan: 2,
        },
      ],
      [
        { content: `Hormat Kami ,`, styles: { halign: 'left', cellPadding: { left: 10 } } },
        { content: `Menyetujui ,`, styles: { halign: 'center' } },
      ],
      [{ content: `\n\n\n` }, { content: `\n\n\n` }],
      [
        {
          content: data[0]?.nama_staff ?? 'DEFAULT',
          styles: { halign: 'left', cellPadding: { left: 9 } },
        },
        { content: data[0].nama_customer, styles: { halign: 'center' } },
      ],
    ];
    var height = 0;
    doc.autoTable({
      head: [],
      body: rowFo,
      startY: -999999,
      theme: 'plain',
      pageBreak: 'auto',
      rowPageBreak: 'avoid',
      margin: { top: 10 },
      bodyStyles: {
        fontSize: 7,
        halign: 'left',
        valign: 'top',
        textColor: '#fff',
      },
      headStyles: {
        fontSize: 7,
        fillColor: '#fff',
        textColor: '#fff',
        valign: 'middle',
        halign: 'left',
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      didParseCell: function (HookData) {
        height = HookData.settings.startY;
      },
    });

    height = doc.lastAutoTable.finalY - height;
    heightFooterFollowUpTable = height;
    doc.autoTable({
      head: [],
      body: rowFo,
      startY: doc.internal.pageSize.height - heightFooterRekening - 27 - height - 3,
      theme: 'plain',
      pageBreak: 'auto',
      rowPageBreak: 'avoid',
      margin: { top: 10 },
      bodyStyles: {
        fontSize: 7,
        halign: 'left',
        valign: 'top',
      },
      headStyles: {
        fontSize: 7,
        fillColor: '#fff',
        textColor: '#000',
        valign: 'middle',
        halign: 'left',
        lineWidth: 0.0,
        lineColor: [0, 0, 0],
      },
    });
  }
  function calculateFooterFollowUP(doc, head) {
    let rowFo = [
      [
        {
          content: head.footer_desc,
          colSpan: 2,
        },
      ],
      [
        { content: `Hormat Kami ,`, styles: { halign: 'left', cellPadding: { left: 10 } } },
        { content: `Menyetujui ,`, styles: { halign: 'center' } },
      ],
      [{ content: `\n\n\n` }, { content: `\n\n\n` }],
      [
        { content: data[0].nama_staff, styles: { halign: 'left', cellPadding: { left: 9 } } },
        { content: data[0].nama_customer, styles: { halign: 'center' } },
      ],
    ];
    var height = 0;
    doc.autoTable({
      head: [],
      body: rowFo,
      startY: -999999,
      theme: 'plain',
      pageBreak: 'auto',
      rowPageBreak: 'avoid',
      margin: { top: 10 },
      bodyStyles: {
        fontSize: 7,
        halign: 'left',
        valign: 'top',
        textColor: '#fff',
      },
      headStyles: {
        fontSize: 7,
        fillColor: '#fff',
        textColor: '#fff',
        valign: 'middle',
        halign: 'left',
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      didParseCell: function (HookData) {
        height = HookData.settings.startY;
      },
    });

    height = doc.lastAutoTable.finalY - height;
    heightFooterFollowUpTable = height;
  }
};

export default OCPDF;
