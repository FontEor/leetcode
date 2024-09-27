function minCM(list) { // N个数的最小公倍数
    if (list.length === 1) {
        return list[0]
    }
    return list.reduce((a, b) => {
        var total = max = Math.max(a, b);
        while (!(total % a === 0 && total % b === 0)) {
            total += max
        }
        return total
    })
}
console.log(minCM([2, 3, 5, 6]))