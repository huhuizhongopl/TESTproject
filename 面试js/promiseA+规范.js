class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
            }
        };

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

        let promise2 = new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else {
                this.onFulfilledCallbacks.push((value) => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push((reason) => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });

        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }

    if (x instanceof MyPromise) {
        if (x.state === 'pending') {
            x.then((y) => resolvePromise(promise2, y, resolve, reject), reject);
        } else {
            x.then(resolve, reject);
        }
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let then;
        try {
            then = x.then;
        } catch (error) {
            return reject(error);
        }

        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } catch (error) {
                if (called) return;
                reject(error);
            }
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
    }
}
let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 1000);
});

promise.then((value) => {
    console.log(value);
    return value + ' and more';
}).then((value) => {
    console.log(value);
});