// 简单异步编码
// 模拟红绿灯：先打印红灯，3秒后打印绿灯，2秒后打印黄灯，1秒后再打印红灯
function lightDelay(color, delay) {
    return new Promise((resolve) => {
        let timer = setTimeout(() => {
            console.log(color)
            resolve(timer)
        }, delay)
    })
}
async function oneLight() {
    console.log("红灯")
    let timer1 = await lightDelay("绿灯", 3000)
    let timer2 = await lightDelay("黄灯", 2000)
    let timer3 = await lightDelay("红灯", 1000)
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
}
oneLight()
    // setInterval(() => {
    //     oneLight()
    // }, 6000);