let arr = ['lily', 'lucy', 'tom', 'lilei', 'why']
function passGame(arr, n) {
    while (arr.length > 1) {
        for (let i = 0; i < n - 1; i++) {
            arr.push(arr.shift())
        }
        arr.shift()
    }
    console.log('last', arr.shift());

}
passGame(arr, 3)
