import React, { useEffect } from "react";
import { ContainerComponent } from "../../components";
import { DashboardOverview } from "../../containers";
import { useAdminContext } from '../../redux';
import { Bar, PolarArea, Pie } from 'react-chartjs-2';
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

export default function Dashboard() {
  return (
    <ContainerComponent style={{ background:"#A9C39E"}} className="dashboard__root">
      <ContainerComponent.Pane style={{ padding: "15px", margin: "20px 10px", borderRadius: "10px", background:"#DCE7D7",overflow:"hidden"}} className="workspace__innerForm">
        <DashboardOverview></DashboardOverview>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane style={{ margin: "10px", border: "none", padding: '15px 15px', overflowX: 'scroll', borderRadius: "10px", background: "#DCE7D7", overflow: "hidden" }}>
        <ContainerComponent.Inner style={{background:"#fff", maxWidth: '640px', height: '100%', borderRadius: '10px', margin: '0 auto', }}>
          <MostLikedPosts></MostLikedPosts>
        </ContainerComponent.Inner>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane style={{ margin: "20px 10px", border: "none", padding: '15px 15px', overflowX: 'scroll', borderRadius: "10px", background: "#DCE7D7", overflow: "hidden"}}>
        <ContainerComponent.Inner style={{background:"white", maxWidth: '640px', height: '100%', borderRadius: '10px', margin: '0 auto' }}>
          <MostCategory></MostCategory>
        </ContainerComponent.Inner>
      </ContainerComponent.Pane>
    </ContainerComponent>
  );
}

function MostLikedPosts() {
  const { statistics: { mostLikePosts }, getMostLikePosts } = useAdminContext();
  let barData = {
    id: "1",
    labels: mostLikePosts.map(post => post.title),
    datasets: [
      {
        data: mostLikePosts.map(post => post.like),
        borderColor: "black",
        backgroundColor: ['rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
          "#33EFAB", "#40916C", "#333"],
        fill: true
      }
    ]
  }
  useEffect(() => {
    getMostLikePosts();
  }, []);
  return (
    <PolarArea width={'100%'} height={'100%'}
      options={{ responsive: true, plugins: { title: { display: true, text: 'Top 3 most favorite post' } }, legend: { display: true, position: "bottom" } }}
      data={barData}></PolarArea>)
}

function MostCategory() {
  const { statistics: { mostCategories }, getMostCategory
  } = useAdminContext();
  let barData = {
    id: "1",
    labels: mostCategories.map(c => c.name),
    datasets: [
      {
        data: mostCategories.map(c => c.count),
        borderColor: "black",
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
          "#33EFAB", "#40916C", "#333"],
        fill: true
      }
    ]
  }
  useEffect(() => {
    getMostCategory();
  }, []);

  return (
    <Pie width={'100%'} height={'100%'}
      options={{ responsive: true, plugins: { title: { display: true, text: 'Top 5 most essential categories' } }, legend: { display: true, position: "bottom" } }}
      data={barData}></Pie>)
}