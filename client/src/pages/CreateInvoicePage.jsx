import React from "react";
import Invoice from "../components/Invoice";
import { Box } from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import SidebarWithHeader from "../components/SidebarWithHeader";

const CreateInvoicePage = () => {
  return (
    <SidebarWithHeader>


      {/* <NavBar/> */}
      <Invoice />

    </SidebarWithHeader>
  );
};

export default CreateInvoicePage;
