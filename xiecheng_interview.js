function moneyFormat(money) {
  let moneyStr = money.toFixed(2)
  let moneyInt = moneyStr.substring(0, moneyStr.indexOf('.'))
  let moneyDot = moneyStr.substring(moneyStr.length, moneyStr.indexOf('.'))
  let formatInt = ''
  for (let i = moneyInt.length - 1; i >= 0; i--) {
    if (i % 3 === 0 && formatInt.length > 0 && i != 0) {
      formatInt = `,${moneyInt[i]}${formatInt}`
    } else {
      formatInt = moneyInt[i] + formatInt
    }
  }
  return formatInt + moneyDot
}
let money = 123456.789
let result = moneyFormat(money)
console.log(result)

// 2  3  5  4  1