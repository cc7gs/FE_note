/**
 * 1. 冒泡排序
 *  算法描述如下:   
 * 比较相邻的元素。如果第一个比第二个大,就交换他们;
 *   对于每个相邻的元素重复相同的工作,直到最后一个元素,这样最后的元素会是最大的数
 *   针对所有元素重复以上的步骤,除了最后一个元素
 *   重复上面1~3步骤,知道排序结束
 */
const bubbleSort = (arr: Array<number>) => {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0, temp; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
/**
 * 2. 选择排序
 * 初始时在未排序序列中找最小(最大)元素,放到序列的起始位置作为已排序序列;
 * 然后再从剩余未排序元素中继续寻找最小(大)元素,放到已排序序列的末尾
 */
const selectSort_2 = (arr: Array<number>) => {
  for (let i = 0, min, temp; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j <= arr.length - 1; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (arr[min] != arr[i]) {
      temp = arr[min];
      arr[min] = arr[i];
      arr[i] = temp;
    }
  }
  return arr;
}
const selectSort = (arr: Array<number>) => {
  for (let i = 0, min, len = arr.length; i < len; i++) {
    min = arr[i];
    for (let j = i + 1, temp; j < len; j++) {
      if (min > arr[j]) {
        temp = min;
        min = arr[j];
        arr[j] = temp;
      }
    }
    arr[i] = min;
  }
  return arr;
}

/**
 * 3. 快速排序
 */
/**
 * 1. 在数据集中找出基准元素
 * 2. 小于基准元素放到左边，大于基准元素放到右边
 * 3. 对左右两个集合不断重复1、2中步骤
 */
const quickSort = (arr: Array<number>): Array<number> => {
  if (arr.length <= 1) {
    return arr;
  }
  //基准元素下标
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  //left 是存储大于基准元素集合;right则相反
  const left = [], right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

export { bubbleSort, selectSort,quickSort }