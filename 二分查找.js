var arr = [13, 18, 19, 52, 76, 98, 123, 456, 789]

function fuc(arr, val) {
    let i = 0;
    let j = arr.length - 1
    while (i < j) {
        let temp = parseInt((i + j) / 2)
        if (arr[temp] == val) {
            return temp
        } else if (arr[temp] > val) {
            j = temp - 1
        } else {
            i = temp + 1
        }
    }
    return -1
}
console.log(fuc(arr, 76))