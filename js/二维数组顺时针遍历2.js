let arr = [
    ['q', 'w', 'e', 'f'],
    ['a', 'w', 'a', 'd'],
    ['s', 0, 0, 's'],
    ['a', 's', 'd', 'f']
]
let s = ''

function fnc(arr, n, s) {
    let count = 0
    let drecion = 0 //表示方向
    let i = 0
    let j = 0
    let p = n - 1
    let q = n - 1
    while (count < n * n) {
        drecion = j
        while (drecion <= q) { //向右
            if (arr[i][drecion]) {
                s += arr[i][drecion]
            }
            count++
            drecion++
        }
        i++
        drecion = i
        while (drecion <= p) { //向下
            if (arr[drecion][q]) {
                s += arr[drecion][q]
            }
            count++
            drecion++
        }
        q--
        drecion = q
        while (drecion >= j) { //向左
            if (arr[p][drecion]) {
                s += arr[p][drecion]
            }
            count++
            drecion--
        }
        p--
        drecion = p
        while (drecion >= i) { //向上
            if (arr[drecion][j]) {
                s += arr[drecion][j]
            }
            count++
            drecion--
        }
        j++
    }
    console.log(s)
}
fnc(arr, 4, s)