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

export function getSelectRangeText(input) {
    if (input && input.nodeType && input.value) {
        var value = input.value,
            len = value.length,
            start = input.selectionStart,
            end = input.selectionEnd;
        if (start != end) {
            return value.substring(start, end + 1);
        }
    }
}

export function setRangeText(input, content, start, end){
    if (input && input.nodeType && input.setRangeText) {
        input.setRangeText(content, start, end);
    }
}