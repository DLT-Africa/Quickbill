import ReactApexChart from "react-apexcharts";

const PieChart = ({paidInvoices, awaitingPayment, rejectedInvoices, overdueInvoices}) => {
    const options = {
      chart: {
        type: 'pie',
      },
      labels: ['Paid Invoices', 'Awaiting Payment', 'Rejected Invoices', 'Overdue Invoices'], // Replace with your own labels
      colors: ['#20c950',  'yellow', '#FF5733', '#5733FF',], // Replace with your desired colors
      legend: {
        show:true,
        position: 'bottom',
      }

    };
  
    const series = [paidInvoices?.length, awaitingPayment?.length, rejectedInvoices?.length, overdueInvoices?.length]; // Replace with your own data
  
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
  