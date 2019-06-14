
export class Heap<T>{
  constructor(public data: T[]) {
    this.data = data;
  }
  /**
   * 堆排序
   */
  sort() {
    let curArr = this.data;
    let len = curArr.length;
    if (len <= 1) {
      return curArr;
    } else {
      for (let i = Math.floor(len / 2); i >= 0; i--) {
        this.maxHeapify(curArr, i, len);
      }
      for (let j = 0; j < len; j++) {
        this.swap(curArr, 0, len - 1 - j);
        this.maxHeapify(curArr, 0, len - 1 - j - 1)
      }
      return curArr;
    }
  }
  /**
   * 构建最大堆
   * @param arr 原数组
   * @param i 父元素节点
   * @param size 剩余元素个数
   */
  private maxHeapify(arr: T[], i: number, size: number) {
    // 左节点坐标 索引
    let l = i * 2 + 1;
    // 右节点坐标索引
    let r = i * 2 + 2;
    //记录最大值索引
    let maxIdx = i;
    if (l <= size && arr[l] > arr[maxIdx]) {
      maxIdx = l;
    }
    if (r <= size && arr[r] > arr[maxIdx]) {
      maxIdx = r;
    }
    //表示元素有替换
    if (i !== maxIdx) {
      this.swap(arr, i, maxIdx);
      this.maxHeapify(arr, maxIdx, size);
    }
  }
  private swap(arr: T[], curIdx: number, maxIdx: number) {
    if (curIdx === maxIdx) {
      return;
    }
    let temp = arr[curIdx];
    arr[curIdx] = arr[maxIdx]
    arr[maxIdx] = temp;
  }
}