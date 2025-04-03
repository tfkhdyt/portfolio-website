const ctx2 = document.getElementById('chartSMK').getContext('2d')

const nilaiKelas = [81.75, 83.96, 86.88, 86.17, 86.8, 87.15]

let nilaiTotal = 0
nilaiKelas.forEach((e) => {
  nilaiTotal += e
})
nilaiTotal = (nilaiTotal / nilaiKelas.length).toFixed(2)

const chartSMK = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Nilai Semester',
        data: nilaiKelas,
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
        max: 100,
        ticks: {
          stepSize: 25
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Nilai Rata-rata Semester'
      },
      legend: {
        display: true
      },
      subtitle: {
        display: true,
        text: `Rata-rata Total: ${nilaiTotal}`
      }
    },
    barThickness: 30
  }
})
