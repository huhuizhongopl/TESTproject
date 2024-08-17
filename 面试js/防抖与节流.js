// 函数防抖和节流在以下场景中有广泛的应用：

// **防抖的应用场景：**

// 1. 搜索框输入：用户在输入搜索关键词时，不必每次输入都发起搜索请求，而是在输入停止一段时间后再执行搜索，避免频繁的请求。
//     - 例如电商网站的搜索框，用户可能在输入过程中不断修改，只有在停止输入 500 毫秒后才真正发起搜索。

// 2. 窗口调整大小：在浏览器窗口调整大小时，频繁触发的 `resize` 事件可能导致性能问题。使用防抖可以只在窗口大小稳定后执行相关的布局调整或计算。

// 3. 表单提交：防止用户快速多次点击提交按钮，导致重复提交。

// **节流的应用场景：**

// 1. 滚动事件：在页面滚动时，可能需要执行一些操作，如加载更多内容、计算滚动位置等。但不需要每次滚动都执行，而是每隔一定时间（如 500 毫秒）执行一次。

// 2. 鼠标移动事件：某些情况下需要跟踪鼠标移动，但不需要对每一个微小的移动都做出响应，通过节流控制响应频率。

// 3. 高频点击事件：比如点赞按钮，不需要每次点击都立即处理，而是限制在一定时间内只处理一次。

// 例如：
//  - 一个无限滚动的网页，当用户滚动到底部时，每隔 1 秒加载新的内容，使用节流控制加载频率。
//  - 一个在线绘图工具，在鼠标移动时绘制线条，但只在每 100 毫秒记录一次鼠标位置，使用节流减少计算量。

// 总之，防抖和节流能够有效地优化在频繁事件触发场景下的性能和用户体验。
// 防抖函数
function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

// 节流函数
function throttle(func, interval) {
    let lastTime = 0;
    return function () {
        let now = Date.now();
        if (now - lastTime >= interval) {
            func.apply(this, arguments);
            lastTime = now;
        }
    };
}

// 示例用法
function handleEvent() {
    console.log('事件被处理');
}

// 防抖示例
let debouncedHandler = debounce(handleEvent, 500);
document.addEventListener('click', debouncedHandler);

// 节流示例
let throttledHandler = throttle(handleEvent, 200);
document.addEventListener('mousemove', throttledHandler);