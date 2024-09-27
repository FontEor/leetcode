class LRUCache {
    constructor(n) {
        this.n = n
        this.map = new Map()
    }
    put(key, value) {
        if (this.map.has(key)) { //关键字存在
            this.map.delete(key)
        }
        this.map.set(key, value)
        if (this.map.size > this.n) { //当缓存容量未达到上限时
            this.map.delete(this.map.entries().next().value[0])
        }
    }
    get(key) {
        let val = this.map.get(key)
        if (!this.map.has(key)) {
            return -1
        }
        this.map.delete(key)
        this.map.set(key, val)
        return val
    }
}