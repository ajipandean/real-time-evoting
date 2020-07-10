// Extract candidates data from server
let candidates = JSON.parse($('#vote-bar-chart').attr('data-candidates'));
let candidateNames = candidates.map(function(c) {
  return c.president.split(' ')[0] + ' & ' + c.vicePresident.split(' ')[0];
});
let candidateVotes = candidates.map(function(c) {
  return c.vote;
});

// Construct data to display to chart
const data = {
  labels: candidateNames,
  datasets: [
    {
      label: 'Candidate vote counts',
      data: candidateVotes,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    },
  ],
};

// Instantiate the chart
const voteBarChart = new Chart($('#vote-bar-chart'), {
  type: 'bar',
  data: data,
  animation: {
    animateScale: true,
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

const socket = io();

socket.on('vote', function(n) {
  data.datasets[0].data = n.map(function(c) {
    return c.vote;
  });
  voteBarChart.update();
});
