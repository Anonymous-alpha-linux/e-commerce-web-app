import React from "react";
import { ContainerComponent } from "../../components";
import { Nav } from "..";
import { Outlet } from "react-router-dom";
export default function Staff() {
  return <>
    <Nav></Nav>
    <ContainerComponent className="staff__root" style={{
      background:"#A9C39E",
      width:"100%",
      height: 'fix-content'
    }}>
      <Outlet></Outlet>
    </ContainerComponent>
  </>
}
