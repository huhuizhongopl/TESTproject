
import patch from '../src/mySnabbdom/patch.js';
import h from '../src/mySnabbdom/h.js';
// 创建虚拟节点
const myVnode1 = h('ul', {}, [
    h('li', { key: "111" }, '111'),
    h('li', { key: "222" }, '222'),
    h('li', { key: "333" }, '333')
])

const container = document.getElementById("container")

const myVnode2 = h('ul', {}, [
    h('li', { key: "111" }, '111'),
    h('li', { key: "222" }, '222'),
    h('li', { key: "444" }, '444'),
    h('li', { key: "333" }, '333'),
    h('li', { key: "555" }, '555')
])
const myVnode3 = h('ul', {}, '旧节点')
patch(container, myVnode1)
const btn = document.getElementsByTagName("button")[0]
btn.onclick = function () {
    patch(myVnode1, myVnode2)
}
