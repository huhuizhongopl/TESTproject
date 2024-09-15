const first = () => {
    return new Promise((resolve, reject) => {
        console.log(3)
        let p = new Promise((resolve, reject) => {
            console.log(7)
            setTimeout(() => {
                console.log(1)
            }, 0)
            setTimeout(() => {
                console.log(2)
                resolve(3)
            }, 0)
            resolve(4)
        })
        resolve(2)
        p.then((arg) => {
            console.log(arg, 5)
        })
        setTimeout(() => {
            console.log(6)
        }, 0)
    })
}
first().then((arg) => {
    console.log(arg, 7)
    setTimeout(() => {
        console.log(8)
    }, 0)
})
setTimeout(() => {
    console.log(9)
}, 0)
console.log(10)
//
//
//
//
//
//
//
//
//
//
