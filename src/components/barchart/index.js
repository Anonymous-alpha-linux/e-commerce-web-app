import React from 'react';
import { Bar } from 'react-chartjs-2';
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
export default function BarChart() {
  let barData = {
    id: "1",
    labels: ["October", "November", "December", "January", "February", "March", "April"],
    datasets: [
      {
        data: [10, 20, 50, 10, 20, 50, 10, 20, 50, 10, 20, 50, 10, 20, 50, 10, 20, 50],
        borderColor: "black",
        backgroundColor: ["#33EFAB", "#40916C"],
        fill: true
      }
    ]
  }

  return (
    <Bar type="bar" width={'100%'} height={'100%'}
      options={{ responsive: true, plugins: { title: { display: true, text: 'Top 3 most favorite post' } }, legend: { display: true, position: "bottom" } }}
      data={barData}></Bar>)
}