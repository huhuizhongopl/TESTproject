import { init } from '../package/init.js'
import { classModule } from '../package/modules/class.js'
import { propsModule } from '../package/modules/props.js'
import { styleModule } from '../package/modules/style.js'
import { eventListenersModule } from '../package/modules/eventlisteners.js'
import { h } from '../package/h.js'
//创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
// 创建虚拟节点
const myVnode1 = h('a', { props: { href: 'http://www.baidu.com' } }, '胡慧中')

const container = document.getElementById("container")
patch(container, myVnode1)