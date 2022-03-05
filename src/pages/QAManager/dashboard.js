import React from 'react'
import { ContainerComponent } from '../../components'
import { Chart, DashboardOverview } from '../../containers'

export default function Dashboard() {
    return (
        <ContainerComponent>
            <div>Dashboard for QA manager</div>
            {/* // Overview Container: not completed design */}
            <ContainerComponent.Pane className="overview__container">
                <DashboardOverview></DashboardOverview>
            </ContainerComponent.Pane>
            {/* // The list of each post on workspace */}
            <ContainerComponent.Pane>
                {/* Chart.Column Container */}
                <Chart.Column></Chart.Column>
            </ContainerComponent.Pane>


            <ContainerComponent.Pane>
                {/* Chart.Column Container */}
                <Chart.Column></Chart.Column>
            </ContainerComponent.Pane>
        </ContainerComponent>

    )
}
