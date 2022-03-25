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

export default function BarChart({ data }) {

  let barData = {
    labels: ["October", "November", "December", "January", "February", "March", "April"],
    datasets: [
      {
        data: [10, 20, 50, 10, 20, 50, 10, 20, 50, 10, 20, 50, 10, 20, 50, 10, 20, 50],
        label: "Post",
        borderColor: "black",
        backgroundColor: ["#33EFAB", "#40916C"],
        fill: true
      }
    ]
  }

  return (
    <Bar
      type="bar"
      width={'100%'}
      height={'100%'}
      options={{
        responsive: true,
        title: {
          display: true,
          text: "Test Data",
          fontSize: 30
        },
        legend: {
          display: true,
          position: "bottom"
        }
      }}
      data={barData}
    ></Bar>)
}