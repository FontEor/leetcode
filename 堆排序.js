function shift(arr, low, high) {
    let i = low,
        j = 2 * i + 1
    let temp = arr[i]
    while (j <= high) {
        if (j < high && arr[j] < arr[j + 1]) {
            ++j
        }
        if (temp < arr[j]) {
            arr[i] = arr[j]
            i = j
            j = 2 * i + 1
        } else {
            break
        }
    }
    arr[i] = temp
}

function heapSort(arr) {
    let temp, len = arr.length
    for (let i = Math.floor(len / 2 - 1); i >= 0; --i) {
        shift(arr, i, len - 1)
    }
    for (let i = len - 1; i >= 1; --i) {
        temp = arr[0]
        arr[0] = arr[i]
        arr[i] = temp
        shift(arr, 0, i - 1)
    }
}

let arr = [49, 38, 65, 97, 76, 13, 27, 49]
heapSort(arr)
console.log(arr)