import BarChart from "./charts/BarChart";
import {
	barChartDataDailyTraffic,
	barChartOptionsDailyTraffic,
} from "./variables/charts";

const DashboardContent = () => {
	return (
		<BarChart
			chartData={barChartDataDailyTraffic}
			chartOptions={barChartOptionsDailyTraffic}
		/>
	);
};

export default DashboardContent;
