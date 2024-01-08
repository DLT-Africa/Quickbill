import React from "react";
// import Employees from "../components/Employees";
import SidebarWithHeader from "../components/SidebarWithHeader";
import Employees from "@/components/employees/Employees";

const EmployeesPage = () => {
  return (
    <SidebarWithHeader>

      <Employees />
      </SidebarWithHeader>

  );
};

export default EmployeesPage;
