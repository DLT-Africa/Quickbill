import React from "react";
import Invoice from "../components/createInvoice/Invoice";

import SidebarWithHeader from "../components/SidebarWithHeader";

const CreateInvoicePage = () => {
  return (
    <SidebarWithHeader>

      <Invoice />

    </SidebarWithHeader>
  );
};

export default CreateInvoicePage;
