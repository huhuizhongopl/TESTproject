
function myPromise(executor) {
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.callback = []
    const self = this
    function resolve(data) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = 'fulfilled'
        self.PromiseResult = data
        self.callback.forEach(item => {
            item.onResolved(data)
        })
    }
    function reject(data) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = 'rejected'
        self.PromiseResult = data
        self.callback.forEach(item => {
            item.onRejected(data)
        })
    }
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}
myPromise.prototype.then = function (onResolved, onRejected) {
    return new myPromise((resolve, reject) => {
        const self = this
        function callback(type) {
            try {
                let result = type(self.PromiseResult)
                if (result instanceof myPromise) {
                    result.then(r => {
                        resolve(r)
                    }, e => {
                        reject(e)
                    })

                } else {
                    resolve(result)
                }
            } catch (e) {
                reject(e)
            }

        }
        if (this.PromiseState === 'fulfilled') {
            callback(onResolved)
        }
        if (this.PromiseState === 'rejected') {
            callback(onRejected)
        }
        if (this.PromiseState === 'pending') {

            this.callback.push({
                onResolved: function () {
                    callback(onResolved)
                },
                onRejected: function () {
                    callback(onRejected)
                }
            })
        }
    })
}