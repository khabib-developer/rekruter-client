import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = (labels, proposals) => {
    const arr = labels.map(element => proposals.filter(e => e.name_of_form).filter(e => (e.name_of_form === element.title) && (e.state === 'fail')).length);
    const arr1 = labels.map(element => proposals.filter(e => e.name_of_form).filter(e => (e.name_of_form === element.title) && (e.state === 'success')).length);
    const arr2 = labels.map(element => proposals.filter(e => e.name_of_form).filter(e => (e.name_of_form === element.title) && (e.state === 'selected')).length);
    const arr3 = labels.map(element => proposals.filter(e => e.name_of_form).filter(e => (e.name_of_form === element.title) && (e.state === null)).length);
    
    return {
    labels:labels.map(e => e.title).sort((a, b) => +a.id - +b.id),
    datasets: [
            {
            label: 'Отказы',
            data: arr,
            backgroundColor: 'rgb(255, 99, 132)',
            },
            {
            label: 'Успешные сделки',
            data:  arr1,
            backgroundColor: 'rgb(75, 192, 192)',
            },
            {
            label: 'Избранное',
            data:  arr2,
            backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'В процессе',
                data:  arr3,
                backgroundColor: 'rgb(255, 206, 86)',
            },
        ],
    }
};

export function StackedBar({labels, proposals}) {
    if(labels.length === 0 || proposals.length === 0) 
        return null
    return <Bar options={options} data={data(labels, proposals)} />;
}
