import "./hu.css"
let a = 111
new Promise((resolve, reject) => {
    console.log('111', a);
    resolve(a)
}).then((res) => {
    console.log('222', res);

})