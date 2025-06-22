/**
 * 节流
 * @param {Function} fn
 * @param {Number} delay 延迟时间 
 */
function throttle(fn, delay) {
    var t = null,
        begin = new Date().getTime();
    return function() {
        var cur = new Date().getTime();
        clearTimeout(t);
        // 时间间隔大于延迟时间则进入
        if (cur - begin >= delay) {
            fn.apply(this, arguments);
            begin = cur;
        } else {
            t = setTimeout(function() {
                fn.apply(this, arguments);
            }, delay);
        }
    }
}