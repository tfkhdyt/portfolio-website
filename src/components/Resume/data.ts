export const ips = [3.5, 3.83, 3.9, 3.29];
const ipk: string = (
  ips.reduce((acc, cur) => acc + cur, 0) / ips.length
).toFixed(2);

export const nilaiSemester = [81.75, 83.96, 86.88, 86.17, 86.8, 87.15];
const nilaiRataSemester: string = (
  nilaiSemester.reduce((acc, cur) => acc + cur, 0) / nilaiSemester.length
).toFixed(2);

export const chartKuliahOptions = {
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Semester',
      },
    },
    y: {
      display: true,
      // beginAtZero: true,
      min: 3.0,
      // max: 4.0,
      /* ticks: {
        stepSize: 0.5,
      }, */
    },
  },
  plugins: {
    title: {
      display: true,
      text: `Grade Point Average ${ipk}`,
    },
  },
};

export const chartSMKOptions = {
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Semester',
      },
    },
    y: {
      display: true,
      // beginAtZero: true,
      // min: 3.0,
      // max: 4.0,
      // ticks: {
      //   stepSize: 0.1,
      // },
    },
  },
  plugins: {
    title: {
      display: true,
      text: `Grade Point Average ${nilaiRataSemester}`,
    },
  },
};
