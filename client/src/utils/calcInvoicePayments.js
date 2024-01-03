import { convertCurrency } from './currencyConverter'; // Import the conversion function

export async function calcPayments(invoiceData) {
  let totalReceived = 0;
  let totalAwaitingBalance = 0;
  const awaitingPayments = [];

 
  try {
    // Filter and convert amounts to USD using Promise.all and filtering
    await Promise.all(
      invoiceData
        .filter(
          (invoice) =>
            !['Rejected', 'OverDue'].includes(invoice.invoiceStatus) // Filter out rejected and overdue invoices
        )
        .map(async (invoice) => {
          try {
            invoice.grandTotal = await convertCurrency(invoice.grandTotal, invoice.currency, 'USD');
            invoice.paymentRecords = await Promise.all(
              invoice.paymentRecords.map(async (record) => {
                const convertedAmount = await convertCurrency(record.amountPaid, invoice.currency, 'USD');
                return { ...record, amountPaid: convertedAmount };
              })
            );

            const receivedAmount = invoice.paymentRecords.reduce(
              (sum, record) => sum + record.amountPaid,
              0
            );
            totalReceived += receivedAmount;

            const remainingAmount = invoice.grandTotal - receivedAmount;
            if (remainingAmount > 0) {
              awaitingPayments.push({
                invoiceNumber: invoice.invoiceNumber,
                remainingAmount: remainingAmount,
              });
              totalAwaitingBalance += remainingAmount;
            }
          } catch (error) {
            // Handle errors during currency conversion
            console.error('Error converting currency for invoice:', invoice.invoiceNumber, error);
            // Implement specific error handling strategies
          }
        })
    );
  } catch (error) {
    // Handle any errors during Promise.all or overall process
    console.error('Error during payment calculations:', error);
    // Implement appropriate error handling
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return {
    totalReceived: formatter.format(totalReceived),
    awaitingPayments: awaitingPayments.map((payment) => ({
      ...payment,
      remainingAmount: formatter.format(payment.remainingAmount),
    })),
    totalAwaitingBalance: formatter.format(totalAwaitingBalance),
  };
}
