function processTime (time) {
  let retTime = time;
  retTime /= 1000;

  let minutes = 0;
  while (retTime >= 60) {
    retTime -= 60;
    minutes++;
  }

  const totalTime = minutes.toString() + 'm' + retTime.toString() + 's';
  return totalTime;
}

export default processTime;
