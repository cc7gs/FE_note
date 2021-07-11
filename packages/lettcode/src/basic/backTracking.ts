/**
 * 迷宫寻路问题
 * @param{number[][]} maze 迷宫数据
 * @param pos 当前坐标 
 * @param path 行走路径
 * @returns path
 */
export const mazeTrack = (
  maze: number[][],
  pos = [0, 0],
  path = [[...pos]],
  transverse: number[]=[]
): number[][] => {
  const [x, y] = pos;
  if (maze[x][y] === 2 || !maze.length) {
    return path;
  }
  // 记录走过位置
  transverse[x * maze.length + y] = 1;

  // 寻找下一步有效路径
  const choices = [
    [x + 1, y], [x - 1, y],
    [x, y + 1], [x, y - 1]
  ].filter(([ax, ay]) =>
    ax >= 0 && ay >= 0 &&
    ax < maze.length &&
    ay < maze[0].length &&
    maze[ax][ay] !== 1 &&
    !transverse[ax * maze.length + ay]
  )
  // eslint-disable-next-line no-restricted-syntax
  for (const position of choices) {
    const p = mazeTrack(maze, position, path.concat([position]), transverse);
    if (p.length) return p
  }
  return []
}