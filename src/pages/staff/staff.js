import React from "react";
import { ContainerComponent } from "../../components";
import { Nav } from "..";
import { Outlet } from "react-router-dom";
import { AdminContext } from "../../redux";
export default function Staff() {
  return <AdminContext>
    <Nav></Nav>
    <ContainerComponent className="staff__root" style={{
      background: "#A9C39E",
      width: "100%",
      minHeight: "100vh"
    }}>
      <Outlet></Outlet>
    </ContainerComponent>
  </AdminContext>
}
