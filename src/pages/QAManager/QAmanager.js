import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../containers";
import { AdminContext } from "../../redux";

export default function QAManager() {
  return (
    <AdminContext>
      <DashboardHeader>
        <Outlet></Outlet>
      </DashboardHeader>
    </AdminContext>
  );
}
