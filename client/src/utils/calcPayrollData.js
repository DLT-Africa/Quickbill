
export function calcPayrollData(payrollData) {
  let totalPaid = 0;
  const awaitingPayment = [];

  payrollData
    .filter((payroll) => payroll.paymentStatus !== 'Voided')
    .forEach((payroll) => {
      const netPay = payroll.salary; // Assuming salary is equivalent to net pay
      switch (payroll.paymentStatus) {
        case 'Paid':
          totalPaid += netPay;
          break;
        case 'Awaiting Payment':
          awaitingPayment.push({
            employeeId: payroll.employeeId._id,
            payrollNumber: payroll.payrollNumber,
            paymentDate: payroll.paymentDate,
            netPay,
          });
          break;
      }
    });

  // Calculate total awaiting balance
  const totalAwaitingBalance = payrollData
    .filter((payroll) => payroll.paymentStatus === 'Awaiting Payment')
    .reduce((sum, payroll) => sum + payroll.salary, 0);

    console.log(totalAwaitingBalance)
  // Format amounts
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const totalPaidFormatted = formatter.format(totalPaid);
  const totalAwaitingBalanceFormatted = formatter.format(totalAwaitingBalance);

  // Format net pay for each awaiting payment
  const awaitingPaymentFormatted = awaitingPayment.map((payroll) => ({
    ...payroll,
    netPay: formatter.format(payroll.netPay),
  }));

  // Return formatted results
  return {
    totalPaid: totalPaidFormatted,
    totalAwaitingBalance: totalAwaitingBalanceFormatted,
    awaitingPayment: awaitingPaymentFormatted,
  };
}