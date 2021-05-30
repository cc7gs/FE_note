interface IObject {
    [key: string]: any;
}

/**
 * 对象扁平
 * @param source {a:1,b:{a:2,c:3},c:{d:{e:1}}}
 * @returns {a:1,'b.a':2,'b.c':3,'c.d.e':1}
 */

function objectFlatten(source: IObject) {
    return Object.keys(source).reduce((acc, curKey) => {
        if (typeof source[curKey] === 'object') {
            const flatObject = objectFlatten(source[curKey] as IObject);
            Object.keys(flatObject).forEach(key => {
                acc[curKey + '.' + key] = flatObject[key];
            })
        } else {
            acc[curKey] = source[curKey];
        }
        return acc
    }, {})
}

/**
 * 
 * @param source {a:1,'b.a':2,'b.c':3,'c.d.e':1}
 * @returns {a:1,b:{a:2,c:3},c:{d:{e:1}}}
 */
function flattenDotExpends(source: { [key: string]: any }) {
    return Object.keys(source).reduce((acc, curKey) => {
        const expendObject = curKey.split('.').reduceRight((acc, currentValue) => {
            return { [currentValue]: acc }
        }, source[curKey]);

        let firstKey=curKey.split('.')[0];
        if( firstKey in acc){
            acc[firstKey]={...acc[firstKey],...expendObject[firstKey]}
            return acc;
        }
        return {...acc,...expendObject};
    }, {})
}

const source = {
    a: 1,
    b: {
        a: 2,
        c: 3
    },
    c: {
        d: {
            e: 1
        }
    }
}
console.log(source);
console.table(objectFlatten(source));
console.table(flattenDotExpends(objectFlatten(source)));

