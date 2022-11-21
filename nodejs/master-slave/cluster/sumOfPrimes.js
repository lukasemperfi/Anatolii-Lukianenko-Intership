export const sumOfPrimes = (n) => {
  let sum = 0;

  for (var i = 2; i <= n; i++) {
    for (var j = 2; j <= i / 2; j++) {
      if (i % j === 0) {
        break;
      }
    }
    if (j > i / 2) {
      sum += i;
    }
  }
  return sum;
};
