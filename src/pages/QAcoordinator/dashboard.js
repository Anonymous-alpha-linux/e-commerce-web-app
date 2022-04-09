import React, { useEffect, useState } from "react";
import { ContainerComponent } from "../../components";
import { DashboardOverview } from "../../containers";
import { useAdminContext, useAuthorizationContext, usePostContext, useWorkspaceContext } from '../../redux';
import { PolarArea, Pie } from 'react-chartjs-2';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import { QACoordinatorWorkspaceOverview } from ".";


Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);

export default function QACDashboard() {
    return (
        <ContainerComponent style={{ backgroundColor: '#A9C39E' }} className="dashboard__root">
            <ContainerComponent.Inner style={{ padding: "15px", borderRadius: "10px", background: "#DCE7D7", overflow: "hidden" }}>
                <ContainerComponent.Pane className="overview__container">
                    <QACoordinatorWorkspaceOverview></QACoordinatorWorkspaceOverview>
                </ContainerComponent.Pane>
            </ContainerComponent.Inner>

            <ContainerComponent.Inner style={{ margin: "20px", padding: "15px", borderRadius: "10px", background: "#DCE7D7", overflow: "hidden" }}>
                <ContainerComponent.Pane style={{ backgroundColor: "white", padding: '15px 15px', overflowX: 'scroll', borderRadius: "10px" }}>
                    <ContainerComponent.Inner style={{ maxWidth: '650px', height: '100%', borderRadius: '20px', border: '1px solid #000', margin: '0 auto', }}>
                        <MostLikedPosts></MostLikedPosts>
                    </ContainerComponent.Inner>
                </ContainerComponent.Pane>
            </ContainerComponent.Inner>

        </ContainerComponent>
    );
}

function MostLikedPosts() {
    const { user } = useAuthorizationContext();
    const { workspace } = useWorkspaceContext();
    const { filterPost } = usePostContext();

    const [mostLikePosts, setMostLikePosts] = useState([]);
    let barData = {
        id: "1",
        labels: mostLikePosts.map(post => post.title),
        datasets: [
            {
                data: mostLikePosts.map(post => post.like),
                borderColor: "black",
                backgroundColor: [
                    "green",
                    "#33EFAB", "#40916C", "#333",
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)',
                ],
                fill: true
            }
        ]
    }

    useEffect(() => {
        filterPost(1, data => {
            if (!data.error) {
                setMostLikePosts(data);
            }
        })
    }, [user.workspace, workspace]);
    return (
        <PolarArea width={'100%'} height={'100%'}
            options={{ responsive: true, plugins: { title: { display: true, text: 'Top 3 most favorite post' } }, legend: { display: true, position: "bottom" } }}
            data={barData}></PolarArea>)
}