/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-bitwise */

/**
 * n皇后问题
 * @param n 皇后数量
 * @returns decisions 决策结果
 */
export const queen = (n: number) => {
  const chessboard = createChessboard(n)
  const getDecisions = (decisions: number[] = []) => {
    if (decisions.length === n) {
      return [decisions]
    }

    let r: number[][] = [];
    const start = decisions[decisions.length - 1] + 1 || 0;
    chessboard.slice(start).forEach(chess => {
      if (!decisions.includes(chess)) {
        if (decisions.every(decision => compatible(decision, chess, n))) {
          r = r.concat(getDecisions(decisions.concat(chess)))
        }
      }
    })
    return r
  }
  return getDecisions();
}

/**
 * 创建棋盘
 * @param n 
 * @returns n*n
 */
export const createChessboard = (n: number) => Array.from({ length: n * n }).map((_, i) => i);


/**
 * 判断两个皇后是否互相攻击
 * 
 * @param p 皇后坐标
 * @param q 皇后坐标
 * @param n 几皇后问题
 */
function compatible(p: number, q: number, n: number) {
  const [x1, y1] = [~~(p / n), p % n];
  const [x2, y2] = [~~(q / n), q % n];
  return x1 !== x2 && y1 !== y2 && Math.abs(x1 - x2) !== Math.abs(y1 - y2)
}