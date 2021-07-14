
/**
 * 解析查询字符串
 * @param str 
 * @returns 解析结果
 */
export default function queryParse(str: string){
  return str.split('&').reduce((acc, item) => {
    const [key, val] = item.split('=');

    if (val) {
      const path = key.split((/[[\]]/g)).filter(v => v)
      deep_set(acc, path, val);
    }

    return acc
  }, {} as Record<string, unknown>)
}

function deep_set(o: Record<string, unknown>, path: string[], value: string) {
  let i = 0;
  for (; i < path.length - 1; i++) {
    if (o[path[i]] === undefined) {
      const isArr = /^\d+/.test(path[i + 1])
      o[path[i]] = isArr ? [] : {}
    }
    o = o[path[i]]
  }
  o[path[i]] = decodeURIComponent(value)
}