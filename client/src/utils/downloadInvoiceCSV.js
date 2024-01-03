import Papa from 'papaparse';

export function generateCSVData(invoiceData) {
  // Customize this function based on your invoice data structure
  const csvData = invoiceData.map((invoice) => {
    const {
      invoiceNumber,
      issueDate,
      client,
      items,
      subTotalBeforeDiscount,
      totalDiscountValue,
      vatPercent,
      vatValue,
      grandTotal,
      invoiceStatus,
      currency,
      totalAmountReceived,
      remainingAmount,
    } = invoice;

    return [
      invoiceNumber,
      issueDate,
      client.name,
      items.map((item) => item.itemName).join(', '),
      subTotalBeforeDiscount,
      totalDiscountValue,
      vatPercent,
      vatValue,
      grandTotal,
      invoiceStatus,
      currency,
      totalAmountReceived,
      remainingAmount,
    ];
  });

  return Papa.unparse({
    fields: [
      'Invoice Number',
      'Issue Date',
      'Client Name',
      'Items',
      'Subtotal Before Discount',
      'Total Discount Value',
      'VAT Percent',
      'VAT Value',
      'Grand Total',
      'Invoice Status',
      'Currency',
      'Total Amount Received',
      'Remaining Amount',
    ],
    data: csvData,
  });
}


export function downloadCSV(invoiceData) {
    const csvData = generateCSVData(invoiceData);
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invoices.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  