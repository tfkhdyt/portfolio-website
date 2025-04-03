const ctx = document.getElementById('chartKuliah').getContext('2d')

const ips = [3.5, 3.83, 3.9]

let ipk = 0
ips.forEach((e) => {
  ipk += e
})
ipk = (ipk / ips.length).toFixed(2)

const chartKuliah = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [
      {
        label: 'IPS',
        data: ips,
        backgroundColor: '#0563bb7a',
        borderColor: '#0563bb7a',
        fill: true,
        pointHitRadius: 10
      }
    ]
  },
  options: {
    aspectRatio: 1.3,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Semester'
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        min: 0,
        max: 4.0,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Indeks Prestasi Semester'
      },
      legend: {
        display: true
      },
      subtitle: {
        display: true,
        text: `IPK: ${ipk}`
      }
    },
    barThickness: 30
  }
})
