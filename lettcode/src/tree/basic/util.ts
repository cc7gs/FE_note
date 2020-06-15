export type ICompareFunction<T> = (a: T, b: T) => number
export enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0
}

//小于等于
export function lesserEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.BIGGER_THAN
}

//大于等于
export function biggerEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>) {
    const comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS
}

export function defaultCompare<T>(a: T, b: T): number {
    if (a === b) {
        return Compare.EQUALS
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export function defaultEquals<T>(a: T, b: T): boolean {
    return a === b
}