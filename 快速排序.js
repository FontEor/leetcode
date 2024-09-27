var arr = [30, 5, 3, 6, 9, 16, 13, 78, 52, 46, 79, 20];

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let temp = arr[0];
  let leftArr = [],
    rightArr = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > temp) {
      rightArr.push(arr[i]);
    } else {
      leftArr.push(arr[i]);
    }
  }
  return [...quickSort(leftArr), temp, ...quickSort(rightArr)];
}

console.log(quickSort(arr));
