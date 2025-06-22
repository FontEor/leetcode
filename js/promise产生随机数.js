function f() {
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
f().then((res) => {
  console.log(res);
});
