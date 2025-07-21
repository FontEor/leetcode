function randomNum() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let flag = Math.floor(Math.random() * 2);
      if (flag == 1) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 2000);
  });
}
randomNum().then((res) => {
  console.log(res);
});