//第一种，正则验证提取参数
const str = "http://www.baidu.com?a=111&b=222"
let params = {}
let reg = /([^?&=]+)=([^&]+)/g
str.replace(reg, (a, b, c) => {
    params[b] = c
    console.log('replace', a, b, c);
})
console.log('params', params);
//第二种，web方法提取参数
const str = "http://www.baidu.com?a=111&b=222"
let url = str.split('?')[1]
let urlSearchParams = new URLSearchParams(url)
const params = Object.fromEntries(urlSearchParams.entries())
console.log('urlSearchParams', params);