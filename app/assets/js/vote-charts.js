let data = {
  labels: ['Mahada & Adel', 'Arix & Darmayasa'],
  datasets: [
    {
      label: 'Candidate Vote Counts',
      data: [34, 54],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
    },
  ],
};

let charts = new Chart($('#vote-charts'), {
  type: 'bar',
  data: data,
  animation: {
    animateScale: true,
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            drawBorder: false,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  },
});
