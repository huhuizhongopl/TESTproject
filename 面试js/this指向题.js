const obj = {
    dev: 'bfe',
    a: function () {
        return this.dev
    },
    b() {
        return this.dev
    },
    c: () => {
        return this.dev
    },
    d: function () {
        return (() => {
            return this.dev
        })()
    },
    e: function () {
        return this.b()
    },
    f: function () {
        return this.b
    },
    g: function () {
        return this.c()
    },
    h: function () {
        return this.c
    },
    i: function () {
        return () => {
            return this.dev
        }
    }
}
console.log(obj.a())//b
console.log(obj.b())//b
console.log(obj.c())//unde
console.log(obj.d())//b
console.log(obj.e())//b
console.log(obj.f()())//unde
console.log(obj.g())//unde
console.log(obj.h()())//unde
console.log(obj.i()())//b