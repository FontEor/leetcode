function fnc(arr1, arr2) {
    arr1.sort((a, b) => {
        return a - b
    })
    arr2.sort((a, b) => {
        return a - b
    })
    let result = 0
    for (let i = 0; i < arr1.length; i++) {
        let left = 0,
            right = arr2.length - 1
        while ((right - left) > 1) {
            let mid = parseInt((right - left) / 2)
            if (arr1[i] == arr2[mid]) {
                left = mid
                right = mid
            } else if (arr1[i] > arr2[mid]) {
                left = mid
            } else {
                right = mid
            }
        }
        let temp = Math.min(Math.abs(arr1[i] - arr2[left]), Math.abs(arr1[i] - arr2[right]))
        result = result > temp ? result : temp
    }
    return result
}