import React, { useState } from 'react';

const arrayMoveMutate = (array: unknown[], from: number, to: number) => {
  const startIndex = from < 0 ? array.length + from : from;
  if (startIndex >= 0 && startIndex <= array.length) {
    const endIndex = to < 0 ? array.length + to : to;
    const [item] = array.splice(from, 1);
    array.splice(endIndex, 0, item);
  }
};

function arrayMove<ValueType>(
  array: readonly ValueType[],
  from: number,
  to: number,
): ValueType[] {
  const newArray = [...array];
  arrayMoveMutate(newArray, from, to);
  return newArray;
}

const initialNum = [1, 2, 3, 4];
export default function Test() {
  const [array, setArray] = useState(initialNum);
  return (
    <div>
      <button
        onClick={() => {
          setArray(arrayMove(initialNum, 1, 2));
        }}
      >
        arrayMove(array, 1, 2)
      </button>
      <button
        onClick={() => {
          setArray(arrayMove(initialNum, -1, 0));
        }}
      >
        arrayMove(array, -1, 0)
      </button>
      <div>原结果:{initialNum.join(',')}</div>
      result:{array.join(',')}
    </div>
  );
}
