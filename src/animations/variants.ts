export const variants = {
  fromBottom: {
    y: 25,
    opacity: 0,
  },
  toTop: {
    y: 0,
    opacity: 1,
  },
  fromLeft: {
    x: -25,
    opacity: 0,
  },
  toRight: {
    x: 0,
    opacity: 1,
  },
  startFade: {
    opacity: 0,
  },
  endFade: {
    opacity: 1,
  },
  fromLeftFast: {
    x: -25,
    opacity: 0,
    transition: {
      duration: 5,
    },
  },
  exitToRight: {
    x: 25,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};
