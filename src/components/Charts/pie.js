import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = arr => ({
  labels: [`Успешные сделки `, 'Отказы', 'Избранное', 'В процессе', ],
  datasets: [
    {
      label: '# of Votes',
      data: [
          arr.filter(e => e.state === 'success').length, 
          arr.filter(e => e.state === 'fail').length, 
          arr.filter(e => e.state === 'selected').length, 
          arr.filter(e => e.state === null).length],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
})

export const PieChart = ({arr}) => <Pie data={data(arr)} options={{responsive: true}} />
