import React from "react";
import { Outlet } from "react-router-dom";
import { AccountCrud } from "../../containers";
import { AdminContext } from "../../redux";

export default function Admin() {
  return (
    <AdminContext>
      <Outlet></Outlet>
    </AdminContext>
  );
}
