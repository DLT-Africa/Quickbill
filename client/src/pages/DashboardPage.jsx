import React from "react";
import Dashboard from "../components/dashboard/Dashboard";
import SidebarWithHeader from "../components/SidebarWithHeader";

const DashboardPage = () => {
	return (
		<SidebarWithHeader>
			<Dashboard />
		</SidebarWithHeader>
	);
};

export default DashboardPage;
