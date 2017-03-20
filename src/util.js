export function throttle(func, wait, context) {
    var timer;
    wait = wait || 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    }
}