import React from 'react';
import {Bar} from 'react-chartjs-2';
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

export default function BarChart(){
  const barData = {
    labels:["October", "November", "December"],
    datasets:[
      {
        data: [10, 20, 50],
        label: "Data1",
        borderColor: "black",
        backgroundColor: "red",
        fill: true
      },
      {
        data: [40, 70, 55],
        label: "Data2",
        borderColor: "black",
        backgroundColor: "blue",
        fill: true
      },
      {
        data: [12, 30, 10],
        label: "Data3",
        borderColor: "black",
        backgroundColor: "green",
        fill: true
      },
      {
        data: [82, 40, 35],
        label: "Data4",
        borderColor: "black",
        backgroundColor: "purple",
        fill: true
      },
    ]
  }
  return(
    <Bar
      type="bar"
      width={'100%'}
      height={100}
      options={{
        title:{
          display: true,
          text: "Test Data",
          fontSize: 30
        },
        legend:{
          display: true,
          position: "bottom"
        }
      }}
      data={barData}
    />
  )
}