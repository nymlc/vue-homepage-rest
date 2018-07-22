/**
 * 深层克隆
 *
 * @export
 * @param {any} obj
 * @param {any} [conditions=[]]
 * @returns
 */
export function deepClone(obj, conditions = []) {
    if (!obj && typeof obj === 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    const targetObj = obj.constructor === Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
                targetObj[key] = obj[key].constructor === Array ? [] : {};
                targetObj[key] = deepClone(obj[key]);
            } else {
                if (!conditions.includes(obj[key])) {
                    targetObj[key] = obj[key];
                }
            }
        }
    }
    return targetObj;
}
/**
 * 判断是否是目标对象
 *
 * @export
 * @param {any} obj
 * @param {any} condition
 */
// export function isTargetObj(obj, conditions) {

// }
export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}
/**
 * 判断是否有滚动条
 *
 * @export
 * @param {any} el
 * @param {string} [direction='v']
 * @returns
 */
export function hasScrolled(el, direction = 'v') {
    if (direction === 'v') {
        return el.scrollHeight > el.clientHeight;
    } else if (direction === 'h') {
        return el.scrollWidth > el.clientWidth;
    }
}

/**
 * 获取随机数
 *
 * @export
 * @param {any} min
 * @param {any} max
 * @returns
 */
export function getRandomNumber(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
}
/**
 * 根据给定数组生成随机数组（打乱排序取值）
 *
 * @export
 * @param {any} arr
 * @param {any} count
 * @returns
 */
export function getRandomArray(arr, count) {
    const shuffled = arr.slice(0);
    let i = arr.length;
    count = count || getRandomNumber(1, i);
    const min = i - count;
    let temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

