import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function BarChart() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Net Profit',
        data: [0, 44, 55, 57, 56, 61, 58, 63, 60, 66, 80, 0],
      },
    //   {
    //     name: 'Revenue',
    //     data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    //   },
    //   {
    //     name: 'Free Cash Flow',
    //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    //   },
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `$${val} thousands`;
          },
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
}

export default BarChart;
