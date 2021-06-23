function formatMoney(money) {
  let moneyStr = money.toFixed(2)
  let intMoney = moneyStr.substring(0, moneyStr.indexOf('.'))
  let dotMoney = moneyStr.substring(moneyStr.length, moneyStr.indexOf('.'))
  let formatInt = ''
  for (let i = intMoney.length - 1; i >= 0; i--) {
    console.log(i)
    console.log(intMoney[i])
    if (i % 3 === 0 && formatInt.length > 2) {
      
      console.log(intMoney[i])
      // console.log(formatInt)
      formatInt = `,${intMoney[i]}` + formatInt
      // console.log(formatInt)
    }
    formatInt = intMoney[i] + formatInt
    console.log(formatInt)
  }
  return formatInt + dotMoney
}

let money = 1234.12
let result = formatMoney(money)
console.log(result)