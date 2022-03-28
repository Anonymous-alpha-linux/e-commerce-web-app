import React from "react";
import { BarChart, ContainerComponent } from "../../components";
import { DashboardOverview } from "../../containers";

function Dashboard() {
  return (
    <>
      <ContainerComponent className="dashboard__root">
        <ContainerComponent.Pane className="overview__container">
          <DashboardOverview></DashboardOverview>
        </ContainerComponent.Pane>
        <ContainerComponent.Pane style={{ padding: '32px 10px', overflowX: 'scroll' }}>
          <ContainerComponent.Inner style={{ maxWidth: '650px', height: '100%', borderRadius: '20px', border: '1px solid #000', margin: '0 auto', }}>
            <BarChart></BarChart>
          </ContainerComponent.Inner>
        </ContainerComponent.Pane>
        <ContainerComponent.Pane style={{ padding: '32px 10px', overflowX: 'scroll' }}>
          <ContainerComponent.Inner style={{ maxWidth: '650px', height: '100%', borderRadius: '20px', border: '1px solid #000', margin: '0 auto' }}>
            <BarChart></BarChart>
          </ContainerComponent.Inner>
        </ContainerComponent.Pane>
      </ContainerComponent>
    </>
  );
}

export default Dashboard;
