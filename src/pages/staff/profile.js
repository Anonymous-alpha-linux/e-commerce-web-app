import React from "react";
import { ContainerComponent } from "../../components";
import { Personal } from "../../containers";
import { ManagerInfo } from "../../containers";

export default function Profile() {
  return (
    <ContainerComponent>
      <Personal></Personal>;<ManagerInfo></ManagerInfo>
    </ContainerComponent>
  );
}
