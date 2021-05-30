/**
 * 860. 柠檬水找零
 * 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。

顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

注意，一开始你手头没有任何零钱。

如果你能给每位顾客正确找零，返回 true ，否则返回 false 。
 */
export const lemonadeChange = (bills: number[]): boolean => {
    const pocket = { five: 0, ten: 0, twenty: 0 }
    return bills.every(bill => {
        switch (bill) {
            case 5:
                pocket.five++;
                break;
            case 10:
                if (pocket.five > 0) {
                    pocket.five--;
                    pocket.ten++;
                    break;
                } else {
                    return false
                }
            case 20:
                if (pocket.ten > 0 && pocket.five > 0) {
                    pocket.five--;
                    pocket.ten--;
                    pocket.twenty++;
                    break;
                }else if(pocket.five>2){
                    pocket.five-=3;
                    pocket.twenty++;
                } else {
                    return false;
                }
            default:
                console.log('输入 数字 不在 5,10,20范围之内')
                return false;
        }
        return true;
    })
}