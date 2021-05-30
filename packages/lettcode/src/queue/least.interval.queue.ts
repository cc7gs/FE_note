
/**
 * 621. 任务调度器
 *@description 给定一个用字符数组表示的 CPU 需要执行的任务列表。
 * 其中包含使用大写的 A - Z 字母表示的26 种不同种类的任务。
 * 任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。
 * CPU 在任何一个单位时间内都可以执行一个任务，或者在待命状态。
 * 然而，两个相同种类的任务之间必须有长度为 n 的冷却时间，
 * 因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。
 * 你需要计算完成所有任务所需要的最短时间。
 */

type QueCount = {
  [key: string]: number
}
//@todo 未解决
export const leastInterval = (tasks: any[], n: number) => {
  //记录最终结果
  let res = '';
  //统计每个任务出现的次数
  let Q: QueCount = {};
  tasks.forEach(task => {
    if (Q[task]) {
      Q[task]++;
    } else {
      Q[task] = 1;
    }
  });
  while (true) {
    const keys = Object.keys(Q);
    if (!keys[0]) {
      break;
    }
    //用于存储1+n个任务单元
    let temp: [] = [];
    for (let i = 0; i <= n + 1; i++) {
      //记录最多的次数
      let max = 0;
      //存储key 和对应下标
      let val, pos=0;
      keys.forEach((key, idx) => {
        if (Q[key] > max) {
          max = Q[key];
          val = key;
          pos = idx;
        }
      });
      if (val) {
        temp.push(val);
        keys.splice(pos, 1);
        Q[val]--;
        if (Q[val] < 1) {
          delete Q[val]
        }
      } else {
        break;
      }
    }
    res += temp.join('').padEnd(n + 1, '-');
  }
  //边界处理
  res = res.replace(/-+$/g, '')
  return res.length;
}