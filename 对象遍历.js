const obj = {
    a: {
        b: {
            c: 100
        }
    }
}

function get(obj, path, defaultValue) {
    let arr = path.split(".")
    for (let i = 0; i < arr.length; i++) {
        if (obj[arr[i]]) {
            obj = obj[arr[i]]
        } else {
            return defaultValue
        }
    }
    return obj
}
get(obj, "a.b.c.d", 10)