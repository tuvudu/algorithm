const calculateRemember = (value) => {
  const currentNumber = value % 10;
  return (value >= 10 && (value - currentNumber) / 10) || 0;
};

const multiple = (a, b) => {
  const aArray = a.match(/.{1,1}/g).reverse();
  const bArray = b.match(/.{1,1}/g).reverse();
  const total = [];

  bArray.forEach((itemB, indexB) => {
    const valueMultiple1Item = [...new Array(indexB)].map(() => 0);
    let remember = 0;

    aArray.forEach((itemA, index) => {
      const value = Number(itemB) * Number(itemA) + remember;
      const currentNumber = value % 10;

      // update remember
      remember = calculateRemember(value);
      valueMultiple1Item.push(currentNumber);

      // set remember to last
      index === aArray.length - 1 &&
        remember &&
        valueMultiple1Item.push(remember);
    });

    total.push(valueMultiple1Item);
  });

  const result = [];
  let remember = 0;

  for (let index = 0; index < total[total.length - 1].length; index++) {
    let totalColumn = 0;

    total.forEach((arrayTotal) => {
      totalColumn += arrayTotal[index] || 0;
    });

    const value = totalColumn + remember;
    const currentNumber = value % 10;
    // update remember
    remember = calculateRemember(value);

    result.push(currentNumber);

    index === total[total.length - 1].length - 1 &&
      remember &&
      result.push(remember);
  }
  return result.reverse().join("");
};

const factorialFormula = (n, total = "1") => {
  if (n === 1) return total;
  total = multiple(`${n}`, total);
  return factorialFormula(n - 1, total);
};

factorialFormula(200);
