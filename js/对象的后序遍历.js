var tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
}
let arr = []

function fuc(obj, arr) {
    if (obj == null) {
        return []
    }
    fuc(obj.left, arr)
    fuc(obj.right, arr)
    arr.push(obj)

}
fuc(tree, arr)
console.log(arr)