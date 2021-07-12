/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 数组去重的方式
 */
// 方式一  set
function unique(arr) {
    return [...new Set(arr)]
};

// 方式二 indexof
function unique(arr) {
    const res = [];
    arr.forEach(item => {
        if (res.indexOf(item) === -1) {
            res.push(item);
        }
    });
    return res;
}

// 方式三 includes
function unique(arr) {
    const res = [];
    arr.forEach(item => {
        if (!res.includes(item)) {
            res.push(item);
        }
    });
    return res;
}

// 方式四 利用 reduce
function unique(arr) {
    return arr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], []);
}

// 方式五  map函数
function unique(arr) {
    const map = new Map();
    arr.forEach(num => {
        if (!map.has(num)) {
            map.set(num);
        }
    });
    return [...map.keys()]
}