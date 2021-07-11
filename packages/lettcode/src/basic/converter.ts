/**
 * @desc 数字之间的(0-36)进制转换 
 * @param originNumber 原输入数据
 * @param base 进制数
 */
export function converter(originNumber: number, base: number) {
    let baseString = '';
    const digits = '0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ';
    let number = originNumber;
    const numArr:number[] = [];
    while (number > 0) {
        const rem = Math.floor(number % base);
        numArr.push(rem);
        number = Math.floor(number / base);
    }
    while (numArr.length) {
        baseString += digits[numArr.pop()!]
    }
    return baseString
}