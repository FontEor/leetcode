function func(str) {
    let num = 0,
        newStr = str.toLowerCase(),
        map = new Map()
    map.set('0', 0).set('1', 1).set('2', 2).set('3', 3).set('4', 4).set('5', 5).set('6', 6).set('7', 7).set('8', 8).set('9', 9).set('a', 10).set('b', 11).set('c', 12).set('d', 13).set('e', 14).set('f', 15)
    for (let i = newStr.length - 1; i >= 0; i--) {
        num += map.get(newStr[i]) * Math.pow(16, i);
    }
    return num
}
console.log(func("FFFF"))

console.log(Number("0xFFFF"))