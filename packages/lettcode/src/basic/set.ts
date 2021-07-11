export class Set<T>{
    private item: any;
    constructor() {
        this.item = {}
    }
    add(element: T) {
        if (!this.has(element)) {
            this.item[element] = element;
            return true;
        }
        return false
    }
    delete(element: T) {
        if (this.has(element)) {
            delete this.item[element]
            return true
        }
        return false
    }
    has(element: T) {
        return this.item.hasOwnProperty(element)
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.item = {}
    }
    size() {
        return Object.keys(this.item).length
    }
    values() {
        return Object.values(this.item)
    }
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        const values = this.values() as T[];
        let str = `${values[0]}`;
        for (let i = 1; i < values.length; i++) {
            str = `${str},${values[i]}`
        }
        return str
    }
}