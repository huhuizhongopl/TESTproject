function customJSONStringify(obj) {
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }
    if (typeof obj === 'number') {
        return obj.toString();
    }
    if (typeof obj === 'string') {
        return '"' + obj.replace(/"/g, '\\"') + '"';
    }
    if (Array.isArray(obj)) {
        let result = '[';
        for (let i = 0; i < obj.length; i++) {
            result += customJSONStringify(obj[i]);
            if (i < obj.length - 1) {
                result += ',';
            }
        }
        return result + ']';
    }
    if (typeof obj === 'object') {
        let result = '{';
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (obj.hasOwnProperty(key)) {
                result += '"' + key + '":' + customJSONStringify(obj[key]);
                if (i < keys.length - 1) {
                    result += ',';
                }
            }
        }
        return result + '}';
    }
}
let obj = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'coding']
};
console.log(customJSONStringify(obj));