let callbacks = [];
let pending = false;

function flushCallbacks() {
    pending = false;
    let copies = callbacks.slice(0);
    callbacks = [];
    for (let callback of copies) {
        callback();
    }
}

let timerFunc;

if (Promise) {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks);
    };
} else if (MutationObserver) {
    let observer = new MutationObserver(flushCallbacks);
    let textNode = document.createTextNode('');
    observer.observe(textNode, { characterData: true });
    timerFunc = () => {
        textNode.textContent = '1';
    };
} else if (setImmediate) {
    timerFunc = () => {
        setImmediate(flushCallbacks);
    };
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}

export function nextTick(cb) {
    callbacks.push(cb);
    if (!pending) {
        pending = true;
        timerFunc();
    }
}