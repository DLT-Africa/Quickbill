import ReactApexChart from "react-apexcharts";

const PieChart = ({paidInvoices, awaitingPayment, rejectedInvoices, overdueInvoices, partiallyPaid}) => {
    const options = {
      chart: {
        type: 'pie',
      },
      labels: ['Paid Invoices', 'Partially Paid', 'Awaiting Payment', 'Rejected Invoices', 'Overdue Invoices'], // Replace with your own labels
      colors: ['#20c950', '#7d85f5', '#a89932', '#FF5733', '#E40DC4',], // Replace with your desired colors
      legend: {
        show:true,
        position: 'bottom',
      }

    };
  
    const series = [paidInvoices?.length, partiallyPaid?.length, awaitingPayment?.length, rejectedInvoices?.length, overdueInvoices?.length]; // Replace with your own data
  
    return (
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={350}
      />
    );
  };
  
  export default PieChart;
  