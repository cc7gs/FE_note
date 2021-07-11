// eslint-disable-next-line max-classes-per-file
class ValuePair<K, V>{
    constructor(public key: K, public value: V) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`
    }
}
function defaultToString(item: any) {
    if (item === null) {
        return 'NULL'
    }
    if (item === undefined) {
        return 'UNDEFINED'
    }
    if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    }
    return item.toString()
}

export class Dictionary<K, V>{
    private table: Record<string, ValuePair<K, V>>;
    constructor(public toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {}
    }
    set(key: K, value: V) {
        if (key != null && value != null) {
            this.table[this.toStrFn(key)] = new ValuePair(key, value);
            return true;
        }
        return false
    }
    get(key: K) {
        const val = this.table[this.toStrFn(key)];
        return val == null ? undefined : val.value
    }
    hasKey(key: K) {
        return this.table[this.toStrFn(key)] != null
    }
    remove(key: K) {
        if (!this.isEmpty()) {
            delete this.table[this.toStrFn(key)];
            return true
        }
        return false
    }
    // 所有键名(key)
    keys() {
        return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.key)
    }
    values() {
        return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.value)
    }
    // 返回[key,value]
    keyValues() {
        return Object.values(this.table)
    }

    forEach(callbackFn: (key: K, value: V) => any) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return Object.keys(this.table).length
    }

    clear() {
        this.table = {}
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
}