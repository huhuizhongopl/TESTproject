let list = [1, 2, [3, 4], [5, [6, [10, [11], 12], 7], 8], 9]

function myFlat(arr) {
    // while (arr.some(v => Array.isArray(v))) {
    //     arr = [].concat(...arr)
    // }
    // return arr
    return [].concat(...arr.map(v => Array.isArray(v) ? myFlat(v) : v))
}
console.log('myFlat', myFlat(list));

