import React from "react";
import { ContainerComponent, BarChart } from "../../components";
import { Chart, DashboardOverview, Crud } from "../../containers";

export default function Dashboard() {
  return (
    <ContainerComponent className="dashboard__root">
      <ContainerComponent.Pane className="overview__container">
        <DashboardOverview></DashboardOverview>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane style={{ maxWidth: '650px', height: '100%', maxHeight: '420px', borderRadius: '20px', border: '1px solid #000', boxShadow: '2px 2px 3px' }}>
        <BarChart></BarChart>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane style={{ maxWidth: '650px' }}>
        <BarChart></BarChart>
      </ContainerComponent.Pane>
    </ContainerComponent>
  );
}
