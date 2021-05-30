/**
 * @name process
 */

/**
 * @name 解析用户传递参数
 * @description 前两个参数分别是 node执行命令路径与当前执行文件路径
 * 一般命令接受可以用 commander库处理 
 */
const  [nodeExePath,curFilePath,...args]=process.argv;
// log(args);
// log(curFile);

/**
 * @name 当前用户的工作目录
 * @description 返回运行node命令所在的文件夹的绝对路径
 */
const path=process.cwd();
// log(path)

/**
 * @name 微任务
 */
const tick=process.nextTick;

function log(str) {
  console.log(str);
}