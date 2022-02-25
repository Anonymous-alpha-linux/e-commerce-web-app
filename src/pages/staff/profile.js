import React from "react";
import { Outlet } from "react-router-dom";
import { ContainerComponent } from "../../components";

export default function Profile() {

  return (
    <ContainerComponent>
      <Outlet></Outlet>
    </ContainerComponent>
  );
}
