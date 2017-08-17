const dom = {};
dom.bind = function (fn, context,...arguments) {
    if (arguments.length < 2 && context === undefined) {
        return fn;
    }
    const method = fn;
    const slice = Array.prototype.slice;
    // when hasn't third params ...arguments, we can use the follow to get relative params
    // but when has, the arguments stand for reminder params.
    // const args = slice.call(arguments, 2);
    const args = arguments;
    return function (...arguments) {
        const array = slice.call(arguments, 0);
        method.apply(context, args.concat(array));
    };
}
window.name = 'This is Window';
const obj = {
    name: 'A nice demo',
    fx(...arguments) {
        alert(this.name + '\n' + Array.prototype.slice.call(arguments, 0).join(', '));
    },
};
const jj = {
    name: '这是jj',
    alertName() { // 绑定失效
        console.log(this.name);
    },
};
const kk = {
    name: 'kkです',
}
function run(f) {
    f();
}
// run(jj.alertName);
const fx2 = dom.bind(jj.alertName, kk, jj)
run(fx2);
const fx3 = dom.bind(obj.fx, obj, 1, 2, 3);
// line 2's ... stand for [1, 2, 3]
fx3(4, 5, 6)