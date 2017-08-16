let dom = {};
dom.bind = function (fn, context) {
    if (arguments.length < 2 && context === undefined) {
        return fn;
    }
    let method = fn;
    let slice = Array.prototype.slice;
    let args = slice.call(arguments, 2);
    return function () {
        let array = slice.call(arguments, 0);
        method.apply(context, args.concat(array));
    }
}
window.name = "This is Window";
let obj = {
    name: 'A nice demo',
    fx: function () {
        alert(this.name + '\n' + Array.prototype.slice.call(arguments, 0).join(', '));
    }
};
let jj = {
    name: '这是jj',
    alertName: function () {//绑定失效
        console.log(this.name);
    }
};
let kk = {
    name: "kkです",
}
function run(f) {
    f();
}
// run(jj.alertName);
let fx2 = dom.bind(jj.alertName)
run(fx2);
// var fx2 = dom.bind(obj.fx, obj,1, 2, 3);
// fx2(4, 5,6);