export function moneyConversion(row) {
  let n = parseFloat((row.money) / 100);
  if (!n) {
    return 0
  } else {
    return n
  }
}
