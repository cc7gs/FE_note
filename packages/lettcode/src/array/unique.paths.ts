
/**
 * 62. 不同的路径
 *
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
 */

/**
 * F(M*N)=F(M-1*N)+F(M*N-1)
 * @param grid 网格
 * @returns {number} 路径数量
 */
type IUniquePath=(m:number,n:number)=>number;
export const uniquePaths:IUniquePath = (m,n) => {
    var dp:number[][]=Array(m).fill(0).map(()=>Array(m).fill(0));
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(i===0||j===0){
                dp[i][j]=1;
            }else{
                dp[i][j]=dp[i-1][j]+dp[i][j-1]
            }
        }
    }
    return dp[m-1][n-1]
}

/**
 * 63. 不同的路径2
 * F(M*N)=F(M-1*N)+F(M*N-1)
 */
/** 
输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
*/

/**
 * 
 * @param obstacleGrid 
 */
export const uniquePathsWithObstacles = (obstacleGrid: number[][]): number => {
    const m=obstacleGrid.length;
    const n=obstacleGrid[0].length;
    let dp = (m:number, n:number):number => {
        //检查目标元素是否是1
        if(obstacleGrid[m-1][n-1]===1||obstacleGrid[0][0]===1){
            return 0;
        }
        if (m === 2 && n === 2) {
            //处理边界
            return (obstacleGrid[1][1] === 1 || obstacleGrid[1][0] + obstacleGrid[0][1] === 2) ? 0 : (obstacleGrid[0][1] === 1 || obstacleGrid[1][0] === 1) ? 1 : 2
        } else if (m < 2 || n < 2) {
            //处理单行
            if(m<2){
                return obstacleGrid[m-1].includes(1)?0:1
            }else{
            //处理单列
                for(let i=0;i<m;i++){
                    if(obstacleGrid[i][0]===1){
                        return 0
                    }
                }
                return 1
            }

        }else{
            return dp(m-1,n)+dp(m,n-1)
        }
    }
    return dp(m,n)
}