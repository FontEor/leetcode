var spiralOrder = function(matrix) {
    let arr = []
    let m = matrix.length
    let n = matrix[0].length
    let sum = m * n
    let count = 1
    let i = 0,
        j = 0
    let p = 0
    while (p < sum) {
        while (count % 4 == 1) { //向右
            if ((matrix[i][j] != 101) && j < n && i < m) {
                arr.push(matrix[i][j])
                matrix[i][j] = 101
                j++
            } else {
                count++
            }
            p++
        }
        j--
        while (count % 4 == 2) { //向下
            if ((matrix[i][j] != 101) && i < m && j < n) {
                arr.push(matrix[i][j])
                matrix[i][j] = 101
                i++
            } else {
                count++
            }
            p++
        }
        i--
        while (count % 4 == 3) { //向左
            if ((matrix[i][j] != 101) && j >= 0 && i >= 0) {
                arr.push(matrix[i][j])
                matrix[i][j] = 101
                j--
            } else {
                count++
            }
            p++
        }
        j++
        while (count % 4 == 0) { //向上
            if ((matrix[i][j] != 101) && j >= 0 && i >= 0) {
                arr.push(matrix[i][j])
                matrix[i][j] = 101
                i--
            } else {
                count++
            }
            p++
        }
        i++
    }
    console.log(arr)
};
spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])