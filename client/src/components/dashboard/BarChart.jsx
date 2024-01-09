import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { convertCurrency } from '../../utils/currencyConverter';

function BarChart({ invoiceData }) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Amount Received',
        data: Array(12).fill(0), // Initialize with zeros for all months
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
      },
      yaxis: {
        title: {
          text: '$ (USD)',
        },
        labels: {
          formatter: function (value) {
            return `$${value.toFixed(2)}`;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `$${val.toFixed(2)}`;
          },
        },
      },    },
  });

  async function processData() {
    const monthlyAmountsUSD = Array(12).fill(0);
  
    for (const invoice of invoiceData) {
      if (['Partially Paid', 'Paid'].includes(invoice.invoiceStatus)) {
        for (const payment of invoice.paymentRecords) {
          const paymentDate = new Date(payment.paymentDate);
          const month = paymentDate.getMonth();
          const amountPaid = payment.amountPaid;
          const currency = invoice.currency;
  
          try {
            const amountPaidUSD = await convertCurrency(amountPaid, currency, 'USD');
            monthlyAmountsUSD[month] += amountPaidUSD;
          } catch (error) {
            console.error('Error converting payment amount:', error);
            // ... handle conversion errors ...
          }
        }
      }
    }

    const currentMonthIndex = new Date().getMonth();
    const offset = 12 - (currentMonthIndex + 1); // Adjust for 0-based indexing

    // Slice and rearrange data and categories
    const shiftedMonthlyAmounts = [...monthlyAmountsUSD.slice(-offset), ...monthlyAmountsUSD.slice(0, -offset)];
    const shiftedMonthNames = [...monthNames.slice(-offset), ...monthNames.slice(0, -offset)];
  
     setChartData((prevChartData) => ({
      ...prevChartData,
      series: [{ data: shiftedMonthlyAmounts }],
      options: {
        ...prevChartData.options,
        xaxis: {
          categories: shiftedMonthNames, // Update categories with shifted months
        },
      },
    }));
  }

  useEffect(() => {
    async function handleDataProcessing() {
      await processData(); // Call processData within an async function
    }

    handleDataProcessing();
  }, [invoiceData]);


  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
}

export default BarChart;
