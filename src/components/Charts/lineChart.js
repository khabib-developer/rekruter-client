import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DateObject from 'react-date-object'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const data = (proposals, forms, from, to) => {
  const arr = []

  from = Date.parse(from)
  to = Date.parse(to)
  const interval = (to - from) / 86400000

  for(let i = 0; i < interval; i++) {
    const d = new DateObject(to)
    arr.push(d.format("DD.MM.YYYY"))
    to = to - 86400000
  }  

  const datasets = forms.map(e => {

    const arr1 = arr.map(item => 
        proposals.filter(el => el.name_of_form === e.title)
          .filter(obj => {
            const d = new DateObject(+obj.date) 
            return d.format("DD.MM.YYYY") === item
          } ).length,
      )


    const color = getRandomColor()
    return {
      label:e.title,
      data: arr1.reverse(),
      borderColor: color,
      backgroundColor: color,
    }
  })

  return {
    labels:arr.reverse(),
    datasets
  }
};

export function LineChart({proposals, forms, from , to}) {
  if(proposals.length === 0)
    return null
  return <Line options={options} data={data(proposals, forms, from, to)} />;
}
