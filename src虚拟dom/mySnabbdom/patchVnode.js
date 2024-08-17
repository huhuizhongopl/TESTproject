
import createElement from './createElement.js';
export default function patchVnode(oldVnode, newVnode) {
    if (newVnode.text) {

        //新节点有文字，没有子节点
        oldVnode.elm.innerText = newVnode.text
    } else {
        //新节点有孩子节点

        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            //老节点也有孩子节点
            let un = 0
            for (let i = 0; i < newVnode.children.length; i++) {
                let ch = newVnode.children[i]
                let isExist = false
                for (let j = 0; j < oldVnode.children.length; j++) {
                    if (oldVnode.children[j].sel === ch.sel && oldVnode.children[j].key === ch.key) {
                        isExist = true
                    }
                }
                if (isExist) {
                    un++
                } else {
                    let dom = createElement(ch)
                    if (un < oldVnode.children.length) {
                        oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
                    } else {
                        oldVnode.elm.appendChild(dom)
                    }
                }
            }
        } else {
            //老节点没有孩子节点
            oldVnode.elm.innerHTML = ''
            for (let i = 0; i < newVnode.children.length; i++) {
                let newDom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(newDom)
            }
        }
    }

}