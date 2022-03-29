import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../containers";
import { AdminContext } from "../../redux";

export default function QAManager() {
  //   const [modal, setModal] = useState(null);
  //   const modalElement = useRef(null);
  return (
    <AdminContext>
      <DashboardHeader>
        <Outlet></Outlet>
      </DashboardHeader>
    </AdminContext>
  );
}
