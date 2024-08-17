var F = function () { };
Object.prototype.a = function () {
    console.log('a');
};
Function.prototype.b = function () {
    console.log('b');
};
var f = new F();
f.a(); //'a'
f.b(); //TypeError: f.b is not a function
F.a(); //'a'
F.b(); //'b'
///////////////////////////
function Foo() {
    Foo.a = function () {
        console.log(1)
    }
    this.a = function () {
        console.log(2)
    }
}
Foo.prototype.a = function () {
    console.log(3)
}
Foo.a = function () {
    console.log(4)
}
Foo.a();//4
let obj = new Foo();
obj.a(); //2
Foo.a(); //1