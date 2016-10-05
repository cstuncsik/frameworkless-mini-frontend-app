const namespace = (obj, nsStr, set) => {
    const nsArr = nsStr.split('.');
    const prop = nsArr.pop();
    const len = nsArr.length;
    for (let i = 0; i < len; i += 1) {
        if (set) {
            obj[nsArr[i]] = obj[nsArr[i]] || {};
        }
        if (!obj[nsArr[i]]) {
            return;
        }
        obj = obj[nsArr[i]];
    }
    return {
        obj: obj,
        prop: prop
    };
};

const toStr = Function.prototype.call.bind(Object.prototype.toString);
const isObj = obj => !!obj && toStr(obj) === '[object Object]';
// This one was failing the unit tests in PhantomJS
//const isObj = obj => !!obj && Object.getPrototypeOf(obj) === Object.prototype;
// More info here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf#Notes
const clone = obj => {
    let cloned = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        cloned[key] = isObj(value) || Array.isArray(value) ? clone(value) : value
    });
    return cloned;
};

const setProp = (obj, nsStr, val) => {
    const newObj = clone(obj);
    const data = namespace(newObj, nsStr, true);
    data.obj[data.prop] = val;
    return newObj;
};

const getProp = (obj, nsStr) => {
    const data = namespace(clone(obj), nsStr);
    return data ? data.obj[data.prop] : data;
};

export {isObj, clone, setProp, getProp};
