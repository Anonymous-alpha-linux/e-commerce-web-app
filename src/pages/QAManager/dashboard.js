import React from "react";
import { ContainerComponent, BarChart } from "../../components";
import { Chart, DashboardOverview, Crud } from "../../containers";

export default function Dashboard() {
  return (
    <ContainerComponent>
      {/* // Overview Container: not completed design */}
      <ContainerComponent.Pane className="overview__container">
        <DashboardOverview></DashboardOverview>
      </ContainerComponent.Pane>
      {/* // The list of each post on workspace */}
      <Crud></Crud>
      <ContainerComponent.Pane style={{ maxWidth: '650px' }}>
        {/* Chart.Column Container */}
        <BarChart></BarChart>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane style={{ maxWidth: '650px' }}>
        {/* Chart.Column Container */}
        <BarChart></BarChart>
      </ContainerComponent.Pane>
    </ContainerComponent>
  );
}
