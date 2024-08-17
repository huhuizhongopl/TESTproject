function mySet(arr = []) {
    this.norepeat = function (arr) {
        let temp = arr.reduce((prev, cur) => {
            if (!prev.includes(cur)) {
                prev.push(cur)
            }
            return prev
        }, [])
        return temp
    }
    this.items = this.norepeat(arr)
}
mySet.prototype.add = function (val) {
    this.items = this.norepeat(this.items.push(val))
    return this.items
}
mySet.prototype.remove = function (val) {
    let index = this.items.indexOf(val)
    if (index === -1) {
        throw new Error("结构中没有该元素")
        return false
    } else {
        this.items.splice(index, 1)
        return true
    }
}
mySet.prototype.has = function (val) {
    return this.items.hasOwnProperty(val)

}
mySet.prototype.clear = function () {
    this.item = []
}
mySet.prototype.size = function () {
    return this.items.length
}
let setIn = new mySet([1, 1, 2, 3, 4, 5, 5])
console.log('666', setIn.remove(8));

